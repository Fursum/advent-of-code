import { open } from "fs/promises";

const SIGNAL_LENGTH = 14; // No part 2 file needed

async function readFile() {
  const lines: string[] = [];
  const file = await open("./2022/6/input.txt");
  for await (const line of file.readLines()) {
    lines.push(line);
  }
  return lines;
}

function isAllUnique(chars: string) {
  const set = new Set(chars.split(""));
  return set.size === chars.length;
}

function findStartingIndex(line: string) {
  for (let i = 0; i < line.length; i++) {
    if (i + SIGNAL_LENGTH >= line.length)
      throw new Error("No starting index found at line: " + line);
    if (isAllUnique(line.slice(i, i + SIGNAL_LENGTH))) return i + SIGNAL_LENGTH;
  }
}

async function main() {
  const lines = await readFile();
  const indexes = lines.map((line) => findStartingIndex(line));
  console.log(indexes);
}

main();
