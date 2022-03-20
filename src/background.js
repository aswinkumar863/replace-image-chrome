"use strict";

function createContextMenu() {
  chrome.contextMenus.create({
    id: "replaceimage",
    title: "Replace Image With",
    contexts: ["image"],
  });

  chrome.contextMenus.create({
    id: "replaceImageLocal",
    title: "Local File",
    parentId: "replaceimage",
    contexts:["image"],
  });
  
  chrome.contextMenus.create({
    id: "replaceImageUrl",
    title: "URL",
    parentId: "replaceimage",
    contexts:["image"],
  });

  chrome.contextMenus.onClicked.addListener(function (info, tab) {
    chrome.tabs.sendMessage(tab.id, { message: info.menuItemId })
      .then(() => {})
      .catch(() => {});
  });
}
createContextMenu()
