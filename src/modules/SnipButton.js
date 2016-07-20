"use strict";

import HTMLElement from "./HTMLElement";

const snipButtonId = "snipItButton";
const snipButtonText = "<s/>";
const snipButtonTitle = "SnipIt!";

class SnipButton extends HTMLElement
{
    constructor() {
        super("button", snipButtonId, true, true);
    }

    create() {
        let btn = super.create();
        btn.innerText = snipButtonText;
        btn.title = snipButtonTitle;

        return btn;
    }

    setPosition(position) {
        let btn = this.create();

        btn.style.top = position.top + "px";
        btn.style.left = position.left + "px";
    }
}

export default new SnipButton();