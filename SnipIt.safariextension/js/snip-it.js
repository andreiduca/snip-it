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
            return this._window.getSelection();
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
        value: function init(window, document) {
            this._window = window;
            this._document = document;

            _SnipButton2.default.init(window, document);
            _TempMarker2.default.init(window, document);

            _PanelShade2.default.init(window, document);
            _PanelSave2.default.init(window, document);

            // attach behaviour on global mouseUp
            this._document.onmouseup = this.onMouseUp.bind(this);
            //if (!document.all) document.captureEvents(Event.MOUSEUP);

            // overwrite behaviour for button click callback
            _SnipButton2.default.onClick = this.onButtonClick.bind(this);

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

},{"../modules/SnipButton":4,"../modules/TempMarker":5,"../modules/panels/PanelSave":6,"../modules/panels/PanelShade":7}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (htmlText) {
    return String(htmlText).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HTMLElement = function () {
    function HTMLElement(elementType, elementId) {
        var clickCallback = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
        var attachToDocumentBody = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

        _classCallCheck(this, HTMLElement);

        // object properties
        this._elementType = elementType;
        this._elementId = elementId;
        this._clickCallback = clickCallback;
        this._attachToDocumentBody = attachToDocumentBody;
    }

    _createClass(HTMLElement, [{
        key: 'init',
        value: function init(window, document) {
            // injected dependencies
            this._window = window;
            this._document = document;
        }
    }, {
        key: 'create',
        value: function create() {
            var element = this.get();

            if (!element) {
                // create element
                element = this._document.createElement(this._elementType);
                element.id = this._elementId;

                if (this._clickCallback) {
                    // attach behaviour
                    element.onclick = this.onClick;
                }

                if (this._attachToDocumentBody) {
                    // add to document body
                    this._document.body.appendChild(element);
                }
            }

            return element;
        }
    }, {
        key: 'get',
        value: function get() {
            return this._document.getElementById(this._elementId);
        }
    }, {
        key: 'show',
        value: function show() {
            var element = this.create();
            element.style.display = 'block';

            return element;
        }
    }, {
        key: 'hide',
        value: function hide() {
            var element = this.get();

            if (element) {
                element.style.display = 'none';
            }

            return element;
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            var element = this.get();

            if (element) {
                element.parentNode.removeChild(element);
            }
        }
    }, {
        key: 'onClick',
        value: function onClick() {
            // this should be overwritten with custom behaviour
        }
    }]);

    return HTMLElement;
}();

exports.default = HTMLElement;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _HTMLElement2 = require("./HTMLElement");

var _HTMLElement3 = _interopRequireDefault(_HTMLElement2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var snipButtonId = "snipItButton";
var snipButtonText = "Snip It!";

var SnipButton = function (_HTMLElement) {
    _inherits(SnipButton, _HTMLElement);

    function SnipButton() {
        _classCallCheck(this, SnipButton);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(SnipButton).call(this, "button", snipButtonId, true, true));
    }

    _createClass(SnipButton, [{
        key: "create",
        value: function create() {
            var btn = _get(Object.getPrototypeOf(SnipButton.prototype), "create", this).call(this);
            btn.innerText = snipButtonText;

            return btn;
        }
    }, {
        key: "setPosition",
        value: function setPosition(position) {
            var btn = this.create();

            btn.style.top = position.top + "px";
            btn.style.left = position.left + "px";
        }
    }]);

    return SnipButton;
}(_HTMLElement3.default);

exports.default = new SnipButton();

},{"./HTMLElement":3}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _HTMLElement2 = require("./HTMLElement");

var _HTMLElement3 = _interopRequireDefault(_HTMLElement2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var tmpMarkerId = "snipItTemporaryMarker";
var tmpMarkerText = "x";

var TempMarker = function (_HTMLElement) {
    _inherits(TempMarker, _HTMLElement);

    function TempMarker() {
        _classCallCheck(this, TempMarker);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TempMarker).call(this, "span", tmpMarkerId, false, false));
    }

    _createClass(TempMarker, [{
        key: "create",
        value: function create() {
            var marker = _get(Object.getPrototypeOf(TempMarker.prototype), "create", this).call(this);
            marker.appendChild(this._document.createTextNode(tmpMarkerText));

            return marker;
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
    }]);

    return TempMarker;
}(_HTMLElement3.default);

exports.default = new TempMarker();

},{"./HTMLElement":3}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _HTMLElement2 = require("../HTMLElement");

var _HTMLElement3 = _interopRequireDefault(_HTMLElement2);

var _HtmlEntities = require("../../helpers/HtmlEntities");

var _HtmlEntities2 = _interopRequireDefault(_HtmlEntities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var panelSaveId = "snipItPanelSave";

var PanelSave = function (_HTMLElement) {
    _inherits(PanelSave, _HTMLElement);

    function PanelSave() {
        _classCallCheck(this, PanelSave);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(PanelSave).call(this, "div", panelSaveId, false, true));
    }

    _createClass(PanelSave, [{
        key: "show",
        value: function show() {
            var text = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            var panel = _get(Object.getPrototypeOf(PanelSave.prototype), "show", this).call(this);

            panel.innerHTML = "\n            <div>\n                <form>\n                    <div>\n                        <label for=\"snipItTitle\">Title:</label>\n                        <input type=\"text\" name=\"snipItTitle\" id=\"snipItTitle\" value=\"" + this._document.title + "\" autocomplete=\"off\" />\n                    </div>" + (
            /*<div>
                <label>URL:</label>
                <a href="${this._document.location.href}" class="snipItPageUrl">${this._document.location.href}</a>
            </div>*/
            "<div>\n                        <label class=\"snipItInlineLabel\">Language:</label>\n                        JavaScript\n                        <small>(detected; <a href=\"#!\">change</a>)</small>\n                    </div>\n                    <div>\n                        <label class=\"snipItInlineLabel\">Tags:</label>\n                        <span class=\"snipItTag\">javascript</span>\n                        <span class=\"snipItTag\">React</span>\n                        <span class=\"snipItTag\">ES6</span>\n                    </div>\n                    <div>\n                        <label for=\"snipItCodeBlock\">Code:</label>\n                        <textarea name=\"snipItCodeBlock\" id=\"snipItCodeBlock\" rows=\"10\" wrap=\"off\">" + (0, _HtmlEntities2.default)(text) + "</textarea>\n                    </div>\n                    <button>Save!</button>\n                </form>\n            </div>");
        }
    }]);

    return PanelSave;
}(_HTMLElement3.default);

exports.default = new PanelSave();

},{"../../helpers/HtmlEntities":2,"../HTMLElement":3}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _HTMLElement2 = require("../HTMLElement");

var _HTMLElement3 = _interopRequireDefault(_HTMLElement2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var panelShadeId = "snipItPanelShade";

var PanelShade = function (_HTMLElement) {
    _inherits(PanelShade, _HTMLElement);

    function PanelShade() {
        _classCallCheck(this, PanelShade);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(PanelShade).call(this, "div", panelShadeId, true, true));
    }

    return PanelShade;
}(_HTMLElement3.default);

exports.default = new PanelShade();

},{"../HTMLElement":3}],8:[function(require,module,exports){
"use strict";

var _SnipIt = require("./app/SnipIt");

var _SnipIt2 = _interopRequireDefault(_SnipIt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_SnipIt2.default.init(window, document);

},{"./app/SnipIt":1}]},{},[8]);
