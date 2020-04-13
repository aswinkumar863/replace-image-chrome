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
    case "getInputURL":
      getInputURL();
      break;
  }
  return true;
});

// gets image using file input
function getInputImage() {
  const fileInput = document.createElement("input");
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

// gets the input url from user
function getInputURL() {
  const URL = prompt('Enter the Image URL:');
  if(!isValidUrl(URL)) {
    alert('Provided URL is Invalid');
    return;
  }
  replaceImage(URL);
}

// replace clicked image with base64 / URL
function replaceImage(source) {
  if (!source || !imageEl) {
    return;
  }
  imageEl.src = source;
}

// checks wheather the URL is valid
function isValidUrl(string) {
  try { return Boolean(new URL(string)); }
  catch (e) { return false; }
}