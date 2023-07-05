chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "previewPage",
    title: "Preview",
    contexts: ["link"]
  });
});

function injectedFunction(Url) {
  const linkUrl = Url;

    const container = document.createElement("div");
    container.setAttribute("id", "previewContainer");
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.right = "0";
    container.style.width = "50%";
    container.style.height = "100%";
    container.style.zIndex = "9999";
    container.style.background = "white";
    container.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
    container.style.overflow = "hidden";

    const iframe = document.createElement("iframe");
    iframe.src = linkUrl;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";

    const closeButton = document.createElement("button");
    closeButton.textContent = " X ";
    closeButton.style.position = "inherit";
    closeButton.style.top = "10px";
    closeButton.style.right = "10px";
    closeButton.style.padding = "5px 10px";
    closeButton.style.border = "none";
    closeButton.style.background = "inherit";
    closeButton.style.color = "inherit";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontFamily = "sans-serif";
    closeButton.style.borderRadius = "0.5rem";
    closeButton.style.boxShadow = "inherit";
    closeButton.style.marginRight = "50%";

    closeButton.addEventListener("click", () => {
      container.remove();
    });

    const handleClickOutsideContainer = (event) => {
      if (!container.contains(event.target)) {
        container.remove();
        document.removeEventListener("click", handleClickOutsideContainer);
      }
    };
    
    document.addEventListener("click", handleClickOutsideContainer);

    container.appendChild(closeButton);
    container.appendChild(iframe);
    document.body.appendChild(container);
}

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "previewPage" && info.linkUrl) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func : injectedFunction,
      args : [ info.linkUrl ],
    });
  }
});
