// TODO: Remove this link
// https://medium.com/tunaiku-tech/create-your-first-web-component-with-vanilla-javascript-af93cbf3a70f

// Header Component
class EhbHeader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    // Add component styling to <head>
    let stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "/src/components/header/header.css";
    document.head.appendChild(stylesheet);

    this.innerHTML = `
      <header class="header">
      <div class="header__container">
        <a href="#">
          <img
            src="/src/resources/images/ehblogo.svg"
            alt="Erasmushogeschool Brussel"
          />
        </a>
        <h1 class="header__title">MediaLab</h1>
        <div class="header__wrapper">
          <button class="header__cart btn">
            <span class="cart__items">1</span>
            <img
              src="/src/resources/images/backpack.svg"
              width="32px"
              alt=""
            />
          </button>
          <button id="hamburger-menu" class="header__hamburger-menu btn">
            <img
              src="/src/resources/images/hamburger-menu.svg"
              width="32px"
              alt=""
            />
          </button>
        </div>
      </div>
    </header>
  `;
  }
}

// Hamburger-menu Component
class HamburgerMenu extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    // Add component styling to <head>
    let stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "/src/components/header/hamburger-menu.css";
    document.head.appendChild(stylesheet);

    // Component
    this.id = "nav-menu";
    this.classList = "nav-menu hidden";

    this.innerHTML = `
      <div class="nav-menu__section">
        <a href="#" class="nav-menu__link">
          <img
            src="/src/resources/images/ehblogo-notext.png"
            width="32"
            alt="Erasmushogeschool Brussel"
          />
        </a>
        <button id="nav-close" class="nav-menu__button">
          <img src="/src/resources/images/x-mark.svg" width="24" alt="X" />
        </button>
      </div>
      <div class="nav-menu__section">
        <ul class="nav-menu__list">
          <li class="nav-menu__item">
            <a href="#" class="nav-menu__link">Reserveren</a>
          </li>
          <li class="nav-menu__item">
            <a href="#" class="nav-menu__link">Meer Info</a>
          </li>
          <li class="nav-menu__item">
            <a href="#" class="nav-menu__link">Mijn Uitleningen</a>
          </li>
          <li class="nav-menu__item">
            <a href="#" class="nav-menu__link">Mijn Reservaties</a>
          </li>
          <li class="nav-menu__item">
            <a href="#" class="nav-menu__link">Uitleengeschiedenis</a>
          </li>
        </ul>
      </div>

      <div class="nav-menu__section">
        <button class="nav-menu__button nav-menu__logout nav-menu__item">
          <img src="/src/resources/images/logout.svg" alt="Uitloggen" /> Uitloggen
        </button>
      </div>
  `;

    // Load component functionality
    loadScript("/src/components/header/hamburger-menu.js", (script) => {
      console.log(`Script ${script.src} loaded.`);
    });
  }
}

// Define Custom HTML Elements
customElements.define("ehb-header", EhbHeader);
customElements.define("hamburger-menu", HamburgerMenu);

function loadScript(src, cb) {
  let script = document.createElement("script");
  script.src = src;
  script.onload = () => cb(script);
  document.head.append(script);
}
