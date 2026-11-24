/* Data Academy — Python runtime (Pyodide) running in a Web Worker.
   Main thread sends: {type:"init", indexURL, datasets:[{name,url}]}
                       {type:"run", id, code, checks?}
   Worker replies:    {type:"status", status}
                      {type:"ready"}
                      {type:"init-error", message}
                      {type:"result", id, ok, phase, message, stdout, stderr, figures}
*/

let pyodide = null;
let ready = false;
let indexURL = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";
let datasets = [];

const INIT_PY = `
class CheckFailure(Exception):
    """Raised when an exercise check does not pass."""
    pass

def expect(condition, message):
    if not condition:
        raise CheckFailure(str(message))

def expect_defined(*names):
    missing = [n for n in names if n not in globals()]
    if missing:
        raise CheckFailure("Missing variable(s): " + ", ".join(missing) + ". Create them in this cell (and run it) first.")

def _pda_display_value(value):
    name = type(value).__name__
    if name in ("DataFrame", "Series", "Index"):
        return str(value)
    return None

def _pda_collect_figures():
    try:
        import base64, io
        import matplotlib.pyplot as plt
    except Exception:
        return []
    out = []
    for num in plt.get_fignums():
        fig = plt.figure(num)
        try:
            buf = io.BytesIO()
            fig.savefig(buf, format="png", dpi=110, bbox_inches="tight", facecolor="white")
            out.append(base64.b64encode(buf.getvalue()).decode("ascii"))
        finally:
            plt.close(fig)
    return out

import matplotlib
matplotlib.use("Agg")

import warnings
warnings.filterwarnings("ignore", category=DeprecationWarning)
warnings.filterwarnings("ignore", category=FutureWarning)
`;

function post(msg) {
  self.postMessage(msg);
}

self.onmessage = async (event) => {
  const msg = event.data;
  try {
    if (msg.type === "init") {
      indexURL = msg.indexURL || indexURL;
      datasets = msg.datasets || [];
      await init();
    } else if (msg.type === "run") {
      if (!ready) {
        post({
          type: "result",
          id: msg.id,
          ok: false,
          phase: "runtime",
          message: "Python is still warming up. Give it a few seconds and try again.",
          stdout: "",
          stderr: "",
          figures: [],
        });
        return;
      }
      await runCell(msg);
    }
  } catch (err) {
    post({
      type: "init-error",
      message: String((err && err.stack) || err || "unknown worker error"),
    });
  }
};

async function init() {
  try {
    post({ type: "status", status: "loading-core" });
    importScripts(indexURL + "pyodide.js");

    pyodide = await loadPyodide({ indexURL });

    post({ type: "status", status: "loading-packages" });
    await pyodide.loadPackage(["pandas", "matplotlib"]);

    pyodide.runPython(INIT_PY);

    post({ type: "status", status: "loading-data" });
    for (const ds of datasets) {
      const res = await fetch(ds.url);
      if (!res.ok) throw new Error("Could not load dataset " + ds.name + " (" + res.status + ")");
      const buffer = new Uint8Array(await res.arrayBuffer());
      pyodide.FS.writeFile("/home/pyodide/" + ds.name, buffer);
    }

    ready = true;
    post({ type: "ready" });
  } catch (err) {
    post({
      type: "init-error",
      message: String((err && err.message) || err),
    });
  }
}

function formatError(err) {
  const msg = (err && err.message) ? String(err.message) : String(err);
  if (msg.includes("CheckFailure:")) {
    const tail = msg.slice(msg.lastIndexOf("CheckFailure:") + "CheckFailure:".length).trim();
    return { text: tail.split("\n")[0] || "Check did not pass.", isCheck: true };
  }
  const lines = msg.trim().split("\n");
  // Keep the final, most useful part of a Python traceback.
  return { text: lines.slice(-7).join("\n"), isCheck: false };
}

async function runCell({ id, code, checks }) {
  const stdout = [];
  const stderr = [];

  pyodide.setStdout({ batched: (s) => stdout.push(s.endsWith("\n") ? s : s + "\n") });
  pyodide.setStderr({ batched: (s) => stderr.push(s.endsWith("\n") ? s : s + "\n") });

  let ok = true;
  let phase = "user";
  let message = "";
  let checkFailed = false;

  try {
    const result = await pyodide.runPythonAsync(code || "", { filename: "cell.py" });

    // Show a bare DataFrame / Series like a notebook would.
    if (result && typeof result === "object") {
      let isProxy = false;
      try { isProxy = result instanceof pyodide.ffi.PyProxy; } catch (_) { isProxy = false; }
      if (isProxy) {
        try {
          pyodide.globals.set("__pda_last__", result);
          const text = pyodide.runPython("_pda_display_value(__pda_last__)");
          if (text) stdout.push(text + "\n");
        } catch (_) {
          /* ignore display problems */
        } finally {
          try { pyodide.runPython("__pda_last__ = None"); } catch (_) {}
          if (result.destroy) result.destroy();
        }
      }
    } else if (typeof result === "string" && result.length) {
      stdout.push(result + "\n");
    } else if (typeof result === "number" || typeof result === "boolean") {
      stdout.push(String(result) + "\n");
    }

    if (checks) {
      phase = "check";
      await pyodide.runPythonAsync(checks, { filename: "checks.py" });
      phase = "user";
    }
  } catch (err) {
    ok = false;
    const info = formatError(err);
    message = info.text;
    checkFailed = info.isCheck;
  }

  // Collect matplotlib figures (closed after saving).
  let figures = [];
  try {
    const proxy = pyodide.runPython("_pda_collect_figures()");
    figures = proxy.toJs();
    proxy.destroy();
  } catch (_) {
    figures = [];
  }

  post({
    type: "result",
    id,
    ok,
    phase,
    isCheck: !!checks,
    checkFailed,
    message,
    stdout: stdout.join(""),
    stderr: stderr.join(""),
    figures,
  });
}
