//  focus to the element on the left
if(document.getElementsByClassName("sc-focus").length !== 0) {
  let focus = document.getElementsByClassName("sc-focus")[0];
  focus.style.border = "";
  focus.classList.remove("sc-focus");
  let all = document.querySelectorAll('h1, input, button, a, area, object, select, textarea');

  var currentIndex;
  for(var i = 0; i < all.length; i++){
    //loop through all tab-able elements
    if(focus.isEqualNode(all[i])){
      //if a match is found then assign index
      currentIndex = i;
    }
  }

  //focus the following element
  var newFocus;
  if(currentIndex !== (all.length - 1)) {
    newFocus = all[currentIndex + 1];
  } else {
    newFocus = all[0];
  }
  newFocus.focus();
  newFocus.style.border = "red 2px solid";
  newFocus.className += " sc-focus";
}