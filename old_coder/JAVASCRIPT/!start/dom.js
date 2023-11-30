//  атрибут,  свойство  здесь id.     
//  ##getAttribute   ##setAttribute    .id

window.onload = function(){
  var div = document.getElementsByTagName("div")[0];
  
  div.setAttribute ("id", "ninja-1") ;
  assert(div.getAttribute('id') === "ninja-1", "Attribute successfully changed");
  
  div.id = "ninja-2";
  assert(div.id == "ninja-2", "Property successfully changed");
  
  div.id = "ninja-3";
  assert(div.id === "ninja-3", "Property successfully changed");
  assert(div.getAttribute('id') === "ninja-3", "Attribute successfully changed via property");
  
  div.setAttribute("id", "ninja-4");
  assert(div.id === "ninja-4", "Property successfully changed via attribute");
  assert(div.getAttribute('id') === "ninja-4", "Attribute successfully changed");
};




