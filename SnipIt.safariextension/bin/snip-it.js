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
                btn = document.createElement("span");
                btn.id = snipButtonId;
                btn.appendChild(document.createTextNode(snipButtonText));
                // style element
                btn.style.border = "solid darkblue 1px";
                btn.style.backgroundColor = "lightgoldenrodyellow";
                btn.style.position = "absolute";
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SnipIt = function () {
    function SnipIt() {
        _classCallCheck(this, SnipIt);
    }

    _createClass(SnipIt, [{
        key: "getText",
        value: function getText() {
            var selection = window.getSelection();
            var selectionText = selection.toString().trim();

            if (selectionText.length > 0) {

                var range = selection.getRangeAt(0).cloneRange();
                range.collapse(false);
                range.insertNode(_TempMarker2.default.create());

                _SnipButton2.default.setPosition(_TempMarker2.default.getPosition());
                _TempMarker2.default.destroy();

                // TODO: create a functional callback
                this.callback(selectionText);
            } else {
                _SnipButton2.default.destroy();
            }
        }
    }, {
        key: "init",
        value: function init() {
            document.onmouseup = this.getText;
            //if (!document.all) document.captureEvents(Event.MOUSEUP);

            /*
            var pres = document.getElementsByTagName('pre');
            for (let i = 0, n = pres.length; i < n; i++) {
                var btn = document.createElement("button");
                btn.appendChild(document.createTextNode("Press me!"));
                pres[i].parentNode.insertBefore(btn, pres[i].nextSibling);
            }
            //*/
        }

        // mock callback which receives the selected text

    }, {
        key: "callback",
        value: function callback(t) {
            if (t.length > 0) {
                console.log(t.toString());
            }
        }
    }]);

    return SnipIt;
}();

exports.default = new SnipIt();

},{"./SnipButton":2,"./TempMarker":4}],4:[function(require,module,exports){
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

},{}]},{},[1]);
