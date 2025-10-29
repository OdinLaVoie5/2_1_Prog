
// ниже скрипт вставлен в ф-цию  чтобы открываться после прорисовки страницы (закоментил)
//  document.addEventListener('DOMContentLoaded', function () {


//           1. Найти факториал числа
const recursiveFactorial = (n) => {
     if (n === 0) {
          return 1;
     }
     return n * recursiveFactorial(n - 1);
}
/////// console.log(recursiveFactorial(1));







//           2.
const iterRecursiveFactorial = (n) => {
     if (n === 0) {
          return 1;
     }
     const iter = (counter, acc) => {
          if (counter === 1) {
               return acc;
          }
          return iter(counter - 1, counter * acc);
     };
     return iter(n, 1);
};
///// console.log(iterRecursiveFactorial(2));

//             2.1  ChatGPT
function xFactorial(n, result = 1) {
     if (n === 0) {
          return result;
     } else {
          return xFactorial(n - 1, n * result);
     }
}
/////console.log(xFactorial(3));






//         3.
const yFactorial = (n) => {
     let counter = 1;
     let result = 1;
     while (counter <= n) {
          result *= counter;
          counter ++;
     }
     return result;
}
/////// console.log(yFactorial(4));

//          3.1 ChatGPT
function zFactorial(n) {
     if (n === 0) {
          return 1;
     } else {
          let result = 1;
          for (let i = 1; i <= n; i++) {
               result *= i;
          }
          return result;
     }
}
console.log(zFactorial(5));



 //  export { recursiveFactorial, iterRecursiveFactorial, xFactorial, yFactorial, zFactorial }; //////////   получился экспорт-импорт  см в браузере




//  закоментил ф-цию  см самый верх    });
  
