// ЦИКЛ.   ( ФОРМАЛЬНЫЕ СИСТЕМЫ )
//  БЕЗ ПОВТОРОВ

// ??? статистика - подсчёт какой уровень самый богатый, бедный? самое короткое, длинное выражение ... ... ...
//  всю картну оформить как в mui_zikl_1.js.   + убирать кнопкой  ... ...



var stopWord = 5;   // ограничение ф-ций  ?? 



/////////////////////////////////////////////////////////////////////////
//////////////////////////  ГЛАВНАЯ    //////////////////////////////////
/////////////////////////////////////////////////////////////////////////
function MUI (){	
	/////////////// Константы //////////////////
	var hash=[], lewel=[], ways=[] , arrFin=[]; 
	var word="", fncs=[], acts="" ; // j, k, m

	/////////////// Переменные  ??? сделать пользоват ввод///////////////////
	var start = "MUIUIIUUIII", fin = "MU";       //начальн и конечн выражения.   
	lewel[start] = start;   ways[start] = [start];
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
			if (!hash[word] || flagRepeat) {   // ??? избежание повторов. с повторами нужно устроить добавочные ways 
			
				//////// ПЕРЕБОР всех ф-ций ////////
				for (var k=0; k < arrFnc.length; k++) {    
					arrFin[i][j][k]=[];  
					fncs = arrFnc[k](word);
					
					////// ПЕРЕБОР всех применений ф-ции //////
					for (var m=0; m < fncs.length; m++) {
						acts = fncs[m]?fncs[m]:"";
						arrFin[i][j][k][m]=acts;  
						
						if ((acts && !lewel[acts]&& !hash[acts]) || flagRepeat){// ??? избежание повторов + см выше
							lewel[acts]=acts;
							
							
							ways[acts]=[];
							for(var s=0; s < ways[word].length; s++){
								ways[acts][s]=ways[word][s];
							}
							ways[acts].push(arrFnc[k].name);
							ways[acts].push(m); 
							ways[acts].push(acts); 
						}
					}
				}
			}
			hash[word]=word; 
			j++;   
			delete lewel[key];
		}
	}
	
	dispSmall(ways[fin],4,1); ///// на дисплей. 4-х звеная цепь, с накладкой 1 эл. ??
	
/*	if (ways[fin]) 	document.write (ways[fin]) // если путь есть - показать ф-цию dispSmall ?
	else document.write ("Нет вывода.");
*/	
	return [arrFin, ways]; // нужен ли снаружи ways ??    ф-цию dispBig ?

}
// var disp = MUI();  теперь disp -[arrFin, ways]
// alert (disp[1]["MU"])








function dispSmall (waysFin, chain, imposit){
	var str ="", num=0;
	var elem = document.getElementById("disp0");
	
	if (waysFin){
		num = (waysFin.length-imposit)/(chain-imposit);  
		// число операций
		
		for (var i=0; i <= num; i++) {
			str += waysFin[3*i];
			waysFin[3*i+1]?str += "&nbsp;"+ "<span style='color:rgb(150,230,150)'>" + "=" +	waysFin[3*i+1]:"";
			waysFin[3*i+2]?str += "_" +	waysFin[3*i+2] + "&rArr;" +	"</span>" + " ":"";
		};
	
		elem.innerHTML = "Выводится за " + num + " операций:"+ "<br>";
		elem.innerHTML += str+ "<br>";
	}
	else  elem.innerHTML = "Нет вывода"+ "<br>";
}


function dispSmall (waysFin, chain, imposit){
	var str ="", num=0, cikl =0;
	cikl = chain-imposit;
	var elem = document.getElementById("disp0");

	if (waysFin){
		num = (waysFin.length-imposit)/cikl;  
		// число операций
		var arrSign = ["",  "&nbsp;"+ "<span style='color:rgb(150,230,150)'>" + "=",   "_",   ];
		
		
		for (var i=0; i <= num; i++) {
	/*		for (var j=0; j < cikl; j++) {
				if (waysFin[cikl*i+j] && ...)
				waysFin[cikl*i+j]
			}
	*/		
			str += waysFin[3*i];
			waysFin[3*i+1]?str += "&nbsp;"+ "<span style='color:rgb(150,230,150)'>" + "=" +	waysFin[3*i+1]:"";
			waysFin[3*i+2]?str += "_" +	waysFin[3*i+2] + "&rArr;" +	"</span>" + " ":"";
		};
	
		elem.innerHTML = "Выводится за " + num + " операций:"+ "<br>";
		elem.innerHTML += str+ "<br>";
	}
	else  elem.innerHTML = "Нет вывода"+ "<br>";
}









//  ф-цию дисплей ???,        		flag = 1, 	if (flag){break out;}  // останов    // ??? при достижении fin дальше не участвует - выбор, ввод
			//document.write("<br>")
			//if (!hash[word])     { document.write("//////////"+word+"<br>")};
			//document.write("&nbsp; "+j+"-------------------------------- "+"<br>");







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
