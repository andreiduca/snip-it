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

            // add to document body
            document.body.appendChild(panel);
        }

        return panel;
    }

    get() {
        return document.getElementById(panelSaveId);
    }

    show(text = null) {
        let panel = this.create();

        panel.style.display = 'block';
        panel.innerHTML = `<pre>${text}</pre>`;
    }

    hide() {
        let panel = this.get();

        if (panel) {
            panel.style.display = 'none';
        }
    }
}

export default new PanelSave();