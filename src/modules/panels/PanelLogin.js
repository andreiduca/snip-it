"use strict";

import HTMLElement from "../HTMLElement";
import AppConfig from "../../config";

const panelLoginId = "snipItPanelLogin";

class PanelLogin extends HTMLElement
{
    constructor() {
        super("div", panelLoginId, false, true);
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
        let loginGoogleButton = this._document.getElementById("snipItPanelLoginGoogle");
        if (loginGoogleButton) {
            loginGoogleButton.onclick = this.loginWithGoogle.bind(this);
        }

        let loginGithubButton = this._document.getElementById("snipItPanelLoginGithub");
        if (loginGithubButton) {
            loginGithubButton.onclick = this.loginWithGithub.bind(this);
        }
    }

    /**
     * @returns {string}
     */
    HTMLPanel() {
        return `
            <div>
                <h1>Login with</h1>
                <button type="button" id="snipItPanelLoginGoogle">Google</button>
                <button type="button" id="snipItPanelLoginGithub">Github</button>
            </div>`;
    }

    loginWithGoogle() {
        var loginWindow = this._window.open(AppConfig.application.baseURL + '/auth/google/selfclose');
        loginWindow.onunload = this.loginWindowClose;
    }

    loginWithGithub() {
        var loginWindow = this._window.open(AppConfig.application.baseURL + '/auth/github/selfclose');
        loginWindow.onunload = this.loginWindowClose;
    }

    loginWindowClose() {
        // this should be overwritten
    }
}

export default new PanelLogin();