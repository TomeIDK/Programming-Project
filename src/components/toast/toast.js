

showToast("Message");

// Show toast with message
function showToast(message) {
    // TODO: Programmatically create toast
    const toast = document.getElementById("toast");
    const toastText = document.getElementById("toast-text");
    let showTime = 1000;

    
    toastText.textContent = message;
  
    // Set toast visibility time
    setTimeout(function() {
      toast.classList.add('show');
    }, showTime);

    // Remove toast from DOM
    setTimeout(function() {
      toast.remove();
    }, showTime + 3000);
  }