!function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_SnipButton=require("../modules/SnipButton"),_SnipButton2=_interopRequireDefault(_SnipButton),_TempMarker=require("../modules/TempMarker"),_TempMarker2=_interopRequireDefault(_TempMarker),_PanelShade=require("../modules/panels/PanelShade"),_PanelShade2=_interopRequireDefault(_PanelShade),_PanelLogin=require("../modules/panels/PanelLogin"),_PanelLogin2=_interopRequireDefault(_PanelLogin),_PanelSave=require("../modules/panels/PanelSave"),_PanelSave2=_interopRequireDefault(_PanelSave),_PanelSaveDone=require("../modules/panels/PanelSaveDone"),_PanelSaveDone2=_interopRequireDefault(_PanelSaveDone),_XHR=require("../helpers/XHR"),_XHR2=_interopRequireDefault(_XHR),SnipIt=function(){function SnipIt(){_classCallCheck(this,SnipIt),this.isPanelOpen=!1,this.isUserLoggedIn=null,this.tempSelectedText=null}return _createClass(SnipIt,[{key:"getSelection",value:function(){return this._window.getSelection()}},{key:"getSelectionText",value:function(selection){return selection.toString().trim()}},{key:"onMouseUp",value:function(){if(!this.isPanelOpen){var selection=this.getSelection(),selectionText=this.getSelectionText(selection);if(selectionText.length>0){var range=selection.getRangeAt(0).cloneRange();range.collapse(!1),range.insertNode(_TempMarker2.default.create()),_SnipButton2.default.setPosition(_TempMarker2.default.getPosition()),_TempMarker2.default.destroy()}else _SnipButton2.default.destroy()}}},{key:"init",value:function(_ref){var window=_ref.window,document=_ref.document;this._window=window,this._document=document,_SnipButton2.default.init({window:window,document:document}),_TempMarker2.default.init({window:window,document:document}),_PanelShade2.default.init({window:window,document:document}),_PanelLogin2.default.init({window:window,document:document}),_PanelSave2.default.init({window:window,document:document}),_PanelSaveDone2.default.init({window:window,document:document}),this._document.onmouseup=this.onMouseUp.bind(this),_SnipButton2.default.onClick=this.authShowPanels.bind(this),_PanelShade2.default.onClick=this.hidePanels.bind(this),_PanelLogin2.default.loginWindowClose=this.authShowPanels.bind(this),_PanelSave2.default.onSaveSuccess=this.saveSuccess.bind(this),_PanelSave2.default.onUnauthorized=this.authShowPanels.bind(this),_PanelSaveDone2.default.closePanel=this.hidePanels.bind(this)}},{key:"displayPanels",value:function(){_SnipButton2.default.destroy(),this.hidePanels();var selection=this.getSelection(),selectionText=this.getSelectionText(selection);selectionText?this.tempSelectedText=selectionText:this.tempSelectedText&&(selectionText=this.tempSelectedText),this.isUserLoggedIn?selectionText&&(this.isPanelOpen=!0,_PanelShade2.default.show(),_PanelSave2.default.show(selectionText),this.tempSelectedText=null):(this.isPanelOpen=!0,_PanelShade2.default.show(),_PanelLogin2.default.show())}},{key:"hidePanels",value:function(){this.isPanelOpen=!1,_PanelSave2.default.hide(),_PanelSaveDone2.default.hide(),_PanelLogin2.default.hide(),_PanelShade2.default.hide()}},{key:"authShowPanels",value:function(){var _this=this;_XHR2.default.get({url:"/auth",onSuccess:function(response){_this.isUserLoggedIn=response.auth||!1,_this.isUserLoggedIn&&_PanelSave2.default.getUserCategories(),_this.displayPanels()},onFail:function(){_this.isUserLoggedIn=!1,_this.displayPanels()}})}},{key:"saveSuccess",value:function(){this.hidePanels(),_PanelShade2.default.show(),_PanelSaveDone2.default.show()}}]),SnipIt}();exports.default=new SnipIt},{"../helpers/XHR":10,"../modules/SnipButton":12,"../modules/TempMarker":13,"../modules/panels/PanelLogin":14,"../modules/panels/PanelSave":15,"../modules/panels/PanelSaveDone":16,"../modules/panels/PanelShade":17}],2:[function(require,module,exports){"use strict";module.exports={application:{baseURL:"http://localhost:3000"},api:{baseURL:"http://localhost:3000/api"}}},{}],3:[function(require,module,exports){"use strict";var env="test",config={};switch(env){case"development":config=require("./development.config");break;case"test":config=require("./test.config");break;case"production":config=require("./production.config")}module.exports=config},{"./development.config":2,"./production.config":4,"./test.config":5}],4:[function(require,module,exports){"use strict";module.exports={application:{baseURL:"http://snipit.xyz"},api:{baseURL:"http://snipit.xyz/api"}}},{}],5:[function(require,module,exports){"use strict";module.exports={application:{baseURL:"http://test.snipit.xyz"},api:{baseURL:"http://test.snipit.xyz/api"}}},{}],6:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(htmlText){return String(htmlText).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}},{}],7:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_Languages=require("./Languages"),_Languages2=_interopRequireDefault(_Languages),LanguageDetector=function(){function LanguageDetector(){_classCallCheck(this,LanguageDetector),this.detectedLanguage=null}return _createClass(LanguageDetector,[{key:"init",value:function(tags){if(tags.length)for(var i=0,n=tags.length;n>i;i++)if(_Languages2.default.indexOf(tags[i])>-1){this.detectedLanguage=tags[i].toLowerCase();break}}},{key:"languages",value:function(){return _Languages2.default}},{key:"getLanguage",value:function(){return this.detectedLanguage}}]),LanguageDetector}();exports.default=new LanguageDetector},{"./Languages":8}],8:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=["1c","accesslog","actionscript","ada","apache","applescript","arduino","armasm","asciidoc","aspectj","autohotkey","autoit","avrasm","axapta","bash","basic","bnf","brainfuck","cal","capnproto","ceylon","clojure","clojure-repl","cmake","coffeescript","cos","cpp","crmsh","crystal","cs","csp","css","d","dart","delphi","diff","django","dns","dockerfile","dos","dts","dust","elixir","elm","erb","erlang","erlang-repl","fix","fortran","fsharp","gams","gauss","gcode","gherkin","glsl","go","golo","gradle","groovy","haml","handlebars","haskell","haxe","hsp","htmlbars","http","inform7","ini","irpf90","java","javascript","json","julia","kotlin","lasso","less","lisp","livecodeserver","livescript","lua","makefile","markdown","mathematica","matlab","maxima","mel","mercury","mipsasm","mizar","mojolicious","monkey","moonscript","nginx","nimrod","nix","nsis","objectivec","ocaml","openscad","oxygene","parser3","perl","pf","php","powershell","processing","profile","prolog","protobuf","puppet","purebasic","python","q","qml","r","rib","roboconf","rsl","ruby","ruleslanguage","rust","scala","scheme","scilab","scss","smali","smalltalk","sml","sqf","sql","stan","stata","step21","stylus","swift","taggerscript","tcl","tex","thrift","tp","twig","typescript","vala","vbnet","vbscript","vbscript-html","verilog","vhdl","vim","x86asm","xl","xml","xquery","yaml","zephir"]},{}],9:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(document){var tags=[],relTags=document.querySelectorAll("[rel='tag']");if(relTags.length)for(var i=0,n=relTags.length;n>i;i++){var tag=relTags[i].innerText;tags.indexOf(tag)>-1||tags.push(tag)}return tags}},{}],10:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_index=require("../config/index"),_index2=_interopRequireDefault(_index),XHR=function(){function XHR(){_classCallCheck(this,XHR)}return _createClass(XHR,[{key:"send",value:function(_ref){var _ref$type=_ref.type,type=void 0===_ref$type?"get":_ref$type,url=_ref.url,data=_ref.data,onSuccess=_ref.onSuccess,onFail=_ref.onFail,xhr=new XMLHttpRequest,APIUrl=(_index2.default.api.baseURL||"")+url;xhr.open(type.toUpperCase(),APIUrl,!0),xhr.setRequestHeader("Content-type","application/json"),xhr.setRequestHeader("Accept","application/json"),xhr.withCredentials=!0,xhr.onerror=function(){"function"==typeof onFail&&onFail()},xhr.onreadystatechange=function(){xhr.readyState==XMLHttpRequest.HEADERS_RECEIVED&&xhr.status>=400&&"function"==typeof onFail&&onFail()},xhr.onload=function(){xhr.status>=200&&xhr.status<300&&"function"==typeof onSuccess&&onSuccess(JSON.parse(xhr.response))},xhr.send(JSON.stringify(data))}},{key:"get",value:function(_ref2){var url=_ref2.url,data=_ref2.data,_ref2$onSuccess=_ref2.onSuccess,onSuccess=void 0===_ref2$onSuccess?null:_ref2$onSuccess,_ref2$onFail=_ref2.onFail,onFail=void 0===_ref2$onFail?null:_ref2$onFail;this.send({type:"get",url:url,data:data,onSuccess:onSuccess,onFail:onFail})}},{key:"post",value:function(_ref3){var url=_ref3.url,data=_ref3.data,_ref3$onSuccess=_ref3.onSuccess,onSuccess=void 0===_ref3$onSuccess?null:_ref3$onSuccess,_ref3$onFail=_ref3.onFail,onFail=void 0===_ref3$onFail?null:_ref3$onFail;this.send({type:"post",url:url,data:data,onSuccess:onSuccess,onFail:onFail})}}]),XHR}();exports.default=new XHR},{"../config/index":3}],11:[function(require,module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),HTMLElement=function(){function HTMLElement(elementType,elementId){var clickCallback=arguments.length<=2||void 0===arguments[2]?!1:arguments[2],attachToDocumentBody=arguments.length<=3||void 0===arguments[3]?!1:arguments[3];_classCallCheck(this,HTMLElement),this._elementType=elementType,this._elementId=elementId,this._clickCallback=clickCallback,this._attachToDocumentBody=attachToDocumentBody}return _createClass(HTMLElement,[{key:"init",value:function(_ref){var window=_ref.window,document=_ref.document;this._window=window,this._document=document}},{key:"create",value:function(){var element=this.get();return element||(element=this._document.createElement(this._elementType),element.id=this._elementId,this._clickCallback&&(element.onclick=this.onClick),this._attachToDocumentBody&&this._document.body.appendChild(element)),element}},{key:"get",value:function(){return this._document.getElementById(this._elementId)}},{key:"show",value:function(){var element=this.create();return element.style.display="block",element}},{key:"hide",value:function(){var element=this.get();return element&&(element.style.display="none"),element}},{key:"destroy",value:function(){var element=this.get();element&&element.parentNode.removeChild(element)}},{key:"onClick",value:function(){}}]),HTMLElement}();exports.default=HTMLElement},{}],12:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_get=function get(object,property,receiver){null===object&&(object=Function.prototype);var desc=Object.getOwnPropertyDescriptor(object,property);if(void 0===desc){var parent=Object.getPrototypeOf(object);return null===parent?void 0:get(parent,property,receiver)}if("value"in desc)return desc.value;var getter=desc.get;if(void 0!==getter)return getter.call(receiver)},_HTMLElement2=require("./HTMLElement"),_HTMLElement3=_interopRequireDefault(_HTMLElement2),snipButtonId="snipItButton",snipButtonText="Snip It!",SnipButton=function(_HTMLElement){function SnipButton(){return _classCallCheck(this,SnipButton),_possibleConstructorReturn(this,Object.getPrototypeOf(SnipButton).call(this,"button",snipButtonId,!0,!0))}return _inherits(SnipButton,_HTMLElement),_createClass(SnipButton,[{key:"create",value:function(){var btn=_get(Object.getPrototypeOf(SnipButton.prototype),"create",this).call(this);return btn.innerText=snipButtonText,btn}},{key:"setPosition",value:function(position){var btn=this.create();btn.style.top=position.top+"px",btn.style.left=position.left+"px"}}]),SnipButton}(_HTMLElement3.default);exports.default=new SnipButton},{"./HTMLElement":11}],13:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_get=function get(object,property,receiver){null===object&&(object=Function.prototype);var desc=Object.getOwnPropertyDescriptor(object,property);if(void 0===desc){var parent=Object.getPrototypeOf(object);return null===parent?void 0:get(parent,property,receiver)}if("value"in desc)return desc.value;var getter=desc.get;if(void 0!==getter)return getter.call(receiver)},_HTMLElement2=require("./HTMLElement"),_HTMLElement3=_interopRequireDefault(_HTMLElement2),tmpMarkerId="snipItTemporaryMarker",tmpMarkerText="x",TempMarker=function(_HTMLElement){function TempMarker(){return _classCallCheck(this,TempMarker),_possibleConstructorReturn(this,Object.getPrototypeOf(TempMarker).call(this,"span",tmpMarkerId,!1,!1))}return _inherits(TempMarker,_HTMLElement),_createClass(TempMarker,[{key:"create",value:function(){var marker=_get(Object.getPrototypeOf(TempMarker.prototype),"create",this).call(this);return marker.appendChild(this._document.createTextNode(tmpMarkerText)),marker}},{key:"getPosition",value:function(){var obj=this.get(),left=0,top=0;do left+=obj.offsetLeft,top+=obj.offsetTop;while(obj=obj.offsetParent);return{top:top,left:left}}}]),TempMarker}(_HTMLElement3.default);exports.default=new TempMarker},{"./HTMLElement":11}],14:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_get=function get(object,property,receiver){null===object&&(object=Function.prototype);var desc=Object.getOwnPropertyDescriptor(object,property);if(void 0===desc){var parent=Object.getPrototypeOf(object);return null===parent?void 0:get(parent,property,receiver)}if("value"in desc)return desc.value;var getter=desc.get;if(void 0!==getter)return getter.call(receiver)},_HTMLElement2=require("../HTMLElement"),_HTMLElement3=_interopRequireDefault(_HTMLElement2),_config=require("../../config"),_config2=_interopRequireDefault(_config),panelLoginId="snipItPanelLogin",PanelLogin=function(_HTMLElement){function PanelLogin(){return _classCallCheck(this,PanelLogin),_possibleConstructorReturn(this,Object.getPrototypeOf(PanelLogin).call(this,"div",panelLoginId,!1,!0))}return _inherits(PanelLogin,_HTMLElement),_createClass(PanelLogin,[{key:"create",value:function(){var panel=_get(Object.getPrototypeOf(PanelLogin.prototype),"create",this).call(this);return panel.className="snipItPanel",panel}},{key:"show",value:function(){var panel=_get(Object.getPrototypeOf(PanelLogin.prototype),"show",this).call(this);this.draw(panel)}},{key:"draw",value:function(panelElement){var panel=panelElement||this.get();panel.innerHTML=this.HTMLPanel(),this.initControls()}},{key:"initControls",value:function(){var loginGoogleButton=this._document.getElementById("snipItPanelLoginGoogle");loginGoogleButton&&(loginGoogleButton.onclick=this.loginWithGoogle.bind(this));var loginGithubButton=this._document.getElementById("snipItPanelLoginGithub");loginGithubButton&&(loginGithubButton.onclick=this.loginWithGithub.bind(this))}},{key:"HTMLPanel",value:function(){return'\n            <div>\n                <h1>Login with</h1>\n                <button type="button" id="snipItPanelLoginGoogle">Google</button>\n                <button type="button" id="snipItPanelLoginGithub">Github</button>\n            </div>'}},{key:"loginWithGoogle",value:function(){var loginWindow=this._window.open(_config2.default.application.baseURL+"/auth/google/selfclose");loginWindow.onunload=this.loginWindowClose}},{key:"loginWithGithub",value:function(){var loginWindow=this._window.open(_config2.default.application.baseURL+"/auth/github/selfclose");loginWindow.onunload=this.loginWindowClose}},{key:"loginWindowClose",value:function(){}}]),PanelLogin}(_HTMLElement3.default);exports.default=new PanelLogin},{"../../config":3,"../HTMLElement":11}],15:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_get=function get(object,property,receiver){null===object&&(object=Function.prototype);var desc=Object.getOwnPropertyDescriptor(object,property);if(void 0===desc){var parent=Object.getPrototypeOf(object);return null===parent?void 0:get(parent,property,receiver)}if("value"in desc)return desc.value;var getter=desc.get;if(void 0!==getter)return getter.call(receiver)},_HTMLElement2=require("../HTMLElement"),_HTMLElement3=_interopRequireDefault(_HTMLElement2),_HtmlEntities=require("../../helpers/HtmlEntities"),_HtmlEntities2=_interopRequireDefault(_HtmlEntities),_TagFinder=require("../../helpers/TagFinder"),_TagFinder2=_interopRequireDefault(_TagFinder),_LanguageDetector=require("../../helpers/LanguageDetector"),_LanguageDetector2=_interopRequireDefault(_LanguageDetector),_XHR=require("../../helpers/XHR"),_XHR2=_interopRequireDefault(_XHR),panelSaveId="snipItPanelSave",PanelSave=function(_HTMLElement){function PanelSave(){_classCallCheck(this,PanelSave);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(PanelSave).call(this,"div",panelSaveId,!1,!0));return _this.properties={title:null,url:null,text:null,tags:[],selectedCategory:null,selectedLanguage:null,detectedLanguage:null},_this.userCategories=[],_this.waitingXHR=!1,_this}return _inherits(PanelSave,_HTMLElement),_createClass(PanelSave,[{key:"create",value:function(){var panel=_get(Object.getPrototypeOf(PanelSave.prototype),"create",this).call(this);return panel.className="snipItPanel",panel}},{key:"show",value:function(){var text=arguments.length<=0||void 0===arguments[0]?null:arguments[0],panel=_get(Object.getPrototypeOf(PanelSave.prototype),"show",this).call(this);this.properties.title=this._document.title,this.properties.url=this._document.location.href,this.properties.text=text;var tags=(0,_TagFinder2.default)(this._document),detectedLanguage=null;tags.length&&(this.properties.tags=tags,_LanguageDetector2.default.init(tags),detectedLanguage=_LanguageDetector2.default.getLanguage(),this.properties.detectedLanguage=detectedLanguage),this.draw(panel)}},{key:"draw",value:function(panelElement){var panel=panelElement||this.get();panel.innerHTML=this.HTMLPanel(),this.initControls()}},{key:"initControls",value:function(){var _this2=this,showSelectLanguage=this._document.getElementById("snipItPanelSaveShowSelectLanguage");showSelectLanguage&&(showSelectLanguage.onclick=this.showSelectLanguage.bind(this));var tags=this._document.querySelectorAll("[id^=snipItPanelSaveTag_]");if(tags.length)for(var _loop=function(i,n){tags[i].onclick=function(){_this2.properties.tags.splice(i,1),_this2.draw()}},i=0,n=tags.length;n>i;i++)_loop(i,n);if(!this.waitingXHR){var submitButton=this._document.getElementById("snipItPanelSaveSubmitButton");submitButton&&(submitButton.onclick=this.submitPanelSave.bind(this))}var title=this._document.getElementById("snipItPanelSaveTitle");title&&(title.onkeyup=title.onblur=function(){_this2.properties.title=title.value});var categories=this._document.getElementById("snipItPanelSaveSelectCategory");categories&&(categories.onchange=function(){_this2.properties.selectedCategory=categories.value});var languages=this._document.getElementById("snipItPanelSaveSelectLanguage");languages&&(languages.onchange=function(){_this2.properties.selectedLanguage=languages.value});var codeBlock=this._document.getElementById("snipItPanelSaveCodeBlock");codeBlock&&(codeBlock.onkeyup=codeBlock.onblur=function(){_this2.properties.text=codeBlock.value})}},{key:"HTMLPanel",value:function(){return'\n            <div>\n                <form>\n                    <div>\n                        <label for="snipItPanelSaveTitle">Title:</label>\n                        <input type="text" name="snipItTitle" id="snipItPanelSaveTitle" value="'+this.properties.title+'" autocomplete="off" />\n                    </div>\n                    <div>\n                        <label class="snipItInlineLabel" for="snipItPanelSaveSelectCategory">Category:</label>\n                        '+this.HTMLCategorySelect()+'\n                    </div>\n                    <div>\n                        <label class="snipItInlineLabel" for="snipItPanelSaveSelectLanguage">Language:</label>\n                        '+(this.properties.detectedLanguage?this.HTMLLanguageSuggest():this.HTMLLanguageSelect())+'\n                    </div>\n                    <div>\n                        <label class="snipItInlineLabel">Tags:</label>\n                        '+this.properties.tags.map(function(item,index){return'<span class="snipItTag" id="snipItPanelSaveTag_'+index+'" title="Remove this tag">'+item+"</span>"}).join(" ")+'\n                    </div>\n                    <div>\n                        <label for="snipItPanelSaveCodeBlock">Code:</label>\n                        <textarea name="snipItCodeBlock" id="snipItPanelSaveCodeBlock" rows="10" wrap="off">'+(0,_HtmlEntities2.default)(this.properties.text)+"</textarea>\n                    </div>\n                    "+this.HTMLButton()+"\n                </form>\n            </div>"}},{key:"HTMLLanguageSuggest",value:function(){return'<span class="snipItTag">'+this.properties.detectedLanguage+'</span>\n                <small>(detected; <a href="#!" id="snipItPanelSaveShowSelectLanguage">change</a>)</small>'}},{key:"HTMLCategorySelect",value:function(){return'<select id="snipItPanelSaveSelectCategory">\n                    '+this.userCategories.map(function(item){return'<option value="'+item.id+'">'+item.name+"</option>"})+"\n                </select>"}},{key:"HTMLLanguageSelect",value:function(){var _this3=this;return'<select id="snipItPanelSaveSelectLanguage">\n                    '+_LanguageDetector2.default.languages().map(function(item){var isSelected=null;return _this3.properties.selectedLanguage==item&&(isSelected='selected="selected"'),'<option value="'+item+'" '+isSelected+">"+item+"</option>"})+"\n                </select>"}},{key:"HTMLButton",value:function(){return'<button type="button" id="snipItPanelSaveSubmitButton">\n                    '+(this.waitingXHR?'<div class="snipit-spinner">\n                          <div class="rect1"></div>\n                          <div class="rect2"></div>\n                          <div class="rect3"></div>\n                          <div class="rect4"></div>\n                          <div class="rect5"></div>\n                        </div>':"Save!")+"\n                </button>"}},{key:"showSelectLanguage",value:function(){return this.properties.selectedLanguage=this.properties.detectedLanguage,this.properties.detectedLanguage=null,this.draw(),!1}},{key:"getUserCategories",value:function(){var _this4=this;_XHR2.default.get({url:"/categories/all",onSuccess:function(response){_this4.userCategories=response.categories||[],_this4.draw()}})}},{key:"submitPanelSave",value:function(){var _this5=this,objectToSend={url:this.properties.url,title:this.properties.title,category_id:this.properties.selectedCategory||null,language:this.properties.selectedLanguage||this.properties.detectedLanguage,tags:this.properties.tags,code:this.properties.text};this.waitingXHR=!0,this.draw(),_XHR2.default.post({url:"/snippets/save",data:objectToSend,onSuccess:function(response){_this5.waitingXHR=!1,_this5.draw(),_this5.onSaveSuccess(response)},onFail:function(){_this5.waitingXHR=!1,_this5.draw(),_this5.onUnauthorized()}})}},{key:"onSaveSuccess",value:function(response){console.log("YAY, ajax done!",response)}},{key:"onUnauthorized",value:function(){console.log("bad happened :(");
}}]),PanelSave}(_HTMLElement3.default);exports.default=new PanelSave},{"../../helpers/HtmlEntities":6,"../../helpers/LanguageDetector":7,"../../helpers/TagFinder":9,"../../helpers/XHR":10,"../HTMLElement":11}],16:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_get=function get(object,property,receiver){null===object&&(object=Function.prototype);var desc=Object.getOwnPropertyDescriptor(object,property);if(void 0===desc){var parent=Object.getPrototypeOf(object);return null===parent?void 0:get(parent,property,receiver)}if("value"in desc)return desc.value;var getter=desc.get;if(void 0!==getter)return getter.call(receiver)},_HTMLElement2=require("../HTMLElement"),_HTMLElement3=_interopRequireDefault(_HTMLElement2),panelSaveDoneId="snipItPanelSaveDone",PanelSaveDone=function(_HTMLElement){function PanelSaveDone(){return _classCallCheck(this,PanelSaveDone),_possibleConstructorReturn(this,Object.getPrototypeOf(PanelSaveDone).call(this,"div",panelSaveDoneId,!1,!0))}return _inherits(PanelSaveDone,_HTMLElement),_createClass(PanelSaveDone,[{key:"create",value:function(){var panel=_get(Object.getPrototypeOf(PanelSaveDone.prototype),"create",this).call(this);return panel.className="snipItPanel",panel}},{key:"show",value:function(){var panel=_get(Object.getPrototypeOf(PanelSaveDone.prototype),"show",this).call(this);this.draw(panel)}},{key:"draw",value:function(panelElement){var panel=panelElement||this.get();panel.innerHTML=this.HTMLPanel(),this.initControls()}},{key:"initControls",value:function(){var saveDoneClose=this._document.getElementById("snipItPanelSaveDoneClose");saveDoneClose&&(saveDoneClose.onclick=this.closePanel.bind(this))}},{key:"HTMLPanel",value:function(){return'\n            <div>\n                <h1>Snipped!</h1>\n                <p>You code has been saved.</p>\n                <button type="button" id="snipItPanelSaveDoneClose">close</button>\n            </div>'}},{key:"closePanel",value:function(){}}]),PanelSaveDone}(_HTMLElement3.default);exports.default=new PanelSaveDone},{"../HTMLElement":11}],17:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _HTMLElement2=require("../HTMLElement"),_HTMLElement3=_interopRequireDefault(_HTMLElement2),panelShadeId="snipItPanelShade",PanelShade=function(_HTMLElement){function PanelShade(){return _classCallCheck(this,PanelShade),_possibleConstructorReturn(this,Object.getPrototypeOf(PanelShade).call(this,"div",panelShadeId,!0,!0))}return _inherits(PanelShade,_HTMLElement),PanelShade}(_HTMLElement3.default);exports.default=new PanelShade},{"../HTMLElement":11}],18:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var _SnipIt=require("./app/SnipIt"),_SnipIt2=_interopRequireDefault(_SnipIt);_SnipIt2.default.init({window:window,document:document})},{"./app/SnipIt":1}]},{},[18]);