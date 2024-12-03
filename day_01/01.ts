import fs from "fs";

function main() {
  const input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");
  const lines = input.split("\n");
  const pairs = lines.map((line) => line.split("  ").map(Number));
  const leftSorted = pairs.map((pair) => pair[0]).sort((a, b) => a - b);
  const rightSorted = pairs.map((pair) => pair[1]).sort((a, b) => a - b);
  let total = 0;

  for (let i = 0; i < leftSorted.length; i++) {
    total += Math.abs(leftSorted[i] - rightSorted[i]);
  }

  console.log(total);
}

main();
