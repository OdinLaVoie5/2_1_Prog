
///////////////////////    ##заготовка  человечка    
// ??? почему при перемещения этой части кода в начало  всё за ним следующее не отражается?
var canvas = document.getElementById("canvas");    
var context = canvas.getContext("2d");   

	context.beginPath();
				context.lineWidth = 3;
				context.beginPath();
				context.arc(100, 60, 12, 0, Math.PI * 2, false);
	context.stroke();
				
var areCan	=	[ [[100, 70],[100, 120]],   [[100, 80],[70, 100]],   [[100, 80], [130, 100]],   [[101, 118],[70, 150]],   [[99, 118],[130, 150]],   [[20, 180],[180, 180]],   [[40, 20],[40, 180]],   [[160, 20],[160, 180]],   [[37, 20],[163, 20]],   [[100, 20],[100, 50]]  ];

var i=9;		
while (i>=0){
	context.beginPath();
	context.moveTo(areCan[i][0][0], areCan[i][0][1]);
	context.lineTo(areCan[i][1][0], areCan[i][1][1]); 
	context.stroke();
	i--;
};
/////////////////////////////////////////////////////////





var ctx = canvas1.getContext("2d");
ctx.fillStyle = "Chocolate";
ctx.fillRect(50, 0, 50, 50);
ctx.fillRect(70, 50, 10, 10);
ctx.fillRect(0, 60, 150, 10);
ctx.fillRect(40, 70, 70, 70);
ctx.fillRect(40, 140, 15, 50);
ctx.fillRect(95, 140, 15, 50);


var ctx = canvas2.getContext("2d");
ctx.fillStyle = "Red";
ctx.fillRect(0, 0, 50, 100);

ctx.fillStyle = "Green";
ctx.fillRect(50, 0, 50, 100);

ctx.fillStyle = "Blue";
ctx.fillRect(100, 0, 50, 100);

ctx.strokeStyle = "DeepPink";
ctx.strokeRect(150, 0, 50, 100);

var ctx = canvas2.getContext("2d");
ctx.strokeStyle = "Turquoise";
ctx.lineWidth = 10;
ctx.beginPath();
ctx.moveTo(10, 10);
ctx.lineTo(60, 60);
ctx.moveTo(60, 10);
ctx.lineTo(10, 60);
ctx.stroke();



//  человечек
var ctx = canvas3.getContext("2d");
ctx.lineWidth = 4;
ctx.strokeRect(50, 0, 20, 20);

ctx.lineWidth = 4;
ctx.beginPath();
ctx.moveTo(60, 20);
ctx.lineTo(60, 70);

ctx.moveTo(60, 35);
ctx.lineTo(20, 20);

ctx.moveTo(60, 35);
ctx.lineTo(100, 30);

ctx.moveTo(60, 70);
ctx.lineTo(100, 40);

ctx.moveTo(60, 70);
ctx.lineTo(40, 100);
ctx.stroke();


//   дом
var ctx = canvas3.getContext("2d");
ctx.fillStyle = "SkyBlue";
ctx.beginPath();
ctx.moveTo(100, 100);
ctx.lineTo(100, 60);
ctx.lineTo(130, 30);
ctx.lineTo(160, 60);
ctx.lineTo(160, 100);
ctx.lineTo(100, 100);
ctx.fill();




// дуги круг
var ctx = canvas4.getContext("2d");

ctx.lineWidth = 2;
ctx.strokeStyle = "Red";
ctx.beginPath();
ctx.arc(50, 50, 20,  Math.PI, Math.PI / 2, true);
ctx.stroke();

ctx.beginPath();
ctx.arc(100, 50, 20, Math.PI, 0, false);
ctx.stroke();

ctx.beginPath();
ctx.arc(150, 50, 20, 0, Math.PI * 2, false);
ctx.stroke();




///  с функциями, циклами ...  MY  !!
var ctx = canvas5.getContext("2d");

var circle = function (x, y, radius) {
ctx.beginPath();
ctx.arc(x, y, radius, 0, Math.PI * 2, false);
ctx.fill();
};

var MY = ["Red", "Blue", "Green", "Yellow", "Orange"];
for (i=1; i<5; i++){
	ctx.fillStyle = MY[i];
	circle (5*i, 20*i, 5*i);
};


ctx.lineWidth = 4;
ctx.fillStyle = "Blue";
circle(100, 100, 50);
ctx.fillStyle = "Green";
circle(100, 100, 40);
ctx.fillStyle = "Yellow";
circle(100, 100, 30);
ctx.fillStyle = "Orange";
circle(100, 100, 20);
ctx.fillStyle = "Red";
circle(100, 100, 10);



// снеговик 
var canvas6 = document.getElementById("canvas6");    
var ctx6 = canvas6.getContext("2d");           // !! ?? ручку нужно новую, иначе путаница. взял ctx6.
ctx6.fillText("click me:", 90, 20);

var circle = function (x, y, radius) {
ctx6.beginPath();
ctx6.arc(x, y, radius, 0, Math.PI * 2, false);
ctx6.stroke();
};
var circle1 = function (x, y, radius) {
ctx6.beginPath();
ctx6.arc(x, y, radius, 0, Math.PI * 2, false);
ctx6.fill();
};
ctx6.fillStyle = "green";
circle(50, 35, 35);
circle(50, 120, 50);
circle1(35, 26, 6);
circle1(65, 26, 6);
circle1(50, 95, 6);
circle1(50, 120, 6);
circle1(50, 145, 6);
ctx6.fillStyle = "Orange";
circle1(50, 36, 6);

var snowman = function (x, y) {
ctx6.strokeStyle="red";
ctx6.fillStyle = "Orange";
circle(50+x, 35+y, 35);
circle(50+x, 120+y, 50);
circle1(35+x, 26+y, 6);
circle1(65+x, 26+y, 6);
circle1(50+x, 95+y, 6);
circle1(50+x, 120+y, 6);
circle1(50+x, 145+y, 6);
ctx6.fillStyle = "green";
circle1(50+x, 36+y, 6);
};

snowman(130, 19)

//  снеговик по клику             
function snowmanClick (event) {
var outX = event.offsetX;  
var outY = event.offsetY;
snowman(outX, outY)
}
canvas6.onclick = snowmanClick;  




var canvas7 = document.getElementById("canvas7");     //   !! ((это листок))
var ctx = canvas7.getContext("2d");                   //   !! ((это ручка))

var points = [[50, 50], [50, 100], [100, 100], [100, 50], [50, 50]];
var mysteryPoints = [[50, 50], [50, 100], [100, 50],  [25, 120], [100, 90], [70, 90], [70, 120]];

function kkk (areaK){
	ctx.lineCap = 'round' 
	ctx.lineJoin = 'round'
	ctx.strokeStyle = "Gold";
	ctx.fillStyle = "orchid";
	ctx.lineWidth = 18;
	ctx.beginPath();
	ctx.moveTo (areaK[0][0],areaK[0][1])
		for (i=1;i<areaK.length;i++){
		ctx.lineTo(areaK[i][0], areaK[i][1])
		}
	ctx.stroke();ctx.fill();
}
	
kkk(points)  // kkk(mysteryPoints)




var ctx8 = canvas8.getContext("2d");            
ctx8.font = "35px Courier bold";          
ctx8.fillText("click me", 20, 30);
canvas8.onclick=RRR

function RRR (e){
	var outX = e.offsetX;  
	var outY = e.offsetY;
	ctx8.globalCompositeOperation = "source-over"   //  рисовать над.
	if(outX>0 && outX<160 &&  outY>0 && outY<50){ctx8.globalCompositeOperation = "destination-over"}        //  если в районе букв - рисовать под.   !!  
	ctx8.fillStyle="red"; 
	ctx8.strokeStyle="blue";	
	ctx8.beginPath();
	ctx8.arc(outX, outY, 20, 0, Math.PI * 2, false);
	ctx8.fill(); ctx8.stroke();
};



