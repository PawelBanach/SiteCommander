const SpeechRecognition = webkitSpeechRecognition;
const SpeechGrammarList = webkitSpeechGrammarList;
const SpeechRecognitionEvent = webkitSpeechRecognitionEvent;

let recording = false;
let text;

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

// recognition.lang = 'en-US';
recognition.lang = 'pl-PL';
// recognition.continuous = false;
recognition.interimResults = false;
recognition.maxAlternatives = 1;

let currentResult = null;


recognition.onresult = (e) => {
  const result = e.results[e.results.length - 1][0].transcript;
  console.log('result: ', result);
  currentResult = result;

};

recognition.onerror = (e) => {
  console.error(e);
  chrome.tabs.create({url: "permission.html"}, (data) => { console.log('Site created!') });
};

recognition.onend = (e) => {
  const words = currentResult.split(" ");
  const command = words[0].toLowerCase();
  switch(true) {
    case (/focus/.test(command)):
      console.log("FOCUS");
      chrome.tabs.executeScript({ file: "commands/focus.js" });
      break;
    case ((/lewo/.test(command)) || (/left/.test(command))):
      chrome.tabs.executeScript({ file: "commands/left.js" });
      console.log("LEWO");
      break;
    case ((/prawo/.test(command)) || (/right/.test(command))):
      chrome.tabs.executeScript({ file: "commands/right.js" });
      console.log("PRAWO");
      break;
    case ((/wpisz/.test(command)) || (/write/.test(command))):
      chrome.tabs.executeScript({
        code: 'text = ' + JSON.stringify(words.slice(1))
      }, function() {
        chrome.tabs.executeScript({ file: 'commands/write.js' });
      });
      console.log("WPISZ");
      break;
    case (/wybierz/.test(command) || /select/.test(command)):
      chrome.tabs.executeScript({ file: "commands/select.js" });
      console.log("WYBIERZ");
      break;
    case (/szukaj/.test(command) || /find/.test(command)):
      chrome.tabs.executeScript({
        code: 'text = ' + JSON.stringify(words.slice(1))
      }, function() {
        chrome.tabs.executeScript({ file: 'commands/find.js' });
      });
      console.log("SZUKAJ");
      break;
    case (/cofnij/.test(command) || /back/.test(command)):
      chrome.tabs.executeScript({ file: "commands/back.js" });
      console.log("COFNIJ");
      break;
    case (/naprzód/.test(command) || /forward/.test(command)):
      chrome.tabs.executeScript({ file: "commands/forward.js" });
      console.log("NAPRZÓD");
      break;
    case (/google/.test(command)):
      chrome.tabs.executeScript({ file: "commands/google.js" });
      console.log("GOOGLE");
      break;
    case (/dół/.test(command) || /down/.test(command)):
      chrome.tabs.executeScript({ file: "commands/down.js" });
      console.log("DÓŁ");
      break;
    case (/góra/.test(command) || /up/.test(command)):
      chrome.tabs.executeScript({ file: "commands/up.js" });
      console.log("GÓRA");
      break;
    default:
      console.log("NIE ZROZUMIAŁEM KOMENDY");
      break;
  }
  console.timeEnd('Time');

  // chrome.tabs.executeScript(null, {
  //   code: "currentResult = \"" + currentResult + "\""
  // }, function() {
  //   chrome.tabs.executeScript(null, {
  //     file: "makeAction.js"
  //   }, result => {
  //     const lastErr = chrome.runtime.lastError;
  //     if (lastErr) console.log(' lastError: ' + JSON.stringify(lastErr));
  //   })
  // })


  // const firstFoundElement = Array.from(document.getElementsByClassName('title')).filter(element => element.innerText.toLowerCase().includes(currentResult))[0];
  // if (firstFoundElement) {
    // console.log(firstFoundElement);
    // firstFoundElement.click();
  // }
};

const startCapture = function() {
  recording = !recording;
  if (recording) {
    console.log("Recording");
    console.time('Time');
    recognition.start();
  } else {
    console.log("Stop recording")
  }
};

console.log("executing background");

chrome.commands.onCommand.addListener((command) => {
  console.log(command);
  if (command === "record") {
    startCapture();
  }
});
