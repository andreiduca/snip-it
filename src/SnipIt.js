"use strict";

import SnipButton from "./SnipButton";
import TempMarker from "./TempMarker";

class SnipIt
{
    getSelection() {
        return window.getSelection();
    }

    getSelectionText(selection) {
        return selection.toString().trim();
    }

    onMouseUp() {
        let selection = this.getSelection();
        let selectionText = this.getSelectionText(selection);

        if (selectionText.length > 0) {

            let range = selection.getRangeAt(0).cloneRange();
            range.collapse(false);
            range.insertNode(TempMarker.create());

            SnipButton.setPosition(TempMarker.getPosition());
            TempMarker.destroy();
        }
        else {
            SnipButton.destroy();
        }
    }

    init() {
        document.onmouseup = () => {
            this.onMouseUp();
        };
        //if (!document.all) document.captureEvents(Event.MOUSEUP);

        // overwrite behaviour for button click callback
        SnipButton.onButtonClick = () => {
            this.onButtonClick();
        };

        /*
        var pres = document.getElementsByTagName('pre');
        for (let i = 0, n = pres.length; i < n; i++) {
            var btn = document.createElement("button");
            btn.appendChild(document.createTextNode("Press me!"));
            pres[i].parentNode.insertBefore(btn, pres[i].nextSibling);
        }
        //*/
    }

    // callback action
    onButtonClick() {
        let selection = this.getSelection();
        let selectionText = this.getSelectionText( selection );

        // TODO: do something useful with the selected text
        console.log(selectionText);
    }
}

export default new SnipIt();