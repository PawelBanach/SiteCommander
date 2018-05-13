navigator.webkitGetUserMedia({
  audio: true,
}, function(stream) {
  if (stream.stop)
  stream.stop();
  console.log("zgoda")
  // Now you know that you have audio permission. Do whatever you want...
}, function() {
  console.log("niezgoda")
  // Aw. No permission (or no microphone available).
});
