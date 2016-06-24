"use strict";

import HTMLElement from "../HTMLElement";
import config from "../../config";

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
    }

    /**
     * @returns {string}
     */
    HTMLPanel() {
        return `
            <div>
                <h1>Login with</h1>
                <button type="button" id="snipItPanelLoginGoogle">Google</button>
            </div>`;
    }

    loginWithGoogle() {
        var loginWindow = this._window.open(config.api + '/auth/google');
        loginWindow.onunload = this.loginWindowClose;
    }

    loginWindowClose() {
        // this should be overwritten
    }
}

export default new PanelLogin();