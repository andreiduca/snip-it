"use strict";

import SnipButton from "../modules/SnipButton";
import TempMarker from "../modules/TempMarker";

import PanelShade from "../modules/panels/PanelShade";
import PanelLogin from "../modules/panels/PanelLogin";
import PanelSave from "../modules/panels/PanelSave";
import PanelSaveDone from "../modules/panels/PanelSaveDone";

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
        PanelSaveDone.init({window, document});


        // attach behaviour on global mouseUp
        this._document.onmouseup = this.onMouseUp.bind(this);

        // overwrite behaviour for button click callback
        SnipButton.onClick = this.authShowPanels.bind(this);

        // overwrite behaviour for shade click callback
        PanelShade.onClick = this.hidePanels.bind(this);

        // bind behaviour of components to methods defined here
        PanelLogin.loginWindowClose = this.authShowPanels.bind(this);
        PanelSave.onSaveSuccess = this.saveSuccess.bind(this);
        PanelSave.onUnauthorized = this.authShowPanels.bind(this);
        PanelSaveDone.closePanel = this.hidePanels.bind(this);
    }

    // things to do when the button is clicked
    displayPanels() {
        // first, remove the clicked button
        SnipButton.destroy();

        this.hidePanels();

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
    hidePanels() {
        this.isPanelOpen = false;
        PanelSave.hide();
        PanelSaveDone.hide();
        PanelLogin.hide();
        PanelShade.hide();
    }

    authShowPanels() {
        XHR.get({
            url: '/auth',
            onSuccess: (response) => {
                this.isUserLoggedIn = response.auth || false;
                this.displayPanels();
            },
            onFail: () => {
                this.isUserLoggedIn = false;
                this.displayPanels();
            }
        });
    }

    saveSuccess() {
        this.hidePanels();
        PanelShade.show();
        PanelSaveDone.show();
    }
}

export default new SnipIt();