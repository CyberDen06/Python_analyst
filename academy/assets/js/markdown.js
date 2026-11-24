// Minimal, dependency-free markdown renderer for lesson content.
// Supports: headings, paragraphs, bold/italic, inline code, fenced code,
// links, ordered/unordered lists, tables, blockquotes, horizontal rules.

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function inlineFormat(raw) {
  let s = escapeHtml(raw);
  const codes = [];
  s = s.replace(/`([^`]+)`/g, (_, c) => {
    codes.push("<code>" + c + "</code>");
    return "\u0000C" + (codes.length - 1) + "\u0000";
  });
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  s = s.replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener">$1</a>');
  s = s.replace(/\u0000C(\d+)\u0000/g, (_, i) => codes[Number(i)]);
  return s;
}

function splitRow(line) {
  return line.replace(/^\s*\|/, "").replace(/\|\s*$/, "").split("|").map((c) => c.trim());
}

function isSeparatorRow(line) {
  if (!line.includes("|")) return false;
  const cells = splitRow(line);
  return cells.length > 0 && cells.every((c) => /^:?-{3,}:?$/.test(c));
}

export function mdToHtml(source) {
  if (source == null || source === "") return "";
  const text = String(source).replace(/\r\n/g, "\n");

  // Pull fenced code blocks out before escaping.
  const fences = [];
  const withPlaceholders = text.replace(/```([\w-]*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const safe = escapeHtml(code.replace(/\n$/, ""));
    fences.push(
      '<pre class="md-code"><code>' + safe + "</code></pre>"
    );
    return "\n\n\u0000F" + (fences.length - 1) + "\u0000\n\n";
  });

  const lines = withPlaceholders.split("\n");
  const out = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Blank line
    if (!line.trim()) { i++; continue; }

    // Fenced code placeholder
    const fence = line.match(/^\u0000F(\d+)\u0000$/);
    if (fence) {
      out.push(fences[Number(fence[1])]);
      i++;
      continue;
    }

    // Horizontal rule
    if (/^\s*(---+|\*\*\*+)\s*$/.test(line)) {
      out.push("<hr>");
      i++;
      continue;
    }

    // Headings
    const heading = line.match(/^(#{1,4})\s+(.*)$/);
    if (heading) {
      const level = heading[1].length;
      out.push(`<h${level}>${inlineFormat(heading[2].trim())}</h${level}>`);
      i++;
      continue;
    }

    // Blockquote
    if (/^\s*>\s?/.test(line)) {
      const parts = [];
      while (i < lines.length && /^\s*>\s?/.test(lines[i])) {
        parts.push(lines[i].replace(/^\s*>\s?/, ""));
        i++;
      }
      out.push("<blockquote>" + inlineFormat(parts.join(" ")) + "</blockquote>");
      continue;
    }

    // Table
    if (line.includes("|") && i + 1 < lines.length && isSeparatorRow(lines[i + 1])) {
      const headers = splitRow(line);
      i += 2;
      const rows = [];
      while (i < lines.length && lines[i].includes("|") && lines[i].trim()) {
        rows.push(splitRow(lines[i]));
        i++;
      }
      let html = '<div class="md-table-wrap"><table class="md-table"><thead><tr>';
      headers.forEach((h) => { html += "<th>" + inlineFormat(h) + "</th>"; });
      html += "</tr></thead><tbody>";
      rows.forEach((r) => {
        html += "<tr>";
        headers.forEach((_, idx) => { html += "<td>" + inlineFormat(r[idx] ?? "") + "</td>"; });
        html += "</tr>";
      });
      html += "</tbody></table></div>";
      out.push(html);
      continue;
    }

    // Lists
    if (/^\s*([-*]|\d+[.)])\s+/.test(line)) {
      const ordered = /^\s*\d+[.)]\s+/.test(line);
      const items = [];
      while (i < lines.length && /^\s*([-*]|\d+[.)])\s+/.test(lines[i])) {
        const itemText = lines[i].replace(/^\s*([-*]|\d+[.)])\s+/, "");
        // Allow continuation lines indented under the item.
        let extra = "";
        let j = i + 1;
        while (j < lines.length && /^\s{2,}\S/.test(lines[j]) &&
               !/^\s*([-*]|\d+[.)])\s+/.test(lines[j])) {
          extra += " " + lines[j].trim();
          j++;
        }
        items.push(inlineFormat(itemText + extra));
        i = j;
      }
      const tag = ordered ? "ol" : "ul";
      out.push(`<${tag}>` + items.map((t) => "<li>" + t + "</li>").join("") + `</${tag}>`);
      continue;
    }

    // Paragraph: gather until blank or the start of another block.
    const para = [];
    while (i < lines.length && lines[i].trim() &&
           !/^(#{1,4})\s+/.test(lines[i]) &&
           !/^\s*(---+|\*\*\*+)\s*$/.test(lines[i]) &&
           !/^\s*>\s?/.test(lines[i]) &&
           !/^\s*([-*]|\d+[.)])\s+/.test(lines[i]) &&
           !/^\u0000F\d+\u0000$/.test(lines[i]) &&
           !(lines[i].includes("|") && i + 1 < lines.length && isSeparatorRow(lines[i + 1]))) {
      para.push(lines[i].trim());
      i++;
    }
    if (para.length) out.push("<p>" + inlineFormat(para.join(" ")) + "</p>");
  }

  return out.join("\n");
}
