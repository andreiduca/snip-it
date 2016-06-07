"use strict";

const tmpMarkerId = "snipItTemporaryMarker";

class TempMarker
{
    create() {
        let marker = this.get();

        if (!marker) {
            // create element
            marker = document.createElement("span");
            marker.id = tmpMarkerId;
            marker.appendChild(document.createTextNode("x"));
        }

        return marker;
    }

    get() {
        return document.getElementById(tmpMarkerId);
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

    destroy() {
        let marker = this.get();

        if (marker) {
            marker.parentNode.removeChild(marker);
        }
    }
}

export default new TempMarker();