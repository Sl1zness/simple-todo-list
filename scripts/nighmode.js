"use strict"

if (localStorage.getItem("isNightmode") == null) {
    localStorage.setItem("isNightmode", "true");
}
const nightmodeButton = document.querySelector(".nightmode-button");

const toggleNightMode = () => {
    const modals = document.getElementsByClassName("modal");
    for (const elem of modals) {
        elem.querySelector(".modal__inner").classList.toggle("modal__inner_lightmode");
        elem.querySelector(".button_dark-bg").classList.toggle("button_dark-bg_lightmode");
    }

    const [body] = document.getElementsByTagName("body");
    body.classList.toggle("body__lightmode");

    if (body.classList.contains("body__lightmode")) {
        nightmodeButton.getElementsByTagName("img")[0].setAttribute("src", "/images/icons/nightModeIcon.svg");
    } else {
        nightmodeButton.getElementsByTagName("img")[0].setAttribute("src", "/images/icons/lightModeIcon.svg");
    }
}

nightmodeButton.addEventListener("click", () => {
    localStorage.setItem("isNightmode", !(localStorage.getItem("isNightmode") === "true"));
    toggleNightMode();
});

if (localStorage.getItem("isNightmode") != null && !(localStorage.getItem("isNightmode") === "true")) {
    toggleNightMode();
}