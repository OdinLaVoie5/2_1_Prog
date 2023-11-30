//  функция, которой могут передаваться необязательные аргументы, имеющие значения по ##умолчанию:
function point(x, y) {
  if (!x) x = 320;   // x = x || 320; ...   н/р  title = title || "Предупреждение";
  if (!y) y = 240;
  return { x: x, y: y };   //  !!!    просто возврат объекта
}
// Эта функция игнорирует любые ложные аргументы, в том числе 0:
assert (1,point(0, 0).x +' '+ point(0, 0).y)  //1////////////////////////


// Более точный способ проверки факта отсутствия определения заключается в использовании оператора typeof:
function point1(x, y) {
  if (typeof x === "undefined") x = 320;
  if (typeof y === "undefined") y = 240;
  return { x: x, y: y };
}
// Эта версия функции point правильно отличает 0 от undefined
point1(); // { x: 320, y: 240 }
point1(0, 0); // { x: 0, y: 0 }
assert (1, point1().x +' '+ point1().y +' /// '+ point1(0, 0).x+' '+ point1(0, 0).y)   //2////////////////////////

//Еще один подход заключается в сравнении со значением undefined: if (x === undefined) { ... }
//====================================================================================







// можно создать объект String, который становится оболочкой для строкового значения:
var s = new String("hello");
// В некотором смысле, объект String ведет себя так же, как и заключенное в него строковое значение. Вы также можете извлекать его проиндексированные подстроки:
s[4]; // "o"

// Однако в отличие от примитивных строк, объект String является настоящим объектом:
typeof "hello"; // "string"
typeof s; // "object"

// Это весьма важное отличие, поскольку оно означает невозможность сравнения содержимого двух различных объектов String посредством встроенных операторов:
var s1 = new String("hello");
var s2 = new String("hello");
s1 === s2; // false

// Поскольку каждый объект String является самостоятельным объектом, он равен только самому себе. То же справедливо и для оператора нестрогого равенства:
s1 == s2; // false

assert (1, typeof s +' '+ ' /// '+ (s1 === s2) +' /// '+ (s1 == s2))   //3////////////////
//=========================================================================================





//    необычные ##конструкции
1 && assert (1, 'приём,приём')  //4/////////////
0 && assert (1, 'FFFFFF')  ///  в случае false первого, второй член после && не работает



  // (некий глобальный объект JSON проверка на существование)
if (this.JSON) {assert (1, 'ѾѾѾ')}  // можно без this (-глобальный объект)   //5/////////////



// ##charCodeAt()  код символа
document.write("&mdash;");    document.write("<br>");
assert (1, "—".charCodeAt(0) +' '+ "Ѿ".charCodeAt(0))     //6/////////////
//======================================================================================





// ##eval  
function test(x) {
eval("var y = x;"); // динамическое связывание
return y;
}
test("hello"); // "hello"


var y = "global";
function test1(x) {
if (x) {
eval("var y = 'local';"); // динамическое связывание
}
return y;
}
 //test1(true); "local"
 //test1(false); "global"


var y = "global";
function test2(src) {
eval(src); // может быть динамическое связывание
return y;
}
assert (1, test2("var y = 'local';") +' '+ test2("var z = 'local';"))     //7////////////////



//  Возможности прямого вызова eval легко могут быть использованы с целью нанесения какого-нибудь вреда
var x = "global";
function test3() {
var x = "local";
return eval("x"); // прямой вызов eval
}
 //test3();  "local"

//  нестандартная ##конструкция !!   Чтобы принудительно выполнить непрямой вызов eval, включите eval в последовательность вместе с ничего не значащим литералом. 
var x = "global";
function testA() {
var x = "local";
return (0,eval)("x"); // непрямой вызов eval
}
testA(); // "local"
assert (1, testA())                   //8////////////////////////////

//  отдавайте предпочтение непрямому вызову eval, избегая прямого вызова этой функции  !!
var x = "global";
function test4() {
var x = "local";
var f = eval;
return f("x"); // непрямой вызов eval код теряет доступ к любой локальной области видимости
}
 //test4();  "global"



// трюк   для выполнения кода в глобальной области
var a = 1;
(function() {
var a = 2;
// window.eval(' alert(a) '); // 1, выполнено глобально везде, кроме IE8‐
})();



// пример   Eval-калькулятор
/*var qqq =prompt("Введите выражение?", '2*3+2');
alert (eval (qqq));
*/




//=============================================================================

//   ##методы
var obj = {
hello: function() {
return "hello, " + this.username;
},
username: "Hans Gruber"
};
 //obj.hello(); "hello, Hans Gruber"

var obj2 = {
hello: obj.hello,   // (( метод ссылается на метод др объекта (obj), но this остаётся непосредственно obj2))
username: "Boo Radley"
};
 //obj2.hello(); "hello, Boo Radley",    а не "hello, Hans Gruber"
assert (1, obj2.hello())                          //9///////////////////////////





/*
var calculator = { // Литерал объекта 
	operand1: 1,
	operand2: 2,
	add: function() {
		// Обратите внимание, что для ссылки на этот объект используется
		// ключевое слово this.
		this.result = this.operand1 + this.operand2;// св-во определилось в методе !!
	}
};
// calculator.add(); // Вызвать метод, чтобы вычислить 1+1.
// calculator["add"](); 
var tmpAdd = "add"
calculator[tmpAdd](); // 
// alert (calculator.result)  // => 3    точечный способ
alert (calculator["result"]) // => 3
*/




// Поскольку методы являются не чем иным, как функциями, вызванными для конкретного объекта, ничто не мешает ссылаться на this и обычной функции:
/*
function hello() {
return "hello, " + this.username;
}

// Это может пригодиться для предопределения функции для ее совместного использования !! несколькими объектами:
var obj1 = {
hello: hello,
username: "Gordon Gekko"
};
obj1.hello(); // "hello, Gordon Gekko"
var obj2 = {
hello: hello,
username: "Biff Tannen"
};
obj2.hello(); // "hello, Biff Tannen"

// Однако функции, использующие this, в качестве функций практически бесполезны (в отличие от применения в качестве методов):
hello(); // "hello, undefined"
*/





/*Если во вложенной функции необходимо иметь доступ к значению this внешней функции, это значение следует сохранить в переменной, находящейся в области видимости внутренней функции. Для этой цели часто используется переменная с именем self. 
Например: 
*/
var o = { // Объект o. 
  m: function() { // Метод m объекта. 
    var self = this; // Сохранить значение this в переменной. 
	console.log(this === o); // Выведет "true": this - это объект o. 
	f(); // Вызвать вспомогательную ф-цию f(). 
	
	function f() { // Вложенная функция f 
	  console.log(this === o); // "false": this - глоб. об. или undefined 
	  console.log(self === o); // "true": self - знач. this внеш. ф-ции. 
	  } 
	} 
}; o.m(); // Вызвать метод m объекта o.





//===========================================================================
// Рассмотрим простое преобразование строкового массива. Используя цикл, можно было бы написать:
/*var names = ["Fred", "Wilma", "Pebbles"];
var upper = [];
for (var i = 0, n = names.length; i < n; i++) {
upper[i] = names[i].toUpperCase();
}
upper; // ["FRED", "WILMA", "PEBBLES"]
*/

// ##map !!!  ((паралельные массивы?))     ##массивы
// Однако существует весьма удобный метод map, ориентированный на работу с массивами (и появившийся в ES5). Он позволяет полностью исключить элементы цикла, реализовав поэлементное преобразование с помощью локальной функции:
var names = ["Fred", "Wilma", "Pebbles"];
var upper = names.map(function(name) {
return name.toUpperCase();
});
//upper;   ["FRED", "WILMA", "PEBBLES"]
assert (1, upper)                   //10/////////////////////////




//=============================
//my  ##символ по его коду
assert (1,String.fromCharCode(1150)+' '+String.fromCharCode(11111111111111111111*6))           //11////////////////////
// alert (3+ '\u0020'+ 3 +  '\u000A' +3+  '\u000D'  +3)


//=============================
// !!  Функции высшего порядка — это не что иное, как функции, получающие в качестве аргументов другие функции или возвращающие функции в качестве своих результатов.
//  Получение функции в качестве аргумента (которая часто называется функцией обратного вызова


// Как только вы научитесь пользоваться функциями высшего порядка, можно будет приступать к написанию собственных. Верным признаком такой возможности является наличие дублированного или похожего кода.



//*********************************************
// ВОТ 3 ф-ции которые ниже мы упростим
/*var aIndex = "a".charCodeAt(0); // 97   можно заменить "a" на др начальный символ "Ѿ"    или вместо  aIndex сразу числовой код н/р  1150    
var alphabet = "";
for (var i = 0; i < 26; i++) {
alphabet += String.fromCharCode(aIndex + i);
}
 //alphabet;  "abcdefghijklmnopqrstuvwxyz"

var digits = "";
for (var i = 0; i < 10; i++) {
digits += i;
}
//digits;  "0123456789"

var rand = "";
for (var i = 0; i < 8; i++) {
rand += String.fromCharCode(Math.floor(Math.random() * 26)
+ aIndex);
}
 //rand; "bdwvfrtp" (каждый раз будет другой результат)
*/


// A BOT ф-ция высшего порядка     их упрощающая
function buildString(n, callback) {     // (длина цикла, ф-ция обрат вызова)
  var result = "";
  for (var i = 0; i < n; i++)  result += callback(i);
  return result;
}

var aIndex = "a".charCodeAt(0);

var alphabet = buildString(26, function(i) {return String.fromCharCode(aIndex + i);});
var digits = buildString(10, function(i) { return i; });
var rand = buildString(8, function() {return String.fromCharCode(Math.floor(Math.random() * 26) + aIndex);});

assert (1, alphabet+' '+ digits +' '+rand)                   //12///////////////////////
//***********************************************







//  ?  некая ф-ция - создаёт объект с методом next  !!
function values() {
  var i = 0, n = arguments.length, a = arguments;
  return {
	hasNext: function() {
	return i < n;
  },
  next: function() {
	if (i >= n) {
	  throw new Error("Окончание итерации");
	}
	return a[i++];
	}
  };
}

var it = values(1, 4, 8, 4, 2, 1, 3, 5, 6);
assert (1, it.next()+' '+ it.next() +' '+it.next())         //13///////////////////






//=======================================================
//  создаётся некий буфер             ##forEach
var buffer = {
  entries:[],
  add: function(s) {
	this.entries.push(s);
  },
  concat1: function() {        // используется ключ слово concat. можно ли? 
	return this.entries.join("");
  }
};

var source = ["867", "-", "5309"];
// вариант  (у метода forEach есть аргум указыв контекст)
source.forEach(buffer.add, buffer);  // каждый из source в buffer (метод и контекст) !!
assert (1, buffer.entries.join(''))         //14///////////   в книге buffer.join(); правильно у меня?
/*
// вариант1 ( если бы у метода forEach не было бы аргум указыв контекст)     ??  не понял
source.forEach(function(s) {
buffer.add(s);
});
assert (1, buffer.entries.join(''))         //////  

// вариант2   Используя метод      ##bind, мы можем упростить наш пример:     ??  не понял
source.forEach(buffer.add.bind(buffer));
assert (1, buffer.entries.join(''))         //////   
// Следует иметь в виду, что buffer.add.bind(buffer) не модифицирует функцию buffer.add, а создает новую функцию.
*/





/* // нестандарт  цикл for each ??? 
var o = {one: 1, two: 2, three: 3}
// for(var p in o) console.log(p); // for/in: выведет 'one', 'two', 'three'
for each (var v in o) alert (v); // for/each: выведет 1, 2, 3
*/





//=====================================================
// см OSC benchmarkOSC          
assert (1, benchmarkOSC(5, factOSC, 100000, 0))     //15/////////////   factOSC см OSC.  
assert (1, benchmarkOSC(5, buildString, 26, function(i) {return String.fromCharCode(aIndex + i);}, 0))         //16////////////////     (здесь один из парам ф-ция)     см    benchmarkOSC в Math.html





// (метод toString для функций.   в принципе возможно применение  (вместе с eval) для динамического кода, но не рекомендуется)
var ser =(function(x) {
var x=4;
return x + 1;
}).toString(); // "function (x) {return x + 1;}"


assert (1, ser)                           //17////////////////    
//kkk  assert (1, eval('('+ser+')'+'('+')'))    ///// my строку в немедл вызыв ф-цию 




  
//****************************************
//  устарело  ##caller       ссылается на функцию, инициировавшую вызов с заданным объектом arguments. 
function revealCaller() {
  return revealCaller.caller;
}
function start() {
  return revealCaller();
}
assert (start() === start, 11111)              //18////////////////    


// --- трассировка стека         Для простых стеков вызов getCallStack работает неплохо
// Но нарушить работу getCallStack довольно просто: если функция появляется в стеке вызовов более одного раза,логика инспектирования стека застревает в цикле!
function getCallStack() {
  var stack = [];
  for (var f = getCallStack.caller; f; f = f.caller)
	{
	stack.push(f);
	}
  return stack;
}
function f1() {return getCallStack();}
function f2() {return f1();}
function f3() {return f2();}

var trace = f3();
trace; // [f1, f2, f3]

assert (1, trace)              //19////////////////    
//****************************************









//  конструктор, прототип,     экземпляр,        ##getPrototypeOf
function User(name, passwordHash) {
this.name = name;
this.passwordHash = passwordHash;
}
User.prototype.toString = function() {
return "[User " + this.name + "]";
};
User.prototype.checkPassword = function(password) {
return hash(password) === this.passwordHash;
};
var u = new User("sfalken",
"0ef33ae791068ec64b502d6cb0191387");
//kkk   др вспом объект  var t = {}

Object.getPrototypeOf(u) === User.prototype; // true
assert (Object.getPrototypeOf(u) === User.prototype && u.__proto__ === User.prototype , 'true')              //20///////////////    






// ??   ##__proto__       не утверждено, нестандартное свойство
// ((конструкция -   строка in объект  - есть ли этот ключ в  объекте))
//  create  ???    метод?

var empty = Object.create(null); // объект,имеющий или не имеющий прототипа в завис от среды 
"__proto__" in empty; // false (в некоторых средах (Firefox))   или true
//kkk my var empty = Object.create(User);  
//kkk my  empty.__proto__ = User; (( прямое назначение прототипа,   не рекоменд)) !!  ??
//kkk my  assert ("call" in empty, 'true');  assert ("getPrototypeOf" in Object, 'true')

assert ("__proto__" in empty, 'true//  но false в некоторых средах (Firefox) если объект null')              //21////////////////    







// Если вызвавший  функцию забудет вставить ключевое слово new, получателем функции окажется глобальный объект  (будет ошибка ...)
//  (реализация для избежания этой ошибки:)
function User(name, passwordHash) {
  if (!(this instanceof User)) {
	return new User(name, passwordHash);
  }
  this.name = name;
  this.passwordHash = passwordHash;
}
// При этом результатом вызова функции User будет объект, наследующий свойства у User.prototype независимо от того, как была вызвана функция: как обычная функция или как функция-конструктор:
var rrr = User("baravelli", "d8b74df393528d5");     // вызов без new
var ttt = new User("baravelli", "d8b74df393528d5");
assert (rrr instanceof User && ttt instanceof User, 'true')             //22//////////////    










