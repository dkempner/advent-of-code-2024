import fs from "fs";

const allDirections: [number, number][] = [
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

function main() {
  const input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");
  const lines = input.split("\n");

  let matches = 0;

  const grid = lines.map((line) => line.split(""));

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      for (const direction of allDirections) {
        if (canMakeWithDirection("AS", grid, i, j, direction)) {
          const oppositeDirection: [number, number] = [
            direction[1],
            direction[0],
          ];
          if (canMakeWithDirection("AM", grid, i, j, oppositeDirection)) {
            const quarterTurn1: [number, number] = [
              direction[0],
              -direction[1],
            ];
            const quarterTurn2: [number, number] = [
              -direction[0],
              direction[1],
            ];
            if (
              canMakeWithDirection("AM", grid, i, j, quarterTurn1) &&
              canMakeWithDirection("AS", grid, i, j, quarterTurn2)
            ) {
              matches++;
            }

            if (
              canMakeWithDirection("AM", grid, i, j, quarterTurn2) &&
              canMakeWithDirection("AS", grid, i, j, quarterTurn1)
            ) {
              matches++;
            }
          }
        }
      }
    }
  }

  console.log(matches);
}

function canMakeWithDirection(
  word: string,
  grid: string[][],
  i: number,
  j: number,
  direction: [number, number]
): boolean {
  if (word.length === 0) return true;

  if (i < 0 || i >= grid.length || j < 0 || j >= grid[i].length) return false;

  const firstChar = word[0];
  if (grid[i][j] !== firstChar) return false;

  return canMakeWithDirection(
    word.slice(1),
    grid,
    i + direction[0],
    j + direction[1],
    direction
  );
}

main();
