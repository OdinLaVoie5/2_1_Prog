//    ##MY     зачатки змейки ?       зачем здесь prototype? убрать?
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var k=0, n=[]; 
var levelGame=5;  var clockGame=200;    //   УРОВЕНЬ (длина и скорость) levelGame>1
ctx.strokeRect(0, 0, width, height);


// The Ball constructor
var Ball = function () {
	this.x = 0;
	this.y = height / 2;
	this.xSpeed =20;               // начальные условия
	this.ySpeed =0;
};

// вариант-Update the ball's position based on its speed
Ball.prototype.move = function () {
	this.x += this.xSpeed;
	this.y += this.ySpeed;
	if (this.x < 0 || this.x > width-20 || this.y < 0 || this.y > height-20) {
		var finGame = confirm ("Game over! Again?");
		if(finGame){
			this.clearGame ();
			// k=0;    /////////////////////////////////// ??
			tickTack();
		}else {
			this.clearGame ();
			clearInterval(tickTack) // ??
		}
	}

};

// MY    стирание   возврат в начало.
Ball.prototype.clearGame = function () {
	ctx.clearRect(0, 0,  width, height);
	this.x = 0;
	this.y = height / 2;		
	this.xSpeed =20;               // начальные условия
	this.ySpeed =0;	
	ctx.strokeRect(0,0,width,height);
	for (var i=0; i<n.length; i++){
		n[i][0] = n[i][1] = 0;	
	}
}



// Draw the ball at its current position
Ball.prototype.draw = function () {
	ctx.beginPath(); 
	ctx.lineWidth = 1;
	ctx.moveTo(this.x+1, this.y+1); 
	ctx.lineTo(this.x+19, this.y+1);
	ctx.lineTo(this.x+19, this.y+19);      
	ctx.lineTo(this.x+1, this.y+19);
	ctx.lineTo(this.x+1, this.y+1);
	ctx.fill();     
	//kkk  ctx.stroke();      ##модификация     сделал с обводкой сегментов. stroke можно убрать, 1 убрать, вместо 19 - 20.
};




// Set the ball's direction based on a string
// изменение направления и скорости 
Ball.prototype.setDirection = function (direction) {                    
//  газ	
	if (direction === "x") {
		clockGame=200;          // ?? не ускоряется   
	};

// тормоз	   ??
	
// стрелки             
	 if (direction === "down"){this.ySpeed=20; this.xSpeed = 0}
	else if (direction === "up") {this.ySpeed=-20; this.xSpeed = 0}; 

	if (direction === "right") {this.xSpeed=20; this.ySpeed = 0} 
	else if (direction === "left"){this.xSpeed=-20; this.ySpeed = 0};
	
// стоп     
	if (direction === "stop") {clearInterval(tickTack) }  // ?? нужно останов таймера
	if (direction === "z") {tickTack();}  // ?? нe возобновляется
// клава	
	
// тест строка MY
};



// Create the ball object
var ball = new Ball();


// An object to convert keycodes into action names
var keyActions = {             //легетимные кнопки
32: "stop",               // пробел
37: "left",
38: "up",
39: "right",
40: "down",
90: "z",
88: "x"
};


// нажатия клавы
window.onkeydown = function (e) {     // ?? сделать проверку на легетимные кнопки?
	var direction = keyActions[e.keyCode];
	ball.setDirection(direction);
	if (e.keyCode>=49 && e.keyCode<=57){  
		ball.setDirection(e.keyCode);
	}
};




// The animation function, called every 30 ms
var tickTack= 
setInterval(function () {
// обратн ход     ##MY и возобновление в том же направл.  ?? если levelGame<2 некорект. 
	if(k>1 && ball.x === n[n.length-2][0] && ball.y === n[n.length-2][1]){
		alert("обрат ход, пауза?"); 
		ball.x+=2*(n[n.length-1][0]-n[n.length-2][0]);  
		ball.y+=2*(n[n.length-1][1]-n[n.length-2][1]);
		ball.xSpeed = -ball.xSpeed;
		ball.ySpeed = -ball.ySpeed;		
		tickTack()		
	};
// !! если наезжает на себя - симуляция выхода за рамки (стоп).  
	for (var i=0; i<n.length; i++){
		if(ball.x === n[i][0] && ball.y === n[i][1]){
			ball.x =-4000
		}	
	};
	k++;   
	var s=[ball.x, ball.y];    
	n.push(s);
	if(k>levelGame){
		var sh = n.shift()	
		ctx.clearRect(sh[0], sh[1], 20, 20 );  // стирание последн сегмента.   учёт толщины линии.
	}
	ctx.fillStyle="blue";    // ?? перемен
	ctx.strokeRect(0, 0, width, height);
	ball.draw();
	ball.move();

	var test =document.getElementById("test");
	test.innerHTML="/// " +k +"/// " ;
	

	}, clockGame);


tickTack()




