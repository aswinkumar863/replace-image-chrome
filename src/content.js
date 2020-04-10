"use strict";

var imageEl = null;

// register right click (contextmenu) event on document
document.addEventListener("contextmenu", function (event) {
  imageEl = event.target;
}, true);

// register message event (sent from background.js)
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.message) {
    case "getInputImage":
      getInputImage();
      break;
  }
  return true;
});

// gets image using file input
function getInputImage() {
  var fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/png, image/jpeg";

  fileInput.addEventListener("change", function (e) {
    readInputImage(this.files[0]);
  }, false);

  fileInput.click();
}

// reads image using FileReader
function readInputImage(file) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    replaceImage(reader.result);
  };
}

// replace clicked image with base64
function replaceImage(base64) {
  if(!base64 || !imageEl) {
    return;
  }
  imageEl.src = base64;
}