"use strict";

import VendorChrome from "../../helpers/vendor_strategies/VendorChrome";

const backendUrl = "http://localhost:3000";

let vendor = new VendorChrome(chrome);

vendor.setBackendPath(backendUrl);
vendor.registerReceiveMessages();
