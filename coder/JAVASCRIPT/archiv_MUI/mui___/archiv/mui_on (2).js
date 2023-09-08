// ЦИКЛ.   ( ФОРМАЛЬНЫЕ СИСТЕМЫ )      !!!!!
// ЦИКЛОМ ОПТИМАЛЬНЕЙ чем рекурсией ??  ИДЁТ СЛОЙ ЗА СЛОЕМ.  



// операция над одиночным выраж или когда остаётся 1 - порно с подсветк в слове. ????????????
//случай когда после операции выражение исчезает совсем (н/р UU).   + операции с пустотой ???
// ???   нулевая операция с М ?????      

// ?? как узнать расходится ли цепочка или сходится?
// юзер цветовые ... стили ...

// ?? статистика - подсчёт какой уровень самый богатый, бедный? самое короткое, длинное выражение ... ... ...

//////  ПОВТОР  ???       + возникновение разных? циклов.   
// fin выдаётся в последнем повторе. 


////// РЕЖИМЫ: 0 БЕЗ ПОВТОРОВ,     1 С ПОВТОРАМИ НА УРОВНЕ,    2 С ОБЩИМИ ПОВТОРАМИ.  ???



	//?? (+ учесть вычисл способн конкретных брауза и компа)).  
	// перетаскивания ... ...

/////////////////////////////////////////////////////////////////////////
//////////////////////////  ГЛАВНАЯ    //////////////////////////////////
/////////////////////////////////////////////////////////////////////////
function MUI (){	
	document.getElementById("textbig").innerHTML="";
	/////////  ВВОД ДАННЫХ и умолчания  ??? проверка вводных + в выражении убирать случ пробелы везде ?
	var start = "", fin = ""; // ЮЗЕР   ??? если какой-нибудь эл-т нулевой(какой id сделать?)
		start = document.getElementById("startname").value || "MUUIIIUI";
		fin   = document.getElementById("finname").value || "";

	//// МАССИВ СТОПОВ [max слева, max справа,  min слева, min справа] 
	// рекомендация - изменять только arrStop[1] (не больше 18) ??
	var arrStop = [0, 0, 0, 0]; // ЮЗЕР  ограничение длины выражений
		arrStop[0] = document.getElementById("limname0").value || 100;
		arrStop[1] = document.getElementById("limname1").value || 10;
		arrStop[2] = document.getElementById("limname2").value || 0;
		arrStop[3] = document.getElementById("limname3").value || 0;
	
		arrStop[0] = Math.min(arrStop[0], arrStop[1]);  	            arrStop[2] = Math.max(arrStop[2], arrStop[3]);
		arrStop[0] = Math.max(arrStop[0], start.length, fin.length);  	arrStop[1] = Math.max(arrStop[1], start.length, fin.length);
		arrStop[2] = Math.min(arrStop[2], start.length, fin.length);  	arrStop[3] = Math.min(arrStop[3], start.length, fin.length);

	
	//// ЮЗЕР   МАССИВ ФУНКЦИЙ  !! + защита от дурака - 1запятые в вводе, 2нет ф-ции, 3 в базе не ф-ция
	var arrFnc=[], arrFncAssociativ = [];
	//// ??? как-то вставлять , образовывать ф-ции в ассоц массив 
	arrFncAssociativ["UU"] = UU; arrFncAssociativ["III"] = III; arrFncAssociativ["I"] = I; arrFncAssociativ["M"] = M; 
	
	var strFncs = document.getElementById("fncs").value; // строка с именами ф-ций
	strFncs = normPunctOneOSC(strFncs) // зпт
	strFncs = TrimStringOSC (strFncs) // пробелы
	// список ф-ций по умолчанию вставлен в html (value)  ////  или от юзера

	var arrTemp = strFncs.split(" "); 
	for (var i=0, j=0; i < arrTemp.length; i++,j++) {
		if (!arrFncAssociativ[arrTemp[i]]) { // проверка сущ соотв ф-ции в БАЗЕ ф-ций.
			alert ("Нет соответствующей функции на позиции "+ (j+1))
			arrTemp.splice(i, 1);
			i--;
		}else arrFnc[i] = arrFncAssociativ[arrTemp[i]];
	};
	checkFnc(arrFnc); // проверка на соответствие ф-ций





	var arrFncColor = ["Red", "rgb(255,0,255)", "rgb(0,255,255)", "rgb(0,255,0)"];  // ЮЗЕР  цвета ф-ций ??? тип ф-ции св-ва ///
	
	///// ФЛАГИ ограничения  /////
	var stopLewels=500000;  //ограничение  уровней - если без повторов не нужно.
	var flagRepeatLewel = 0, flagRepeatAll = 0; // ЮЗЕР   c повторениями выражений на УРОВНЕ и вообще.  1.
	if (flagRepeatAll) {
		flagRepeatLewel = 1 //?? нужно ли связывать? //если общие повторы да, то и на уровне тоже.
		stopLewels = 30; // ?? ограничение уровней если c повторами.
	};
	var flagBreakYes = 0; // ЮЗЕР  останов при нахождении fin  - 1(на уровне), 2(на слове)   
	if (fin) {flagBreakYes = 0}; //undefined если fin "" то поиск не ограничен  нахождением fin.
	var flagSimpleRez = 0; // простой вывод результата 1
	// -----------------------------------------------------------------



	
	/////////////// ПЕРЕМЕННЫЕ //////////////////
	var hash=[], lewel=[];   
	var arrActs=[], act="" ; //    k, m
	lewel[0] = [start], hash[start] = start;
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
	infoMaxMin["flagRepeatLewel"] = flagRepeatLewel; // флаги повторов
	
	infoMaxMin["flagRepeatAll"] = flagRepeatAll;// пока не использ
	infoMaxMin["flagBreakYes"] = flagBreakYes; // пока не использ
	
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
							arrRezTemp = [" ", numAll, i, word, j,   partWord0, partWord1, partWord2,     fncName,     k, m,  arrRepitLewel[act],  act, limitInfo,  " "];
							arrRez.push(arrRezTemp);// нужны ли в массиве j и k?  
							
							infoMaxMin["maxNumAll"] = numAll;  // макс нумерация
							infoMaxMin["maxI"] = i;  //  макс уровней
							limitInfo = ""; 
							ways[act] = ways[word] + " --"+ fncName + "-- " + act;  // ???
							waysShort[act] = waysShort[word] + "--" + act;
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
	
		infoMaxMin["ways"] = ways; 
		infoMaxMin["waysShort"] = waysShort; 

	///  ???  сделать ф-цию сортировки, групировки таблицы ... кликом в таблице на экране
		
	if (!flagSimpleRez){dispBig (arrRez, fin, infoMaxMin)}
	else {
		document.getElementById("textsmall").innerHTML = (ways[fin]);
		// document.getElementById("textbigout").style.display = "none"
	}
	return arrRez;  // ?? 
}
			






/////////////////////////////////////////////////////////////////////////
////////////////   ВЫВОД РЕЗУЛЬТАТА  в виде таблицы  !!! ////////////////
/////////////////////////////////////////////////////////////////////////
function  dispBig(arrRez, fin, infoMaxMin){
	var arrIgnor = [3,4,9,10,11];  // массив игнора столбов  + юзер ввод ???
// -----------------------------------------------------------------
	
	var textRez = ""; 
	var textUp = "";

	var separ = alignTextOSC ( ("<td>"+" "+ "</td>"),arrRez[0].length-3, arrIgnor.length); // ??
	var separ1 = "<tr class='separ1'>" + separ + "</tr>"; // оформ пробела  меж уровнями
	var separ2 = "<tr class='separ2'>" + separ + "</tr>"; // оформ пробела  меж выражениями
	// длина зависит от кол-ва игнор столбцов и объединённых столбцов -2

	///// формирование таблицы /////
	textRez += "<TABLE id='bigtable'>" 
	textRez += separ1
	for (var i=0; i < arrRez.length; i++) { ///// СТРОКИ 
		
		///// оформление пробелов  /////
		if (arrRez[i-1] && (arrRez[i-1][2]!=arrRez[i][2])) {textRez += separ1} //  пробел  меж уровнями
		else {
			if (arrRez[i-1] && (arrRez[i-1][3]!=arrRez[i][3])) {textRez += separ2}; // пробел  меж выражениями
		};
		
		textRez += " <tr class='" +  arrRez[i][3] + "'id='" + arrRez[i][11] +"'>"; ///// КЛАСС И ID 
		// !!! class нач выраж, id  второе выражение,  title ??  потом по клику цепочкой циклом (анимир) выделять ... ... ...
		
		
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
	for (var s=0; s < infoMaxMin["fnc"].length; s++) {
		if (!infoMaxMin["fncColor"][s]) infoMaxMin["fncColor"][s] = "Goldenrod" // цвет по умолчанию.
		styleFnc+= "." + infoMaxMin["fnc"][s].name + "_" + "{color:" + infoMaxMin["fncColor"][s] + ";} "// добавил_ для уникальности.	
	}; 
	styleFnc+="</style> ";
	textRez += styleFnc;
	
	
	///// ОКОНЧАТЕЛЬНЫЙ ВЫВОД /////
	document.getElementById("textbig").innerHTML=textRez;	// вывод большого результата
			
	document.getElementById("textup11").innerHTML= infoMaxMin["numYes"] + ". "  + infoMaxMin["lewelYes"] + ". "; // резюме верхнее	
	document.getElementById("textup21").innerHTML= infoMaxMin["maxNumAll"] + ". " + infoMaxMin["maxI"] + ". ";	
	
	var elemBigTableSize = document.getElementById("bigtable").offsetWidth ;
	// elemSize.width = map.offsetWidth + map;   ???  не выхоит установить ширину


	/////////////////
	illuminatChain (arrRez, fin, infoMaxMin);
}






/////////////////////////////////////////////////////////////////////////
///////////  РЕАКЦИЯ НА НАВЕДЕНИЕ, КЛИК + последн столбец  //////////////
/////////////////////////////////////////////////////////////////////////
function  illuminatChain (arrRez, fin, infoMaxMin){
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

	var limIlluminat = 50; // ограничение (на сколько слов подсветка вниз)
// -----------------------------------------------------------------
	
	var arrSaveClk = []; // массивы врем хранения подсветки кликом
	var arrSaveClkDn = [];
	var saveClk = "";
	var elemFin = document.getElementById(fin);
	
	//// ф-ция подсчёта крапа) ////
	function kraping (str, sign){
		rez = [str]
		if (~str.indexOf(sign)) {
			rez = str.split(sign); 
		};
		return rez.length-1;
	}

	/// подсвет fin    ///
	// ??? не получается имитировать даблклик
	var arrRezSmall = [];
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
	document.getElementById("textsmall").innerHTML = arrRezSmall.join("")+ "<tr style='height:8px;'>   </tr>"//  + "<br>";
	
	
	
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
		var elemThisRow = document.getElementById(arrRez[i][11]);
		elemThisRow.style.cursor = "pointer"; 
		elemThisRow.title = infoMaxMin["waysShort"][arrRez[i][11]];
		var noKrapID = arrRez[i][12]; 
		
		var tmpRez = kraping(arrRez[i][11], ".");
		if (tmpRez){elemThisRow.lastChild.innerHTML = tmpRez}; // число повторов (точек) в последний столбец
		
		var tmpLast = elemThisRow.lastChild; 
		if(!document.getElementsByClassName(noKrapID).length){tmpLast.style.backgroundColor = colorStop};  //   подсветка тупиковых выражений
		if (~infoMaxMin["arrNullAct"].indexOf(noKrapID)) {tmpLast.style.backgroundColor = colorRealStop}; //   подсветка реально тупиковых выражений
		
		
	
	///////////    СОБЫТИЯ    /////////////
	//// ДАБЛ КЛИК ////
	var s=0;
	elemThisRow.ondblclick = function illuminatDblClick(e) {
		var arrRezSmall = [];
		var row = this;
		while (row){
			var ser = row.outerHTML; 
			ser = ser.replace(/id=\"\w+\"/,"id='"+s+"'"); // id заменяем
			ser = ser.replace(/class=\"\w+\"/,"class='"+s+"'"); //  class тоже заменяем
			if (!flagColorRezSmall) ser = ser.replace(/\s*style=\s*\"background\-color:\s*\S*\s*\S*\s*\S*\;\s*\"/g,"");// результ по дабл клику без лишней расцветки  ??  !!!
			arrRezSmall.unshift(ser);
			if (this.id == fin) row.firstChild.style.backgroundColor = colorPreFin;
			row = document.getElementById(row.className);
			s++;
		};
		if (this.id == fin) elemFin.firstChild.style.backgroundColor = colorFin;	// подсветка результата
		document.getElementById("textsmall").innerHTML += arrRezSmall.join("")+ "<tr style='height:8px;'>   </tr>"//  + "<br>"+ "<br>";
///  неправильно отражается в браузе ???  пришлось ставить "<br>"
	};


	//// КЛИК МЫШИ  ////
	elemThisRow.onclick = function illuminatClick(e) {
		var noKrapID = this.cells[5].innerHTML; 

		var flagBack = 0;
		if (~arrSaveClk.indexOf(this)) {flagBack = 1};
		///  сброс прежней подсветки  ///
		for (var j=0; j < arrSaveClk.length; j++) {  
			arrSaveClk[j].cells[1].style.backgroundColor = colorOut;	
		};
		arrSaveClk = [];
		for (var j=0; j < arrSaveClkDn.length; j++) {  
			arrSaveClkDn[j].cells[1].style.backgroundColor = colorOut;	
		};
		arrSaveClkDn = [];
		if (saveClk) saveClk.cells[1].style.backgroundColor = colorOut;
		saveClk = "";
		
		if (flagBack == 1) {return};// второй клик не подсвечивает
		
		/// подсветка вверх /// 
		var row = this;   
		while (row){
			arrSaveClk.push(row);
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
				arrSaveClkDn.push(arrTmpClass[k]);
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
		for (var j=0; j < arrSaveClk.length; j++) {  
			arrSaveClk[j].cells[2].style.backgroundColor = colorOut;	
		};
		for (var j=0; j < arrSaveClkDn.length; j++) {  
			arrSaveClkDn[j].cells[2].style.backgroundColor = colorOut;	
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
		for (var j=0; j < arrSaveClk.length; j++) {
			arrSaveClk[j].cells[1].style.backgroundColor = colorPreClick;	
		};
		for (var j=0; j < arrSaveClkDn.length; j++) {
			arrSaveClkDn[j].cells[1].style.backgroundColor = colorPostClick;	   
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




//////////  ВКЛ - ВЫКЛ РАСШИРЕННЫК НАСТРОЙКИ ////////////
// ???  не работает в fox 
var flagCheck = 0;
function openDisabled(){
	var imp = document.getElementsByClassName("disabled");
	var bat = document.getElementById("buttonAdd");
	if(!flagCheck){
		for (var i=0; i < imp.length; i++) {
			imp[i].style.backgroundColor="White";
			imp[i].removeAttribute("disabled");  // ещё бы значения в окошках сбрсить на начальные
		};
		bat.value = "Основные";
		flagCheck = 1;
	}
	else{
		for (var i=0; i < imp.length; i++) {
			imp[i].style.backgroundColor="rgb(204,204,204)";
			imp[i].setAttribute("disabled");
		};
		bat.value = "Расширенные"
		flagCheck = 0;
	}
}






