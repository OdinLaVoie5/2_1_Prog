
//   ##проверка  в строке только числа   ##регулярные
function onlyNumbers(inputString)
{
  var searchForNonNumbers = /\D+/;   // всё кроме чисел
  return (searchForNonNumbers.test(inputString) == false);    // !!!
} 
assert(onlyNumbers('435к в'),'содержит не только цифры ');  //1///////////






// преобразования минуты в часы !!
function minutesToHours(min)
{
  var hrs = Math.floor(min/60);
  min = min % 60;
  if(min<10) min = "0" + min;
  return hrs + ":" + min;
}


// преобразования секунды в минуты  
function secondsToMinutes(sec)
{
  var min = Math.floor(sec/60);
  sec = sec % 60;
  if(sec<10) sec = "0" + sec;
  if(min<10) min = "0" + min;
  return min + ":" + sec;
}


// преобразования секунды в часы  
function secondsToHours(sec)
{
  var hrs = Math.floor(sec/3600);
  var min = Math.floor((sec%3600)/60);
  sec = sec % 60;
  if(sec<10) sec = "0" + sec;
  if(min<10) min = "0" + min;
  return hrs + ":" + min + ":" + sec;
}

assert(1,minutesToHours(193) + ' ' + secondsToMinutes(143) + ' ' + secondsToHours(17843));  //2///////////







// опред платформы
/*function platformDetect(){
  if(navigator.appVersion.indexOf("Win") != -1) {
    alert("Windows");
  }
  else if(navigator.appVersion.indexOf("Mac") != -1) {
    alert("Macintosh");
  }
  else alert("Other");
}

platformDetect()
*/



// сведения о браузе +++
/*function BrowserInfo()  // конструктор
{
  this.name = navigator.appName;
  this.codename = navigator.appCodeName;
  this.version = navigator.appVersion.substring(0,4);
  this.platform = navigator.platform;
  this.javaEnabled = navigator.javaEnabled();
  this.screenWidth = screen.width;
  this.screenHeight = screen.height;
}

var b = new BrowserInfo();
alert(b.version); */

//=======================================================










