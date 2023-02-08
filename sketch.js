let spriteSheet1;
let spriteSheet2;
let spriteSheet3;
let walkingAnimation1;
let walkingAnimation2;
let walkingAnimation3;

function preload() {
  spriteSheet1 = loadImage("images/spelunky.png");
  spriteSheet2 = loadImage("images/green.png");
  spriteSheet3 = loadImage("images/lime.png");
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);

  walkingAnimation1 = new WalkingAnimation(spriteSheet1, 80, 80, 200, 200, 9);
  walkingAnimation2 = new WalkingAnimation(spriteSheet2, 80, 80, 100, 300, 9);
  walkingAnimation3 = new WalkingAnimation(spriteSheet3, 80, 80, 300, 90, 9);
}

function draw() {
  background(220);
  walkingAnimation1.draw();
  walkingAnimation2.draw();
  walkingAnimation3.draw();
}

function keyPressed() {
  walkingAnimation1.keyPressed(RIGHT_ARROW, LEFT_ARROW);
  walkingAnimation2.keyPressed(RIGHT_ARROW, LEFT_ARROW);
  walkingAnimation3.keyPressed(RIGHT_ARROW, LEFT_ARROW);
}

function keyReleased() {
  walkingAnimation1.keyReleased(RIGHT_ARROW, LEFT_ARROW);
  walkingAnimation2.keyReleased(RIGHT_ARROW, LEFT_ARROW);
  walkingAnimation3.keyReleased(RIGHT_ARROW, LEFT_ARROW);
}

class WalkingAnimation {
  constructor(spriteSheet, sw, sh, dx, dy, animationLength) {
    this.spriteSheet = spriteSheet;
    this.sw = sw;
    this.sh = sh;
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