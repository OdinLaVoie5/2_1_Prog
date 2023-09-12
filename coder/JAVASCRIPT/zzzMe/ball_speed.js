//    ##концепт  ball_speed        без дискрет    с отскоком        не доробот

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var k = 1;
var circle = function (x, y, radius, fillCircle) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  if (fillCircle) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
};


// The Ball constructor
var Ball = function () {
  this.x = width / 2;
  this.y = height / 2;
  this.xSpeed = 5; // начальные условия
  this.ySpeed = 0;
};

Ball.prototype.move = function () {
  this.x += this.xSpeed;
  this.y += this.ySpeed;
  if (this.x < 0) {
    this.xSpeed = -this.xSpeed;
    this.x = 0;
  }
  if (this.x > width) {
    this.xSpeed = -this.xSpeed;
    this.x = width;
  }
  if (this.y < 0) {
    this.ySpeed = -this.ySpeed;
    this.y = 0;
  }
  if (this.y > height) {
    this.ySpeed = -this.ySpeed;
    this.y = height;
  }
};

// Draw the ball at its current position
Ball.prototype.draw = function () {
  circle(this.x, this.y, 10, true);
};

// Set the ball's direction based on a string
// изменение направления и скорости
//  ?? может выделить в отдельн  метод? setSpeed?  не стоит.
Ball.prototype.setDirection = function (direction) {
  //  газ
  if (direction === "up") {
    if (this.xSpeed > 0) {
      this.xSpeed++;
    } else if (this.xSpeed < 0) {
      this.xSpeed--;
    }
    if (this.ySpeed > 0) {
      this.ySpeed++;
    } else if (this.ySpeed < 0) {
      this.ySpeed--;
    }
  }

  // тормоз
  else if (direction === "down") {
    if (this.xSpeed > 0) {
      this.xSpeed--;
    } else if (this.xSpeed < 0) {
      this.xSpeed++;
    }
    if (this.ySpeed > 0) {
      this.ySpeed--;
    } else if (this.ySpeed < 0) {
      this.ySpeed++;
    }
  }

  // стрелки
  if (direction === "right") {
    if (this.ySpeed >= 0 && this.xSpeed > 0) {
      this.xSpeed--;
      this.ySpeed++;
    } else if (this.ySpeed > 0 && this.xSpeed <= 0) {
      this.xSpeed--;
      this.ySpeed--;
    } else if (this.ySpeed < 0 && this.xSpeed >= 0) {
      this.xSpeed++;
      this.ySpeed++;
    } else if (this.ySpeed <= 0 && this.xSpeed < 0) {
      this.xSpeed++;
      this.ySpeed--;
    } else if (this.ySpeed === 0 && this.xSpeed === 0) {
      this.xSpeed = k;
    }
  }
  if (direction === "left") {
    if (this.ySpeed > 0 && this.xSpeed >= 0) {
      this.xSpeed++;
      this.ySpeed--;
    } else if (this.ySpeed >= 0 && this.xSpeed < 0) {
      this.xSpeed++;
      this.ySpeed++;
    } else if (this.ySpeed <= 0 && this.xSpeed > 0) {
      this.xSpeed--;
      this.ySpeed--;
    } else if (this.ySpeed < 0 && this.xSpeed <= 0) {
      this.xSpeed--;
      this.ySpeed++;
    } else if (this.ySpeed === 0 && this.xSpeed === 0) {
      this.xSpeed = -k;
    }
  }

  // стоп
  if (direction === "stop") {
    k = Math.abs(this.xSpeed) + Math.abs(this.ySpeed);
    this.xSpeed = 0;
    this.ySpeed = 0;
  }

  // клава
  if (direction >= 49 && direction <= 57) {
    if (this.xSpeed > 0) {
      this.xSpeed = direction - 48;
      this.speed = Math.abs(this.xSpeed);
    } else if (this.xSpeed < 0) {
      this.xSpeed = -(direction - 48);
      this.speed = Math.abs(this.xSpeed);
    }
    if (this.ySpeed > 0) {
      this.ySpeed = direction - 48;
      this.speed = Math.abs(this.ySpeed);
    } else if (this.ySpeed < 0) {
      this.ySpeed = -(direction - 48);
      this.speed = Math.abs(this.ySpeed);
    }
    if (this.xSpeed === 0 && this.ySpeed === 0) {
      //  положение паузы
      this.speed = direction - 48;
    }
  }
  // тест строка MY
  var test = document.getElementById("test");
  test.innerHTML = ball.xSpeed + " " + ball.ySpeed;
};

// Create the ball object
var ball = new Ball();

// An object to convert keycodes into action names
var keyActions = {
  //легетимные кнопки
  32: "stop", // пробел
  37: "left",
  38: "up",
  39: "right",
  40: "down",
  90: "z",
  88: "x",
};

// нажатия клавы
window.onkeydown = function (e) {
  // ?? сделать проверку на легетимные кнопки?
  var direction = keyActions[e.keyCode];
  ball.setDirection(direction);
  if (e.keyCode >= 49 && e.keyCode <= 57) {
    ball.setDirection(e.keyCode);
  }
  var test = document.getElementById("test");
  test.innerHTML = test.innerHTML + "/// " + e.keyCode + "/// " + e.keyCode;
};

// The animation function, called every 30 ms
setInterval(function () {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "red";
  ball.draw();
  ball.move();
  ctx.strokeRect(0, 0, width, height);
}, 50);

console.log("Hellobro ? ");

console.log("2")
