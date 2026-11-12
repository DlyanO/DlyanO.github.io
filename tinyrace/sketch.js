let racerXs = [30, 30, 30, 30];
let startY = 50;
let yStep = 60;
let finishX = 560;


function setup() {
  createCanvas(600, startY + yStep * racerXs.length);
}

function draw() {
  background(240);
  line(finishX, 0, finishX, height);

  for (let i = 0; i < racerXs.length; i++) {
    let y = startY + yStep * i;
    racerXs[i] += random(1, 3);
    circle(racerXs[i], y, 24);
  }

 if(racerXs.some(x => x >= finishX)) {
    fill(0);
    textSize(24);
    text("Winner!", 20, 30);
  }
  if (racerXs.some(x => x >= finishX)) noLoop();



}