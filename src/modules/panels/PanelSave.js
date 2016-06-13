"use strict";

import HTMLElement from "../HTMLElement";

import HtmlEntities from "../../helpers/HtmlEntities";
import TagFinder from "../../helpers/TagFinder";

const panelSaveId = "snipItPanelSave";

class PanelSave extends HTMLElement
{
    constructor() {
        super("div", panelSaveId, false, true);
    }

    show(text = null) {
        let panel = super.show();

        let tags = TagFinder(this._document);

        if (tags.length) {
            tags = tags.map((item) => { return `<span class="snipItTag">${item}</span>`; }).join(' ');
        }

        panel.innerHTML =`
            <div>
                <form>
                    <div>
                        <label for="snipItTitle">Title:</label>
                        <input type="text" name="snipItTitle" id="snipItTitle" value="${this._document.title}" autocomplete="off" />
                    </div>`+
                    /*<div>
                        <label>URL:</label>
                        <a href="${this._document.location.href}" class="snipItPageUrl">${this._document.location.href}</a>
                    </div>*/
                    `<div>
                        <label class="snipItInlineLabel">Language:</label>
                        JavaScript
                        <small>(detected; <a href="#!">change</a>)</small>
                    </div>
                    <div>
                        <label class="snipItInlineLabel">Tags:</label>
                        ${tags}
                    </div>
                    <div>
                        <label for="snipItCodeBlock">Code:</label>
                        <textarea name="snipItCodeBlock" id="snipItCodeBlock" rows="10" wrap="off">${HtmlEntities(text)}</textarea>
                    </div>
                    <button>Save!</button>
                </form>
            </div>`;
    }
}

export default new PanelSave();