import fs from "fs";

function main() {
  const input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");
  const lines = input.split("\n");
  const rows = lines.map((line) => line.split(" ").map(Number));

  let safe = 0;

  for (const row of rows) {
    if (isSafeWithRemoval(row)) safe++;
  }

  console.log(safe);
}

function isSafeWithRemoval(row: number[]) {
  if (isSafe(row)) return true;
  for (let i = 0; i < row.length; i++) {
    const newRow = row.filter((_, index) => index !== i);
    if (isSafe(newRow)) return true;
  }
  return false;
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
