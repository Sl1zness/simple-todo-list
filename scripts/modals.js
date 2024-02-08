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

addTaskButton.addEventListener("click", () => {
    showModal("modal__add-task");
});

for (const elem of modalWindows) {
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
}

export default showModal;
