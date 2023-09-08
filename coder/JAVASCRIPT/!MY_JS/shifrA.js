//+ см   кодир-декодир  
//  вариант   база-алфавит с ё Ё      изменил базы ... ...     107  159        
//     учесть  ...       + регул выраж ???  
//  ограничить kluch dekluch  числом букв базы  (kluch = kluch % base.length)
//  + др методы шифрования     + случ метод  или случ ключ метода и самому расшифровать  ??  


// 1..  0 и случ символы в lenta (flag)  2 второй нажим - др метод flag)    3 кнопка случ ключ  
// сделать развёрнутые подсказки к кнопкам о методах шифрования    или отдельный help   ???
// автом менять размеры текст окон(шир?? выс?) ??
// при вводе непосредств во второе окно после метода lenta -  сделать норм размер шрифта автоматич 

// zes и afin - перенос отраж как ¶,   zerk и polib - вобще не отраж,   grons - сбивается,    lenta - сбивается сделать игнор  ??     

//  оформление  -   кнопки верх панели - гиф,  противоположные объеденить как бы в одну (чёрно-бел половинки)   ... 



//////////////////////////// БАЗЫ /////////////////////////////
 
//    определять тип базы при вводе ?? + индикатор типа.
var base0 = "абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789_+-,.;:?!'=`~@#$%^&*(){}[]|<> ¶abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"; // база по умолчанию.  \/ убрал т.к. в degrons проблемы (регул выраж?)  ?? 
var base1 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_+-,.;:?!'=`~@#$%^&*(){}[]|<> ¶абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ"; 
var base2 = "0123456789";   // ...........
var base = base0;

var baseLen = base.length;
//================================================================================


///////////////////// ПЕРЕМЕННЫЕ   ?? глобаль  ///////////////////////////////
var kakshifr = zesar;      // методы по умолчанию
var kakDeshifr = dezesar;
var onnn = document.getElementById('onnn')     // окна ввода ключей
var tooo = document.getElementById('tooo')  
var sektab = [];  //  секретная таблица
var flag=0;  // флаг для изменения окна output если широкий ответ метода lenta
var flagDance=0; 
//======================================================================


//////////////////////  РЕАЛИЗАЦИЯ  (исполнение) /////////////////////////////
function doEncode(btn, kakshifr) {
  var baseMy = document.getElementById('baseMy')     // кнопку перемены базы
  
  var form = btn.form;
  form.input2.value = ""
  form.output.value = ""
  var val = form.input1.value,
  kluchA = form.kluchA.value*1, kluchB = form.kluchB.value*1,  
  baseMy = form.baseMy.value*1;           ///////////////
  if(baseMy===0){base = base0}   // выбор базы
  else if (baseMy===1){base = base1}
  else if (baseMy===2){base = base2};
  form.input2.style.fontFamily = "Arial";
  form.input2.style.fontSize = "inherit";
  form.input2.value = kakshifr(val, kluchB, kluchA).join(""); /// обращ к ф-ции
  if(flagDance){
	  form.input2.style.fontFamily = "OdinDanceMy";
	  form.input2.style.fontSize = "25px";
  } // сделать выбор шрифта ключ. (с подсказкой на кнопке  цифра-шрифт)
  flagDance = 0;
}


function doDecode(btn, kakDeshifr) {
  var form = btn.form; 
  var val = form.input2.value, 
  dekluchA = form.dekluchA.value*1, dekluchB = form.dekluchB.value*1;
  form.output.value = kakDeshifr(val, dekluchB, dekluchA).join("");
  if(flag){form.output.style.height=flag*20+ "px";
  }
  else form.output.style.height="90px";
  if(flagDance){form.output.style.fontFamily="Arial";}
  flagDance = 0;
}


function doRoundTrip(btn) {
	doEncode(btn, kakshifr);
	doDecode(btn, kakDeshifr);
}

// ===============================================================





/////////////////////////  МЕТОДЫ шифрования ////////////////////////////

// ??  объединить все методы в один объект?
// Код Цезаря x+b       
function zesar(val, kluchB) {
  var rez = [], temp;
  for (var i=0; i<val.length; i++) {
	  temp = base.indexOf(val[i]);
	  temp += kluchB%= baseLen;
	  if(temp < 0) {temp += baseLen;} 
	  if(temp >= baseLen) {temp -= baseLen;} 
	  rez[i] = base.charAt(temp); 
  }
  return rez;
}

function dezesar(val, dekluchB) {
  var rez = [], temp;
  for (var i=0; i<val.length; i++) {
	  temp = base.indexOf(val[i]);
	  temp -= dekluchB%= baseLen;
	  if(temp < 0) {temp += baseLen;} 
	  if(temp >= baseLen) {temp -= baseLen;} 
	  rez[i] = base.charAt(temp); 
  }
  return rez;
}





//    аффинный шифр        !! (НОД) чисел а и n должен быть равен 1 
// a*x+b   

function afin (val, kluchB, kluchA) {
  var rez = [], temp;
  if(nodSmath(kluchA, baseLen)!==1){onnn.style.color = 'Red'} // проверка НОД
  else {onnn.style.color = 'Black'};
  for (var i=0; i<val.length; i++) {
	temp = base.indexOf(val[i]);
	temp = (kluchA*temp + kluchB)%baseLen;
	if(temp < 0) {temp += baseLen;} 
	rez[i] = base.charAt(temp); 
  }
  return rez;
}

/*  ##теория        наша функция записывается как
C(х) = (х + 3) (mod 26)              С(х) = (х + k) (mod n),  где n — длина алфавита (26 в английском алфавите), a k — ключ, используемый в данном шифре. 
расшифровка означает применение формулы, обратной той, что использовалась выше:
С-1(х) = (х — k) (mod n).
*/


// ?????     не работает при отриц  kluchB и kluchA.    не разрешимо?  ограничиться положит?
//  my x=(y-b +baseLen*n)/a 
function deafin (val, dekluchB, dekluchA) {
  var rez = [], temp;
  if(nodSmath(dekluchA, baseLen)!==1){tooo.style.color = 'Red'} // проверка НОД
  else {tooo.style.color = 'Black'};
  for (var i=0; i<val.length; i++) {
	temp = base.indexOf(val[i]);
	temp -= dekluchB;
	for (var j=0; j<dekluchA*dekluchB; j++) {
		if(temp>=0 && (temp%dekluchA===0)){temp/=dekluchA; break}
		temp +=baseLen;
	}
	rez[i] = base.charAt(temp); 
  }
  return rez;
}



// метод зеркало он же дезеркало
function zerkal(val) {
  var rez = [], temp;
  for (var i=0; i<val.length; i++) {
	temp = base.indexOf(val[i]);
	temp = baseLen-1 - temp;
	rez[i] = base.charAt(temp); 
  }
  return rez;
}


//     Шифр Полибия      базу букв переводит в таблицу заданой ширины.   буквы послания шифрует номерами ряда и столбца в этой таблице.   
// ?? перевести цифры rez в буквы?
function polib(val, kluchB) {
  var rez = [], temp;
  for (var i=0; i<val.length; i++) {
	temp = base.indexOf(val[i]);
	rez.push(Math.floor(temp/kluchB));
	rez.push(" ");
	rez.push(temp%kluchB);
	if(i!=val.length-1){rez.push(" ");}
  }
  return rez;
}

function depolib(val, dekluchB) {
  var rez = [], tempArr = [], temp;
  tempArr = val.split(" "); 
  for (var i=0; i<tempArr.length; i+=2) {       
	temp = tempArr[i]*dekluchB;
	temp += tempArr[i+1]*1;            /////
	rez[i] = base.charAt(temp); 
  }
  return rez;
}




//   Шифр Гронсфельда  
function grons(val, kluchB) {
  var tabRand = tabRandAlf(base, kluchB), rez = [], temp;
  sektab = tabRand; // вынес в глобаль
  for (var i=0; i<val.length; i++) {
	temp = base.indexOf(val[i]);
	temp = tabRand[i%kluchB][temp];
	rez[i] = temp; 
  } 
  return rez;
}

function degrons(val, dekluchB) {
  var rez = [], temp;  
  for (var i=0; i<val.length; i++) {
	temp = sektab[i%dekluchB].join("");
	temp = temp.indexOf(val[i]);
	rez[i] = base.charAt(temp);
  } 
  return rez;
}




//  (лента на палке)   (заготовка для 2D в строку и обратно (возможно изо ... и даже анимац если с таймером и массивом входн значений) ) ???
function lenta (val, kluchB) {
  var rez = [], grup=Math.ceil(val.length/kluchB), temp;
  for (var j=0; j<grup; j++) {
	for (var i=0; i<kluchB; i++) {
	  temp = val[i*grup+j];
	  if(!temp){temp="~"}; 
	  rez.push(temp); 
	}
  } 
  return rez;
}

//  ???  при втором нажатии сделать др вид (ещё флаг?)     ??  учесть перенос строки
 function delenta (val, dekluchB) {
  var rez = [], grup=Math.ceil(val.length/dekluchB), tempval=val.split("");
  flag=grup;                     ////////////
  for (var j=0; j<grup; j++) {
	for (var i=0; i<dekluchB; i++) {
	  rez.push(tempval.shift());
	}
	  rez.push("\n");    // !!   сделал перенос строки
  } 
  return rez;
}


//    пляшущие человечки
function dance(val) {
	flagDance = 1;
	return val.split("");
}
function dedance(val) {
	flagDance = 1;
	return val.split("");
}




//   XOR              см Побитовые операции    ^^
function xorMy (val, kluchB) {
var rez = [], temp, temp1;
  for (var i=0; i<val.length; i++) {
	temp = temp1 = base.indexOf(val[i]);
	temp^=kluchB;
	rez[i] = base.charAt(temp); 
	if(!rez[i]){rez[i] = base.charAt(temp1);} // ?? если буква после кодир получается за пределами базы - оставляем первоначальную.
    }
  return rez;
}




// ???  ещё метод ниже
/*Основание 36 (по количеству букв в английском алфавите — 26, вместе с цифрами, которых 10)   используется для того, чтобы «кодировать» число в виде буквенно-цифровой строки. В этой системе счисления сначала используются цифры, а затем буквы от a до z:       var n = 1234567890; alert( n.toString(36) ); // kf12oi             При помощи такого кодирования можно «укоротить» длинный цифровой идентификатор, н/р чтобы выдать его в качестве URL.
*///==================================================================== 








//////////////// ПЕРЕКЛЮЧЕНИЕ метода шифрования      и оформление  ////////////////

var but1 = document.getElementsByClassName("shifr");     
for (var i = 0; i < but1.length; i++) {
  but1[i].onclick = function () {
// изменить на case ????	
	onnn.style.visibility = 'hidden'
	switch (this.id){
		case '11' : {kakshifr = zesar}  break;  
		case '12' : {kakshifr = afin; onnn.style.visibility = 'visible'} break; 
		case '13' : {kakshifr = zerkal} break; 
		case '14' : {kakshifr = polib} break; 
		case '15' : {kakshifr = grons} break; 
		case '16' : {kakshifr = lenta} break; 
		case '17' : {kakshifr = dance} break; 
		case '18' : {kakshifr = xorMy} break; 
	} 
	for (var i = 0; i < but1.length; i++) {
	  but1[i].style.color='Black';
	}
  this.style.color='Red';
  }
}


var but2 = document.getElementsByClassName("deshifr");     
for (var i = 0; i < but2.length; i++) {
  but2[i].onclick = function () {
	tooo.style.visibility = 'hidden'
	flag=0;
	switch (this.id){
		case '21' : {kakDeshifr = dezesar}  break;  
		case '22' : {kakDeshifr = deafin; tooo.style.visibility = 'visible'} break; 
		case '23' : {kakDeshifr = zerkal} break; 
		case '24' : {kakDeshifr = depolib} break; 
		case '25' : {kakDeshifr = degrons} break; 
		case '26' : {kakDeshifr = delenta} break; 
		case '27' : {kakDeshifr = dedance} break; 
		case '28' : {kakDeshifr = xorMy} break; 
	} 
	for (var i = 0; i < but2.length; i++) {
	  but2[i].style.color='Black';
	}
  this.style.color='Red';
  }
}
//====================================================================









////////////////////////////// ДОПОЛНИТЕЛЬНО  /////////////////////////
// НОД
function nodSmath(x, y) {
  while ((x!=0)&&(y!= 0)) {
	if (x > y) x %= y;
	else y %= x;
  }
  var result= x + y;
  return result;
}




              //  для метода  (Шифр Гронсфельда)
// my  можно упростить?  !!  случайный алфавит без повторений
var dop = "0123456789";
function randAlf(base) {
  var tempbase = base, rezbase = [], ind, ser=tempbase.length, temp;
  for (var i=0; i<ser; i++) {
	 ind = Math.floor( Math.random()*tempbase.length)
	 rezbase.push(tempbase[ind]);
	 temp = tempbase.split(tempbase[ind]);
	 tempbase = temp[0]+temp[1];
  }
  return rezbase;
}
                // таблица случ алфавитов   ?? (нужно бы ещё случайно переставить местами строки )
function tabRandAlf(base, num) {
  var reztab=[];
  for (var i = 0; i < num; i++) {
	reztab.push(randAlf(base));
  }
  return reztab;
}




/*document.write(base.length);   document.write("<br>");
*/

           







