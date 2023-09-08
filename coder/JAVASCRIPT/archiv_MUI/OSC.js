//  !!!!  ((мини ##библиотека))
// OSC O S C       Math.degreesToRadians   circle  largest         assert


function O(obj){
  if (typeof obj == 'object') return obj
  else return document.getElementById(obj) 
}

function S(obj){return O(obj).style}

function C(name){
  var elements = document.getElementsByTagName('*')  // ??  можно document.all ?
  var objects = []
  for (var i = 0 ; i <elements.length ; ++i) 
  if (elements[i].className == name)
  objects.push(elements[i])
  return objects         
}
// ==================================================================================






//       ##Math  ##матем      расширение Math
// углы в радианы   
Math.degreesToRadians = function(degrees)
{
return degrees * Math.PI / 180
}

//  my  факториал
function factOSC(n) {
  var rez = 1;
  for (var i = 2; i <= n; i++) {
	  rez *= i;
  }
  return rez;
}

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
	for (var i=1; i<InArray.length; i++){
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



//============================================================================


// Перетасовка     !!!!!    создать ##случайную перестановку ##массива с помощью  ##sort
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

	for (var i=0; i<Len; i++){
		Temp[i] = InArray[i];
	}

	for (i=0; i<Len; i++){
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
	arrSer.push(ReduceItemsOSC(arrStart, 3))
};

var arrCntr = []; 
for (var i=0; i < arrSer.length; i++) {
	for (var j=0; j < arrSer[i].length; j++) {
		var num = arrSer[i][j];
		if (!arrCntr[num]) arrCntr[num]=0;
		arrCntr[num]++;
	}
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

/*alert (ReduceItemsOSC([1, 2, 3, 4, 5], 3)) //
alert (ReduceItemsRendOSC([1, 2, 3, 4, 5], 3)) //
*/










//============================================================================
//               ПРОВЕРКА ТИПА АРГУМЕНТА      + см ниже    typeCheckOSC          
//============================================================================

//  ##проверка  собственно числовые NaN  - не равно самому себе 
function isReallyNaNOSC(x) {
  return x !== x;
}

// вспомогательная функция для проверки на число
  function checkNumberOSC(value) {
return typeof value == 'number';
}

//  !!!  ##проверка     Если же нужна действительно точная проверка на число, 
// которая не считает числом строку из пробелов, логические и специальные значения,
// а также отсекает Infinity — используйте следующую функцию isNumericOSC    ##isFinite
//  ??  а с регулярн выражениями не проще?  - if(/\D/.test(n) || n == '') нечисла или пустая строка
function isNumericOSC(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// !!!  ##проверка целое ли число
function isIntegerOSC(num) {   
  return (num ^ 0) === num
}
//  document.write(isIntegerOSC(5.5));    document.write("<br>");

// !!! [[Class]] функция getClassOSC, которая будет возвращать только сам [[Class]]
function getClassOSC(obj) {
  return {}.toString.call(obj).slice(8, -1);
}
/*alert( getClassOSC(new Date) ); // Date
alert( getClassOSC([1, 2, 3]) ); // Array
alert( getClassOSC(123) ); // Date
alert( getClassOSC('qwer') ); // String
*/


//  + Метод Array. ##isArray ()
/*alert( Array.isArray([1,2,3]) ); // true
alert( Array.isArray("not array")); // false
*/

// + Утиная типизация   !!!
// Например, мы можем проверить, что объект — массив, не вызывая Array.isArray, а просто уточнив наличие важного для нас метода, например splice
/*var something = [1, 2, 3];
if (something.splice) {
alert( 'Это утка! То есть, массив!' );
}
*///мы намеренно позволяем передать в код нечто менее конкретное, чем определённый тип, чтобы сделать его более универсальным.




//   ПУСТ ЛИ ##объект?
function isEmptyOSC(obj) {
for (var key in obj) {
return false;
}
return true;
}
var schedule = {};
/*alert( isEmptyOSC(schedule) ); // true
schedule["8:30"] = "подъём";
alert( isEmptyOSC(schedule) ); // false
*/





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



// my  для для тестрования сравнения МАССИВА Ф-ЦИЙ.   ##performance.now() см в браузе
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
	for (var j=0; j< arrfunc.length; j++) {
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





//============================================================================
//               ДЕКОРАТОРЫ  ((возвращают ту же ф-цию но с наворотами))        
//============================================================================

//       ДЕКОРАТОР-ТАЙМЕР  полное время работы ф-ции    см в браузе    ##apply
// прибавит время выполнения f к таймеру timers[timer]
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
// пример
// функция может быть произвольной  
// использование: завернём fibonacci в декоратор
//        factOSC = timingDecoratorOSC(factOSC, "fibo");
// неоднократные вызовы...
/*alert ( factOSC(100000)); 
alert ( factOSC(200000)); 
    factOSC(50);factOSC(50);
// в любой момент можно получить общее количество времени на вызовы
alert( timers.fibo + 'мс' );
*/



//       ДЕКОРАТОР ДЛЯ ПРОВЕРКИ ТИПА для f  
// второй аргумент checks массив с функциями для проверки
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
//  function sum(a, b) {return a + b;}
// обернём декоратор для проверки
/*sum = typeCheckOSC(sum, [checkNumberOSC, checkNumberOSC]);  // оба аргумента ‐ числа
alert( sum(1, 2) ); // 3, все хорошо  // пользуемся функцией как обычно*/



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



//             ЛОГИРУЮЩИЙ ДЕКОРАТОР (1 аргумент)   
function makeLoggingSimplOSC(f, log) {
  function wrapper(a) {
	log.push(a);
	return f.call(this, a);
  }
  return wrapper;
}
var log = [];

/*function work(a) {// произвольная функция, один аргумент
  return a*a;
}
work = makeLoggingSimplOSC(work, log);
work(1); // 1
work(5); // 5
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



//  !!           КЕШИРУЮЩИЙ ДЕКОРАТОР          
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



//      ФУНКЦИЯ-ЗАДЕРЖКА в  обёртке !!!
function delayOSC(f, ms) {
  return function() {
	var savedThis = this; // сохраняем контекст
	var savedArgs = arguments; // и аргументы в переменных
	setTimeout(function() { // таймер на обёртываемую ф-цию на ms миллисекунд 
	f.apply(savedThis, savedArgs);
	}, ms);
  };
}
// пример
/*function f(x) {
  alert( x );
}
var f1000 = delayOSC(f, 1000);
var f1500 = delayOSC(f, 1500);
f1000("тест"); // выведет "тест" через 1000 миллисекунд
f1500("тест2"); // выведет "тест2" через 1500 миллисекунд*/



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
setTimeout( function() { f(5) }, 1500); // игнор*/



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


//============================================================================






//  Ф-ЦИЯ ДЛЯ ТЕСТИРОВАНИЯ ((типа true/false))  выдаёт нумерованный результат   
// !!!!!                                  в html  вписать <ul id="results"> </ul>
function assert (value, desc) {
  var li = document.createElement ( "li" ) ;
  li.style.color = value ? "green" : "red" ;
  // если красный - зачеркнуть
  if(li.style.color == "red" ){li.style.textDecoration = "line-through"} 
  li.style.listStyleType = "decimal";    //  !! my  список с цифрами
  li.appendChild (document.createTextNode ( desc ));
  document.getElementById("results").appendChild(li);
  //kkk  alert(y);   var y=4;       my !!  для alert   y объявлена но не определена  
  //(без var не объявлена и стопорит весь скрипт)  
}




// ================================================================================================
// my  все св-ва объекта    вариант с alert ???  где объект rabbit?
/*function allKey(obj, inObj) {
	var arrKey = [];
  for (var key in obj) {
	if (inObj && !obj.hasOwnProperty(key)) continue; // пропустить "не свои" свойства
	arrKey.push(key);
	alert( key + " = " + obj[key] ); 
  }
  alert( arrKey ); 
}
*/


/*function allKey(obj, inObj) {
  var arrKey = [];
  for (var key in obj) {
	if (inObj && !obj.hasOwnProperty(key)) continue; // пропустить "не свои" свойства
	// arrKey.push(key + " = " + obj[key]+' ');    // св-во и значение в массив
	arrKey.push(' '+key);                         // св-во в массив
  }
  document.write("<br>");
  document.write(arrKey.length);document.write("<br>");
  document.write(arrKey);document.write("<br>");
}
*/    
//kkk allKey(rabbit)
//kkk  document.write(Object.getOwnPropertyNames(Object) );    document.write("<br>");









/* !!!  Синтаксис:
copyOSC(dst, src1, src2…)
Копирует свойства из объектов src1, src2,... в  ##объект dst. Возвращает получившийся объект.
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









//============================================================================
// my  !!!!     ОСНОВНОЙ КОД ДЛЯ РАСПОЗНАВАНИЯ КИРИЛИЦЫ В КОДЕ          +++++ 
//============================================================================
// поиск ошибочно введённой кирилицы в коде            дополн - и в комментах.
// предварительно - замена знаков, искажающих код при выводе  их кодами.  <   
// дополн -  убирать лишние пробелы     ++
//  ??? сделать ввод - prompt,  form,  файл ?
// аргум 2 -  по умолч не работать/работать с коммент      0/1 
// аргум 3 -  по умолч не убирать/убрать дв пробелы/тоже не трогая нач строки  0/1/2 

function checkCodeOSC (code, comment, look, color) { 
  var codeStr = checkSymbolOSC(code);   // замена проблемных знаков
  var arrStr = [];

  if(!comment){                  // исключить комменты
	codeStr = checkBigCommentOSC (codeStr); // замена больших комментов
	arrStr = codeStr.split('\n');    // разбиение на строки.  перевод строки находит
	for (var i=0; i<arrStr.length; i++) {  // перебор всех строк
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

// ?? др проблемные символы  кроме < есть?   < >  &lt; &gt;
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
  var rez =  O("input0");
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
//  не убирать таб и перенос cтроки \n  ??? 
function TrimStringOSC(InString){    
	var x = 0;
	if (InString.length != 0) {
		InString = InString.replace(/\s+/g," ") // удаляем лишние пробелы.
		if (/\s/g.test(InString[0])) InString = InString.slice(1); // убираем пробел в начале.
		if (/\s/g.test(InString[InString.length-1])) InString = InString.slice(0, InString.length-1); // убираем пробел в конце.
		return InString;
	}
	else {return '';}
}
//alert ("|"+TrimStringOSC("  InS     			       tr                ing . \n \n\n \n  InS                            tr                ing .  \n  InS                            tr                ing         .    ")+"|")
 


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










// ВОЗВРАЩАЕТ ТЕКСТ С ПЕРЕНОСОМ ЗНАКОВ БОЛЬШОГО КОММЕНТА НА НОВУЮ СТРОКУ.
// ?? недоработ.        лишние переносы в пустых ком    и если ком подряд 
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
* ПРЕОБРАЗУЕТ БОЛЬШИЕ КОММЕНТЫ В СТРОЧНЫЕ.     prompt при наруш очерёдности знаков  ???? 
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
	var arrStranger = strText.match(/[^\w,\s,Ё,А-я,ё,\!-\/,\:-\@,\[-\`,\{-\¿]/g);// !! массив не латиницы и не ##кирилицы и не знаков препинания.
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
		strText	= strText.replace(/[\!-\#,\%-\/,\:-\@,\[-\^,\`,\{-\¿]/g,sign); // удаление знаков препинания и тп.  некоторые знаки препинания не удалять по выбору юзера (ники, омографы?)?     не удаляю $ и _        ???  образование ##регулярного выражения строкой ???:
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




// ================================================================================================
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
		rez = rez.replace(/(\s*[\!-\#,\%-\/,\:-\@,\[-\^,\`,\{-\¿]+\s*)+/g,sign) // не удаляю $ и _ 
		rez = TrimStringOSC(rez);// лишние пробелы убирать? 	
	}else{
		rez = TrimStringOSC(rez);
		var arrGrupPunkt = rez.match(/([\!-\#,\%-\/,\:-\@,\[-\^,\`,\{-\¿]+\s*)+/g);
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

//alert ("|"+    normPunctMuchOSC (",. ф@@фф пп(@  55  @@@@@@", 1)   +"|") 





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

function uniqueCodeWordOSC (str, alfabet, lim){
	var num = 0, limUp = 0;
	
	for (var i=0; i < str.length; i++) {  // ??? может нужна стандартная длина  10?  др ф-ла?
		limUp = limUp + Math.pow((alfabet.length), (i+1));
	};

	for (var i=0; i < str.length; i++) {
		if(~alfabet.indexOf(str[i])) num += Math.pow((alfabet.indexOf(str[i])+1), (i+1));
	};
	// num %= limUp;
	if(lim) num = num/limUp*lim;
	// alert (num)
	return (num)^0; // 
}
// alert (uniqueCodeWordOSC ("IUII", "MUI", 255))





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







// Получаеv массив из нескольких (УМОЛЧ 3) уникальных чисел в заданном диапазоне
// строка используемого алфавита н/р  "MUI"
// +splitWordOSC  +uniqueCodeWordOSC   
function uniqueCodeWordTripletOSC (str, num, alfabet, lim){
	var arrTmp = splitWordOSC(str, num);
	var rez = [];
	for (var i=0; i < arrTmp.length; i++) {
		rez.push(uniqueCodeWordOSC (arrTmp[i], alfabet, lim));
	};
	return rez;
}

//alert (uniqueCodeWordTripletOSC("MUIU",3,"MUI", 255))
 






// ================================================================================================


// ##ряды вида    x^1 + x^2 + x^3 + x^4 + x^5 + x^6 + x^7 + x^8 + x^9 + x^10
// 3^1 + 3^2 + 3^3 + 3^4 + 3^5 + 3^6 + 3^7 + 3^8 + 3^9 + 3^10=88572    использовать системы счисления ???
function MathExponentSummaOSC (base, varExponent){
	var rez = 0;
	for (var i=0; i < varExponent; i++) {  // ???   найти др ф-лу?
		rez = rez + Math.pow(base, (i+1));
	};
	return rez;
}
// alert (MathExponentSummaOSC (3, 10))



//  ##ряды вида    найти общ ф-ла суммы 1^x + 2^x + 3^x +  ... 
// 1^3 + 2^3 + 3^3 + 4^3  + 5^3 + 6^3 + 7^3 + 8^3  + 9^3 + 10^3=3025 
function MathDegreeSummaOCS (exponent, varBase){
	var rez = 0;

	for (var i=0; i < varBase; i++) {  
		rez = rez + Math.pow((i+1), exponent);
	};
	return rez;
}
// alert (MathDegreeSummaOCS(3, 10))



