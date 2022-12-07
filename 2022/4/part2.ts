import { open } from "fs/promises";

async function readFile() {
  const lines: string[] = [];
  const file = await open("./2022/4/input.txt");
  for await (const line of file.readLines()) {
    lines.push(line);
  }
  return lines;
}

async function main() {
  const lines = await readFile();
  const assignments = lines.map((line) => {
    const elves = line.split(",");
    return {
      firstElf: elves[0].split("-").map((s) => parseInt(s)),
      secondElf: elves[1].split("-").map((s) => parseInt(s)),
    };
  });

  const matchingPairs = assignments.filter((assignment) => {
    const { firstElf, secondElf } = assignment;
    if (firstElf[0] > secondElf[1]) return false;
    if (firstElf[1] < secondElf[0]) return false;
    return true;
  });

  console.log(matchingPairs.length);
}

main();
