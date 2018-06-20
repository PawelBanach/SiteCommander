if (currentResult) {
  const firstFoundElement = Array
    .from(document.getElementsByClassName('title-link__title'))
    .filter(element => element.innerText.toLowerCase().includes(currentResult.toLowerCase()))[0];

  if (firstFoundElement) {
    console.log("znaleziono: " + firstFoundElement.toString());
    firstFoundElement.click();
  } else if (true || currentResult.startsWith("close") || currentResult.startsWith("zamknij")) {
    console.log("CLOSING");
    window.close();
  } else if (currentResult.startsWith("refresh") || currentResult.startsWith("reload") || currentResult.startsWith("odśwież")) {
    console.log("reloading");
    window.location.reload(true);
  } else if (currentResult.startsWith("forward") || currentResult.startsWith("dalej")) {
    console.log("going forward");
    window.history.go(1);
  } else if (currentResult.startsWith("back") || currentResult.startsWith("wróć")) {
    console.log("going back");
    window.history.back();
  } else console.log("COULD NOT FIND MATCH :(");

} else console.log("MISSING CURRENT RESULT. IT SHOULD BE HERE SO SOMETHING WENT WRONG. CHECK FOR BACKGROUND.JS FILE IF EVERYTHING IS OK");
