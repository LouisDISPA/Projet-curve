function Player(number) {
  this.x = random(30, width - 30);
  this.y = random(30, height - 30);
  this.dir = p5.Vector.random2D();
  this.speed = 1.5;
  this.trou = false;
  this.count = 0;
  this.number;
  this.color;
}
Player.prototype.array = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false, false, false,
  false, false, false, false, true, false, false, false, false, false,
  false, false, false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false, false, false, false, false, false
];

Player.prototype.show = function() {
  if (this.speed != 0 && this.number) {
    if (!this.trou) {
      fill(this.color);
      noStroke();
      ellipse(this.x, this.y, 5, 5);

      var data = {
        x: this.x,
        y: this.y
      }
      socket.emit('position'+ player.number, data)
      this.count++;
      if (this.count > 20) var rand = random(this.array);
      if (rand) {
        this.trou = true;
        this.count = 0
      }
    } else {
      this.count++;
      if (this.count > random(10, 20)) {
        this.trou = false;
        this.count = 0;
      }
    }
  }
}

Player.prototype.update = function() {
  this.x += this.dir.x * this.speed;
  this.y += this.dir.y * this.speed;
  pix = get(this.x, this.y);
  if (pix[0] > 220) this.speed = 0;
  if (pix[1] > 220) this.speed = 0;
  if (pix[2] > 220) this.speed = 0;
  if (pix[0] == 0 && pix[1] == 0) this.speed = 0;
  if (this.number == 1) {
    if (pix[1] > 70) this.speed = 0;
    if (pix[2] > 70) this.speed = 0;
  } else if (this.number == 2){
    if (pix[0] > 70) this.speed = 0;
    if (pix[2] > 70) this.speed = 0;
  } else if (this.number == 3){
    if (pix[0] > 70) this.speed = 0;
    if (pix[1] > 70) this.speed = 0;
  }
}
Player.prototype.direction = function() {
    if (keyIsDown(RIGHT_ARROW)) this.dir.rotate(0.05);
    if (keyIsDown(LEFT_ARROW)) this.dir.rotate(-0.05);
};

Player.prototype.reset = function() {
  this.x = random(30, width - 30);
  this.y = random(30, height - 30);
  this.dir = p5.Vector.random2D();
  this.speed = 1.5;
  background(2);
  fill(this.color.levels[0],this.color.levels[1],this.color.levels[2], 120);
  text('player: ' + this.number, 40, 20);
};
