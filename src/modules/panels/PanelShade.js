"use strict";

const panelShadeId = "snipItPanelShade";

class PanelShade
{
    create() {
        let shade = this.get();

        if (!shade) {
            shade = document.createElement("div");
            shade.id = panelShadeId;

            // attach click behaviour
            shade.onclick = this.onClick;

            // add to document body
            document.body.appendChild(shade);
        }

        return shade;
    }

    get() {
        return document.getElementById(panelShadeId);
    }

    show() {
        let shade = this.create();

        shade.style.display = 'block';
    }

    hide() {
        let shade = this.get();

        if (shade) {
            shade.style.display = 'none';
        }
    }

    onClick() {
        // this should be overwritten with custom behaviour
    }
}

export default new PanelShade();