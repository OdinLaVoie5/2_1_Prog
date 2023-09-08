////////////// instanceof  hasOwnProperty  call   ....

//  ##hasOwnProperty
Object.prototype.ronin = "ronin"; // добавление св-ва из-вне возможно нежелательное (возможно из внешнего кода) см следущ
var object = { ninja: 'value' }; 
object.samurai = 'samurai';
assert(object.hasOwnProperty('ronin'),"ronin из-вне");     //1//////////////////
assert(object.hasOwnProperty('ninja'),"ninja создано в объекте"); //2/////////////
assert(object.hasOwnProperty('samurai'),"samurai тоже");   //3/////////////////

// !! способ   игнорирования свойств, введенных в прототип объекта
/*for (var p in someObject) {
  if (someObject.hasOwnProperty(p)) { // ... ... ...
  }
}
*/

delete Object.prototype.ronin; // mymy  стёр вверху объявленное св-во чтоб не мешало




////////////////////////////////////////////////////////////////////////////

//   ##delete
user = {};
user.name = 'Вася';   user.surname = 'Петров';  user.name = 'Сергей';
delete user.name;

//   ##цикл  объект
var menu = {
  width: 300,
  height: 200,
  title: "Menu"
};
for (var key in menu) {
  // этот код будет вызван для каждого свойства объекта
  // ..и выведет имя свойства и его значение   
/*  alert( "Ключ: " + key + " значение: " + menu[key] );
*/
}

var codes = {
"+7": "Россия",
"+38": "Украина",
"+1": "США"
};
for (var code in codes) {
  var value = codes[code];
  if(+code)code = +code; //если нужно именно число, преобразуем: "+7" -> 7 если можно
/*  alert( code + ": " + value ); // 7, 38, 1 во всех браузерах
*/
}

//   Object. ##keys     ##проверка    пустой объект
function isEmpty(obj) {     // концепт
  return !Object.keys(obj).length
}
/*function isEmpty(obj) {     // концепт1  
  for (var key in obj) {
	return false;  
  }
  return true;
}
*/
var schedule = {};
assert(isEmpty(schedule), 'пустой');       //4///////////////// true
schedule["8:30"] = "подъём";
assert(isEmpty(schedule), 'не пустой');    //5///////////////// false


"use strict";
function mannySum(obj) {//  < фыв,  >
  var rez=0;
  for (var key in obj) { // я
	rez += obj[key];  
  }
  return rez;        // ап
}
var salaries = {
"Вася": 100,
"Петя": 300,
"Даша": 250    
};                   

assert(1, mannySum(salaries));           //6/////////////////


//  изменение св-в объекта
function multiplyNumeric(obj) {
  for (var key in obj) {
	if(isNumericOSC(obj[key])){  // см OSC
	  obj[key] *= 2;
	}
  }
  return;
}
var menu = {
width: 200,
height: 300,
title: true
};
multiplyNumeric(menu);
assert(1,menu.width);   //7/////////////////





// my  ##this    ##"use strict"
var go=function() {"use strict";  alert(this) }; // в браузе в строгом режиме не выдаёт глобаль как this,   - undefined
//  (go)()






//  ##пример 
/*var calculator = {
  read: function () {
	this.on = +prompt('Первое', 0);
	this.two = +prompt('Второе', 0);
  },
  sum: function () {
	return this.on + this.two;
  },
  mul: function () {
	return this.on * this.two;
  }
}
calculator.read();
alert( calculator.sum() );
alert( calculator.mul() );
*/









//  !!!  Цепочка вызовов
var ladder = {
  step: 0,
  up: function() {
	this.step++;
	return this; //  добавление return this в конце каждого метода  ##приём
  },
  down: function() {
	this.step--;
	return this;
  },
  showStep: function() {
	alert( this.step );
	return this;
  }
}
//  ladder.up().up().down().up().down().showStep(); // 1






// ##конструктор    вариант 
/*function Calculator () {
  this.read = function () {
	this.on = +prompt('Первое', 0);
	this.two = +prompt('Второе', 0);
  };
  this.sum = function () {
	return this.on + this.two;
  };
  this.mul = function () {
	return this.on * this.two;
  }
}
var calculator = new Calculator();
calculator.read();
alert( "Сумма=" + calculator.sum() );
alert( "Произведение=" + calculator.mul() );
*/


// ##конструктор  вариант1    
/*function Calculator () {
  var on, two;
  this.read = function () {
	on = +prompt('Первое', 0);
	two = +prompt('Второе', 0);
  },
  this.sum = function () {
	return on + two;
  },
  this.mul = function () {
	return on * two;
  }
}
var calculator = new Calculator();
calculator.read();
alert( "Сумма=" + calculator.sum() );
alert( "Произведение=" + calculator.mul() );
*/







function Accumulator(startingValue) {
  this.value = startingValue; 
  this.read = function () {
	this.value += +prompt('a?', 0);
  };
}


/*var accumulator = { // my  такой объект создаётся new Accumulator(1) (здесь создан вручную)
  value: 1,
  read: function () {
	this.value +=  +prompt('a?', 0);
  }
}
*/
var accumulator = new Accumulator(1); // начальное значение 1
/*accumulator.read(); // прибавит ввод prompt к текущему значению
accumulator.read(); // прибавит ввод prompt к текущему значению
alert( accumulator.value ); // выведет текущее значение
*/







// вариант  ##пример    my объект   калькулятор
function Calculator () {
  this.operArr = ['+', '-'];     // массив знаков операций
  this.funcArr = [function(a,b){return a+b}, function(a,b){return a-b}];   // массив ф-ций
  
  this.calculate = function (str) {   // основной метод
	if(typeof str === 'string') {      ////// проверка ввода - строка 
	  // анализ введённой строки
	  var tempArr = str.split(' '); 
	  for (var i=0; i<tempArr.length; i++){  ////// удаление лишних пробелов  
	  //  ?? проверку отсутствия пробелов   сложно.
		if(tempArr[i]==='') tempArr.splice(i--, 1);  
	  }
	  var a = +tempArr[0], b = +tempArr[2],  oper = tempArr[1];
	  var ind = this.operArr.indexOf(oper);     // определение ф-ции в зависимости от oper
	  if(isNaN(a) || isNaN(b))return ('Введите выражение в виде "a + b"' + '\n' + '"a" и "b" числа');                        ////// проверка a  b  числа
	  if(ind === -1) return ('Операция "'+ oper +'" не предусмотрена' + '\n' + 'Реализованы следующие операции: ' + this.operArr.join(' ') )  ////// проверка существования операции 
	  return this.funcArr[ind](a, b);
	}else return 'Введите выражение в виде "a + b"'; 
  }

  this.addMethod = function (operAdd, funcAdd) {  // добавление операций
	                    ////// проверка аргументов на соответствие типу	
	if((typeof operAdd === 'string') && (typeof funcAdd === 'function')){ 
	  this.operArr.push(operAdd);
	  this.funcArr.push(funcAdd)
	}else alert ('Проверте правильность написания')
  }
}

var calc = new Calculator;
// alert (calc.calculate('13  + 4'))

var powerCalc = new Calculator;
powerCalc.addMethod("*", function(a, b) {
  return a * b;
});
powerCalc.addMethod("/", function(a, b) {
  return a / b;
});
powerCalc.addMethod("**", function(a, b) {
  return Math.pow(a, b);
});
assert(1, powerCalc.calculate("2   **  3") + ' --- это было не? трудно'); //8///////////////

// alert (Object.getOwnPropertyNames(calc))

// вариант1
/*
function Calculator() {
var methods = {    // !!  в отличии от моего новые операции в объект
"‐": function(a, b) {
return a - b;
},
"+": function(a, b) {
return a + b;
}
};
this.calculate = function(str) {
var split = str.split(' '),
a = +split[0],
op = split[1],
b = +split[2]
if (!methods[op] || isNaN(a) || isNaN(b)) {
return NaN;
}
return methods[op](+a, +b);
}
this.addMethod = function(name, func) {
methods[name] = func;
};
}
var calc = new Calculator;
calc.addMethod("*", function(a, b) {
return a * b;
});
calc.addMethod("/", function(a, b) {
return a / b;
});
calc.addMethod("**", function(a, b) {
return Math.pow(a, b);
});
var result = calc.calculate("2 ** 3");
alert( result ); // 8
*/







//  ##defineProperty  
// (настраиваем новое зависимое св-во fullName)
//(+см пример ниже, там наоборот из fullName отдельные имена )
var user = {
  firstName: "Вася",      
  surname: "Петров"
}
Object.defineProperty(user,"fullName",{ 
  get: function() {  // !! ((сюда)) (получим user.fullName: при измененмм firstName и surname)
	return this.firstName + ' ' + this.surname;
  },
  set: function(value) {   
	var split = value.split(' ');
	this.firstName = split[0];
	this.surname = split[1];// !! ((отсюда))(получим firstName и surname при измен fullName)
  }
});

user.fullName = "Саня Скакунов";  
user.firstName = "Боря"; 
assert(1,user.firstName +' '+ user.surname +' /// '+ user.fullName);   //9/////////////////
 // боря  Скакунов





//  ##defineProperty  
function User111(fullName) {
  this.fullName = fullName;
  Object.defineProperties(this, { 
          // (можно в конструкторе,  this, сразу вместе firstName и  lastName )
	firstName: {
	  get: function() {
		return this.fullName.split(' ')[0];
	  },
	  set: function(newFirstName) {
		this.fullName = newFirstName + ' ' + this.lastName;
	  }
	},
	lastName: {
	  get: function() {
		return this.fullName.split(' ')[1];
	  },
	  set: function(newLastName) {
		this.fullName = this.firstName + ' ' + newLastName;
	  }
	}
  });
}
var vasya = new User111("Василий Попкин");
// чтение firstName/lastName
/*alert( vasya.firstName ); // Василий
alert( vasya.lastName ); // Попкин
// запись в lastName
vasya.lastName = 'Сидоров';
alert( vasya.fullName ); // Василий Сидоро
*/




//  Object. ##keys(obj)       Object. ##getOwnPropertyNames(obj)
// Object.keys возвращает только enumerable-свойства. Object.getOwnPropertyNames(anyObject)  — возвращает все свойства.

var obj = {
a: 1,
b: 2,
internal: 3
};
Object.defineProperty(obj, "internal", {
enumerable: false
});
assert(1, Object.keys(obj) +' /// '+ Object.getOwnPropertyNames(obj));   //10/////////////////
 // a,b,     a, internal, b







//=====================================================================================
// Статические и фабричные методы     примеры
//  (( !!!  встроенные объекты  одновременно и конструкторы и поставщики статических и фабричных методов ))
/*Статические свойства и методы объекта удобно применять в следующих случаях:
Общие действия и подсчёты, имеющие отношения ко всем объектам данного типа. В примерах
выше это подсчёт количества.      
Методы, не привязанные к конкретному объекту, например сравнение.
Вспомогательные методы, которые полезны вне объекта, например для форматирования даты.
Фабричные методы.*/


function Article() { // конструктор
Article.count++;     // cтатическое св-во (для всех экземпляров)
//... Как правило, это чаще константы, такие как формат «по умолчанию»
} 

Article.count = 0;
// использование
new Article();
new Article();

Article.showCount = function() { // статический метод 
            // !!  н/р String.fromCharCode, Date.parse  ((обращение к конструктору, ))
  alert( this.count ); // (1)
}
//  Article.showCount(); // (2)






// ##пример      статические методы
function Journal(date) {
  this.date = date;
  this.formatDate = function(date) {
  return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
  };
  this.getTitle = function() {
	return "Выпуск от " + this.formatDate(this.date);
  };
}
Journal.compare = function(journalA, journalB) { // статический метод функция используется для поиска самого раннего журнала из массива
  return journalA.date - journalB.date;
};
// использование:
var journals = [
  new Journal(new Date(2012, 1, 1)),
  new Journal(new Date(2012, 0, 1)),
  new Journal(new Date(2011, 11, 1))
];
function findMin(journals) {
  var min = 0;
  for (var i = 0; i < journals.length; i++) {
	// используем статический метод
	if (Journal.compare(journals[min], journals[i]) > 0) min = i;
  }
  return journals[min];
}
assert(1, findMin(journals).getTitle());    //11/////////////////


// !!  Статический метод можно использ для функций, которые вообще не требуют наличия объекта.
//  (просто используем метод прописанный в констукторе)
Journal.formatDate = function(date) {
return date.getDate() + '.' + (date.getMonth()+1) + '.' + date.getFullYear();
}
//  alert( Journal.formatDate(new Date) )





//  Фабричные методы   !! н/р String.fromCharCode(code)
//  (( объект создаётся в конструкторе ))

// Допустим, нам нужно создавать объекты User: анонимные new User() и с данными new User({name:'Вася', age: 25}).

// вариант  !! Можно, конечно, создать полиморфную функцию-конструктор Use
/*function User222(userData) {
  if (userData) { // если указаны данные ‐‐ одна ветка if
	this.name = userData.name;
	this.age = userData.age;
  }else { // если не указаны ‐‐ другая
	this.name = 'Аноним';
}
this.sayHi = function() {
  alert(this.name)
};
// ...
}
// Использование
var guest = new User222();
guest.sayHi(); // Аноним
var knownUser = new User222({
  name: 'Вася',
  age: 25
});
knownUser.sayHi(); // Вася
*/



// вариант1    Подход с использованием фабричных методов другой
/*function User333() {
this.sayHi = function() {
alert(this.name)
};
}
User333.createAnonymous = function() {
var user = new User333;   //  !!   метод конструкта использует сам конструкт (создаёт объект)
user.name = 'Аноним';
return user;
}
User333.createFromData = function(userData) {
var user = new User333;    //   метод конструкта использует сам конструкт (создаёт объект)
user.name = userData.name;
user.age = userData.age;
return user;
}
// Использование
var guest = User333.createAnonymous();
guest.sayHi(); // Аноним
var knownUser = User333.createFromData({
name: 'Вася',
age: 25
});
knownUser.sayHi(); // Вася
*/

// !!!    Преимущества использования фабричных методов
/* Лучшая читаемость кода. Как конструктора — вместо одной большой функции
несколько маленьких, так и вызывающего кода — явно видно, что именно создаётся.
Лучший контроль ошибок, т.к. если в createFromData ничего не передали, то будет
ошибка, а полиморфный конструктор создал бы анонимного посетителя.
Удобная расширяемость. Например, нужно добавить создание администратора, без
аргументов. Фабричный метод сделать легко: User.createAdmin = function() { ... }.
А для полиморфного конструктора вызов без аргумента создаст анонима, так что нужно
добавить параметр — «тип посетителя» и усложнить этим код.

Поэтому полиморфные конструкторы лучше использовать там, где нужна именно
полиморфность, т.е. когда непонятно, какого типа аргумент передадут, и хочется в одном
конструкторе охватить все варианты.
А в остальных случаях отличная альтернатива — фабричные методы.
*/





function Article1() {
  this.created = new Date().toISOString();
  Article1.created = this.created;
// if(Article1.count === undefined) Article1.count = 0; my начальное значение  вариант
  Article1.count++;
  Article1.showStats = function () {
	var rez = 'Всего: ' + this.count + ', Последняя: ' + this.created;
	return  rez;
  }
}
Article1.count = 0; // начальное значение      вариант1
var art = new Article1();
new Article1();
assert(1, Article1.showStats()); // Всего: 2, Последняя: (дата)    //12///////////////
new Article1();
assert(1, Article1.showStats()); // Всего: 3, Последняя: (дата)    //13///////////////

//  alert (art.created)
//==============================================================================








//  ##call   (назначение др контекста (this) (текущего объекта))
var user = {
  firstName: "Василий",
  surname: "Петров",
  patronym: "Иванович"
};
function showFullName(firstPart, lastPart) {
  return ( this[firstPart] + " " + this[lastPart] );
}
// f.call(контекст, аргумент1, аргумент2, ...)
// alert (  showFullName.call(user, 'firstName', 'surname')  )// "Василий Петров"
// alert (  showFullName.call(user, 'firstName', 'patronym')  )// "Василий Иванович"




// !!!  вариант  ( пример прямого присвоения метода от объекта др типа )
function printArgs() {
  arguments.join = [].join;        // одолжили метод (1)  
  var argStr = arguments.join(':'); // (2)
  return( argStr ); // сработает и выведет 1:2:3
}
// alert (printArgs(1, 2, 3) ) ;



//  вариант1   но пример выше может привести к путанице
// безопаснее с    call
function printArgs() {
  var join = [].join; // скопируем ссылку на функцию в переменную
  // вызовем join с this=arguments,
  // этот вызов эквивалентен arguments.join(':') из примера выше
  var argStr = join.call(arguments, ':');
  return( argStr ); // сработает и выведет 1:2:3
}
// alert (printArgs(1, 2, 3) ) ;




// !!! внутри join реализован примерно так:
/*function join(separator) {
  if (!this.length) return '';
  var str = this[0];
  for (var i = 1; i < this.length; i++) {
	str += separator + this[i];
  }
  return str;
}
*/



// ещё пример call !!!  одним движение делаем из arguments полноценный массив (применяя slice)
/*Как и в случае с join, такой вызов технически возможен потому, что slice для работы требует
только нумерованные свойства и length. Всё это в arguments есть.
*/
function printArgs() {
// вызов arr.slice() скопирует все элементы из this в новый массив
  var args = [].slice.call(arguments);
  return( args.join(', ') ); // args . полноценный массив из аргументов
}
//  alert (printArgs('Привет', 'мой', 'мир')); // Привет, мой, мир



// !!!  ##call  методы массива call для строк.  
// (можно только методы которые не изменяют исходный массив, а создают новый    тк строки не меняются)
var s = "JavaScript"
s1 = Array.prototype.join.call(s, " ") // => "J a v a S c r i p t"
// alert (s1)

s2 = Array.prototype.filter.call(s, // Фильтровать символы строки
    function(x) {
        return x.match(/[^aeiou]/); // Совпадение только с согласными
    }).join("") // => "JvScrpt"
// alert (s2)










// пример  ##bind
"use strict";
function ask(question, answer, ok, fail) {
  var result = prompt(question, '');
  if (result.toLowerCase() == answer.toLowerCase()) ok();
  else fail();
}
var user444 = {
  login: 'Василий',
  password: '12345',
  loginOk: function() {
	alert( this.login + ' вошёл в сайт' );
  },
  loginFail: function() {
	alert( this.login + ': ошибка входа' );
  },
  checkPassword: function() {
/*	  ask("Ваш пароль?",this.password, this.loginOk.bind(this), this.loginFail.bind(this)); // вариант  с  bind !!!  (указываем теряющийся контекст (для методов)),   см в браузе */	
/*ask("Ваш пароль?", this.password, this.loginOk, this.loginFail);*/  // неправильно
	
	var self = this;   // вариант1    !!!  this в переменную
	ask("Ваш пароль?", this.password, function(){self.loginOk();}, function(){self.loginFail();}) // вариант1  через замыкания
  }
};
/*user444.checkPassword();
  var vasya = user444;
user = null;
vasya.checkPassword();
*/




// тоже что выше  с усложнением
"use strict";
function ask(question, answer, ok, fail) {
  var result = prompt(question, '');
  if (result.toLowerCase() == answer.toLowerCase()) ok();
  else fail();
}
var user = {
  login: 'Василий',
  password: '12345',
  // метод для вызова из ask
  loginDone: function(result) {
	alert( this.login + (result ? ' вошёл в сайт' : ' ошибка входа') );
  },
  checkPassword: function() {
	var self = this; 
	ask("Ваш пароль?", this.password,
	  function() {
		self.loginDone(true);
	  },
	  function() {
		self.loginDone(false);
	  }
	);
  }
};
/*var vasya = user;
user = null;
vasya.checkPassword();
*/









// см   OSC  Функции-обёртки, декораторы  



// варианты      пример - объект кофемашина
/*function CoffeeMachine(power) {
this.waterAmount = 0;
var WATER_HEAT_CAPACITY = 4200;
function getBoilTime() {
return this.waterAmount * WATER_HEAT_CAPACITY * 80 / power;
}
function onReady() {
alert( 'Кофе готово!' );
}
this.run = function() {
setTimeout(onReady, getBoilTime.call(this));
};
}
// создаю кофеварку, мощностью 100000W чтобы кипятила быстро
var coffeeMachine = new CoffeeMachine(100000);
coffeeMachine.waterAmount = 200;
coffeeMachine.run()
*/

/*function CoffeeMachine(power) {
this.waterAmount = 0;
var WATER_HEAT_CAPACITY = 4200;
var getBoilTime = function() {
return this.waterAmount * WATER_HEAT_CAPACITY * 80 / power;
}.bind(this);
function onReady() {
alert( 'Кофе готово!' );
}
this.run = function() {
setTimeout(onReady, getBoilTime());
};
}
var coffeeMachine = new CoffeeMachine(100000);
coffeeMachine.waterAmount = 200;
coffeeMachine.run();*/

/*function Machine() {
  this._enabled = false; // вместо var enabled
  this.enable = function() {
	this._enabled = true;
  };
  this.disable = function() {
	this._enabled = false;
  };
}
function CoffeeMachine(power, capacity) {
  Machine.call(this);
  var self = this;   //  my
  var waterAmount = 0;
  var WATER_HEAT_CAPACITY = 4200;
  var getTimeToBoil = function () {
	return waterAmount * WATER_HEAT_CAPACITY * 80 / power;
  }
  
  this.setWaterAmount = function(amount) {
	if (amount < 0) {
	  throw new Error("Значение должно быть положительным");
	}
	if (amount > capacity) {
	  throw new Error("Нельзя залить больше, чем " + capacity);
	}
	waterAmount = amount;
  };
  this.getWaterAmount = function() {
	  return waterAmount;
  }
  
  this.setOnReady = function (newOnReady) {
	onReady = newOnReady;
  }
  var onReady = function () {
	alert( 'Кофе готов!' );
  }
  var timerID, process = false; //////////////////
  this.run = function() {
	if(!this._enabled){alert ('Включите в сеть'); return}
	process = true;
	setTimeout(function() { // !!! приём не метод, а метод в обёртке (получаем не строе значение, а новое (обновлённое))
	  process = false;
	  if(self._enabled){onReady()};
	}, getTimeToBoil.call(this));
  };
  this.getPower = function() {
   return power;
  }; 
  
  this.addWater = function(amount) {
	this.setWaterAmount(waterAmount + amount);
  };
  this.isRunning = function(){
	  return process;
  }
}
*/
/*var coffeeMachine = new CoffeeMachine(10000, 1000);
coffeeMachine.setWaterAmount(100);
coffeeMachine.enable();
coffeeMachine.run(); // ошибка, кофеварка выключена!
// coffeeMachine.disable();
*/


function Machine(power) {
this._power = power;
this._enabled = false;
var self = this;
this.enable = function() {
self._enabled = true;
};
this.disable = function() {
self._enabled = false;
};
}

function Mach() {   // my  
this.wer = 'wer';
}

function Fridge(power) {
  Machine.apply(this, arguments);
  // my  включил ещё одного предка   Mach.apply(this, arguments);
  var food = [];
  var limit = power/100;

  this.addFood = function () {
	if(!this._enabled){throw new Error("Выключен")}
	if (food.length + arguments.length >= this._power / 100) {
	  throw new Error("Нельзя добавить, не хватает мощности");
	}
	for (var i = 0; i < arguments.length; i++)  {
	  food.push(arguments[i]) 
	}
  };
  this.getFood = function () {
	return food.slice();
  };
  this.filterFood = function (func) {
	return food.filter(func);
  };
  this.removeFood = function(item) {
	var idx = food.indexOf(item);
	if (idx != -1) food.splice(idx, 1);
  };
  var parentDisable = this.disable;
  this.disable = function() {
	if (food.length) {
	  throw new Error("Нельзя выключить: внутри еда");
	}
	parentDisable();
  };
}
Fridge.prototype.ooo = function () {
  var rez ;
  return rez ;
}
 
var fridge = new Fridge(500);
fridge.enable();
fridge.addFood("кус‐кус");
//  fridge.disable(); // ошибка, в холодильнике есть еда







//  отделить св-ва определяемые в самом объекте   от прототипных.
/*var ani = {
  life: true
};
var animal = {
  eats: true,
  __proto__: ani
};
var rabbit = {
  jumps: true,
  __proto__: animal
};
for (var key in rabbit) {
  if (!rabbit.hasOwnProperty(key)) continue; // пропустить "не свои" свойства
  alert( key + " = " + rabbit[key] ); // выводит только "jumps"
}
*/
/*alert (Object.getPrototypeOf(rabbit)['eats'])// 
alert (rabbit.__proto__['eats'])// 
*/

//  alert (fridge.constructor)





var head = {
glasses: 1
};
var table = {
pen: 3,
__proto__ : head  
};
var bed = {
sheet: 1,
pillow: 2,
__proto__ : table  
};
var pockets = {
money: 2000,
__proto__ : bed  
};

/*alert (pockets.glasses) 
alert (head.glasses)
alert (benchmarkMyMy (5000, 5000, '', [function () {head.glasses}, function () {table.glasses} , function () {pockets.glasses}]))
*/

// alert (tUser.prototype)//  __proto__
 //factOSC.prototype = { jumps: true }
// alert( factOSC.prototype.constructor == factOSC); // false  (потерялся prototype.constructor)





// Аргументы по умолчанию    Можно прототипно унаследовать от options и добавлять/менять опции в наследнике:
/*function Menu(optio) {
optio = Object.create(optio);  // !!  my клон-наследник (чтоб само optio не менялось)
optio.width = optio.width || 300;
alert( optio.width ); // возьмёт width из наследника
alert( optio.height ); // возьмёт height из исходного объекта
// ...
}
optio = {height: 200}
Menu(optio)
alert (optio.width)
*/



// св-ва  встроеных объектов
/*var arr = window;
//   alert( obj ); // "[object Object]" ?           new
//   alert( {}.__proto__.toString ); // function toString
// метод берётся из прототипа?
// alert( arr.toString == String.prototype.toString ); // true, да
// проверим, правда ли что __proto__ это Object.prototype?
// alert( arr.__proto__ == String.prototype ); // true
// А есть ли __proto__ у Object.prototype?
document.write(Object.getOwnPropertyNames(arr.__proto__));    document.write("<br>");
document.write(Object.getOwnPropertyNames(arr.__proto__).length);

*/



// ##prototype  и встроеные объекты
/*Function.prototype.defer = function (ms) {
  setTimeout(this, ms)
}

function f() {
alert( "привет" );
}
f.defer(2000); // выведет "привет" через 1 секунду
*/


/*Function.prototype.defer = function(ms) {
var f = this;
return function() {
var args = arguments,
context = this;
setTimeout(function() {
f.apply(context, args);
}, ms);
}
}
// проверка
function f(a, b) {
alert( a + b );
}
f.defer(1000)(1, 2); // выведет 3 через 1 секунду.

*/






/*function CoffeeMachine(power) {
  this._power = power;
  this._waterAmount = 0;
}

CoffeeMachine.prototype.WATER_HEAT_CAPACITY = 4200;
CoffeeMachine.prototype._getTimeToBoil = function() {
return this._waterAmount * this.WATER_HEAT_CAPACITY * 80 / this._power;
};
CoffeeMachine.prototype.run = function() {
  setTimeout(function() {
	alert( 'Кофе готов!' );
	},   this._getTimeToBoil()); 
};
CoffeeMachine.prototype.setWaterAmount = function(amount) {
  this._waterAmount = amount;
};

var coffeeMachine = new CoffeeMachine(10000);
coffeeMachine.setWaterAmount(50);
coffeeMachine.run();*/


/*
function Hamster() {
this.food = []; // пустой "живот"
}
Hamster.prototype.found = function(something) {
this.food.push(something);
};
// Создаём двух хомяков и кормим первого
speedy = new Hamster();
lazy = new Hamster();
speedy.found("яблоко");
speedy.found("орех");
alert( speedy.food.length ); // 2
alert( lazy.food.length ); // 2 (!??)
*/


//  геттеры, сеттеры
function tUser() {
  var firstName;
  var surname;
  this.setFirstName = function (ame) {
	firstName = ame;
  }
  this.setSurname = function (name) {
	surname = name;
  }
  this.getFullName = function () {
	return firstName + ' ' + surname;
  }
}

var tuser = new tUser();
tuser.setFirstName("Петя");
tuser.setSurname("Иванов");
// alert( tuser.getFullName() ); // Петя Иванов





//  !!!    НАСЛЕДОВАНИЕ        +++

// 1. Конструктор Animal
function Animal(name) {
this.name = name;
this.speed = 0;
}
// 1.1. Методы ‐‐ в прототип
Animal.prototype.stop = function() {
this.speed = 0;
alert( this.name + ' стоит' );
}
Animal.prototype.run = function(speed) {
this.speed += speed;
alert( this.name + ' бежит, скорость ' + this.speed );
};
// 2. Конструктор Rabbit 
/*function Rabbit(name) {
this.name = name;
this.speed = 0;
}
*/ // вариант
function Rabbit(name) {
Animal.apply(this, arguments);   // ##приём
}
// 2.1. Наследование
Rabbit.prototype = Object.create(Animal.prototype); 
// вариант Rabbit.prototype.__proto__ = Animal.prototype
Rabbit.prototype.constructor = Rabbit;   // !! и указать constructor, а то потеряется
// 2.2. Методы Rabbit
Rabbit.prototype.jump = function() {
this.speed++;
alert( this.name + ' прыгает, скорость ' + this.speed );
}
Rabbit.prototype.run = function() {
// вызвать метод родителя, передав ему текущие аргументы
Animal.prototype.run.apply(this, arguments); // приём
this.jump();
}

var rabbit = new Rabbit('Roger');
//    rabbit.run(5)


























////////////////////////////////////////////////////////////////////////////

//   ... ##instanceof ...      объект создан конструктором - true
function meditate() {
document.write("Everything is an object...");
}
//kkk alert(meditate instanceof Object);
meditate();



// ф-ция возвращает массив
words = fixNames("the", "DALLAS", "CowBoys")
for (j = 0 ; j < words.length ; ++j)
document.write(words[j] + " ")

function fixNames()
{
var s = new Array()
for (j = 0 ; j < fixNames.arguments.length ; ++j)
s[j] = fixNames.arguments[j].charAt(0).toUpperCase() +
fixNames.arguments[j].substr(1).toLowerCase()
return s
}


document.write("<br><hr>")



///    ##конструктор
function User(forename, username, password)
{
this.forename = forename
this.username = username
this.password = password
this.showUser = function()
{
document.write("Имя: " + this.forename + "<br>")
document.write("Пользовательское имя: " + this.username + "<br>")
document.write("Пароль: " + this.password + "<br>")
}
}
// ( создание экземпляра класса  т.е.  объекта ) 
details = new User("Wolfgang", "w.a.mozart", "composer")


//  !!!  у всех функций имеется свойство по имени PROTOTYPE
function User(forename, username, password)
{
this.forename = forename
this.username = username
this.password = password
User.prototype.showUser = function()
{
document.write("Имя: " + this.forename + "<br>")
document.write("Пользовательское имя: " + this.username + "<br>")
document.write("Пароль: " + this.password + "<br>")
}
}

User.prototype.greeting = "Привет"
document.write(details.greeting)
document.write(User.prototype.greeting)  //  ?? ((можно пользоваться методом из конструктора (прототипа)))
document.write("<br>")


// переопределение prototype (( т.е. методов в конструкторе))
/*
var otherProt = confirm('переопределить метод?')   // my
if(otherProt){
	User.prototype.showUser = function()
	{
	document.write("Имя " + this.forename +
	" Пользователь " + this.username +
	" Пароль " + this.password)
	}
}
*/
details.showUser()
document.write("<br><hr>")



///      Расширение объектов JavaScript
var myStroka = "Привет Привет Привет Привет Привет Привет Привет Привет Привет Привет Привет Привет "

String.prototype.nbsp = function()
{
return this.replace(/и/g, 'ю')   // вариант 2 my !! ((здесь свои метасимволы  g- глобальный)) поиск и замена
// вариант 1   return this.replace(/ /g, '&nbsp;')
}
document.write(myStroka.nbsp())







//// дубль пример     расширяя встроенный объект.     палиндром (1 слово)
String.prototype.palindrome = function() {
var len = this.length-1;
for (var i = 0; i <= len; i++) {
if (this.charAt(i) !== this.charAt(len-i)) {
return false;
}
if (i === (len-i)) {
return true;
}
}
return true;
};
//   Продвинутое решение  String.prototype.palindrome = function() { var r = this.split("").reverse().join("");    return (r === this.valueOf());   }
//   MY  String.prototype.palindrome = function() { var r = this.join(" ").split("").reverse().join("");    return (r === this.valueOf());   }


// тест 
var phrases = ["eve", "kayak", "mom", "wow", "Not a palindrome"];
for (var i = 0; i < phrases.length; i++) {
var phrase = phrases[i];
if (phrase.palindrome()) {
document.write("'" + phrase + "' is a palindrome");
} else {
document.write("'" + phrase + "' is NOT a palindrome");
}
}





////  !!  расширяя встроенный объект
String.prototype.cliche = function() {
var cliche = ["lock and load","touch base", "open the kimono"];
for (var i = 0; i < cliche.length; i++) {
var index = this.indexOf(cliche[i]);
if (index >= 0) 
{
return true;
}
}
return false;
};

var sentences = ["I'll send my car around to pick you up.",
"Let's touch base in the morning and see where we are",
"We don't want to open the kimono, we just want to inform them."];
for (var i = 0; i < sentences.length; i++) {
var phrase = sentences[i];
if (phrase.cliche()) {
document.write("CLICHE ALERT: " + phrase);
}
}
 



////  прототип прототип    ##call метод ф-ции, 
function Dog(name, breed, weight) {           // конструктор
this.name = name;
this.breed = breed;
this.weight = weight;
}
Dog.prototype.species = "Canine";    // ((заполнение прототипа))
Dog.prototype.bark = function() {
if (this.weight > 25) {
document.write(this.name + " says Woof!");
} else {
document.write(this.name + " says Yip!");
}
};
Dog.prototype.run = function() {
document.write("Run!");
};
Dog.prototype.wag = function() {
document.write("Wag!");
};
var fido = new Dog("Fido", "Mixed", 38);     // определение экземпляров
var fluffy = new Dog("Fluffy", "Poodle", 30);
var spot = new Dog("Spot", "Chihuahua", 10);
var barnaby = new Dog("Barnaby", "Basset Hound", 55);
var spot = new Dog("Spot", "Chihuahua", 10);

spot.bark = function() {                   ///переопределение прототипа
document.write(this.name + " says WOOF!");
};

Dog.prototype.sitting = false;  ///((продолжение заполнение прототипа))
Dog.prototype.sit = function() {
if (this.sitting) {
document.write(this.name + " is already sitting");
} else {
this.sitting = true;
document.write(this.name + " is now sitting");
}
};
      // ((прототип прототипа))
function ShowDog(name, breed, weight, handler) {  // конструктор
Dog.call(this, name, breed, weight);    //  ((вызов ф-ции прототипа))
this.handler = handler;
}

ShowDog.prototype = new Dog();   // ((назначение прототипа прототипа))

ShowDog.prototype.constructor = ShowDog;  // ((заполнение прототипа))
ShowDog.prototype.league = "Webville";
ShowDog.prototype.stack = function() {
document.write("Stack");
};
ShowDog.prototype.bait = function() {
document.write("Bait");
};
ShowDog.prototype.gait = function(kind) {
document.write(kind + "ing");
};
ShowDog.prototype.groom = function() {
document.write("Groom");
};
  
     // определение экземпляров объекта
var fido = new Dog("Fido", "Mixed", 38);  
var fluffy = new Dog("Fluffy", "Poodle", 30);
var spot = new Dog("Spot", "Chihuahua", 10);
var scotty = new ShowDog("Scotty", "Scottish Terrier", 15, "Cookie");
var beatrice = new ShowDog("Beatrice", "Pomeranian", 5, "Hamilton");
document.write("<hr>");

	  // тест-данные 
fido.bark();
fido.run();
fido.wag();
document.write("<br>");
fluffy.bark();
fluffy.run();
fluffy.wag();
document.write("<br>");
spot.bark();
spot.run();
spot.wag();
document.write("<br>");

barnaby.sit()
barnaby.sit()
document.write("<br>");
spot.sit()
spot.sit()
document.write("<br>");

fido.bark();
fluffy.bark();
spot.bark();
scotty.bark();
document.write("<br>");
beatrice.bark();
scotty.gait("Walk");
beatrice.groom();








///////////// пример   ##hasOwnProperty (св-во своё или наследованое)
function Robot(name, year, owner) {
this.name = name;
this.year = year;
this.owner = owner;
}
Robot.prototype.maker = "ObjectsRUs";
Robot.prototype.errorMessage = "All systems go.";
Robot.prototype.reportError = function() {
document.write(this.name + " says " + this.errorMessage);
};
Robot.prototype.spillWater = function() {
this.errorMessage = "I appear to have a short circuit!";
};
var robby = new Robot("Robby", 1956, "Dr. Morbius");
var rosie = new Robot("Rosie", 1962, "George Jetson");
rosie.reportError();
robby.reportError();
robby.spillWater();
rosie.reportError();
robby.reportError(); 
document.write("<hr>");

document.write(robby.hasOwnProperty("errorMessage"));
document.write(" ");

document.write(rosie.hasOwnProperty("errorMessage"));
document.write("<hr>");


function SpaceRobot(name, year, owner, homePlanet) {
this.name = name;
this.year = year;
this.owner = owner;
this.homePlanet = homePlanet;
}
SpaceRobot.prototype = new Robot();
SpaceRobot.prototype.speak = function() {
//kkk alert(this.name + " says Sir, If I may venture an opinion...");
};
SpaceRobot.prototype.pilot = function() {
//kkk alert(this.name + " says Thrusters? Are they important?");
};
var c3po = new SpaceRobot("C3PO", 1977, "Luke Skywalker", "Tatooine");
c3po.speak();
c3po.pilot();
document.write(c3po.name + " was made by " + c3po.maker);
var simon = new SpaceRobot("Simon", 2009, "Carla Diana", "Earth");
// пример продолжения - simon.makeCoffee();simon.blinkLights();simon.speak();







///////////////////////// пример
function Game() {
this.level = 0;
}
Game.prototype.play = function() {
// Действия игрока
this.level++;
document.write("Welcome to level " + this.level);
this.unlock();
}
Game.prototype.unlock = function() {
if (this.level === 42) {
Robot.prototype.deployLaser = function () {
document.write(this.name + " is blasting you with laser beams.");
}
}
}
function Robot(name, year, owner) {
this.name = name;
this.year = year;
this.owner = owner;
}
var game = new Game();
var robby = new Robot("Robby", 1956, "Dr. Morbius");
var rosie = new Robot("Rosie", 1962, "George Jetson");
while (game.level < 42) {
game.play();
}
robby.deployLaser();
rosie.deployLaser();














////   ##прототип
function Dog(name, breed, weight) {
this.name = name;
this.breed = breed;
this.weight = weight;
}
Dog.prototype.species = "Canine";
Dog.prototype.bark = function() {
if (this.weight > 25) {
document.write(this.name + " says Woof!");
} else {
document.write(this.name + " says Yip!");
}
};
Dog.prototype.run = function() {
document.write("Run!");
};
Dog.prototype.wag = function() {
document.write("Wag!");
};
var fido = new Dog("Fido", "Mixed", 38);
var fluffy = new Dog("Fluffy", "Poodle", 30);
var spot = new Dog("Spot", "Chihuahua", 10);
var barnaby = new Dog("Barnaby", "Basset Hound", 55);

var spot = new Dog("Spot", "Chihuahua", 10);
spot.bark = function() {                   //переопределение прототипа
document.write(this.name + " says WOOF!");
};

Dog.prototype.sitting = false;
Dog.prototype.sit = function() {
if (this.sitting) {
document.write(this.name + " is already sitting");
} else {
this.sitting = true;
document.write(this.name + " is now sitting");
}
};

										  // тест-данные 

fido.bark();
fido.run();
fido.wag();
fluffy.bark();
fluffy.run();
fluffy.wag();
spot.bark();
spot.run();
spot.wag();

barnaby.sit()
barnaby.sit()
spot.sit()
spot.sit()














////  ##instanceof    определение конструктора по экземплярам
function dogCatcher(obj) {
	return (obj instanceof Dog)
}

function Cat(name, breed, weight) {
this.name = name;
this.breed = breed;
this.weight = weight;
}
var meow = new Cat("Meow", "Siamese", 10);
var whiskers = new Cat("Whiskers", "Mixed", 12);
var fido = {name: "Fido", breed: "Mixed", weight: 38};
function Dog(name, breed, weight) {
this.name = name;
this.breed = breed;
this.weight = weight;
this.bark = function() {
if (this.weight > 25) {
//kkk alert(this.name + " says Woof!");
} else {
//kkk alert(this.name + " says Yip!");
}
};
}
var fluffy = new Dog("Fluffy", "Poodle", 30);
var spot = new Dog("Spot", "Chihuahua", 10);
var dogs = [meow, whiskers, fido, fluffy, spot];
for (var i = 0; i < dogs.length; i++) {
if (dogCatcher(dogs[i])) {
document.write(dogs[i].name + " is a dog!");
}
}







//// my
/*window.onload = init;
*/
function Dog(name, breed, weight) {
this.name = name;
this.breed = breed;
this.weight = weight;
this.bark = function() {
if (this.weight > 25) {
//kkk alert(this.name + " says Woof!");
} else {
//kkk alert(this.name + " says Yip!");
}
};
}
var fido = new Dog("Fido", "Mixed", 38);
var fluffy = new Dog("Fluffy", "Poodle", 30);
var spot = new Dog("Spot", "Chihuahua", 10);
var dogs = [fido, fluffy, spot];









//// примеры          конструктор объектов
function Dog(name, breed, weight) {
this.name = name;
this.breed = breed;
this.weight = weight;
this.bark = function() {
if (this.weight > 25) {
//kkk alert(this.name + " says Woof!");
} else {
//kkk alert(this.name + " says Yip!");
}
};
}

var fido = new Dog("Fido", "Mixed", 38);
var fluffy = new Dog("Fluffy", "Poodle", 30);
var spot = new Dog("Spot", "Chihuahua", 10);
var dogs = [fido, fluffy, spot];

 
















//// !! сортировка по разным свойствам объектов
var products = [ { name: "Grapefruit", calories: 170, color: "red", sold: 8200 },
{ name: "Orange", calories: 160, color: "orange", sold: 12101 },
{ name: "Cola", calories: 210, color: "caramel", sold: 25412 },
{ name: "Diet Cola", calories: 0, color: "caramel", sold: 43922 },
{ name: "Lemon", calories: 200, color: "clear", sold: 14983 },
{ name: "Raspberry", calories: 180, color: "pink", sold: 9427 },
{ name: "Root Beer", calories: 200, color: "caramel", sold: 9909 },
{ name: "Water", calories: 0, color: "clear", sold: 62123 }
];

function compareName(colaA, colaB) {
if (colaA.name > colaB.name) {
return 1;
} else if (colaA.name === colaB.name) {
return 0;
} else {
return -1;
}
}
function compareCalories(colaA, colaB) {
if (colaA.calories > colaB.calories) {
return 1;
} else if (colaA.calories === colaB.calories) {
return 0;
} else {
return -1;
}
}
function compareColor(colaA, colaB) {
if (colaA.color > colaB.color) {
return 1;
} else if (colaA.color === colaB.color) {
return 0;
} else {
return -1;
}
}

function printProducts(products) {
for (var i = 0; i < products.length; i++) {
document.write("Name: " + products[i].name +
", Calories: " + products[i].calories +
", Color: " + products[i].color +
", Sold: " + products[i].sold + "<br>");
}
}

products.sort(compareName);
document.write("<br>"+"Products sorted by name:"+"<br>");
printProducts(products);
products.sort(compareCalories);
document.write("<br>"+"Products sorted by calories:"+"<br>");
printProducts(products);
products.sort(compareColor);
document.write("<br>"+"Products sorted by color:" +"<br>");
printProducts(products);
//_____________________________________________________________









//// сортировка
var products = [ { name: "Grapefruit", calories: 170, color: "red", sold: 8200 },
{ name: "Orange", calories: 160, color: "orange", sold: 12101 },
{ name: "Cola", calories: 210, color: "caramel", sold: 25412 },
{ name: "Diet Cola", calories: 0, color: "caramel", sold: 43922 },
{ name: "Lemon", calories: 200, color: "clear", sold: 14983 },
{ name: "Raspberry", calories: 180, color: "pink", sold: 9427 },
{ name: "Root Beer", calories: 200, color: "caramel", sold: 9909 },
{ name: "Water", calories: 0, color: "clear", sold: 62123 }
];

function compareSold(colaA, colaB) {
if (colaA.sold > colaB.sold) {
return 1;
} else if (colaA.sold === colaB.sold) {
return 0;
} else {
return -1;
}
}

function printProducts(products) {
for (var i = 0; i < products.length; i++) {
document.write("Name: " + products[i].name +
", Calories: " + products[i].calories +
", Color: " + products[i].color +
", Sold: " + products[i].sold + "<br>");
}
}

products.sort(compareSold);
printProducts(products);





//--------------------------------------------------------------------------------------------


//// модель обслуживания в самолёте 2
var passengers = [ { name: "Jane Doloop", paid: true, ticket: "coach" },
{ name: "Dr. Evel", paid: true, ticket: "firstclass" },
{ name: "Sue Property", paid: false, ticket: "firstclass" },
{ name: "John Funcall", paid: true, ticket: "coach" } ];

function serveCustomer(passenger) {
var getDrinkOrderFunction = createDrinkOrder(passenger);
getDrinkOrderFunction();
// Предложить обед
getDrinkOrderFunction();
getDrinkOrderFunction();
// Включить кино
getDrinkOrderFunction();
// Забрать мусор
}

function createDrinkOrder(passenger) {
var orderFunction;
if (passenger.ticket === "firstclass") {
orderFunction = function() {

//kkk alert("Would you like a cocktail or wine?");
};
} else {
orderFunction = function() {
//kkk alert("Your choice is cola or water.");
};
}
return orderFunction;
}

function servePassengers(passengers) {
for (var i = 0; i < passengers.length; i++) {
serveCustomer(passengers[i]);
}
}
servePassengers(passengers);





//// модель обслуживания в самолёте
var passengers = [ { name: "Jane Doloop", paid: true, ticket: "coach" },
{ name: "Dr. Evel", paid: true, ticket: "firstclass" },
{ name: "Sue Property", paid: false, ticket: "firstclass" },
{ name: "John Funcall", paid: true, ticket: "coach" } ];

function serveCustomer(passenger) {
createDrinkOrder(passenger);
}

function createDrinkOrder(passenger) {
if (passenger.ticket === "firstclass") {
//kkk alert("Would you like a cocktail or wine?");
} else {
//kkk alert("Your choice is cola or water.");
}
}

serveCustomer (passengers[1]);






////  ф-ция возвращает  ф-цию. 
function addN(n) {
var adder = function(x) {
return n + x;
};
return adder;
}
var add2 = addN(2);
document.write(add2(10));
document.write(add2(100));



///
function fun(echo) {
document.write(echo);
};

fun("hello");
function boo(aFunction) {
aFunction("boo");
}
boo(fun);
document.write(fun);
fun(boo);
var moreFun = fun;
moreFun("hello again");
function echoMaker() {
return fun;
}
var bigFun = echoMaker();
bigFun("Is there an echo?");







///  передача ф-ции ф-цией 2. (в javascript ф-ция как обычное значение)
var passengers = [ { name: "Jane Doloop", paid: true },
{ name: "Dr. Evel", paid: true },
{ name: "Sue Property", paid: false },
{ name: "John Funcall", paid: true } ];

function processPassengers(passengers, testFunction) {
for (var i = 0; i < passengers.length; i++) {
if (testFunction(passengers[i])) {
return false;
}
}
return true;
}

function checkNoFlyList(passenger) {
return (passenger.name === "Dr. Evel");
}
function checkNotPaid(passenger) {
return (!passenger.paid);
}

var allCanFly = processPassengers(passengers, checkNoFlyList);
if (!allCanFly) {
document.write("Самолет не может взлететь: есть пассажир в чёрном списке. <br>");
}

var allPaid = processPassengers(passengers, checkNotPaid);
if (!allPaid) {
document.write("Самолет не может взлететь: не все заплатили. <br>");
}

function printPassenger(passenger) {
var message = passenger.name;
if (passenger.paid === true) {
message = message + " has paid";
} else {
message = message + " has not paid";
}
document.write(message);
return false;
}
processPassengers(passengers, printPassenger);









///  передача ф-ции ф-цией (в javascript ф-ция как обычное значение)
function sayIt(translator) {
var phrase = translator("Hello");
//kkk alert(phrase);
}
function hawaiianTranslator(word) {
if (word === "Hello") return "111";
if (word === "Goodbye") return "222";
}
sayIt(hawaiianTranslator);







/// функциональные выражения
var winner = function() { //kkk alert("WINNER!") 
};
var loser = function() { //kkk alert("LOSER!") 
};
// Простой тест
winner();
// Присваивание ссылок переменным
var a = winner;
var b = loser;
var c = loser;
a();
b();
// Проверяем удачу в игре “наперстки”
c = a; 
a = b;
b = c;
c = a;
a = c;
a = b;
b = c;
a();






//_________________________________________________________________



// ##конструктор
function Duck(sound) {
	this.sound = sound;
	this.quack = function() {document.write(this.sound);}
}
var toy = new Duck("quack quack");
toy.quack();
document.write(typeof toy);
document.write(toy instanceof Duck);









//-------------------------------------------------------------------------------------


//// пример   объекты        (( модели ))
var fiat = {
make: "GM",
model: "Cadillac",
year: 1955,
color: "tan",
passengers: 5,
convertible: false,
mileage: 12892,
fuel: 0,
started: false,
start: function() {
	if (this.fuel > 0){
	this.started = true;
	//kkk alert("поехали!");
	}
	else {
	//kkk alert("нет бензина!");
	}
},
stop: function() {
this.started = false;
},
drive: function() {
if (this.started) {
  if (this.fuel > 0) {
  //kkk alert(this.make + " " +  this.model + " goes zoom zoom!");
  this.fuel = this.fuel - 1;
  }else {
  //kkk alert("Uh oh, out of fuel.");
  this.stop();
}
} else {
//kkk alert("You need to start the engine first.");
}
},
addFuel: function(amount) {
this.fuel = this.fuel + amount;
}
};

fiat.start();
fiat.drive();
fiat.addFuel(2);
fiat.start();
fiat.drive();
fiat.drive();
fiat.drive();
fiat.stop();


var chevy = {
make: "Chevy",
model: "Bel Air",
year: 1957,
color: "red",
passengers: 2,
convertible: false,
mileage: 1021,
started: false,
start: function() {
this.started = true;
},
stop: function() {
this.started = false;
},
drive: function() {
if (this.started) {
//kkk alert(this.make + " " +this.model + " goes zoom zoom!");
} else {
//kkk alert("You need to start the engine first.");
}
}
};

var taxi = {
make: "Webville Motors",
model: "Taxi",
year: 1955,
color: "yellow",
passengers: 4,
convertible: false,
mileage: 281341,
started: false,
start: function() {
this.started = true;
},
stop: function() {
this.started = false;
},
drive: function() {
if (this.started) {
//kkk alert(this.make + " " + this.model + " goes zoom zoom!");
} else {
//kkk alert("You need to start the engine first.");
}
}
};

for (var prop in chevy) {
document.write(prop + ": " + chevy[prop]);
}


chevy.start();
chevy.drive();
chevy.stop();
taxi.start();
taxi.drive();
taxi.stop();




/// ??
var eightBall = { index: 0,
advice: ["yes", "no", "maybe", "not a chance"],
shake: function() {
this.index = this.index + 1;
if (this.index >= this.advice.length) {
this.index = 0;
}
},
look: function() {
return this.advice[this.index];
}
};
eightBall.shake();
//kkk alert(eightBall.look());








//// пример    модель плейера простая
var song = {
name: "Walk This Way",
artist: "Run-D.M.C.",
minutes: 4,
seconds: 3,
genre: "80s",
playing: false,
play: function() {
	//
if (!this.playing) {
this.playing = true;
//kkk alert("Playing " + this.name + " by " + this.artist);
}
},
pause: function() {
if (this.playing) {
this.playing = false;
//kkk alert("pause");
}
}
};

song.play();
song.pause();















//// СЛУЧАЙНЫЕ ...
function makeCar() {
var makes = ["Chevy", "GM", "Fiat", "Webville Motors", "Tucker"];
var models = ["Cadillac", "500", "Bel-Air", "Taxi", "Torpedo"];
var years = [1955, 1957, 1948, 1954, 1961];
var colors = ["red", "blue", "tan", "yellow", "white"];
var convertible = [true, false];
var rand1 = Math.floor(Math.random() * makes.length);
var rand2 = Math.floor(Math.random() * models.length);
var rand3 = Math.floor(Math.random() * years.length);
var rand4 = Math.floor(Math.random() * colors.length);
var rand5 = Math.floor(Math.random() * 5) + 1;
var rand6 = Math.floor(Math.random() * 2);
var car = {
make: makes[rand1],
model: models[rand2],
year: years[rand3],
color: colors[rand4],
passengers: rand5,
convertible: convertible[rand6],
mileage: 0
};
return car;
}
function displayCar(car) {
//kkk alert("Your new car is a " + car.year + " " + car.make + " " + car.model + " " + car.color + " " + car.passengers + " " + car.convertible);
}
var carToSell = makeCar();
displayCar(carToSell);






/// пример   случайная фраза
function makePhrases() {
var words1 = ["24/7", "multi-tier", "30,000 foot", "B-to-B", "win-win"];
var words2 = ["empowered", "value-added", "oriented", "focused", "aligned"];
var words3 = ["process", "solution", "tipping-point", "strategy", "vision"];
var rand1 = Math.floor(Math.random() * words1.length);
var rand2 = Math.floor(Math.random() * words2.length);
var rand3 = Math.floor(Math.random() * words3.length);
var phrase = words1[rand1] + " " + words2[rand2] + " " + words3[rand3];
//kkk alert(phrase);
}
makePhrases();










/// ??
function getSecret(file, secretPassword) {
file.opened = file.opened + 1;
if (secretPassword == file.password) {
return file.contents;
}
else {
return "Invalid password! No secret for you.";
}
}


function setSecret(file, secretPassword, secret) {
if (secretPassword == file.password) {
file.opened = 0;
file.contents = secret;
}
}

var superSecretFile = {
level: "classified",
opened: 0,
password: 2,
contents: "Dr. Evel's next meeting is in Detroit."
};


var secret = getSecret(superSecretFile, 2);
//kkk alert(secret);
setSecret(superSecretFile, 2, "Dr. Evel's next meeting is in Philadelphia.");
secret = getSecret(superSecretFile, 2);
//kkk alert(secret);







///
var fido = { 
name:"Fido", 
weight: 20.2,
age: 4, 
breed: "mixed", 
activity: "fetch balls"
}; 

function loseWeight(dog, amount) {
dog.weight = dog.weight - amount;
}

loseWeight(fido, 10);

//kkk alert(fido.name + " now weighs " + fido.weight);





///
var taxi = {
make: "Webville Motors",
model: "Taxi",
year: 1955,
color: "yellow",
passengers: 4,
convertible: false,
mileage: 281341
};
function prequal(car) {
if (car.mileage > 10000) {
return false;
} else if (car.year > 1960) {
return false;
}
return true;
}
var worthALook = prequal(taxi);
if (worthALook) {
document.write("You gotta check out this " + taxi.make + " " + taxi.model + "<br>");
} else {
document.write("You should really pass on the " + taxi.make + " " + taxi.model+ "<br>"+ "<br>") ;
}






///
var dog = { 
name:"Fido", 
weight: 20.2,
age: 4, 
breed: "mixed", 
activity: "fetch balls"
}; 
var bark; 
if ( dog.weight > 20) { 
bark = "WOOF WOOF"; 
} else { 
bark = "woof woof"; 
}
var speak = dog.name + " says " + bark + " when he wants to " + dog.activity ; 
document.write(speak); 







//// два варианта циклов

var products = ["Choo Choo Chocolate", "Icy Mint", "Cake Batter", "Bubblegum"]
var hasBubbleGum = [false, false, true, true];

var i = 0;
while (i < hasBubbleGum.length){
  if (hasBubbleGum[i]) {
  document.write("<br>" + products[i] + " contains bubble gum");
  }
i++;
}

  document.write("<br>");
for (var j = 0; j < hasBubbleGum.length; j++)
  if (hasBubbleGum[j]) {
  document.write("<br>" + products[j] + " contains bubble gum");
}

  document.write("<br><br>");










////  ПРЫВЭТ world!
function clunk(times) {
var num = times;
while (num > 0) {
display("clunk");
num--;
}
}
function thingamajig(size) {
var facky = 1;
clunkCounter = 0;
if (size == 0) {
display("clank");
} else if (size == 1) {
display("thunk");
} else {
while (size > 1) {
facky = facky * size;
size--;
}
clunk(facky);
}
}
function display(output) {
//kkk alert(output);
clunkCounter = clunkCounter + 1;
}
var clunkCounter = 0;

thingamajig(3);
//kkk alert(clunkCounter);








///
function doIt(param) {
param = 2;
}
var test = 1;
doIt(test);
document.write(test);


function whatShallIWear (temp) {
	if (temp < 60) {
document.write("Wear a jacket");
}	else if (temp < 70) {
document.write("Wear a sweater");
}   else {
document.write("Wear t-shirt");
}
}

whatShallIWear(80);
whatShallIWear(60);
whatShallIWear(50);  


 //kkk alert("Hello world!");

setTimeout(wakeUpUser, 3000);
function wakeUpUser() {
//kkk alert("ПРЫВЭТ!");
}


var age = 5;
var name = "САНЯ";
if (age > 14) {
//kkk alert("Sorry this page is for kids only!");
} else {
//kkk alert("Welcome " + name + "!");
}


var fuck = 5;
while (fuck > 0) {
document.write("Трахтибидох!<br>");
fuck = fuck - 1;
}
document.write("Пу!<br><br>");


var name1 = "Alex";
var i = 0;
while (i < 2) {
document.write("Happy Birthday to you.<br>");
i++;
}
document.write("Happy Birthday dear " + name1 + ",<br>");
document.write("Happy Birthday to you.<br><br>");






var word = "bottles";
var count = 4;

while (count > 0) {
document.write(count + " " + word + " of beer on the wall <br>");
document.write(count + " " + word + " of beer, <br>");
document.write("Take one down, pass it around, <br>");
count = count - 1;

if (count > 1){
document.write(count + " " + word + " of beer on the wall.<br><br>");
}

else if (count == 1) {
word = "bottle";
document.write(1 + " " + word + " of beer on the wall.<br><br>");

}

}
document.write("No more " + "bottles" + " of beer on the wall.<br><br>");









