"use strict";

import SnipButton from "../modules/SnipButton";
import TempMarker from "../modules/TempMarker";

import PanelShade from "../modules/panels/PanelShade";
import PanelLogin from "../modules/panels/PanelLogin";
import PanelSave from "../modules/panels/PanelSave";

import XHR from "../helpers/XHR";

class SnipIt
{
    constructor() {
        // by default, no panels are displayed
        this.isPanelOpen = false;
        this.isUserLoggedIn = null;

        this.tempSelectedText = null;
    }

    getSelection() {
        return this._window.getSelection();
    }

    getSelectionText(selection) {
        return selection.toString().trim();
    }

    onMouseUp() {
        // if a panel is open, do nothing
        if (this.isPanelOpen) {
            return;
        }

        // get the selection and its text
        let selection = this.getSelection();
        let selectionText = this.getSelectionText(selection);

        if (selectionText.length > 0) {
            // insert a temporary marker
            let range = selection.getRangeAt(0).cloneRange();
            range.collapse(false);
            range.insertNode(TempMarker.create());

            // create a button at the marker position
            SnipButton.setPosition(TempMarker.getPosition());
            TempMarker.destroy();
        }
        else {
            SnipButton.destroy();
        }
    }

    init({window, document}) {
        this._window = window;
        this._document = document;

        SnipButton.init({window, document});
        TempMarker.init({window, document});

        PanelShade.init({window, document});
        PanelLogin.init({window, document});
        PanelSave.init({window, document});


        // attach behaviour on global mouseUp
        this._document.onmouseup = this.onMouseUp.bind(this);
        //if (!document.all) document.captureEvents(Event.MOUSEUP);

        // overwrite behaviour for button click callback
        SnipButton.onClick = this.onButtonClick.bind(this);

        // overwrite behaviour for shade click callback
        PanelShade.onClick = this.onHidePanels.bind(this);

        PanelLogin.loginWindowClose = this.onLoginAttempt.bind(this);

        // check if user is logged in or not
        if (this.isUserLoggedIn === null) {
            XHR.get({
                url: '/auth',
                onSuccess: (response) => {
                    this.isUserLoggedIn = response.auth || false;
                },
                onFail: () => {
                    this.isUserLoggedIn = false;
                }
            });
        }

        /*
        var pres = document.getElementsByTagName('pre');
        for (let i = 0, n = pres.length; i < n; i++) {
            var btn = document.createElement("button");
            btn.appendChild(document.createTextNode("Press me!"));
            pres[i].parentNode.insertBefore(btn, pres[i].nextSibling);
        }
        //*/
    }

    // things to do when the button is clicked
    onButtonClick() {
        // first, remove the clicked button
        SnipButton.destroy();

        // get the selection and its text
        let selection = this.getSelection();
        let selectionText = this.getSelectionText( selection );

        // temporary save the selected text
        if (selectionText) {
            this.tempSelectedText = selectionText;
        }
        // restore temporary saved selected text
        else if (this.tempSelectedText) {
            selectionText = this.tempSelectedText;
        }

        if (this.isUserLoggedIn) {
            if (selectionText) {
                // show a panel that will handle the selected text
                this.isPanelOpen = true;
                PanelShade.show();
                PanelSave.show(selectionText);

                // clear temporary selected text
                this.tempSelectedText = null
            }
        }
        else {
            this.isPanelOpen = true;
            PanelShade.show();
            PanelLogin.show();
        }
    }

    // hide plugin overlay & panels
    onHidePanels() {
        this.isPanelOpen = false;
        PanelSave.hide();
        PanelLogin.hide();
        PanelShade.hide();
    }

    onLoginAttempt() {
        XHR.get({
            url: '/auth',
            onSuccess: (response) => {
                this.isUserLoggedIn = response.auth || false;
                if (this.isUserLoggedIn) {
                    PanelLogin.destroy();
                }
                this.onButtonClick();
            },
            onFail: () => {
                this.isUserLoggedIn = false;
            }
        });
    }
}

export default new SnipIt();