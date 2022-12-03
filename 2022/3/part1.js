const { open } = require("fs/promises");

async function readFile() {
  const lines = [];
  const file = await open("./input.txt");
  for await (const line of file.readLines()) {
    lines.push(line);
  }
  return lines;
}

const rucksack = await readFile();

function getLetterPoint(letter) {
  if (letter >= "A" && letter <= "Z")
    return letter.charCodeAt(0) - "A".charCodeAt(0) + 27;
  else if (letter >= "a" && letter <= "z")
    return letter.charCodeAt(0) - "a".charCodeAt(0) + 1;
  return 0;
}

let points = 0;
rucksack.forEach((line) => {
  const firstHalf = line.slice(0, line.length / 2);
  const secondHalf = line.slice(line.length / 2);

  const firstSet = new Set();
  firstHalf.split("").forEach((char) => firstSet.add(char));
  const secondSet = new Set();
  secondHalf.split("").forEach((char) => secondSet.add(char));

  for (const key of firstSet)
    if (secondSet.has(key)) points += getLetterPoint(key);
});

console.log(points);
