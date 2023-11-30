
var massiv1=[];
for (var i = -30; i <= 30 ; i++) {
	if(i%15==0)massiv1.push('tf' + ' ');
	else if(i%5==0)massiv1.push('f' + ' ');
	else if(i%3==0)massiv1.push('t' + ' ');
	else massiv1.push(i + ' ');
}
assert(1, massiv1 );       //5///////////  







//////////////////  ##запятая  оператор ','  //////////////////////
var lll;
var kkk = 1+(3+4, lll=4, 5, nnn=333+443); 
assert (1, "оператор ',' "+  ' // '+ kkk+  ' // '+ lll+  ' // '+ nnn);  //6/////////////
// Запятая — единственный оператор, приоритет которого ниже присваивания.

var res, val = 2;
// alert (res = (val+=1, val=5));   // 5
var res, val = 2;
// alert (res = val+=1, val=5);    // 3




//   ##if        или  ##?  (это удобно если альтернативы две)
/*var age = prompt('возраст?', 18);
var message = (age < 3) ? 'Здравствуй, малыш!' :   // цепочка условий 
(age < 18) ? 'Привет!' :
(age < 100) ? 'Здравствуйте!' :
'Какой необычный возраст!';
alert( message )
*/

/*var num = prompt('введите число', '');
aaa = (num>0)?1: (num<0)? -1: 0;
alert( aaa )
*/


//  my  порно      проще написать с if       но работает
/*var quo = prompt('кто пришёл', 'admin');
var quo1, aaa;       //////////
aaa = quo ?  quo==='admin' ?  (quo1 = prompt('пароль?', '')) ? quo1 ==='чёрный' ? 'заходи':'уходи' : 'вход отменён' : 'я вас не знаю' : 'вход отменён';
alert( aaa );
*/
//  тоже, но более понятно
/*var quo = prompt('кто пришёл', 'admin');
var quo1, aaa;
if(quo==='admin'){
  quo1 = prompt('пароль?', '')
	if(quo1==='чёрный'){aaa='заходи'}
	else if (quo1===null){aaa='вход отменён'}
	else {aaa='уходи'};
}else if (quo===null){aaa='вход отменён'}
else {aaa='я вас не знаю'};
alert( aaa );
*/

//  удобная запись с '?'
/*var login= prompt('введите логин', 'Вася');
var message = (login == 'Вася')? 'Привет':       //  if
  (login == 'Директор')? 'Здравствуйте':         // else if
  (login == '')? 'Нет логина' :                  // else if
  '';                                            // else 
alert( message);
*/






//   см файл var  побитовые операторы
assert(1, (parseInt('101', 2)^parseInt ('11', 2)).toString(2));   //7/////////////// 





//  ##||    Логические операторы     + см Date   + var_type (побитовые)
var dNow = new Date();
var hour = dNow.getHours() // или  dNow.toTimeString().substr(0,2);
var dayMy = dNow.getDay();
if (hour <= 10 || hour >= 18 || dayMy===0) {assert(1,  'Офис до 10 или после 18 или в выходной закрыт ')}
else {assert(1, 'Окрыто')}          //8////////////////////



//  || используют, в частности, чтобы выбрать первое «истинное» значение из списка (если 'истинных' нет то последний элемент)       (Короткий цикл вычислений)
var undef; // переменная не присвоена, т.е. равна undefined
var zero = 0;
var emptyStr = "";
var msg = "на истине спотыкаюсь";
var result = undef || zero || emptyStr || msg || 0;    //  !!
assert(1, result );               //9/////////////////
// выведет "Привет!" ‐ первое значение, которое является true


// && используют, в частности, чтобы выбрать первое «ложное» значение из списка: (если 'ложных' нет то последний элемент)      (Короткий цикл вычислений)
assert(1, (1 && 2 && null && 3)+' '+ (1 && 2 && 3)); // null  3      //10/////////////////


//   ##switch
/*
var a = 2 + 2;
switch (a) {
  case 3:
	alert( 'Маловато' );
  case 4:
	alert( 'В точку!' ); break;    // без break выполнятся лишние строки
  case 5:
	alert( 'Перебор' );
  default:
	alert( 'Я таких значений не знаю' );
}
*/



//   ##проверка на undefined
function showMessage(from, text) {
/*if (text === undefined) {text = 'текст не передан';}      вариант    */  
text = text || 'текст не передан'                       // вариант1
alert( from + ": " + text );
}
/*showMessage("Маша", "Привет!"); // Маша: Привет!
showMessage("Маша"); // Маша: текст не передан
*/





//   ##пример   ##confirm
/*function checkAge(age) {
  if (age > 18) {return true;
  } else {return confirm('Родители разрешили?');
  }
}
*/

/*//  концепт1
function checkAge(age) {
return (age>8) ? true: confirm('Родители разрешили?');
}
//  концепт2
function checkAge(age) {
return (age > 18) || confirm('Родители разрешили?');
}
//  инициатор
var age = prompt('Ваш возраст?');
if (checkAge(age)) {alert( 'Доступ разрешен' );
} else {alert( 'В доступе отказано' );
}
*/




