import fs from "fs";

function main() {
  const input = fs.readFileSync("input.txt", "utf8");
  const lines = input.split("\n");
  const rows = lines;

  let sum = 0;

  rows.forEach((row) => {
    const regex = /mul\((\d{1,3}),\s*(\d{1,3})\)/g;
    const matches = row.match(regex);
    if (!matches) return;
    const numbers = matches.map((match) => {
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
