"use strict";

import HTMLElement from "../HTMLElement";

import HtmlEntities from "../../helpers/HtmlEntities";

const panelSaveId = "snipItPanelSave";

class PanelSave extends HTMLElement
{
    constructor() {
        super("div", panelSaveId, false, true);
    }

    show(text = null) {
        let panel = super.show();

        panel.innerHTML =`
            <div>
                <form>
                    <div>
                        <label for="snipItTitle">Title:</label>
                        <input type="text" name="snipItTitle" id="snipItTitle" value="${this._document.title}" autocomplete="off" />
                    </div>
                    <div>
                        <strong>URL:</strong>
                        ${this._document.location.href}
                    </div>
                    <div><strong>Code:</strong></div>
                    <pre>${HtmlEntities(text)}</pre>
                    <button>Save!</button>
                </form>
            </div>`;
    }
}

export default new PanelSave();