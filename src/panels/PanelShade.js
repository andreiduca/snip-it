"use strict";

const panelShadeId = "snipItPanelShade";

class PanelShade
{
    create() {
        let shade = this.get();

        if (!shade) {
            shade = document.createElement("div");
            shade.id = panelShadeId;

            shade.style.display = 'none';
            shade.style.position = 'fixed';
            shade.style.zIndex = '99998';
            shade.style.top = '0';
            shade.style.left = '0';
            shade.style.width = '100%';
            shade.style.height = '100%';

            shade.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            shade.style.webkitBackdropFilter = 'saturate(180%) blur(20px)';
            shade.style.backdropFilter = 'saturate(180%) blur(20px)';

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
}

export default new PanelShade();