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

  chrome.contextMenus.create({
    title: "Local File",
    parentId: "replaceimage",
    contexts:["image"],
    onclick: function (info, tab) {
      chrome.tabs.sendMessage(tab.id, { message: "getInputImage" });
    }
  });
  
  chrome.contextMenus.create({
    title: "URL",
    parentId: "replaceimage",
    contexts:["image"],
    onclick: function (info, tab) {
      chrome.tabs.sendMessage(tab.id, { message: "getInputURL" });
    }
  });
}