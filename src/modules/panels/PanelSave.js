"use strict";

import HtmlEntities from "../../helpers/HtmlEntities";

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
        panel.innerHTML =
`<div>
      <div><strong>Title:</strong> ${document.title}</div>
      <div><strong>URL:</strong> ${document.location.href}</div>
      <div><strong>Code:</strong></div>
      <pre>${HtmlEntities(text)}</pre>
      <button>Save!</button>
</div>`;
    }

    hide() {
        let panel = this.get();

        if (panel) {
            panel.style.display = 'none';
        }
    }
}

export default new PanelSave();