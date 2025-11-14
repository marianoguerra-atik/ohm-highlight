import { getHighlightInfo } from "./ohm-hl.js";

const examples = {
  str: `func main() {
  let s = "hey";
  let arr = newInt32Array(1);
  arr[0] := 42;
  
  s
}`,
};

function main() {
  const input = document.getElementById("input");
  const output = document.getElementById("output");
  function updateHL(code) {
    output.textContent = "";
    const node = new Text(code);
    output.appendChild(node);
    // NOTE: node has to be in the dom tree before applying the highlights?
    highlightCodeInNode(code, node);
  }
  input.textContent = examples.str;
  updateHL(examples.str);
  input.addEventListener("input", (e) => {
    const code = e.target.value;
    updateHL(code);
  });
}

function highlightCodeInNode(code, node) {
  const { info, error } = getHighlightInfo(code);
  if (error) {
    console.error(error);
    return;
  }
  highlightCodeInNodeFromData(node, info.byType);
}

function highlightCodeInNodeFromData(node, byType) {
  console.log("highlighting", byType);
  for (const key in byType) {
    const hl = new Highlight();
    for (const [from, to] of byType[key]) {
      const range = new Range();
      range.setStart(node, from);
      range.setEnd(node, to);
      hl.add(range);
    }
    CSS.highlights.set(key, hl);
  }
}

main();
