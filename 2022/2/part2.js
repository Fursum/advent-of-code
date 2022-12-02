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

function getGoalResult(char) {
  switch (char) {
    case "X":
      return "LOSE";
    case "Y":
      return "DRAW";
    case "Z":
      return "WIN";
  }
}

/**
 *
 * @param {1 | 2 | 3} opponent
 * @param {'X' | 'Y' | 'Z'} response
 * @returns
 */
function getResultPoints(opponent, response) {
  switch (getGoalResult(response)) {
    case "WIN":
      if (opponent === 3) return 6 + 1;
      return 6 + opponent + 1;
    case "LOSE":
      if (opponent === 1) return 3;
      return opponent - 1;
    case "DRAW":
      return 3 + opponent;
  }
}
/**
 * ROCK = 1
 * PAPER = 2
 * SCISSORS = 3
 */
assert(getResultPoints(1, "X") === 3);
assert(getResultPoints(1, "Y") === 4);
assert(getResultPoints(1, "Z") === 8);
assert(getResultPoints(2, "X") === 1);
assert(getResultPoints(2, "Y") === 5);
assert(getResultPoints(2, "Z") === 9);
assert(getResultPoints(3, "X") === 2);
assert(getResultPoints(3, "Y") === 6);
assert(getResultPoints(3, "Z") === 7);

const INPUT = await readInput();

let score = 0;

INPUT.forEach((round) => {
  const opponentShape = getShape(round.opponent);
  score += getResultPoints(opponentShape, round.response);
});

console.log(score);
