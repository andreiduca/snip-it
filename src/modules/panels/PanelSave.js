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
            selectedCategory: null,
            selectedLanguage: null,
            detectedLanguage: null
        };

        this.userCategories = [];
        this.waitingXHR = false;
    }

    create() {
        let panel = super.create();
        panel.className = "snipItPanel";
        return panel;
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

        if (!this.waitingXHR) {
            let submitButton = this._document.getElementById("snipItPanelSaveSubmitButton");
            if (submitButton) {
                submitButton.onclick = this.submitPanelSave.bind(this);
            }
        }

        let title = this._document.getElementById("snipItPanelSaveTitle");
        if (title) {
            title.onkeyup = title.onblur = () => {
                this.properties.title = title.value;
            };
        }

        let categories = this._document.getElementById("snipItPanelSaveSelectCategory");
        if (categories) {
            categories.onchange = () => {
                this.properties.selectedCategory = categories.value;
            };
        }

        let languages = this._document.getElementById("snipItPanelSaveSelectLanguage");
        if (languages) {
            languages.onchange = () => {
                this.properties.selectedLanguage = languages.value;
            };
        }

        let tagInput = this._document.getElementById("snipItPanelSaveTagsInput");
        if (tagInput) {
            tagInput.onkeydown = (event) => {
                if ([',', ';', 'Enter'].indexOf(event.key) != -1) {
                    event.preventDefault();
                    event.stopPropagation();

                    if (this.properties.tags.indexOf(tagInput.value.toLowerCase()) == -1) {
                        this.properties.tags.push(tagInput.value);
                        this.draw();
                        this._document.getElementById("snipItPanelSaveTagsInput").focus();
                    }
                }
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
                        <label class="snipItInlineLabel" for="snipItPanelSaveSelectCategory">Category:</label>
                        ${ this.HTMLCategorySelect() }
                    </div>
                    <div>
                        <label class="snipItInlineLabel" for="snipItPanelSaveSelectLanguage">Syntax:</label>
                        ${ this.properties.detectedLanguage ? this.HTMLLanguageSuggest() : this.HTMLLanguageSelect() }
                    </div>
                    <div>
                        <label class="snipItInlineLabel">Tags:</label>
                        ${ this.properties.tags.map((item, index) => {
                                return `<span class="snipItTag" id="snipItPanelSaveTag_${index}" title="Remove this tag">${item}</span>`;
                            }).join(' ') }
                        ${ this.HTMLTagsInput() }
                    </div>
                    <div>
                        <label for="snipItPanelSaveCodeBlock">Code:</label>
                        <textarea name="snipItCodeBlock" id="snipItPanelSaveCodeBlock" rows="10" wrap="off">${HtmlEntities(this.properties.text)}</textarea>
                    </div>
                    ${ this.HTMLButton() }
                </form>
            </div>`;
    }

    /**
     * @returns {string}
     */
    HTMLLanguageSuggest() {
        return `<span class="snipItTagValue">${this.properties.detectedLanguage}</span>
                <small>(detected; <a href="#!" id="snipItPanelSaveShowSelectLanguage">change</a>)</small>`;
    }

    /**
     * @returns {string}
     */
    HTMLCategorySelect() {
        return `<select id="snipItPanelSaveSelectCategory">
                    ${ this.userCategories.map( (item) => {
                        return `<option value="${item.id}">${item.name}</option>`;
                    }) }
                </select>`;
    }

    /**
     * @returns {string}
     */
    HTMLLanguageSelect() {
        return `<select id="snipItPanelSaveSelectLanguage">
                    <option value="">- plain text -</option>
                    ${ LanguageDetector.languages().map( (item) => {
                        let isSelected = '';
                        if (this.properties.selectedLanguage == item) {
                            isSelected = `selected="selected"`;
                        }
                        return `<option value="${item}" ${isSelected}>${item}</option>`;
                    }) }
                </select>`;
    }

    HTMLTagsInput() {
        return `<input type="text" id="snipItPanelSaveTagsInput" class="tagsInput" />`;
    }

    HTMLButton() {
        return `<button type="button" id="snipItPanelSaveSubmitButton">
                    ${ !this.waitingXHR ? "Save" :
                        `<div class="snipit-spinner">
                          <div class="rect1"></div>
                          <div class="rect2"></div>
                          <div class="rect3"></div>
                          <div class="rect4"></div>
                          <div class="rect5"></div>
                        </div>` }
                </button>`;
    }

    showSelectLanguage() {
        this.properties.selectedLanguage = this.properties.detectedLanguage;
        this.properties.detectedLanguage = null;
        this.draw();
        return false;
    }

    getUserCategories() {
        XHR.get({
            url: '/categories/all',
            onSuccess: (response) => {
                this.userCategories = response.categories || [];
                this.draw();
            }
        });
    }

    submitPanelSave() {
        let objectToSend = {
            url: this.properties.url,
            title: this.properties.title,
            category_id: this.properties.selectedCategory || null,
            language: this.properties.selectedLanguage || this.properties.detectedLanguage,
            tags: this.properties.tags,
            code: this.properties.text
        };

        this.waitingXHR = true;
        this.draw();

        XHR.post({
            url: '/snippets/save',
            data: objectToSend,
            onSuccess: (response) => {
                this.waitingXHR = false;
                this.draw();
                this.onSaveSuccess(response);
            },
            onFail: () => {
                this.waitingXHR = false;
                this.draw();
                this.onUnauthorized();
            }
        });
    }

    onSaveSuccess(response) {
        // console.log("YAY, ajax done!", response);
    }

    onUnauthorized() {
        // console.log("bad happened :(");
    }
}

export default new PanelSave();