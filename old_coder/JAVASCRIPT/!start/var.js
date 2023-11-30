// my      поменять местами переменные без помощи 3-ей. 
var aaa = 12, bbb = 37;
assert(1, aaa + ' ' + bbb);   //12/////////////////

raz = (bbb+'').length;          // число разрядов
mnoz = Math.pow(10, raz);
aaa +=  bbb/mnoz;               //  получил 12,37
bbb = Math.floor(aaa);          // целая часть
aaa = Math.round((aaa - bbb)*mnoz);  // пришлось округлить

assert(1, aaa + ' ' + bbb);   //13/////////////////




// my      поменять местами переменные без помощи 3-ей.     (общий случай)
var aaa = 12.78, bbb = 64.125;  // или    var aaa = 'aaa', bbb = 'bbb';  
assert(1, aaa + ' ' + bbb);   //14/////////////////

aaa = aaa + ' ' + bbb;   
aaa = aaa.split(' ')
bbb = aaa[0];
aaa = aaa[1];

assert(1, aaa + ' ' + bbb);   //15/////////////////
/* assert(1, (aaa*1 + bbb*1));   ////  */




//  ##parseInt(str, основание)  ##parseFloat (строку начинающуюся с числа в целое/десятичн число )
assert(1, parseInt('1AC.53th',16) + ' // ' + parseFloat('28.53th'));   //16/////////////////
//kkk  alert( +'12px'); // NaN             
//kkk  alert( parseInt('12px') ); // 12      ((помогает оцифровать размеры))






//      ##toFixed округление числа до опред кол-ва цифр после запятой
assert(1, 2..toFixed(4) +' '+ 2.16523765.toFixed(4));   //17 /////////////////
//   восьмиричные числа     -  двоичные числа    !!
assert(1, 0765.toString(2));   //18 /////////////////
//   в «научном формате» или экспоненциальной форме («запись с плавающей точкой»).  
assert(1, 4567e-3+' '+4567e3);   //19 /////////////////


// isNumericOSC (см OSC) проверит то,что пролезет через ##isNaN из-за преобразования !!!!
// + ##isFinite      +isReallyNaNOSC
assert(1, isNumericOSC(null) +' ' +isNumericOSC(false) +' ' +isNumericOSC('') +' '+ !isNaN(null)+' '+ !isNaN(false)+' '+ !isNaN(''));     //20/////////////////


//  ##toString   Основание может быть любым от 2 до 36.  
var n = 1234567890; 
assert(1, n.toString(36) ); // kf12oi     //21/////////////////









//==========================================================

//  ##null   ##undefined
document.write("<br>");
document.write(undefined === undefined);    document.write(" / "); // единственное true для undefined  и == 
//   Значения null и undefined равны == друг другу и не равны чему бы то ни было ещё.
document.write(null >= 0); document.write(" ");     // казусы  null 
document.write(null === 0); document.write(" "); 
document.write(null > 0);  document.write(" "); 
document.write("<br>");


//  числа в восьмеричном и шестнадцатеричном виде  
document.write(0x47);    document.write(" ");
document.write(047);    document.write(" ");
document.write(47);    document.write("<br>");



//  ##Побитовые операции           + шифрование  
//  ##parseInt (".......", 2)  получение двоичн чисел из строки,         
//  ##toString (2)   обратно получение двоичн чисел в виде строки

document.write((parseInt("01000", 2) ^ parseInt("10101", 2))  .toString(2));  document.write(" "); document.write(" / ");
document.write((parseInt("11101", 2) ^ parseInt("10101", 2))  .toString(2));  document.write(" "); document.write("<br>");
document.write(14&5);  document.write(" 01110 00101 00100");  document.write("<br>");

//  !!!!  простой способ округления (отброс дробной части)
document.write(~~12.345);    document.write(" ");
document.write(4.3*6.5^0);    document.write("<br>");


  var str = "Проверка";
if (~str.indexOf("верка")) { // Сочетание "if (~...indexOf)" читается как "если найдено"     т.к. при -1 (не найдено) преобраз в 0.
// kkk  alert( 'найдено!' ); 
}






var zzz =12345678912345;// будет ошибка в вычислении т.к. здесь двоичн число более чем 32 бит -старшие биты отбросятся
document.write(zzz.toString(2));    document.write("    ");
document.write(parseInt("10110011101001110011110011100101101101011001", 2)^0);    document.write("<br>");










