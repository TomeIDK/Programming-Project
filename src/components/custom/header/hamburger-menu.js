const btnClose = document.getElementById("nav-close");
const body = document.body;
const nav = document.getElementById("nav-menu");
const hamburgerMenu = document.getElementById("hamburger-menu");

hamburgerMenu.addEventListener("click", () => {
  nav.classList.remove("hidden");
  body.classList.remove("unblur");
  body.classList.add("blur");
  nav.classList.remove("inactive");
  nav.classList.add("active");
});

btnClose.addEventListener("click", () => {
  body.classList.add("unblur");
  body.classList.remove("blur");
  nav.classList.add("inactive");
  nav.classList.remove("active");
  setTimeout(() => {
    nav.classList.add("hidden");
  }, 450)
});
