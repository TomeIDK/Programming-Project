// Show toast with message and state (true = success; false = failed)
function showToast(message, state) {
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = "/src/components/toast/toast.css";
    // <link rel="stylesheet" href="/src/css/reset.css">


    const toast = document.createElement("div");
    toast.id = "toast";
    toast.classList.add("toast-container");

    const toastNotif = document.createElement("div");
    toastNotif.classList.add("toast-notification");

    const toastIcon = document.createElement("img");
    toastIcon.classList.add("toast__icon");
    toastIcon.src = "/src/resources/images/toast-check.svg";
    if (state == false){
      toastIcon.src = "/src/resources/images/toast-x.svg";
    } 

    const toastMessage = document.createElement("p");
    toastMessage.classList.add("toast__message");
    toastMessage.innerText = message;

    toastNotif.appendChild(toastIcon);
    toastNotif.appendChild(toastMessage);
    toast.appendChild(toastNotif);

    document.head.appendChild(style);
    document.body.prepend(toast);

    let showTimer = 1000;
    // Set toast visibility time
    setTimeout(function() {
    toast.classList.add('show');
    }, showTimer);

    // Remove toast from DOM
    setTimeout(function() {
      toast.remove();
      style.remove();
    }, showTimer + 3000);
  }