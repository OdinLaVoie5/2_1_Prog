//  РЕКУРСИЯ.    ( ФОРМАЛЬНЫЕ СИСТЕМЫ )      

// ВСЁ ЖЕ ЦИКЛОМ  ОПТИМАЛЬНЕЙ ??  ИДЁТ СЛОЙ ЗА СЛОЕМ.



// wayhash - строковый  нужно ли ??
// сортировка по нумерации строк 2 DOM.  подкраска групп ...
// с ПОВТОРАМИ - первого эл-та    и др ... ... ??   

// ф-ции цвета доделать.  выравнив нумерации и середины
// предварительно результат - text
// div вместо span. A внутри всё в span ы  с class и id.   ?? 



function coverMUI (){
	/////////// ВВОДНЫЕ /////////////  ?? проверка вводных
	var start = "MUIUUII", fin = "MUIUUIIUIUUII",  stopWord = 11; // ограничение длины выражений
	stopWord = Math.max(stopWord, start.length, fin.length); // stopWord не меньше большего из start и fin 
	var arrFunc=[UU,III,I,M];    
	tuningMe(arrFunc);
	
	var hashWord=[] ;  
	hashWord[start] = start;
	var numAll = []; 
	numAll[0] = 0, numAll[1] = 0, numAll[2] = 0;  // общая нумерация.  max цепочка.   флаг yes
	var numLewel	=0
	
	if (start == fin) alert ("start равно fin")
	
	/////////// ВЫВОД  ?  /////////////
	MUI (start, fin, arrFunc, hashWord, stopWord, numAll, numLewel);
	
	if (numAll[2] == 0) {alert ("Не выводится.")};
}
coverMUI();



	
	
	
	
function MUI (word, fin, arrFunc, hashWord, stopWord, numAll, numLewel){
	var flagChain = 1; 
	if (numLewel > numAll[1]) {numAll[1] = numLewel};
	numAll[0]++; 
	numLewel++;

	var finTemp = fin;       // ?? расширение - массив финишных слов?  или меняющееся fin по какойто ф-ции?
	
	////// ПЕРЕБОР Ф-ЦИЙ //////
	for (var i=0; i < arrFunc.length; i++) {
		var arrTemp = arrFunc[i](word); 	// ?? ф-цию строку в матрицу ...

		////// ПЕРЕБОР припенений Ф-ЦИЙ //////
		for (var j=0; j < arrTemp.length; j++) {
			var markFin1 = "", markFin2 = "";
			var wordTemp = arrTemp[j];
			if ((wordTemp!==undefined)&& (wordTemp.length <= stopWord)&& (!hashWord[wordTemp])) {//YES////////////// флаг ?? с повтор или без.  (!hashWord[wordTemp] || flagRepit) 
				if (!flagChain){document.write("<br>")}; ////
				
				hashWord[wordTemp] = wordTemp;
				
				///// YES ///////
				if (wordTemp==fin){
					markFin1 = "<mark style=background-color:orange>"+"!!!&nbsp;";
			  		markFin2 = "</mark>";
					numAll[2] = 1;
				};
				
								
				var tmpClass = markFin1+"<span class='" + word+ "' id='" + wordTemp + "' title='" + wordTemp+ "'>"; 
				// ??      + class нач выраж,  id  второе выражение,   title // потом по клику цепочкой циклом (анимир) выделять ... ... ...
				var tmpNumer = numAll[0]+ "." +numLewel + ". "; // нумерация  /
				var tmpOper = "&nbsp;" + "---" + arrFunc[i].name + "&nbsp;" + j + "--->" + "&nbsp;"
				var tmpStr = tmpClass +tmpNumer +   word + tmpOper +    wordTemp+ "&nbsp;" + "</span>"+markFin2+ "<br>";
				document.write(tmpStr)
				
				MUI(wordTemp, finTemp, arrFunc, hashWord, stopWord, numAll, numLewel);        
				flagChain = 0;
			}
		}
	}	
	//return 
}
	

	
	
	
	
	
 

 
function UU (word){
	var rez =[];
	for (var i=0; i < word.length-1; i++) { 
		if (word[i] == "U" && word[i+1] == "U" ) {  // правило UU
			var temp = word.slice(0, i) + word.slice(i+2);
			rez[i]=temp;
		}
	}
	return rez;
}
UU.typeMe = "-2";   // отнять 2.

function III (word){
	var rez =[];
	for (var i=0; i < word.length-2; i++) { 
		if (word[i] == "I" && word[i+1] == "I"  && word[i+2] == "I") {  // правило III
			var temp = word.slice(0, i) + "U" + word.slice(i+3);
			rez[i]=temp;
		}
	}
	return rez;
}
III.typeMe = "-3+1"; // отнять 3, добавить 1.

function I(word){
	var rez =[];
	if (word[word.length-1] == "I") {  //////////////  правило I
		rez[word.length-1] = word + "U"; // word.length-, точка приложения ф-ции
	}
	return rez;
}
I.typeMe = ".+1"; // после конца добавить одно.

function M(word){
	var rez =[];
	if (word[0] == "M") {  //////////  правило M // M если с повторами бесконечно повтор себя
		rez[0] =  "M"+ word.slice(1) + word.slice(1);
	}
	return rez;
}
M.typeMe = "№*2"; // после начала всё повторить 2 раза
 
 
 
 
 
/////// ПРОВЕРКА на ошибки типа.  И ТИПИЗАЦИЯ ЦВЕТОМ !!! /////////
function tuningMe(arrFunc, arrColor){
	var arrError = [];
	
	for (var i=0; i < arrFunc.length; i++) {
		if (typeof arrFunc[i]!=="function") arrError.push(i) 
	}
	if (arrError.length) alert("Проверьте массив функций. \n Позиции " + arrError +".")
	
	
	/// ?? если ф выдаёт несколько одинаковых результата на разных позициях - сократить, выкинуть лишние...

	if (!arrColor){arrColor = ["Red", "Purple", "Blue", "Green" ]};
	
	
} 
 
 
