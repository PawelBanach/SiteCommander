console.log("in script");
firstFoundElement = Array.from(document.getElementsByClassName('title')).filter(element => element.innerText.toLowerCase().includes(currentResult.toLowerCase()))[0];
if (firstFoundElement) {
  console.log(firstFoundElement);
  firstFoundElement.click();
}
