const SpeechRecognition = webkitSpeechRecognition;
const SpeechGrammarList = webkitSpeechGrammarList;
const SpeechRecognitionEvent = webkitSpeechRecognitionEvent;

let recording = false;

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

// recognition.lang = 'en-US';
recognition.lang = 'pl-PL';
// recognition.continuous = false;
recognition.interimResults = false;
recognition.maxAlternatives = 1;


recognition.onresult = (e) => {
  const result = e.results[e.results.length - 1][0].transcript;
  console.log('result: ', result);
  updateResult(result);
}

recognition.onerror = (e) => {
  console.error(e);
  chrome.tabs.create({url: "permission.html"}, (data) => { console.log('Site created!') });
}

recognition.onend = () => {
  console.log('recognition end.');
}

const startCapture = function() {
  recording = !recording;
  if (recording) {
    console.log("Recording")
    recognition.start();
  } else {
    console.log("Stop recording")
  }//   chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
//     // CODE TO BLOCK CAPTURE ON YOUTUBE, DO NOT REMOVE
//     // if(tabs[0].url.toLowerCase().includes("youtube")) {
//     //   chrome.tabs.create({url: "error.html"});
//     // } else {
//     if(!sessionStorage.getItem(tabs[0].id)) {
//     sessionStorage.setItem(tabs[0].id, Date.now());
//     chrome.storage.sync.get({
//       maxTime: 1200000,
//       muteTab: false,
//       format: "mp3",
//       quality: 192,
//       limitRemoved: false
//     }, (options) => {
//       let time = options.maxTime;
//     if(time > 1200000) {
//       time = 1200000
//     }
//     audioCapture(time, options.muteTab, options.format, options.quality, options.limitRemoved);
//   });
//     chrome.runtime.sendMessage({captureStarted: tabs[0].id, startTime: Date.now()});
//   }
//   // }
// });
};

chrome.commands.onCommand.addListener((command) => {
  if (command === "record") {
    startCapture();
  }
});