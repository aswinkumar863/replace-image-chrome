"use strict";

chrome.runtime.onInstalled.addListener(function () {
  createContextMenu()
});

function createContextMenu() {
  chrome.contextMenus.create({
    id: "replaceimage",
    title: "Replace Image With",
    contexts: ["image"],
  });

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    chrome.tabs.sendMessage(tab.id, { message: "getInputImage" });
  });
}