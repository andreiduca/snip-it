"use strict";

import HTMLElement from "../HTMLElement";

const panelShadeId = "snipItPanelShade";

class PanelShade extends HTMLElement
{
    constructor() {
        super("div", panelShadeId, true, true);
    }
}

export default new PanelShade();