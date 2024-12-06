import fs from "fs";

function main() {
  const input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");
  const lines = input.split("\n");

  const grid = lines.map((line) => line.split(""));

  const loopPositions = new Set<string>();

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === ".") {
        const copyGrid = grid.map((row) => row.slice());

        copyGrid[i][j] = "#";

        if (isLoop(copyGrid)) {
          loopPositions.add(`${i},${j}`);
        }
      }
    }
  }

  console.log(loopPositions.size);
}

function isLoop(grid: string[][]) {
  const startingRow = grid.findIndex((row) => row.includes("^"));
  const startingColumn = grid[startingRow].indexOf("^");

  const visitedPoints = new Set<string>();
  let currentRow = startingRow;
  let currentColumn = startingColumn;
  let currentDirection = [-1, 0];

  visitedPoints.add(
    `${currentRow},${currentColumn},${currentDirection[0]},${currentDirection[1]}`
  );

  while (
    currentRow >= 0 &&
    currentRow < grid.length &&
    currentColumn >= 0 &&
    currentColumn < grid[currentRow].length
  ) {
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

      const positionKey = `${currentRow},${currentColumn},${currentDirection[0]},${currentDirection[1]}`;
      if (visitedPoints.has(positionKey)) {
        return true;
      }
      visitedPoints.add(positionKey);
    }
  }

  return false;
}

main();
