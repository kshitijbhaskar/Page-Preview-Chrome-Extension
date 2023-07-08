chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "previewPage",
    title: "Preview Page",
    contexts: ["link"]
  });
  chrome.contextMenus.create({
    id: "previewImage",
    title: "Preview Image",
    contexts: ["image"]
  });
  chrome.contextMenus.create({
    id: "previewVideo",
    title: "Preview Video",
    contexts: ["video"]
  });
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "createPopupWindow" && message.url) {
    createPopupWindow(message.url,sender.tab);
  }
});

function createPopupWindow(url,tab) {
  chrome.windows.getCurrent((currentWindow) => {
    const windowTop = currentWindow.top;
    console.log(tab);
    const windowHeight = currentWindow.height;
    const windowWidth = tab.width / 2;
    const createData = {
      url: url,
      type: "popup",
      height: windowHeight,
      width: Math.ceil(windowWidth),
      left: Math.floor(windowWidth),
      top: windowTop
    };

    chrome.windows.create(createData);
    console.log(createData);
  });
}

function injectedFunction(url, mediaType) {
  const linkUrl = url;

  const container = document.createElement("div");
  container.setAttribute("class", "previewContainer");
  container.style.position = "fixed";
  container.style.display = "flex";
  container.style.flexFlow = "column wrap";
  container.style.alignItems = "flex-start";
  container.style.top = "0";
  container.style.right = "0";
  container.style.width = "50%";
  container.style.paddingLeft = "5px";
  container.style.height = "100%";
  container.style.zIndex = "9999";
  container.style.overflow = "hidden";

  
  const reloadButton = document.createElement("button");
  const reload = document.createElement("img");
  reload.src = chrome.runtime.getURL("assets/reload.png");
  reload.alt = "R";
  reload.style.height = "20px"; 
  reloadButton.appendChild(reload);
  reloadButton.style.margin = "2.5px";
  reloadButton.style.padding = "5px 5px";
  reloadButton.style.border = "none";
  reloadButton.style.background = "white";
  reloadButton.style.color = "inherit";
  reloadButton.style.cursor = "pointer";
  reloadButton.style.fontFamily = "sans-serif";
  reloadButton.style.borderRadius = "0.5rem";
  reloadButton.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.5)";
  reloadButton.title = "Reload Preview";

  
  const closeButton = document.createElement("button");
  const close = document.createElement("img");
  close.src = chrome.runtime.getURL("assets/close.png");
  close.alt = "X";
  close.style.height = "20px";
  closeButton.appendChild(close);
  closeButton.style.margin = "2.5px";
  closeButton.style.padding = "5px 5px";
  closeButton.style.border = "none";
  closeButton.style.background = "white";
  closeButton.style.color = "inherit";
  closeButton.style.cursor = "pointer";
  closeButton.style.fontFamily = "sans-serif";
  closeButton.style.borderRadius = "0.5rem";
  closeButton.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.5)";
  closeButton.title = "Close Preview";
  
  closeButton.addEventListener("click", () => {
    container.remove();
  });
  
  const popupButton = document.createElement("button");
  const popup = document.createElement("img");
  popup.src = chrome.runtime.getURL("assets/popup.png");
  popup.alt = "O";
  popup.style.height = "20px";
  popupButton.appendChild(popup);
  popupButton.style.margin = "2.5px";
  popupButton.style.padding = "5px 5px";
  popupButton.style.border = "none";
  popupButton.style.background = "white";
  popupButton.style.color = "inherit";
  popupButton.style.cursor = "pointer";
  popupButton.style.fontFamily = "sans-serif";
  popupButton.style.borderRadius = "0.5rem";
  popupButton.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.5)";
  // popupButton.style.marginRight = "50%";
  popupButton.title = "Open Preview Popup";
  
  // const handleClickOutsideContainer = (event) => {
  //   console.log(event.target);
  //   console.log(event.target.id);
  //   console.log(event);
  //   if (event.target.class=="previewContainer") {
  //     container.remove();
  //     document.removeEventListener("click", handleClickOutsideContainer);
  //   }
  // };
  
  // document.addEventListener("click", handleClickOutsideContainer);
  
  const handle = document.createElement("div");
  handle.style.top = "0";
  handle.style.left = "0";
handle.style.width = "5px";
handle.style.height = "100%";
// handle.style.background = "white";
handle.style.cursor = "ew-resize";
handle.style.position = "relative";
handle.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";

handle.addEventListener("mousedown", function(event) {
  // handle.style.zIndex = "9999999";
  const startX = event.pageX;
  const startWidth = container.offsetWidth;
  handle.style.width = "25px";
  
  function handleMouseMove(event) {
    handle.style.position = "null";
    const width = startWidth - (event.pageX - startX);
    container.style.width = width + "px";
    mediaElement.style.width = "100%"; 
  }
  
  function handleMouseUp() {
    handle.style.width = "5px";
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }
  
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
});

if (mediaType === "image") {
  mediaElement = document.createElement("img");
  mediaElement.src = linkUrl;
  mediaElement.alt = "Preview Image";
  mediaElement.style.width = "100%";
  mediaElement.style.height = "100%";
} else if (mediaType === "video") {
  mediaElement = document.createElement("video");
  mediaElement.src = linkUrl;
  mediaElement.style.width = "100%";
  mediaElement.style.height = "100%";
  mediaElement.controls = true;
} else if (mediaType === "link"){
  mediaElement = document.createElement("iframe");
  mediaElement.src = linkUrl;
  mediaElement.style.width = "100%";
  mediaElement.style.height = "100%";
}

reloadButton.addEventListener("click", () => {
  mediaElement.src = linkUrl;
});

container.appendChild(closeButton);
container.appendChild(popupButton);
container.appendChild(reloadButton);
container.appendChild(handle);
container.appendChild(mediaElement);
document.body.appendChild(container);

  if (popupButton) {
    popupButton.addEventListener("click", () => {
      container.remove();
      chrome.runtime.sendMessage({ action: "createPopupWindow", url: linkUrl });
    });
  }
}

chrome.contextMenus.onClicked.addListener(async (info, tab) => {

  if (info.menuItemId === "previewPage" && info.linkUrl) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: injectedFunction,
      args: [info.linkUrl, "link"],
    });
  } else if (info.menuItemId === "previewImage" && info.srcUrl) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: injectedFunction,
      args: [info.srcUrl, "image"],
    });
  } else if (info.menuItemId === "previewVideo" && info.srcUrl) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: injectedFunction,
      args: [info.srcUrl, "video"],
    });
  }
});