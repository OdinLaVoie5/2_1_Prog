// my !!  числа Фибоначчи         ##цикл 
function fibFunc(num) {
  var fibonArr = [0, 1];
  for (var i = 0; i < num-1; i++) {  // ??  исправить num-2? ...
	fibonArr.push(fibonArr[i] + fibonArr[i+1]);
  }
  return fibonArr;
}
assert (1, fibFunc(6));  //10///////////////////



// my числа трибоначи       
/*var fibonArr = [0, 1, 1];
function fibFunc3() {
  for (var i = 0; i < 20 ; i++) {
	fibonArr.push(fibonArr[i] + fibonArr[i+1] + fibonArr[i+2]);
  }
  return fibonArr;
}
assert (1, fibFunc3());  //////////
*/



/*// my !!  числа Фибоначчи до опред числа   (endVal)      ##рекурсия ?    порно
var fibArr = [0, 1], endVal=100,  indMy = 0, tempVal;
function fibFuncRek() {
  tempVal = fibArr[indMy] + fibArr[indMy+1];
  if(tempVal>endVal){return fibArr};
  fibArr.push(tempVal);
  indMy++;
  fibFuncRek ();              /////// рекурсия
  return;
}

fibFuncRek(); //  ?? не понял.  почему-то нужно предварительно запустить ф-цию.
assert (1, fibFuncRek());   //10///////////////////
//=========================================================================
*/


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



//====================================================
//  my  факториал   см OSC
// my  тот же факториал  рекурсия  !!

function factRek(N) {
	var rez;
	if(N==1){return 1};   // или 	if(N==2){return 2};
	return rez = N * factRek(N-1);
}
assert (1, factOSC(5) + ' ' + factRek(4));  //11/////////////////









//===================================================================
// my простое ли число?    num
function simpleVal(num) {
  if(num>1){
	for (var i=2; i<=Math.floor(num/2); i++) {
	  if(num%i===0){
		return false;
	  }
	}return (num);
  }
}
assert (1,simpleVal(17));  //12/////////////////




// массив простых чисел до данного числа      
function simpleValPereb(num) {
  var arrSimpleVal=[];
  for (var i=2; i<=num; i++) {
	if(simpleVal(i)){arrSimpleVal.push(simpleVal(i))}
  }
  return arrSimpleVal;	   // результат - массив простых чисел
}
assert (1,simpleValPereb(235));  //13/////////////////




// представление числа в виде суммы 2-х простых.   если возможно. 
function simpleValSlag (num) {
  var simpleValSlagRez=[];
  var arrSimpleVal = simpleValPereb(Math.floor(num/2));
  for (var i=0; i<arrSimpleVal.length ; i++) {
	if( simpleVal(num - arrSimpleVal[i])){
	  simpleValSlagRez.push([arrSimpleVal[i], num - arrSimpleVal[i]]); // 2 слагаемых парой в массив   
	}  
  }return simpleValSlagRez;
}
assert (1,simpleValSlag (50).join(' / '));  //14////////////////



//  представление числа в виде 2-х простых для всех чётн чисел до данного.
// !!!!  Гипотеза Гольдбаха - 6 проблема Гильберта.
function simpleValSlagAll(num) {
  var flag = true;   
  for (var i=4; i<=num; i+=2) {   // i+=2 чтобы только чётные,  i=4 тк 2=1+1 неподходит
	if(simpleValSlag(i).length==0){  //  пустая строка - нет разложения на простые слагаемые
		flag = false; 
//kkk 	document.write("<br>");      	 распечатка.  убрать?
	}else {                            
/*kkk		document.write(simpleValSlag(i).join(' / ')); // распечатка.  убрать?
		document.write("<br>");*/	
	}
  }
  return flag;   // если true - все данные числа разложимы
}

assert (1,simpleValSlagAll('500'));  //15//////////////
//==================================================








////////////////////////////   НОД    //////////////   ?? проверка на NaN, отриц числа, ... 
function nodEvklid(M, N) {
  var P;
  while (M!=N){
	P=Math.max(M,N); N=Math.min(M,N); M=P-N;
  }
  return M;  
}
  // !! всегда можно сделать promt для ввода и alert для вывода
  assert (1,nodEvklid(42, 98));  //16//////////////



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

function nokMy(x, y) {
  var nodS = nodSmath(x, y)
  var result= x*y/nodS;           // ??  проверить.   + нок для несколько чисел
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
function triangle90(num) {
  var mem = 1;
  for (var i=1; i<=num ; i++) {
	for (var j=1; j<=i ; j++) {
	  for (var k=1; k<=j ; k++) {
		if(i*i === j*j + k*k){
		  if (nodSmath(i,j)!== nodSmath(i,k) || nodSmath(i,j)===1){ // модифик !! убрал кратные случаи
			if(i===mem)	document.write("&nbsp; &nbsp;");  // выделил повторы
			//kkk if(simpleVal(i)===i){       // модифик     гипотенуза - простое число
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

triangle90(300)//kkk 






//=========================================================================
// ((спектр числа))  массив степеней простых множителей     ?? нужно ф-ции с запоминанием см, или хотя бы предварительное вычисление массива прост чисел до какого-то числа
   var toMulti = 0; //\\\\\\\\\\ дополн перем: число множ,         глобаль ??
   var rezDop = [], rezDop1='';
function simpleMulti(num) {
  var rez = [];
  var simpleArr = simpleValPereb(num) 
  for (var i=0; i<simpleArr.length ; i++) {
	var tempMy=0;
	while (num % simpleArr[i] === 0){
	  tempMy++;
	  num /= simpleArr[i];
	}
	rez[i] = tempMy; 
	rezDop[i] = tempMy;     //\\\\  модифик
	if(rezDop[i]){           //\\\\  модифик  		
		rezDop1+= simpleArr[i]+'^'+rezDop[i]+' * ';
		rezDop[i]+='('+simpleArr[i]+')'    
	}
	if(rez[i]) toMulti+=tempMy
  }
  rezDop1=rezDop1.substr(0,rezDop1.length-3)       //\\\\  модифик  	
  return rez;  
}

var testMy = 40*7;
assert (1, simpleValPereb(testMy));  //17//////////////      ?? сделать в виде таблицы?
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
  var arrSimpl = simpleValPereb (numMax);   // массив простых чисел до макс элемента
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


test = nodnokSpec(15, 30, 45);
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
  var arrSimpl = simpleValPereb (numMax);   // массив простых чисел до макс элемента
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
  var arrSimpl = simpleValPereb (numMax);   // массив простых чисел до макс элемента
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
assert (1, benchmarkOSC(5, simpleMulti, 400,'я','я','я','я'))     //20///////////////

// !!  сравнил методы для НОД      nodEvklid лучше здесь    nodSmath лучше в браузе
/*assert (1, benchmarkOSC(5, nodEvklid, 407177171171700111111, 557333775511111, 'я','я','я','я'))   ///////////
assert (1, benchmarkOSC(5, nodSmath, 407177171171700111111, 557333775511111,'я','я','я','я'))     ///////////
*/








//\\\\\\\\\\      массив кол-ва множителей   см выше simpleMulti ...
function kolSimpleMulti(num) {
  var rez = [];  toMulti = 0;
  for (var i=0; i<=num; i++) {
	  simpleMulti(i);
	  rez[i]= toMulti;
	  toMulti=0;
  }
  return rez;  
}
assert (1,kolSimpleMulti(40*7));  //21////////////

//\\\\\\    числа из 2х простых сомножителей. инет RSA шифрование !!!
function tolSimpleMulti(num) {
  var rez =[], rezTemp=[]; 
  rezTemp = kolSimpleMulti(num); 
  for (var i=0; i<rezTemp.length; i++) {
	  if(rezTemp[i]===2){rez.push(i)}
  }
  return rez;  
}
assert (1,tolSimpleMulti(40) );  //22////////////





