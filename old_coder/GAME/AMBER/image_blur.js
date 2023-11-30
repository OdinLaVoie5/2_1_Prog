

// наведение - появляется,  отведение - убирает.
window.onload = init;
function init() {
var images = document.images;  // !!  (( метод  .images   проще  чем    var images = document.getElementsByTagName("img"); ))   
for (var i = 0; i < images.length; i++) {
images[i].onmouseover = showAnswer;
images[i].onmouseout = reblur;
}
}
function showAnswer(eventObj) {
var image = eventObj.target;
var name = "Data" + "/" + image.id + ".jpg";
image.src = name;
}
function reblur(eventObj){
var image = eventObj.target;
var name = image.id;
name = "Data" + "/" +  name + "blur.jpg";
image.src = name;
}


/*



// второй клик - убирает .
window.onload = init;
function init() {
var images = document.getElementsByTagName("img");
for (var i = 0; i < images.length; i++) {
images[i].onclick = showAnswer;
}
}
function showAnswer(eventObj) {
var image = eventObj.target;
var name = image.id;
if (image.src.indexOf("blur") >= 0) {
name = "data" + "/" + name + ".jpg";
}
else { 
name = "data" + "/" + name + "blur" + ".jpg";
}
image.src = name;
}



//  клик также убирает др картинки
window.onload = init;
function init() {
var images = document.getElementsByTagName("img");
for (var i = 0; i < images.length; i++) {
images[i].onclick = showAnswer;
}
}
function showAnswer(eventObj) {
var images = document.getElementsByTagName("img");
for (var i = 0; i < images.length; i++) {
	images[i].src = "Data" + "/" + images[i].id + "blur.jpg";
}
var image = eventObj.target;
var name = image.id;
name = "Data" + "/" + name + ".jpg";
image.src = name;
}




*/