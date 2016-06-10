(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SnipButton = require("../modules/SnipButton");

var _SnipButton2 = _interopRequireDefault(_SnipButton);

var _TempMarker = require("../modules/TempMarker");

var _TempMarker2 = _interopRequireDefault(_TempMarker);

var _PanelShade = require("../modules/panels/PanelShade");

var _PanelShade2 = _interopRequireDefault(_PanelShade);

var _PanelSave = require("../modules/panels/PanelSave");

var _PanelSave2 = _interopRequireDefault(_PanelSave);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SnipIt = function () {
    function SnipIt() {
        _classCallCheck(this, SnipIt);

        // by default, no panels are displayed
        this.isPanelOpen = false;
    }

    _createClass(SnipIt, [{
        key: "getSelection",
        value: function getSelection() {
            return window.getSelection();
        }
    }, {
        key: "getSelectionText",
        value: function getSelectionText(selection) {
            return selection.toString().trim();
        }
    }, {
        key: "onMouseUp",
        value: function onMouseUp() {
            // if a panel is open, do nothing
            if (this.isPanelOpen) {
                return;
            }

            // get the selection and its text
            var selection = this.getSelection();
            var selectionText = this.getSelectionText(selection);

            if (selectionText.length > 0) {
                // insert a temporary marker
                var range = selection.getRangeAt(0).cloneRange();
                range.collapse(false);
                range.insertNode(_TempMarker2.default.create());

                // create a button at the marker position
                _SnipButton2.default.setPosition(_TempMarker2.default.getPosition());
                _TempMarker2.default.destroy();
            } else {
                _SnipButton2.default.destroy();
            }
        }
    }, {
        key: "init",
        value: function init() {
            // attach behaviour on global mouseUp
            document.onmouseup = this.onMouseUp.bind(this);
            //if (!document.all) document.captureEvents(Event.MOUSEUP);

            // overwrite behaviour for button click callback
            _SnipButton2.default.onButtonClick = this.onButtonClick.bind(this);

            // overwrite behaviour for shade click callback
            _PanelShade2.default.onClick = this.onHidePanels.bind(this);

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

    }, {
        key: "onButtonClick",
        value: function onButtonClick() {
            // first, remove the clicked button
            _SnipButton2.default.destroy();

            // get the selection and its text
            var selection = this.getSelection();
            var selectionText = this.getSelectionText(selection);

            if (selectionText) {
                // show a panel that will handle the selected text
                this.isPanelOpen = true;
                _PanelShade2.default.show();
                _PanelSave2.default.show(selectionText);
            }
        }

        // hide plugin overlay & panels

    }, {
        key: "onHidePanels",
        value: function onHidePanels() {
            this.isPanelOpen = false;
            _PanelSave2.default.hide();
            _PanelShade2.default.hide();
        }
    }]);

    return SnipIt;
}();

exports.default = new SnipIt();

},{"../modules/SnipButton":3,"../modules/TempMarker":4,"../modules/panels/PanelSave":5,"../modules/panels/PanelShade":6}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (htmlText) {
    return String(htmlText).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var snipButtonId = "snipItButton";
var snipButtonText = "Snip It!";

var SnipButton = function () {
    function SnipButton() {
        _classCallCheck(this, SnipButton);
    }

    _createClass(SnipButton, [{
        key: "create",
        value: function create() {
            var btn = this.get();

            if (!btn) {
                // create element
                btn = document.createElement("button");
                btn.id = snipButtonId;
                btn.appendChild(document.createTextNode(snipButtonText));

                // attach behaviour
                btn.onclick = this.onButtonClick;

                // add to document body
                document.body.appendChild(btn);
            }

            return btn;
        }
    }, {
        key: "get",
        value: function get() {
            return document.getElementById(snipButtonId);
        }
    }, {
        key: "setPosition",
        value: function setPosition(position) {
            var btn = this.create();

            btn.style.top = position.top + "px";
            btn.style.left = position.left + "px";
        }
    }, {
        key: "destroy",
        value: function destroy() {
            var btn = this.get();

            if (btn) {
                btn.parentNode.removeChild(btn);
            }
        }
    }, {
        key: "onButtonClick",
        value: function onButtonClick() {
            // this should be overwritten with custom behaviour
        }
    }]);

    return SnipButton;
}();

exports.default = new SnipButton();

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tmpMarkerId = "snipItTemporaryMarker";

var TempMarker = function () {
    function TempMarker() {
        _classCallCheck(this, TempMarker);
    }

    _createClass(TempMarker, [{
        key: "create",
        value: function create() {
            var marker = this.get();

            if (!marker) {
                // create element
                marker = document.createElement("span");
                marker.id = tmpMarkerId;
                marker.appendChild(document.createTextNode("x"));
            }

            return marker;
        }
    }, {
        key: "get",
        value: function get() {
            return document.getElementById(tmpMarkerId);
        }
    }, {
        key: "getPosition",
        value: function getPosition() {
            var obj = this.get(),
                left = 0,
                top = 0;

            do {
                left += obj.offsetLeft;
                top += obj.offsetTop;
            } while (obj = obj.offsetParent);

            return {
                top: top,
                left: left
            };
        }
    }, {
        key: "destroy",
        value: function destroy() {
            var marker = this.get();

            if (marker) {
                marker.parentNode.removeChild(marker);
            }
        }
    }]);

    return TempMarker;
}();

exports.default = new TempMarker();

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _HtmlEntities = require("../../helpers/HtmlEntities");

var _HtmlEntities2 = _interopRequireDefault(_HtmlEntities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var panelSaveId = "snipItPanelSave";

var PanelSave = function () {
    function PanelSave() {
        _classCallCheck(this, PanelSave);
    }

    _createClass(PanelSave, [{
        key: "create",
        value: function create() {
            var panel = this.get();

            if (!panel) {
                // create element
                panel = document.createElement("div");
                panel.id = panelSaveId;

                // add to document body
                document.body.appendChild(panel);
            }

            return panel;
        }
    }, {
        key: "get",
        value: function get() {
            return document.getElementById(panelSaveId);
        }
    }, {
        key: "show",
        value: function show() {
            var text = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            var panel = this.create();

            panel.style.display = 'block';
            panel.innerHTML = "<div>\n      <div><strong>Title:</strong> " + document.title + "</div>\n      <div><strong>URL:</strong> " + document.location.href + "</div>\n      <div><strong>Code:</strong></div>\n      <pre>" + (0, _HtmlEntities2.default)(text) + "</pre>\n      <button>Save!</button>\n</div>";
        }
    }, {
        key: "hide",
        value: function hide() {
            var panel = this.get();

            if (panel) {
                panel.style.display = 'none';
            }
        }
    }]);

    return PanelSave;
}();

exports.default = new PanelSave();

},{"../../helpers/HtmlEntities":2}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var panelShadeId = "snipItPanelShade";

var PanelShade = function () {
    function PanelShade() {
        _classCallCheck(this, PanelShade);
    }

    _createClass(PanelShade, [{
        key: "create",
        value: function create() {
            var shade = this.get();

            if (!shade) {
                shade = document.createElement("div");
                shade.id = panelShadeId;

                // attach click behaviour
                shade.onclick = this.onClick;

                // add to document body
                document.body.appendChild(shade);
            }

            return shade;
        }
    }, {
        key: "get",
        value: function get() {
            return document.getElementById(panelShadeId);
        }
    }, {
        key: "show",
        value: function show() {
            var shade = this.create();

            shade.style.display = 'block';
        }
    }, {
        key: "hide",
        value: function hide() {
            var shade = this.get();

            if (shade) {
                shade.style.display = 'none';
            }
        }
    }, {
        key: "onClick",
        value: function onClick() {
            // this should be overwritten with custom behaviour
        }
    }]);

    return PanelShade;
}();

exports.default = new PanelShade();

},{}],7:[function(require,module,exports){
"use strict";

var _SnipIt = require("./app/SnipIt");

var _SnipIt2 = _interopRequireDefault(_SnipIt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_SnipIt2.default.init();

},{"./app/SnipIt":1}]},{},[7]);
