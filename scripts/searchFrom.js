"use strict";


const [container] = document.getElementsByClassName("main__inner");
const [loader] = document.getElementsByClassName("loader");
const [emptyListScreen] = document.getElementsByClassName("main__empty");
let listItems = {};

// TODO: refactor
// Creates HTML task element with required attributes
const createItem = data => {
    const itemContainer = document.createElement("div");
    const itemCheckbox = document.createElement("span");
    itemCheckbox.innerText = "CHECK";
    const itemName = document.createElement("p");
    itemName.innerText = data.title;

    itemContainer.appendChild(itemCheckbox);
    itemContainer.appendChild(itemName);

    return itemContainer;
}

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
    loader.classList.remove("loader_animated");

    if (isObjectEmpty(listItems)) {
        emptyListScreen.classList.remove("main__empty_hidden");
    } else {
        const { tasks } = listItems;

        tasks.forEach(elem => {
            container.append(createItem(elem));
        });
    }
});