const { open } = require("fs/promises");
async function readInput() {
  let rounds = [];
  const file = await open("./input.txt");
  for await (const line of file.readLines()) {
    const round = line.split(" ");
    rounds.push({ opponent: round[0], response: round[1] });
  }

  return rounds;
}

function getShape(char) {
  switch (char) {
    case "A":
    case "X":
      return 1;
    case "B":
    case "Y":
      return 2;
    case "C":
    case "Z":
      return 3;
  }
}

function getResultPoints(opponent, response) {
  if (opponent === response) return 3;
  if (response - opponent === 1 || response - opponent === -2) return 6;
  return 0;
}
/**
 * ROCK = 1
 * PAPER = 2
 * SCISSORS = 3
 */
const assert = require("assert");
assert(getResultPoints(2, 1) === 0, "");
assert(getResultPoints(3, 2) === 0, "");
assert(getResultPoints(1, 3) === 0, "");
assert(getResultPoints(1, 2) === 6, "");
assert(getResultPoints(2, 3) === 6, "");
assert(getResultPoints(3, 1) === 6, "");

const INPUT = await readInput();
console.log(INPUT);

let score = 0;

INPUT.forEach((round) => {
  const opponentShape = getShape(round.opponent);
  const playerShape = getShape(round.response);
  score += playerShape;
  score += getResultPoints(opponentShape, playerShape);
});

console.log(score);
