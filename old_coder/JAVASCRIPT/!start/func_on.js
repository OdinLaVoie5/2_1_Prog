//  простые ф-ции

// min
function minMy(a, b) {
  return (a<b)? a :b;
}
assert(1, minMy(6,9))             //1//////////////////////////////




//  концепт  рекурсия
function powRec(x, n) {
  if (n-1) {return x*powRec(x, n-1);
  }return x;
}
//  alert(powRec(3,2))           //////////





//  !!!  Условное объявление функции    пример
var age = 19                    //kkk  prompt('Сколько вам лет?');
var sayHi = (age >= 18) ?
  function() { assert(1, 'Прошу Вас!'); } :
  function() { assert(1, 'До 18 нельзя'); 
};
sayHi();                         //2//////////////////////////////





//  ##пример      анонимные функции
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}
/*function showOk() {               // вариант 
  alert( "Вы согласились." );
}
function showCancel() {
  alert( "Вы отменили выполнение." );
}
// использование
ask("Вы согласны?", showOk, showCancel);

ask(                               // вариант1
"Вы согласны?",
function() { alert("Вы согласились."); },
function() { alert("Вы отменили выполнение."); }
);
*/


//  ##шаблон   !!!
/*function ask1(question, answer, ok, fail) {
var result = prompt(question, '');
if (result.toLowerCase() == answer.toLowerCase()) ok();
else fail();
}
// н/р
ask1("Выпустить птичку?", "да", fly, die);
function fly() {
alert( 'улетела :)' );
}
function die() {
alert( 'птичку жалко :(' );
}
*/





// Существует ещё один способ создания функции, который используется очень редко
// позволяет создавать функцию полностью «на лету» из строки
// функция создаётся вызовом  !!!!  new Function(params, code):     params - Параметры функции через запятую в виде строки.  code - Код функции в виде строки.
var sumNew = new Function('a,b', ' return a*b; ');
var result = sumNew(3, 2);
assert(1, result ); // 3              //3/////////////////////////////





// 3 концепта   сумма чисел
function sumForm(num){
  var rez= num*(num+1)/2;
  return rez;
}
assert(1, sumForm(5) );            //4////////////////////////////
/*
function sumCikl(num) {
  var rez=0;
  for (var i=1; i<=num; i++) {rez+=i}
  return rez ;
}
assert(1, sumCikl(5) );            /////////

function sumRec(num) {
  if(num-1){return num+sumRec(num-1)}
  return 1;
}
assert(1, sumRec(5) );            //////////
*/






//  Именованные функциональные выражения  «Named Function Expression» (сокращённо NFE)
var f = function sayHiHi(name) {
assert(1,sayHiHi ); // изнутри функции ‐ видно (выведет код функции) 
};                                   //5////////////////////////////
/*alert( sayHiHi ); // снаружи . не видно
*/
f()









// передача данных через объект
function showWarning(options) {    //  !!!  пример передача настроек в объекте
	var width = options.width || 200; // по умолчанию
	var height = options.height || 100;
	var title = options.title || "Предупреждение";
	return width; // my
	// ...
} 
//  alert (showWarning({width : 150 }))






//  ##пример   ##проверка  отличить отсутствие аргумента и аргумент "undefined"
/*function fff(x) {
   return !!arguments.length;
}
 alert (fff(undefined)); // 1
 alert (fff()); // 0
*/




//  ##arguments
/*
function sum() {
 var args = []; 
 for (var i = 0; i < arguments.length; i++) {args[i] = arguments[i];}
 var temp = args.reduce(function (sum, itm) { return itm+sum; }, 0);
 alert ( temp )
}
*/



/*function sum() {
  var rez = 0;
	for (var i=0; i<arguments.length; i++) {
	  rez += arguments[i];		
	}
  alert (rez);
}
sum()
sum(1)
sum(1, 2)
sum(1, 2, 3) 
sum(1, 2, 3, 4) 

*/











// Эта функция возвращает разные целые числа при каждом вызове.
// Для сохранения следующего возвращаемого значения она использует собственное свойство  !!!
uniqueInteger.counter = 0;
function uniqueInteger() {
	return uniqueInteger.counter++; // Увеличить и вернуть свойство counter
}
/*
alert (uniqueInteger())
alert (uniqueInteger())
alert (uniqueInteger())
alert (uniqueInteger())
*/

// + см factorialOSC














// ##замыкания  my
function makeCounter() {
	var currentCount = 1;
	return function() {
		return [currentCount++,  currentCount]
	};
}
var counter = makeCounter(); // [[Scope]] ‐> {currentCount: 1}
/*alert( counter() ); // 1, [[Scope]] ‐> {currentCount: 1}
alert( counter() ); // 2, [[Scope]] ‐> {currentCount: 2}
alert( counter() ); // 3, [[Scope]] ‐> {currentCount: 3}
*/
		
// (замыкаем не одну, а мн-во (здесь 2. count и reset) ф-ций-методов )
function counterM() {
	var n = 0;
	return {
		count: function() { return n++; },
		resetIt: function() { n = 0; }
	};
}
var c = counterM(), d = counterM(); // Создать два счетчика
/*alert(c.count()) // => 0
alert(d.count()) // => 0: они действуют независимо
    c.resetIt()  // методы reset() и count() совместно   используют одну переменную
alert(c.count()) // => 0: сброс счетчика c
alert(d.count()) // => 1: не оказывает влияния на счетчик d
*/



// ?? !!! замыкается объект с геттер-сеттер  
//локальную переменную не объявляет. Для сохранения инфо просто использует параметр n !!!
function counterN(n) { // Аргумент n функции - скрытая переменная 
	return { // Метод чтения свойства возвращает и увеличивает переменную счетчика. 
		get count() { return n++; }, // Метод записи в свойство не позволяет уменьшать значение n 
		set count(m) { 
			if (m >= n) n = m; 
			else throw Error("значение счетчика нельзя уменьшить "); 
		} 
	}; 
} 
var c = counterN(1000); 
/* alert (c.count) // => 1000
 alert (c.count) // => 1001
 c.count = 2000 
 alert (c.count) // => 2000
 c.count = 2000  // => Ошибка!
*/






// !!! проверка - число аргументов совпадает с ожидаемым?
// Эта функция использует arguments.callee, поэтому она
// не будет работать в строгом режиме.
function check(args) {
	var actual = args.length; // Фактическое число аргументов
	var expected = args.callee.length; // Ожидаемое число аргументов   ??? устаревш callee
	if (actual !== expected){ // Если не совпадают, генерируется исключение
		// alert  ("Ошибка- ожидается:" + expected + "; получено" + actual); 
		throw new Error("ожидается:" + expected + "; получено" + actual);
	}
}
function ftmp(x, y, z) {
	// Проверить число ожидаемых и фактически переданных аргументов.
	check(arguments);
	// Теперь выполнить оставшуюся часть функции как обычно
	return x + y + z;
}
/*
alert (ftmp(1, 2, 3));
alert (ftmp(1, 2));
*/








