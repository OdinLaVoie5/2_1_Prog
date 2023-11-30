// объект  ##style         Исследование свойства style
  var div = document.getElementsByTagName("div")[0];

  assert(div.style.color == 'rgb(0, 0, 0)' || div.style.color == '#000', '/// из тега прочиталось');   //4///////////////  в большинстве браузеров свойство color нормализуется в формате RGB  (но в некоторых браузерах цвета оставляются указанными как именованные(например, blасk))
  // !! Встраиваемые и присваиваемые стили регистрируются,
  assert(div.style.fontSize == '1.8em', '(/// из таблицы CSS не прочиталось)');   //5/////////////// !! тогда как наследуемые стили не регистрируются.  (из таблицы CSS)
  div.style.borderWidth = "4px";
  assert(div.style.borderWidth == '4px', '/// из JS прочиталось');    //6/////////////// Встраиваемые и присваиваемые стили регистрируются,






//  !!!  Функция для установки и получения значений атрибутов ((чтобы избежать ошибки в имени св-ва))

/*(function(){
  var translations = {
	"for": "htmlFor",
	"class": "className",
	readonly: "readOnly",
	maxlength: "maxLength",
	cellspacing: "cellSpacing",
	rowspan: "rowSpan",
	colspan: "colSpan",
	tabindex: "tabIndex",
	cellpadding: "cellPadding",
	usemap: "useKap",
	frameborder: "frameBorder",
	contenteditable: "contentEditable"
  };
  window.attr = function(element,name,value) {
	var property = translations[name] || name,
	propertyExists = typeof element[property] !== "undefined";
	if (typeof value !== "undefined") {
	  if (propertyExists) {element[property] = value;}
	  else {element.setAttribute (name, value);}
	}
	return propertyExists ? element[property] : element.getAttribute(name);
  };
}) ();


var object = document.getElementById('testObject');
assert(attr(object,'id') === 'testObject',"id value fetched");
assert(attr(object,'id','other') === 'other',"new id value set");
assert(attr(object,'id') === 'other',"new id value fetched");
assert(attr(object,'data-custom','whatever') === 'whatever', "custom attribute set");
assert(attr(object,'data-custom') === 'whatever',"custom attribute fetched");

*/





//   ф-ция для преобразования имени н/р  font-size в fontSize
function style(element,name,value){ 
  name = name.replace(/-([a-z])/ig,function (all,letter){return letter.toUpperCase();}); 
 // all ?? letter ??
  if (typeof value !== 'undefined') { 
	element.style[name] = value;
  }
  return element.style[name];
}

  div = document.getElementsByTagName('div')[1];
  assert(true,style(div,'color'));       //7///////////////
  assert(true,style(div,'font-size'));    //8///////////////





//  Извлечение размеров скрытых элементов разметки
// !!!  здесь  приём для сохранения и возвращения набора св-в
(function(){
  var PROPERTIES = {        //  набор св-в для не заметного проявления скрытого эл-та
	position: "absolute", 
	visibility: "hidden", 
	display: "block"
  };
  window.getDimensions = function(element) {  // составляем нужный нам метод
	var previous = {};     // сохраняем оригинальные св-ва
	for (var key in PROPERTIES) {
	  previous[key] = element.style[key]; 
	  element.style[key] = PROPERTIES[key];
	}
	var result = {       // получаем нужные значения
	  width: element.offsetWidth, 
	  height: element.offsetHeight
	};
	for (key in PROPERTIES) {    // возвращяем оригинальные св-ва
	  element.style[key] = previous[key];
	}
	return result;
  };
}) ();

// тест
//k window.onload = function() { 
//k  setTimeout(function(){   // (здесь пауза чтобы проявились эл-ты)
	var withPole = document.getElementById('withPole'),
	withShuriken = document.getElementById('withShuriken');
	assert(withPole.offsetWidth, '/ '+  "ширина " + withPole.offsetWidth);  //9-10-11///////////////
	assert(withShuriken.offsetWidth,'/ '+  "ширина скрытой картинки " + withShuriken.offsetWidth);
	var dimensions = getDimensions(withShuriken);
	assert(dimensions.width,'/ '+  "ширина скрытой но проявленной ф-цией картинки " + dimensions.width );
//k  }, 2000);
//k }




// Извлечение вычисленных стилей  !!
// ф-ция чтобы вводить св-ва в любом виде (fontSize или font-size) + для IE8
function fetchComputedStyle(element,property) {
  if (window.getComputedStyle) {
	var computedStyles = window.getComputedStyle(element);
	if (computedStyles) {
	  property = property.replace(/([A-Z])/g,'-$1').toLowerCase(); 
	  return computedStyles.getPropertyValue(property);
	}
  }
  else if (element.currentStyle) {   // !! св-во только брауза IE до 9. (работает)
	property = property.replace(/-([a-z])/ig, function(all,letter){ 
	  return letter.toUpperCase(); 
	});
	return element.currentStyle[property];
  }
}

window.onload = function(){
  var div = document.getElementsByTagName("div")[3];
  assert(true,"background-color: " + fetchComputedStyle(div,'background-color'));   //12-17///////////////
  assert(true, "display: " + fetchComputedStyle(div,'display'));
  assert(true,"font-size: " + fetchComputedStyle(div,'fontSize')) ;
  assert(true,"color: " + fetchComputedStyle(div, 'color'));
  assert(true,"border-top-color: " + fetchComputedStyle(div,'borderTopColor'));
  assert(true,"border-top-width: " + fetchComputedStyle(div,'border-top-width'));
//  но не следует забывать, что стили нужно извлекать из отдельных свойств более низкого уровня. В частности , нельзя извлечь стиль border, но можно извлечь стиль border-top-color и border-top-width, что и было сделано.
};










