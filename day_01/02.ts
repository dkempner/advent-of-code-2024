import fs from "fs";

function main() {
  const input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");
  const lines = input.split("\n");
  const pairs = lines.map((line) => line.split("  ").map(Number));
  const left = pairs.map((pair) => pair[0]).sort((a, b) => a - b);
  const right = pairs.map((pair) => pair[1]).sort((a, b) => a - b);
  let total = 0;

  const rightCount = new Map<number, number>();

  for (const num of right) {
    rightCount.set(num, (rightCount.get(num) || 0) + 1);
  }

  for (const num of left) {
    const count = rightCount.get(num) || 0;
    total += num * count;
  }

  console.log(total);
}

main();
