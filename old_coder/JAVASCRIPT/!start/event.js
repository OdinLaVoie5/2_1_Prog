//   !! Прерывание длительного задания с помощью таймера  (чтобы избежать зависания брауза   или даже закрытия стр из-за длительного скрипта )       здесь построение таблицы с 20000 строк

// вариант без прерывания  возможен завис
/*
var tbody = document.getElementsByTagName("tbody")[0];
for (var i = 0; i < 20000; i++) {
  var tr = document.createElement("tr");
  for (var t = 0; t < 6; t++) {
	var td = document.createElement("td");
	td.appendChild(document.createTextNode(i + "," + t));
	tr.appendChild(td) ;
  }
  tbody.appendChild(tr);
}
*/


// вариант с прерываниями     my подвисает но даёт вклиниться другим событиям
// ?????  !!!   разгрузка цикла?
/*
var rowCount = 20000;
var divideInto = 4;
var chunkSize = rowCount/divideInto;
var iteration = 0;
var table = document.getElementsByTagName("tbody")[0];
setTimeout(function generateRows(){
	var base = (chunkSize) * iteration;
	for (var i = 0; i < chunkSize; i++) {
		var tr = document.createElement("tr");
		for (var t = 0; t < 6; t++) {
			var td = document.createElement("td");
			td.appendChild(document.createTextNode((i + base) + "," + t + "," + iteration));
			tr.appendChild(td);
			}
	table.appendChild(tr);
	}
	iteration++;
	if (iteration < divideInto)
		setTimeout(generateRows,0);
} ,0);
*/




//  !!!  Центральное управление таймерами дnя манипулирования несколькими обработчиками             ??? разобраться
//  можно вводить новые функции обратного вызова таймеров и начинать либо останавливать их выполнение. Кроме того, функции обратного вызова способны удалять себя сами в любой момент, просто возвращая логическое значение false, что намного проще сделать, чем с помощью типичного вызова метода clearTimeout()
//  такая организация таймеров гарантирует, что функции обратного вызова будут всегда выполняться в том порядке, в каком они вводятся.

var timers = {
  timerID: 0,
  timers: [],
  add: function(fn) {
	this.timers.push(fn);
  },
  start: function() {
	if (this.timerID) return;   // проверяется, действует ли уже какой-нибудь таймер
	(function runNext() {
	  if (timers.timers.length > 0) {
		for (var i = 0; i < timers.timers.length; i++) {
		  if (timers.timers[i]() === false) {   						
			timers.timers.splice(i,1);    //  обработчик удаляется из массива	
			i--;
		  }
		}
		timers.timerID = setTimeout(runNext, 0);   // таймер на 0 самый быстрый ?
	  }
	}) ();
  },
  stop: function() {
	clearTimeout(this.timerID);
	this.timerID = 0;
  }
};

// и пример его применения.    ???  добавить больше таймеров ... 
var ball = document.getElementById("ball"), x = 0, y = 0;

timers.add(function() {
  ball.style.left = x + "px";
  if ((x=x+2) > 420) return false;    //  !! ?? одновременно изменение x и сравнение.
});
timers.add(function() {
  ball.style.top = y + "px";
  if (++y > 120) return false;    //  
});
timers.start ();




//  ??? не понял.   Простой набор асинхронных тестов
/*
(function() {
var queue = [], paused = false;
this.test = function(fn) {
queue.push(fn);
runTest();
};

this.pause = function() {
paused = true;
};

this.resume = function() {
paused = false;
setTimeout(runTest, 1);
};

function runTest() {
if (!paused && queue.length) {
queue.shift () ();
if (!paused) resume();
}
}
}) ();
*/






