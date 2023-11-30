//  РЕКУРСИЯ.    ( ФОРМАЛЬНЫЕ СИСТЕМЫ )      всё же циклом  оптимальней ???  идёт слой за слоем.


// ??? wayhash - строковый
// сортировка по нумерации строк 2 DOM.  подкраска групп ...
// ??   с повторами - первого эл-та    и др ... ... 



function coverMUI (){
	/////////// ВВОДНЫЕ /////////////  ??? проверка вводных
	var start = "MUUIUUIUIMUU", fin = "",  stopWord = 10; // stopWord не меньше большего из start и fin ???
	var arrFunc=[UU,III,I,M];    
	
	var hashWord=[] ;  
	hashWord[start] = start;
	var numAll = []; 
	numAll[0] = 0, numAll[1] = 0;  // общая нумерация.   max цепочка.
	var numLewel	=0
	
	/////////// ВЫВОД  ?  /////////////
	MUI (start, fin, arrFunc, hashWord, stopWord, numAll, numLewel);
	
}
coverMUI();



	
	
	
	
function MUI (word, fin, arrFunc, hashWord, stopWord, numAll, numLewel){
	var flagChain = 1; 
	if (numLewel > numAll[1]) {numAll[1] = numLewel};
	numAll[0]++; 
	numLewel++;

	var finTemp = fin;       // ?? расширение - массив финишных слов?  или меняющееся fin по какойто ф-ции?
	for (var i=0; i < arrFunc.length; i++) {
		var arrTemp = arrFunc[i](word); 	// ?? ф-цию строку в матрицу ...

		for (var j=0; j < arrTemp.length; j++) {
			var wordTemp = arrTemp[j];
			if ((wordTemp!==undefined)&& (wordTemp.length <= stopWord)&& (!hashWord[wordTemp])) {//YES////////////// флаг ????? с повтор или без.  (!hashWord[wordTemp] || flagRepit) 
				hashWord[wordTemp] = wordTemp;
				
				if (!flagChain){document.write("<br>")}; ///////
				
				var tmpClass = "<span class='" + word+ "' id='" + wordTemp + "' title='" + wordTemp+ "'>"; // ?????      + class нач вырах,  id  второе выражение,   title // потом по клику цепочкой циклом (анимир) выделять ... ... ...
				var tmpNumer = numAll[0]+ "." +numLewel + ". "; // нумерация  /
				var tmpOper = "&nbsp;" + "---" + arrFunc[i].name + "&nbsp;" + j + "--->" + "&nbsp;"
				var str = tmpClass +tmpNumer +   word + tmpOper +    wordTemp+ "&nbsp;" + "</span>"+ "<br>";
				document.write(str)
				
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

function I(word){
	var rez =[];
	if (word[word.length-1] == "I") {  //////////////  правило I
		rez[word.length-1] = word + "U"; // word.length-, точка приложения ф-ции
	}
	return rez;
}

function M(word){
	var rez =[];
	if (word[0] == "M") {  //////////  правило M // M если с повторами бесконечно повтор себя
		rez[0] =  "M"+ word.slice(1) + word.slice(1);
	}
	return rez;
}

 
 
 
 
/*  function M(word, fin){
	var markFin1="",markFin2="";
	if (word[0] == "M") {  ////////////  правило M 
	  var temp =  "M"+ word.slice(1) + word.slice(1);
// 	  way += "  M"
	  if (!hashWord[temp]&&(temp.length <= stopWord)) {   // избежание повторов + // ограничение рекурсии. эта ф-ция оч грузит.
		  hashWord[temp]=temp; 
		  if (temp == fin) { //  достижение цели
			  flagJ = 1; 
			  markFin1 = "<mark style=background-color:orange>"+" !!! ";
			  markFin2 = "</mark>";
		  } 
		  document.write (markFin1+word + "--" + "M"+ " ");
		  document.write ("<b>"+temp+"</b>"+markFin2+"<br>");
		  supNum++;
		
		  MUI (temp, fin);
	  }
	}
  }
*/