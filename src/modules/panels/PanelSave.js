"use strict";

import HTMLElement from "../HTMLElement";

import HtmlEntities from "../../helpers/HtmlEntities";
import TagFinder from "../../helpers/TagFinder";
import LanguageDetector from "../../helpers/LanguageDetector";
import XHR from "../../helpers/XHR";

const panelSaveId = "snipItPanelSave";

class PanelSave extends HTMLElement
{
    constructor() {
        super("div", panelSaveId, false, true);

        this.properties = {
            title: null,
            url: null,
            text: null,
            tags: [],
            detectedLanguage: null
        };
    }

    show(text = null) {
        let panel = super.show();

        this.properties.title = this._document.title;
        this.properties.url = this._document.location.href;
        this.properties.text = text;

        let tags = TagFinder(this._document);
        let detectedLanguage = null;

        if (tags.length) {
            this.properties.tags = tags;

            LanguageDetector.init(tags);
            detectedLanguage = LanguageDetector.getLanguage();
            this.properties.detectedLanguage = detectedLanguage;
        }

        this.draw(panel);
    }

    draw(panelElement) {
        let panel = panelElement || this.get();

        panel.innerHTML = this.HTMLPanel();
        this.initControls();
    }

    initControls() {
        let showSelectLanguage = this._document.getElementById("snipItPanelSaveShowSelectLanguage");
        if (showSelectLanguage) {
            showSelectLanguage.onclick = this.showSelectLanguage.bind(this);
        }

        let tags = this._document.querySelectorAll("[id^=snipItPanelSaveTag_]");
        if (tags.length) {
            for (let i = 0, n = tags.length; i < n; i++) {
                tags[i].onclick = () => {
                    this.properties.tags.splice(i, 1);
                    this.draw();
                };
            }
        }

        let submitButton = this._document.getElementById("snipItPanelSaveSubmitButton");
        if (submitButton) {
            submitButton.onclick = this.submitPanelSave.bind(this);
        }

        let title = this._document.getElementById("snipItPanelSaveTitle");
        if (title) {
            title.onkeyup = title.onblur = () => {
                this.properties.title = title.value;
            };
        }

        let languages = this._document.getElementById("snipItPanelSaveSelectLanguage");
        if (languages) {
            languages.onchange = () => {
                this.properties.selectedLanguage = languages.value;
            };
        }

        let codeBlock = this._document.getElementById("snipItPanelSaveCodeBlock");
        if (codeBlock) {
            codeBlock.onkeyup = codeBlock.onblur = () => {
                this.properties.text = codeBlock.value;
            };
        }
    }

    /**
     * @returns {string}
     */
    HTMLPanel() {
        return `
            <div>
                <form>
                    <div>
                        <label for="snipItPanelSaveTitle">Title:</label>
                        <input type="text" name="snipItTitle" id="snipItPanelSaveTitle" value="${this.properties.title}" autocomplete="off" />
                    </div>
                    <div>
                        <label class="snipItInlineLabel" for="snipItPanelSaveSelectLanguage">Language:</label>
                        ${ this.properties.detectedLanguage ? this.HTMLLanguageSuggest() : this.HTMLLanguageSelect() }
                    </div>
                    <div>
                        <label class="snipItInlineLabel">Tags:</label>
                        ${ this.properties.tags.map((item, index) => {
                                return `<span class="snipItTag" id="snipItPanelSaveTag_${index}" title="Remove this tag">${item}</span>`;
                            }).join(' ') }
                    </div>
                    <div>
                        <label for="snipItPanelSaveCodeBlock">Code:</label>
                        <textarea name="snipItCodeBlock" id="snipItPanelSaveCodeBlock" rows="10" wrap="off">${HtmlEntities(this.properties.text)}</textarea>
                    </div>
                    <button type="button" id="snipItPanelSaveSubmitButton">Save!</button>
                </form>
            </div>`;
    }

    /**
     * @returns {string}
     */
    HTMLLanguageSuggest() {
        return `<span class="snipItTag">${this.properties.detectedLanguage}</span>
                <small>(detected; <a href="#!" id="snipItPanelSaveShowSelectLanguage">change</a>)</small>`;
    }

    /**
     * @returns {string}
     */
    HTMLLanguageSelect() {
        return `<select id="snipItPanelSaveSelectLanguage">
                    ${ LanguageDetector.languages().map( (item) => {
                        let isSelected = null;
                        if (this.properties.selectedLanguage == item) {
                            isSelected = `selected="selected"`;
                        }
                        return `<option value="${item}" ${isSelected}>${item}</option>`;
                    }) }
                </select>`;
    }

    showSelectLanguage() {
        this.properties.selectedLanguage = this.properties.detectedLanguage;
        this.properties.detectedLanguage = null;
        this.draw();
        return false;
    }

    submitPanelSave() {
        let objectToSend = {
            url: this.properties.url,
            title: this.properties.title,
            language: this.properties.selectedLanguage || this.properties.detectedLanguage,
            tags: this.properties.tags,
            code: this.properties.text
        };

        XHR.post({
            url: '/save',
            data: objectToSend,
            onSuccess: (response) => {
                console.log("YAY, ajax done!", response);
            }
        });
    }
}

export default new PanelSave();