let racerXs = [10, 0,0];
let moves = [3,2,1];

for (let round = 1; round <= 3; round++) {
  for (let i = 0; i < racerXs.length; i++) {
    racerXs[i] += moves[i];
    if (racerXs[i] > 12) {
      moves[i] -= 1;
    }
  }
}
 
console.log("Positions:", racerXs);
console.log("Moves:", moves);