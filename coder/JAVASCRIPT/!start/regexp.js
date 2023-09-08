// Проверка строки по конкретному шаблону
//   вариант без regexp
function isThisAZipCode(candidate) {
  if (typeof candidate !== "string" ||candidate.length != 10) return false; 
  for (var n = 0; n < candidate.length; n++) {
	var c = candidate[n];
	switch (n) {
	  case 0: case 1: case 2: case 3: case 4: case 6: case 7: case 8: case 9:
		if (c<0 || c>9) return false;
		break;
	  case 5:
		if (c != '-') return false;
		break;
	}
  }
  return true;	
}
assert(isThisAZipCode('11ы11-1111'), "не подходит");     //1////////////////



//   вариант c regexp            ninja
function isThisAZipCode(candidate) {
	return /^\d{5}-\d{4}$/.test(candidate)
}
assert(isThisAZipCode('11111-1111'), "подходит");      //2////////////////






//   Два способа создания скомпилированного реrупярного выражения
var rel = /test/i;
var re2 = new RegExp("test", "i");

assert(rel.toString() == "/test/i","/ Verify the contents of the expression."); //3/////////
assert(rel.test("TesT"), "/ Yes, it's case-insensitive.");   //4/////////
assert(re2.test("TesT"), "/ This one is too.");            //5/////////
assert(rel.toString() == re2.toString(),"// rel и re2 эквивалентны");      //6/////////
assert(rel == re2, "// но это разные объекты.");              //7/////////






// Компиляция регулярного выражения для последующего применения
function findClassInElements(className, type) {
  var elems = document.getElementsByTagName(type || "*");   //  если type неопред то все эл-ты !!
  var regex = new RegExp("(^|\\s)" + className + "(\\s|$)");  // !!! ((здесь происходит компиляция - составление выражения))        
  var results = [];
  for (var i = 0, length = elems.length;  i < length; i++)  // !! начальн условия через зпт
	if (regex.test(elems[i].className)) {
	  results.push(elems[i]);
	}
  return results;
}
assert(findClassInElements("ninja", "div").length == 2, "2 div ninjas");     //8////////////
assert(findClassInElements("ninja", "span").length == 1, "1 span ninjas");   //9////////////
assert(findClassInElements("ninja").length == 3,"3 ninjas");               //10///////////




// ##проверка - поддерживает ли брауз сериализацию
var FUNCTION_DECOMPILATION = /abc(.|\n)*xyz/.test(function(abc){xyz;}); 
assert(FUNCTION_DECOMPILATION," !! декомпиляция работает in this browser");  //11///////////





//=========================================================
assert(1,escape('т')+' --- '+unescape('%u0442'));  //12///////////


//  экранирование  служебных символов
assert(1, ' "aaa \"bbb \'ccc\' bbb\" aaa" \\ \\ \^ ...');  //13///////////

