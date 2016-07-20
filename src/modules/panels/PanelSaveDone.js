"use strict";

import HTMLElement from "../HTMLElement";
import AppConfig from "../../config/index";

const panelSaveDoneId = "snipItPanelSaveDone";

class PanelSaveDone extends HTMLElement
{
    constructor() {
        super("div", panelSaveDoneId, false, true);
    }

    create() {
        let panel = super.create();
        panel.className = "snipItPanel";
        return panel;
    }

    show() {
        let panel = super.show();
        this.draw(panel);
    }

    draw(panelElement) {
        let panel = panelElement || this.get();

        panel.innerHTML = this.HTMLPanel();
        this.initControls();
    }

    initControls() {
        let saveDoneClose = this._document.getElementById("snipItPanelSaveSubmitButton");
        if (saveDoneClose) {
            saveDoneClose.onclick = this.closePanel.bind(this);
        }
    }

    /**
     * @returns {string}
     */
    HTMLPanel() {
        return `
            <div>
                <h1>Snipped!</h1>
                <p>
                    You code has been saved.
                    View it on <a href="${AppConfig.application.baseURL}" target="_blank">${AppConfig.application.baseURL}</a>
                </p>
                <button type="button" id="snipItPanelSaveSubmitButton">close</button>
            </div>`;
    }

    closePanel() {
        // this should be overwritten
    }
}

export default new PanelSaveDone();