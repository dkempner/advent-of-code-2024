import fs from "fs";

function main() {
  const input = fs.readFileSync("input.txt", "utf8");
  const lines = input.split("\n");
  const rows = lines;

  let sum = 0;

  let shouldDo = true;

  rows.forEach((row) => {
    const regex = /mul\((\d{1,3}),(\d{1,3})\)|don't\(\)|do\(\)/g;
    const matches = row.match(regex);
    if (!matches) return;

    const matchesFinal: string[] = [];

    matches.forEach((match) => {
      if (match === "don't()") {
        shouldDo = false;
        return;
      }
      if (match === "do()") {
        shouldDo = true;
        return;
      }
      if (shouldDo) matchesFinal.push(match);
    });

    const numbers = matchesFinal.map((match) => {
      const regex = /(\d{1,3})/g;
      const numbers = match.match(regex);
      if (!numbers) return;
      return numbers.map(Number);
    });

    numbers.forEach((x) => {
      sum += x![0] * x![1];
    });
  });

  console.log(sum);
}

main();
