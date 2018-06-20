// focus header
let focus = document.getElementsByClassName("sc-focus")[0];
if(focus) {
  focus.style.border = "";
  focus.classList.remove("sc-focus");
}

const h1 = document.querySelectorAll('h1, input, button, a, area, object, select, textarea')[0];
h1.focus();
h1.style.border = "red 2px solid";
h1.className += " sc-focus";
