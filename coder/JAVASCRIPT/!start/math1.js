// !!  ##строгий ##режим
/* "use strict"  */

// ##const
const FFF = 333;
/*  FFF = 111;  // в браузе пишет ошибка
*/
assert (1, FFF);                          //1////////////////

//  !! (разн системы счисления)
assert (1, (8).toString(2));               //2////////////////






//  (неточность вычислений из-за перевода десятичной дроби в двоичную систему        
// my округлять надо ??          ##toFixed
assert (1, 0.1+0.2 +' '+ (0.1+0.2==0.3) +' '
  + ((0.1+0.2).toFixed(1)==0.3) +' '+  0.1.toFixed(20));       //3//////////////// 
//  0.1.toFixed(20) см в браузе
//kkk   alert( 9999999999999999 ); // выведет 10000000000000000
//kkk   alert( (6.35*10).toFixed(0)/10 ); // 6.3


//================================
//   концепт1   дествие с числом как со строкой   см OSC getDecimal
/*
function getDecimal1(num) {
  var str = "" + num;
  var zeroPos = str.indexOf(".");
  if (zeroPos == -1) return 0;
  str = str.slice(zeroPos);
  return +str;
}
*/
/*alert( getDecimal(12.545) ); // 0.545
alert( getDecimal(1.2) ); // 0.2
alert( getDecimal(-1.2) ); // 0.2
*/
//================================
 
 
 


//  isNaN и isReallyNaNOSC см OSC
assert (1, isNaN(NaN)+' '+isNaN(undefined) +' // '
  + isReallyNaNOSC(NaN)+' '+isReallyNaNOSC(undefined));              //4////////////////







//////////////////// my  Решение линейного ур-я ////////////// ??? реш квадр ур-я ... ...
function fUrLin () {
	var A = 1;  var B = 0; var X = 0;
	alert("Решение линейного ур-я A*X=B");
	A = prompt("Введите A");
	B = prompt("Введите B");	
		if (A==0){
			if (B==0){
				alert("X любое")
				}
			else {
				alert("Решения нет")
				}
				}
		else {
			X = B/A;
			alert(X);
		}
}
/* fUrLin() 
*/





/////////////////////   сумма, среднее чисел ...  ???  убого //////////////////
/*function myMat() {
  var sum = 0, ind = 0, sredn = 0;
  while (true) {
	var value = +prompt("Введите число", '');
	if (!value) break; 
	sum += value; ind++; sredn = sum/ind;
  } alert( 'Сумма: '+sum + '  Среднее: '+sredn );
}
myMat()
*/


/////////////////////   ЦЕПНЫЕ ДРОБИ    !!!   //////////////////
function zepDrob(num, num1) {    
  var rez = [], i=0, temp;
  for (var i=0; num1; i++) {          //  !!
	rez[i]=num/num1^0;
	temp=num;
	num=num1;
	num1=temp%num1; 
  }return rez;
}
assert (1, zepDrob(227, 35));  //5//////////////  6+(1/(2+ 1/17))




//  ##sign
// alert (Math.sign(-4)) //   в браузе


