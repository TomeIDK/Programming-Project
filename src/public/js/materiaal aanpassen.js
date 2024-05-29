document.addEventListener("DOMContentLoaded", function () {
    var deleteButton = document.getElementById("verwijderenBtn");
    var cancelPopup = document.getElementById("cancelPopup");
    var cancelYes = document.getElementById("cancelYes");
    var cancelNo = document.getElementById("cancelNo");
  
    function showCancelPopup() {
      cancelPopup.style.display = "block";
    }
  
    function closeCancelPopup() {
      cancelPopup.style.display = "none";
    }
  
    if (deleteButton) {
      deleteButton.addEventListener("click", showCancelPopup);
    }
  
    if (cancelYes) {
      cancelYes.addEventListener("click", closeCancelPopup);
    }

    if (cancelNo) {
      cancelNo.addEventListener("click", closeCancelPopup);
    }
});
