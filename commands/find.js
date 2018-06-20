// find title and go to article
if(text.length !== 0) {
  let firstFoundElement = Array.from(document.getElementsByClassName('title'))
    .filter(element => element.innerText.toLowerCase().includes(text.join(" ")))[0];
  if (firstFoundElement) { firstFoundElement.click(); }
}
