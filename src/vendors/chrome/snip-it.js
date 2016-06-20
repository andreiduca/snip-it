/*jslint es6 */
"use strict";

import SnipIt from "../../app/SnipIt";
import VendorChrome from "../../helpers/vendor_strategies/VendorChrome";

let vendor = new VendorChrome(chrome);
vendor.registerReceiveMessages();

SnipIt.init({window, document, vendor: vendor});