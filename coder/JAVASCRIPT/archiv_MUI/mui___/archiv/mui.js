//  РЕКУРСИЯ.    ( ФОРМАЛЬНЫЕ СИСТЕМЫ )


// с повторами и без.  ??      показать совпадения с start.



/////////////// Константы ///////////////////
var hash=[],     flagJ = 0, numLewel = 0; // ?? 

/////////////// Переменные ///////////////////
var start = "MUIIUUIU", fin = "MUUIIIU",     stopWord = 11; 
hash[start] = start;


// ф-цию оболочку + константы внутрь  ?

// var way = " ";   путь ??  сохранять предысторию прохождения. строкой с разделителем?
// ??  если на входе сразу fin.





var supNum=0;
function MUI (word, fin){

  function UU (word, fin){
	for (var i=0; i < word.length-1; i++) {   //// -1 ? 
	  var markFin1="",markFin2="";
	  if (word[i] == "U" && word[i+1] == "U" ) {  // правило UU
		var temp = word.slice(0, i) + word.slice(i+2);
// 		way += "  UU"
		if (!hash[temp]&&(temp.length <= stopWord)) {   // избежание повторов
		  hash[temp]=temp; 
		  if (temp == fin) { //  достижение цели
			  flagJ = 1; 
			  markFin1 = "<mark style=background-color:orange>"+" !!! ";
			  markFin2 = "</mark>";
		  } 
		  document.write (markFin1+word + "--" + "UU"+ " ");
		  document.write ("<b>"+temp+"</b>"+markFin2+"<br>");
		  supNum++;
		  
		  MUI (temp, fin);
		}
	  }
	}
  }




  function III (word, fin){
	for (var i=0; i < word.length-2; i++) { 
	  var markFin1="",markFin2="";
	  if (word[i] == "I" && word[i+1] == "I"  && word[i+2] == "I") {  // правило III
		var temp = word.slice(0, i) + "U" + word.slice(i+3);
// 		way += "  III"
		if (!hash[temp]&&(temp.length <= stopWord)) {   // избежание повторов
		  hash[temp]=temp; 
		  if (temp == fin) { //  достижение цели
			  flagJ = 1; 
			  markFin1 = "<mark style=background-color:orange>"+" !!! ";
			  markFin2 = "</mark>";
		  } 
		  document.write (markFin1+word + "--" + "III"+ " ");
		  document.write ("<b>"+temp+"</b>"+markFin2+"<br>");
		  supNum++;
		  
		  MUI (temp, fin);
		}
	  }
	}
  }



  function I(word, fin){
	var markFin1="",markFin2="";
	if (word[word.length-1] == "I") {  //////////////  правило I
	  var temp = word + "U";
// 	  way += "  I"
	  if (!hash[temp]&&(temp.length <= stopWord)) {   // избежание повторов
		hash[temp]=temp; 	  
		if (temp == fin) { //  достижение цели
			flagJ = 1; 
			markFin1 = "<mark style=background-color:orange>"+" !!! ";
			markFin2 = "</mark>";
		} 
		document.write (markFin1+word + "--" + "I"+ " ");
		document.write ("<b>"+temp+"</b>"+markFin2+"<br>");
		supNum++;
		
		MUI (temp, fin);
	  }
	}
  }




  function M(word, fin){
	var markFin1="",markFin2="";
	if (word[0] == "M") {  ////////////  правило M 
	  var temp =  "M"+ word.slice(1) + word.slice(1);
// 	  way += "  M"
	  if (!hash[temp]&&(temp.length <= stopWord)) {   // избежание повторов + // ограничение рекурсии. эта ф-ция оч грузит.
		  hash[temp]=temp; 
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


	
	UU(word,fin);III(word,fin);I(word,fin);  M(word,fin);
	
	numLewel++;                                   ////////// ??
	document.write (numLewel + "<br>" + "<br>")
	return flagJ;
}
MUI (start, fin);




var elem ="";  
if (flagJ==0)  {elem = "Нет вывода."}; 
//else

document.write (elem+" /// "+ supNum+"<br>")
// document.write (hash["MUIIU"]+"!!!!!")
 
 
 
 
 
 


 
 
 

