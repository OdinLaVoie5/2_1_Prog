//  сделать выбор мини приложения  ???


/*
//////////////////////////  2 слова по порядку  ///////////////////////
function fSlovaAlf () {
	var S1; var S2;
	S1=prompt("Первое слово");    S2=prompt("Второе слово");
	if (S1>S2) {alert(S2+" / " + S1)}
	else {alert(S1+" / " + S2)};
}
fSlovaAlf ()

*/






//////////////////////////  Таблица умножения  ////////////////////
//  !!  ?? сделать таймер.  

function fTabUmnog() {
	var A = 0, B = 0, correct = 0, answer = 0, balls = 0, question = "", flag = 1, repet = [];
	var level = prompt("Сколько примеров показать (5 - 20)");
	if (level == null) { alert("До свидания!"); return } // cancel  
	else if (!isNumericOSC(level) || level < 5) { level = 5 } // неверн ввод(если ввели не число или ничего)  или слишком малое
	else if (level > 20) { level = 20 };
	for (i = 1; i <= level; i++) {
		if (flag) {
			A = Math.floor(Math.random() * 8) + 2;  // случайные числа
			B = Math.floor(Math.random() * 8) + 2;

			if (~repet.indexOf(A + "" + B)) { i--; continue };  // исключаеть повторы, в том числе зеркальные. 
			repet.push(A + "" + B);
			repet.push(B + "" + A);
		}
		question = A + " * " + B + " = ?";
		answer = prompt(question); // вывод задания
		flag = 1;
		if (answer == null) { break } // cancel  если надоело. оставшиеся считаем неправильным
		else if (!isNumericOSC(answer)) { i--; alert("Введите число"); flag = 0 } //неверн ввод(если ввели не число или ничего). (пример запомин)
		else if (answer != A * B) { alert("Неверно!  " + A + " * " + B + " = " + A * B); flag = 0; i--; } // неверн ответ
		else correct = correct + 1;
	}
	if (correct == level) { alert("Отлично!") }
	else {
		balls = Math.floor((correct) / level * 5 + 0.5)
		if (balls == 0) { balls = 1 };
		alert("правильно " + correct + " из " + (level) + "-ти" + " / оценка " + balls);
	}
}
//     fTabUmnog ()





// Создать многомерный массив
function fTabUmnogBig(n, m) {
	var table = new Array(n); // В таблице 10 строк
	for (var i = 0; i < table.length; i++)
		table[i] = new Array(m); // В каждой строке 10 столбцов
	// Инициализировать массив
	for (var row = 0; row < table.length; row++) {
		for (col = 0; col < table[row].length; col++) {
			table[row][col] = (row + 1) * (col + 1);
		}
	}
	return table;
}
var table = fTabUmnogBig(15, 28)
// Расчет произведения 5*7 с помощью многомерного массива
var product = table[10 - 1][20 - 1]; // 35//
/*alert (table)
alert (product)// 
*/


