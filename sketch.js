let sSheet1;
let sSheet2;
let sSheet3;
let walkAnimation1;
let walkAnimation2;
let walkAnimation3;

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);

  walkAnimation1 = new WalkingAnimation(sSheet1, 80, 80, 200, 200, 9);
  walkAnimation2 = new WalkingAnimation(sSheet2, 80, 80, 100, 300, 9);
  walkAnimation3 = new WalkingAnimation(sSheet3, 80, 80, 300, 90, 9);
}

function draw() {
  background(220);
  walkAnimation1.draw();
  walkAnimation2.draw();
  walkAnimation3.draw();
}

function preload() {
  sSheet1 = loadImage("images/spelunky.png");
  sSheet2 = loadImage("images/green.png");
  sSheet3 = loadImage("images/lime.png");
}

function keyPressed() {
  walkAnimation1.keyPressed(RIGHT_ARROW, LEFT_ARROW);
  walkAnimation2.keyPressed(RIGHT_ARROW, LEFT_ARROW);
  walkAnimation3.keyPressed(RIGHT_ARROW, LEFT_ARROW);
}

function keyReleased() {
  walkAnimation1.keyReleased(RIGHT_ARROW, LEFT_ARROW);
  walkAnimation2.keyReleased(RIGHT_ARROW, LEFT_ARROW);
  walkAnimation3.keyReleased(RIGHT_ARROW, LEFT_ARROW);
}

class WalkingAnimation {
  constructor(sSheet, sWeight, sHeight, dx, dy, animationLength) {
    this.spriteSheet = sSheet;
    this.sw = sWeight;
    this.sh = sHeight;
    this.dx = dx;
    this.dy = dy;
    this.u = 0;
    this.v = 0;
    this.animationLength = animationLength;
    this.frame = 0;
    this.moving = 0;
    this.xDirection = 1;
  }
  draw() {
    if (this.moving != 0) this.u = this.frame % this.animationLength;
    else this.u = 0;

    push();
    translate(this.dx, this.dy);
    scale(this.xDirection, 1);
    image(
      this.spriteSheet,
      0,
      0,
      this.sw,
      this.sh,
      this.u * this.sw,
      this.v * this.sh,
      this.sw,
      this.sh
    );
    pop();

    if (frameCount % 3 == 0) {
      this.frame++;
    }

    this.dx += this.moving;
  }
keyPressed(right, left) {
    if (keyCode === left) {
      this.moving = -3;
      this.xDirection = -1;
      this.frame = 1;
    } else if (keyCode === right) {
      this.moving = 3;
      this.xDirection = 1;
      this.frame = 1;
    }
  }
  keyReleased(right, left) {
    if (keyCode === left || keyCode === right) {
      this.moving = 0;
    }
  }
}