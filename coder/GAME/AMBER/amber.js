// !!!      + см  image_blur.html
window.onload = init;
function init() {
     var image = document.getElementById("zero0");
     image.src = "amber/zeroblur.jpg";
     image.onclick = showAnswer;
     function showAnswer() {
          var image = document.getElementById("zero0");      // работает и без этой строчки     ??
          image.src = "amber/zero.jpg";
          image.onclick = init;
     }
} 
