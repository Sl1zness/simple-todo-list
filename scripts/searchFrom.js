"use strict";


const [loader] = document.getElementsByClassName("loader");


// TODO: fix instant class remove 
fetch("http://127.0.0.1:3000/", {
    method: "GET"
})
.then(data => data.json())
.then(data => console.log(data))
.catch(err => console.log(err.message))
.finally(loader.classList.remove("loader_animated"));