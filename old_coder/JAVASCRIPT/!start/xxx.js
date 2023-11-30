//  ##проверка   подходит ли брауз

if ( typeof document !== "undefined" && (document.addEventListener ||document.attachEvent) && document.getElementsByTagName && document.getElementById ) {
// Возможностей прикладного интерфейса API достаточно для построения полноценного варианта приложения
assert(true,"подходит");    //1///////////////////////////
} else {
// предоставить запасной вариант
assert(true,"не подходит");
}



// и проверка   имитация компонентов применяется с целью выяснить, будет ли метод действовать должны образом.
window.findByTagWorksAsExpected = (function() { 
  var div = document.createElement("div"); 
  div.appendChild(document.createComment("test")); 
  return div.getElementsByTagName("*").length === 0; 
})();
assert(window.findByTagWorksAsExpected,"работает");    //2///////////////////////////





