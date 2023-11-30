//  вариант                    учесть ё Ё ?   1105 ё 1025 Ё       и небуквы?  
//     и перенос строки ...
//  + др методы шифрования     + случ метод  или случ ключ метода и самому расшифровать
//  ограничить kluch dekluch  числом букв базы  (kluch = kluch % base.lenght)


// переменные
var kakshifr = zesar;
var kakDeshifr = dezesar;

//======================================================================



// реализация  (исполнение)
function doEncode(btn, kakshifr) {
  var form = btn.form;
  form.input2.value = ""
  form.output.value = ""
  var val = form.input1.value,
  kluch = form.kluch.value*1;

  form.input2.value = kakshifr(val, kluch).join("");
}


function doDecode(btn, kakDeshifr, dekluch) {
  var form = btn.form;
  var val = form.input2.value,
  dekluch = form.dekluch.value*1;

  form.output.value = kakDeshifr(val, dekluch).join("");
}


function doRoundTrip(btn) {
	doEncode(btn, kakshifr, kluch);
	doDecode(btn, kakDeshifr, dekluch);
}

document.write('Я'.charCodeAt(0));   
document.write(String.fromCharCode(1040));   
// ===============================================================








//  методы шифрования
function zesar(val, kluch) {
  var rez = [];
  for (var i=0; i<val.length; i++) {
	  var temp = val.charCodeAt(i); 
	  if((temp > 1103 - kluch && temp <= 1103) || (temp > 1071 - kluch && temp <= 1071) ) {temp -= 32;} 
	  rez[i] = String.fromCharCode(temp + kluch); 
  }
  return rez;
}

function dezesar(val, dekluch) {
  var rez = [];
  for (var i=0; i<val.length; i++) {
	  var temp = val.charCodeAt(i); 
	  if((temp >= 1072 && temp < 1072 + dekluch) || (temp >= 1040 && temp < 1040 + dekluch) ) {temp += 32;} 
	  rez[i] = String.fromCharCode(temp - dekluch); 
  }
  return rez;
}
//====================================================================






// оформление и назначение метода шифрования

var but1 = document.getElementsByClassName("shifr");     
for (var i = 0; i < but1.length; i++) {
  but1[i].onclick = function () {
	if(this.id === 'zesar'){kakshifr = zesar};    // изменить на case ??
	if(this.id === '12'){kakshifr = 0};
	if(this.id === '13'){kakshifr = 0};
	for (var i = 0; i < but1.length; i++) {
	but1[i].style.color='Black';
   }
  this.style.color='Red';
  }
}


var but2 = document.getElementsByClassName("deshifr");     
for (var i = 0; i < but2.length; i++) {
  but2[i].onclick = function () {
	if(this.id === 'dezesar'){kakDeshifr = dezesar};
	if(this.id === '22'){kakDeshifr = 0};
	if(this.id === '23'){kakDeshifr = 0};
	for (var i = 0; i < but2.length; i++) {
	but2[i].style.color='Black';
   }
  this.style.color='Red';
  }
}







