// Header Component
class EhbHeader extends HTMLElement {
  constructor() {
    super();

    this.basket = "";
  }

  connectedCallback() {
    this.basket = this.getAttribute("nobasket");
    this.render();
  }

  render() {
    // Component Logic
    let basket = `
    <button id="btn-cart" class="header__cart header__btn">
    <span id="header-cart-item-count" class="cart__items">1</span>
    <img
      src="/images/backpack.svg"
      width="32px"
      alt=""
    />
  </button>
    `;

    if (this.basket !== null) {
      basket = "";
    }

    // Component
    this.innerHTML = `
      <header class="header">
      <div class="header__container">
          <img
            src="/images/ehblogo.svg"
            alt="Erasmushogeschool Brussel"
          />
        <div class="header__wrapper">
          ${basket}
          <button id="hamburger-menu" class="header__hamburger-menu header__btn">
            <img
              src="/images/hamburger-menu.svg"
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
    this.admin = "";
  }

  connectedCallback() {
    this.admin = this.getAttribute("admin");
    this.render();
  }

  render() {
    // Component Logic
    this.id = "nav-menu";
    this.classList = "nav-menu hidden";

    // Component

    if (this.admin !== null) {
      this.innerHTML = `
      <div class="nav-menu__section">
        <a href="/admin/dashboard" class="nav-menu__link">
          <img
            src="/images/ehblogo-notext.png"
            width="32"
            alt="Erasmushogeschool Brussel"
          />
        </a>
        <button id="nav-close" class="nav-menu__button">
          <img src="/images/x-mark.svg" width="24" alt="X" />
        </button>
      </div>
      <div class="nav-menu__section">
        <ul class="nav-menu__list">
          <li class="nav-menu__item">
            <a href="/admin/dashboard" class="nav-menu__link">Dashboard</a>
          </li>
          <li class="nav-menu__item">
            <a href="/admin/retourbeheer" class="nav-menu__link">Retourbeheer</a>
          </li>
          <li class="nav-menu__item">
          <a href="/admin/uitleengeschiedenis" class="nav-menu__link">Uitleengeschiedenis</a>
        </li>
        <li class="nav-menu__item">
        <a href="/admin/gebruikersbeheer" class="nav-menu__link">Gebruikersbeheer</a>
      </li>
        </ul>
      </div>

      <div class="nav-menu__section">
        <button id="btn-logout" class="nav-menu__button nav-menu__logout nav-menu__item">
          <img src="/images/logout.svg" alt="Uitloggen" /> Uitloggen
        </button>
      </div>
  `;
    } else {
      this.innerHTML = `
      <div class="nav-menu__section">
        <a href="#" class="nav-menu__link">
          <img
            src="/images/ehblogo-notext.png"
            width="32"
            alt="Erasmushogeschool Brussel"
          />
        </a>
        <button id="nav-close" class="nav-menu__button">
          <img src="/images/x-mark.svg" width="24" alt="X" />
        </button>
      </div>
      <div class="nav-menu__section">
        <ul class="nav-menu__list">
          <li class="nav-menu__item">
            <a href="/cataloog" class="nav-menu__link">Cataloog</a>
          </li>
          <li class="nav-menu__item">
            <a href="/info" class="nav-menu__link">Meer Info</a>
          </li>
          <li class="nav-menu__item">
            <a href="/reservaties" class="nav-menu__link">Mijn Reservaties</a>
          </li>
          <li class="nav-menu__item">
          <a href="/mijn-uitleningen" class="nav-menu__link">Mijn Uitleningen</a>
        </li>
          <li class="nav-menu__item">
            <a href="/mijn-uitleengeschiedenis" class="nav-menu__link">Mijn Uitleengeschiedenis</a>
          </li>
        </ul>
      </div>

      <div class="nav-menu__section">
        <button id="btn-logout" class="nav-menu__button nav-menu__logout nav-menu__item">
          <img src="/images/logout.svg" alt="Uitloggen" /> Uitloggen
        </button>
      </div>
  `;
    }

    // Load component functionality
    loadScript("/components/custom/header/hamburger-menu.js", (script) => {
    });
  }
}

class EhbFooter extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    // Component

    this.innerHTML = `
    <footer class="footer">
      <div class="footer__container">
        <img
          class="footer__logo"
          src="/images/ehblogo-footer.jpg"
          alt="Erasmushogeschool Brussel"
          width="250"
        />
        <div class="footer__wrapper">
          <ul class="footer__socials-list">
            <li class="socials-list-item">
              <a href="https://www.facebook.com/erasmushogeschool" target="_blank"
                ><img
                  src="/images/facebooklogo.png"
                  width="32px"
                  alt="Facebook"
              /></a>
            </li>
            <li class="socials-list-item">
              <a href="https://www.linkedin.com/school/erasmushogeschool-brussel/" target="_blank"
                ><img
                  src="/images/linkedinlogo.png"
                  width="32px"
                  alt="LinkedIn"
              /></a>
            </li>
            <li class="socials-list-item">
              <a href="https://twitter.com/ehbrussel" target="_blank"
                ><img
                  src="/images/xlogo.png"
                  width="32px"
                  alt="X"
              /></a>
            </li>
            <li class="socials-list-item">
              <a href="https://www.instagram.com/erasmushogeschool/" target="_blank"
                ><img
                  src="/images/instagramlogo.png"
                  width="32px"
                  alt="Instagram"
              /></a>
            </li>
            <li class="socials-list-item">
              <a href="https://www.youtube.com/user/ehbrussel" target="_blank"
                ><img
                  src="/images/youtubelogo.png"
                  width="32px"
                  alt="YouTube"
              /></a>
            </li>
            <li class="socials-list-item">
              <a href="https://discord.gg/3xyz3Dg6xG" target="_blank"
                ><img
                  src="/images/discordlogo.png"
                  width="32px"
                  alt="Discord"
              /></a>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer__info">
        <ul class="footer__info-list">
          <li class="footer__info-list-item">
            <a href="">©Erasmushogeschool Brussel 2024</a>
          </li>
          <li class="footer__info-list-item">
            <a href="https://www.erasmushogeschool.be/en/cookie-statement" target="_blank">Cookieverklaring</a>
          </li>
          <li class="footer__info-list-item"><a href="https://www.erasmushogeschool.be/en/disclaimer" target="_blank">Disclaimer</a></li>
          <li class="footer__info-list-item">
            <a href="https://www.erasmushogeschool.be/en/terms-of-use" target="_blank">Gebruikersvoorwaarde</a>
          </li>
          <li class="footer__info-list-item">
            <a href="https://www.erasmushogeschool.be/en/privacy-statement" target="_blank">Privacyverklaring</a>
          </li>
        </ul>
      </div>
    </footer>
  `;
  }
}

// Define Custom HTML Elements
customElements.define("ehb-header", EhbHeader);
customElements.define("hamburger-menu", HamburgerMenu);
customElements.define("ehb-footer", EhbFooter);

function loadScript(src, cb) {
  let script = document.createElement("script");
  script.src = src;
  script.onload = () => cb(script);
  document.head.append(script);
}
