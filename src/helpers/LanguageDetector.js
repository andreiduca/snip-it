"use strict";

import Languages from "./Languages";

class LanguageDetector
{
    constructor() {
        this.detectedLanguage = null;
    }

    init(tags) {
        if (tags.length) {
            for (let i = 0, n = tags.length; i < n; i++) {
                if (Languages.indexOf(tags[i]) > -1) {
                    this.detectedLanguage = tags[i].toLowerCase();
                    break;
                }
            }
        }
    }

    languages() {
        return Languages;
    }

    getLanguage() {
        return this.detectedLanguage;
    }
}

export default new LanguageDetector();