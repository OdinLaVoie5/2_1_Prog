//  !!!!  ((мини ##библиотека))
// OSC O S C       Math.degreesToRadians   circle  largest         assert



// ==================================================================================
//  нужен ли этот блок ???
function O(/*объект*/ obj){    // !!  коменты прямо в параметрах
  if (typeof obj == 'object') return obj
  else return document.getElementById(obj); 
}

function S(obj){return O(obj).style}

function C(name){
  var elements = document.getElementsByTagName('*');  // ??  можно document.all ?
  var objects = [];
  for (var i = 0 ; i < elements.length ; ++i) {
	  if (elements[i].className == name);
	  objects.push(elements[i]);
  }
  return objects;         
}
// var tmpObj = {"a":2};   alert (O(tmpObj)["a"])







//============================================================================
//                           МАТЕМАТИКА       Math                            
//============================================================================

//    ##Math  ##матем      расширение Math  ##метод
// углы в радианы   
// не лучше ли обычную ф-цию ???
Math.degreesToRadians = function(degrees){
	return degrees * Math.PI / 180;
}

// Вычисляет декартово расстояние между точками (x1,y1) и (x2,y2).
function distanceOSC(x1, y1, x2, y2) {
	var dx = x2 - x1;
	var dy = y2 - y1;
	return Math.sqrt(dx*dx + dy*dy);
}
// alert (distanceOSC(1, 2, 4, 6))

//  my  факториал
function factOSC(n) {
  var rez = 1;
  for (var i = 2; i <= n; i++) {
	  rez *= i;
  }
  return rez;
}

// !!!! Вычисляет факториалы и СОХРАНЯЕТ результаты в собственных свойствах. 
// такого рода кэширование   -   ##мемоизация 
function factorialOSC(n) { 
	if (isFinite(n) && n>0 && n==Math.round(n)) { // Только конечные положительные целые  ##проверка
		if (!(n in factorialOSC)) // Если не сохранялось ранее 
			factorialOSC[n] = n * factorialOSC(n-1); // Вычислить и сохранить 
		return factorialOSC[n]; // Вернуть сохр. результат 
	} 
	else return NaN; // Для ошибочного аргумента 
} 
factorialOSC[1] = 1; // Инициализировать кэш базовым случаем.
/*
alert (factorialOSC(15))
alert (factorialOSC[4])
*/





//  круг  окружность     ##canvas
function circle (x, y, radius, fillCircle,  ctxN) {
  ctxN.beginPath();
  ctxN.arc(x, y, radius, 0, Math.PI * 2, false);
  if (fillCircle) ctxN.fill();
  else {
	ctxN.stroke();
	ctxN.closePath();
  }
};

// !!   ##расширение Math.max для   ##массивов     ##apply
function smallest (array) {
  return Math.min.apply (Math, array); // !!! можно Math.max.apply(null, arr)  null  
                     // т.к. в своей внутренней реализации метод Math.max не использует this. 
}
function largest (array) {
  return Math.max.apply(Math, array);
}
// alert (largest([1, 2, 3, 2, 7, 5, 3, 4]))





//нахождение самого длинного эл-та в ##массиве
function FindLongestOSC(InArray){            
	if (InArray.length < 1){return -1;}

	var Longest = 0;
	for (var i=1; i < InArray.length; i++){
		if ((InArray[i]+"").length > InArray[Longest].length){
			Longest = i;
		}
	}
	return Longest;
}
//alert (FindLongestOSC(['1', '27', 3, 2, 777, 5, 3, 4]))
 
 


//  ##случайное целое 
function randomIntegerOSC(min, max) {
  var rand =  Math.random() * (max - min + 1) + min - 0.5;
  rand = Math.round(rand);
  return rand;
}
/*//  ВАРИАНТ1
function randomIntegerOSC1(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}
*/




//  получение дробной части числа n   с  точностью m
function getDecimal(n, m) {
  rez = Math.abs(n)%1;  // !!
  rez = rez.toFixed(m); 
  return rez ;
}
// alert (getDecimal(5.888, 2))




function log10_OSC(x) { return Math.LOG10E * Math.log(x); }
function log2_OSC(x) { return Math.LOG2E * Math.log(x); }
// alert (log2_OSC(64))  // 







//============================================================================
//               ПРОВЕРКА ТИПА АРГУМЕНТА ...  + см ниже    typeCheckOSC       
//============================================================================

//  ##проверка  собственно числовые NaN  - не равно самому себе 
function isReallyNaNOSC(x) {
  return x !== x;
}

//  ПРОВЕРКА на число  (простая)
function checkNumberOSC(value) {
	return typeof value == 'number';
}

//  ПРОВЕРКА на число  (более строгая).
//  Не считает числом строку из пробелов, логические и специальные значения,
//  а также отсекает Infinity.      ##isFinite
//  ??  а с регулярн выражениями не проще?  - if(/\D/.test(n) || n == '') нечисла или пустая строка
function isNumericOSC(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

//  ПРОВЕРКА целое ли число    my 
function isIntegerOSC(n) {  
  return   n === Math.round(n);   //  (n^0) === n 
}
//  document.write(isIntegerOSC(5.999999999999999));    document.write("<br>");
//  document.write(isIntegerOSC(5.9999999999999999));    document.write("<br>");



//  КЛАСС !!!  возвращает только сам  ##[[Class]]
function getClassOSC(obj) {
	if (obj === null) return "Null";
	if (obj === undefined) return "Undefined";
	return Object.prototype.toString.call(obj).slice(8,-1);
}
/*
alert( getClassOSC(null) ); // Null
alert( getClassOSC(true) ); // Boolean
alert( getClassOSC(getClassOSC) ); // Function
alert( getClassOSC(getClassOSC.xz) ); // Undefined
alert( getClassOSC(new Date) ); // Date
alert( getClassOSC([1, 2, 3]) ); // Array
alert( getClassOSC(123) ); // Number
alert( getClassOSC('qwer') ); // String
alert( getClassOSC(/ /) ); // RegExp
*/


/** * Возвращает тип значения в виде строки: 
* -Если o - null, возвращает "null", если o - NaN, возвращает "nan". 
* -Если typeof возвращает значение, отличное от "object", возвращает это значение. 
* (Обратите внимание, что некоторые реализации идентифицируют объекты 
* регулярных выражений как функции.) 
* -Если значение атрибута class объекта o отличается от "Object", 
* возвращает это значение. 
* -Если o имеет свойство constructor, а конструктор имеет имя, возвращает 
* имя конструктора. 
* -Иначе просто возвращает "Object". 
**/
function getTypeOSC(o) {  // undefined  ??
	var t, c, n; // type, class, name 
	if (o === null) return "null"; // Специальный случай для значения null. 
	if (o !== o) return "nan"; // Другой специальный случай: NaN. 
	
	// Применять typeof для любых значений, отличных от "object". 
	// Так идентифицируются простые значения и функции. 
	if ((t = typeof o) !== "object") return t; 
	
	// Вернуть класс объекта, если это не "Object". 
	// Так идентифицируется большинство встроенных объектов. 
	if ((c = getClassOSC(o)) !== "Object") return c; 
	
	// Вернуть имя конструктора объекта, если имеется 
	if (o.constructor && typeof o.constructor === "function" && 
	(n = o.constructor.name)) return n;        //    ?? 
	
	// Не удалось определить конкретный тип, поэтому остается лишь 
	// просто вернуть "Object" 
	return "Object"; 
}
/*
uuu = undefined;
alert (getTypeOSC(uuu))
*/




//  МЕТОД Array. ##isArray ()
/*alert( Array.isArray([1,2,3]) ); // true
alert( Array.isArray("not array")); // false
*/


// Определяет, является ли o объектом, подобным ##массиву. 
// Строки и функции имеют числовое свойство length, но они исключаются проверкой typeof. 
// В клиентском JavaScript текстовые узлы DOM имеют числовое свойство length 
// и, возможно, должны быть исключены дополнительной проверкой o.nodeType != 3. 
function isArrayLikeOSC(o) { 
	if (o && // o не null, не undefined и т. д. 
		typeof o === "object" && // o - объект 
		isFinite(o.length) && // o.length - конечное число 
		o.length >= 0 && // o.length - положительное 
		o.length===Math.floor(o.length) && // o.length - целое 
		o.length < 4294967296) // o.length < 2^32 
		
		return true; // Значит, объект o подобен массиву 
	else 
		return false; // Иначе - нет 
}



// + Утиная типизация   !!!
// Например, мы можем проверить, что объект — массив, не вызывая Array.isArray, а просто уточнив наличие важного для нас метода, например splice
/*var something = [1, 2, 3];
if (something.splice) {
alert( 'Это утка! То есть, массив!' );
}
*/
//мы намеренно позволяем передать в код нечто менее конкретное, чем определённый тип, чтобы сделать его более универсальным.
// Возвращает true, если o реализует методы, определяемые последующими аргументами. 
function implementsOSC(o /*, ... */) { 
	for(var i=1; i<arguments.length; i++) { // для каждого аргумента после o 
		var arg = arguments[i]; 
		switch(typeof arg) { // Если arg - это: 
		case 'string': // строка: проверить наличие метода с этим именем 
			if (typeof o[arg] !== "function") return false; 
			continue; 
		case 'function': // функция: использовать объект- прототип 
			// Если аргумент является функцией, использовать ее прототип 
			arg = arg.prototype; 
			// переход к следующему случаю case 
		case 'object': // объект: проверить наличие соотв. методов 
			for(var m in arg) { // Для каждого свойства объекта 
				if (typeof arg[m]!=="function") continue; // Пропустить свойства, 
														// не являющиеся методами 
				if (typeof o[m] !== "function") return false; 
			} 
		} 
	} 
	// Если мы попали сюда, значит, объект o реализует все, что требуется 
	return true; 
}





// Определение действующиго режима работы.
// если в строгом режиме  ("use strict") - true 
function strictCheckOSC() { return !this; };
// alert (strictCheck())  // в браузе








//============================================================================
//               БЕНЧМАРКИНГ  тайминг    замер времени исполнения             
//============================================================================

// my  Бенчмаркинг  benchmarkOSC ф-ция для для тестрования ОДНОЙ Ф-ЦИИ.          
// my(число прогонов, ф-ция, её параметры)  ?? сделать переменное кол-во параметров 
// (здесь у меня 5 - a, b, c, d, e)  не будут ли лишние парам тормозить тестируемые ф-ции?
function benchmarkOSC(n, fff, a, b, c, d, e) {  
  var start = [], end = [], timings = [];
  repeatOSC(n, function() {
	start.push(Date.now());
	fff(a, b, c, d, e);   
	end.push(Date.now());
  });
  for (var i = 0, n = start.length; i < n; i++) {
	timings[i] = end[i] - start[i];
//kkk для распечатки	document.write(fff(a, b, c, d, e));    document.write("<br>");
  }
  return timings;
}
// вспомогат          
function repeatOSC(n, action) {  
  for (var i = 0; i < n; i++) {
	action();
  }
}



// my  для тестрования сравнения МАССИВА Ф-ЦИЙ.   ##performance.now() см в браузе
// !!!  (прогоны, прогоны прогонов чередуя,  аргумент ф-ций, массив ф-ций)
function benchmarkMyMy (num, numOut, argum, arrfunc) {   
  function bench(f) {                    // ф-ция замера разницы
	var date = Date.now();        //performance.now(); - вариант более точно для брауза.
	for (var i = 0; i < num; i++){// num раз тестируемая ф-ция
	  if(Array.isArray(argum)) f.apply(this, argum) 
	  else f(argum);  
	}
	return Date.now() - date;     //  разница.  performance.now() - date; - вариант 
  }
  // bench для каждого теста запустим много раз, чередуя
  var time = [];
  // numOut раз  ф-ция замера разницы bench поочерёдно для ф-ция 1 и ф-ция 2
  for (var i = 0; i < numOut; i++) {  
	for (var j=0; j < arrfunc.length; j++) {
	  if(!time[j]){time[j] = 0};
	  if(arrfunc[j]) time[j] += bench(arrfunc[j]);
	}
  }
  return time;
} 



//   ##console.time ...   
 // my    Бенчмаркинг  в консоли
function benchmarkMy(func, func1, argum, num) {
  function bench(f) {
	for (var i = 0; i < num; i++) f(argum);
  }
  console.time("All Benchmarks");
  console.time("func");
  bench(func);
  console.timeEnd("func");
  console.time("func1");
  bench(func1);
  console.timeEnd("func1");
  console.timeEnd("All Benchmarks")
}





//////////////////////////////////////////////////////////////////////

//  Ф-ЦИЯ ДЛЯ ТЕСТИРОВАНИЯ ((типа true/false))  выдаёт нумерованный результат   
// !!!!!                                  в html  вписать \<ul id="results"\> \</ul\>
function assert (value, desc) {
  var li = document.createElement ( "li" ) ;
  li.style.color = value ? "green" : "red" ;
  // если красный - зачеркнуть
  if(li.style.color == "red" ){li.style.textDecoration = "line-through"} 
  li.style.listStyleType = "decimal";    //  !! my  список с цифрами
  li.appendChild (document.createTextNode ( desc ));
  document.getElementById("results").appendChild(li);
}







//============================================================================
//               ДЕКОРАТОРЫ  ((возвращают ту же ф-цию но с наворотами))        
//============================================================================
// + «обезьянья заплата»  («monkey-patching»)

// !!!      ДЕКОРАТОР-ТАЙМЕР  полное время работы ф-ции    см в браузе    ##apply
// прибавит время выполнения f к   ##таймеру timers[timer]
var timers = {};
// для разных ф-ций разные timer (отразятся в объекте timers)
function timingDecoratorOSC(f, timer) { 
  return function() {
	var start =  Date.now();        //performance.now();
	//  !! (первонач ф-ция f возвращается без изменений со своим this и arguments)
	var result = f.apply(this, arguments); 
	if (!timers[timer]) timers[timer] = 0;
	timers[timer] +=  Date.now() - start;   //performance.now() - start;
	return result;
  }
}

// завернём функцию fibonacci в декоратор
/*    factOSC = timingDecoratorOSC(factOSC, "fibo");//
// неоднократные вызовы...
for (var i=0; i < 50000; i++) {factOSC(170);}
// в любой момент можно получить общее количество времени на вызовы
alert( timers.fibo + 'мс' );
*/



// !!!     ДЕКОРАТОР ДЛЯ ПРОВЕРКИ ТИПА для f  
// второй аргумент checks массив с функциями для проверки на нужный тип
function typeCheckOSC(f, checks) {
  return function() {
	for (var i = 0; i < arguments.length; i++) {
	  if (!checks[i](arguments[i])) {
		alert( "Некорректный тип аргумента номер " + i );
		return;
	  }
	}return f.apply(this, arguments);
  }
}
// пример
/*function sum(a, b) {return a + b;}
// обернём декоратор для проверки
sum = typeCheckOSC(sum, [checkNumberOSC, checkNumberOSC]);  // оба аргумента ‐ числа
alert( sum(1, 2) ); // 3, все хорошо  // пользуемся функцией как обычно
*/



//  !!         ДЕКОРАТОР ПРОВЕРКИ ДОСТУПА          
function checkPermissionDecoratorOSC(f) {
  return function() {
	if (isAdmin()) {
	  return f.apply(this, arguments);
	}
	alert( 'Недостаточно прав' );
  }
}
function isAdmin() {   // my проверяющая ф-ция
/*  var password = prompt('Введите пароль');
  if(password == 12345){return true}
*/}
/*function save() {  alert ('чтото делаю, но предварительно проверяются права');return } // my  ф-ция действие для примера
save = checkPermissionDecoratorOSC(save); //  декорируем
save()        //  пытаемся выполнить
*/
// Теперь вызов функции save() проверяет права



//  !!!           ЛОГИРУЮЩИЙ ДЕКОРАТОР (1 аргумент)   
// история применения ?
function makeLoggingSimplOSC(f, log) {
  function wrapper(a) {
	log.push(a);
	return f.call(this, a);
  }
  return wrapper;
}
var log = [];

function work(a) {// произвольная функция, один аргумент
  return a*a;
}
/*work = makeLoggingSimplOSC(work, log);
alert(work(1)); // 1
alert(work(5)); // 5
for (var i = 0; i < log.length; i++) {
alert( 'Лог:' + log[i] ); // "Лог:1", затем "Лог:5"
}
*/



//  !!         ЛОГИРУЮЩИЙ ДЕКОРАТОР (много аргументов)   
function makeLoggingOSC(f, log) {    
  function wrapper() {
	log.push([].slice.call(arguments));	
	return f.apply(this, arguments);
  }
  return wrapper;
}
var log = [];
/*function work(a, b) {// произвольная функция, один аргумент
  return a*b;
}
work = makeLoggingOSC(work, log);
work(1, 2); // 3
work(4, 5); // 9
for (var i = 0; i < log.length; i++) {
  var args = log[i]; // массив из аргументов i‐го вызова
  alert( 'Лог:' + args.join() ); // "Лог:1,2", "Лог:4,5"
}
*/



//============================================================================
//  !!!           КЕШИРУЮЩИЙ ДЕКОРАТОР        
// для ф-ций с 1 аргументом  
function makeCachingOSC(f) {
  var cache = {};
  return function(x) {
	if (!(x in cache)) {
	cache[x] = f.call(this, x);
  }
  return cache[x];
  };
}
/*function f(x) {
  return Math.random()*x;
}
f = makeCachingOSC(f);
var a = f(1);
var b = f(1);
alert( a == b ); // true (значение закешировано)
b = f(2);
alert( a == b ); // false, другой аргумент => другое значение
*/

// ##мемоизация       // для ф-ций с несколькими аргументами  
// Возвращает мемоизованную версию функции f. Работает, только если все возможные 
// аргументы f имеют отличающиеся строковые представления. ?? 
function memoizeOSC(f) { 
	var cache = {}; // Кэш значений сохраняется в замыкании. 
	return function() { 
		//kkk  alert (cache["14"]+"!!!"+cache["15"]+"!!!"+cache["16"])
		// Создать строковую версию массива arguments для использования 
		// в качестве ключа кэша. 
		var key = arguments.length + Array.prototype.join.call(arguments,","); 
		if (key in cache) return cache[key]; 
		else return cache[key] = f.apply(this, arguments); 
	}; 
}
/*
var memofactOSC = memoizeOSC(factOSC);
alert (factOSC(4))
alert (memofactOSC(4)); alert (memofactOSC(5)); alert (memofactOSC(6)); alert (memofactOSC(6))
*/
//============================================================================



//      ФУНКЦИЯ-ЗАДЕРЖКА в  обёртке !!!
function delayOSC(f, ms) {
  return function() {
	var savedThis = this; // сохраняем контекст
	var savedArgs = arguments; // и аргументы в переменных
	setTimeout(function() { // ##таймер на обёртываемую ф-цию на ms миллисекунд 
	f.apply(savedThis, savedArgs);
	}, ms);
  };
}
// пример
/*function f(x) {
  alert( x );
}
var f1000 = delayOSC(f, 1000);
var f1500 = delayOSC(f, 3500);
f1000("тест"); // выведет "тест" через 1000 миллисекунд
f3500("тест2"); // выведет "тест2" через 3500 миллисекунд
*/


//========== 
//      ВЫЗОВ НЕ ЧАЩЕ ЧЕМ в N миллисекунд
function debounceOSC(f, ms) {
  var state = null;
  var COOLDOWN = 1;
  return function() {
	if (state) return;
	f.apply(this, arguments);
	state = COOLDOWN;
	setTimeout(function() { state = null }, ms);
  }
}
// пример
/*function f(x) { alert(x) }
var f = debounceOSC(f, 1000);
f(1); // 1, выполнится сразу же
f(2); // игнор
setTimeout( function() { f(3) }, 100); // игнор (прошло только 100мс)
setTimeout( function() { f(4) }, 1100); // 4, выполнится
setTimeout( function() { f(5) }, 1500); // игнор
*/


//   ТОРМОЗИЛКА (см  вызов не чаще чем (но с обязат выполн последнего вызова))
function throttleOSC(func, ms) {
  var isThrottled = false,
  savedArgs,
  savedThis;
  function wrapper() {
	if (isThrottled) { // (2)
	  savedArgs = arguments;
	  savedThis = this;
	  return;
	}
	func.apply(this, arguments); // (1)
	isThrottled = true;
	setTimeout(function() {
	  isThrottled = false; // (3)
	  if (savedArgs) {
	  wrapper.apply(savedThis, savedArgs);
	  savedArgs = savedThis = null;
	  }
	}, ms);
  }
  return wrapper;
}

// пример
/*var f = function(a) {
  alert (a)
};
// затормозить функцию до одного раза в 1000 мс
var f1000 = throttleOSC(f, 1000);
f1000(1); // выведет 1
f1000(2); // (тормозим, не прошло 1000мс)
f1000(3); // (тормозим, не прошло 1000мс)
// но когда пройдёт 1000мс...  выведет 3, промежуточное значение 2 игнорируется
*/



//  Вспомогательная функция для работы с ##таймером 
/** Планирует вызов или вызовы функции f() в будущем. 
* Ожидает перед первым вызовом start миллисекунд, затем вызывает f() 
* каждые interval миллисекунд и останавливается через start+end миллисекунд. 
* Если аргумент interval указан, а аргумент end нет, повторяющиеся вызовы функции f 
* никогда не прекратятся. Если отсутствуют оба аргумента, interval и end, 
* тогда функция f будет вызвана только один раз, через start миллисекунд. 
* Если указан только аргумент f, функция будет вызвана немедленно, как если бы 
* в аргументе start было передано число 0. Обратите внимание, что вызов invoke() 
* не блокируется: она сразу же возвращает управление. 
*/ 
function invokeOSC(f, start, interval, end) { 
	if (!start) start = 0; // По умолчанию через 0 мс 
	if (arguments.length <= 2) // Случай однократного вызова 
		setTimeout(f, start); // Вызвать 1 раз через start мс. 
	else { // Случай многократного вызова 
		setTimeout(repeat, start); // Начать вызовы через start мс 
	function repeat() { // Планируется на вызов выше 
		var h = setInterval(f, interval); // Вызывать f через interval мс. // Прекратить вызовы через end мс, если значение end определено 
		if (end) setTimeout(function() { clearInterval(h); }, end); } 
	} 
}
// invokeOSC("alert('здорова')", 3000, 500, 4000)



//============================================================================


// (декоратор ИНВЕРТОР)
// Эта функция высшего порядка возвращает новую функцию, которая передает свои аргументы 
// функции f и возвращает логическое отрицание значения, возвращаемого функцией f; 
function notOSC(f) { 
	return function() { // Возвращает новую функцию 
		var result = f.apply(this, arguments); // вызов f 
		return !result; // и инверсия результата. 
	}; 
} 
/*
var even = function(x) { // Функция, определяющая четность числа 
	return x % 2 === 0; 
}; 
var odd = notOSC(even); // Новая функция, выполняющая противоположную операцию 
alert ([1,1,3,5,5].every(odd)); // => true: все элементы массива нечетные
*/




// Возвращает новую функцию, которая вычисляет f(g(...)). Возвращаемая функция h 
// передает все свои аргументы функции g, затем передает значение, полученное от g, 
// функции f и возвращает результат вызова f. Обе функции, f и g, 
// вызываются с тем же значением this, что и h. 
function composeOSC(f,g) { 
	return function() { 
		// Для вызова f используется call, потому что ей передается 
		// единственное значение, а для вызова g используется apply, 
		// потому что ей передается массив значений. 
		return f.call(this, g.apply(this, arguments)); 
	}; 
} 
/*
var square = function(x) { return x*x; }; 
var sum =  function(x,y) { return x+y; }; 
var squareofsum = composeOSC(square, sum); 
alert (squareofsum(2,3)) // => 25 
*/





//============================================================================
// ##карринг

// Аргументы этой функции помещаются в начало списка      (( полностью как метод bind ))
// sliceOSC
function partialLeft(f /*, ...*/) { 
	var args = arguments; // Сохранить внешний массив аргументов 
	return function() { // И вернуть эту функцию 
		var a = sliceOSC(args, 1); // Начиная с элемента 1 во внеш. масс. 
		a = a.concat(sliceOSC(arguments)); // Добавить внутренний массив аргум. 
		return f.apply(this, a); // Вызвать f с этим списком аргументов 
	}; 
} 

// Аргументы этой функции помещаются в конец списка 
// sliceOSC
function partialRight(f /*, ...*/) { 
	var args = arguments; // Сохранить внешний массив аргументов 
	return function() { // И вернуть эту функцию 
		var a = sliceOSC(arguments); // Начинать с внутр. масс. аргументов 
		a = a.concat(sliceOSC(args,1)); // Добавить внешние арг., начиная с 1. 
		return f.apply(this, a); // Вызвать f с этим списком аргументов 
	}; 
}
/*
function ggg (x1, y1, x2, y2){alert (x1+y1+x2+y2)}
partialLeft (ggg, "1", "5") ("4", "1")  //
partialRight (ggg, "1", "5") ("4", "1")  //
*/

// !!!  Аргументы этой функции играют роль шаблона. Неопределенные значения 
// в списке аргументов заполняются значениями из внутреннего набора. 
function partial(f /*, ... */) { 
	var args = arguments; // Сохранить внешний массив аргументов 
	return function() { 
		var a = sliceOSC(args, 1); // Начинать с внешнего массива аргументов  
		var i=0, j=0; 
		// Цикл по этим аргументам, заменить значения undefined значениями 
		// из внутреннего списка аргументов 
		for(; i < a.length; i++) 
			if (a[i] === undefined) a[i] = arguments[j++]; 
		// Добавить оставшиеся внутренние аргументы в конец списка 
		a = a.concat(sliceOSC(arguments, j)) 
		return f.apply(this, a); 
	}; 
} 
// Ниже приводится функция, принимающая три аргумента 
var f = function(x,y,z) { return x * (y - z); }; 
// Обратите внимание на отличия между следующими тремя частичными применениями 
/*
alert (partialLeft(f, 2)(3,4)) // => -2: Свяжет первый аргумент: 2 * (3 - 4) 
alert (partialRight(f, 2)(3,4)) // => 6: Свяжет последний аргумент: 3 * (4 - 2) 
alert (partial(f, undefined, 2)(3,4)) // => -6: Свяжет средний аргумент: 3 * (2 - 4)
*/
// ещё примеры использования 
/*
var cuberoot = partialRight(Math.pow, 1/3);
alert (cuberoot(8)); 
String.prototype.first = partial(String.prototype.charAt, 0);
String.prototype.last = partial(String.prototype.substr, -1, 1);
alert ("qwer".first()); 
alert ("qwer".last()); 
*/




//============================================================================









//////////////////////////////////////////////////////////////////////
///////////////////          ОБЪЕКТЫ          ////////////////////////
//////////////////////////////////////////////////////////////////////

//   ПУСТ ЛИ ##объект?
function isEmptyOSC(obj) {
	for (var key in obj) {
		return false;
	}
	return true;
}
/*var schedule = {};
alert( isEmptyOSC(schedule) ); // true
schedule["8:30"] = "подъём";
alert( isEmptyOSC(schedule) ); // false
*/


// перебор св-в
/*  var o = {};
for(p in o) {
if (!o.hasOwnProperty(p)) continue; // Пропустить унаследованные свойства
}
for(p in o) {
if (typeof o[p] === "function") continue; // Пропустить методы
}
*/


// my  все св-ва ##объекта    
//  inObj флаг - пропускать ли не свои св-ва?
function allKey(obj, inObj) {
  // if (typeof obj !== "object") throw TypeError(); // Арг. должен быть объектом
  var arrKey = [];
  for (var key in obj) {
	if (inObj && !obj.hasOwnProperty(key)) continue; // пропустить "не свои" свойства
	// arrKey.push(key + " = " + obj[key]+' ');    // св-во и значение в массив
	arrKey.push(key);                         // св-во в массив
  }
  return arrKey;
}

// вариант без флага     ???   можно выкинуть тк есть  Object.keys(anyObject)
/*
* Возвращает массив имен собственных перечислимых свойств объекта o.
*/
function keysOSC(o) {
	if (typeof o !== "object") throw TypeError(); // Арг. должен быть объектом
	var result = []; // Возвращаемый массив
	for(var prop in o) { // Для всех перечислимых свойств
		if (o.hasOwnProperty(prop)) // Если это собственное свойство,
		result.push(prop); // добавить его в массив array.
	}
	return result; // Вернуть массив.
}
    
rabbit = {"сексуальность":"OOO!","обояние":"да","моджо":"нет"}
rabbit1 = {"сексапильность":"ууу!","обоняние":"нет","кундалини":"да"}
/*alert (allKey(rabbit))
*/
// document.write(Object.getOwnPropertyNames(Object) );    document.write("<br>");





/* !!!  Синтаксис:
copyOSC(dst, src1, src2…)
Копирует ПЕРЕЧИСЛИМЫЕ свойства из объектов src1, src2,... в  ##объект dst. Возвращает получившийся объект.
Использование:
Для объединения нескольких объектов в один:  copyOSC(dst, src1, src2…)
Для создания копии объекта user:   var userClone = copyOSC({}, user);
*/
function copyOSC(dst) {
	// остальные ##аргументы кроме dst остаются безымянными
	for (var i = 1; i < arguments.length; i++) {
		var arg = arguments[i];
		for (var key in arg) {
		dst[key] = arg[key];
		}
	}
	return dst;
} 



// Вспомогательные функции, используемые для перечисления свойств объектов
/*
* Копирует перечислимые свойства из объекта p в объект o и возвращает o.
* Если o и p имеют свойства с одинаковыми именами, значение свойства
* в объекте o затирается значением свойства из объекта p.
* Эта функция не учитывает наличие методов доступа и не копирует атрибуты.
*/
function extendOSC(o, p) {
	for(prop in p) { // Для всех свойств в p.
	o[prop] = p[prop]; // Добавить свойство в o.
	}
	return o;
}
// тоже из множества p ...
function extendBigOSC(o /*,...*/) {
	for(var i = 1; i < arguments.length; i++) {
		var source = arguments[i];
		for(var prop in source) o[prop] = source[prop];
	}
	return o;
}


/*
* Копирует перечислимые свойства из объекта p в объект o и возвращает o.
* Если o и p имеют свойства с одинаковыми именами, значение свойства
* в объекте o остается неизменным.
* Эта функция не учитывает наличие методов доступа и не копирует атрибуты.
*/
function mergeOSC(o, p) {
	for(prop in p) { // Для всех свойств в p.
	if (o.hasOwnProperty[prop]) continue; // Кроме имеющихся в o.
	o[prop] = p[prop]; // Добавить свойство в o.
	}
	return o;
}

/*
* Удаляет из объекта o свойства, отсутствующие в объекте p.
* Возвращает o.
*/
function restrictOSC(o, p) {
	for(prop in o) { // Для всех свойств в o
	if (!(prop in p)) delete o[prop]; // Удалить, если отсутствует в p
	}
	return o;
}

/*
* Удаляет из объекта o свойства, присутствующие в объекте p. Возвращает o.
*/
function subtractOSC(o, p) {
	for(prop in p) { // Для всех свойств в p
	delete o[prop]; // Удалить из o (удаление несуществующих
	// свойств можно выполнять без опаски)
}
return o;
}

/*
* Возвращает новый объект, содержащий свойства, присутствующие хотя бы в одном
* из объектов, o или p. Если оба объекта, o и p, имеют свойства с одним
* и тем же именем, используется значение свойства из объекта p.
*/
function unionOSC(o,p) { return extendOSC(extendOSC({},o), p); }
// !!!  + обобщение для массива объектов    ##reduce
var objects = [{x:1}, {y:2}, {z:3}];
var merged = objects.reduce(unionOSC); // => {x:1, y:2, z:3}
// alert (merged["z"])


/*
* Возвращает новый объект, содержащий свойства, присутствующие сразу в обоих
* объектах, o или p. Результат чем-то напоминает пересечение o и p,
* но значения свойств объекта p отбрасываются
*/
function intersectionOSC(o,p) { return restrictOSC(extendOSC({}, o), p); }






/// Копирование свойств объекта вместе с АТРИБУТАМИ 
/*
* Добавляет неперечислимый метод extendMOSC() в Object.prototype.
* Этот метод расширяет объекты возможностью копирования свойств из объекта,
* переданного в аргументе. Этот метод копирует не только значение свойств,
* но и все их атрибуты. Из объекта в аргументе копируются все собственные
* свойства (даже недоступные для перечисления), за исключением одноименных
* свойств, имеющихся в текущем объекте.
*/
// ##расширение встроенных объектов
Object.defineProperty (Object.prototype,
	"extendMOSC", {     // Определяется Object.prototype.extendMOSC
		writable: true,
		enumerable: false, // Сделать неперечислимым
		configurable: true,
		value: function(o) { // Значением свойства является данная функция
			// Получить все собственные свойства, даже неперечислимые
			var names = Object.getOwnPropertyNames(o);
			// Обойти их в цикле
			for(var i = 0; i < names.length; i++) {
				// Пропустить свойства, уже имеющиеся в данном объекте
				if (names[i] in this) continue;
				// Получить дескриптор свойства из o
				var desc = Object.getOwnPropertyDescriptor(o,names[i]);
				// Создать с его помощью свойство в данном объекте
				Object.defineProperty(this, names[i], desc);
			}
		}
	}
);
/*
var uuu = {};
extendBigOSC(uuu, rabbit,rabbit1) 
for (k in uuu) {alert (k);}
*/













//////////////////////////////////////////////////////////////////////
///////////////////          МАССИВЫ          ////////////////////////
//////////////////////////////////////////////////////////////////////

/**
* УДАЛЕНИЕ ПРОПУСКОВ В МАССИВЕ (уплотнение)	
*                                         
* @param {object} массив
* @return {object} массив без пропусков
*/   
// ##массив  ##пропуск
function reduceSpaceArrOSC(arr){
	var rez = [];
	for (var i=0; i < arr.length; i++) {
		if(arr[i]){rez.push(arr[i])};
	};
	return rez;
}

/*var a = [1, null,,2,,undefined, 3];
// 3 варианта УПЛОТНЕНИЯ разреж ##массивов.   ##filter
// a = a.filter(function() { return true; });
// a = a.filter(function(x) { return x !== undefined; });
a = a.filter(function(x) { return x !== undefined && x != null; });
alert (a)
*/


// ##проверка эквивалентности двух  ##массивов 
function equalArraysOSC(a,b) {
	if (a.length != b.length) return false; // Массивы разной длины не равны
	for(var i = 0; i < a.length; i++) // Цикл по всем элементам
		if (a[i] !== b[i]) return false; // Если хоть один элемент отличается, массивы не равны
	return true; // Иначе они равны
}




//============================================================================

// Перетасовка     !!!!!     ##случайную перестановку ##массива с помощью  ##sort
function ShuffleOSC(InArray){    
	var Temp  = InArray.slice() ;
	Temp.sort(function comp(a, b) {return Math.random()-.5;});
	return Temp;
}

// вариант  Перетасовка   сложнее
/*function ShuffleOSC(InArray){    
	var Num;
	var Temp = new Array();
	var Len = InArray.length;

	var j = Len;

	for (var i=0; i < Len; i++){
		Temp[i] = InArray[i];
	}

	for (i=0; i < Len; i++){
		Num = Math.floor(j  *  Math.random());
		InArray[i] = Temp[Num];

		for (var k=Num; k < (j-1); k++) {
			Temp[k] = Temp[k+1];
		}
		j--; //  из временного массива вырезается выпавший случайно элемент (вернее вышележащие в массиве ставят на1 вниз)
	}
	return InArray;
}
*/
// alert ( ShuffleOSC([1, 2, 3, 4, 5])) //



// Сужает ##массив до заданного размера ##случайным выбросом элементов (с сохранением последовательности)
function ReduceItemsOSC(InArray, ReduceToSize){      
	var Temp  = InArray.slice() ;
	var ItemToDump=0;
	while (Temp.length > ReduceToSize){
		ItemToDump = Math.floor(Temp.length*Math.random());
		Temp.splice(ItemToDump, 1);
	}
	return Temp;
}

//  ##my проверка разброса после ReduceItemsOSC
/*var arrStart =[0, 1, 2, 3, 4];
var arrSer = [];
for (var i=0; i < 100; i++) { // многократное повторение
	arrSer = arrSer.concat(ReduceItemsOSC(arrStart, 3))
};
var arrCntr = []; 
for (var i=0; i < arrSer.length; i++) {
	var num = arrSer[i];
	if (!arrCntr[num]) arrCntr[num]=0;
	arrCntr[num]++;
};
alert (arrCntr)
*/



// Сужает ##массив до заданного размера ##случайным перемешиванием и выбором нужного числа эл-в (без сохранения последовательности)
function ReduceItemsRendOSC(InArray, ReduceToSize){      
	var rez  = InArray.slice();
	rez = ShuffleOSC(rez);
	rez.length = ReduceToSize; // ф-ция ShuffleOSC см выше
	return rez;
}
/*
alert (ReduceItemsOSC([1, 2, 3, 4, 5], 3)) //
alert (ReduceItemsRendOSC([1, 2, 3, 4, 5], 3)) //
*/




// my  применение метода ##slice для объектов подобных массивам
function sliceOSC (a, n) { return Array.prototype.slice.call(a, n || 0); }
function sliceMyOSC (a, n, m) { return Array.prototype.slice.call(a, n || 0, m || (a.length||0)); }
/*
var a = ["a","f","l"];
alert (sliceOSC (a, 1))
alert (sliceMyOSC (a, 1, 2))
*/




/////   ---  недодел   организация break для forEach генерацией ошибки. 
/*var sum = 0;
var e;
function foreachOSC(a,f,t) {
	try { 
		a.forEach(f,t); 
	}
	catch(e) {
		if (e === foreachOSC.break) return;
		else throw e;
	}
}
foreachOSC.break = new Error("StopIteration");

var data = [1,2,3,4,5];
function ttt (value){
 sum += value; 
 if (sum > 6) {return new Error("StopIteration")}
}
foreachOSC(data,ttt);
alert (sum)
*/












//============================================================================
// my  !!!!     ОСНОВНОЙ КОД ДЛЯ РАСПОЗНАВАНИЯ КИРИЛИЦЫ В КОДЕ          +++++ 
//============================================================================
// поиск ошиб введён кирилицы в коде      дополн- и в комментах.(руc коменты?)
// предварительно - замена знаков, искажающих код при выводе  их кодами.  <   
// дополн -  убирать лишние пробелы     ++
//  ??? сделать ввод -  form,  файл ?
// аргум 2 -  по умолч не работать/работать с коммент      0/1 
// аргум 3 -  по умолч не убирать/убрать дв пробелы/тоже не трогая нач строки  0/1/2 
// checkDblSpaceOSC  checkCyrOSC  preOSC  
function checkCodeOSC (code, comment, look, color) {  
  var codeStr = checkSymbolOSC(code);   // замена проблемных знаков
  var arrStr = [];

  if(!comment){                  // исключить комменты
	codeStr = checkBigCommentOSC (codeStr); // замена больших комментов
	arrStr = codeStr.split('\n');    // разбиение на строки.  перевод строки находит
	for (var i=0; i < arrStr.length; i++) {  // перебор всех строк
	  if(~arrStr[i].indexOf('//')){
		arrStr[i] = arrStr[i].split('//');	
		if(arrStr[i][0]){
		  if(look) {arrStr[i][0] = checkDblSpaceOSC(arrStr[i][0], look);} // убирать дв пробел
		  arrStr[i][0] = checkCyrOSC(arrStr[i][0], color);  // кир
		}
		arrStr[i] =  arrStr[i].join('//');
	  }
	  else {                 // строка без комментов
		if(look) {arrStr[i] = checkDblSpaceOSC(arrStr[i], look);}// убирать дв пробел
		arrStr[i] = checkCyrOSC(arrStr[i], color);  // кир
	  }
	  codeStr = arrStr.join('');
	}

  }else {
	  if(look) {codeStr = checkDblSpaceOSC(codeStr, look)} // убирать дв пробел. после checkCyrOSC надо ??
	  codeStr = checkCyrOSC(codeStr, color);   // кир  работа со всем включая комменты
  }
//  вывод и индикация проверки  
	preOSC(codeStr);     
/*  if(~codeStr.indexOf('<mark style='))alert ('Есть кирилица');  //  указать где именно ??
  else alert ('Нет');
*/
}


//                                                                           
//=====================       ДОПОЛН Ф-ЦИИ      !!!! ========================
//                                                                           

/**
* ЗАМЕНЯЕТ "ПРОБЛЕМНЫЙ" СИМВОЛ "<" его html-кодом &lt;
*                                                     
* @param {любой? string} code текст для исправления.  
* @return {string} code с заменёнными символами "<".
*/

// ?? др проблемные символы  кроме \< есть?   \< \>  &lt; &gt;
function checkSymbolOSC(code) {
  var codeStr = code + '', arrStr = [], rez;
  arrStr = codeStr.split('<');
  rez = arrStr.join('&lt;');
  return rez;  
}

//      ЗАПИСЫВАЕТ ТЕКСТ НА СТРАНИЦЕ КАК ЕСТЬ. <pre> <\pre> 
//  выдача в <div id="input0"> </div> 
// look  (0) - как есть / ... - без лишних пробелов
function preOSC(str, look) {   
  var rez =  O("input0"); // ??? сделать create ?  если эл-та нет
  if(look){rez.innerHTML += "<hr>" + str + "<hr>";}
  else {rez.innerHTML += "<hr>" + "<pre>" + str + "<\pre>" + "<hr>"}; 
  return;         
}


// ???  сделать поиск точки в коде (иногда ошибочно точка вместо минуса) ...



/**                                                          
*  !!!        МАРКИРОВКА КИРИЛИЦЫ.        ядро checkCodeOSC  
*                                                              
* @param {любой? string} code для поиска и маркировки кирилицы.
* @return {string} code с маркированной кирилицей.
*/

// 
function checkCyrOSC (code, color) { 
  var codeStr = code + '',  codeArr = [],  flagCyr=1, flagLat=1, arrNum=[], arrStr=[]; 
  var arrPunct = ['.', '-', ',', ':', ';'];   //  массив знаков препинания. др знаки? 
  for (var i=0; i<codeStr.length; i++) {codeArr[i] =  codeStr[i];} //  массив отдельных букв
      // отметка КИР или ЛАТ в числовом массиве
  tuk: for (var i=0; i<codeArr.length; i++) {   
	if(codeArr[i].charCodeAt(0) >=  1025 && codeArr[i].charCodeAt(0) <=  1105 )  {
	  flagLat=1; 
	  if(flagCyr) arrNum.push(i);    //массив позиций кир
	  flagCyr=0;
	}else {                          // ?? неучитывает др языки ...
	  for (var j=0; j < arrPunct.length; j++) { // перебор массива знаков препинания
		if(arrPunct[j]== codeArr[i]){continue tuk;} // по знакам препинания не переключать 
	  }
	  if(codeArr[i] === ' ' && flagCyr === 0 && codeArr[i+1].charCodeAt(0) >= 1025 && codeArr[i+1].charCodeAt(0) <= 1105 ){continue tuk;} // по пробелу в кир не переключать (если следом кир)
	  flagCyr=1; 
	  if(flagLat) arrNum.push(i);    //массив позиций лат
	  flagLat=0;
	}
  } 
  arrNum.push(codeArr.length);       //массив позиций    последний знак
  
  for (var i=0; i<arrNum.length-1 ; i++) {
	arrStr.push(codeStr.slice(arrNum[i], arrNum[i+1]));
	if(i%2) arrStr.push('</mark>')
	else if (i<arrNum.length-2){
	  if(!color){color = 'Yellow'};
	  arrStr.push('<mark style="background-color:' + color + '">'); 
	}
  }
  return  arrStr.join('');
}


/**
* ВОЗВРАЩАЕТ ТЕКСТ БЕЗ ЛИШНИХ ПРОБЕЛОВ. (флаг look 2 - оставлять пробелы вначале ...)
*                                        
* @param {любой? string} code текст для исправления.  
* @param {number} look 0(по умолч), 1, 2 выбор метода исправления.
* @return {string} code без лишних пробелов.
*/

// лучше ф-ция TrimStringOSC?  см ниже 
// ?? исправить - что-то с табуляцией - вставляет лишнее?  один ##пробел вначале не убрался?
// сделать ф-цию?   удаления лишних строк 1, 2, 3, оставлять. больше - убирать.
// ???  + пустую строку меж комент и основным текстом     по выбору ??
// рекурсия		checkCodeOSC
function checkDblSpaceOSC(code, look) { 
  var codeStr = code + '', arrStr = [], arrTemp = [], rez;
  if(look === 2){      // не убирать пробелы в начале строки   выбор look 2
	arrTemp = codeStr.split('\n'); 
	for (var i=0; i<arrTemp.length; i++) {  // перебор всех строк
	  var j=0;
	  while (arrTemp[i][j] === ' ')	j++; 
	  arrTemp[i] = arrTemp[i].slice(0, j) + checkDblSpaceOSC(arrTemp[i].slice(j))
	  //  рекурсия 1 ступень
	}
	rez =  arrTemp.join('');
	return rez;  
  }
  arrStr = codeStr.split(/\ +/); // !! ?? двойной пробел ищется. ?? не уверен. reg
  rez = arrStr.join(' ');
  return rez;  
}



//  !!!   ОБРЕЗКА ##ПРОБЕЛОВ В КОНЦЕ, В НАЧАЛЕ, ДВОЙНЫЕ ПРОБЕЛЫ МЕЖ СЛОВАМИ
function TrimStringOSC(InString){    
	var x = 0;
	if (InString.length != 0) {
		InString = InString.replace(/\s+/g," ") // удаляем лишние пробелы.
		// вариант   InString = InString.replace(/ +/g," ") //  не убирать таб и перенос cтроки \n 
		if (/\s/g.test(InString[0])) InString = InString.slice(1); // убираем пробел в начале.
		if (/\s/g.test(InString[InString.length-1])) InString = InString.slice(0, InString.length-1); // убираем пробел в конце.
		return InString;
	}
	else {return '';}
}
// alert ("|"+TrimStringOSC("       InS	tr                ing . \n \n\n \n  InS                            tr                ing .  \n  InS                            tr                ing         .    ")+"|")



// ---  вариант
/*function TrimStringOSC___(InString){    //    обрезка ##пробелов в конце, в начале, двойные пробелы меж словами
	var x = 0;
	if (InString.length != 0) {
		while ((InString.charAt(InString.length - 1) == '\u0020') || (InString.charAt(InString.length - 1) == '\u000A') || (InString.charAt(InString.length - 1) == '\u000D')){
				InString = InString.substring(0, InString.length - 1)
		}
		while ((InString.charAt(0) == '\u0020') || (InString.charAt(0) == '\u000A') || (InString.charAt(0) == '\u000D')){
				InString = InString.substring(1, InString.length)
		}
		while (InString.indexOf('  ') != -1) {
				x = InString.indexOf('  ')
				InString = InString.substring(0, x) + InString.substring(x+1, InString.length)
		 }
		return InString;
	}
	else {return '';}
}
*/










// ВОЗВРАЩАЕТ ТЕКСТ С ПЕРЕНОСОМ ЗНАКОВ БОЛЬШОГО КОММЕНТА НА НОВУЮ СТРОКУ. зачем ???
// ?? недоработ.        лишние переносы в пустых ком    и если ком подряд 
// ???  проблема -  не относящиеся к делу /* и  */  (закавыченные и в строчном коменте)в разных комби.   временно заменять ? потом возвращать ?

function indentedBigCommentOSC (code) {
  var codeStr = code + '', leftStr, rightStr, pos;
  codeStr = codeStr.split('*//*').join('*/ /*'); // проблеммный случай
  var arrStr = codeStr.split('\n');
  
  for (var i=0; i < arrStr.length; i++) {
	if(arrStr[i].length <= 2){continue;} // пропустить если длина 1 или 2 
	temp = arrStr[i].split('\/*');   // исключить если строка только из знака ком
	if (temp[0]==0 && temp[1]==0){continue;}
	if(temp[0]==0){arrStr[i] = arrStr[i].slice(arrStr[i].indexOf('\/*'))} // убрать пробелы перед
	temp = arrStr[i].split('*\/');  // исключить если строка только из знака ком
	if (temp[0]==0 && temp[1]==0){continue;}
	
	pos = arrStr[i].indexOf('//'); 
	leftStr	= arrStr[i].slice(0, pos); 
	rightStr = arrStr[i].slice(pos);  	

	leftStr = leftStr.split('/*'); 
	leftStr = leftStr.join('\n' + '/*' + '\n'); 
	leftStr = leftStr.split('*/'); 
	leftStr = leftStr.join('\n' + '*/' + '\n'); 

	rightStr = rightStr.split('/*'); 
	rightStr = rightStr.join('\n' + '/*' + '\n'); 
	rightStr = rightStr.split('*/'); 
	rightStr = rightStr.join('\n' + '*/' + '\n' + '//'); 
	
	arrStr[i] = leftStr + rightStr;                 

	if(arrStr[i].indexOf('\n')=== 0){arrStr[i] = arrStr[i].slice(1)};
	if(arrStr[i].lastIndexOf('\n')=== arrStr[i].length-2){arrStr[i] = arrStr[i].slice(0, -2)};
  }
  return arrStr.join('\n');
}
 


/**
* ПРЕОБРАЗУЕТ БОЛЬШИЕ КОММЕНТЫ В СТРОЧНЫЕ.     prompt при наруш очерёдности знаков   ???? зачем ??? 
*                                         
* @param {любое? string} текст кода с пометками комментов    / *  * /
* @return {string} текст  кода с построчными пометками комментов  // 
*/    		
function checkBigCommentOSC(code) {
  var codeStr = code + '', arrStr = [], rez;
  codeStr = indentedBigCommentOSC(codeStr);    
  arrStr = codeStr.split('/*');          
  for (var i=1; i < arrStr.length; i++) {
	  arrStr[i] = arrStr[i].split('*/');  
	  arrStr[i][0] = arrStr[i][0].split('\n');
	  arrStr[i][0].length = arrStr[i][0].length - 1; // убрал последний (пустой) элемент
	  arrStr[i][0] = arrStr[i][0].join('//');         
	  arrStr[i] = arrStr[i].join('');
  }
  return arrStr.join('');
}

//  обратное превращение               
function checkSmallCommentOSC(code) {
	var codeStr = code + '', arrStr = [], rez;
	arrStr = codeStr.split('\n');  // построчно

	for (var i=1; i<arrStr.length; i++) {
		if(arrStr[i].indexOf('//') == 0) {   // reg ??
			var j=i+1;
			while (arrStr[j].indexOf('//') == 0){
				j++;
			}
			if(j>i+1){
				for (var k=i; k<j ; k++) {
					arrStr[k] = arrStr[k].slice(2);  // reg ??
				}
				arrStr[i] = '\/*' + '\n' + arrStr[i]; 
				arrStr[j-1] = arrStr[j-1] + '*\/'+ '\n'; 
				i = k;     //  сдвинул перебор вниз до k. 
			}
		}
  }
  return arrStr.join('');
}












//=============================================================================
//  !!!!!  Поиск всех вхождений с помощью цикла while 
function allIndexOfOSC(str, target) {
  var arrNumRez = [], pos = -1;
  while (~(pos = str.indexOf(target, pos + 1))) { 
	arrNumRez.push(pos);
  }
  return arrNumRez ;
}
// alert (allIndexOfOSC(" ааа ррр ddd sss ddd uuu uuugggddd", "ddd"))



/**
* ПОИСК В СТРОКЕ определённого ПОВТОРЯЮЩЕГОСЯ ПОДРЯД СИМВОЛА (или числа)((или их группы)) (КОЛ-ВО ПОВТОРОВ numb И БОЛЬШЕ)
*                                         
* @param {string, number} текст, число 
* @param {string, number} строка, символ, число 
* @param {number} число(по умолчанию 2) (если num строка - длина строки!)
* @return {object} массив двух массивов (позиций групп и соответст размеров групп)
*/    		
// ? в случае поиска группы (н/р aba) - без нахлёстов ??? (abaaba-да, ababa-нет)  
function allIndexGruppOSC(str, symb, numb) {
	var arrPosition = [], arrLength = [], pos = -symb.length, prepos; ////////symb.length или 1 ?
	var str = str+"", symb = symb+"", symbStr = "";
	if (!numb) {var numb = 2}
	else if (typeof numb != "number") var numb = numb.length;
	for (var i=0; i < numb; i++) {symbStr+=symb}; 
	while (~(pos = str.indexOf(symbStr, pos + 1))) {  /////////symb.length или 1 ?
		if (prepos !== pos-symb.length) { ///////symb.length или 1 ?
			arrPosition.push(pos);
			arrLength[arrPosition.length-1]=numb;
		}
		else arrLength[arrPosition.length-1]++;
		prepos = pos;
	}
	return [arrPosition, arrLength];
}
//alert (allIndexGruppOSC("MUUUUUnUUUbUUUUUnU", "U", 3))
 










/**
* ОПРЕДЕЛЕНИЕ КОЛИЧЕСТВ КАЖДОГО СЛОВА В ТЕКСТЕ  (или по флагу определение букв(и др знаков + цифр(ограничено) ??) в слове/тексте) (знаки препинания заменяютс пробелом)
*                                         
* @param {string} строка текст            
* @return {object} массив двух массивов   
*/   
//  (заглавные буквы оnличаем ???)    сделать ф-цию подсчёта пробелов, слов, знаков препинания ...    ...  ???	  a замены пробелов неразрывн пробелами ...
// + TrimStringOSC
function spectrTextOSC (strText, flag){
	var arrWord = [], arrAssociative = [], arrNumb = [], sign; 
	strText = strText + "";
	var arrStranger = strText.match(/[^\w\sЁА-яё\!-\/\:-\@\[-\`\{-\¿]/g);// !! массив не латиницы и не ##кирилицы и не знаков препинания.
	if(arrStranger) alert ("В слове есть странные символы.");

	strText = strText.replace(/\s+/g," ");// лишние пробелы убирать?  

	if(flag) {// слово или предложение?
		sign = "";  
		var arrSpace = strText.match(/\s/); // пробелы в слове.
		if(arrSpace){
			alert ("В слове были пробелы.");
			strText = strText.replace(/\s/g,""); // удаляем пробелы.
		};
	}else{
		sign = " ";  
		strText	= strText.replace(/[\!-\#\%-\/\:-\@\[-\^\`\{-\¿]/g,sign); // удаление знаков препинания и тп.  некоторые знаки препинания не удалять по выбору юзера (ники, омографы?)?     не удаляю $ и _        ???  образование ##регулярного выражения строкой ???:
		strText = TrimStringOSC(strText);// лишние пробелы убирать?  
	}
	arrText = strText.split(sign);
	
	for (var i=0; i < arrText.length; i++) {
		if (!arrAssociative [arrText[i]]) {arrAssociative [arrText[i]]=0};
		arrAssociative [arrText[i]]++;
	};
	var j=0;
	for (var key in arrAssociative) {// переводит в норм массив
		arrWord[j] = key;
		arrNumb[j] = arrAssociative [key]; 
		j++;	
	}
	return [arrWord, arrNumb];
}
//alert (spectrTextOSC (" исп.....оль//// з				sign = \" \";  	strText	= strText.replace(/[\!-\#,\%-\/,\:-\@,\[-\^,\`,\{-\¿]/g,sign); уе,,...,,---+++@ оль оль оль тся, "))
//alert (spectrTextOSC (9008999999999996, 1)) // предельное число не приводящее к ошибке
// alert (spectrTextOSC ("909999999999999999999999999999999999908999999999996hh", 1)) // предельное число не приводящее к ошибке
 


// --- начальный вариант
/*function spectrTextOSC (strText, flag){
	var arrWord = [], arrAssociative = [], arrNumb = [], sign; 
	var strText = TrimStringOSC(strText+"");
	sign = flag? "" : " ";  // слово или предложение
	var arrText = strText.split(sign);
	
	for (var i=0; i < arrText.length; i++) {
		if (!arrAssociative[arrText[i]]) {arrAssociative[arrText[i]]=0};
		arrAssociative[arrText[i]]++;
	};
	var j=0;
	for (var key in arrAssociative) {// переводит в норм массив
		arrWord[j] = key;
		arrNumb[j] = arrAssociative [key]; 
		j++;	
	}
	return [arrWord, arrNumb];
}
alert (spectrTextOSC ("ggghh▲▲▲ ,,,, .....hhg")) 
*/






//=============================================================================

///  выравнивание  текста и чисел тоже/// 
function alignTextOSC  (sign, biger, smaller){
	var tmp = '';
	biger = (typeof biger=="number")?biger:(biger+"").length;
	smaller = (typeof smaller=="number")?smaller:(smaller+"").length;
	
	for (var k=0; k <= (biger - smaller); k++) {tmp += sign};
	return tmp;
}






 


// ================================================================================================
//  !!! НЕКОТОРЫЕ ЗНАКИ       / "&#47;"    \ "&#92;"   * "&#42;"  " "&#34;"   ' "&#39;"

/**
* УБИРАЕТ ЛИШНИЕ ЗНАКИ (УМОЛЧ ЗАПЯТЫЕ ), СТАВИТ ПРОБЕЛ ПОСЛЕ, УБИРАЕТ ДО . (ФЛАГ 0 совсем убирает зпт. ФЛАГ 1 нормализует)	
*                                         
* @param {string}                         
* @return {string} нормальная строка      
*/ 
// + TrimStringOSC

//  конкретный знак в отличии от normPunctMuchOSC
// ##строка ##пробел ##запятая     
// по флагу сделать чтобы не трогала в слове.  var tmpPatern = "(\\s+\\" + tmpSign + "+\\s+*)+";
// ?????   сделать нормализацию для парных знаков(+ ассиметрич парных ...) (лев прав кавычки, скобки ... ...)   + ИЕРАРХИЯ       
// ??? по флагу - убирать всё кроме лат и кир и цифр.    вариант - просто отмечать в массиве,   + подсветка ...
function normPunctOneOSC (str, sign, flag){
	var rez = str, tmpSign;
	if (!sign) {tmpSign = ","} // умолчание зпт
	else  {tmpSign = sign};
	var tmpPatern = "(\\s*\\" + tmpSign + "+\\s*)+"; // !!! образование регулярного выражения строкой 
	var patern = new RegExp (tmpPatern, "g")
	
	if (!flag) {tmpSign = " "};   // умолчание - совсем убирает.
	
	rez = rez.replace(patern,tmpSign+" ");
	rez = TrimStringOSC(rez);
	if(rez[0]==tmpSign) rez = rez.slice(2);
	if(rez[rez.length-1]==tmpSign) rez = rez.slice(0, (rez.length-1));
	return rez;
}

 //alert ("|"+normPunctOneOSC (" \"\"\"\"\"\"\"\" sp            \"     !!!  \"\"!ec\"\"tr!!  \"  !!!   !! Tex !t!! ectr!! Tex!! ! OSC ectr !! ", "\"", 1)+"|") 







/**
* УБИРАЕТ ЛИШНИЕ ЗНАКИ ПУНКТУАЦИИ...(заменяет пробелами)(оставляет первый из группы ??? сделать приоритет выбора)   (с ФЛАГОМ 0 убирает совсем) ???	
*                                         
* @param {string} 
* @return {string} нормальная строка
*/   

// ##строка   my my
//  ???   сделать юзер ввод исключений для каких-либо знаков и/или групп знаков.
function normPunctMuchOSC (str, flag){   //  ??? сделать по флагу вариант нормализации - ф-цией normPunctOneOSC ??  массив знаков по одному + forEach ... 
	var rez = str, sign;
	if(!flag){
		sign = " ";  
		rez = rez.replace(/(\s*[\!-\#\%-\/\:-\@\[-\^\`\{-\¿]+\s*)+/g,sign) // не удаляю $ и _ 
		rez = TrimStringOSC(rez);// лишние пробелы убирать? 	
	}else{
		rez = TrimStringOSC(rez);
		var arrGrupPunkt = rez.match(/([\!-\#\%-\/\:-\@\[-\^\`\{-\¿]+\s*)+/g);
		arrGrupPunkt.sort(function (a, b) {return b.length-a.length;} );  // отсортировал по длине, чтобы сначала обработались большие группы, а не возможно пересекающиеся с большими маленькие.
		for (var i=0; i < arrGrupPunkt.length; i++) { //// ПЕРЕБОР ВСЕХ ГРУПП
		
			var tmp = arrGrupPunkt[i]; 
			var len = tmp.length;
			var part = tmp[0]; // берём первый символ в группе.
			part = part + alignTextOSC(" ", len, part); // выравниваю пробелами, чтобы не искажать слово
			var arrNumPos = allIndexOfOSC(rez, arrGrupPunkt[i]);
			
			for (var j=0; j < arrNumPos.length; j++) { //// ПЕРЕБОР ВСЕХ НАЙДЕНЫХ МЕСТ ГРУППЫ
				rez = rez.slice(0, arrNumPos[j]) + part + rez.slice(arrNumPos[j]+len);
			};
		};
	};
	return 	TrimStringOSC(rez);
;
}

// alert ("|"+    normPunctMuchOSC (",. ф@@фф пп(@  55  @@@@@@", 1)   +"|") 





// !!!  вариант убирать знаки только если не в слове (не примыкают с концов и не в середине) 
function normPunctMuchOutOSC (str, flag){    
	var rez = str, sign;
	if(!flag){
		sign = " ";  
		rez = " " + rez + " "; // для соблюдения шаблона (если знаки скраю)
		rez = rez.replace(/\s(\s*[\!-\#,\%-\/,\:-\@,\[-\^,\`,\{-\¿]+\s*)+\s/g,sign);  // не удаляю $ и _ 
	}else{
		rez = TrimStringOSC(rez);
		rez = " " + rez + " ";		
		var arrGrupPunkt = rez.match(/\s(\s*[\!-\#,\%-\/,\:-\@,\[-\^,\`,\{-\¿]+\s*)+\s/g); 
		arrGrupPunkt.sort(function (a, b) {return b.length-a.length;} );  // отсортировал по длине, чтобы сначала обработались большие группы, а не возможно пересекающиеся с большими маленькие.
		for (var i=0; i < arrGrupPunkt.length; i++) { //// ПЕРЕБОР ВСЕХ ГРУПП
		
			var tmp = arrGrupPunkt[i]; 
			var len = tmp.length;
			var part = tmp[0]+ tmp[1]; // берём второй символ в группе (первый пробел).
			part = part + alignTextOSC(" ", len-1, part);   // выравниваю пробелами, чтобы не искажать слово
			var arrNumPos = allIndexOfOSC(rez, tmp);
			
			for (var j=0; j < arrNumPos.length; j++) { //// ПЕРЕБОР ВСЕХ НАЙДЕНЫХ МЕСТ ГРУППЫ
				rez = rez.slice(0, arrNumPos[j]) +  part + rez.slice(arrNumPos[j]+len); // перед part возвращаю пробел
			};
		};
	}
	return TrimStringOSC(rez);
}

//alert ("|"+ normPunctMuchOutOSC (",... ф@..........@фф @@пп(@  @@55 @@@  55@@@ @,,,,,,,,,,,,,,,,,@@ 55@@@ @@@...",1)   +"|"); 
//================================================================================================








// ================================================================================================

// ДЛЯ ##СЛОВА ОПРЕДЕЛЯЕТ ВРОДЕ БЫ УНИКАЛЬНОЕ ЧИСЛО. ??? (хэш код ... ???)
// сделал для цветового диапазоно 255.    слишком малый диапазон , соседние не различимы. 

//см ниже ##ряды  x = alfabet.length    x^1 + x^2 + x^3 + x^4 + x^5 + x^6 + x^7 + x^8 + x^9 + x^10
// 3^1 + 3^2 + 3^3 + 3^4 + 3^5 + 3^6 + 3^7 + 3^8 + 3^9 + 3^10=88572 

function uniqueCodeWordOSC (str, alfabet, lim, standart){
	var num = 0;
	
	var standart = standart || str.length;
	var limUp = MathExponentSummaOSC (alfabet.length, standart); // потолок суммы
	
	for (var i=0; i < str.length; i++) {
		if(~alfabet.indexOf(str[i])) num += Math.pow((alfabet.indexOf(str[i])+1), (i+1));
	};
	num %= limUp;
	if(lim) num = num/limUp*lim;  
	/*пропорционально для данного диапазона*/
	return (num)^0; // 
}
// alert (uniqueCodeWordOSC ("MUUUUIUUUIUUUIUI", "MUI", 255, 10))
// alert (MathExponentSummaOSC (3, 10)) 






/**
* РАЗДЕЛЯЕТ СТРОКУ НА ПО ВОЗМОЖНОСТИ РАВНЫЕ ЧАСТИ (по УМОЛЧАНИЮ 3 части)	
*                                         
* @param {string, number} строка.         
* @param {number} число частей.           
* @return {object} массив по возможности равных строк.
*/
// если num больше длины строки - разделит по буквам.
//  ##рекурсия в обёртке
function splitWordOSC(str, num){
	str += "";
	var partWord = [];
	if (!num) num = 3;
	function spWordRecOSC (str, num){
		var pos = Math.ceil(str.length/num);  
		var strTemp = str.slice(0, pos);
		partWord.push(strTemp);
		var strRecurs = str.slice(pos);
		var numRecurs = num-1;
	
		if (strRecurs.length>=pos) {
			return spWordRecOSC(strRecurs, numRecurs)
		}else partWord.push(strRecurs);
	}
	spWordRecOSC (str, num);
	partWord.length = Math.min(num, str.length); // пустые эл-ты отбрасываются
	return partWord;
}
//alert (splitWordOSC ("UUUUIUUIUUII", 5))







// Получаем массив из нескольких (УМОЛЧ 3) уникальных чисел в заданном диапазоне
// строка используемого алфавита н/р  "MUI"
// +splitWordOSC  +uniqueCodeWordOSC   
function uniqueCodeWordTripletOSC (str, num, alfabet, lim, standart){
	var arrTmp = splitWordOSC(str, num);
	var rez = [];
	for (var i=0; i < arrTmp.length; i++) {
		rez.push(uniqueCodeWordOSC (arrTmp[i], alfabet, lim, standart));
	};
	return rez;
}

//alert (uniqueCodeWordTripletOSC("MUIU",3,"MUI", 255))
 






// ========================================


// ##ряды вида    x^1 + x^2 + x^3 + x^4 + x^5 + x^6 + x^7 + x^8 + x^9 + x^10
// 3^1 + 3^2 + 3^3 + 3^4 + 3^5 + 3^6 + 3^7 + 3^8 + 3^9 + 3^10=88572    
// использовать системы счисления ???     alert (parseInt(11111111111,3)-1)
function MathExponentSummaOSC (base, varExponent){
	var rez = 0;
	for (var i=0; i < varExponent; i++) {  // ???   найти др ф-лу?
		rez = rez + Math.pow(base, (i+1));
	};
	return rez;
}
// alert (MathExponentSummaOSC (3, 10))



//  ##ряды вида    найти общ ф-ла суммы 1^x + 2^x + 3^x +  ... ??? 
// 1^3 + 2^3 + 3^3 + 4^3  + 5^3 + 6^3 + 7^3 + 8^3  + 9^3 + 10^3=3025 
function MathDegreeSummaOCS (exponent, varBase){
	var rez = 0;

	for (var i=0; i < varBase; i++) {  
		rez = rez + Math.pow((i+1), exponent);
	};
	return rez;
}
// alert (MathDegreeSummaOCS(3, 10))


// ================================================================================================





/**
* ПОИСК В ТЕКСТЕ НАЗВАНИЯ ФУНКЦИЙ (выражения после слова function)	
*                                         
* @param {string} строка.         
* @return {object} массив имён функций.
*/
function searchFunctionOSC (text){
	text = text.toString();
	var arrTmp = text.match(/function [\w\_\$]+\s*\(/g), arrRez = [];
	for (var i=0; i < arrTmp.length; i++) {
		var tmp = arrTmp[i].split(/\s+/)[1];
		if (tmp[tmp.length-1] == "\(") {tmp = tmp.slice(0, -1)};
		arrRez[i] = tmp;
	};
	return arrRez;
}













// ================================================================================================



                         // МАРКИРОВКА ТЕКСТА 
//    1/ *  * /      2//   \n       3/  /             4''         5""                 
//  учитывается проблемный случай - / как знак деления.
	
// подзоны  /**  */ особ коменты   и   //////////   ///////////   заглавия 
//  /////  my важные коменты         

// ??? продолжить  независ флаг -  объявленные ф-ции,    my связанные ф-ции (блоки?)//=====  //=====  
// ??? независ флаг  -  скобки () [] {},      теги <  ???  >   

// +++  черновСкрипт

////////////////////////////////////////////////////////////////////////////////
// Маркировка текста 
function infoMarkBigOSC (text){
	text =  checkSymbolOSC(text.toString()); ////////////////////
	var flagType = 0,     arrOrdinary = [] 
	var arrBigComment = [], arrStringComment = [];
	var arrRegExp = [], arrQuotOne = [], arrQuotTwo = [];
	//////// КОМПОНОВКА МАССИВА РЕЗУЛЬТАТА 
	var arrRez = [arrOrdinary,   arrBigComment,  arrStringComment,  arrRegExp,  arrQuotOne,  arrQuotTwo]; 
	// в каждом массиве [0-коорд начала, 1- коорд конца, 2- тип], [],[] ...
	var lastZone = 0;
	
	for (var i=0; i < text.length; i++) {
		if (text[i] == "\n") {lastZone = i}; // запоминает конец строки
		
		if (flagType)  {                 // флаг есть 
			if (flagType == 1) {
				if (text[i] == "*" && text[i+1] && text[i+1]=="\/") { // 1 big comment 
					flagType = 0;
					arrBigComment[arrBigComment.length-1][1]=i+1;     // конец big comment 
					arrBigComment[arrBigComment.length-1][2]=1;
					i++;
					lastZone = i;            // запоминает конец comment 
				}
			}
			else if (flagType == 2){
				if (text[i] == "\n") {                                   // 2 string comment 
					flagType = 0;
					arrStringComment[arrStringComment.length-1][1]=i-2;  // конец string comment  ??? 
					arrStringComment[arrStringComment.length-1][2]=2;
					// перевод строки не беру 
					i--;
				}
			}
	
			
			else if (flagType == 31){                         // 31  рег выраж 
				if (text[i] == "\/" && text[i-1] != "\\") {
					flagType = 0;
					arrRegExp[arrRegExp.length-1][1]=i;       // конец рег выраж 
					// учёт постфикса рег выраж. ?? бывает 3 постфикса? 
					if (text[i+1] == "i" || text[i+1] == "g" || text[i+1] == "m"){
						arrRegExp[arrRegExp.length-1][1]=i+1;       // конец рег выраж 
						if (text[i+2] == "i" || text[i+2] == "g" || text[i+2] == "m"){
							arrRegExp[arrRegExp.length-1][1]=i+2;       // конец рег выраж 
							if (text[i+3] == "i" || text[i+3] == "g" || text[i+3] == "m"){
								arrRegExp[arrRegExp.length-1][1]=i+3;       // конец рег выраж 
								i++;
							}
							i++;
						}
						arrRegExp[arrRegExp.length-1][2]=3;
						i++;
					}
				}
			}
			// (проблема знак разделить  /)
			else if (flagType == 32){                         // 32 возможно рег выраж 
				if (text[i] == "\n") { 
					arrRegExp.length--;         // ОТБОЙ рег выраж  \n
					flagType = 0;
				}
				else if (text[i] == "\/") {
					if (text[i+1] && text[i+1] == "\/") { 
						arrRegExp.length--;     // отбой рег выраж  //
						flagType = 0;
						i--;
					}
					else if (text[i+1] && text[i+1] == "*") {  
						if (text[i-1] != "\\") {
							arrRegExp.length--; // отбой рег выраж  / *   исключить \/* в рег выраж.
							flagType = 0;
							i--;
						}
					} 
					else {
						if (text[i-1] != "\\") {
							flagType = 0;
							arrRegExp[arrRegExp.length-1][1]=i;   // конец возможно рег выраж 
							// учёт постфикса рег выраж. ?? бывает 3 постфикса?
							if (text[i+1] == "i" || text[i+1] == "g" || text[i+1] == "m"){
								arrRegExp[arrRegExp.length-1][1]=i+1;       // конец рег выраж 
								if (text[i+2] == "i" || text[i+2] == "g" || text[i+2] == "m"){
									arrRegExp[arrRegExp.length-1][1]=i+2;       // конец рег выраж 
									if (text[i+3] == "i" || text[i+3] == "g" || text[i+3] == "m"){
										arrRegExp[arrRegExp.length-1][1]=i+3;       // конец рег выраж 
										i++;
									}
									i++;
								}
								arrRegExp[arrRegExp.length-1][2]=3;
								i++;
							}
						}
					}
				}
			}
		
		
			
			else if (flagType == 4){
				if (text[i] == "\'") {                       // 4  кавычки ' 
					flagType = 0;
					arrQuotOne[arrQuotOne.length-1][1]=i;    // конец кавычки ' 
					arrQuotOne[arrQuotOne.length-1][2]=4;
				}
			}
			else if (flagType == 5){
				if (text[i] == '\"') {                         // 5  кавычки " 
					flagType = 0;
					arrQuotTwo[arrQuotTwo.length-1][1]=i;      // конец кавычки " 
					arrQuotTwo[arrQuotTwo.length-1][2]=5;
				}
			}
			else if (flagType == 9) {
				if (text[i] =="\/" || text[i] ==="\'" || text[i] ==='\"') { // 9  обычный текст 
					flagType = 0;
					i--;
					arrOrdinary[arrOrdinary.length-1][1]=i;                 // конец обычный текст 
					arrOrdinary[arrOrdinary.length-1][2]=0;
				}else if (i == text.length-1) {
					arrOrdinary[arrOrdinary.length-1][1]=i; // конец всего текста
					arrOrdinary[arrOrdinary.length-1][2]=0;
				}
			}
			continue;   ///    может continue после каждого сброса флага?
		}
//////////////////////////////////////////////////////////////////////////////////////
		else {           // флага нет  
			if (text[i] == "\/") {
				if (text[i+1] && text[i+1]=="*") { // 1 big comment 
					flagType = 1;
					arrBigComment.push([i, 0, 0]);    //  ???  начало big comment 
					i++;
				}
				else if (text[i+1] && text[i+1]=="\/") { // 2 string comment 
					flagType = 2;
					arrStringComment.push([i, 0, 0]);       // начало string comment 
					i++;
				}
				else {                             // 3  рег выраж  
					var tmpText = text.slice(lastZone+1, i);         
					if (/^\s*$/.test(tmpText) || /[\!\#\%\&\(-\/\:-\@\[-\^\`\{-\¿]\s*$/.test(tmpText)){
						flagType = 31; // если перед / пусто  или  знаки (но не " или ') / точно не знак делить
					// (проблема знак разделить  /)
					}else  flagType = 32; // иначе может быть это знак делить 
					arrRegExp.push([i, 0, 0]);        // начало рег выраж 
				};
			}
			else if (text[i] === "\'") {   // 4  кавычки ' 
				flagType = 4;
				arrQuotOne.push([i, 0, 0]);   // начало кавычки '  
			}
			else if (text[i] === '\"') {      // 5  кавычки " 
				flagType = 5;
				arrQuotTwo.push([i, 0, 0]);      // начало кавычки "  
			}
			else {                         // 9 обычный текст
				flagType = 9;
				arrOrdinary.push([i, 0, 0]);  // начало обычный текст 
			};
		};
	};
	
	return	arrRez;
}





 
// выбор типа текста и его изменение
// аргументы (ввод массивом) [1- большие комменты, 2- строчн комменты, 3- рег выраж, 4- выраж в кавычках ',   5-  выраж в кавычках "   0- оставшийся обычный текст]
// в результате [ОСТАВШИЙСЯ ТЕКСТ,  ВЫРЕЗАННЫЕ ОБЛАСТИ].  
// checkSymbolOSC  infoMarkBigOSC    getClassOSC

function doMarkBigOSC  (propBig){  // text, arr, InOut, arrFunc,     arrProp
	///// УМОЛЧАНИЯ 
	var text = propBig.text || "текст не определён";
	var arr = propBig.arr || [1,2]; // умолчание - удаление коментов.
	var InOut = 0; // умолч весь текст
	if (propBig.InOut) {InOut = propBig.InOut;}

	var arrFunc = propBig.arrFunc || 0; // массив ф-ций есть   или нет.
	
	// var arrProp = propBig.propSmall || 0;  ---
	
	// массив настроек есть   или нет. 111
	if (!propBig.propSmall) {var arrProp = {} }
	else {var arrProp = propBig.propSmall}; 					
	if (!Array.isArray(arrProp)) { // настройка одна на всех (не массив) ??? др проверки?
		var temp = [];	
		for (var m=0; m < arr.length; m++) {
			temp[m] = arrProp;
		};
		arrProp = temp;
	}
	text =  checkSymbolOSC(text.toString());  

	var arrZone = infoMarkBigOSC(text);
	var arrZoneMinus = [];
	var flagAlert = ""; 
	
	for (var k=0; k < arr.length; k++) {
		arrZoneMinus = arrZone[arr[k]].concat(arrZoneMinus);
	};

	arrZoneMinus.sort(function (a, b) {return b[0]-a[0];});  // сортирую по координатам в тексте
	
	var arrText = text.split(""); // массив по буквам  
	var rez = "",  rezInvert = "";
	
	for (var i=0; i < arrZoneMinus.length; i++) {
		var left = arrZoneMinus[i][0];	
		var right = arrZoneMinus[i][1];	

		var arrTmp = arrText.splice(left, right-left+1); 
		var strTmp = arrTmp.join(""); 

		////////////////////  	
		if (arrFunc) { // выбор ф-ции 
			if (!Array.isArray(arrFunc)) { // если не массив
				var tmp = [];
				for (var j=0; j < arr.length; j++) {
					tmp[j] = arrFunc;
				};
				arrFunc = tmp;
			}
			var ind = arr.indexOf(arrZoneMinus[i][2]);
			if (arrFunc[ind]) { // если есть 
				var tmpFunc = arrFunc[ind];  // соответс ф-ция из arrFunc 
				if (getClassOSC(tmpFunc)=="Function") {// если ф-ция - применить
					if (arrProp[ind]) { // если есть 
						var tmpProp = arrProp[ind];  // соответс Prop из arrProp 
						tmpProp.str = strTmp;
						strTmp = tmpFunc(tmpProp);
					}else{
						var tmpProp = {}; 
						tmpProp.str = strTmp;
						strTmp = tmpFunc(tmpProp);  
					}
				}else {strTmp = strTmp; flagAlert = "Проверьте функции"} // если не ф-ция- ничего не менять.   можно вставить 1
			}else{
				if (!InOut) {strTmp = ""} // если соотв ф-ции  нет - выполняем удаление по умолчанию.
				else {strTmp = strTmp}; 
			} 
			
		}else{
			if (!InOut) {strTmp = ""} // если ф-ций вообще нет - выполняем удаление по умолчанию.
			else {strTmp = strTmp}; 
		} 
		//////////////////////

		arrText.splice(left, 0, strTmp); // вставил обратно
		var tmpN = " ";
		if (arrZoneMinus[i][2] && arrZoneMinus[i-1] && arrZoneMinus[i-1][2]) {tmpN = "\n"};
		rezInvert = strTmp + tmpN + rezInvert; // вырезаные области
	};
	rez = arrText.join(""); 
	if (flagAlert) alert (flagAlert);
	
	if (!InOut)	return rez; // ВЕСЬ ТЕКСТ  
	else return rezInvert; // ИЛИ  ВЫРЕЗАННЫЕ ОБЛАСТИ.
}



//  ?????  вторичный прогон (текст с тегами) preOSC(doMarkBigOSC(tmpChoice[0],[3]))  [1,2,3,4,5]
// вырезать теговое - заменять символами   - потом обратно ?? 




//========================
/////  ОПРЕДЕЛЯЕТ МАССИВ КООРДИНАТ ПОДСТРОК ОПРЕД СИМВОЛОВ (умолч - кирилицы)
function infoMarkSmallOSC (str, regStr){
	// рег выраж по умолчанию
	var pattern = "";
	if (regStr == undefined) {regStr = "[ёа-яА-ЯЁ]"}; 
	pattern = new RegExp (regStr);
	
	var arrMarking = [], flagCyr = 0;
	var last = str.length; // конец текста
	for (var i=0; i < str.length; i++) {
		                                 // добавить номер строки ???
		if (!flagCyr) {
			if (pattern.test(str[i])) {
				arrMarking.push([i,last]); 
				flagCyr = 1;
			}else continue;
		}
		else {
			if (pattern.test(str[i])) 	continue;
			else {
				arrMarking[arrMarking.length-1][1]=i; 
				flagCyr = 0;
			}	
		}	
	};
	return arrMarking;
}

///// ПРОИЗВОДИТ ИЗМЕНЕНИЯ С ПОДСТРОКАМИ на основе инфо от infoMarkSmallOSC 
///// propSmall  (str,  regStr,  f_1,  InOut),           prop1 (clr,  f_2)      
// умолч  маркинг кирилицы
function doMarkSmallOSC (propSmall){ 
	// УМОЛЧАНИЯ 
	var str = propSmall.str || "пока yes бред no";
	var f_1 = propSmall.f_1 || f_clr;
	var regStr = propSmall.regStr;
	if (propSmall.prop1 == undefined) {	var prop1 = {}; }
	else {var prop1 = propSmall.prop1};
	var InOut = 0; // умолч весь текст
	if (propSmall.InOut) {InOut = propSmall.InOut;}
	
	str =  checkSymbolOSC(str.toString());
	
	var rez = "",  rezInvert = "";

	var arrCyr = infoMarkSmallOSC(str, regStr);
	var arrStr = str.split(""); 
	arrCyr.reverse(); 
	
	var addArgum = prop1;  
	for (var i=0; i < arrCyr.length; i++) {
		var left = arrCyr[i][0];	
		var right = arrCyr[i][1];	
		var arrTmp = arrStr.splice(left, right-left);
		var strTmp = arrTmp.join("");
		if (getClassOSC(prop1)=="Object")	prop1.str = strTmp // если настройки через объект
		else {// иначе просто аргумент ???    сделать если ввод массивом
			prop1 = strTmp; 
		}
		strTmp = f_1(prop1, addArgum);	 // strTmp, clr, f_2

		arrStr.splice(left, 0, strTmp); // вставил обратно
		rezInvert = strTmp + " " + rezInvert; // вырезаные области
	};
	rez = arrStr.join("");
	if (!InOut)	return rez; // ВЕСЬ ТЕКСТ  
	else return rezInvert; // ИЛИ  ВЫРЕЗАННЫЕ ОБЛАСТИ.
}



//========================

///// СТРОКУ      ОФОРМИТЬ ТЕГАМИ (УМОЛЧ ПОДСВЕТКА)     ОБРАБОТ ДОПОЛН Ф-ЦИЕЙ   
// str     tegPaar  clr      f_2    
// ф-ция или на входе объект настроек,   или строка + дополн аргум (н/р массив ...) 
function f_clr (prop1){  
	// УМОЛЧАНИЯ 
	var str = prop1.str || "Превед бред";
	var tegPaar = prop1.tegPaar || ["<span style='background-color:", "'>", "</span>"];
	if (prop1.clr == undefined) {prop1.clr = "Orange";}
	var clr = prop1.clr;

	if (prop1.f_2) {str = prop1.f_2(str)}; 
	return (tegPaar[0] + clr +tegPaar[1]+str+tegPaar[2])
}
//
function f_clrRRR (str, arr){  /////////
	alert (str);
	for (var i=0; i < arr.length; i++) {alert (arr[i])};
	return str;
}


///// ДОПОЛНИТЕЛЬНАЯ Ф-ЦИЯ (ЗДЕСЬ ПЕРЕТАСОВКА)
function f_rand (str){                
	if (!str) str = "Превед бред";
	return (ShuffleOSC(str.split("")).join(""))
}
// 
function f_random (pro){                
	var str = pro.str || "Превед";
	return (ShuffleOSC(str.split("")).join(""))
}





//  ##заготовка - создатель ф-ций    ??? нужно .apply(this, arguments) ?
function CreatorFunc (trr){                
	return function (str){                
		return (trr+str+trr)
	}
}
/*var crea = CreatorFunc ("trr");
alert (crea("ddd"))
*/

// my   ##заготовка - послед-ть ф-ций ( матрёшка,  шампур). 
function skewerFunc (a, arrFnc){
	var a = arguments[0];
	for (var i=0; i < arrFnc.length; i++) {
		a = arrFnc[i](a); 
	};
	var rez = a;
	return rez;
}
/*
var sum =    function(x) { return x[0]+x[1]; };
var square = function(x) { return x*x; };
*/
// alert (skewerFunc ("streкаргнteffg", [f_rand, splitWordOSC]))
// alert (skewerFunc ([2, 7], [sum, square]))
//========================================================================
















