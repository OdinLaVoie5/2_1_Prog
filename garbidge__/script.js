//    "use strict";

// ниже скрипт вставлен в ф-цию  чтобы открываться после прорисовки страницы (закоментил)
//  document.addEventListener('DOMContentLoaded', function () {

//   import { iterRecursiveFactorial } from "./script1.js";  //////////   получился экспорт-импорт    см в браузере


/////////     НАИМЕНЬШИЙ ДЕЛИТЕЛЬ      /////////
const smallestDivisor = (num) => {
     if (num < 1) return NaN;
     let divisor = 2;

     while (divisor <= num ** (1 / 2)) {
          if (num % divisor === 0) return divisor;
          divisor = divisor + 1;
     }
     return num;
}
///////// console.log(smallestDivisor(563634117));





/////////  111111111      РАЗЛОЖЕНИЕ НА ПРОСТЫЕ МНОЖИТЕЛИ      /////////
/**
 * Returns an array containing the prime factors of the given number.
 *
 * @param {number} num - The number to find the prime factors of.
 * @return {Array} An array containing the prime factors of the given number.
 */
function primeFactors (num) {
     let result = [];
     while (num % 2 === 0) {
          result.push(2);
          num = num / 2;
     }
     for (let i = 3; i <= Math.sqrt(num); i += 2) {
          while (num % i === 0) {
               result.push(i);
               num = num / i;
          }
     }
     if (num > 2) result.push(num);
     return result;
}
/////////  console.log(primeFactors(5691111136115341));





/////////      ПРОВЕРКА НА ПРОСТОТУ ЧИСЛА      /////////
const isPrime = (num) => {
     if (num <= 1) return false;
     if (num === 2) return true;
     if (num % 2 === 0) return false;
     for (let n = 3; n * n <= num; n += 2) {
          if (num % n === 0) return false;
     }
     return true;
}
/////////   console.log(isPrime(23));








/////////      ПЕРЕВОРОТ СТРОКИ?      /////////
const reverse = (str) => str.split('').reverse().join('');
///////// console.log(reverse('hello, world!'));

//  вариант
const reverseOld = (str) => {
     let result = '';
     for (let i = str.length - 1; i >= 0; i--) {
          result += str[i];
     }
     return result;
}
///////// console.log('!!!!!!', reverseOld('hello, world!'));
///////// console.log(reverseOld('world!'));






 
console.log(iterRecursiveFactorial(3)); ////////// получился экспорт-импорт     см в браузере
















//  закоментил ф-цию (скобки) см самый верх    });

