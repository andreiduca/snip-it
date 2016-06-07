(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _SnipIt = require("../../src/SnipIt");

var _SnipIt2 = _interopRequireDefault(_SnipIt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_SnipIt2.default.init();

},{"../../src/SnipIt":3}],2:[function(require,module,exports){
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

                // style element
                btn.style.border = "solid darkblue 1px";
                btn.style.backgroundColor = "lightgoldenrodyellow";
                btn.style.position = "absolute";

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

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SnipButton = require("./SnipButton");

var _SnipButton2 = _interopRequireDefault(_SnipButton);

var _TempMarker = require("./TempMarker");

var _TempMarker2 = _interopRequireDefault(_TempMarker);

var _PanelSave = require("./panel-save/PanelSave");

var _PanelSave2 = _interopRequireDefault(_PanelSave);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SnipIt = function () {
    function SnipIt() {
        _classCallCheck(this, SnipIt);
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
            var selection = this.getSelection();
            var selectionText = this.getSelectionText(selection);

            if (selectionText.length > 0) {

                var range = selection.getRangeAt(0).cloneRange();
                range.collapse(false);
                range.insertNode(_TempMarker2.default.create());

                _SnipButton2.default.setPosition(_TempMarker2.default.getPosition());
                _TempMarker2.default.destroy();
            } else {
                _SnipButton2.default.destroy();
                _PanelSave2.default.hide();
            }
        }
    }, {
        key: "init",
        value: function init() {
            var _this = this;

            document.onmouseup = function () {
                _this.onMouseUp();
            };
            //if (!document.all) document.captureEvents(Event.MOUSEUP);

            // overwrite behaviour for button click callback
            _SnipButton2.default.onButtonClick = function () {
                _this.onButtonClick();
            };

            /*
            var pres = document.getElementsByTagName('pre');
            for (let i = 0, n = pres.length; i < n; i++) {
                var btn = document.createElement("button");
                btn.appendChild(document.createTextNode("Press me!"));
                pres[i].parentNode.insertBefore(btn, pres[i].nextSibling);
            }
            //*/
        }

        // callback action

    }, {
        key: "onButtonClick",
        value: function onButtonClick() {
            var selection = this.getSelection();
            var selectionText = this.getSelectionText(selection);

            // TODO: do something useful with the selected text
            _PanelSave2.default.create();
            _PanelSave2.default.show(selectionText);
        }
    }]);

    return SnipIt;
}();

exports.default = new SnipIt();

},{"./SnipButton":2,"./TempMarker":4,"./panel-save/PanelSave":5}],4:[function(require,module,exports){
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

                // TODO: move the styles in a separate .css file and use a class
                panel.style.position = 'fixed';
                panel.style.zIndex = 99999;
                panel.style.top = "50%";
                panel.style.left = "50%";
                panel.style.transform = "translate(-50%, -50%)";
                panel.style.display = 'none';
                panel.style.padding = "20px";
                panel.style.backgroundColor = "#fff";
                panel.style.boxShadow = "0 2px 3px rgba(0,0,0,0.3)";
                panel.style.color = "#333";
                panel.style.fontSize = "16px";

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

            var panel = this.get();

            if (text) {
                panel.style.display = 'block';
                panel.innerText = text;
            }
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

},{}]},{},[1]);
