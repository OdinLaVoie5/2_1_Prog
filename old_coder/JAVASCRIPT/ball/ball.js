 //  !!!  ##событие   нажатие на клаву                  + JQuery
/*
$("body").keydown(function (event) {
document.write(event.keyCode);    document.write("<br>");
});

var keyNames = {
32: "space",
37: "left",
38: "up",
39: "right",
40: "down",
16: "shift",
17: "ctrl",
18: "alt",
91: "win",
20: "capslock",
9:  "tab",
13: "enter",
8:  "backspase",
27: "esc"
};

$("body").keydown(function (event) {
document.write(keyNames[event.keyCode]);    document.write("<br>"); 
});
*/
//==========================================================================










// 1 ========================================================

//  ##MY !!!!  цветные шары  9 шт    + 1 управление             
var canvas1 = document.getElementById("canvas1");    
var ctx1 = canvas1.getContext("2d"); 
var colorBall1=["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Lime", "LimeGreen", "Gold", "Magenta", "Maroon", "MediumAquamarine"];
           
canvas1.setAttribute("width", "400");     // изменение значения аттрибута 
canvas1.setAttribute("height", "400");    

function Ball1 (x,y,xSpeed,ySpeed, r) {       // конструктор
  this.x = x;
  this.y = y;
  this.xSpeed = xSpeed;
  this.ySpeed = ySpeed;
  this.r = r;
};


Ball1.prototype.checkCollision = function () {
  if (this.x < 0 || this.x > 400) {
  this.xSpeed = -this.xSpeed;
  }
  if (this.y < 0 || this.y > 400) {
  this.ySpeed = -this.ySpeed;
  }
  if (this.x < 0) this.x = 0; 
  if (this.x > 400) this.x = 400; 
  if (this.y < 0) this.y = 0; 
  if (this.y > 400) this.y = 400; 
};


Ball1.prototype.draw = function () {
circle(this.x, this.y, this.r, true, ctx1);           //  сделать переменный радиус?
};

Ball1.prototype.move = function () {
this.x += this.xSpeed;
this.y += this.ySpeed;
};

 

Ball1.prototype.setDirection = function (direction) {
if (direction === "up") {
this.xSpeed = 0;
this.ySpeed -= 5;
} else if (direction === "down") {
this.xSpeed = 0;
this.ySpeed += 5;
} else if (direction === "left") {
this.xSpeed -= 5;
this.ySpeed = 0;
} else if (direction === "right") {
this.xSpeed += 5;
this.ySpeed = 0;
} else if (direction === "stop") {
this.xSpeed = 0;
this.ySpeed = 0;
}
};
 
var keyActions1 = {     
32: "stop",               // пробел
37: "left",
38: "up",
39: "right",
40: "down"
};

          
$("body").keydown(function (event) {       // перехват клавы
var direction = keyActions1[event.keyCode];
ball1[s].setDirection(direction);
});


var ball1=[];                         // создал 10 мячей циклом  !!!
for(i=0;i<10;i++){
	ball1[i] = new Ball1(Math.floor(Math.random()* 200), Math.floor(Math.random()* 200), i+2, 10-i, 10);
}
ball1[0].r = 20              // начальн управляемый мяч


var s=0;
canvas1.onclick = function () {                    // перехват  клика 
	s++;	
	if (s>9){s=0;}
	for (var i=0;i<10;i++){
		if (i!==s){ball1[i].r = 10}	
	}									// выбор следующ мяча
	ball1[s].r = 20;
};  


//   цикл анимации
setInterval(function () {
ctx1.clearRect(0, 0, 400, 400);
for(var k=0;k<10;k++){                  //  и ПРОРИСОВКА 10 мячей
	ctx1.fillStyle = colorBall1[k];            //  цвета из массива colorBall
	ball1[k].draw();
	ball1[k].move();
	ball1[k].checkCollision();	
}
for(var i=0;i<10;i++){                  // !!!  ФИЗИКА   вынести отдельно ???
	for(var j=0;j<10;j++){  //  ???? не учтено  удар вскользь, масса ... ... на высок скорости пролетает насквозь можно учесть.      учесть разные радиусы.     ?? задача убегать от одних, хватать других (см модель рыбьих стай pascal abc ?).     сделать с инерцией stop по пробелу и повороты .   + бластер, клинок ... ??
		if (i!==j){
			var ixS=ball1[i].xSpeed,  iyS=ball1[i].ySpeed,  jxS=ball1[j].xSpeed,  jyS=ball1[j].ySpeed;
			var ijX=ball1[i].x - ball1[j].x, ijY=ball1[i].y - ball1[j].y;                 //  разница координат
			var ddd = Math.pow(ijX,2) + Math.pow(ijY,2);   ddd= Math.sqrt(ddd);                                // расстояние меж шарами
			if (  ddd <=20 )  {
				var delX=ijX*(20/ddd-1)/2           // нахлёст друг на друга 
				var delY=ijY*(20/ddd-1)/2 		
				ball1[i].x+=delX; ball1[i].y+=delY; ball1[j].x-=delX; ball1[j].y-=delY; // после контакта развести чтобы не было повторного контакта)
				ball1[i].xSpeed=jxS;  ball1[j].xSpeed=ixS;   	ball1[i].ySpeed=jyS;   	ball1[j].ySpeed=iyS;      //  обмениваться скоростями
			}
		}
	}
}
}, 100);







// 2 ===============================================================

//    ##MY   ##концепт   сильно усложнил но может пригодиться для не дискретных значений скоростей ... ...   управляемый мяч         пробел- стоп/пуск нет потери скорости при повороте.
//    прибавление скор стрелками ??
var canvas2 = document.getElementById("canvas2");
var ctx2 = canvas2.getContext("2d");
var width2 = canvas2.width;
var height2 = canvas2.height;


// The Ball constructor
var Ball2 = function (szep) {
	this.x = width2 / 2;
	this.y = height2 / 2;
	this.xSpeed = 5;               // начальные условия
	this.ySpeed = 0;
	this.szep = szep;
};
//  ##вариант 1 Update the ball's position based on its speed 
Ball2.prototype.move = function () {
	this.x += this.xSpeed;
	this.y += this.ySpeed;
	if (this.x < 0) {
		this.xSpeed = -this.xSpeed;
		this.x = 0;
	} 
	if (this.x > width2) {
		this.xSpeed = -this.xSpeed;
		this.x = width2;
	} 
	if (this.y < 0) {
		this.ySpeed = -this.ySpeed;
		this.y = 0;
	} 
	if (this.y > height2) {
		this.ySpeed = -this.ySpeed;
		this.y = height2;
	} 
};

//вариант- 2 без отскока     Ball2.prototype.move = function () {this.x += this.xSpeed; this.y += this.ySpeed; if (this.x < 0) { this.x = width2;} else if (this.x > width2) {this.x = 0;} else if (this.y < 0) {this.y = height2;} else if (this.y > height2) {this.y = 0;}};


// Draw the ball at its current position
Ball2.prototype.draw = function () {
circle(this.x, this.y, 10, true, ctx2);  
};
	var k=true,xxx,yyy;   

// Set the ball's direction based on a string
// изменение направления
Ball2.prototype.setDirection = function (direction) {
	  if (direction === "up") {
		this.xSpeed = 0;
		this.ySpeed = -this.szep;
		k=true;
		this.szep = Math.abs(this.xSpeed+this.ySpeed);
	} else if (direction === "down") {
		this.xSpeed = 0; 
		this.ySpeed = this.szep;
		k=true;
		this.szep = Math.abs(this.xSpeed+this.ySpeed);
	} else if (direction === "left") {
		this.xSpeed = -this.szep;
		this.ySpeed = 0;
		k=true;
		this.szep = Math.abs(this.xSpeed+this.ySpeed);
	} else if (direction === "right") {
		this.xSpeed = this.szep;
		this.ySpeed = 0;
		k=true;
		this.szep = Math.abs(this.xSpeed+this.ySpeed);
	}; 
	if (direction === "stop") {                    // стоп/пуск     ##MY !!
		if (k){
		this.szep = Math.abs(this.xSpeed+this.ySpeed);
		xxx=this.xSpeed, yyy=this.ySpeed 
		this.xSpeed = 0;   this.ySpeed = 0;
		k=false;
		} 
		else {this.xSpeed = xxx; this.ySpeed = yyy;
		this.szep = Math.abs(this.xSpeed+this.ySpeed);
		k=true 
		}
	}
	var test =document.getElementById("test");
	test.innerHTML= ball2.szep+" "+ball2.xSpeed +" "+ball2.ySpeed ;

};


// Create the ball object
var ball2 = new Ball2(5);


// An object to convert keycodes into action names
var keyActions2 = {
32: "stop",               // пробел
37: "left",
38: "up",
39: "right",
40: "down"
};

// The keydown handler that will be called for every keypress
$("body").keydown(function (event) {
	var direction = keyActions2[event.keyCode];
	ball2.setDirection(direction);
	if (event.keyCode>=49 && event.keyCode<=57){     //1234... назнач скорости
		ball2.szep= (event.keyCode- 48);    // szep здесь влияет н движение только через setDirection. поэтому setDirection ниже и вызываю.
		if (ball2.xSpeed<0){ball2.setDirection("left")} //приращ скорости в завис от напрвл мяча 
		else if (ball2.xSpeed>0){ball2.setDirection("right")}
		if (ball2.ySpeed<0){ball2.setDirection("up")}
		else if (ball2.ySpeed>0){ball2.setDirection("down")}
	}
	var test =document.getElementById("test");
	test.innerHTML=test.innerHTML+" " +event.keyCode;
});




// The animation function, called every 30 ms
setInterval(function () {
ctx2.clearRect(0, 0, width2, height2);
ctx2.fillStyle="red";
ball2.draw();
ball2.move();
}, 50);











// 3 ! ===============================================================

//  !!!  управляемый мяч      ##концепт 1      пробел - стоп нет потери скорости при повороте.          управление стрелки пробел цифры Z X C V
//    прибавление скор стрелками ??
// ???   сделать яблоки (др шары) чтобы съедал и рос  в размере (r) ... без отскока?
var canvas3 = document.getElementById("canvas3");
var ctx3 = canvas3.getContext("2d");
var width3 = canvas3.width;
var height3 = canvas3.height;


// The Ball3 constructor
var Ball3 = function () {
	this.x = width3 / 2;
	this.y = height3 / 2;
	this.xSpeed =5;               // начальные условия
	this.ySpeed =0;
	this.speed =5;         // ?? можно эффект- в завис от speed- размер мяча r ... ...
	this.r = 10;
};
//   ##вариант 1  Update the ball's position based on its speed
Ball3.prototype.move = function () {
	this.x += this.xSpeed;
	this.y += this.ySpeed;
	if (this.x < 0) {
		this.xSpeed = -this.xSpeed;
		this.x = 0;
	} 
	if (this.x > width3) {
		this.xSpeed = -this.xSpeed;
		this.x = width3;
	} 
	if (this.y < 0) {
		this.ySpeed = -this.ySpeed;
		this.y = 0;
	} 
	if (this.y > height3) {
		this.ySpeed = -this.ySpeed;
		this.y = height3;
	} 
};

//вариант- 2 Update the ball's position based on its speed     Ball3.prototype.move = function () {this.x += this.xSpeed; this.y += this.ySpeed; if (this.x < 0) { this.x = width3;} else if (this.x > width3) {this.x = 0;} else if (this.y < 0) {this.y = height3;} else if (this.y > height3) {this.y = 0;}};


// Draw the ball at its current position
Ball3.prototype.draw = function () {
circle(this.x, this.y, this.r, true, ctx3);  
};


// Set the ball's direction based on a string
// изменение направления и скорости 
//  ?? может выделить в отдельн  метод? setSpeed?  не стоит.
Ball3.prototype.setDirection = function (direction) {                    
	if(this.speed===0){this.speed=1}    // ??

//  газ	
	if (direction === "x") {                       
		if(this.xSpeed>0){this.xSpeed++; this.speed=this.xSpeed}
		else if(this.xSpeed<0){this.xSpeed--; this.speed=Math.abs(this.xSpeed)};
		if(this.ySpeed>0){this.ySpeed++; this.speed=this.ySpeed}
		else if(this.ySpeed<0){this.ySpeed--; this.speed=Math.abs(this.ySpeed)};
		if(this.xSpeed===0 && this.ySpeed===0){this.speed++};  //  положение паузы
	}

// тормоз	
	else if (direction === "z") {    
		if(this.xSpeed>0){this.xSpeed--; this.speed=Math.abs(this.xSpeed)}
		else if(this.xSpeed<0){this.xSpeed++; this.speed=Math.abs(this.xSpeed)};
		if(this.ySpeed>0){this.ySpeed--; this.speed=Math.abs(this.ySpeed)}
		else if(this.ySpeed<0){this.ySpeed++; this.speed=Math.abs(this.ySpeed)};
		if(this.xSpeed===0 && this.ySpeed===0){ //  положение паузы
			this.speed--; 
			if(this.speed<0){this.speed=0} 
		} 	 
	};

// уменьш	
	if (direction === "c") {
		this.r--; 
		if(this.r<3){this.r=3}
	};

// увелич	
	if (direction === "v") {
		this.r++; 
		if(this.r>30){this.r=30}
	};
	
// стрелки
	 if (direction === "down"){this.ySpeed=this.speed; this.xSpeed = 0}
	else if (direction === "up") {this.ySpeed=-this.speed; this.xSpeed = 0}; 

	if (direction === "right") {this.xSpeed=this.speed; this.ySpeed = 0} 
	else if (direction === "left"){this.xSpeed=-this.speed; this.ySpeed = 0};
	
// стоп
	if (direction === "stop") {this.xSpeed = 0;  this.ySpeed = 0};
		
// клава	
	if(direction>=49 && direction<=57){
		if(this.xSpeed>0){this.xSpeed=(direction-48); this.speed=Math.abs(this.xSpeed)}
		else if(this.xSpeed<0){this.xSpeed=-(direction-48); this.speed=Math.abs(this.xSpeed)};
		if(this.ySpeed>0){this.ySpeed=(direction-48); this.speed=Math.abs(this.ySpeed)}
		else if(this.ySpeed<0){this.ySpeed=-(direction-48); this.speed=Math.abs(this.ySpeed)};
		if(this.xSpeed===0 && this.ySpeed===0){ //  положение паузы
			this.speed=direction-48;
		}
	}
// тест строка MY
	var test =document.getElementById("test");
	test.innerHTML= Ball3.xSpeed +" "+Ball3.ySpeed +" "+this.speed;
};



// Create the ball object
var Ball3 = new Ball3();


// An object to convert keycodes into action names
var keyActions3 = {             //легетимные кнопки
32: "stop",               // пробел
37: "left",
38: "up",
39: "right",
40: "down",
90: "z",
88: "x",
67: "c",
86: "v"
};


// нажатия клавы
window.onkeydown = function (e) {     // ?? сделать проверку на легетимные кнопки?
	var direction = keyActions3[e.keyCode];
	Ball3.setDirection(direction);
	if (e.keyCode>=49 && e.keyCode<=57){  
		Ball3.setDirection(e.keyCode);
	}
	var test =document.getElementById("test");
	test.innerHTML=test.innerHTML+"/// " +e.keyCode +"/// " + e.keyCode;
};


// The animation function, called every 30 ms
setInterval(function () {
ctx3.clearRect(0, 0, width3, height3);
ctx3.fillStyle="red";
Ball3.draw();
Ball3.move();
}, 30);














// 4 ======================================================================

//  !!!   просто управляемый мяч 

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;

// The Ball constructor
var Ball = function () {
this.x = width / 2;
this.y = height / 2;
this.xSpeed = 5;
this.ySpeed = 0;
};
// Update the ball's position based on its speed
Ball.prototype.move = function () {
this.x += this.xSpeed;
this.y += this.ySpeed;
if (this.x < 0) {
this.x = width;
} else if (this.x > width) {
this.x = 0;
} else if (this.y < 0) {
this.y = height;
} else if (this.y > height) {
this.y = 0;
}
};
// Draw the ball at its current position
Ball.prototype.draw = function () {
circle(this.x, this.y, 10, true, ctx);
};

// Set the ball's direction based on a string
// изменение направления
Ball.prototype.setDirection = function (direction) {
if (direction === "up") {
this.xSpeed = 0;
this.ySpeed = -5;
} else if (direction === "down") {
this.xSpeed = 0;
this.ySpeed = 5;
} else if (direction === "left") {
this.xSpeed = -5;
this.ySpeed = 0;
} else if (direction === "right") {
this.xSpeed = 5;
this.ySpeed = 0;
} else if (direction === "stop") {
this.xSpeed = 0;
this.ySpeed = 0;
}
};
// Create the ball object
var ball = new Ball();
// An object to convert keycodes into action names
var keyActions = {
32: "stop",               // пробел
37: "left",
38: "up",
39: "right",
40: "down"
};
// The keydown handler that will be called for every keypress
$("body").keydown(function (event) {
var direction = keyActions[event.keyCode];
ball.setDirection(direction);
});
// The animation function, called every 30 ms
setInterval(function () {
ctx.clearRect(0, 0, width, height);
ctx.fillStyle="red";
ball.draw();
ball.move();
}, 30);



