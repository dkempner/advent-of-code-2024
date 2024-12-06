import fs from "fs";

function main() {
  const input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");
  const lines = input.split("\n");

  const grid = lines.map((line) => line.split(""));

  const startingRow = grid.findIndex((row) => row.includes("^"));
  const startingColumn = grid[startingRow].indexOf("^");

  const visitedPoints = new Set<string>();

  let currentRow = startingRow;
  let currentColumn = startingColumn;

  let currentDirection = [-1, 0];

  while (
    currentRow > -1 &&
    currentRow < grid.length &&
    currentColumn > -1 &&
    currentColumn < grid[currentRow].length
  ) {
    console.log(currentRow, currentColumn);
    visitedPoints.add(`${currentRow},${currentColumn}`);
    const nextRow = currentRow + currentDirection[0];
    const nextColumn = currentColumn + currentDirection[1];

    if (
      nextRow < 0 ||
      nextRow >= grid.length ||
      nextColumn < 0 ||
      nextColumn >= grid[nextRow].length
    ) {
      break;
    }

    const nextPoint = grid[nextRow][nextColumn];

    if (nextPoint === "#") {
      currentDirection = [currentDirection[1], -currentDirection[0]];
    } else {
      currentRow = nextRow;
      currentColumn = nextColumn;
    }
  }

  console.log(visitedPoints.size);
}

main();
