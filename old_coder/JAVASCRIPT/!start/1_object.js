// ##arguments    ##пример  копирование свойств copyOSC(dst, src1, src2…)
///+++++++++++++++ см copyOSC   в OSC 


var vasya = {
  age: 21,
  name: 'Вася',
  surname: 'Петров'
};
var user = {
  isAdmin: false,
  isEmailConfirmed: true
};
var student = {
  university: 'My university'
};
// добавить к vasya свойства из user и student
copyOSC(vasya, user, student);
// alert( vasya.isAdmin ); // false
// alert( vasya.university ); // My university

//  Для создания копии объекта user:
// скопирует все свойства в пустой объект  !!!
var userClone = copyOSC({}, user);

console.log("2")

