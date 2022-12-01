/*
By the time you calculate the answer to the Elves' question, they've already realized that the Elf carrying the most Calories of food might eventually run out of snacks.

To avoid this unacceptable situation, the Elves would instead like to know the total Calories carried by the top three Elves carrying the most Calories. That way, even if one of those Elves runs out of snacks, they still have two backups.

In the example above, the top three Elves are the fourth Elf (with 24000 Calories), then the third Elf (with 11000 Calories), then the fifth Elf (with 10000 Calories). The sum of the Calories carried by these three elves is 45000.

Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?
*/
import { open } from "fs/promises";

async function readInput() {
  let elves = [];
  const file = await open("./input.txt");
  let elfIndex = 0;
  for await (const line of file.readLines()) {
    if (typeof elves[elfIndex] === "undefined") elves[elfIndex] = [];
    if (line === "") {
      elfIndex++;
      continue;
    }
    elves[elfIndex].push(parseInt(line));
  }

  return elves.map((elf) =>
    elf.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  );
}

const elves = await readInput();
const sortedElves = elves.sort((a, b) => a - b);
console.log(
  sortedElves[elves.length - 1] +
    sortedElves[elves.length - 2] +
    sortedElves[elves.length - 3]
);
