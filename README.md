# Chrome Extension - Link Preview with Popup

This Chrome extension allows users to preview linked content in a resizable iframe overlay or as an image/video preview when right-clicking on a link, image, or video. Additionally, it provides an "Open Popup" button for links that can't be loaded in the iframe due to Content Security Policy (CSP) restrictions. The extension also includes a reload preview button to refresh the previewed content.

<img src="https://github.com/kshitijbhaskar/Page-Preview-Chrome-Extension/assets/95466193/7ffedd45-5adc-4554-a825-a92c51181074" alt="image" width="500" height="auto">
<img src="https://github.com/kshitijbhaskar/Page-Preview-Chrome-Extension/assets/95466193/3743ec8d-f627-420f-bb15-67a6bd19bb4e" alt="image" width="400" height="auto">

## Project Overview

This project enhances the browsing experience by providing a convenient way to preview linked content without leaving the current webpage. It offers the following features:

- **Link Preview:** Right-clicking on a link and selecting "Preview Page" opens a resizable overlay with the linked page's content displayed in an iframe.
- **Image Preview:** Right-clicking on an image and selecting "Preview Image" opens an overlay with the image displayed in its original resolution.
- **Video Preview:** Right-clicking on a video and selecting "Preview Video" opens an overlay with the video displayed and its controls enabled.
- **Resizable Previews:** Users can resize the preview overlay by dragging the edges, allowing them to adjust the size according to their preference.
- **Multiple Previews:** Users can open multiple previews simultaneously, overlaying one another, to compare and view multiple linked pages, images, or videos at once.
- **Open Popup:** For links that cannot be loaded in the iframe due to CSP restrictions, the preview provides an "Open Popup" button. Clicking on this button opens the linked page in a new popup window.
- **Reload Preview:** The overlay includes a "Reload Preview" button that allows users to refresh the previewed content, useful for pages with dynamic or frequently changing content or when a page fails to load.

## How to Use

1. Clone this repository.
2. Load the extension in Chrome as an [unpacked extension](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked).
3. Once the extension is loaded, right-click on any link, image, or video on a webpage.
4. In the context menu, select "Preview Page" to see the linked page's content in a resizable preview overlay with an iframe.
5. For images, select "Preview Image" to view the image in its original resolution.
6. For videos, select "Preview Video" to view the video with its controls enabled.
7. Resize the overlay by dragging the edges to adjust its size.
8. To open multiple previews, repeat steps 3-6 for different links, images, or videos. Previews will overlay one another.
9. For links restricted by CSP (Content Security Policy), the preview will display an "Open Popup" button.
10. Click on the "Open Popup" button to view the content in a new popup window.
11. To reload the previewed content, click on the "Reload Preview" button in the overlay.

Please note that the Preview functionality may not work on all websites due to various CSP restrictions.

## Implementation Notes

1. The extension uses the `chrome.contextMenus` API to create context menu items for "Preview Page," "Preview Image," and "Preview Video."
2. The `chrome.runtime.onMessage` API is used to communicate between the content script (`injectedFunction`) and the background script (`background.js`). When the "Open Preview Popup" button is clicked in the preview container, the content script sends a message to the background script, which then triggers the creation of a new popup window using the `chrome.windows.create` API.
3. The `injectedFunction` dynamically creates the preview container and appends the relevant media element (image, video, or iframe) based on the context. It also creates buttons for closing the preview, opening the popup, and reloading the preview.
4. The preview container is fixed to the top-right corner of the webpage with a width of 50%. It is resizable using the resize handle provided at the left edge of the container.
5. The `background.js` file handles the context menu clicks and executes the `injectedFunction` using the `chrome.scripting.executeScript` API. The appropriate media type (link, image, or video) is passed as an argument to the function.

For more information on Chrome extensions and related APIs, refer to the [Chrome Extension Developer Documentation](https://developer.chrome.com/docs/extensions/).
