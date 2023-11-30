/*
var startTime = +new Date();
//  !! тестируемый код 
console.log(+new Date - startTime);
*/




//////////// (сравнение скорости разных методов   для одной и той же задачи)    (( не понял      разница невелика))


//1   100000 случ эл-тов массива
function myTest() {
var arr = new Array(100000);
for (var i = 0; i < arr.length; i++)
{
arr[i] = Math.random();
}
}



//2   вариант    arr переносим в локал
function myTest1() {
var arr = new Array(100000);
(function() {
var a = arr;
for (var i = 0; i < a.length; i++)
{
a[i] = Math.random();
}
})();
}





//3  вариант    push 
function myTest2() {
var arr= [];
(function () {
var a = arr, length = 100000;
for (var i = 0; i < length; i++) { a.push(Math.random());
}
})();
}





//4  вариант    
// Простой и очень красивый прием сокращения времени работы цикла состоит в том, чтобы изменить направление обхода на противоположное    (( в for см   не все эл-ты  спец !!))
function myTest3() {
var arr = [];
(function () {
var a = arr, length = 100000;
for (var i = length; i--;) { a.push(Math.random());
}
})();
}






//5  вариант    
// Менее изящный, но довольно эффективный метод оптимизации циклов заключается в том, чтобы развернуть тело цикла, увеличив количество операций в каждой итерации, но снизить количество самих итераций. Такой прием называется «Устройство Даффа» (Duff’s service). Для него придется пожертвовать красотой и лаконичностью кода, но в случаях, когда производительность важнее краткости, этот прием придется кстати. К примеру, мы можем заменить такой код:  var length = 99999; for (var i = length; i--; ){ a.push(Math.random());}    на вот такой:

function myTest4() {
var arr4 = [];
var length = 100000,
iterations = Math.floor(length / 8),
startFrom = length % 8;
switch (startFrom) {
case 0: arr4.push(Math.random());
iterations--;
case 7: arr4.push(Math.random());
case 6: arr4.push(Math.random());
case 5: arr4.push(Math.random());
case 4: arr4.push(Math.random());
case 3: arr4.push(Math.random());
case 2: arr4.push(Math.random());
case 1: arr4.push(Math.random());
}
for (var i = iterations; i--; ) {
arr4.push(Math.random());
arr4.push(Math.random());
arr4.push(Math.random());
arr4.push(Math.random());
arr4.push(Math.random());
arr4.push(Math.random());
arr4.push(Math.random());
arr4.push(Math.random());
}
}





//6  вариант    
// Мы можем сделать то же самое короче, заменив switch на цикл, практически без потери производительности:    (Данный прием эффективен только при большом количестве итераций.)
function myTest5() {
var arr5 = [];
var length = 100000,
iterations = length % 8;

while (iterations) {
arr5.push(Math.random());
iterations--;
}
iterations = Math.floor(length / 8);

for (var i = iterations; i--; ) {
arr5.push(Math.random()); 
arr5.push(Math.random()); 
arr5.push(Math.random()); 
arr5.push(Math.random()); 
arr5.push(Math.random()); 
arr5.push(Math.random()); 
arr5.push(Math.random()); 
arr5.push(Math.random()); 
}
}


assert (1, benchmarkOSC(5, myTest, 0, 0,  0, 0, 0))     /////////////  
assert (1, benchmarkOSC(5, myTest1, 0, 0,  0, 0, 0))     /////////////  
assert (1, benchmarkOSC(5, myTest2, 0, 0,  0, 0, 0))     /////////////  
assert (1, benchmarkOSC(5, myTest3, 0, 0,  0, 0, 0))     /////////////  
assert (1, benchmarkOSC(5, myTest4, 0, 0,  0, 0, 0))     /////////////  
assert (1, benchmarkOSC(5, myTest5, 0, 0,  0, 0, 0))     /////////////  






var startTime = +new Date();
var arr = new Array(100000);
for (var i = 0; i < arr.length; i++)
{
arr[i] = Math.random();
}
console.log(+new Date - startTime);



var startTime = +new Date();
var arr = new Array(100000);
(function() {
var a = arr;
for (var i = 0; i < a.length; i++)
{
a[i] = Math.random();
}
})();
console.log(+new Date - startTime);



var startTime = +new Date();
var arr= [];
(function () {
var a = arr, length = 100000;
for (var i = 0; i < length; i++) { a.push(Math.random());
}
})();
console.log(+new Date - startTime);



var startTime = +new Date();
var arr = [];
(function () {
var a = arr, length = 100000;
for (var i = length; i--;) { a.push(Math.random());
}
})();
console.log(+new Date - startTime);



var startTime = +new Date();
var arr4 = [];
var length = 100000,
iterations = Math.floor(length / 8),
startFrom = length % 8;
switch (startFrom) {
case 0: arr4.push(Math.random());
iterations--;
case 7: arr4.push(Math.random());
case 6: arr4.push(Math.random());
case 5: arr4.push(Math.random());
case 4: arr4.push(Math.random());
case 3: arr4.push(Math.random());
case 2: arr4.push(Math.random());
case 1: arr4.push(Math.random());
}
for (var i = iterations; i--; ) {
arr4.push(Math.random());
arr4.push(Math.random());
arr4.push(Math.random());
arr4.push(Math.random());
arr4.push(Math.random());
arr4.push(Math.random());
arr4.push(Math.random());
arr4.push(Math.random());
}
console.log(+new Date - startTime);




var startTime = +new Date();
var arr5 = [];
var length = 100000,
iterations = length % 8;

while (iterations) {
arr5.push(Math.random());
iterations--;
}
iterations = Math.floor(length / 8);

for (var i = iterations; i--; ) {
arr5.push(Math.random()); 
arr5.push(Math.random()); 
arr5.push(Math.random()); 
arr5.push(Math.random()); 
arr5.push(Math.random()); 
arr5.push(Math.random()); 
arr5.push(Math.random()); 
arr5.push(Math.random()); 
}
console.log(+new Date - startTime);










