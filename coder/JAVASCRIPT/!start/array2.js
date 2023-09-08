//=================== MY =============================

// min  max sum и среднее массива    за один цикл
var arrAll=[5,2,34,7,89,54,3,45,67,2], minArrAll=arrAll[0], maxArrAll=arrAll[0], sumArrAll=0, medArrAll, arrAllSgl=[],    arrAllDubl=[5,2,34,7,89,54,3,45,67,2];
  arrAllSgl[0]=arrAll[0]; arrAllSgl[arrAll.length-1]=arrAll[arrAll.length-1]; 

for (var i=0; i<arrAll.length ; i++) {
  if(arrAll[i]<minArrAll) minArrAll=arrAll[i];
  if(arrAll[i]>maxArrAll) maxArrAll=arrAll[i];
  sumArrAll+=arrAll[i];
  if(i>0 && i<arrAll.length-1){arrAllSgl[i] = (arrAll[i-1]+arrAll[i]+arrAll[i+1])/3}  // ?? сглаживание скользящим средним вроде. (my  сглаживание лучше вроде,  чем без применения второго массива   - см ниже),  но точки дальше от начальных
}
medArrAll = sumArrAll/arrAll.length;

assert(1, minArrAll + ' ' + maxArrAll + ' ' + sumArrAll + ' ' + medArrAll);     //1///////////
assert(1, arrAll);   //2///////////
assert(1, arrAllSgl);   //3///////////
 
 
for (var i=1; i<arrAll.length-1 ; i++) {
  arrAll[i] = (arrAll[i-1]+arrAll[i]+arrAll[i+1])/3  // ?? сглаживание скользящим средним вроде (на самом массиве).
}
assert(1, arrAll);   //4///////////


// вот графики
var canvas = document.getElementById('canvas');  
var ctx = canvas.getContext('2d');

ctx.fillStyle = 'green'
for (var i = 0; i < arrAllDubl.length; i+=1) {  
  var x = 30*i+10,  y = 2*arrAllDubl[i], x1, y1;
  circle(x,y,3,true,ctx)   
  if(i !== 0){         
	ctx.beginPath();   
	ctx.lineWidth = 1;
	ctx.strokeStyle = "green";
	ctx.moveTo(x, y);
	ctx.lineTo(x1, y1);
	ctx.stroke();
  }
  x1 = x;
  y1 = y;
}

ctx.fillStyle = 'red'
for (var i = 0; i < arrAllSgl.length; i+=1) {  
  var x = 30*i+10,  y = 2*arrAllSgl[i], x1, y1;
  circle(x,y,3,true,ctx)   
  if(i !== 0){         
	ctx.beginPath();   
	ctx.lineWidth = 1;
	ctx.strokeStyle = "red";
	ctx.moveTo(x, y);
	ctx.lineTo(x1, y1);
	ctx.stroke();
  }
  x1 = x;
  y1 = y;
}

ctx.fillStyle = 'blue'
for (var i = 0; i < arrAll.length; i+=1) {  
  var x = 30*i+10,  y = 2*arrAll[i], x1, y1;
  circle(x,y,3,true,ctx)   
  if(i !== 0){         
	ctx.beginPath();   
	ctx.lineWidth = 1;
	ctx.strokeStyle = "blue";
	ctx.moveTo(x, y);
	ctx.lineTo(x1, y1);
	ctx.stroke();
  }
  x1 = x;
  y1 = y;
}




//====================================
//  +++ интерполяция, экстраполяция и аппроксимация      ???  метод Ньютона  + сплайны?
var arrAllEx=[];

//  my  ф-ция рисования
function grafik(color) {        //  ввести др параметры ??
  ctx.fillStyle = color;
  for (var i = 0; i < arrAllEx.length; i+=1) {  
	var x = 15*i+10,  y = 2*arrAllEx[i], x1, y1;
	circle(x,y,3,true,ctx)   
	if(i !== 0){         
	  ctx.beginPath();   
	  ctx.lineWidth = 1;
	  ctx.strokeStyle = color;
	  ctx.moveTo(x, y);
	  ctx.lineTo(x1, y1);
	  ctx.stroke();
	}
	x1 = x;
	y1 = y;
  }
}



// линейная 
for (var i=0; i<arrAllDubl.length; i++) { // чётные члены- неизменяемая база и для нижеслед
  arrAllEx[2*i] = arrAllDubl[i];
}
for (var i=0; i<arrAllDubl.length-1; i++) {
  arrAllEx[2*i+1] = (arrAllDubl[i] + arrAllDubl[i+1])/2;
}

var canvas = document.getElementById('canvas1');  
var ctx = canvas.getContext('2d');
grafik('green')




// среднеквадратичная ??
for (var i=0; i<arrAllDubl.length-1; i++) {
  arrAllEx[2*i+1] = Math.sqrt(Math.pow(arrAllDubl[i], 2) + Math.pow(arrAllDubl[i+1], 2));
}
grafik('blue')



// среднегармоничная
for (var i=0; i<arrAllDubl.length-1; i++) {
  arrAllEx[2*i+1] = 1/(1/arrAllDubl[i] + 1/arrAllDubl[i+1]);
}
grafik('red')




//=====================================
// среднеквадратичная ??  !!
for (var i=0; i<arrAllDubl.length-1; i++) {
  arrAllEx[2*i+1] = Math.pow((Math.sqrt(arrAllDubl[i]) + Math.sqrt(arrAllDubl[i+1]))/2,2);
}

assert(1, arrAllEx);   //5//////////

var canvas = document.getElementById('canvas2');  
var ctx = canvas.getContext('2d');

grafik('grey')







