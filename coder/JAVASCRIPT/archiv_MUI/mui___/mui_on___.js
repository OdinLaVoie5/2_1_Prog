// ЦИКЛ.   ( ФОРМАЛЬНЫЕ СИСТЕМЫ )      !!!!!
// ЦИКЛОМ ОПТИМАЛЬНЕЙ чем рекурсией ??  ИДЁТ СЛОЙ ЗА СЛОЕМ.  


// кнопку "наверх" ???

//случай когда после операции выражене исчезает совсем (н/р UU).   + операции с пустотой ???
// ???   нулевая операция с М ??      операция над одиночным выраж - порно с подсветк в слове.

// ?? как узнать расходится ли цепочка или сходится?
// юзер цветовые ... стили ...

// ?? статистика - подсчёт какой уровень самый богатый, бедный? самое короткое, длинное выражение ... ... ...

// ways заменить строковым массивом  ?????




////// РЕЖИМЫ: 0 БЕЗ ПОВТОРОВ,     1 С ПОВТОРАМИ НА УРОВНЕ,    2 С ОБЩИМИ ПОВТОРАМИ.  ???




/////////////////////////////////////////////////////////////////////////
//////////////////////////  ГЛАВНАЯ    //////////////////////////////////
/////////////////////////////////////////////////////////////////////////
function MUI (){									

	/////////  ДАННЫЕ   // ??? юзер ввод  ??? проверка вводных + в выражении убирать случ пробелы везде ?
	var start = "MUIIIUUUI", fin = "MUIUIU"; // юзер //  ??? если какой-нибудь эл-т нулевой(какой id сделать?)
	
	//// МАССИВ СТОПОВ [max слева, max справа,  min слева, min справа] 
	// рекомендация - изменять только arrStop[1] (не больше 18)
	var arrStop = [100, 11, 0, 0]; // юзер  ограничение длины выражений
	arrStop[0] = Math.min(arrStop[0], arrStop[1]);  	arrStop[2] = Math.max(arrStop[2], arrStop[3]);
	arrStop[0] = Math.max(arrStop[0], start.length, fin.length);  	arrStop[1] = Math.max(arrStop[1], start.length, fin.length);
	arrStop[2] = Math.min(arrStop[2], start.length, fin.length);  	arrStop[3] = Math.min(arrStop[3], start.length, fin.length);

	//?? (+ учесть вычисл способн конкретных брауза и компа)).  
	var arrFnc=[UU, III, I, M]; //// МАССИВ ФУНКЦИЙ  юзер
	var arrFncColor = ["Red", "rgb(255,0,255)", "rgb(0,255,255)", "rgb(0,255,0)"];  // цвета ф-ций + юзер ввод ???
	
	///// ФЛАГИ ограничения  /////
	var stopLewels=500000;  //ограничение  уровней - если без повторов не нужно.
	var flagRepeatLewel = 1, flagRepeatAll = 0; // юзер  c повторениями выражений на УРОВНЕ и вообще.  1.
	if (flagRepeatAll) {
		flagRepeatLewel = 1 //?? нужно ли связывать? //если общие повторы да, то и на уровне тоже.
		stopLewels = 30; // ?? ограничение уровней если c повторами.
	};
	var flagBreakYes = 0; // юзер  останов при нахождении fin  - 1(на уровне), 2(на слове)   
	if (fin == undefined) {flagBreakYes = 0}; // если fin "" то поиск не ограничен  нахождением fin.
//////  ПОВТОР  ???       + возникновение разных? циклов.   

// ФУНКЦИ  - должны выдавать 1 массив строк   2 без повторов	
/*function tuningMe(arrFunc, arrColor){
	var arrError = [];
	
	for (var i=0; i < arrFunc.length; i++) {
		if (typeof arrFunc[i]!=="function") arrError.push(i) 
	}
	if (arrError.length) alert("Проверьте массив функций. \n Позиции " + arrError +".")
	
	/// ????? если ф выдаёт несколько одинаковых результата на разных позициях - сократить, выкинуть лишние.     но но если важна точка приложения ф-ции - то не сокращать, а точку както передаватьь ...
	if (!arrColor){arrColor = ["Red", "Purple", "Blue", "Green" ]};
} 
*/
	
	/////////////// ПЕРЕМЕННЫЕ //////////////////
	var hash=[], lewel=[];  // ,ways=[] 
	var arrActs=[], act="" ; //    k, m
	lewel[0] = [start], hash[start] = start;      // ways[start] = [[]];,  
	var numAll = 0, numberYes = 0; 
	var limitInfo = "";
	var arrRepitLewel = []; // массив повторов на уровне
	var nullAct = 0, arrNullAct = []; // флаг-все операции мимо, и массив реальных тупиков 
	
	/////// МАССИВ ИНФО (экстремумы ...) ///////  передаётся в dispBig // внести ещё флаги ... ??
	var infoMaxMin = []; 
	infoMaxMin["maxFncName"] = 0;  // макс длина имени ф-ций
	infoMaxMin["fnc"] = arrFnc;  //  ф-ции
	infoMaxMin["fncColor"] = arrFncColor;  // цвета ф-ций
	infoMaxMin["maxAct"] = 0;  // макс длина выражения реально
	infoMaxMin["numYes"] = 0;  // номер нахождения  yes
	infoMaxMin["lewelYes"] = 0;  // уровень нахождения  yes   ещё 2 infoMaxMin ниже
	infoMaxMin["stop"] = arrStop;  // уровень нахождения  yes   ещё 2 infoMaxMin ниже
	/////////////// ВЫВОД  //////////////////
	var arrRez = [], arrRezTemp = [];
	
	/// если на старте уже финишное выражение ///
	if (start==fin) { 
		// ways[fin]=[0, "idiot"]; 
		// break;
		alert ("start==fin")  ///  ???  перенести в вывод?
	}

	///////////    ПЕРЕБОР уровней   /////////// 
	for (var i=1; i < stopLewels; i++) {  ///
		lewel[i] = [];
		if (!lewel[i-1].length)	break; // если слова кончились - обрыв цикла. не пустой ли lewel

		///////// ПЕРЕБОР всех выражений в уровне /////////
		for (var j=0; j < lewel[i-1].length; j++){ // 
			var word = lewel[i-1][j];
			
			//////// ПЕРЕБОР всех ф-ций ////////
			for (var k=0; k < arrFnc.length; k++) {   

				var arrActs = arrFnc[k](word); 
				//if (arrActs.length) nullAct++;
				var fncName = arrFnc[k].name;
				if (fncName.length > infoMaxMin["maxFncName"]) {infoMaxMin["maxFncName"]=fncName.length}; 

				////// ПЕРЕБОР всех применений ф-ции //////
				for (var m=0; m < arrActs.length; m++) { 
					//// ограничение   + отброс undefined    ?? 
					if (arrActs[m]!= undefined) { 
						nullAct++; 
						if((arrActs[m].length<= arrStop[1]) && (arrActs[m].length >= arrStop[3])) {act = arrActs[m]}
						else act = undefined; 
					}
					else act = undefined; //////

					////  ?? избежание повторов  flagRepeatLewel 	
					var term0 = !hash[act]||flagRepeatAll;	// условие- нет среди общего хеша 
					var term1 = (lewel[i-1].indexOf(act)==-1) || flagRepeatAll;	//- нет среди предыдущ результ				
					var term2 = (lewel[i].indexOf(act)==-1) || flagRepeatLewel;	//- нет среди результ этого же уровня				

					if (term0 && term1 && term2){
						if (act){
							numAll++; // общая нумерация  ?? вынести за if ??
							if (act.length > infoMaxMin["maxAct"]) {infoMaxMin["maxAct"] = act.length};
							if (act==fin){
								infoMaxMin["numYes"]=numAll;  
								infoMaxMin["lewelYes"]=i;
							}; 
							
							
							////ограничение по размеру   + не пускать повторы на след уровень
							if (!arrRepitLewel[act]) arrRepitLewel[act] = act;
							if (lewel[i].indexOf(act)==-1) {
								if ((arrActs[m].length<= arrStop[0]) && (arrActs[m].length >= arrStop[2])) {
									lewel[i].push(act)
								}////запись в крайний столбец 
								else limitInfo+="L"; //если произошло ограничение по arrStop[0] (arrStop[2])
							}
							// если повтор на уровне (режим - повтор на уровне)
							else arrRepitLewel[act]+= "."
						
							
							// выделение операции в слове
							partWord0 =  word.slice(0, m);  
							partWord1 =  word.slice(m, m+fncName.length); // ??? название ф-ции должно определять действие ф-ции, + методы ф-ции? 
							partWord2 =  word.slice(m+fncName.length);
							
							// ДЕЛАЕМ РЕЗУЛЬТИРУЮЩИЙ МАССИВ 
							arrRezTemp = ["&nbsp;", numAll, i, word, j,   partWord0, partWord1, partWord2,     fncName,     k, m,  arrRepitLewel[act], limitInfo,  "&nbsp;"];
							arrRez.push(arrRezTemp);// нужны ли в массиве j и k?  
							
							infoMaxMin["maxNumAll"] = numAll;  // макс нумерация
							infoMaxMin["maxI"] = i;  //  макс уровней
							limitInfo = "";
							
						}
					}			
				}
			}
			infoMaxMin["arrNullAct"] = arrNullAct;  

			if (infoMaxMin["numYes"] && flagBreakYes==2){break} ////////// ОСТАНОВ ЕСЛИ НАЙДЕНО (обрыв на слове)
			hash[word]=word; 
			if (!nullAct) {arrNullAct.push(word)};
			nullAct = 0;
		}
		if (infoMaxMin["numYes"] && flagBreakYes){break} ////////// ОСТАНОВ ЕСЛИ НАЙДЕНО (уровень довершается)
	}	
	
/*	if(!ways[fin]) ways[fin]=[];
	dispSmall(ways[fin].slice(1),arrDekor,typeDekor); ///// на дисплей. первая строка пустая-удалил
*/


	///  ???  сделать ф-цию сортировки, групировки таблицы ...
	dispBig (arrRez, fin, infoMaxMin); 
	
	
	return arrRez; /////  //return ways; // нужен ли снаружи ways ??    
}
			






/////////////////////////////////////////////////////////////////////////
////////////////   ВЫВОД РЕЗУЛЬТАТА  в виде таблицы  !!! ////////////////
/////////////////////////////////////////////////////////////////////////
function  dispBig(arrRez, fin, infoMaxMin){
	var arrIgnor = [3,4,9,10];  // массив игнора столбов  + юзер ввод ???
	
	var textRez = ""; 
	var textUp = "";
	
	var separ = alignTextOSC ( ("<td>"+"&nbsp;"+ "</td>"),arrRez[0].length-3, arrIgnor.length);
	var separ1 = "<tr class='separ1'>" + separ + "</tr>"; // оформ пробела  меж уровнями
	var separ2 = "<tr class='separ2'>" + separ + "</tr>"; // оформ пробела  меж выражениями
	// длина зависит от кол-ва игнор столбцов и объединённых столбцов -2

	///// формирование таблицы /////
	textRez += "<TABLE id='bigtable'>" 
	
	for (var i=0; i < arrRez.length; i++) { ///// СТРОКИ 
		
		///// оформление пробелов  /////
		if (arrRez[i-1] && (arrRez[i-1][2]!=arrRez[i][2])) {textRez += separ1} //  пробел  меж уровнями
		else {
			if (arrRez[i-1] && (arrRez[i-1][3]!=arrRez[i][3])) {textRez += separ2}; // пробел  меж выражениями
		};
		
		textRez += " <tr class='" +  arrRez[i][3] + "' id='" + arrRez[i][11] +"'>"; ///// КЛАСС И ID 
		// !!! class нач выраж, id  второе выражение,  title ??  потом по клику цепочкой циклом (анимир) выделять ... ... ...
		
		
		out: for (var j=0; j < arrRez[i].length; j++) {  ///// СТОЛБЦЫ
			for (var s=0; s < arrIgnor.length; s++) { // цикл игнора столбцов
				if 	(j == arrIgnor[s]) {continue out};
			};
			
			if (j!=6 && j!=7) textRez += "<td>"; // для объединения partWord0, partWord1, partWord2
			if (j==6){textRez += "<span class=" + arrRez[i][8] + ">"}; // выделение цветом. класс по имени ф-ции
			if (j==8){textRez += "--"};
			
			textRez += arrRez[i][j];     ///// собственно значение.

			if (j==1 || j==2){textRez += "." };
			if (j==8){textRez += "--"};
			if (j==6){textRez += "</span>"};
			if (j!=5 && j!=6) textRez += "</td>";
		}
		textRez += "</tr>";
	
	}
	textRez += "</TABLE>"; 
// шаблон таблицы 
//["&nbsp;"    numAll,  i,  word,  j,   partWord0, partWord1, partWord2,     fncName,     k, m,  act     "&nbsp;"]
	
	/// создаём цветовые стили ///
	var styleFnc = "<style> "; 
	for (var s=0; s < infoMaxMin["fnc"].length; s++) {
		if (!infoMaxMin["fncColor"][s]) infoMaxMin["fncColor"][s] = "Goldenrod" // цвет по умолчанию.
		styleFnc+= "." + infoMaxMin["fnc"][s].name + "{color:" + infoMaxMin["fncColor"][s] + ";} "	
	}; 
	styleFnc+="</style> "
	textRez += styleFnc;
	
	
	///// ОКОНЧАТЕЛЬНЫЙ ВЫВОД /////
	
	document.getElementById("textbig").innerHTML=textRez;	// вывод большого результата
			
	document.getElementById("textup11").innerHTML= infoMaxMin["numYes"] + ". "  + infoMaxMin["lewelYes"] + ". "; // резюме верхнее	
	document.getElementById("textup21").innerHTML= infoMaxMin["maxNumAll"] + ". " + infoMaxMin["maxI"] + ". ";	
	

	///// + малый вывод  ///////  ???
	var arrRezSmall = [];
	if (document.getElementById(fin)){
		var rowFin = document.getElementById(fin);
		while (rowFin){
			arrRezSmall.push(rowFin);
			rowFin.firstChild.style.backgroundColor = "Orange";
			rowFin = document.getElementById(rowFin.className);
		};
		document.getElementById(fin).firstChild.style.backgroundColor = "Red";	// подсветка результата
	}
	/////////////////
	illuminatChain (arrRez, arrRezSmall, fin, infoMaxMin);

}






/////////////////////////////////////////////////////////////////////////
///////////////  РЕАКЦИЯ НА НАВЕДЕНИЕ, КЛИК ...    //////////////////////
/////////////////////////////////////////////////////////////////////////
function  illuminatChain (arrRez, arrRezSmall, fin, infoMaxMin){
	// +++  elem.closest('ul > li:last‐child')  parentElement     +parentNode   .rows   .className
	
	var arrElem = [];

	for (var i = 0; i < infoMaxMin["maxNumAll"]; i++) { //  перебор всех строк
	
		var tmpRez = arrRez[i][11];
		if (~arrRez[i][11].indexOf(".")) {
			var tmpR = arrRez[i][11].split(".");
			tmpRez = tmpR[0] // обрезка точек для нахожд id
			document.getElementById(arrRez[i][11]).lastChild.innerHTML = tmpR.length-1; // число повторов (точек) в последний столбец
		}
		
		var tmpLast = document.getElementById(arrRez[i][11]).lastChild
		if(!document.getElementsByClassName(tmpRez).length){tmpLast.style.backgroundColor = "Lightgrey"};  //   подсветка тупиковых выражений
		if (~infoMaxMin["arrNullAct"].indexOf(tmpRez)) {tmpLast.style.backgroundColor = "lightsteelblue"}; //   подсветка реально тупиковых выражений
		
		
		
		

		document.getElementById(arrRez[i][11]).onclick = function illuminatClick(e) {
			var flagBack = 0;
			var elemColor = "Yellow" ; // --- 'rgb('+ Math.floor(Math.random()*255) +','+ Math.floor(Math.random()*255)+','+ Math.floor(Math.random()*255)  +')'   юзер ??? rgb(255,230,242)
			if (~arrElem.indexOf(this)) {flagBack = 1};
			
			for (var j=0; j < arrElem.length; j++) {  ///////// реституция 
				arrElem[j].style.backgroundColor = "White";	
			};
			for (var k=1; k < arrRezSmall.length; k++) {
				if ((!~arrElem.indexOf(arrRezSmall[k]) || flagBack)) arrRezSmall[k].firstChild.style.backgroundColor = "Orange";	
			};			 

			if ( document.getElementById(fin) && ((!~arrElem.indexOf(document.getElementById(fin))) || flagBack))  document.getElementById(fin).firstChild.style.backgroundColor = "Red";
			
			arrElem = [];
			
			
			if (flagBack == 1) {return};/////// второй клик снимает подсветку
			var row = this;   /////// подсветка
			while (row){
				arrElem.push(row);
				row.style.backgroundColor = elemColor;
				row = document.getElementById(row.className);
			};
		};



		document.getElementById(arrRez[i][11]).onmouseover = function illuminatOver(e) {
			var elemColor = "Lavender";   // юзер ?? rgb(255,230,242)
			var row = this;

			while (row){
				row.style.backgroundColor = elemColor;
				row = document.getElementById(row.className);
			};
		}; 

		document.getElementById(arrRez[i][11]).onmouseout = function illuminatOut(e) {
			var elemColor = "White";
			var row = this;
			
			while (row){
				row.style.backgroundColor = elemColor;
				row = document.getElementById(row.className);
			};
			for (var j=0; j < arrElem.length; j++) {
				arrElem[j].style.backgroundColor = "Yellow";	
			};

			
			for (var k=1; k < arrRezSmall.length; k++) { ///////// реституция 
				if (!~arrElem.indexOf(arrRezSmall[k])) arrRezSmall[k].firstChild.style.backgroundColor = "Orange";	
			};
			if (document.getElementById(fin) &&  (!~arrElem.indexOf(document.getElementById(fin))))document.getElementById(fin).firstChild.style.backgroundColor = "Red";
			
			
		};
	}	

}
















/////////////////////////////////////////////////////////////////////////
////////////////////// ФУНКЦИИ ПРЕОБРАЗОВАНИЯ  //////////////////////////
/////////////////////////////////////////////////////////////////////////

/*function UU (word){
	var temp =[];
	for (var m=0; m < word.length-1; m++) {   /////////////////  правило UU
		if (word[m] == "U" && word[m+1] == "U") { 
			var wordAfter = word.slice(0, m) + word.slice(m+2);
			temp[m] = wordAfter;
		}
	}
	return temp;
}
*/ // начальный вариант

function UU (word){
	var temp =[];
	var arrPositionGrupp = allIndexGruppOSC(word, "U", 2)[0]; // массив поззиций групп UU... 	
	for (var m=0; m < arrPositionGrupp.length; m++) {   //////////  правило UU
		var punkt = arrPositionGrupp[m];
		var wordAfter = word.slice(0, punkt) + word.slice(punkt+2);
		temp[punkt] = wordAfter;
	}
	return temp;
}

/////////////////////////////////////////////////////////////////////////
function III (word){
	var temp =[];
	for (var m=0; m < word.length-2; m++) {  ////////////// правило III
		if (word[m] == "I" && word[m+1] == "I"  && word[m+2] == "I" ) {
			var wordAfter = word.slice(0, m) + "U" + word.slice(m+3);
			temp[m] = wordAfter;
		}
	}
	return temp;
}


/////////////////////////////////////////////////////////////////////////
function I(word){
	var temp =[];
	if ((word[word.length-1] == "I")) {//////////////  правило I
		var wordAfter = word + "U";
		temp[word.length-1] = wordAfter; // word.length-, точка приложения ф-ции
	}
	return temp;
}


/////////////////////////////////////////////////////////////////////////
function M(word){
	var temp =[];
	if (word[0] == "M") {  //	//////////  правило M
		var wordAfter =  "M"+ word.slice(1) + word.slice(1);
		temp[0] = wordAfter;  //  
	}
	return temp;
}






/////////////////////////////////////////////////////////////////////////
// кусочки из других концепций

/*///// Малый вывод  ////////////
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
	
	//// окончания заголовка ////  в отдельную ф-цию ???
	if (tmpNum[tmpNum.length-2]==1 || /[567890]/.test(tmpNum[tmpNum.length-1])) {con="й"}
	else if (tmpNum[tmpNum.length-1]==1){con="ю"}
	else {con="и"};
	//else if (waysFin.length==1)
	elem.innerHTML = "Выводится за " + waysFin.length + " операци"+ con+"<br>"+ "<br>"; // ??? окончания 
	elem.innerHTML += str;
}
*/




/*	var arrDekor = [["&nbsp;",""],["<span style='color:LightGreen'> =", "=> </span>"],[""," "],["",""]]; //  вставки декора    ?? + анимация?
	var typeDekor = [2, 3]; // указать какой столб пропустить через зпт 0,1,2,3.  
	//,"s" - simple вывод без прикрас
	// показ цепью ???
*/
/*var finTemp = fin;*/  // ?? расширение - массив финишных слов?  или меняющееся fin по какойто ф-ции?
// hashlewel[acts] ??

/*	//// окончания заголовка ////  в отдельную ф-цию ??
	if (tmpNum[tmpNum.length-2]==1 || /[567890]/.test(tmpNum[tmpNum.length-1])) {con="й"}
	else if (tmpNum[tmpNum.length-1]==1){con="ю"}
	else {con="и"};
	//else if (waysFin.length==1)
	elem.innerHTML = "Выводится за " + waysFin.length + " операци"+ con+"<br>"+ "<br>"; // ?? окончания
	elem.innerHTML += str;
*/
/*dispSmall(ways[fin],4,1);*/ ///// на дисплей. 4-х звеная цепь, с накладкой 1 эл. ??
/*function dispSmall (waysFin, chain, imposit){
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
*/
//  ???   getElementsByName   < ... name>
/*var ddd = document.getElementsByName("aaa");
ddd[0].style.color = "Yellow"*/