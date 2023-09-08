
//     установка размеров панелей меню
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