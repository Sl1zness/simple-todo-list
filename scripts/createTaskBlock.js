"use strict"


import showModal from "./modals.js";
import isTouchScreen from "./isTouchScreen.js";

// TODO: refactor as a custom HTML element (maybe...)
// Creates HTML task element with required attributes
const createTaskBlock = data => {
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("main__task");

    const itemLeftSide = document.createElement("div");
    itemLeftSide.classList.add("main__task-left");

    const itemHeader = document.createElement("h2");
    itemHeader.classList.add("main__task-header");
    itemHeader.innerText = data["task-header"];

    // TODO: addEventListener to change isChecked field in data
    const itemCheckbox = document.createElement("input");
    itemCheckbox.setAttribute("type", "checkbox");
    itemCheckbox.setAttribute("name", "task-checkmark");
    if (data.isChecked) {
        itemCheckbox.setAttribute("checked", "");
        itemHeader.classList.add("main__task-header_crossed");
    }
    itemCheckbox.classList.add("main__task-checkbox");

    itemLeftSide.appendChild(itemCheckbox);
    itemLeftSide.appendChild(itemHeader);

    const itemRightSide = document.createElement("div");
    itemRightSide.classList.add("main__task-right");

    const editTaskIcon = document.createElement("img");
    editTaskIcon.setAttribute("src", "images/icons/editTodoTask.svg");
    editTaskIcon.setAttribute("alt", "Edit this task");
    editTaskIcon.setAttribute("width", "14");
    editTaskIcon.setAttribute("height", "14");
    editTaskIcon.classList.add("main__task-action");

    const removeTaskIcon = document.createElement("img");
    removeTaskIcon.setAttribute("src", "images/icons/removeTodoTask.svg");
    removeTaskIcon.setAttribute("alt", "Remove this task");
    removeTaskIcon.setAttribute("width", "18");
    removeTaskIcon.setAttribute("height", "18");
    removeTaskIcon.classList.add("main__task-action");

    itemRightSide.appendChild(editTaskIcon);
    itemRightSide.appendChild(removeTaskIcon);

    itemContainer.appendChild(itemLeftSide);
    itemContainer.appendChild(itemRightSide);

    if (!isTouchScreen()) {
        itemContainer.addEventListener("mouseenter", () => {
            itemRightSide.classList.add("main__task-right_visible");
        });

        itemContainer.addEventListener("mouseleave", () => {
            itemRightSide.classList.remove("main__task-right_visible");
        });
    } else {
        itemRightSide.classList.add("main__task-right_visible");
    }

    itemCheckbox.addEventListener("click", () => {
        if (itemCheckbox.attributes.getNamedItem("checked") != null) {
            itemCheckbox.removeAttribute("checked");
            itemHeader.classList.remove("main__task-header_crossed");
        } else {
            itemCheckbox.setAttribute("checked", "");
            itemHeader.classList.add("main__task-header_crossed");
        }
    });

    editTaskIcon.addEventListener("click", () => {
        showModal("modal__edit-task", data);
    });

    removeTaskIcon.addEventListener("click", () => {
        itemContainer.parentElement.removeChild(itemContainer);
    });

    return itemContainer;
}

export default createTaskBlock;
