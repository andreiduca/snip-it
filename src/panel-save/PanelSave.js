"use strict";

const panelSaveId = "snipItPanelSave";

class PanelSave
{

    create() {
        let panel = this.get();

        if (!panel) {
            // create element
            panel = document.createElement("div");
            panel.id = panelSaveId;

            // TODO: move the styles in a separate .css file and use a class
            panel.style.position = 'fixed';
            panel.style.zIndex = 99999;
            panel.style.top = "50%";
            panel.style.left = "50%";
            panel.style.transform = "translate(-50%, -50%)";
            panel.style.display = 'none';
            panel.style.padding = "20px";
            panel.style.backgroundColor = "#fff";
            panel.style.boxShadow = "0 2px 3px rgba(0,0,0,0.3)";
            panel.style.color = "#333";
            panel.style.fontSize = "16px";

            // add to document body
            document.body.appendChild(panel);
        }

        return panel;
    }

    get() {
        return document.getElementById(panelSaveId);
    }

    show(text = null) {
        let panel = this.get();


        if (text) {
            panel.style.display = 'block';
            panel.innerText = text;
        }
    }

    hide() {
        let panel = this.get();

        if (panel) {
            panel.style.display = 'none';
        }
    }
}

export default new PanelSave();