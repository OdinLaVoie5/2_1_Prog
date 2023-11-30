//    !!!   установка размеров панелей меню
function tmpMenuHeight (){
	var tmp = menu00.firstElementChild.nextElementSibling.offsetTop;
	menu00.style.height=tmp + "px"
	var tmp = menu01.firstElementChild.nextElementSibling.offsetTop;
	menu01.style.height=tmp + "px"
	var tmp = menu02.firstElementChild.nextElementSibling.offsetTop;
	menu02.style.height=tmp + "px"
	var tmp = menu03.firstElementChild.nextElementSibling.offsetTop;
	menu03.style.height=tmp + "px"
}
tmpMenuHeight ()


////////  ПАНЕЛЬ ДАННЫХ И НАСТРОЕК   //////////
// ОТКРЫТЬ - СКРЫТЬ все настройки  // клик по заголовку
var flagProper = 0;
function openProper0(){  
	var menu00 = document.getElementById("menu00"); 

	if (menu00.style.top == "0px") {
		menu00.style.top = "-1500px";
	}
	else {
		menu00.style.top = "0px";
	}
}

function openProper1(){      
	var menu01 = document.getElementById("menu01"); 

	if (menu01.style.top == "0px") {
		menu01.style.top = "-1500px";
		
	}
	else {
		menu01.style.top = "0px";
		flagProper = 1;
	}
}

function openProper2(){      
	var menu02 = document.getElementById("menu02"); 

	if (menu02.style.top == "0px") {
		menu02.style.top = "-1500px";
	}
	else {
		menu02.style.top = "0px";
		flagProper = 1;
	}
}

function openProper3(){      
	var menu03 = document.getElementById("menu03"); 
	if (menu03.style.top == "0px") {menu03.style.top ="-1500px"}
	else {
		menu03.style.top = "0px";
		flagProper = 1;
	}
}


// дабл клик по заголовку и кнопка закр все настройки ////
function openAllProper0(){
	if(!flagProper){
		document.getElementById("menu00").style.top = "0px"; 
		document.getElementById("menu01").style.top = "0px"; 
		document.getElementById("menu02").style.top = "0px"; 
		document.getElementById("menu03").style.top = "0px"; 
		flagProper = 1;
	}
	else{
		document.getElementById("menu00").style.top = "-1500px"; 
		document.getElementById("menu01").style.top = "-1500px"; 
		document.getElementById("menu02").style.top = "-1500px"; 
		document.getElementById("menu03").style.top = "-1500px"; 
		flagProper = 0;
	}
}


