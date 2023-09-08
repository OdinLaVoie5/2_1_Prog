// ЦИКЛ.   ( ФОРМАЛЬНЫЕ СИСТЕМЫ )
//  БЕЗ ПОВТОРОВ

// ?? статистика - подсчёт какой уровень самый богатый, бедный? самое короткое, длинное выражение ... ... ...
//  всю картину оформить как в mui_zikl_1.js.   + убирать кнопкой  ... ...
// ways заменить строковым массивом  ??


/////////////////////////////////////////////////////////////////////////
/////////////// ПЕРЕМЕННЫЕ  ?? сделать пользоват ввод///////////////////
/////////////////////////////////////////////////////////////////////////
 // stopWord огранич ф-ций преобразования (см) на длину входа или выхода нужно для всех ф-ций  ??
var start = "MUIIUUI", fin = "MU", stopWord = 11;    //начальн и конечн выражения.   ?? если fin "" то поиск не ограничен нахождением fin. (+ учесть вычисл способн конкретных брауза и компа).  
// ?? юзер ввод  +  в выражении убирать случ пробелы везде ?
stopWord = Math.max(stopWord, start.length, fin.length);
var arrFnc=[UU,III,I,M];                  // МАССИВ ФУНКЦИЙ 
var stopLewels=1000000;  // ограничение  уровней ??
var flagRepeat = 0;    // c повторениями выражений  1 ??


var arrDekor = [["&nbsp;",""],["<span style='color:LightGreen'> =", "=> </span>"],[""," "],["",""]]; //  вставки декора    ?? + анимация?
var typeDekor = [2]; // указать какой столб пропустить через зпт 0,1,2,3.  
//,"s" - simple вывод без прикрас
// показ цепью ??




/////////////////////////////////////////////////////////////////////////
//////////////////////////  ГЛАВНАЯ    //////////////////////////////////
/////////////////////////////////////////////////////////////////////////
function MUI (){	

	/////////////// Константы ////////////////
	var hash=[], lewel=[], ways=[];  //, arrFin=[]
	var word="", fncs=[], acts="" ; // j, k, m
	lewel[start] = start;   ways[start] = [[]];

	///////////    ПЕРЕБОР уровней   /////////// 
	out: for (var i=0; i <= stopLewels; i++) { 
		if (start==fin) { ///// если на старте уже финишное выражение  
			ways[fin]=[0, "idiot"]; 
			break;
		}
		//arrFin[i]=[];  
	
		///////// ПЕРЕБОР всех выражений в уровне /////////
		var j=0;		// ?
		for (var key in lewel){
			word = key; 	

			//if (word==fin){break out};  /////////// ОСТАНОВ ЕСЛИ НАЙДЕНО см ниже ?? или нет.
			//arrFin[i][j]=[];  
			

			//   с повторами или без   //
			if (!hash[word] || flagRepeat) {   // ?? избежание повторов. с повторами нужно устроить добавочные ways 
			
				//////// ПЕРЕБОР всех ф-ций ////////
				for (var k=0; k < arrFnc.length; k++) {    
					//arrFin[i][j][k]=[];  fncs=[];
					if (word!=fin){fncs = arrFnc[k](word)};  //////////// ОСТАНОВ ЕСЛИ НАЙДЕНО см выше  ?? 
					
					////// ПЕРЕБОР всех применений ф-ции //////
					for (var m=0; m < fncs.length; m++) {
						acts = fncs[m]?fncs[m]:"";
						//arrFin[i][j][k][m]=acts;  
						
						if ((acts && !lewel[acts]&& !hash[acts]) || flagRepeat){// ?? избежание повторов + см выше
							lewel[acts]=acts;
							
							////////////   ЗАПИСЬ ПУТИ ДОСТИЖЕНИЯ  ДЛЯ КАЖДОГО ВЫРАЖЕНИЯ !! /////////
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
			j++;   // ?
			delete lewel[key];
		}
	}
	if(!ways[fin]) ways[fin]=[];
	dispSmall(ways[fin].slice(1),arrDekor,typeDekor); ///// на дисплей. первая строка пустая-удалил

	//return [arrFin, ways]; // нужен ли снаружи ways ?? 

}
// var disp = MUI();  теперь disp -[arrFin, ways]








/////////////////////////////////////////////////////////////////////////
///////////////////////  ВЫВОД РЕЗУЛЬТАТА  //////////////////////////////
/////////////////////////////////////////////////////////////////////////

///////////////////////// Малый вывод  //////////////////////////////////
function dispSmall (waysFin, arrDekor, typeDekor){
	var str = "", con="", numAll="", numI="";
	var clr0 = "<span style='color:Red'>", clr1 = "</span>";
	var tmpNum = waysFin.length+"";
	var elem = document.getElementById("disp0");
	
	if (waysFin[0]=="idiot"){ // если на входе уже дано искомое выражение.
		elem.innerHTML = "На входе уже дано искомое выражение."; 
		return;
	};
	if (!waysFin[0]){ // если нет вывода
		elem.innerHTML = "Нет вывода."; 
		return;
	};
	if (~typeDekor.indexOf("s")){ // вывод без прикрас
		alert (waysFin); 
		return;
	};
	for (var i=0; i < waysFin.length; i++) { 
		//// нумерация ////
		str += i+1;
		numAll = (waysFin.length+"").length; //выравнивание
		numI = (i+1+"").length;
		var tmp 
		for (var t=0; t < numAll-numI; t++) {str += "&nbsp;"}; // 		
		//// отметка точки приложения ф-ции ////
		var word = waysFin[i][0], punkt0 = waysFin[i][2],  punkt1 = punkt0 + waysFin[i][1].length;
		waysFin[i][0] = word.slice(0,punkt0) + clr0 +  word.slice(punkt0,punkt1) + clr1 + word.slice(punkt1);
		//// вставка декора //// 
		out: for (var j=0; j < waysFin[i].length; j++) {
			for (var k=0; k < typeDekor.length; k++) {
				var ser = typeDekor[k];
				//if (typeof ser != "number") continue; // не нужно.  игнор пропуска !!! my 
				if(j===ser) continue out; // пропуск ненужных рядов
			}str += "<nobr>"   // строчки без переносов
			str += arrDekor[j][0] + waysFin[i][j] + arrDekor[j][1]
		}
		str += "<br>";
	} 
	for (var t=0; t < numAll+1; t++) {str += "&nbsp;"}; // 		
	str +=fin + "<br>"+ "<br>";
	
	//// окончания заголовка ////  в отдельную ф-цию ??
	if (tmpNum[tmpNum.length-2]==1 || /[567890]/.test(tmpNum[tmpNum.length-1])) {con="й"}
	else if (tmpNum[tmpNum.length-1]==1){con="ю"}
	else {con="и"};
	//else if (waysFin.length==1)
	elem.innerHTML = "Выводится за " + waysFin.length + " операци"+ con+"<br>"+ "<br>"; // ?? окончания 
	elem.innerHTML += str;
}


















/////////////////////////////////////////////////////////////////////////
////////////////////// ФУНКЦИИ ПРЕОБРАЗОВАНИЯ  //////////////////////////
/////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////
function UU (word){
	var temp =[];
	for (var m=0; m < word.length-1; m++) {   /////////////////  правило UU
		if (word[m] == "U" && word[m+1] == "U") {  //  && (word.length <= stopWord)
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
		if (word[m] == "I" && word[m+1] == "I"  && word[m+2] == "I" ) {// && (word.length <= stopWord)
			var wordAfter = word.slice(0, m) + "U" + word.slice(m+3);
			temp[m] = wordAfter;
		}
	}
	return temp;
}


/////////////////////////////////////////////////////////////////////////
function I(word){
	var temp =[];
	if ((word[word.length-1] == "I")) {// && (word.length <= stopWord)  //////////////  правило I
		var wordAfter = word + "U";
		temp[word.length-1] = wordAfter; // word.length-, точка приложения ф-ции
	}
	return temp;
}


/////////////////////////////////////////////////////////////////////////
function M(word){
	var temp =[];
	if ((word[0] == "M")&&(word.length <= stopWord)) {  //	//////////  правило M //  ограничение по размеру входного выраж
		var wordAfter =  "M"+ word.slice(1) + word.slice(1);
		if (wordAfter.length <= stopWord)temp[0] = wordAfter;  //  ?? ограничение по размеру выходного выраж
	}
	return temp;
}
