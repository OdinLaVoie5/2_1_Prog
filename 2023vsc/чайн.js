room_temp = 20  // Задаём комнатную температуру воды.

function boil(water_temp){
     while (water_temp < 100) { // Пока температура воды меньше 100°C
          // Выводим текущую температуру.
          //console.log('Текущая температура', water_temp, '°C')
     }
     console.log ('Чайник закипел!')
}

// А теперь запустим функцию.
boil(room_temp)
