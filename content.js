// // chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
// //   console.log(message);
// //   console.log(sender);
// //   if (message.action === "previewLink" && message.linkUrl) {
//     const linkUrl = info.linkUrl;

//     const container = document.createElement("div");
//     container.setAttribute("id", "previewContainer");
//     container.style.position = "fixed";
//     container.style.top = "0";
//     container.style.right = "0";
//     container.style.width = "50%";
//     container.style.height = "100%";
//     container.style.zIndex = "9999";
//     container.style.background = "white";
//     container.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
//     container.style.overflow = "hidden";

//     const iframe = document.createElement("iframe");
//     iframe.src = linkUrl;
//     iframe.style.width = "100%";
//     iframe.style.height = "100%";
//     iframe.style.border = "none";

//     const closeButton = document.createElement("button");
//     closeButton.textContent = "Close";
//     closeButton.style.position = "absolute";
//     closeButton.style.top = "10px";
//     closeButton.style.right = "10px";
//     closeButton.style.padding = "5px 10px";
//     closeButton.style.border = "none";
//     closeButton.style.background = "#e74c3c";
//     closeButton.style.color = "white";
//     closeButton.style.cursor = "pointer";
//     closeButton.style.fontFamily = "sans-serif";

//     closeButton.addEventListener("click", () => {
//       container.remove();
//     });

//     container.appendChild(closeButton);
//     container.appendChild(iframe);
//     tab.document.body.appendChild(container);

//     // sendResponse("Preview started successfully");
//   // }
//   // return true;
// // });
