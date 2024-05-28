document.addEventListener("DOMContentLoaded", function () {
    var cancelButtons = document.querySelectorAll(".cancel-reservation");
    var cancelPopup = document.getElementById("cancelPopup");
    var cancelYes = document.getElementById("cancelYes");
    var cancelNo = document.getElementById("cancelNo");
  
    function showCancelPopup() {
      cancelPopup.style.display = "block";
    }
  
    function closeCancelPopup() {
      cancelPopup.style.display = "none";
    }
  
    cancelButtons.forEach(function (button) {
      button.addEventListener("click", showCancelPopup);
    });
  
    cancelYes.addEventListener("click", closeCancelPopup);
    cancelNo.addEventListener("click", closeCancelPopup);
});
