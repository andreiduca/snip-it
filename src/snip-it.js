/*jslint es6 */
"use strict";

import SnipIt from "./app/SnipIt";

if (window.location.origin.indexOf('snipit.xyz') == -1) {
    SnipIt.init({window, document});
}