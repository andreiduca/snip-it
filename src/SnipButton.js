"use strict";

let snipButtonId = "snipItButton";
let snipButtonText = "Snip It!";

class SnipButton
{
    create() {
        let btn = this.get();

        if (!btn) {
            // create element
            btn = document.createElement("button");
            btn.id = snipButtonId;
            btn.appendChild(document.createTextNode(snipButtonText));

            // style element
            btn.style.border = "solid darkblue 1px";
            btn.style.backgroundColor = "lightgoldenrodyellow";
            btn.style.position = "absolute";

            // attach behaviour
            btn.onclick = this.onButtonClick;

            // add to document body
            document.body.appendChild(btn);
        }

        return btn;
    }

    get() {
        return document.getElementById(snipButtonId);
    }

    setPosition(position) {
        let btn = this.create();

        btn.style.top = position.top + "px";
        btn.style.left = position.left + "px";
    }

    destroy() {
        let btn = this.get();

        if (btn) {
            btn.parentNode.removeChild(btn);
        }
    }

    onButtonClick() {
        // this should be overwritten with custom behaviour
    }
}

export default new SnipButton();