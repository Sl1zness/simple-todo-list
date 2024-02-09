"use strict"


const modalWindows = document.getElementsByClassName("modal");
const [addTaskButton] = document.getElementsByClassName("main__add-task-button");

const findItemByClassName = className => {
    for (const elem of modalWindows) {
        if (elem.classList.contains(className)) {
            return elem;
        }
    }

    return null;
}

const showModal = modalClassName => {
    const modal = findItemByClassName(modalClassName);

    if (modal != null) {
        const [popup] = modal.getElementsByClassName("modal__inner");
        const [bg] = modal.getElementsByClassName("modal__bg");

        popup.classList.add("modal__inner_shown");
        bg.classList.add("modal__bg_shown");
    } else {
        console.log("MODAL WINDOW NOT FOUND");
    }
}

const sendToTheServer = (activeElem, method) => {
    const form = activeElem.parentElement.parentElement;
    let formData = new FormData(form);
    let isValidated = true;
    const warning = form.querySelector(".header-warning");

    warning.classList.remove("header-warning_shown");
    warning.previousElementSibling.classList.remove("modal__form-input_outlined");

    for (const elem of formData) {
        if (elem[0] == "task-header") {
            if (elem[1].length <= 3) {
                isValidated = false;
                const warning = form.querySelector(".header-warning");

                warning.classList.add("header-warning_shown");
                warning.previousElementSibling.classList.add("modal__form-input_outlined");
            }
        }
    }

    if (isValidated) {
        fetch("http://127.0.0.1/", {
            method: method,
            body: formData
        })
        .then(res => console.log(res))
        .catch(err => console.log(err.message));
    }
}

addTaskButton.addEventListener("click", () => {
    showModal("modal__add-task");
});

for (const elem of modalWindows) {
    // TODO: form reset() method does not work for any reason
    const form = document.querySelector(".modal__form");

    const bg = elem.querySelector(".modal__bg");
    const popup = elem.querySelector(".modal__inner");
    const button = elem.querySelector('.modal__button[type="button"]');

    bg.addEventListener("click", () => {
        bg.classList.remove("modal__bg_shown");
        popup.classList.remove("modal__inner_shown");
    });

    button.addEventListener("click", () => {
        bg.classList.remove("modal__bg_shown");
        popup.classList.remove("modal__inner_shown");
    });

    if (elem.classList.contains("modal__add-task")) {
        const addButton = elem.querySelector('.modal__button[type="submit"]');

        addButton.addEventListener("click", e => {
            e.preventDefault();

            sendToTheServer(addButton, "POST");
        })
    }
}

export default showModal;
