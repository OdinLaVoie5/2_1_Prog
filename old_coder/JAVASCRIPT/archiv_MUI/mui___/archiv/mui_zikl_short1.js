// ЦИКЛ.   ( ФОРМАЛЬНЫЕ СИСТЕМЫ )
//  БЕЗ ПОВТОРОВ

// ??  статистика - подсчёт какой уровень самый богатый, бедный? самое короткое, длинное выражение ... ... ...
//  всю картну оформить как в mui_zikl_1.js.   + убирать кнопкой  ... ...



var stopWord = 5;   // ограничение ф-ций  ?? 



/////////////////////////////////////////////////////////////////////////
//////////////////////////  ГЛАВНАЯ    //////////////////////////////////
/////////////////////////////////////////////////////////////////////////
function MUI (){	
	/////////////// Константы //////////////////
	var hash=[], lewel=[], ways=[] , arrFin=[]; 
	var word="", fncs=[], acts="" ; // j, k, m

	/////////////// Переменные  ??  сделать пользоват ввод///////////////////
	var start = "MUIIIU", fin = "MU";       //начальн и конечн выражения.   
	lewel[start] = start;   ways[start] = [[]];
	var arrFnc=[UU,III,I,M];                  // МАССИВ ФУНКЦИЙ 
	var stopLewels=300;  // ограничение  уровней
	var flagRepeat = 0;    // c повторениями выражений  1.

	///////////    ПЕРЕБОР уровней   /////////// 
	for (var i=0; i <= stopLewels; i++) { 
		arrFin[i]=[];  
	
		///////// ПЕРЕБОР всех выражений в уровне /////////
		var j=0;		
		for (var key in lewel){
			word = lewel[key];
			arrFin[i][j]=[];  
			

			//   с повторами или без   //
			if (!hash[word] || flagRepeat) {   // ??  избежание повторов. с повторами нужно устроить добавочные ways 
			
				//////// ПЕРЕБОР всех ф-ций ////////
				for (var k=0; k < arrFnc.length; k++) {    
					arrFin[i][j][k]=[];  
					fncs = arrFnc[k](word);
					
					////// ПЕРЕБОР всех применений ф-ции //////
					for (var m=0; m < fncs.length; m++) {
						acts = fncs[m]?fncs[m]:"";
						arrFin[i][j][k][m]=acts;  
						
						if ((acts && !lewel[acts]&& !hash[acts]) || flagRepeat){// ??  избежание повторов + см выше
							lewel[acts]=acts;
							
							/////  запись пути достижения  для каждого выражения ////
							arrTemp = []; s=0;
							for (var s=0; s < ways[word].length; s++){
								arrTemp[s]=ways[word][s];
							}
							arrTemp.push([word, arrFnc[k].name, m, acts]);
							ways[acts] = arrTemp;
						}
					}
				}
			}
			hash[word]=word; 
			j++;   
			delete lewel[key];
		}
	}
	
		
	if (ways[fin]) 	alert (ways[fin]) // если путь есть.   ф-цию dispSmall ?
	else alert("Нет вывода.");
	
	return [arrFin, ways]; // нужен ли снаружи ways ??    ф-цию dispBig ?

}
// var disp = MUI();  теперь disp -[arrFin, ways]
// alert (disp[1]["MU"])














/////////////////////////////////////////////////////////////////////////
////////////////////// ФУНКЦИИ ПРЕОБРАЗОВАНИЯ  //////////////////////////
/////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////
function UU (word){
	var temp =[];
	for (var m=0; m < word.length-1; m++) {   /////////////////  правило UU
		if (word[m] == "U" && word[m+1] == "U" ) {  
			var wordAfter = word.slice(0, m) + word.slice(m+2);
			temp[m] = wordAfter;
		}
	}
	return temp;
}


/////////////////////////////////////////////////////////////////////////
function III (word){
	var temp =[];
	for (var m=0; m < word.length-2; m++) {  ////////////// правило III
		if (word[m] == "I" && word[m+1] == "I"  && word[m+2] == "I") { 
			var wordAfter = word.slice(0, m) + "U" + word.slice(m+3);
			temp[m] = wordAfter;
		}
	}
	return temp;
}


/////////////////////////////////////////////////////////////////////////
function I(word){
	var temp =[];
	if (word[word.length-1] == "I") {          //////////////  правило I
		var wordAfter = word + "U";
		temp[word.length-1] = wordAfter; // word.length-, точка приложения ф-ции
	}
	return temp;
}


/////////////////////////////////////////////////////////////////////////
function M(word){
	var temp =[];
	if ((word[0] == "M") && (word.length <= stopWord)) {  ////////////  правило M 
		var wordAfter =  "M"+ word.slice(1) + word.slice(1);
		temp[0] = wordAfter;
	}
	return temp;
}
