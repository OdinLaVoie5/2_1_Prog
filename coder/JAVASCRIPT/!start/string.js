//  ##пример     слова с большой буквы 
function capitalizeWords(string)
{
var tmpStr, tmpChar, preString, postString, strlen;
tmpStr = string.toLowerCase();
stringLen = tmpStr.length;
if (stringLen > 0)
{
  for (i = 0; i < stringLen; i++)
  {
    if (i == 0)
	{
      tmpChar = tmpStr.substring(0,1).toUpperCase();
      postString = tmpStr.substring(1,stringLen);
      tmpStr = tmpChar + postString;
    }
    else
	{
      tmpChar = tmpStr.substring(i,i+1);
      if (tmpChar == " " && i < (stringLen-1))
	  {
      tmpChar = tmpStr.substring(i+1,i+2).toUpperCase();
      preString = tmpStr.substring(0,i+1);
      postString = tmpStr.substring(i+2,stringLen);
      tmpStr = preString + tmpChar + postString;
      }
    }
  }
}
return tmpStr;
}
assert(1,capitalizeWords('КоГда меНя тЫ поЗовёшь'));  //1///////////





//  замена символа другим  ##фрагменты
function replaceCharacters(conversionString,inChar,outChar){
  var convertedString = conversionString.split(inChar);
  convertedString = convertedString.join(outChar);
  return convertedString;
}
assert(1,replaceCharacters('КоГда меНя тЫ поЗовёшь', 'о', 'а'));  //2///////////


//  ##toString(основание)
var eee = 16;
eee.toString()
assert(1, eee.toString(2));   //3///////////////





//  unicode        сравнение строк (символов)
assert('а' > 'Я', 'Я < а символы сравниваются по своим unicode-кодам' ); //4///////////////


//   ( доступ в строке как в массиве )
assert(1, "Я строка"[2] ); //c       //5/////////////////



////    ##indexOf   положение слова в тексте ...
var phrase = "the cat in the hat";
assert(1, phrase.indexOf("cat") +' '+ phrase.indexOf("the",5) +' '
+ phrase.indexOf("dog"));             //6/////////////////
//  ( второй аргумент - от куда вести поиск )   если не найдено   -1   



// Поиск всех вхождений   циклом  !!
var str = "ИаОслИак Иа-Иа посмотрел наИа виадукИа"; // ищем в этой строке
var target = "Иа"; // цель поиска
var pos = -1, rez = [];
while (~(pos = str.indexOf(target, pos + 1))) { // ##конструкт  !!!
  rez.push(pos);
}
assert(1, rez);                  //7/////////////////



assert(1, str.substring(5, 2) +' '+ str.substr(5, 3)  +' '
  + str.slice(2, 5) );          //8/////////////////



//  ##пример  ==============================================================
//  Первую букву  - большую
function ucFirst(str) {
if (!str) return str;  // пустая строка в логическом контексте даст false
return   str.replace ('в', 'В')               // концепт
//return  str[0].toUpperCase() + str.slice(1);  // концепт1
}
//kkk    alert (ucFirst('вася')); 

// (множественный поиск)  (спам)
function checkSpam(str) {
  var lowerStr = str.toLowerCase();
  return !!(~lowerStr.indexOf('viagra')||~lowerStr.indexOf('xxx'));// ##конструкт  !!
}
/*alert( checkSpam('buy ViAgRA now') );
alert( checkSpam('free xxxxx') );
alert( checkSpam("innocent rabbit") );
*/

// Усечение строки !!
function truncate(str, maxlength) {
return (str.length > maxlength) ?
str.slice(0, maxlength - 3) + '...' : str;
}
// alert( truncate("Вот, что мне хотелось бы сказать на эту тему:", 20) )//=========================================================================



















//////////////////////////////////////////////////////////////////////////
//////   !!!      ПРОБЛЕМНОЕ ПРЕДЛОЖЕНИЕ       1 несколько пробелов (checkDblSpaceOSC).    2 нет пробела после массив знаков (см) (checkPointNoSpace).     3 не нужный пробел перед точкой (checkSpacePoint).         4 нет заглавных букв после точки.       
//  ???         а если большие буквы вдруг не в начале предложения? и не в начале слова?         сделать разн режимы ф-ции. (look).     
//   ????  \S+\.\S+\.  поиск сокращений (где не надо строчных букв) (нужно исключить '... )   hкh.frh.         3 точки как троеточие?

var vot = " - Да видел я .интересно ,откуда !деньги …доставать ...заняться бизнесом ? да, . ";
var signPunctuationComma  = [".", "!", "?", "…", ","];       //  массив знаков.    ??  но после троеточия не всегда ведь с больш буквы?
var signPunctuation  = [".", "!", "?", "…"];     



///////  Ставит пробел после .
function checkPointNoSpace (sentence, sign) {
  var arrSentence = [];
  for (k = 0; k < sign.length; k++){
	arrSentence = sentence.split(sign[k]);
	for (i = 0; i < arrSentence.length; i++){
	  if (arrSentence[i] && (arrSentence[i][0] !== " "))  {
		  arrSentence[i] = " " + arrSentence[i];
	  } 
	}
	sentence = arrSentence.join(sign[k])
  }
  return (sentence);
}




///////  Убирает пробел перед .   +   желательно предварительно checkDblSpaceOSC (вдруг несколько пробелов)
function checkSpacePoint (sentence, sign) {
  var arrSentence = [];
  for (k = 0; k < sign.length; k++){
	arrSentence = sentence.split(sign[k]);
	for (i = 0; i < arrSentence.length; i++){
	  var len = arrSentence[i].length;
	  if (arrSentence[i][len-1] === " ") {arrSentence[i] = arrSentence[i].substring(0, len-1);}
	}
	sentence = arrSentence.join(sign[k])
  }
  return (sentence);
}




///////  Ставит заглавные (строчные ) буквы после . 
function checkNoCapitalLetters (sentence, sign) { 
  var arrSentence = [];
  for (k = 0; k < sign.length; k++){
	arrSentence = sentence.split(sign[k]);
	for (i = 0; i < arrSentence.length; i++){
	  for (j = 0; j < arrSentence[i].length; j++){
		if (arrSentence[i][j] !== " "){
		  arrSentence[i] = arrSentence[i][j].toUpperCase() + arrSentence[i].substring(j+1); 
		  for (m = 0; m < j; m++) arrSentence[i] = " " + arrSentence[i];
		  break;    
		}
	  }
	}
	sentence = arrSentence.join(sign[k])
  }
  return (sentence);
}


assert(1, checkSpacePoint(vot, signPunctuationComma)); 








