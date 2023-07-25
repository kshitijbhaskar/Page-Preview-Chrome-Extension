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
  var position = "right";

  const container = document.createElement("div");
  container.setAttribute("class", "previewContainer");
  container.style.position = "fixed";
  container.style.display = "flex";
  container.style.flexFlow = "row wrap";
  // container.style.flexWrap = "wrap";
  container.style.top = "0";
  container.style.right = "0";
  container.style.width = "50%";
  container.style.height = "100%";
  container.style.zIndex = "999999";
  container.style.overflow = "hidden";
  
  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.flexDirection = "column";
  buttonContainer.style.padding = "2px";
  
  const reloadButton = document.createElement("button");
  const reload = document.createElement("img");
  reload.src = chrome.runtime.getURL("assets/reload.png");
  reload.alt = "R";
  reload.style.height = "15px"; 
  reload.style.width = "15px"; 
  reloadButton.appendChild(reload);
  reloadButton.title = "Reload Preview";

  
  const closeButton = document.createElement("button");
  const close = document.createElement("img");
  close.src = chrome.runtime.getURL("assets/close.png");
  close.alt = "X";
  close.style.height = "15px";
  close.style.width = "15px";
  closeButton.appendChild(close);
  closeButton.title = "Close Preview";
  
  closeButton.addEventListener("click", () => {
    container.remove();
  });
  
  const changeButton = document.createElement("button");
  const change = document.createElement("img");
  change.src = chrome.runtime.getURL("assets/flip-left.png");
  change.alt = "<";
  change.style.height = "15px";
  change.style.width = "15px";
  changeButton.appendChild(change);
  changeButton.title = "Flip Preview";
  
  changeButton.addEventListener("click", () => {
    if (position === "left") {
      // Change orientation to right
      container.style.flexFlow = "row wrap"; // Adjust the justify-content property
      container.style.left = null;
      container.style.right = "0";
      change.src = chrome.runtime.getURL("assets/flip-left.png");
      change.alt = "<";
      position = "right";
    } else if (position === "right") {
      // Change orientation to left
      container.style.flexFlow = "row-reverse wrap"; // Adjust the justify-content property
      container.style.left = "0";
      container.style.right = null;
      change.src = chrome.runtime.getURL("assets/flip-right.png");
      change.alt = ">";
      position = "left";
    }
  });
  
  const popupButton = document.createElement("button");
  const popup = document.createElement("img");
  popup.src = chrome.runtime.getURL("assets/popup.png");
  popup.alt = "O";
  popup.style.height = "15px";
  popup.style.width = "15px";
  popupButton.appendChild(popup);
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
  // handle.style.left = "0";
handle.style.width = "5px";
handle.style.height = "100%";
handle.style.background = "rgb(255 255 255 / 5%)"
handle.style.backdropFilter = "blur(1.5px))"
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
    if(position === "right"){
      container.style.width = startWidth - (event.pageX - startX) + "px";
    }
    else if(position === "left"){
      container.style.width = startWidth + (event.pageX - startX) + "px";
    }
    // mediaElement.style.width = "100%"; 
  }
  
  function handleMouseUp() {
    handle.style.width = "5px";
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }
  
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
});

const media = document.createElement("div");
media.style.background = "white";
media.style.flex = 1;

if (mediaType === "image") {
  const mediaElement = document.createElement("img");
  mediaElement.src = linkUrl;
  mediaElement.alt = "Preview Image";
  mediaElement.style.width = "100%";
  mediaElement.style.height = "100%";
  media.appendChild(mediaElement);
} else if (mediaType === "video") {
  const mediaElement = document.createElement("video");
  mediaElement.src = linkUrl;
  mediaElement.style.width = "100%";
  mediaElement.style.height = "100%";
  mediaElement.controls = true;
  media.appendChild(mediaElement);
} else if (mediaType === "link"){
  const mediaElement = document.createElement("iframe");
  mediaElement.src = linkUrl;
  mediaElement.style.width = "100%";
  mediaElement.style.height = "100%";
  media.appendChild(mediaElement);
}

reloadButton.addEventListener("click", (event) => {
  if (mediaType === "image") {
    const currentMediaElement = event.target.closest(".previewContainer").querySelector("img");
    currentMediaElement.src = linkUrl; 
  } else if (mediaType === "video") {
    const currentMediaElement = event.target.closest(".previewContainer").querySelector("video");
    currentMediaElement.src = linkUrl; 
  } else if (mediaType === "link"){
    const currentMediaElement = event.target.closest(".previewContainer").querySelector("iframe");
    currentMediaElement.src = linkUrl; 
  }
});


buttonContainer.appendChild(closeButton);
buttonContainer.appendChild(popupButton);
buttonContainer.appendChild(reloadButton);
buttonContainer.appendChild(changeButton);
container.appendChild(buttonContainer);
container.appendChild(handle);
container.appendChild(media);
document.body.appendChild(container);

  if (popupButton) {
    popupButton.addEventListener("click", () => {
      container.remove();
      chrome.runtime.sendMessage({ action: "createPopupWindow", url: linkUrl });
    });
  }

    const buttons = document.querySelectorAll("button");

  buttons.forEach((button) => {
    button.style.display = "flex";
    button.style.alignContent = "center";
    button.style.height = "25px";
    button.style.widtht = "25px";
    button.style.margin = "2.5px";
    button.style.padding = "5px 5px";
    button.style.border = "none";
    button.style.background = "rgb(255 255 255 / 50%)";
    button.style.backdropFilter = "blur(1.5px)";
    button.style.color = "inherit";
    button.style.cursor = "pointer";
    button.style.fontFamily = "sans-serif";
    button.style.borderRadius = "0.5rem";
    button.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.5)";
    button.style.opacity = "0.25";
    button.style.transition = "opacity 0.3s ease";

    button.addEventListener("mouseenter", function () {
      button.style.opacity = "1";
    });

    button.addEventListener("mouseleave", function () {
      button.style.opacity = "0.25";
    });
  });
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