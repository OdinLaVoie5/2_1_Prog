
//// ##замыкания
/*var outerValue = 'ninja';
var later;

function  outerFunction() {
  function innerFunction() {
	  var innerValue = 'samurai'
	  assert(outerValue,"I can see the ninja.");
	  assert(innerValue,"I can see the samurai.");
  }
  later = innerFunction;  //  ((замык н/р глобальную переменную  приравнять к локальной ф-ции))
}
outerFunction();
later();
*/


var outerValue = 'ninja';
var later;
function outerFunction() {
	var innerValue = 'samurai';
	function innerFunction(paramValue) {

		assert(outerValue,"Inner can see the ninja."); //2//////////////////
		assert(innerValue,"Inner can see the samurai."); //3///////////////
		assert(paramValue,"Inner can see the wakizashi.");//4////////////
		assert(tooLate,"Inner can see the ronin.");  //5/////////////////////
	} 
	later = innerFunction;
}	

assert(tooLate,"///  Outer can't see the ronin."); //1///////////////
var tooLate = 'ronin';
outerFunction();
later('wakizashi');



//  ?? Приближенное представление частных ?? переменных с помощью замыканий
function Ninja() {
	var feints = 0 ;
	this.getFeints = function(){   // здесь- метод доступа !!  или метод получения или просто "получатель" . )
		return feints;
	};
	this.feint = function(){
		feints++;
	};
}
var ninja = new Ninja();
ninja.feint();

assert(ninja.getFeints() == 1, "/// вижу значение feints с помощью метода."); //6///////
assert(ninja.feints, "не вижу локальн переменную feints.");	 //7////////////////








// Привязка конкретного контекста к обработчику событий !!   ##события  ((вместо кнопки назначаем др контекст  (здесь будто кликаем объект button  а не <button> из DOM )))
//   ##addEventListener

function bind(context,name){
	return function(){
		return context[name].apply(context,arguments);
	}
}
var button = {
	clicked: false,
	click: function(){
		this.clicked = true;
		alert ("/// The button has been clicked"); 	 //( клик test//////////	
		console.log(this);
	}
};
var elem = document.getElementById("test");
elem.addEventListener("click",bind(button,"click"),false); // вариант  // !! в JS вставили метод для ф-ций-        ##bind  (прописаную выше явно ф-цию bind можно выкинуть) elem.addEventListener("click",button.click.bind(button,"click"),false);






// Применение замыканий в обратном вызове для Аjах-запроса,         ##jQuery
jQuery('#testButton').click(function(){   
  var elem$ = jQuery("#testSubject");
  elem$.html("Loading ...");
  jQuery.ajax({                            //   ??? обращ к ajax
	  url: "test.html",
	  success: function(html){
		  assert(elem$,  "We can see elem$, via the closure for this callback.");
		  elem$.html(html);
	  }
  });
});





//  ##немедленно вызываемая функция  ((аноним со скобками))
//k    (function(what){alert(what);})('Hi there!');






//  ##jQuery  ##библио   Соблюдение имени в охватываемой области действия
// немедленно вызываемая функция (для избегания конфликта имён )
$ = function(){ alert('not jQuery!'); }; 
(function($){
$('img').on('click',function(event){ 
$(event.target).addClass('clickedOn');
})
}) (jQuery); 





//  пример  Сохранение удобочитаемости кода с помощью коротких имен
//  (вместо создания новой короткой переменной, здесь - немедленно вызываемая функция с коротким параметром.  не засоряем код лишними переменными!)
/*
(function(v) {
  Object.extend(v, { 
	href: v._getAttr, 
	src: v._getAttr, 
	type: v._getAttr, 
	action: v._getAttrNode, 
	disabled: v._flag, 
	checked: v._flag, 
	readonly: v._flag, 
	multiple: v._flag, 
	onload: v._getEv, 
	onunload: v._getEv, 
	onclick: v._getEv,
  });
})(Element.attributeTranslations.read.values);
*/






//  пример  здесь итерратор работает НЕПРАВИЛЬНО ((события в цикле. пока дело дойдёт до событий - i уже = конечному значению))       правильно см ниже
/*
var divs = document.getElementsByTagName("button");
for (var i = 0; i < divs.length; i++) {
	divs[i].addEventListener("click", function() {
	alert("button #" + i + " was clicked."); }, false);
}
*/

//  правильный вариант
var div = document.getElementsByTagName("button");
for (var i = 0; i < div.length; i++) (function(n){ div[n].addEventListener("click", function(){ alert("button #" + n + " was clicked.");
}, false);
})(i);




//======================================================================






//  ##замыкания
function sum(a) {
  return function(b) {
	return a + b; // возьмет a из внешнего LexicalEnvironment
  };
}
assert(1, sum(1)(2) + ' Сумма через замыкание');            //8//////////////



//  !!!  ##пример  ((sum срабатывает и передаёт управление f  которое возвращает себя для следущих скобок.))

function sum(a) {
  var currentSum = a;
  function f(b) {
	currentSum += b;
	return f;
  }
  f.toString = function() {     // не понял как возвращается результат currentSum ??
	return currentSum;
  };
  return f;
}
/*alert( sum(1)(2) ); // 3
alert( sum(5)(-1)(2) ); // 6
alert( sum(6)(-1)(-2)(-3) ); // 0
alert( sum(0)(1)(2)(3)(4)(5) ); // 15
*/







//  (( замыкания позволяют обойтись без глобаль переменных ))
function makeBuffer() {
  var text = '';
  var buffer = function buffer(piece) {
	if(arguments.length==0)return text;
	text += piece;
  }
  buffer.clear = function () {     // !! метод (очистка буфа) к ф-ции как к объекту 
	text = '';
	return;
  }
  return buffer;
}

var buffer = makeBuffer();
// добавить значения к буферу
buffer('№11111');
buffer(' aaa');
buffer(0);
// buffer.clear();                     // (очистка буфа)
// получить текущее значение
assert(1, buffer());                  //9/////////////////

var buffer1 = makeBuffer();  //  my   второй (независимый от первого) буфер
buffer1('22222');
assert(1, buffer1());                  //10/////////////////






//  ##сортировка объекта по различным св-вам     ((обобщенная ф-ция))
var users = [{
  name: "Вася",
  surname: 'Иванов',
  age: 20
  }, {
  name: "Петя",
  surname: 'Чапаев',
  age: 25
  }, {
  name: "Маша",
  surname: 'Медведева',
  age: 18
}];

function byField(field) {        
  var rezFunc = function (a, b) {
	return a[field] > b[field] ? 1 : -1;   // обращаться через [ ] (как к ассоц массиву), а не точкой   т.к.  field неизвестно заранее (переменная)
  };
  return rezFunc;
}

/*users.sort(byField('name'));
users.forEach(function(user) {
  alert( user.name );
}); // Вася, Маша, Петя

users.sort(byField('age'));
users.forEach(function(user) {
  alert( user.name );
}); // Маша, Вася, Петя
*/



a = ['ant', 'Bug', 'cat', 'Dog']
a.sort(); // сортировка с учетом регистра символов: ['Bug','Dog','ant','cat']
// alert (a)
a.sort(function(s,t) { // !!!  ##cортировка без учета регистра символов
	var a = s.toLowerCase();
	var b = t.toLowerCase();
	if (a < b) return -1;
	if (a > b) return 1;
	return 0;
}); // => ['ant','Bug','cat','Dog']
// alert (a)





//================================================================================
/*   ##пример
filter(arr, func), которая получает массив arr и возвращает новый, в
который входят только те элементы arr, для которых func возвращает true.
2. Создайте набор «готовых фильтров»: inBetween(a,b) — «между a,b», inArray([...]) — «в массиве
[...]». Использование должно быть таким:

filter(arr, inBetween(3,6)) — выберет только числа от 3 до 6,
filter(arr, inArray([1,2,3])) — выберет только элементы, совпадающие с одним из
значений массива.

 .. ваш код для filter, inBetween, inArray 
var arr = [1, 2, 3, 4, 5, 6, 7];
alert(filter(arr, function(a) {
return a % 2 == 0
})); // 2,4,6
alert( filter(arr, inBetween(3, 6)) ); // 3,4,5,6
alert( filter(arr, inArray([1, 2, 10])) ); // 1,2

*/


function filter(arr, func) {
  var rezArr = [];
  for (var i=0; i<arr.length; i++) {
	  if (func(arr[i])) rezArr.push(arr[i]);
  }
  return rezArr ;
}

function inBetween(a, b) {  // !!! my  ф-ция в ф-ции. (внутренние значения тоже переменные ?   
  return function (x) {
	if(x>a && x<b) return true;
  }
}

function inArray(arrFil) {
  return function (x) {
	if(~arrFil.indexOf(x)) return true;
  }
}

/*alert ( filter ([1,2,3,4,5],function(x){return !(x%2);}) )
alert ( filter ([1,2,3,4,5],inBetween(1.2, 4.2)) )
alert ( filter ([1,2,3,4,5],inArray([5, 8, 1, 9, 3, 1])) )
*/
//================================================================================









// Следующий код создает массив функций-стрелков shooters. 
// каждый стрелок должен выводить свой номер

//  вариант 
/*function makeArmy() {
  var shooters = [];
  for (var i = 0; i < 10; i++) {
	var shooter = function me() {   // Named Function Expression  ##NFE
	  alert( me.i );
	};
	shooter.i = i;                  //  !!!  назначаем св-ва ф-ций.  ##приём  
	shooters.push(shooter);
  }
  return shooters;
}
var army = makeArmy();
army[6](); // 6
army[1](); // 1
*/

//  вариант1
/*function makeArmy() {
  var shooters = [];
  for (var i = 0; i < 10; i++) {
	var shooter = (function(x) { // немедленно вызываемая функция-выражения.  ##IIFE ?
	  return function() {        //    ##приём 
		alert( x );
	  };
	})(i);
	shooters.push(shooter);
  }
  return shooters;
}
var army = makeArmy();
army[0](); // 0
army[1](); // 1
*/

//  вариант2
function makeArmy() {
  var shooters = [];
  for (var i = 0; i < 10; i++)(function(i) { // просто обертываем итерацию в функцию ##IIFE ?
	var shooter = function() {
	alert( i );
  };
  shooters.push(shooter);
  })(i);
  return shooters;
}
var army = makeArmy();
/*
army[0](); // 0
army[1](); // 1
*/




// пример  отладка консоль   ##debugger         
//  Управление памятью   !!  автоматический Сборщик мусора (англ. Garbage collection, GC)
//  удалённая переменная станет недоступна и при отладке!
var value = "Сюрприз";
function f() {
  var value = Math.random();
  function g() {
	debugger; // выполните в консоли alert( value ); Нет такой переменной!
  }
  return g;
}
var g = f();
g();







//  Применение замыкания при обратном вызове в интервале работы таймера
function animateIt(elementId) {     // ##анимация  !!!  конструкция setInterval внутри ф-ции упрощает анимацию
  var elem = document.getElementById(elementId);
  var tick = 0;
  var timer = setInterval(function(){
	if (tick < 20) {
	  elem.style.left = tick*4 + "px";
	  elem.style.top = tick*3 + "px";
	  tick++;
	}
	else {
	  clearInterval(timer);
	 //kkk  assert(tick == 50,  "///  Tick accessed via a closure.");    ///////
	 //kkk  assert(elem, "Element also accessed via a closure.");       /////////
	 //kkk  assert(timer, "Timer reference also obtained via a closure."); ///////
	  elem.style.color =  "#009900"
	}
  }, 10);
}
animateIt("box");
//kkk animateIt("message");


