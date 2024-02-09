"use strict";


import createTaskBlock from "./createTaskBlock.js";

const [container] = document.getElementsByClassName("main__inner");
const [loader] = document.getElementsByClassName("loader");
const [emptyListScreen] = document.getElementsByClassName("main__empty");
const [list] = document.getElementsByClassName("main__tasks-list");
let listItems = {};

// Checks if object is empty
const isObjectEmpty = obj => {
    for (const elem in obj) {
        if (obj.hasOwnProperty(elem)) {
            return false;
        }
    }

    return true;
}

fetch("http://127.0.0.1:3000/", {
    method: "GET"
})
.then(data => data.json())
.then(data => listItems = data)
.catch(err => console.log(err.message))
.finally(() => {
    container.removeChild(loader);

    if (isObjectEmpty(listItems)) {
        emptyListScreen.classList.remove("main__empty_hidden");
    } else {
        const { tasks } = listItems;

        tasks.forEach(elem => {
            list.appendChild(createTaskBlock(elem));
        });
    }
});