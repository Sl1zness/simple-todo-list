"use strict"


const sortingMenu = document.querySelector(".header__filters");

// TODO: refactor a bit
sortingMenu.addEventListener("change", () => {
    const tasksList = document.querySelector(".main__tasks-list");

    switch (sortingMenu.options[sortingMenu.selectedIndex].value) {
        case "All":
            for (const elem of tasksList.children) {
                elem.classList.remove("element-hidden");
            }
            break;
        case "Complete":
            for (const elem of tasksList.children) {
                if (elem.querySelector(".main__task-checkbox").getAttribute("checked") == "") {
                    tasksList.prepend(tasksList.removeChild(elem));
                    elem.classList.remove("element-hidden");
                } else {
                    elem.classList.add("element-hidden");
                }
            }
            break;
        case "Incomplete":
            for (const elem of tasksList.children) {
                if (elem.querySelector(".main__task-checkbox").getAttribute("checked") != "") {
                    tasksList.prepend(tasksList.removeChild(elem));
                    elem.classList.remove("element-hidden");
                } else {
                    elem.classList.add("element-hidden");
                }
            }
            break;
        default:
            console.log("ERR");
    }
});
