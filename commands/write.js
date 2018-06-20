// write to the focused element

if(document.getElementsByClassName("sc-focus").length !== 0 && text.length !== 0) {
  let focus = document.getElementsByClassName("sc-focus")[0];
  focus.value = text.join(" ");
}