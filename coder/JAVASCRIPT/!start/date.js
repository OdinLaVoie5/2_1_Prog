//  Sun, Mon, Tue, Wed, Thu, Fri, Sat

//  new Date()   ##getDate ##getMonth  ##getFullYear   ##getDay       ##Date
// + ##getHours(), ##getMinutes()   ##getSeconds()    ##getMilliseconds()
// + см файл  event 
//      объект Date, хранящий значение даты и времени. Его экземпляры можно создать только явно, оператором new:


var dNow = new Date();
var dateString = dNow.toString();       
assert (1, dateString)            //1//////////////

// !! Дата в привычном виде
var sNow = dNow.getDate() +"." + dNow.getMonth() +"." +dNow.getFullYear();
assert (1, sNow)            //2//////////////   


assert (1, dNow.getDay())   //3///////////// день недели
assert (1, new Date(2009, 12, 31))   //4///////////// установить дату





//  ##фрагменты  количественные в порядковые англ        
function DDtoDay(inputDate){
  var dateString = new Array('','st','nd','rd','th','th','th','th','th','th','th','th','th','th','th','th','th','th','th','th','th','st','nd','rd','th','th','th','th','th','th','th','st');
  returnDate = '';
  tempDate = parseInt(inputDate);
  if (tempDate >= 1 && tempDate <= 31) {
	  returnDate = inputDate + dateString[tempDate];
	}
	return returnDate;
}
assert (1, DDtoDay(23))                        //5//////////////


// ##toTimeString()    норм представление времени  
assert(1, dNow.toTimeString().substr(0,8));    //6/////////////////




var milli = new Date(100001*10002*1503);
assert(1, milli);                             //7/////////////////







//  ##Date.now миллисек сейчас      !!  ##performance.now()возвращает количество миллисекунд, прошедшее с начала загрузки страницы.
assert(1,  Date.now());                     //8/////////////////
//   assert(1,  performance.now());   ///////   см в браузе






// ##toLocaleString  (в строку с региональными установками)
//  настройки в виде объекта options

var date = new Date()     // -- my  new Date(2019, 11, 31, 12, 30, 0);
var options = {
  era: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
  timezone: 'UTC',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
};
assert(1, date.toLocaleString("ru", options) +' /// '+date.toLocaleString("en-US", options)); 
// среда, 31 декабря 2014 г. от рожд Христ 12:30:00             !!   СМ В БРАУЗЕ
// Wednesday, December 31, 2014 Anno Domini 12:30:00 PM             //9/////////////////







// ##toDateString  ##toTimeString ##toString
assert(1, date.toDateString()+' /// '+date.toTimeString());      //10/////////////////
//  assert(1, date.toString());   /////////
// assert(1, date.toTimeString().substr(0,8));   ////////

// + ##toISOString  формат похожий на '2011-01-26T13:51:50.417Z'
var d = new Date();
//  alert( d.toISOString() );  




//  Date. ##parse  упрощённый формат ISO   (в виде строки)
var ms = Date.parse('2012-01-26T13:51:50.417-07:00');   
//  alert( ms ); // 1327611110417 (число миллисекунд)      СМ В БРАУЗЕ

//  устаревший формат IE 
var ms = Date.parse("January 26, 2011 13:51:50");
// alert( ms );





//=================================================================
// примеры
var date = new Date(2012, 1, 20, 3, 12)
// 20 февраля 2012 года, 3 часа 12 минут.    Год year должен быть из 4 цифр.        Отсчет месяцев month начинается с нуля 0
//  alert (date)




var date = new Date(2012,0,3); // 3 января 2012
// вариант
function getWeekDay(date) {
  var days = ['вс','пн','вт','ср','чт','пт','сб']; 
  return days[date.getDay()] ;
}
// alert( getWeekDay(date) ); // Должно вывести 'вт'

//  !!  вариант1  с toLocaleString       для совр брауз
var date = new Date(2014, 0, 3); // 3 января 2014
// alert( date.toLocaleString('ru', {weekday: 'short'}) ); // 'Пт'



// alert (new Date(Date.now()) )   // ха
// alert (new Date(new Date(new Date(new Date(new Date(new Date()))))))   // хаха  !!


function getLocalDay(date){
  return date.getDay()===0 ? 7: date.getDay();
}
var date = new Date(2012, 0, 3); // 3 янв 2012
//  alert( getLocalDay(date) ); // вторник, выведет 2



// День указанное количество дней назад
function getDateAgo(date, days){
  var temp = new Date(date);     // создаёт копию даты, чтобы манипулировать копией
  temp.setDate(date.getDate() - days);
  return temp.getDate();
}
var date = new Date(2015, 0, 2);
/*alert( getDateAgo(date, 1) ); // 1, (1 января 2015)
alert( getDateAgo(date, 2) ); // 31, (31 декабря 2014)
alert( getDateAgo(date, 365) ); // 2, (2 января 2014
*/




//  Последний день месяца    ##пример
function getLastDayOfMonth(year, month) {
  var temp = new Date(year, month+1, 0);
  return temp.getDate();
}
// alert (getLastDayOfMonth(2012, 1))  // 29



// вариант  Сколько секунд уже прошло сегодня?
function getSecondsToday() {
  var now = new Date();
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return  Math.round((now - today)/1000); // округлить ?
}
// вариант1
function getSecondsToday1() {
var d = new Date();
return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
};
assert(1, getSecondsToday() +' /// '+ getSecondsToday1());       //11/////////////////





// Сколько секунд – до завтра?
function getSecondsToTomorrow() {
  var now = new Date();
  var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1);
  return  Math.round((tomorrow - now)/1000); // округлить ?
}
assert(1, getSecondsToTomorrow());       //12/////////////////






// Вывести дату в формате дд.мм.гг            ##пример
function formatDateS(date) {
	var dd = date.getDate(), mm = date.getMonth()+1, yy = date.getFullYear()% 100;  
	if(dd < 10) dd = '0' + dd;
	if(mm < 10) mm = '0' + mm;
	if(yy < 10) yy = '0' + yy;
  return dd+'.'+mm+'.'+ yy ;
}
var d = new Date(2014, 0, 30); // января 30 2014
assert(1, formatDateS(d));                              //13/////////////////








function formatDate(date) {
var diff = new Date() - date; // разница в миллисекундах
if (diff < 1000) { // прошло менее 1 секунды
  return 'только что';
}
var sec = Math.floor(diff / 1000); // округлить diff до секунд
if (sec < 60) {
  return sec + ' сек. назад';
}
var min = Math.floor(diff / 60000); // округлить diff до минут
if (min < 60) {
  return min + ' мин. назад';
}
// форматировать дату, с учетом того, что месяцы начинаются с 0      !!!
var d = date;
d = [
  '0' + d.getDate(),
  '0' + (d.getMonth() + 1),
  '' + d.getFullYear(),
  '0' + d.getHours(),
  '0' + d.getMinutes()
];
for (var i = 0; i < d.length; i++) {
  d[i] = d[i].slice(-2);
}
return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');        // !!!
}
/* alert( formatDate(new Date(new Date - 999)) ); // только что
alert( formatDate(new Date(new Date - 22 * 1001)) ); // 30 сек. назад
alert( formatDate(new Date(new Date - 2 * 61 * 1044)) ); // 5 мин. назад
alert( formatDate(new Date(new Date - 86401 * 1055)) ); // вчерашняя дата в формате "дд.мм.гг чч
*/




function formatDate(dat) {
  if(typeof dat == 'string'){
	var temp = dat.split('.');
	temp[0] = temp[0].slice(-2); 
	return  temp.reverse().join('.'); 
  }	
  else if(typeof dat == 'number'){
	temp = new Date(dat).toISOString().split('T')[0].split('-').join('.');  
	return formatDate(temp); 
  }
  else if(Array.isArray(dat)){
	dat[1] = ('0'+(dat[1]+1)).slice(-2);
	dat[2] = ('0'+dat[2]).slice(-2);
	return formatDate(dat.join('.'));  
  }
  else {
	return formatDate(dat.getTime()+1E8); 
  };
	
}
/*alert( formatDate('2011.10.02') ); // 02.10.11
alert( formatDate(1234567890) ); // 14.02.09
alert( formatDate([2014, 0, 1]) ); // 01.01.14
alert( formatDate(new Date(2014, 0, 1)) ); // 01.01.14*/





