"use strict";

import SnipButton from "./SnipButton";
import TempMarker from "./TempMarker";

class SnipIt
{
    getText() {
        var selection = window.getSelection();
        var selectionText = selection.toString().trim();

        if (selectionText.length > 0) {

            let range = selection.getRangeAt(0).cloneRange();
            range.collapse(false);
            range.insertNode(TempMarker.create());

            SnipButton.setPosition(TempMarker.getPosition());
            TempMarker.destroy();

            // TODO: create a functional callback
            this.callback(selectionText);
        }
        else {
            SnipButton.destroy();
        }
    }

    init() {
        document.onmouseup = this.getText;
        //if (!document.all) document.captureEvents(Event.MOUSEUP);

        /*
        var pres = document.getElementsByTagName('pre');
        for (let i = 0, n = pres.length; i < n; i++) {
            var btn = document.createElement("button");
            btn.appendChild(document.createTextNode("Press me!"));
            pres[i].parentNode.insertBefore(btn, pres[i].nextSibling);
        }
        //*/
    }

    // mock callback which receives the selected text
    callback(t) {
        if (t.length > 0) {
            console.log(t.toString());
        }
    }
}

export default new SnipIt();