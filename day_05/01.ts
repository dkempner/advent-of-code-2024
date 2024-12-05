import fs from "fs";

function main() {
  const input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");
  const lines = input.split("\n");

  let section = 0;

  const xy: [number, number][] = [];
  const updates: number[][] = [];

  const correctUpdates: number[][] = [];

  for (const line of lines) {
    if (!line.trim()) {
      section++;
      continue;
    }

    if (section === 0) {
      const split = line.split("|");
      const x = Number(split[0]);
      const y = Number(split[1]);
      xy.push([x, y]);
    }

    if (section === 1) {
      updates.push(line.split(",").map(Number));
    }
  }

  updates.forEach((update) => {
    let valid = true;
    xy.forEach(([x, y]) => {
      const xIndex = update.indexOf(x);
      const yIndex = update.indexOf(y);

      if (xIndex === -1 || yIndex === -1) {
        return;
      }

      if (xIndex > yIndex) {
        valid = false;
      }
    });

    if (valid) correctUpdates.push(update);
  });

  let sum = 0;

  for (const update of correctUpdates) {
    const middle = update[Math.floor(update.length / 2)];
    sum += middle;
  }

  console.log(sum);
}

main();
