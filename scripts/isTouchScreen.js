"use strict"


const isTouchScreen = () => {
    let isTouchScreen = false;

    if ("maxTouchPoints" in navigator) {
        isTouchScreen = navigator.maxTouchPoints > 0;
    } else if ("msMaxTouchPoints" in navigator) {
        isTouchScreen = navigator.msMaxTouchPoints > 0;
    } else {
        let mQ = window.matchMedia && matchMedia("(pointer:coarse)");
        if (mQ && mQ.media === "(pointer:coarse)") isTouchScreen = mQ.matches;
    }

    return isTouchScreen;
}

export default isTouchScreen;