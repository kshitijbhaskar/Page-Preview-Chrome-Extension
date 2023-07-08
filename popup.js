document.addEventListener("DOMContentLoaded", function() {
    // Get the close button element
    const closeButton = document.getElementById("closeButton");
  
    // Add a click event listener to the close button
    closeButton.addEventListener("click", function() {
      // Close the current popup window
      window.close();
    });
  });
  