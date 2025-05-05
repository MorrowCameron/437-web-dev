
// Constructor Functions
const createHeader = () => {
  const nav = document.createElement("nav");
  nav.id = "navbar";
  nav.classList.add("topbar");
  createTopbarLeft(nav);
  createTopbarRight(nav);
  document.getElementById("navbar").replaceWith(nav);
  return nav;
}

const createTopbarLeft = nav => {
  const leftContainer = document.createElement("div");
  leftContainer.classList.add("topbar-left");
  appendName(leftContainer);
  appendLink(leftContainer, "Home", "index.html");
  appendLink(leftContainer, "Portfolio", "portfolio.html");
  appendLink(leftContainer, "Contact", "contact.html");
  nav.appendChild(leftContainer);
  console.log(leftContainer);
}

const appendName = (container) => {
  const name = document.createElement("p");
  name.textContent = "Cameron Morrow";
  name.classList.add("name-logo");
  container.appendChild(name);
}

const appendLink = (container, text, href) => {
  const link = document.createElement("a");
  link.textContent = text;
  link.href = href;
  link.alt = "";
  link.classList.add("link");
  link.classList.add("hiddenLink");
  container.appendChild(link);
}

const createTopbarRight = nav => {
  const rightContainer = document.createElement("div");
  rightContainer.classList.add("topbar-right");
  appendDarkModeToggle(rightContainer);
  appendButton(rightContainer);
  nav.appendChild(rightContainer);
  console.log(rightContainer);
}

const appendDarkModeToggle = container => {
  const label = document.createElement("label");
  label.textContent = "Dark Mode";
  const toggle = document.createElement("input");
  toggle.id="dark-mode-toggle";
  setupToggleListener(toggle);
  toggle.type = "checkbox";
  toggle.autocomplete="off";
  label.appendChild(toggle);
  container.appendChild(label);
}

const setupToggleListener = toggle => {
  toggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
    if(localStorage.getItem("dark-mode") === "true") {
      localStorage.setItem("dark-mode", "false");
    } else {
      localStorage.setItem("dark-mode", "true");
    }
    console.log("Dark mode toggled");
  });
}

const appendButton = container => {
  const button = document.createElement("button");
  button.textContent = "Menu";
  setupButtonListener(button);
  container.appendChild(button);
}

const setupButtonListener = button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".hiddenLink").forEach(hiddenLink => {
    hiddenLink.classList.toggle("hiddenLink");
    hiddenLink.classList.toggle("displayLink");
  });
  console.log("testing");
});
}

// Main functions (run on load)

createHeader();

document.body.addEventListener("click", (event) => {
  if(!document.getElementById("navbar").contains(event.target)) {
    document.querySelectorAll(".displayLink").forEach(displayLink => {
      displayLink.classList.toggle("hiddenLink");
      displayLink.classList.toggle("displayLink");
    });
  }
});

if(localStorage.getItem("dark-mode") === "true") {
  document.body.classList.add("dark-mode");
  document.getElementById("dark-mode-toggle").checked = true;
};