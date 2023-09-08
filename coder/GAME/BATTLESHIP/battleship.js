//  сделать досрочное завершение   или перезагрузку игры



var randomLoc = Math.floor(Math.random() * 5);
var location1 = randomLoc;
var location2 = location1 + 1;
var location3 = location2 + 1;
var guess;
var hits = 0;
var guesses = 0;
var isSunk = false;


////////////////////////////
var reGame = "N";
	var hitUs1 
	var hitUs2 
	var hitUs3 
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\


while (isSunk == false) {

	guess = prompt("Введите число от 0 до 6");
	
	
	
//   !!!                         исключить ввод букв.  
									
	if (guess < 0 || guess > 6 ){

		alert("Неверный ввод. Введите число от 0 до 6!");
	} 
	
////////////////////////////////////////////////////

	else if  (guess == hitUs1 || guess == hitUs2 || 	guess == hitUs3 ) {
		alert("уже было!");
	}
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

	
	else {

		guesses = guesses + 1;
		
////////////////////////////////////////////////////
if (guess == location1) {
	var hitUs1 = guess
} else if (guess == location2) {
	var hitUs2 = guess
} else if (guess == location3) {
	var hitUs3 = guess
}
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\



		if (guess == location1 || guess == location2 || guess == location3) {
            				
			alert("ПОПАДАНИЕ!");

			hits = hits + 1;

				if (hits == 3) {

					isSunk = true;

					alert("КОРАБЛЬ ПОТОПЛЕН!");

				}

		} else {

			alert("промах");

	}

  }

}

var stats = "Вы потопили корабль с " + guesses + " выстрелов, " +

"точность = " + (3/guesses);

alert(stats);





reGame = prompt ("Сыграем ещё?  (Y/N)");

if (reGame == "Y") {

alert ("Играем");                 //  !!! сделать перезагруз страницы 

}

else {

alert ("Не играем");

}