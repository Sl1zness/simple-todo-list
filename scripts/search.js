"use strict"


import createTaskBlock from "./createTaskBlock.js";

const searchForm = document.querySelector(".header__form");
const searchButton = document.querySelector(".header__search-icon");

const fetchSearchResults = () => {
    const searchField = searchForm.querySelector(".header__search");
    fetch("http://127.0.0.1:3000/task-search/".concat(searchField.value), {
        method: "GET"
    })
        .then(res => res.json())
        .then(data => {
            const container = document.querySelector(".main__tasks-list");
            while (container.firstChild) {
                container.removeChild(container.lastChild);
            }

            for (const elem of data["tasks"]) {
                container.appendChild(createTaskBlock(elem));
            }
        })
        .catch(err => console.log(err.message));
}

searchButton.addEventListener("click", () => {
    fetchSearchResults();
});

searchForm.addEventListener("submit", e => {
    e.preventDefault();
    fetchSearchResults();
})