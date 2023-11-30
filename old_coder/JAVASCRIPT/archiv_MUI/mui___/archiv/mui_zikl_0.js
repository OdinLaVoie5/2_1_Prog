// ЦИКЛ.   ( ФОРМАЛЬНЫЕ СИСТЕМЫ )
//  без повторов
// ??  подсчёт - какой уровень самый богатый, бедный? самое короткое, длинное выражение... ... ...


/////////////// Константы ///////////////////
var lewel=[], hash=[],   flagJ=0; 
var act=0;  

/////////////// Переменные ///////////////////
var start = "MUI", fin = "",     stopWord = 12;    
var stopLewel=1000000;        // ограничение  M.
lewel[start] = start; hash[start] = start;



/////////////////////////////////////////////////////////////////////////
//////////////////////////  ГЛАВНАЯ    //////////////////////////////////
/////////////////////////////////////////////////////////////////////////
var supNum=0;
function MUI (){
	if (start==fin) {
		document.write ("На входе уже финальное выражение");
		return;
	}
	for (var j=1; j < stopLewel; j++) {  
		document.write ("<mark>"+"//////////////////////////////////////////// уровень "+ j+" ///////////////////////////////////////////"+"</mark>"+ "<br>");

		for (var word in lewel) { // перебор всех выражений в уровне
		  act = 0; 
		  UU(word, fin, j);
		  III(word, fin, j);
		  I(word, fin, j);
		  M(word, fin, j);
	
		  delete lewel[word]
		  if (act) { 
		  	document.write ("<br>"); // разделение меж словами
		  } 
		}

		////// nulLewel (останов если lewel пустой (т.е. методы исчерпаны))
		var nulLewel= 0;
		for (var word in lewel) {
			nulLewel++;
		}		
		if (nulLewel<1) {
			break;  
		}
	}
	
	/////////////  Вывод результатов  //////////////
	if (flagJ) document.write("<br>"+"Результаты на уровнe: "+flagJ+" "+"<br>");
	else document.write("<br>"+"Нет вывода. ");
	




}

MUI ()






/////////////////////////////////////////////////////////////////////////
function UU (word, fin, j){
  for (var i=0; i < word.length-1; i++) {   //// -1 ? 
	var markFin1=markFin2="";
	if (word[i] == "U" && word[i+1] == "U" ) {  ///////  правило UU
	  var temp = word.slice(0, i) + word.slice(i+2);
	  if (temp.length > stopWord) { // ограничение  
		return; 
	  }  
	  if (!hash[temp]) {   // избежание повторов
		hash[temp]=temp; 
		lewel[temp]=temp; 
		if (temp == fin){
			flagJ=j; 
			markFin1 = "<mark style=background-color:orange>"+" !!! ";
			markFin2 = "</mark>";
		} 
		document.write (markFin1+word + " --- " + " UU ");
		
		supNum++;
		document.write (" >>> "+"<b>"+temp+"</b>"+markFin2+"<br>");
		// вынести. с повторами. ??  достижение цели
		act++;
	  }
	}
  }       
}


/////////////////////////////////////////////////////////////////////////
function III (word, fin, j){
  for (var i=0; i < word.length-2; i++) {  
	var markFin1=markFin2="";
	if (word[i] == "I" && word[i+1] == "I"  && word[i+2] == "I") { ////// правило III
	  var temp = word.slice(0, i) + "U" + word.slice(i+3);
	  if (temp.length > stopWord) { // ограничение  
		return; 
	  }  
	  if (!hash[temp]) {   // избежание повторов
		hash[temp]=temp; 
		lewel[temp]=temp; 
		if (temp == fin){
			flagJ=j; 
			markFin1 = "<mark style=background-color:orange>"+" !!! ";
			markFin2 = "</mark>";
		} 
		document.write (markFin1+word + " --- " + " III "+"&nbsp;");
		
		supNum++;
		document.write (" >>> "+"<b>"+temp+"</b>"+markFin2+"<br>");
		//  достижение цели
		act++;
	  }
	}
  }
}


/////////////////////////////////////////////////////////////////////////
function I(word, fin, j){
  var markFin1=markFin2="";
  if (word[word.length-1] == "I") {          //////////////  правило I
	var temp = word + "U";
	if (temp.length > stopWord) { // ограничение 
	  return; 
	}  
	if (!hash[temp]) {   // избежание повторов
	  hash[temp]=temp; 	 
	  lewel[temp]=temp; 
	  if (temp == fin){//  достижение цели
		  flagJ=j; 
		  markFin1 = "<mark style=background-color:orange>"+" !!! ";
		  markFin2 = "</mark>";
	  } 
	  document.write (markFin1+word + " --- " + " I "+"&nbsp;"+"&nbsp;"+"&nbsp;");
	  
	  supNum++;
	  document.write (" >>> "+"<b>"+temp+"</b>"+markFin2+"<br>");
	  
	  act++;
	}
  }
}


/////////////////////////////////////////////////////////////////////////
function M(word, fin, j){
  var markFin1=markFin2=""; // маркировка
  if (word[0] == "M") {  ////////////  правило M 
	var temp =  "M"+ word.slice(1) + word.slice(1);
	if (temp.length > stopWord) { // ограничение  M. эта ф-ция оч грузит.
	  return; 
	}  
	if (!hash[temp]) {  // избежание повторов
	  hash[temp]=temp; 
	  lewel[temp]=temp; 
	  if (temp == fin){//  достижение цели
		  flagJ=j; 
		  markFin1 = "<mark style=background-color:orange>"+" !!! ";
		  markFin2 = "</mark>";
	  } 
	  document.write (markFin1+word + " --- " + " M "+"&nbsp;");
	  
	  supNum++;
	  document.write (" >>> "+"<b>"+temp+"</b>"+markFin2+"<br>");
	  
	  act++;
	}
  }
}

document.write (supNum);





// var way = " ";   путь (см mui1.js ?? )  ??   сохранять предысторию прохождения. строкой с разделителем?






