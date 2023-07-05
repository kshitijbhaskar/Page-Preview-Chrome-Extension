chrome.storage.local.get(["previewUrl"], function(result) {
    const previewUrl = result.previewUrl;
    if (previewUrl) {
      const previewFrame = document.getElementById("previewFrame");
      previewFrame.src = previewUrl;
    }
  });
  