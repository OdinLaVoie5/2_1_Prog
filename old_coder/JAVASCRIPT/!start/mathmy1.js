// !!!  my числа Фибоначчи обобщение 
function fibFuncAll(n, fibonArr) {
  var fibonArr = fibonArr || [1, 1];  // умолч 
  var len = fibonArr.length;
  for (var i = 0; i < n-len; i++) {
	var temp = 0;
	for (var j=0; j< len; j++) {
	  temp += fibonArr[i+j];
	} 
	fibonArr.push(temp);
  }
  return fibonArr;
}
/// alert (fibFuncAll(9, [1, 1, -2, 1]));


// my !!  числа Фибоначчи  до номера n     ##цикл  fibonArr - начальн числа 
function fibFunc(n, fibonArr) {
  var fibonArr = fibonArr || [1, 1];  // умолч 
  for (var i = 0; i < n-2; i++) {  
	fibonArr.push(fibonArr[i] + fibonArr[i+1]);
  }
  return fibonArr;
}
assert (1, fibFunc(16));  //10///////////////////
//assert (1, fibFunc(16, [2, 1]));  ////




// my числа трибоначчи       
function fibFunc3(n) {
  var fibonArr = [1, 1, 2];
  for (var i = 0; i < n-3; i++) {
	fibonArr.push(fibonArr[i] + fibonArr[i+1] + fibonArr[i+2]);
  }
  return fibonArr;
}
//alert (fibFunc3(7));   ////////




/*// my !!  числа Фибоначчи до опред числа   (n)      ##рекурсия ?    порно
  var fibArr = [1, 1], ind = 0, temp;     //   глобаль
function fibFuncRek(n) {
	  temp = fibArr[ind] + fibArr[ind+1];  // 2 3
  if(temp<n){
  fibArr.push(temp); 
  ind++;
  fibFuncRek(n);              /////// рекурсия
  }
  return fibArr;
}

assert (1, fibFuncRek(11111));    ///////////////




*///============================================

//  ЧИСЛО ФИБОНАЧЧИ !!!

var nnn = 'fff'//70

//  число Фибоначчи концепт формула Бине    !!!
// тот случай когда более длинный путь по циклу точнее

function fibCikl(n) {
  var a=1, b=1;
  for (var i=3; i<=n ; i++) { 
	c=a+b; a=b; b=c;
  }return b ;
}

//kkk   alert (fibCikl(nnn))   ////////


// my число Фибоначчи концепт1 формула fi = l/V5 [((l+V5)/2)^n-((1^5)/2)^n ]
// при n > 70 результат не точный, ошибка        /\d/

function fibon(n) { 
//  if(/\D/.test(n)||n=='') {  // модифик  если аргумент неопред   вариант
	if(!isNumericOSC(n)) {  // модифик    вариант1  
	n=prompt('введите номер числа Фибоначчи в ряду', 12)
	return fibon(n);
  }
  var temp = Math.sqrt(5);
  var rez = (1/temp)*(Math.pow((1+temp)/2, n)-Math.pow((1-temp)/2, n));
  rez =rez.toFixed(0);
  
  return rez; 
}

//kkk   alert (fibon(nnn))    //////////


/*//  концепт2, рекурсия,  ЗАВИС  ---
function flbRek(n) {
return n <= 1 ? n : fibRek(n-l) + fibRek(n-2);
}

alert (fibRek(nnn));
*/


/*
// Функция-генератор, которая воспроизводит последовательность чисел Фибоначчи
function fibonacci() {
var x = 0, y = 1;
while(true) {
yield y;   // ??? 
[x,y] = [y,x+y];
}
}
// Вызвать функцию-генератор, чтобы получить генератор.
f = fibonacci();
// Использовать генератор как итератор, вывести первые 10 чисел Фибоначчи.
for(let i = 0; i < 10; i++) console.log(f.next());
*/

//================================== 



/*//  сделано в Драконе.  не идеально.
function fibonacci(n) {
  var result = [0];
  if (n === 0) {
  } else {
	if (n === 1) {
	  result.push(1);
	} else {
	  result.push(1);
	  var i = 2;
	  while (true) {
		if (i <= n) {
		} else {
		  break;
		}
		var f2 = result[i - 2];
		var f1 = result[i - 1];
		var fib = f1 + f2;
		result.push(fib);
		i++;
	  }
	}
  }
  return result;
}
assert (1, fibonacci(6));  //////////
*/





//==================================================================
//  my  факториал   см OSC
// my  тот же факториал  рекурсия  !!

function factRek(n) {
	return (n-1)? n* factRek(n-1): 1;
}
assert (1, factOSC(5) + ' ' + factRek(4));  //11/////////////////











//===================================================================
// my простое ли число?       вариант  с  for
/*function isPrime(n) {
  var temp = Math.sqrt(n)^0;
  if(n===1){return false}
  for (var i=2; i<=temp; i++) {
	  if(n%i===0){return false;}
  }return true;
}
assert (1,isPrime(33331));                //12/////////////////
*/

//                           вариант1  с  while
// ограничено по величине числа.     11111111111111111111111 пишет false ошибочно.
function isPrime(n) {
  if(n===1){return false}
  var i=2;
  while (i*i<=n){
	if(n%i===0)return false;
	i++;
  }return true;
}
assert (1,isPrime(37));                //12/////////////////


// массив простых чисел до данного числа  
      var par=[], pi;                  //\\\\\ дополн близнецы и ф-ция Гаусса
function showPrimes(n) {
  var rez =[];
  var temp;   pi=0;                          //\\\\\ 
  for (var i=2; i<=n; i++) {
	if (!isPrime(i)) continue;
	rez.push(i)
	if(i===temp+2){par.push([i-2, i])}    //\\\\\
	temp=i;                               //\\\\\
	pi++;                                //\\\\\
  }return rez;
}
assert (1,showPrimes(100));                      //13/////////////////
 document.write('13.) '+par.join(' / '));    document.write("<br>");   //\\\\\ дополн близнецы
  document.write('13..) '+pi);    document.write("<br><br>");               //\\\\\



//  my    решето Эратосфена    вариант    порно
/*var arr =[], arrMod =[], sum=0, arrLen = 100;
for (var i=2; i<=arrLen; i++) arr.push(i); // сплошной массив 2,3,4 ... arrLen
  
(function modEratosfen() {    // решето
  for (var p=2; p<=Math.sqrt(arrLen)^0; p++) {
	var flag=0; 
	if(!arr[p-2]) continue;
	for (var i=0; i<=arrLen; i++) {
	  if(arr[i]%p===0){
		if(flag) arr[i]=undefined;
		flag = 1;  
	  }
	}
  }
  for (var i=0; i<arr.length ; i++) {   // уплотнение   ++ сумма
	if(arr[i]){
	  arrMod.push(arr[i]);
	  sum += arr[i];
	}
  }
})()


assert(1, arrMod);   ////////////////
*/

//  решето Эратосфена  вариант1
/*// шаг 1
var arr = [];
for (var i = 2; i < 100; i++) {
arr[i] = true
}
// шаг 2
var p = 2;
do {
// шаг 3
for (i = 2 * p; i < 100; i += p) {
arr[i] = false;
}
// шаг 4
for (i = p + 1; i < 100; i++) {
if (arr[i]) break;
}
p = i;
} while (p * p < 100); // шаг 5
// шаг 6 (готово)
// посчитать сумму
var sum = 0;
for (i = 0; i < arr.length; i++) {
if (arr[i]) {
sum += i;
}
}
alert( sum );*/


//===================================








// представление числа в виде суммы 2-х простых.   если возможно. 
function simpleValSlag (n) {
  var rez=[];
  var arrSimpleVal = showPrimes(n/2^0);
  for (var i=0; i<arrSimpleVal.length ; i++) {
	if( isPrime(n - arrSimpleVal[i])){
	  rez.push([arrSimpleVal[i], n - arrSimpleVal[i]]); // 2 слагаемых парой в массив   
	}  
  }return rez;
}
assert (1,simpleValSlag (222).join(' / '));  //14////////////////



//  представление числа в виде 2-х простых для всех чётн чисел до данного.
// !!!!  Гипотеза Гольдбаха - 6 проблема Гильберта.
function simpleValSlagAll(n) {
  var flag = true, arrser=[];   
  for (var i=4; i<=n; i+=2) {   // i+=2 чтобы только чётные,  i=4 тк 2=1+1 неподходит
	if(simpleValSlag(i).length==0){  //  пустая строка - нет разложения на простые слагаемые
	  flag = false; 
	}
	arrser.push(simpleValSlag(i)+"||");
  }
  // alert (arrser)
  return flag;   // если true - все данные числа разложимы
}

assert (1,simpleValSlagAll('50'));  //15//////////////
//==================================================








////////////////////////////   НОД    //////////////   ?? проверка на NaN, отриц числа, ... 
function nodEvklid(M, N) {
  var P;
  while (M!=N){
	P=Math.max(M,N); N=Math.min(M,N); M=P-N;
  }
  return M;  
}
  // !! всегда можно сделать promt для ввода и alert для вывода и confirm для выбора
  assert (1,nodEvklid(42, 48));  //16//////////////



//  др вариант  
function nodSmath(x, y) {
  while ((x!=0)&&(y!= 0)) {
	if (x > y) x %= y;
	else y %= x;
  }
  var result= x + y;
  return result;
}

/*
// my my     нок    
 // ??  проверить.   + нок для несколько чисел   x/nodS * y/nodS *... *nodS
function nokMy(x, y) {
  var nodS = nodSmath(x, y)
  var result= x*y/nodS;    
  return result;
}
assert (1, nokMy(42, 98));  //////////////




//my  нод для несколько чисел   без излишеств
function nodMyMy() {      
  var arrNum=arguments[0], arrNum1;                              
  for (var i=1; i<arguments.length ; i++) {  
	arrNum1=arguments[i];
	arrNum = nodSmath(arrNum,arrNum1);
	if(arrNum===1)return 1;
  }
  return arrNum;
}
assert (1, nodMyMy(16, 32, 48));  //////////////


//my  нок для несколько чисел   без излишеств
function nokMyMy() {      
  var arrNum=arguments[0], arrNum1;                              
  for (var i=1; i<arguments.length ; i++) {  
	arrNum1=arguments[i];
	arrNum = nokMy(arrNum,arrNum1);
  }
  return arrNum;
}
assert (1, nokMyMy(3, 15, 25, 27, 45, 9));  //////////////
*/




//=======================================
//  (пифагоровы) треугольники (целочисленные прямоуг треугольники)   
function triangle90(n) {
  var mem = 1;
  for (var i=1; i<=n ; i++) {
	for (var j=1; j<=i ; j++) {
	  for (var k=1; k<=j ; k++) {
		if(i*i === j*j + k*k){
		  if (nodSmath(i,j)!== nodSmath(i,k) || nodSmath(i,j)===1){ // модифик !! убрал кратные случаи
			if(i===mem)	document.write("&nbsp; &nbsp;");  // выделил повторы
			//kkk if(isPrime(i)===i){       // модифик     гипотенуза - простое число
			  document.write(i + '^2' + ' = ' + j + '^2' + ' + ' +  k + '^2'); 
			  document.write("<br>");   
			  mem = i; 
			//kkk }
		  }
		} 
	  }
	}
  }
}

  document.write('15+)');    document.write("<br>");
triangle90(80)//kkk 






//=========================================================================
// ((спектр числа))  массив степеней простых множителей     ?? нужно ф-ции с запоминанием см, или хотя бы предварительное вычисление массива прост чисел до какого-то числа              + факторизация
   var toMulti = 0; //\\\\\\\\\\ дополн перем: число множ,         глобаль ??
   var rezDop = [], rezDop1='';
function simpleMulti(n) {
  var rez = [];
  var temp = showPrimes(n) 
  for (var i=0; i<temp.length ; i++) {
	var tempMy=0;
	while (n % temp[i] === 0){
	  tempMy++;
	  n /= temp[i];
	}
	rez[i] = tempMy; 
	rezDop[i] = tempMy;     //\\\\  модифик
	if(rezDop[i]){           //\\\\  модифик  		
		rezDop1+= temp[i]+'^'+rezDop[i]+' * ';
		rezDop[i]+='('+temp[i]+')'    
	}
	if(rez[i]) toMulti+=tempMy
  }
  rezDop1=rezDop1.substr(0,rezDop1.length-3)       //\\\\  модифик  	
  return rez;  
}

var testMy = 5*7;
assert (1, showPrimes(testMy));    //17//////////////      ?? сделать в виде таблицы?
assert (1,simpleMulti(testMy).join(' '));  //18//////////////   сделать в виде таблицы под предыдущ?  ...

//kkk////// дополн вид   assert (1,rezDop);  
//kkk////// дополн вид  assert (1,rezDop1); 







//=================================
// my  !!!  НОК НОД    для нескольких чисел      
// вариант возвращает объект   ??  сделать удобное извлечение нужного значения из объекта (дополн ф-цию)
// в ф-ции массив простых множителей чисел ??  может пригодится?

function nodnokSpec() {      
  var arrNum = [], rez={};
                                 // var flag;   
  for (var i=0; i<arguments.length ; i++) {  // предварит подготовка arguments в массив
	if(isNaN(arguments[i]));        // flag = arguments[i];      может пригодится
	else arrNum[i] = arguments[i];
  }

  var arrNumLen = arrNum.length, numMax = largest(arrNum); // длина массива, макс элемент - largest см OSC
  var arrSimpl = showPrimes (numMax);   // массив простых чисел до макс элемента
  var specLenMax = simpleMulti(numMax).length; // длина спектра макс элемента    
  var arrSpec=[],arrForNok=[],arrForNod=[];  // массив спектров входных чисел, предвар результы
  var nokMy = nodMy = 1; // результаты
  

  for (var i=0; i<arrNumLen; i++) {       // привёл спектры к одной длине заполняя отсутствующие эл-ты 0
	arrSpec[i] = simpleMulti(arrNum[i]); 
	for (var j=0; j<specLenMax; j++) {
	  if(arrSpec[i][j]=== undefined ) {
		arrSpec[i][j] = arrForNok[j] = arrForNod[j] = 0; 
	  }else {
		if((arrForNok[j] === undefined) || (arrSpec[i][j] > arrForNok[j]))  arrForNok[j] = arrSpec[i][j];
		if((arrForNod[j] === undefined) || (arrSpec[i][j] < arrForNod[j]))  arrForNod[j] = arrSpec[i][j];
		if(i===arrNumLen-1){       // в конце  циклов спектр переводим в число
		  nodMy *= Math.pow(arrSimpl[j], arrForNod[j])
		  nokMy *= Math.pow(arrSimpl[j], arrForNok[j]) 
		}
	  }
	}	
  }

/*kkk  //   предварит результаты
  document.write(arrSimpl);document.write("<br><br>");
  document.write(arrSpec.join('<br>'));document.write("<br><br>");
  document.write(arrForNod);document.write("<br>");
  document.write(arrForNok);document.write("<br><br>");
  document.write(" nod:");document.write(nodMy);
  document.write(" nok:");document.write(nokMy);
*/
 rez = {nodMy:nodMy, nokMy:nokMy}
  //   if(flag === 'nod')return nodMy;  else if(flag === 'nok')return nokMy;  может пригодится
  return rez;
}


test = nodnokSpec(15, 36, 45);
assert (1, test.nodMy +' '+ test.nokMy);  //19//////////////






//=================================
// my  !!!  НОК НОД     
/*//  ?? сделать, чтобы в аргументы nod и nok  ... без кавычек? 

function nodnokSpec() {      
  var arrNum = [], flag;
  for (var i=0; i<arguments.length ; i++) {  // предварит подготовка arguments в массив
	if(isNaN(arguments[i])) flag = arguments[i]; 
	else arrNum[i] = arguments[i];
  }

  var arrNumLen = arrNum.length, numMax = largest(arrNum); // длина массива, макс элемент - largest см OSC
  var arrSimpl = showPrimes (numMax);   // массив простых чисел до макс элемента
  var specLenMax = simpleMulti(numMax).length; // длина спектра макс элемента    
  var arrSpec=[],arrForNok=[],arrForNod=[];  // массив спектров входных чисел, предвар результы
  var nokMy = nodMy = 1; // результаты
  

  for (var i=0; i<arrNumLen; i++) {       // привёл спектры к одной длине заполняя отсутствующие эл-ты 0
	arrSpec[i] = simpleMulti(arrNum[i]); 
	for (var j=0; j<specLenMax; j++) {
	  if(arrSpec[i][j]=== undefined ) {
		arrSpec[i][j] = arrForNok[j] = arrForNod[j] = 0; 
	  }else {
		if((arrForNok[j] === undefined) || (arrSpec[i][j] > arrForNok[j]))  arrForNok[j] = arrSpec[i][j];
		if((arrForNod[j] === undefined) || (arrSpec[i][j] < arrForNod[j]))  arrForNod[j] = arrSpec[i][j];
		if(i===arrNumLen-1){       // в конце  циклов спектр переводим в число
		  nodMy *= Math.pow(arrSimpl[j], arrForNod[j])
		  nokMy *= Math.pow(arrSimpl[j], arrForNok[j]) 
		}
	  }
	}	
  }

 //kkk   предварит результаты
  document.write(arrSimpl);document.write("<br><br>");
  document.write(arrSpec.join('<br>'));document.write("<br><br>");
  document.write(arrForNod);document.write("<br>");
  document.write(arrForNok);document.write("<br><br>");
  document.write(" nod:");document.write(nodMy);
  document.write(" nok:");document.write(nokMy);
  if(flag === 'nod')return nodMy;
  else if(flag === 'nok')return nokMy;
}



assert (1, nodnokSpec(15, 30, 45, 'nod') + ' ' + nodnokSpec(15, 30, 45, 'nok') );  //////////
*/




/*//=================================
// my    НОК НОД    вариант  на входе массив

function nokNodSpec(arrNum) {      // на входе массив целых чисел
  var arrNumLen = arrNum.length, numMax = largest(arrNum); // длина массива, макс элемент - largest см OSC
  var arrSimpl = showPrimes (numMax);   // массив простых чисел до макс элемента
  var specLenMax = simpleMulti(numMax).length; // длина спектра макс элемента    
  var arrSpec=[],arrForNok=[],arrForNod=[];  // массив спектров входных чисел, предвар результы
  var nokMy = nodMy = 1; // результаты
  
  for (var i=0; i<arrNumLen; i++) {       // привёл спектры к одной длине заполняя отсутствующие эл-ты 0
	arrSpec[i] = simpleMulti(arrNum[i]); 
	for (var j=0; j<specLenMax; j++) {
	  if(arrSpec[i][j]=== undefined ) {
		arrSpec[i][j] = arrForNok[j] = arrForNod[j] = 0; 
	  }else {
		if((arrForNok[j] === undefined) || (arrSpec[i][j] > arrForNok[j]))  arrForNok[j] = arrSpec[i][j];
		if((arrForNod[j] === undefined) || (arrSpec[i][j] < arrForNod[j]))  arrForNod[j] = arrSpec[i][j];
		if(i===arrNumLen-1){       // в конце  циклов спектр переводим в число
		  nokMy *= Math.pow(arrSimpl[j], arrForNok[j]) 
		  nodMy *= Math.pow(arrSimpl[j], arrForNod[j])
		}
	  }
	}	
  }
  //   предвар результы
  document.write(arrSimpl);document.write("<br><br>");
  document.write(arrSpec.join('<br>'));document.write("<br><br>");
  document.write(arrForNod);document.write("<br>");
  document.write(arrForNok);document.write("<br><br>");
  document.write(" nod:");document.write(nodMy);
  document.write(" nok:");document.write(nokMy);
}
var testMy = [21, 14, 49, 70];
nokNodSpec(testMy)

*/





// см OSC benchmarkOSC
assert (1, benchmarkOSC(5, simpleMulti, 1400,'я','я','я','я'))     //20///////////////

// !!  сравнил методы для НОД      nodEvklid лучше здесь    nodSmath лучше в браузе
/*assert (1, benchmarkOSC(5, nodEvklid, 407177171171700111111, 557333775511111, 'я','я','я','я'))   ///////////
assert (1, benchmarkOSC(5, nodSmath, 407177171171700111111, 557333775511111,'я','я','я','я'))     ///////////
*/








//\\\\\\\\\\      массив кол-ва множителей   см выше simpleMulti ...
function kolSimpleMulti(n) {
  var rez = [];  toMulti = 0;
  for (var i=0; i<=n; i++) {
	  simpleMulti(i);
	  rez[i]= toMulti;
	  toMulti=0;
  }
  return rez;  
}
assert (1,kolSimpleMulti(5*7));  //21////////////

//\\\\\\    числа из 2х простых сомножителей. инет RSA шифрование !!!
function tolSimpleMulti(n) {
  var rez =[], rezTemp=[]; 
  rezTemp = kolSimpleMulti(n); 
  for (var i=0; i<rezTemp.length; i++) {
	  if(rezTemp[i]===2){rez.push(i)}
  }
  return rez;  
}
assert (1,tolSimpleMulti(40) );  //22////////////



// alert (0x100)

