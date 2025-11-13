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
    textNodeForCode(node, code);
  }
  input.textContent = examples.str;
  updateHL(examples.str);
  input.addEventListener("input", (e) => {
    const code = e.target.value;
    updateHL(code);
  });
}

function textNodeForCode(node, code) {
  const { info, error } = getHighlightInfo(code);
  if (error) {
    console.error(error);
  }
  for (const key in info.byType) {
    const hl = new Highlight();
    for (const [from, to] of info.byType[key]) {
      const range = new Range();
      range.setStart(node, from);
      range.setEnd(node, to);
      hl.add(range);
    }
    CSS.highlights.set(key, hl);
  }
}

main();
