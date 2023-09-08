// ЦИКЛ.   ( ФОРМАЛЬНЫЕ СИСТЕМЫ )
//  БЕЗ ПОВТОРОВ

// ?? подсчёт - какой уровень самый богатый, бедный? самое короткое, длинное выражение... ... ...




/////////////// Константы ///////////////////
var lewel=[], hash=[],   flagJ=0; 
var act=0; 

/////////////// Переменные  ?? сделать пользоват ввод///////////////////
var start = "MUUUIII", fin = "MUI",  stopWord = 11;  
stopWord = Math.max(stopWord, start.length, fin.length); // ограничение длины выражений
var stopLewel=1000000;  // ограничение  M. и уровней
lewel[start] = start;  hash[start] = start;




/////////////////////////////////////////////////////////////////////////
//////////////////////////  ГЛАВНАЯ    //////////////////////////////////
/////////////////////////////////////////////////////////////////////////
var supNum=0;
function MUI (){
	if (start==fin) {
		var elem=document.getElementById("resum");
		elem.innerHTML="На входе уже финальное выражение "+ fin;

		return;
	}
	
	for (var j=1; j < stopLewel; j++) { 
		document.write("<mark>"+" уровень "+ j+"</mark>"+ "<br>");
		 

		for (var word in lewel) { // перебор всех выражений в уровне
		  act = 0; 
		  
		  UU(word, fin, j);
		  III(word, fin, j);
		  I(word, fin, j);
		  M(word, fin, j);
		  
		  if (flagJ) var tmpFlag =j;
		  
		  delete lewel[word]
		  if (act) { 
		  	document.write("<br>"); // разделение меж словами
		  } 
		}

		////// nulLewel (останов если lewel пустой (т.е. методы исчерпаны))
		var nulLewel= 0;
		for (var word in lewel) {
			nulLewel++;
		}		
		if (nulLewel==0) {
			break;  
		}
	}
	
	/////////////  Вывод результатов  //////////////
	var tmp=""; 
	if (flagJ) tmp="Результат на уровне: " +flagJ+" ";
	else tmp="Не выводится."+"<br>";

	tmp+="<br>"+"Всего строк / уровней: " + supNum+ " / " +(j-1) +"<br>"+"<br>";
	
	var elem=document.getElementById("resum");
	elem.innerHTML=tmp;



/*	??  lewel=[], hash=[],   flagJ=0; 
	act=0;  
	 start = "MUIIIU", fin = "MU";    
	 stopWord = 12, stopLewel=100000;        // ограничение  M.
	lewel[start] = start; hash[start] = start;
	
	блок обнуления данных  для тестиравания
*/


}
MUI ()



/////////////////////////////////////////////////////////////////////////
function UU (word, fin, j){
  for (var i=0; i < word.length-1; i++) {   //// -1 ? 
	if (word[i] == "U" && word[i+1] == "U" ) {  ///////  правило UU
	  temp = word.slice(0, i) + word.slice(i+2);
	  if (temp.length > stopWord) { // ограничение  M. эта ф-ция оч грузит.
		return; 
	  }  
	  markAndDisplay (word, fin, temp, j, "UU"+"&nbsp;");
	}
  }       
}


/////////////////////////////////////////////////////////////////////////
function III (word, fin, j){
  for (var i=0; i < word.length-2; i++) {  // word.length-2 ?
	if (word[i] == "I" && word[i+1] == "I"  && word[i+2] == "I") { ////// правило III
	  temp = word.slice(0, i) + "U" + word.slice(i+3);
	  if (temp.length > stopWord) { // ограничение  M. эта ф-ция оч грузит.
		return; 
	  }  
	  markAndDisplay (word, fin, temp, j, "III");
	}
  }
}


/////////////////////////////////////////////////////////////////////////
function I(word, fin, j){
  if (word[word.length-1] == "I") {          //////////////  правило I
	temp = word + "U";
	if (temp.length > stopWord) { // ограничение  M. эта ф-ция оч грузит.
	  return; 
	}  
	markAndDisplay (word, fin, temp, j, "I"+"&nbsp;"+"&nbsp;");
  }
}


/////////////////////////////////////////////////////////////////////////
function M(word, fin, j){
  if (word[0] == "M") {  ////////////  правило M 
	temp =  "M"+ word.slice(1) + word.slice(1);
	if (temp.length > stopWord) { // ограничение  M. эта ф-ция оч грузит.
	  return; 
	}  
	markAndDisplay (word, fin, temp, j, "M"+"&nbsp;"+"&nbsp;");
  }
}


////////////////////////////////////////////////////////////
function markAndDisplay (word, fin, temp, j, fnc){
	var markFin1=markFin2="";
	if (!hash[temp]) {   // ?? избежание повторов 
	  hash[temp]=temp; 
	  lewel[temp]=temp; 
	  
	  if (temp == fin){
		  flagJ=j; 
		  markFin1 = "<mark style=background-color:orange>";
		  markFin2 = "</mark>"+" !!!";
	  } 
	  var likeSpace = "";            //выравнивание
	  for (var i=0; i < 15-word.length; i++) {  
	  	likeSpace += "&nbsp;"
	  }
	  
	  document.write(markFin1+word + likeSpace + " &#8634;" + fnc + "&rArr; "+"&nbsp;"+"<b>"+temp+"</b>"+markFin2+"<br>");
	  act++; 
	  supNum++;
	}
}




// var way = " ";   путь ??  сохранять предысторию прохождения. строкой с разделителем?






//document.write (benchmarkOSC(9, MUI));      ТЕСТИРОВАНИЕ

