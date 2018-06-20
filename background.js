const SpeechRecognition = webkitSpeechRecognition;
const SpeechGrammarList = webkitSpeechGrammarList;
const SpeechRecognitionEvent = webkitSpeechRecognitionEvent;

let recording = false;
let text;

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

recognition.lang = 'en-US';
// recognition.lang = 'pl-PL';
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
      console.log("Wywołanie: FOCUS");
      chrome.tabs.executeScript({ file: "commands/focus.js" });
      break;
    case ((/lewo/.test(command)) || (/left/.test(command))):
      chrome.tabs.executeScript({ file: "commands/left.js" });
      console.log("Wywołanie: LEWO/LEFT");
      break;
    case ((/prawo/.test(command)) || (/right/.test(command))):
      chrome.tabs.executeScript({ file: "commands/right.js" });
      console.log("Wywołanie: PRAWO/RIGHT");
      break;
    case ((/wpisz/.test(command)) || (/input/.test(command))):
      chrome.tabs.executeScript({
        code: 'text = ' + JSON.stringify(words.slice(1))
      }, function() {
        chrome.tabs.executeScript({ file: 'commands/write.js' });
      });
      console.log("Wywołanie: WPISZ/WRITE ARGUMENT1");
      break;
    case (/wybierz/.test(command) || /select/.test(command)):
      chrome.tabs.executeScript({ file: "commands/select.js" });
      console.log("Wywołanie: WYBIERZ/SELECT");
      break;
    case (/szukaj/.test(command) || /find/.test(command)):
      chrome.tabs.executeScript({
        code: 'text = ' + JSON.stringify(words.slice(1))
      }, function() {
        chrome.tabs.executeScript({ file: 'commands/find.js' });
      });
      console.log("Wywołanie: SZUKAJ/FIND ARGUMENT 1");
      break;
    case (/cofnij/.test(command) || /back/.test(command)):
      chrome.tabs.executeScript({ file: "commands/back.js" });
      console.log("Wywołanie: COFNIJ/BACK");
      break;
    case (/naprzód/.test(command) || /forward/.test(command)):
      chrome.tabs.executeScript({ file: "commands/forward.js" });
      console.log("Wywołanie: NAPRZÓD/FORWARD");
      break;
    case (/google/.test(command)):
      chrome.tabs.executeScript({ file: "commands/google.js" });
      console.log("Wywołanie: GOOGLE");
      break;
    case (/dół/.test(command) || /down/.test(command)):
      chrome.tabs.executeScript({ file: "commands/down.js" });
      console.log("Wywołanie: DÓŁ/DOWN");
      break;
    case (/góra/.test(command) || /up/.test(command)):
      chrome.tabs.executeScript({ file: "commands/up.js" });
      console.log("Wywołanie: GÓRA/UP");
      break;
    default:
      console.log("NIE ZROZUMIAŁEM KOMENDY");
      break;
  }
  console.timeEnd('Time');
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

chrome.commands.onCommand.addListener((command) => {
  console.log(command);
  if (command === "record") {
    startCapture();
  }
});
