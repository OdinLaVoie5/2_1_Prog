// ЦИКЛ.   ( ФОРМАЛЬНЫЕ СИСТЕМЫ )      !!!!!
// ЦИКЛОМ ОПТИМАЛЬНЕЙ чем рекурсией ??  ИДЁТ СЛОЙ ЗА СЛОЕМ.  


// ф-ции операции с пустотой ???
// операция с М ???  самое простое зацикливание (повтор)

// ?? как узнать расходится ли цепочка или сходится?
// юзер цветовые ... стили ...

// ?? статистика - подсчёт какой уровень самый богатый, бедный? самое короткое, длинное выражение ... ... ...

//////  ПОВТОР  ???       + возникновение разных? циклов.   


////// РЕЖИМЫ: 0 БЕЗ ПОВТОРОВ,     1 С ПОВТОРАМИ НА УРОВНЕ,    2 С ОБЩИМИ ПОВТОРАМИ.  ???



//?? (+ учесть вычисл способн конкретных брауза и компа)).  
// перетаскивания ... ...







////////////////  ПАМЯТЬ   ???  есть ли выгода во времени. изменить?  +история?
var arrMemoryRez = [];      /////////// 
var arrMemoryWay = ["",""]; /////////// 
var arrMemoryTS = []; // для краткого вывода.  избегать повтора предыдущ.
var memoryIdentific = ""; // предыдущ параметры
var memoryRezSimple = "";
var memoryRezSmall = "";
var memoryRezSmallPart = "";




/////////////////////////////////////////////////////////////////////////
//////////////////////////  ГЛАВНАЯ    //////////////////////////////////
/////////////////////////////////////////////////////////////////////////
function MUI (){	
	/////////  ВВОД ДАННЫХ и умолчания  ??? проверка вводных 
	var alfabet = "MUI" // алфавит ???  вирт клава ...
	
	var start = "", fin = ""; //??? если какой-нибудь эл-т нулевой(какой id сделать?) "" или " "
		start = document.getElementById("startname").value || "MUUIIIUI";      //  ЮЗЕР 
		fin   = TrimStringOSC(document.getElementById("finname").value) || ""; //  ЮЗЕР  
		start = TrimStringOSC(start); // убрал лишние пробелы 
		fin = TrimStringOSC(fin);     

	//// МАССИВ СТОПОВ [max слева, max справа,  min слева, min справа] 
	// рекомендация - изменять только arrStop[3] (не больше 18) ??
	var arrStop = []; // ЮЗЕР  ограничение длины выражений
		arrStop[0] = document.getElementById("limname0").value || 0;
		arrStop[1] = document.getElementById("limname1").value || 100;
		arrStop[2] = document.getElementById("limname2").value || 0;
		arrStop[3] = document.getElementById("limname3").value || 10; ////
	
		// arrStop[1] = Math.min(arrStop[1], arrStop[3]);  	// arrStop[0] = Math.max(arrStop[0], arrStop[2]);
		arrStop[0] = Math.min(arrStop[0], start.length);  	arrStop[1] = Math.max(arrStop[1], start.length); // вход 
		arrStop[2] = Math.min(arrStop[2], fin.length);  	arrStop[3] = Math.max(arrStop[3], fin.length);   // выход
	
	
	//// ЮЗЕР   МАССИВ ФУНКЦИЙ  !! + защита от дурака - 1запятые в вводе, 2нет ф-ции, 3 в базе не ф-ция
	var arrFnc=[], arrFncAssociativ = [];
	//// ??? как-то вставлять , образовывать ф-ции в ассоц массив. текстовый конструктор?  ИИ. 
	arrFncAssociativ["UU"] = UU; arrFncAssociativ["III"] = III; arrFncAssociativ["I"] = I; arrFncAssociativ["M"] = M; 
	
	var strFncs = document.getElementById("fncs").value; // строка с именами ф-ций
	strFncs = normPunctOneOSC(strFncs) // зпт
	strFncs = TrimStringOSC (strFncs) // пробелы
	// список ф-ций по умолчанию вставлен в html (value)  ////  или от юзера

	if (!strFncs) alert ("Введите функции.\n Или нажмите кнопку \"Сброс значений\" для \n введения значений по умолчанию.")
	var arrTempFncs = strFncs.split(" "); 
	for (var i=0, j=0; i < arrTempFncs.length; i++,j++) {
		if (!arrFncAssociativ[arrTempFncs[i]]) { // проверка сущ соотв ф-ции в БАЗЕ ф-ций.
			if (strFncs) alert ("Нет соответствующей функции на позиции "+ (j+1))
			arrTempFncs.splice(i, 1);
			i--;
		}else arrFnc[i] = arrFncAssociativ[arrTempFncs[i]];
	};
	checkFnc(arrFnc); // проверка на соответствие ф-ций

	
	///////// ФЛАГИ ограничения  /////////
	var stopLewels=500000;  //ограничение  уровней - если без повторов не нужно. ?? 
	
	//// ЮЗЕР   c ПОВТОРЕНИЯМИ выражений на УРОВНЕ и вообще.  1.
	var flagRepeatLewel = 0, flagRepeatAll = 0; 
		if(document.getElementById("repeat0").checked)  flagRepeatLewel = 1;
		if(document.getElementById("repeat1").checked)  flagRepeatAll   = 1;
	if (flagRepeatAll) {
		//flagRepeatLewel = 1       ??? нужно ли связывать? //если общие повторы да, то и на уровне тоже. нет?
		stopLewels = 40;  // ??? ограничение уровней если c повторами.
	};
	if (flagRepeatAll && flagRepeatLewel) stopLewels = 25;  



	//// ЮЗЕР  останов при нахождении fin  - 1(на уровне), 2(на слове)
	var arrHalt = document.getElementsByName("type_halt"),  flagFinHalt;
	for (var i=0; i < arrHalt.length; i++) {
		if(arrHalt[i].checked) { flagFinHalt = arrHalt[i].value;};
	};


	// идентификатор для запоминания результата  ??? 
	var identific = start+"|"+fin+"|"+(arrStop.join("|"))+"|"+(arrTempFncs.join("|"))+"|"+flagRepeatLewel+"|"+flagRepeatAll+"|"+flagFinHalt;
	
	// -----------------------------------------------------------------



	
	/////////////// ПЕРЕМЕННЫЕ //////////////////
	var hash=[], lewel=[], lewelOut=[]; // lewelOut ??? были, но в lewel не попали по ограничению.  
	var arrActs=[], act="" ; //    k, m
	lewel[0] = [start], hash[start] = start;
	var numAll = 0, numberYes = 0; 
	var limitInfo = "";
	var arrRepitLewel = []; // массив повторов на уровне
	var nullAct = 0, arrNullAct = []; // флаг-все операции мимо, и массив реальных тупиков 
	
	/////// МАССИВ ИНФО (экстремумы ...) ///////  передаётся в dispBig // внести ещё флаги ... ??
	var infoMaxMin = []; 
	infoMaxMin["maxFncName"] = 0;  // макс длина имени ф-ций
	infoMaxMin["arrFnc"] = arrFnc;  //  ф-ции
	infoMaxMin["maxAct"] = 0;  // макс длина выражения реально
	infoMaxMin["numYes"] = [];  // номер нахождения  yes
	infoMaxMin["lewelYes"] = [];  // уровень нахождения  yes   ещё 2 infoMaxMin ниже
	infoMaxMin["stop"] = arrStop;  // уровень нахождения  yes   ещё 2 infoMaxMin ниже
	infoMaxMin["flagRepeatLewel"] = flagRepeatLewel; // флаги повторов
	
	infoMaxMin["flagRepeatAll"] = flagRepeatAll;// пока не использ
	infoMaxMin["flagFinHalt"] = flagFinHalt; // пока не использ
	infoMaxMin["alfabet"] = alfabet; // пока не использ
	
	infoMaxMin["identific"] = identific; // ? 


	/////////////// ВЫВОД  //////////////////
	var arrRez = [], arrRezTemp = [],   ways=[], waysShort=[]; // ?? 
	ways[start] = start  //  упрощённый результат
	waysShort[start] = start  // совсем упрощённый результат(использую как title на экране)
	



	/// если на старте уже финишное выражение ///
	if (start==fin) { 
		ways[fin]=start;   
		waysShort[fin]=start;  
		alert ("start==fin")  ///  ???  перенести в вывод?
	}




	///////////    ПЕРЕБОР уровней   /////////// 
	out: for (var i=1; i < stopLewels; i++) {  ///
		lewel[i] = [];
		if (!lewel[i-1].length || identific == memoryIdentific) break; // если слова кончились - обрыв цикла. не пустой ли lewel
		///////// ПЕРЕБОР всех выражений в уровне /////////
		for (var j=0; j < lewel[i-1].length; j++){ // 
			var word = lewel[i-1][j]; 
			
			//////// ПЕРЕБОР всех ф-ций ////////
			for (var k=0; k < arrFnc.length; k++) {   

				var arrActs = arrFnc[k](word); 
				//if (arrActs.length) nullAct++;  ???
				var fncName = arrFnc[k].name;
				if (fncName.length > infoMaxMin["maxFncName"]) {infoMaxMin["maxFncName"]=fncName.length}; 

				////// ПЕРЕБОР всех применений ф-ции //////
				for (var m=0; m < arrActs.length; m++) { 
					//// ограничение   + отброс undefined    ?? 
					if (arrActs[m]== "") arrActs[m] = " "; // нулевой элемент ??? заменил нулевую строку пробелом. изменить?  асоц zerostring?
					if (arrActs[m]!= undefined)  { 
						nullAct++; 
						if((arrActs[m].length<= arrStop[3]) && (arrActs[m].length >= arrStop[2])) {act = arrActs[m]}
						else act = undefined; 
					}
					else act = undefined; //////

					////  ?? избежание повторов  flagRepeatLewel 	
					var term0 = !hash[act]||flagRepeatAll;	// условие- нет среди общего хеша 
					var term1 = (lewel[i-1].indexOf(act)==-1) || flagRepeatAll;	//- нет среди предыдущ результ				
					var term2 = (lewel[i].indexOf(act)==-1) || flagRepeatLewel;	//- нет среди результ этого же уровня				

					if (term0 && term1 && term2){
						if (act!=undefined && (!lewelOut[act])){
							numAll++; // общая нумерация  ?? вынести за if ??
							if (act.length > infoMaxMin["maxAct"]) {infoMaxMin["maxAct"] = act.length};
							if (act==fin){
								infoMaxMin["numYes"].push(numAll);  // созд массив совпадений с fin 
								infoMaxMin["lewelYes"].push(i);
							}; 
							
							
							////ограничение по размеру   + не пускать повторы на след уровень
							if (!arrRepitLewel[act]) arrRepitLewel[act] = act; 
							if (lewel[i].indexOf(act)==-1) {
								if ((arrActs[m].length<= arrStop[1]) && (arrActs[m].length >= arrStop[0])) {
									lewel[i].push(act);
								}else {////запись в крайний столбец 
									limitInfo+="L";//если произошло ограничение по arrStop[1] (arrStop[0])
									lewelOut[act] = act; // ассоц массив не попавших в lewel по ограничению
								} 
							}
							// если повтор на уровне (режим - повтор на уровне) ???
							else arrRepitLewel[act]+= "."
						
							
							// выделение операции в слове
							partWord0 =  word.slice(0, m);  
							partWord1 =  word.slice(m, m+fncName.length); // ??? название ф-ции должно определять действие ф-ции, + методы ф-ции? 
							partWord2 =  word.slice(m+fncName.length);
							
							// ДЕЛАЕМ РЕЗУЛЬТИРУЮЩИЙ МАССИВ 
							arrRezTemp = ["&nbsp;", numAll, i, word, j,   partWord0, partWord1, partWord2,     fncName,     k, m,  arrRepitLewel[act],  act,   "&nbsp;", "&nbsp;", limitInfo];
							arrRez.push(arrRezTemp);// нужны ли в массиве j и k?  
							
							infoMaxMin["maxNumAll"] = numAll;  // макс нумерация
							infoMaxMin["maxI"] = i;  //  макс уровней
							limitInfo = ""; 
							ways[arrRepitLewel[act]] = ways[word] + " --"+ fncName + "-- " + act;  // ???
							waysShort[arrRepitLewel[act]] = waysShort[word] + "--" + act;
						}
					}			
				}
			}
			infoMaxMin["arrNullAct"] = arrNullAct;  

			if (infoMaxMin["numYes"][0] && flagFinHalt==2){break out;} ////////// ОСТАНОВ ЕСЛИ НАЙДЕНО (обрыв на слове)
			hash[word]=word; 
			if (!nullAct) {arrNullAct.push(word)};
			nullAct = 0;
		}
		if (infoMaxMin["numYes"][0] && flagFinHalt==1){break;} ////////// ОСТАНОВ ЕСЛИ НАЙДЕНО (уровень довершается)
	}	
	
	
	
	///  сохранение массивов ways, waysShort
	if (identific != memoryIdentific) {arrMemoryWay = [ways, waysShort]}
	else {	
		ways = arrMemoryWay[0]; 
		waysShort = arrMemoryWay[1]; 
	}
	
	infoMaxMin["ways"] = ways; 
	infoMaxMin["waysShort"] = waysShort; 




	//   передача след ф-циям
	displaySimple (arrRez, fin, infoMaxMin)
	if (identific != memoryIdentific) displayBig (arrRez, fin, infoMaxMin);  ////// вывод полного рез если не повтор
	memoryIdentific = identific; // ???

	
	return arrRez;   // ?? 
}
			





/////////////////////////////////////////////////////////////////////////////////////		
/////////////////////  УПРОЩЁННЫЙ  ИЛИ ПРОСТОЙ ВЫВОД  ///////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////		
function displaySimple (arrRez, fin, infoMaxMin){
	//// ЮЗЕР 
	var flagShow = 1;
	if (document.getElementById("show0").checked) flagShow = 0; // не показ основное.

	var arrShow = document.getElementsByName("type_show");
	for (var i=0; i < arrShow.length; i++) {
		if(arrShow[i].checked) { flagSimpleShow = arrShow[i].value;}; // цепью или цепью упрощённо.
	};


	tmpMenuHeight ();
	 
	
	//// скрытие / раскрытие  панелей 
	if (!flagShow){
		document.getElementById("textup").style.display = "none"; 
		document.getElementById("textsmallout").style.display = "none";
		document.getElementById("textbigout").style.display = "none";
	}
	else {
		document.getElementById("textup").style.display = "inherit"; 
		document.getElementById("textsmallout").style.display = "inherit";
		document.getElementById("textbigout").style.display = "inherit";
	}




	var tSimple = document.getElementById("textsimple");
	/////  короткий или совсем короткий вывод. ///// 
	ways = infoMaxMin["ways"]; 
	waysShort = infoMaxMin["waysShort"]; 

	var tmpWays;
	if (flagSimpleShow == 2) tmpWays = ways;
	else if (flagSimpleShow == 1) tmpWays = waysShort;

	var tmpFin = fin, tmpString = "";	
	if (tmpWays[tmpFin]){ // если fin найден 
		while (tmpWays[tmpFin]) {
			tmpString += ("<br>" + tmpWays[tmpFin]); 
			tmpFin += ".";
		}
		if (arrMemoryTS[arrMemoryTS.length - 1]!= tmpString) {// избегать повторов с последним выводом.   пришлось глобаль перем. 
			tSimple.innerHTML += tmpString + "<br>";  
			arrMemoryTS.push(tmpString); 
			memoryRezSimple =  tmpString + "<br>"; 
		} 
	}
	else {
		tmpString = "-";
	}
}







/////////////////////////////////////////////////////////////////////////
////////////////   ВЫВОД ПОЛНОГО РЕЗУЛЬТАТА  в виде таблицы  !!! ////////
/////////////////////////////////////////////////////////////////////////
function  displayBig(arrRez, fin, infoMaxMin){
	// юзер и переменные
	var arrIgnor = [3,4,9,10,11];  // массив игнора столбов  + юзер ввод ???
	var arrFncColor = ["rgb(255,0,0)", "rgb(255,0,255)", "rgb(0,255,255)", "rgb(0,255,0)"];  // ЮЗЕР  цвета ф-ций ??? тип ф-ции св-ва ///
	
	var textRez = ""; 
	var textUp = "";

	var separ = alignTextOSC ( ("<td>"+" "+ "</td>"),arrRez[0].length-3, arrIgnor.length); // ??
	var separ1 = "<tr class='separ1'>" + separ + "</tr>"; // оформ пробела  меж уровнями
	var separ2 = "<tr class='separ2'>" + separ + "</tr>"; // оформ пробела  меж выражениями
	// длина зависит от кол-ва игнор столбцов и объединённых столбцов -2




	///// формирование таблицы /////
	var identific = infoMaxMin["identific"];
	if (!arrMemoryRez[identific]) {                        // ПАМЯТЬ ??? 
		textRez += "<TABLE id='bigtable'>" 
		textRez += separ1
	}
	
	for (var i=0; i < arrRez.length; i++) { ///// СТРОКИ 
		if (arrMemoryRez[identific]) break;     // ???  обрыв расчетов если в ПАМЯТИ уже есть данный случай.

		///// оформление пробелов  /////
		if (arrRez[i-1] && (arrRez[i-1][2]!=arrRez[i][2])) {textRez += separ1} //  пробел  меж уровнями
		else {
			if (arrRez[i-1] && (arrRez[i-1][3]!=arrRez[i][3])) {textRez += separ2}; // пробел  меж выражениями
		};
		
		textRez += " <tr class='" +  arrRez[i][3] + "'id='" + arrRez[i][11] +"'>"; ///// КЛАСС И ID 
		// !!! class нач выраж, id  второе выражение,  title ??  потом по клику цепочкой циклом (анимир) выделять ???
		
		
		out: for (var j=0; j < arrRez[i].length; j++) {  ///// СТОЛБЦЫ
			for (var s=0; s < arrIgnor.length; s++) { // цикл игнора столбцов
				if 	(j == arrIgnor[s]) {continue out};
			};
			
			if (j!=6 && j!=7) textRez += "<td>"; // для объединения partWord0, partWord1, partWord2
			if (j==6){textRez += "<span class=" + arrRez[i][8]+"_" + ">"}; // выделение цветом. класс по имени ф-ции // добавил_ для уникальности.
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
	//[" "    numAll,  i,  word,  j,   partWord0, partWord1, partWord2,     fncName,     k, m,  act     " "]
	
	
	
	
	/// создаём цветовые стили по именам ф-ций///
	var styleFnc = "<style> "; 
	for (var s=0; s < infoMaxMin["arrFnc"].length; s++) {
		if (!arrFncColor[s]) arrFncColor[s] = "Goldenrod" // цвет по умолчанию.
		styleFnc+= "." + infoMaxMin["arrFnc"][s].name + "_" + "{color:" + arrFncColor[s] + ";} "// добавил_ для уникальности.	
	}; 
	styleFnc+="</style> ";
	textRez += styleFnc;




	/////////////////// ИЗ ПАМЯТИ    /////////////////// В ПАМЯТЬ     
	if (arrMemoryRez[identific]) {                  
		textRez = arrMemoryRez[identific]
	}
	else arrMemoryRez[identific] = textRez;        

	
	
	
	///// ОКОНЧАТЕЛЬНЫЙ ВЫВОД /////
	document.getElementById("textbig").innerHTML="";// сброс прежнего результата
	document.getElementById("textup21").innerHTML="";
	document.getElementById("textup11").innerHTML="";
	document.getElementById("textsmall").innerHTML="";

	document.getElementById("textbig").innerHTML=textRez;	// вывод большого результата
	
	if (!infoMaxMin["numYes"].length) {		
		document.getElementById("textup11").innerHTML= "&nbsp;&nbsp;" + "- "  + " - "; // резюме верхнее	
	}
	else {
		for (var k=0; k < infoMaxMin["numYes"].length; k++) {
			document.getElementById("textup11").innerHTML += ("&nbsp;&nbsp;" + infoMaxMin["numYes"][k] + "."  + infoMaxMin["lewelYes"][k] + ". " + "<br>");	
		};
	}
	document.getElementById("textup21").innerHTML = "&nbsp;&nbsp;" + infoMaxMin["maxNumAll"] + "." + infoMaxMin["maxI"] + ". ";	





	//  установление ширины  !!! 
	var elemBigTableSize = document.getElementById("bigtable").offsetWidth;
	textbigout.style.width = textup.style.width = textsimpleout.style.width = textsmallout.style.width = elemBigTableSize+"px";




	/////////////////    
	illuminatChain (arrRez, fin, infoMaxMin);
}







/////////////////////////////////////////////////////////////////////////
///////////  РЕАКЦИЯ НА НАВЕДЕНИЕ, КЛИК + последн столбец  //////////////
/////////////////////////////////////////////////////////////////////////
function  illuminatChain (arrRez, fin, infoMaxMin){
	///  ???  сделать ф-цию сортировки, групировки таблицы ... кликом в таблице на экране


	// юзер 
	var flagIllumYes = 1; // юзер !!  подсвечивать наведение 1 или нет
	var flagColorRezSmall = 0; // юзер  флаг - результ по дабл клику без лишней расцветки 0.
	////  цвета  ////  юзер 
	var colorOut = "White";// --- 'rgb('+ Math.floor(Math.random()*255) +','+ Math.floor(Math.random()*255)+','+ Math.floor(Math.random()*255)  +')'   юзер ??? rgb(255,230,242)
	var colorPreClick = "Yellow"; 
	var colorPostClick = "PaleGreen";
	var colorPreOver = "rgb(255,255,180)";
	var colorPostOver = "rgb(220,255,220)";
	var colorStop = "Lightgrey";
	var colorRealStop = "lightsteelblue";
	var colorThis = "Orange";
	var colorPreFin = "Yellow";
	var colorFin = "Orange";
	var colorFinRepeat = "Red";

	var limIlluminat = 50; // ограничение (на сколько слов подсветка вниз)



	// массивы врем хранения подсветки кликом
	var arrSavePreClick = []; 
	var arrSavePostClick = [];
	var saveClk = "";
	var arrRezSmall = [];


	
	
	//// ф-ция подсчёта крапа) ////
	function kraping (str, sign){
		rez = [str]
		if (~str.indexOf(sign)) {
			rez = str.split(sign); 
		};
		return rez.length-1;
	}




	/// подсвет fin    ///  ???  сделать подсвет др предков для режима повтор на уровне.
	// ??? не получается имитировать даблклик
	var elemFin = document.getElementById(fin); // ??? 
	var s = 0;
	if (elemFin){
		var rowFin = elemFin;
		while (rowFin){
			var ser = rowFin.outerHTML; 
			ser = ser.replace(/id=\"\w+\"/,"id='"+s+"'"); // id заменяем
			ser = ser.replace(/class=\"\w+\"/,"class='"+s+"'"); // class тоже 
			arrRezSmall.unshift(ser);
			rowFin.firstChild.style.backgroundColor = colorPreFin;
			rowFin = document.getElementById(rowFin.className);
			s++;
		};
		elemFin.firstChild.style.backgroundColor = colorFin;	// подсветка результата
	}
	memoryRezSmall = document.getElementById("textsmall").innerHTML = "<table>" + arrRezSmall.join("") + "</table>";


	
	
	//// !!! скролинг вверх-вниз (стрелки) ////
	var pageDown = document.getElementById("textbig").clientHeight;

	var elemScrollUp = document.getElementById("scrollUp");
	var elemScrollDown = document.getElementById("scrollDown");
	
	elemScrollUp.onclick = function () { window.scroll(0, 0)}
	elemScrollDown.onclick = function () { window.scroll(0, pageDown)}
	
	
	if(!flagIllumYes) { // события по флагу. обрыв оформления
		return; //////////
	}


	
	
	/////  оформление верхнего ряда  //////
 	var upRowCells = document.getElementById("bigtable").rows[0].cells;
	for (var i=0; i < upRowCells.length; i++) {
		upRowCells[i].innerHTML	= "▼"
	};


			
	
	////  ПЕРЕБОР ВСЕХ СТРОК  ////
	for (var i = 0; i < infoMaxMin["maxNumAll"]; i++) { 
		var elemThisRow = document.getElementById(arrRez[i][11]); // этот ряд
		elemThisRow.style.cursor = "pointer"; 
		elemThisRow.title = infoMaxMin["waysShort"][arrRez[i][11]]; // установление title
		var noKrapID = arrRez[i][12];
		
		//// подсветка повторов на уровне
		var tmpRez = kraping(arrRez[i][11], ".");
		if (tmpRez){  // число повторов (точек)  столбец     
			var arrColorTriplet = uniqueCodeWordTripletOSC(noKrapID, 3, infoMaxMin["alfabet"], 155, 2)// для изменения цвета для разных слов
			elemThisRow.cells[7].innerHTML = "<span style='background-color:rgb(" + (100 + arrColorTriplet[0]) + "," 
			+ (100+ arrColorTriplet[1]) + "," + (100 + arrColorTriplet[2]) + ")'>"+(tmpRez+1)+"</span>"; // подсветка
			var elemPreThisRow = document.getElementById(elemThisRow.cells[5].innerHTML); // предыдущ ряд
			elemPreThisRow.cells[7].innerHTML = "<span style='background-color:rgb(" + (100 + arrColorTriplet[0]) + "," 
			+ (100+ arrColorTriplet[1]) + "," + (100 + arrColorTriplet[2]) + ")'>"+(1)+"</span>";
			
			if (noKrapID == fin) {elemThisRow.cells[0].style.backgroundColor = colorFinRepeat}
		}; 

		
		//// подсветка тупиковых выражений
		var tmpLast = elemThisRow.lastChild; 
		if(!document.getElementsByClassName(noKrapID).length){tmpLast.style.backgroundColor = colorStop}; 
		if (~infoMaxMin["arrNullAct"].indexOf(noKrapID)) {tmpLast.style.backgroundColor = colorRealStop}; // подсветка реально тупиковых выражений
		
			
		///////////    СОБЫТИЯ    /////////////
		//// ДАБЛ КЛИК ////
		var s=0;
		elemThisRow.ondblclick = function illuminatDblClick(e) {
			var arrRezSmallPart = [];
			var row = this;
			while (row){
				var ser = row.outerHTML; 	
				ser = ser.replace(/id=\"\w+\"/,""); // id удаляем  (можно заменять на   id='"+s+"')  ???
				ser = ser.replace(/class=\"\w+\"/,""); //class тоже удаляем  (можно заменять на class='"+s+"')  ???
				// результ по дабл клику без лишней расцветки   !!! 
				if (!flagColorRezSmall){   // вырез цвет буквенный и цифровой
					ser = ser.replace(/\s*style\s*=\s*(\'|\")\s*background\-color\:\s*\s*\w+\;*\s*(\'|\")/g,""); // ##рег выраж 
					ser = ser.replace(/\s*style\s*=\s*(\'|\")\s*background\-color\:\s*rgb\s*\(\d+\,\s*\d+\,\s*\d+\s*\)\;*\s*(\'|\")/g,"");
				};
				arrRezSmallPart.unshift(ser);
				if (this.id == fin) row.firstChild.style.backgroundColor = colorPreFin;
				row = document.getElementById(row.className);
				s++;
			};
			if (this.id == fin) elemFin.firstChild.style.backgroundColor = colorFin;	// подсветка результата
			
			
			if (arrRezSmallPart.join("") != memoryRezSmallPart) {
				var tmpTSmall = document.getElementById("textsmall").innerHTML;
				tmpTSmall = tmpTSmall.slice(0,-8);
				document.getElementById("textsmall").innerHTML = tmpTSmall + "<tr height='8'>" + "</tr>"+ arrRezSmallPart.join("") + "</table>";
			}
			memoryRezSmallPart = arrRezSmallPart.join("");  // память
		};
	
	
		//// КЛИК МЫШИ  ////
		elemThisRow.onclick = function illuminatClick(e) {
			var noKrapID = this.cells[5].innerHTML; 
	
			var flagBack = 0;
			if (~arrSavePreClick.indexOf(this)) {flagBack = 1};
			///  сброс прежней подсветки  ///
			for (var j=0; j < arrSavePreClick.length; j++) {  
				arrSavePreClick[j].cells[1].style.backgroundColor = colorOut;	
			};
			arrSavePreClick = [];
			for (var j=0; j < arrSavePostClick.length; j++) {  
				arrSavePostClick[j].cells[1].style.backgroundColor = colorOut;	
			};
			arrSavePostClick = [];
			if (saveClk) saveClk.cells[1].style.backgroundColor = colorOut;
			saveClk = "";
			
			if (flagBack == 1) {return};// второй клик не подсвечивает
			
			/// подсветка вверх /// 
			var row = this;   
			while (row){
				arrSavePreClick.push(row);
				row.cells[1].style.backgroundColor = colorPreClick;
				row = document.getElementById(row.className);
			};
			/// подсветка вниз /// 
			var rowDown = this;
		
			var arrTmpClassAll = [noKrapID];
		
			var s = 0;
			for (var j=0; j < arrTmpClassAll.length; j++) {
				if (s>limIlluminat) break;
				var noKrapID_ = arrTmpClassAll[j];
				var arrTmpClass = document.getElementsByClassName(noKrapID_);
				for (var k=0; k < arrTmpClass.length; k++) {
					arrSavePostClick.push(arrTmpClass[k]);
					arrTmpClass[k].cells[1].style.backgroundColor = colorPostClick;   
					arrTmpClassAll.push(arrTmpClass[k].cells[5].innerHTML);
				  s++; ///  если во внешн цикл - тормозит.
				}
				arrTmpClassAll.splice(0,1);
				j--;
			}
			this.cells[1].style.backgroundColor = colorThis;
			saveClk = this;
		};
		
		
		//// НАВЕДЕНИЕ МЫШИ  ////
		elemThisRow.onmouseover = function illuminatOver(e) {
			///  окраска при наведении (вверх) ///
			var row = this;
			while (row){
				row.cells[2].style.backgroundColor = colorPreOver;
				row = document.getElementById(row.className);
			};
	
			///  окраска при наведении (вниз)   ///
			var rowDown = this;
			var noKrapID = this.cells[5].innerHTML; 
		
			var arrTmpClassAll = [noKrapID];
			
			var s = 0;
			for (var j=0; j < arrTmpClassAll.length; j++) {
				if (s>limIlluminat) break;
				var noKrapID = arrTmpClassAll[j];
				var arrTmpClass = document.getElementsByClassName(noKrapID);
				for (var k=0; k < arrTmpClass.length; k++) {
					arrTmpClass[k].cells[2].style.backgroundColor = colorPostOver;  
					arrTmpClassAll.push(arrTmpClass[k].cells[5].innerHTML);
				}
				arrTmpClassAll.splice(0,1);
				j--;
				s++;
			}
		};
		
		
		//// ОТВЕДЕНИЕ МЫШИ  ////
		elemThisRow.onmouseout = function illuminatOut(e) {
			///  сброс прежней подсветки  ///
			for (var j=0; j < arrSavePreClick.length; j++) {  
				arrSavePreClick[j].cells[2].style.backgroundColor = colorOut;	
			};
			for (var j=0; j < arrSavePostClick.length; j++) {  
				arrSavePostClick[j].cells[2].style.backgroundColor = colorOut;	
			};
			if (saveClk) saveClk.cells[2].style.backgroundColor = colorOut;
			
			///  сброс окраски вверх ///
			var row = this;
			while (row){
				row.cells[2].style.backgroundColor = colorOut;
				row = document.getElementById(row.className);
			};
			///  сброс окраски вниз  ///
			var rowDown = this;
			var noKrapID = this.cells[5].innerHTML; 
		
			var arrTmpClassAll = [noKrapID];
			
			for (var j=0; j < arrTmpClassAll.length; j++) {
				var noKrapID = arrTmpClassAll[j];
				
				var arrTmpClass = document.getElementsByClassName(noKrapID);
				for (var k=0; k < arrTmpClass.length; k++) {
					arrTmpClass[k].cells[2].style.backgroundColor = colorOut;  
					arrTmpClassAll.push(arrTmpClass[k].cells[5].innerHTML);
				}
				arrTmpClassAll.splice(0,1);
				j--;
			}
			/// реституция подсветки кликом ///
			for (var j=0; j < arrSavePreClick.length; j++) {
				arrSavePreClick[j].cells[1].style.backgroundColor = colorPreClick;	
			};
			for (var j=0; j < arrSavePostClick.length; j++) {
				arrSavePostClick[j].cells[1].style.backgroundColor = colorPostClick;	   
			};
			saveClk.cells[1].style.backgroundColor = colorThis;
		};
	
	};
}










// ФУНКЦИИ  - должны выдавать 1 массив строк   2 без повторов	
	/// ????? если ф выдаёт несколько одинаковых результата на разных позициях - сократить, выкинуть лишние.     но но если важна точка приложения ф-ции - то не сокращать, а точку както передаватьь ...

/////////////////////////////////////////////////////////////////////////
////////////////////// ФУНКЦИИ ПРЕОБРАЗОВАНИЯ  //////////////////////////
/////////////////////////////////////////////////////////////////////////

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





////////////// ???  проверка ф-ций на соответствие типу ... ...  ///////
function checkFnc(arrFunc){
	var arrError = [];
	for (var i=0; i < arrFunc.length; i++) {
		if (arrFunc[i]){ 
			if (typeof arrFunc[i]!=="function") arrError.push(i+1) 
		}
		else arrError.push(i+1);
	}
	if (arrError.length) alert("Проверьте базу функций. \n Позиции " + arrError +".")
} 




////////  ПАНЕЛЬ ДАННЫХ И НАСТРОЕК  !!! //////////
var flagProper0 = 0;/// пока не использую/
var flagProper1 = 0;
var flagProper2 = 0;
var flagProper3 = 0;

// ОТКРЫТЬ - СКРЫТЬ все настройки  // клик по заголовку
function openProper0(){  
	var menu00 = document.getElementById("menu00"); 
	var menu01 = document.getElementById("menu01"); 
	var menu02 = document.getElementById("menu02"); 
	var menu03 = document.getElementById("menu03"); 

	if (menu00.style.top == "0px") {
		menu00.style.top = "-1500px";
		if(menu01.style.top == "0px") {
			menu01.style.top = "-1500px";
			if(menu02.style.top == "0px") {
				menu02.style.top = "-1500px";
				if(menu03.style.top == "0px") {
					menu03.style.top = "-1500px";
				}
			}
		}
	}
	else {
		menu00.style.top = "0px";
		if (flagProper1){
			menu01.style.top = "0px";
			if (flagProper2){
				menu02.style.top = "0px";
				if (flagProper3){
					menu03.style.top = "0px";
				}
			}
		}
	}
	flagProper0 = (flagProper0+1)%2;  
}

function openProper1(){      
	var menu01 = document.getElementById("menu01"); 
	var menu02 = document.getElementById("menu02"); 
	var menu03 = document.getElementById("menu03"); 

	if (menu01.style.top == "0px") {
		menu01.style.top = "-1500px";
		if (menu02.style.top == "0px") {
			menu02.style.top = "-1500px";
			if (menu03.style.top == "0px") {
				menu03.style.top = "-1500px";
			}
		}
	}
	else {
		menu01.style.top = "0px";
		if (flagProper2){
			menu02.style.top = "0px";
			if (flagProper3){
				menu03.style.top = "0px";
			}
		}
	}
	flagProper1 = (flagProper1+1)%2;
}

function openProper2(){      
	var menu02 = document.getElementById("menu02"); 
	var menu03 = document.getElementById("menu03"); 

	if (menu02.style.top == "0px") {
		menu02.style.top = "-1500px";
		if (menu03.style.top == "0px") {
			menu03.style.top = "-1500px";
		}
	}
	else {
		menu02.style.top = "0px";
		if (flagProper3){
			menu03.style.top = "0px";
		}
	}
	flagProper2 = (flagProper2+1)%2;
}

function openProper3(){      
	var menu03 = document.getElementById("menu03"); 
	if (menu03.style.top == "0px") {menu03.style.top ="-1500px"}
	else {menu03.style.top = "0px";}
	flagProper3 = (flagProper3+1)%2;
}


// дабл клик по заголовку и кнопка закр все настройки ////
function openAllProper0(){
	if(!flagProper0){
		document.getElementById("menu00").style.top = "0px"; 
		document.getElementById("menu01").style.top = "0px"; 
		document.getElementById("menu02").style.top = "0px"; 
		document.getElementById("menu03").style.top = "0px"; 
		flagProper0 = 1;
		flagProper1 = 1;
		flagProper2 = 1;
		flagProper3 = 1;
	}
	else{
		document.getElementById("menu00").style.top = "-1500px"; 
		document.getElementById("menu01").style.top = "-1500px"; 
		document.getElementById("menu02").style.top = "-1500px"; 
		document.getElementById("menu03").style.top = "-1500px"; 
		flagProper0 = 0;
		flagProper1 = 0;
		flagProper2 = 0;
		flagProper3 = 0;
	}
}






////////// !!!!!  функция для кнопки "сброс"  (подтверждение сброса) ////////
function f_reset(e) {
	if (!confirm("Сбросить настройки?")) {
		e = e||window.event;   // событие
		if (e.preventDefault) e.preventDefault(); // для разн браузов
		else e.returnValue = false;               // для разн браузов
	}
}





////////// функция очистки простого вывода  ////////
function clearTextSimple (){
	document.getElementById("textsimple").innerHTML = memoryRezSimple; 
}

////////// функция очистки выделеного вывода  ////////
function clearTextSmall (){
	document.getElementById("textsmall").innerHTML = memoryRezSmall; 
	memoryRezSmallPart = "";
}




function nnn(e){
// не работает  ?????	if (e.keyCode == 13) document.getElementById("butcheck").click();	
	
}




//    !!!   установка размеров панелей меню
function tmpMenuHeight (){
	var tmp = menu00.childNodes[1].offsetTop;
	menu00.style.height=tmp + "px"
	var tmp = menu01.firstElementChild.nextElementSibling.offsetTop;
	menu01.style.height=tmp + "px"
	var tmp = menu02.firstElementChild.nextElementSibling.offsetTop;
	menu02.style.height=tmp + "px"
	var tmp = menu03.firstElementChild.nextElementSibling.offsetTop;
	menu03.style.height=tmp + "px"
}











