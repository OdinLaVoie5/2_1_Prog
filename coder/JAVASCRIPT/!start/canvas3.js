var canvas = document.getElementById('canvas');  
var ctx = canvas.getContext('2d');

// + параметрические уравнения
// свободные члены - размещение по канве, множители - масштабир
ctx.fillStyle = 'blue'
for (var i = 0; i < 300; i+=.1) {
	circle(2*i,-60*Math.sin(0.1*i)+200,.5,true,ctx)   // !? ось Y програмеров в отличии от математиков  вниз. поэтому -60*Math.sin
}
		

ctx.fillStyle = 'green'
for (var i = -130; i < 130; i+=.1) {
	circle(2*i+300,i*i/15+200,.5,true,ctx)  // .5 полпикселя ? 
}


// ##вариант1
/*ctx.fillStyle = 'red'
for (var i = -140; i < 140; i+=.01) {  // пришлось делать оч маленьк шаг
	circle(2*i+300,180/i+i+200,1,true,ctx)    
}
*/

// ##вариант2 почти норм шаг  + интерполяция
ctx.fillStyle = 'red'
for (var i = -140; i < 140; i+=1) {  //  ??
  var x = 2*i+300,  y = 180/i+i+200, x1, y1;
  circle(x,y,2,true,ctx)   
  if(i !== -140){         
	ctx.beginPath();   
	ctx.lineWidth = 1;
	ctx.strokeStyle = "DeepPink";
	ctx.moveTo(x, y);
	ctx.lineTo(x1, y1);
	ctx.stroke();
  }
  x1 = x;
  y1 = y;
}


ctx.fillStyle = '#C09'
for (var i = 0; i < 300; i+=.05) {   //  min шаг .05 и  r .3  ??
	circle(80*Math.cos(0.1*i+100)+400,80*Math.sin(0.1*i)+100,.3,true,ctx)  
}
		
		





//  дискретный график сглаживаю отрезками 	!!	линейная интерполяция

var canvas = document.getElementById('canvas1');  
var ctx = canvas.getContext('2d');

ctx.fillStyle = '#C99'
for (var i = 0; i < 600; i+=15) { // увеличил шаг длч наглядности
  var x = i,  y = -30*Math.sin(x/30) +200, x1, y1;
  circle(x,y,2,true,ctx)   // !? ось Y програмеров в отличии от математиков  вниз. поэтому -60*Math.sin
  if(i !== 0){         // первую точку пропускаю   ##модификация до x1
	ctx.beginPath();   // ##вариант до ctx.lineTo(x1, y1); переставить до if. работает.
	ctx.lineWidth = 1;
	ctx.moveTo(x, y);
	ctx.lineTo(x1, y1);
	ctx.stroke();
  }
  x1 = x;
  y1 = y;
}




//============================================================================
var canvas2 = document.getElementById('canvas2');  
var ctx2 = canvas2.getContext('2d');

// координатные линии    ?? вариант штрих см ctx.setLineDash([1, 2, 1, 3, 5, 1, 2, 4])
ctx2.fillStyle = 'lightgrey'
for (var i = 0; i < canvas.width; i+=5){circle(i,canvas.height/2,1,true,ctx2)}
for (var i = 0; i < canvas.height; i+=5){circle(canvas.width/2,i,1,true,ctx2)}
for (var i = 0; i < canvas.width; i+=50){circle(i,canvas.height/2,2,true,ctx2)}
for (var i = 0; i < canvas.height; i+=50){circle(canvas.width/2,i,2,true,ctx2)}



//    общ ф-ция  sin  !!!        ?? сделать параметры по умолчанию
function grafSin (startX,startY,pW,    paramF,    pssh,mssh,       width,ctxN,     inter, fStyle, sStyle) { 
// (началоX,началоY,ширина,    параметрФ-ции??,      пикселНаСм(илиУвелич),массштаб(XкY),       толщинаточкиилинии,канва,     интерполяция0/1,стильточек,стильинтерполяции)
  ctxN.fillStyle = fStyle;
  for (var i = startX; i < pW; i+=1) { 
	var x = i,  y = -pssh *  Math.sin((mssh*x-canvas.width/2  - paramF )/pssh+ Math.PI/2)    -startY+canvas.height/2,   x1, y1;  //  ?? исправить параметр paramF 
	circle(x,y,width,true,ctxN)   
	if(i !== startX && inter){         
	  ctxN.beginPath();   
	  ctxN.lineWidth = width;
	  ctxN.strokeStyle = sStyle;
	  ctxN.moveTo(x, y);
	  ctxN.lineTo(x1, y1);
	  ctxN.stroke();
	}
	x1 = x;
	y1 = y;
  }
}

// тест
grafSin (0,100,600,  10,   55,3,   .5,ctx2,   0,'green' )
grafSin (0,0,600,  0,   30,1,   1,ctx2,   1,'red','blue')
grafSin (15,-40,400,  17,    10,1,   .5,ctx2,   0,'orange')












/*
//   ????  сделать общ ф-цию
function grafikFunc (paramF, startY, startX, pW, msshX, msshY, typeX,typeY,  width,  ctxN,  fStyle, sStyle  ) { // сложно
ctx.fillStyle = fStyle;
for (var i = startX; i < pW; i+=1) {  //  ??
  var x = msshX*typeX+paramF,  y = msshY/typeY +'i?'+paramF,   x1, y1; // совмещение нескольких типов ?
  circle(x,y,width,true,ctxN)   
  if(i !== startX){         
	ctx.beginPath();   
	ctx.lineWidth = 1;
	ctx.strokeStyle = sStyle;
	ctx.moveTo(x, y);
	ctx.lineTo(x1, y1);
	ctx.stroke();
  }
  x1 = x;
  y1 = y;
}
}
*/
