"use strict"


import createTaskBlock from "./createTaskBlock.js";

const modals = document.querySelectorAll(".modal");
const addTaskButton = document.querySelector(".main__add-task-button");
let taskData = {};

const findElementByClassName = className => {
    for (const elem of modals) {
        if (elem.classList.contains(className)) {
            return elem;
        }
    }

    return null;
}

// TODO: merge 3 fetch methods
const sendForm = (method, path, formData) => {
    fetch("http://127.0.0.1:3000/".concat(path), {
        method: method,
        body: formData
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err.message));
}

const deleteTask = data => {
    fetch("http://127.0.0.1:3000/del-task/".concat(data["id"]), {
        method: "DELETE"
    })
        .then(res => console.log(res.status))
        .catch(err => console.log(err.message));
}


const putCheckbox = (id, state) => {
    fetch("http://127.0.0.1:3000/change-mark/".concat(id), {
        method: "PATCH",
        body: JSON.stringify({ "isChecked": state }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => console.log(res.status))
        .catch(err => console.log(err.message));
}


const validateForm = (form, method) => {
    const formData = new FormData(form);

    let isValid = true;

    for (const elem of formData) {
        if (elem[0] == "task-header") {
            if (elem[1].length <= 3) {
                const warning = form.querySelector(".header-warning");
                const input = form.querySelector(".modal__form-input");

                input.classList.add("modal__form-input_outlined");
                warning.classList.add("header-warning_shown");
                isValid = false;

                return false;
            }
        }
    }

    if (isValid) {
        formData.append("id", taskData["id"]);
        formData.append("isChecked", taskData["isChecked"]);
        if (method == "POST") {
            sendForm("POST", "add", formData);
        } else if (method == "PUT") {
            sendForm("PUT", "change-task", formData);
        }

        const buff = {};
        for (const elem of formData) {
            buff[elem[0]] = elem[1];
        }

        if (method == "POST") {
            const tasksList = document.querySelector(".main__tasks-list");
            tasksList.append(createTaskBlock(buff));
        }
    }

    return true;
}

const closeModalListeners = () => {
    for (const elem of modals) {
        const bg = elem.querySelector(".modal__bg");
        const card = elem.querySelector(".modal__inner");
        const cancelButton = elem.querySelector(".modal__button-cancel");
        const submitButton = elem.querySelector(".modal__button-submit");

        const removeActiveClass = () => {
            bg.classList.remove("modal__bg_shown");
            card.classList.remove("modal__inner_shown");
        }

        bg.addEventListener("click", () => {
            removeActiveClass();
        });

        cancelButton.addEventListener("click", () => {
            removeActiveClass();
        });

        submitButton.addEventListener("click", e => {
            e.preventDefault();
            let queryMethod = "POST";
            const form = elem.querySelector(".modal__form");
            if (elem.classList.contains("modal__edit-task")) {
                queryMethod = "PUT";
            }
            const validationRes = validateForm(form, queryMethod);

            validationRes == true ? removeActiveClass() : "";
        });
    }
}

const showModal = (modalClassName, data = null) => {
    const modal = findElementByClassName(modalClassName);
    const form = modal.querySelector(".modal__form");
    form.reset();

    if (modal == null) {
        console.log("MODAL NOT FOUND");
        return null;
    }

    const bg = modal.querySelector(".modal__bg");
    const card = modal.querySelector(".modal__inner");

    if (data != null) {
        taskData = data;

        const taskHeader = form.querySelector(".modal__form-input");
        const taskDescription = form.querySelector(".modal__form-text");

        taskHeader.setAttribute("value", data["task-header"]);
        taskDescription.innerText = data["task-description"];
    }

    bg.classList.add("modal__bg_shown");
    card.classList.add("modal__inner_shown");
}

addTaskButton.addEventListener("click", () => {
    showModal("modal__add-task");
});

closeModalListeners();

export { showModal, deleteTask, putCheckbox };