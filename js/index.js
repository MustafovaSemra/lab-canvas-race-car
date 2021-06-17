const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

// canvas.width = 500;
// canvas.height = 700;

let background = new Image();
background.src = "./images/road.png";

background.onload = function () {
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
};

let racecar = new Image();
racecar.src = "./images/car.png";
racecar.onload = function () {
  // ctx.drawImage(racecar, (canvas.width / 2 ) - racecar.width / 6, 575, racecar.width / 3, racecar.height / 3)
  blueCar.draw();
};

class Car {
  constructor(img, x, y, w, h) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  };
}

let blueCar = new Car(
  racecar,
  canvas.width / 2 - racecar.width / 6,
  575,
  racecar.width / 3,
  racecar.height / 3
);

window.onkeydown = function (e) {
  if (e.key === "ArrowLeft") {
    blueCar.x -= 10;
  }
  if (e.key === "ArrowRight") {
    blueCar.x += 10;
  }
};

class Obstacle {
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
  }
  draw = () => {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  };
  move = () => {
    this.y += 1;
    this.draw();
  };
}

const obstacles = [];
let counter = 0;
setInterval(() => {
  let obs = new Obstacle(
    Math.random() * canvas.width,
    0,
    Math.random() * 100,
    10,
    "red"
  );
  obstacles.push(obs);
}, 1000);

let animatedId = null;
function animate() {
  animatedId = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  blueCar.draw();
  for (let obs of obstacles) {
    obs.move();
    detectCollision(obs, blueCar);
  }
  ctx.fillText(counter, 10, 50);
}

function detectCollision(rect1, rect2) {
  if (
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.y + rect1.h > rect2.y
  ) {
    // collision detected!
    console.log("collision");
    cancelAnimationFrame(animatedId);
  } else {
    counter += 100;
  }
}

ctx.font = "48px serif";

animate();
