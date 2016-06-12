"use strict";

import HTMLElement from "./HTMLElement";

const tmpMarkerId = "snipItTemporaryMarker";
const tmpMarkerText = "x";

class TempMarker extends HTMLElement
{
    constructor() {
        super("span", tmpMarkerId, false, false);
    }

    create() {
        let marker = super.create();
        marker.appendChild(this._document.createTextNode(tmpMarkerText));

        return marker;
    }

    getPosition() {
        let obj = this.get(),
            left = 0,
            top = 0;

        do {
            left += obj.offsetLeft;
            top += obj.offsetTop;
        } while (obj = obj.offsetParent);

        return {
            top: top,
            left: left
        };
    }
}

export default new TempMarker();