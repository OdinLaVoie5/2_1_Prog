
//=================================================================================
//=================================================================================
//  оформление. прав панель меню     ??  сделать обозначение меню (текстура)
var ctrl = document.getElementById("ctrl");
var ctrl1 = document.getElementById("ctrl1");
var ctrl2 = document.getElementById("ctrl2");
var nav = document.getElementsByTagName ("nav")[0];
var form = document.getElementsByTagName ("form")[0];


window.onload = function () {    // сравниваем вертик коорд нижнего (контрольного) элемента (offsetTop) и    размер видимого окна (innerHeight)    и выбираем большее.
	var temp = window.innerHeight;
	var temp1 = ctrl2.offsetTop;
	temp<temp1 ? temp=temp1 : temp;
	temp+='px'
	ctrl.style.height = temp;
	ctrl1.style.height = temp;
	}


window.onresize = function () {
	var temp = window.innerHeight;
	var temp1 = ctrl2.offsetTop;
	temp<temp1 ? temp=temp1 : temp;
	temp+='px'
	ctrl.style.height = temp;
	ctrl1.style.height = temp;
	}


ctrl.onclick = function () {
	  nav.style.display='none';
	  ctrl.style.width='8px';  
	var temp = window.innerHeight;
	var temp1 = ctrl2.offsetTop;
	temp<temp1 ? temp=temp1 : temp;
	temp+='px'
	ctrl.style.height = temp;
	ctrl1.style.height = temp;
}


//   работа прав меню
ctrl.onmouseover = function () {
	  nav.style.display='inherit';
	  ctrl.style.width='200px';
}
form.onmouseover = function () {
	  nav.style.display='none';
	  ctrl.style.width='8px';
}




