const { open } = require("fs/promises");

async function readFile() {
  const lines = [];
  const file = await open("./input.txt");
  for await (const line of file.readLines()) {
    lines.push(line);
  }
  return lines;
}

const lines = await readFile();
let groups = [];
for (let i = 0; i + 3 <= lines.length; i += 3)
  groups.push([lines[i], lines[i + 1], lines[i + 2]]);

function getLetterPoint(letter) {
  if (letter >= "A" && letter <= "Z")
    return letter.charCodeAt(0) - "A".charCodeAt(0) + 27;
  else if (letter >= "a" && letter <= "z")
    return letter.charCodeAt(0) - "a".charCodeAt(0) + 1;
  return 0;
}

let points = 0;
groups.forEach((group) => {
  const first = group[0];
  const second = group[1];
  const third = group[2];

  const firstSet = new Set();
  first.split("").forEach((char) => firstSet.add(char));
  const secondSet = new Set();
  second.split("").forEach((char) => secondSet.add(char));
  const thirdSet = new Set();
  third.split("").forEach((char) => thirdSet.add(char));

  for (const key of firstSet)
    if (secondSet.has(key) && thirdSet.has(key)) points += getLetterPoint(key);
});

console.log(points);
