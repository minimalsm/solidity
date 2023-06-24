const isDarkMode = localStorage.getItem(LS_COLOR_SCHEME) != DARK;

const getLogoSrc = () => (isDarkMode ? LIGHT_LOGO_PATH : DARK_LOGO_PATH);

const getToggleIconSrc = () => (isDarkMode ? MOON_ICON_PATH : SUN_ICON_PATH);

const getMenuIconSrc = () =>
  isDarkMode ? DARK_HAMBURGER_PATH : LIGHT_HAMBURGER_PATH;

function buildHeader() {
  const header = document.createElement("div");
  header.classList.add("unified-header");
  document.querySelector("body").prepend(header);

  const homeLink = document.createElement("a");
  homeLink.classList.add("home-link");
  homeLink.href = SOLIDITY_HOME_URL;
  homeLink.ariaLabel = "Solidity home";
  header.appendChild(homeLink);

  const logo = document.createElement("img");
  logo.classList.add(SOLIDITY_LOGO_CLASS);
  logo.src = getLogoSrc();
  logo.alt = "Solidity logo";
  homeLink.appendChild(logo);

  const navBar = document.createElement("nav");
  navBar.classList.add("nav-bar");
  header.appendChild(navBar);

  const linkElements = NAV_LINKS.map(({ name, href }) => {
    const link = document.createElement("a");
    link.classList.add("nav-link");
    link.setAttribute("key", name);
    link.setAttribute("href", href);
    link.setAttribute("aria-label", name);
    let innerText = name;
    if (href === FORUM_URL) {
      innerText += " ↗";
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    }
    link.innerText = innerText;
    return link;
  });
  linkElements.forEach((link) => navBar.appendChild(link));

  // Build color toggle
  const toggleIcon = document.createElement("img");
  toggleIcon.classList.add(COLOR_TOGGLE_ICON_CLASS);
  toggleIcon.src = getToggleIconSrc();
  toggleIcon.alt = "Color mode toggle icon";
  toggleIcon.setAttribute("aria-hidden", "true");
  toggleIcon.setAttribute("key", "toggle icon");
  const colorModeButton = document.createElement("button");
  colorModeButton.classList.add("color-toggle");
  colorModeButton.setAttribute("type", "button");
  colorModeButton.setAttribute("aria-label", "Toggle light dark mode");
  colorModeButton.setAttribute("key", "color mode button");
  colorModeButton.addEventListener("click", toggleCssMode);
  colorModeButton.appendChild(toggleIcon);
  navBar.appendChild(colorModeButton);

  // Build mobile hamburger menu
  const menuIcon = document.createElement("img");
  menuIcon.classList.add(COLOR_TOGGLE_ICON_CLASS);
  menuIcon.src = getMenuIconSrc();
  menuIcon.alt = "Toggle menu";
  menuIcon.setAttribute("aria-hidden", "true");
  menuIcon.setAttribute("key", "menu icon");
  const menuButton = document.createElement("button");
  menuButton.classList.add("color-toggle");
  menuButton.classList.add("mobile-menu-button");
  menuButton.setAttribute("type", "button");
  menuButton.setAttribute("aria-label", "Toggle menu");
  menuButton.setAttribute("key", "menu button");
  menuButton.addEventListener("click", toggleMenu());
  menuButton.appendChild(menuIcon);
  navBar.appendChild(menuButton);
}

document.addEventListener("DOMContentLoaded", buildHeader);

function initialize() {
  // Load style sheets
  var url_root =
    DOCUMENTATION_OPTIONS.URL_ROOT === "./"
      ? ""
      : DOCUMENTATION_OPTIONS.URL_ROOT;

  var lightCss = $(`link[href="${url_root}_static/pygments.css"]`)[0];

  // Check localStorage for existing color scheme preference
  var prefersLight = localStorage.getItem(LS_COLOR_SCHEME) != DARK;
  // In case none existed, establish localStorage color scheme preference
  var mode = prefersLight ? LIGHT : DARK;
  localStorage.setItem(LS_COLOR_SCHEME, mode);

  // Select the root element and set the style attribute to denote color-scheme attribute
  document
    .querySelector(":root")
    .setAttribute("style", `--color-scheme: ${mode}`);

  // Set light/dark toggle switch to match localStorage preference
  var checkbox = document.querySelector("input[name=mode]");
  checkbox.checked = prefersLight;

  // Enable/disable light style sheets
  lightCss.sheet.disabled = !prefersLight;

  // Remove old RTD logo anchor element
  document.querySelector(".wy-side-nav-search > a").remove();

  // Add event listener to toggle switch
  checkbox.addEventListener("change", function () {
    toggleCssMode();
  });

  // Close menu
  toggleMenu(true); // true => force close
}

document.addEventListener("DOMContentLoaded", initialize);
