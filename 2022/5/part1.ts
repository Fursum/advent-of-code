import { open } from "fs/promises";

async function readFile() {
  let moveLinesFlag = false;
  const constructor: string[] = [];
  const moves: string[] = [];
  const file = await open("./2022/5/input.txt");
  for await (const line of file.readLines()) {
    if (line == "") {
      moveLinesFlag = true;
      continue;
    }
    if (!moveLinesFlag) constructor.push(line);
    else moves.push(line);
  }
  return { constructor, moves };
}

function splitConstructorLine(line: string) {
  const crates: string[] = [];
  for (let i = 0; i + 3 <= line.length; i += 4)
    crates.push(line.slice(i, i + 3));
  return crates;
}

function createStacks(constructorLines: string[][]) {
  let stacks: string[][] = [];

  constructorLines.reverse().forEach((line) => {
    line.forEach((letter, index) => {
      if (!stacks[index]) stacks[index] = []; // Initialize array before pushing
      if (letter !== "   ") stacks[index].push(letter);
    });
  });

  return stacks;
}

function readMove(moveLine: string) {
  // Ex move line: 'move 10 from 8 to 4'
  // Split: ['move', '10', 'from', '8', 'to', '4']
  const splitLine = moveLine.split(" ");
  return {
    moveCount: parseInt(splitLine[1]),
    from: parseInt(splitLine[3]) - 1,
    to: parseInt(splitLine[5]) - 1,
  };
}

async function main() {
  const { constructor, moves } = await readFile();

  let stacks: string[][] = createStacks(
    // Remove last line before parsing
    constructor.slice(0, -1).map((line) => splitConstructorLine(line))
  );

  moves.forEach((line) => {
    const move = readMove(line);
    for (let i = 0; i < move.moveCount; i++) {
      if (stacks[move.from].length === 0) break;
      const popped = stacks[move.from].pop();
      stacks[move.to].push(popped!);
    }
  });

  stacks.forEach((stack) => {
    console.log(stack[stack.length - 1][1]);
  });
}

main();
