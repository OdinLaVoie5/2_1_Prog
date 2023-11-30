///////////    случайные блуждания 2D !!!  и прямая с отскоком    
//  ##проект  сделать взаимодействия

var canvas = document.getElementById("canvas");    
var ctx = canvas.getContext("2d");            


var drawBee = function (x, y) {
ctx.lineWidth = 2;
ctx.strokeStyle = "Black";
ctx.fillStyle = "Gold";
circle(x, y, 8, true, ctx);
circle(x, y, 8, false, ctx);
circle(x - 5, y - 11, 5, false, ctx);
circle(x + 5, y - 11, 5, false, ctx);
circle(x - 2, y - 1, 2, false, ctx);
circle(x + 2, y - 1, 2, false, ctx);
};

var update = function (coordinate) {   // !!!!  дрожание около координаты
var offset = Math.random() * 4 - 2;     
coordinate += offset;
if (coordinate > 200) {
coordinate = 200;
}
if (coordinate < 0) {
coordinate = 0;
}
return coordinate;
};

									
var x = 100;
var y = 100;


////////////    мяч    объект

var Ball = {                                         // объект
	x:20, y:50, xSpeed:-2, ySpeed:3,
	draw:function () {
		ctx.strokeStyle = "orange";
		ctx.fillStyle = "green";
		circle(this.x, this.y, 3, true, ctx);
	},
	move:function () {
		this.x += this.xSpeed;
		this.y += this.ySpeed;
	},
	checkCollision:function () {
		if (this.x < 0 || this.x > 200) {
		this.xSpeed = -this.xSpeed;
		}
		if (this.y < 0 || this.y > 200) {
		this.ySpeed = -this.ySpeed;
		}
	}
};

move =setInterval(function () {
ctx.clearRect(0, 0, 200, 200);
x = update(x);
y = update(y);
drawBee(x, y);

Ball.draw();  
Ball.move();
Ball.checkCollision();

}, 30);







// 1 ====================================================================

//    2 дрожащие прямые с отскоком             скорость задаётся 
//  ##проект  добавить электро статич отталкивание при приближении ... 

var canvas1 = document.getElementById("canvas1");    
var ctx1 = canvas1.getContext("2d");            

function Ball1 (x,y,xSpeed,ySpeed) {       // конструктор
this.x = x;
this.y = y;
this.xSpeed = xSpeed;
this.ySpeed = ySpeed;
};

Ball1.prototype.draw = function () {
circle(this.x, this.y, 2, true, ctx1);
};

Ball1.prototype.move = function () {
this.x += this.xSpeed;
this.y += this.ySpeed;
};

Ball1.prototype.checkCollision = function () {
if (this.x < 0) {  
	this.x = 0
	this.xSpeed = -this.xSpeed;
}
if (this.x > 400) { 
	this.x = 400
	this.xSpeed = -this.xSpeed;
}

if (this.y < 0) {
	this.y = 0
this.ySpeed = -this.ySpeed;
}
if (this.y > 400) {
	this.y = 400
this.ySpeed = -this.ySpeed;
}
};

Ball1.prototype.update = function () {      // !! прибавил ф-цию (см выше Дрож)
	var offX = Math.random() * 10-5;     
	var offY = Math.random() * 10-5;     
	this.x += offX;
	this.y += offY;
};

function ColorBall (x,y,xSpeed,ySpeed,color) {       // конструктор
	Ball1.call (this,x,y,xSpeed,ySpeed);         //  сокращённая запись с CALL !!
	this.color =  color;
};
ColorBall.prototype = new Ball1();                  // болванка? ядро?    передача прототипов?

colorBall = new ColorBall(10, 10, 1.3, 1.7, "crimson");   // объект
var ball1 = new Ball1(100, 50, 5, 4);

ColorBall.prototype.update = function () {   //  красный без дрожи
/*	var offX = Math.random() * 10-5;     
	var offY = Math.random() * 10-5;     
	this.x += offX;
	this.y += offY;
*/
};


setInterval(function () {
ctx1.fillStyle = colorBall.color;
// ctx1.clearRect(0, 0, 400, 400);  //  #модификация   затирает траекторию
colorBall.draw();
colorBall.move();
colorBall.checkCollision();
colorBall.update()
}, 30);

/*   второй мяч спрятал
setInterval(function () {
ctx1.fillStyle = "black";
ball1.draw();
ball1.move();
ball1.checkCollision();
ball1.update()
}, 30);
*/
var width = canvas1.width=400;       // дополнительно
var height = canvas1.height=400;
/*
canvas1.setAttribute("width", "400");     // изменение значения аттрибута  !!
canvas1.setAttribute("height", "400");    
*/





// 2 ====================================================================

//     2 блуждания               скорость случайная и не задаётся 
//  #проект  добавить (электро статич) (био) притяжение при приближении, порождение нового объекта ... ... 

var canvas2 = document.getElementById("canvas2");    
var ctx2 = canvas2.getContext("2d");            

function Ball2 (x,y) {       // конструктор
this.x = x;
this.y = y;
};

Ball2.prototype.draw = function () {
circle(this.x, this.y, 5, true, ctx2);
};

Ball2.prototype.move = function () {
this.x += Math.random() * 10-5;
this.y += Math.random() * 10-5;
};

Ball2.prototype.checkCollision = function () {
if (this.x < 0) {  
	this.x = 0
	this.xSpeed = -this.xSpeed;
}
if (this.x > 400) { 
	this.x = 400
	this.xSpeed = -this.xSpeed;
}

if (this.y < 0) {
	this.y = 0
this.ySpeed = -this.ySpeed;
}
if (this.y > 400) {
	this.y = 400
this.ySpeed = -this.ySpeed;
}
};


function ColorBall2 (x,y, color) {       // конструктор
	Ball2.call (this,x,y);                 //  сокращённая запись с CALL
	this.color =  color;
};
ColorBall2.prototype = new Ball2();                  // болванка    передача прототипов?


Ball2.prototype.draw = function () {      // переопределение метода
ctx2.lineWidth = 2;
ctx2.strokeStyle = "Black";
ctx2.fillStyle = this.color;        /////////////////////////
circle(this.x, this.y, 8, true, ctx2);
circle(this.x, this.y, 8, false, ctx2);
circle(this.x - 5, this.y - 11, 5, false, ctx2);
circle(this.x + 5, this.y - 11, 5, false, ctx2);
circle(this.x - 2, this.y - 1, 2, false, ctx2);
circle(this.x + 2, this.y - 1, 2, false, ctx2);
};


colorBall2 = new ColorBall2(280, 60, "yellow");   // объект
var ball2 = new Ball2(100, 275, "yellow");

setInterval(function () {
ctx2.fillStyle = colorBall2.color;
ctx2.clearRect(0, 0, 400, 400);
colorBall2.draw();
colorBall2.move();
colorBall2.checkCollision();
}, 30);

setInterval(function () {
ctx2.fillStyle = "orange";
ball2.draw();
ball2.move();
ball2.checkCollision();
}, 30);








// 3 ===========================================================================

//   блуждание 2 частиц  траектории     скорость случайная и не задаётся 
//  #проект   при занятии какого-то процента частей площади - окрасить и забетонировать её ... ... 

var canvas3 = document.getElementById("canvas3");    
var ctx3 = canvas3.getContext("2d");            

function Ball3 (x,y) {       // конструктор
this.x = x;
this.y = y;
};


Ball3.prototype.draw = function () {
circle(this.x, this.y, 2, true, ctx3);
};

Ball3.prototype.move = function () {
this.x += Math.random() * 20-10;
this.y += Math.random() * 20-10;
};

Ball3.prototype.checkCollision = function () {
if (this.x < 0) {  
	this.x = 0
	this.xSpeed = -this.xSpeed;
}
if (this.x > 400) { 
	this.x = 400
	this.xSpeed = -this.xSpeed;
}

if (this.y < 0) {
	this.y = 0
this.ySpeed = -this.ySpeed;
}
if (this.y > 400) {
	this.y = 400
this.ySpeed = -this.ySpeed;
}
};



function ColorBall3 (x,y, color) {       // конструктор
	Ball3.call (this,x,y);                 //  сокращённая запись с CALL
	this.color =  color;
};
ColorBall3.prototype = new Ball3();                  // болванка    передача прототипов?





colorBall3 = new ColorBall3(80, 60, "red");   // объект
var ball3 = new Ball3(100, 75);

setInterval(function () {
ctx3.fillStyle = colorBall3.color;
colorBall3.draw();
colorBall3.move();
colorBall3.checkCollision();
}, 30);

setInterval(function () {
ctx3.fillStyle = "blue";
ball3.draw();
ball3.move();
ball3.checkCollision();
}, 30);







// 4 =========================================================================

// блуждания частицы дискретные  траектория

var canvas4 = document.getElementById("canvas4");    
var ctx4 = canvas4.getContext("2d");            

var startX=100; 
var startY=100;

ctx4.beginPath();
ctx4.moveTo(startX, startY);

setInterval(function () {
	startX+=Math.floor(Math.random() * 31)- 15; // случ целочисл
		if (startX>200) {startX=200};
		if (startX<0) {startX=0};
	startY+=Math.floor(Math.random() * 31)- 15; // случ целочисл
		if (startY>200) {startY=200};
		if (startY<0) {startY=0};
	ctx4.lineTo(startX, startY);
	ctx4.stroke(); 
}, 30);







// 5 =========================================================================
//  блуждания частицы 1D.   дискретные.     !!!
//  #проект  см книгу Мост...   задачи теорвер ... ... ...     

var canvas5 = document.getElementById("canvas5");    
var ctx5 = canvas5.getContext("2d");   
var startX5=100; 
var startY5=0;
var step=10;		


setInterval(function () {
ctx5.beginPath();
ctx5.moveTo(startX5, startY5);
	if (startY5>=200) {startY5=200;step=-step}        //  вверх
	if (startY5<=0) {startY5=0;step=-step}           //  вниз
	startX5+=Math.floor(Math.random() * 21)- 10; 
	startY5+=step;
	ctx5.lineTo(startX5, startY5);
	if (startX5<0 || startX5>200) {
		ctx5.font = "17px Courier bold";  
		ctx5.fillText("Достигнута граница.", 20, 50);
		ctx5.fillText("Клик для продолжения", 20, 70);
		stopStep(); 

};  // выход за рамки       ?? сделать продолжение
	if (step>0){ctx5.strokeStyle="Red"}
	else {ctx5.strokeStyle="Blue"};
	ctx5.stroke(); 
}, 30);

function stopStep () {step=0; startX5= 100000}     //  ?? порно конечно   нужно останов  и возобновл таймера
          		  
function startStep() {
ctx5.clearRect(0, 0, 400, 400);
startX5=100; 
startY5=0;
step=10;
}

canvas5.onclick = startStep;













//  ???   сделать блуждание в треуг-ке паскаля ... ...



// 6 =========================================================================
//  блуждания частицы  2D дискретные     !!!!
//  ???  сделать перемещающийся персонаж вместо canSmall.   цвета - упростить (одноцвет?)
//  проект   несколько пьяниц разный цвет  ...
	
  var canvas6 = document.getElementById("canvas6");    
  var ctx6 = canvas6.getContext("2d");   
  ctx6.font = "17px Courier bold";  
  ctx6.fillText("Click me", 80, 20);
  ctx6.lineCap = 'round';
  ctx6.strokeRect(0, 0, 60, 30);
  var arrColor = ['Red', 'Yellow', 'Blue', 'Purple', 'Aqua']
  var canSmall = document.getElementById('canvas7');
var tempCan = canvas6.offsetHeight/2;
  canSmall.style.top = -tempCan -10 +'px';  ///////////// дополн канва
  canSmall.style.left = tempCan -10 +'px';


function  go2D () {
  ctx6.clearRect(0, 0, 600, 600);
  var startX6 =300, startY6 =300, step =25, oswn, ind =0;  // step - размер шага
  var arrX = [startX6], arrY = [startY6], jColor=0; 
  ctx6.lineWidth = 7;
  canSmall.style.top = -tempCan -10 +'px';  // дополн канва
  canSmall.style.left = tempCan -10 +'px'; 

  var handle = setInterval(function () {            ////////////////// таймер 
	
    if(ctx6.lineWidth<7) ctx6.lineWidth = 7;
	ctx6.beginPath();
	ctx6.moveTo(startX6, startY6);
	ctx6.strokeStyle = "Green";
	oswn = Math.random()*4^0;                      // случ направление
	if(oswn === 0) startX6 += step;
	else if (oswn === 1) startY6 += step;
	else if (oswn === 2) startX6 -= step;
	else  startY6 -= step;

	canSmall.style.top = -canvas6.offsetHeight -10 +startY6+'px';  ///////////// дополн канва
	canSmall.style.left = -10 + startX6+'px';
	
	for (var i=0; i<arrX.length; i++) { // совпадение с предыдущ траекторией
	  if(arrX[i] == startX6 && arrY[i] == startY6 ){  // разделить лог условие?  
		if(arrX[arrX.length-1]==arrX[i-1] && arrY[arrY.length-1]==arrY[i-1]  || 
		arrX[arrX.length-1]==arrX[i+1] && arrY[arrY.length-1]==arrY[i+1])  {
		  ctx6.strokeStyle = arrColor[(jColor%5)];  jColor++;    
		  ctx6.lineWidth -= 2;
		}
	  }	
	}


	arrX.push(startX6);	arrY.push(startY6);
	
	ctx6.lineTo(startX6, startY6);
	
	ind++;                          //  счётчик в верхнем левом углу
	ctx6.clearRect(2, 2, 58, 28);   ctx6.strokeRect(0, 0, 60, 30);
	ctx6.fillText(ind, 20, 20);
	
	if (startX6<=0 || startX6>=600 || startY6<=0 || startY6>=600) {  //  границы
	  ctx6.fillText("Достигнута граница.", 80, 20);
	  ctx6.fillText("Клик для продолжения", 80, 40);
	  clearInterval (handle);                            // останов
	}; 
	ctx6.stroke(); 
  }, 300);
  return;
}

canvas6.onclick = go2D;







