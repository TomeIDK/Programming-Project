document.addEventListener("DOMContentLoaded", function () {
    var buttons = document.querySelectorAll(".btn.secondary-button");
    var popup = document.getElementById("popup");
    var close = document.getElementById("close");
    var confirm = document.getElementById("confirm");
  
    function showPopup() {
      popup.style.display = "block";
    }
  
    function closePopup() {
      popup.style.display = "none";
    }
  
    buttons.forEach(function(button) {
      button.addEventListener("click", showPopup);
    });
    
    close.addEventListener("click", closePopup);
    confirm.addEventListener("click", closePopup);
  });
  