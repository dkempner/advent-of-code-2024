import fs from "fs";

function main() {
  const input = fs.readFileSync("input.txt", "utf8");
  const lines = input.split("\n");
  const rows = lines.map((line) => line.split(" ").map(Number));

  let safe = 0;

  for (const row of rows) {
    if (isSafe(row)) safe++;
  }

  console.log(safe);
}

function isSafe(row: number[]) {
  let prev = row[0];
  let lastDiff = 0;
  for (let i = 1; i < row.length; i++) {
    const diff = row[i] - prev;
    const abs = Math.abs(diff);
    if (lastDiff > 0 && diff < 0) return false;
    if (lastDiff < 0 && diff > 0) return false;
    if (abs < 1) return false;
    if (abs > 3) return false;
    lastDiff = diff;
    prev = row[i];
  }
  return true;
}

main();
