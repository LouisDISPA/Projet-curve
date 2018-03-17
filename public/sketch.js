var player;
var socket;

function setup() {
  createCanvas(600, 600);
  background(2);
  textAlign(CENTER);
  textSize(18);
  player = new Player();
  socket = io.connect('http://82.235.199.149:30000')
  socket.on('playerNumber', playerNumber);
  socket.on('pos1', pos1);
  socket.on('pos2', pos2);
  socket.on('pos3', pos3);
  socket.on('reste', reste);

}
function reste() {
  player.reset();
}

function pos1(data) {
  fill(255, 2, 2, 150);
  noStroke();
  ellipse(data.x, data.y, 5, 5);
}

function pos2(data) {
  fill(2, 255, 2, 150);
  noStroke();
  ellipse(data.x, data.y, 5, 5);
}

function pos3(data) {
  fill(2, 2, 255, 150);
  noStroke();
  ellipse(data.x, data.y, 5, 5);
}

function playerNumber(data) {
  fill(2);
  rect(0, 0, 50, 50);
  if (data == 1) {
    player.number = 1;
    player.color =  color(255, 2, 2, 150);
  }
  if (data == 2) {
    player.number = 2;
    player.color =  color(2, 255, 2, 110);
  }
  if (data == 3) {
    player.number = 3;
    player.color =  color(2, 2, 255, 120);
  }
  if (data <= 3) player.reset();
}

function draw() {
  player.direction();
  player.update();
  player.show();
}

function keyPressed() {
  if (keyCode === 32 && (player.speed == 0)) {
    socket.emit('reset');
  }
}
