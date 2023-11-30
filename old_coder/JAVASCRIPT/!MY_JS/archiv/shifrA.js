//  вариант   база-алфавит с ё Ё                 
//     учесть перенос строки ...  небуквы ???  
//  ограничить kluch dekluch  числом букв базы  (kluch = kluch % base.length)





// базы 
var base = "абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ"
//================================================================================


// переменные
//  + др методы шифрования     + случ метод  или случ ключ метода и самому расшифровать  ??  
var kakshifr = zesar;      // методы по умолчанию
var kakDeshifr = dezesar;
var onnn = document.getElementById('onnn')    
var tooo = document.getElementById('tooo')  
//======================================================================



// реализация  (исполнение)
function doEncode(btn, kakshifr) {
  var form = btn.form;
  form.input2.value = ""
  form.output.value = ""
  var val = form.input1.value,
  kluchA = form.kluchA.value*1;
  kluchB = form.kluchB.value*1;

  form.input2.value = kakshifr(val, kluchB, kluchA).join("");
}


function doDecode(btn, kakDeshifr) {
  var form = btn.form;
  var val = form.input2.value,
  dekluchA = form.dekluchA.value*1;
  dekluchB = form.dekluchB.value*1;

  form.output.value = kakDeshifr(val, dekluchB, dekluchA).join("");
}


function doRoundTrip(btn) {
	doEncode(btn, kakshifr);
	doDecode(btn, kakDeshifr);
}

// ===============================================================






// ??  объединить все методы в один объект?
//  методы шифрования
function zesar(val, kluchB) {
  var rez = [];
  for (var i=0; i<val.length; i++) {
	  var temp = base.indexOf(val[i]);
	  if((temp > 32 - kluchB && temp <= 32) || (temp > 65 - kluchB && temp <= 65) ) {temp -= 33;} 
	  rez[i] = base.charAt(temp + kluchB); 
  }
  return rez;
}

function dezesar(val, dekluchB) {
  var rez = [];
  for (var i=0; i<val.length; i++) {
	  var temp = base.indexOf(val[i]);
	  if((temp >= 0 && temp < 0 + dekluchB) || (temp >= 33 && temp < 33 + dekluchB) ) {temp += 33;} 
	  rez[i] = base.charAt(temp - dekluchB); 
  }
  return rez;
}





//    афинный код        (НОД) чисел а и n должен быть равен 1 
// сделать if как в  zesar

function afin (val, kluchB, kluchA) {
	
  var rez = [];
  for (var i=0; i<val.length; i++) {
	var temp = base.indexOf(val[i]);
	rez[i] = base.charAt((kluchA*temp + kluchB)%66); 
  }
  return rez;
}


//   сделать deafin
//====================================================================






// назначение метода шифрования       и оформление 

var but1 = document.getElementsByClassName("shifr");     
for (var i = 0; i < but1.length; i++) {
  but1[i].onclick = function () {
// изменить на case ??	
	if(this.id === '11'){kakshifr = zesar; onnn.style.visibility = 'hidden'};    
	if(this.id === '12'){kakshifr = afin; onnn.style.visibility = 'visible'};
	if(this.id === '13'){kakshifr = 0; onnn.style.visibility = 'hidden'};
	for (var i = 0; i < but1.length; i++) {
	  but1[i].style.color='Black';
	}
  this.style.color='Red';
  }
}


var but2 = document.getElementsByClassName("deshifr");     
for (var i = 0; i < but2.length; i++) {
  but2[i].onclick = function () {
	if(this.id === '21'){kakDeshifr = dezesar; tooo.style.visibility = 'hidden'};
	if(this.id === '22'){kakDeshifr = 0; tooo.style.visibility = 'visible'};
	if(this.id === '23'){kakDeshifr = 0; tooo.style.visibility = 'hidden'};
	for (var i = 0; i < but2.length; i++) {
	  but2[i].style.color='Black';
	}
  this.style.color='Red';
  }
}









