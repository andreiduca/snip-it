!function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){"use strict";function hasOwnProperty(obj,prop){return Object.prototype.hasOwnProperty.call(obj,prop)}module.exports=function(qs,sep,eq,options){sep=sep||"&",eq=eq||"=";var obj={};if("string"!=typeof qs||0===qs.length)return obj;var regexp=/\+/g;qs=qs.split(sep);var maxKeys=1e3;options&&"number"==typeof options.maxKeys&&(maxKeys=options.maxKeys);var len=qs.length;maxKeys>0&&len>maxKeys&&(len=maxKeys);for(var i=0;len>i;++i){var kstr,vstr,k,v,x=qs[i].replace(regexp,"%20"),idx=x.indexOf(eq);idx>=0?(kstr=x.substr(0,idx),vstr=x.substr(idx+1)):(kstr=x,vstr=""),k=decodeURIComponent(kstr),v=decodeURIComponent(vstr),hasOwnProperty(obj,k)?isArray(obj[k])?obj[k].push(v):obj[k]=[obj[k],v]:obj[k]=v}return obj};var isArray=Array.isArray||function(xs){return"[object Array]"===Object.prototype.toString.call(xs)}},{}],2:[function(require,module,exports){"use strict";function map(xs,f){if(xs.map)return xs.map(f);for(var res=[],i=0;i<xs.length;i++)res.push(f(xs[i],i));return res}var stringifyPrimitive=function(v){switch(typeof v){case"string":return v;case"boolean":return v?"true":"false";case"number":return isFinite(v)?v:"";default:return""}};module.exports=function(obj,sep,eq,name){return sep=sep||"&",eq=eq||"=",null===obj&&(obj=void 0),"object"==typeof obj?map(objectKeys(obj),function(k){var ks=encodeURIComponent(stringifyPrimitive(k))+eq;return isArray(obj[k])?map(obj[k],function(v){return ks+encodeURIComponent(stringifyPrimitive(v))}).join(sep):ks+encodeURIComponent(stringifyPrimitive(obj[k]))}).join(sep):name?encodeURIComponent(stringifyPrimitive(name))+eq+encodeURIComponent(stringifyPrimitive(obj)):""};var isArray=Array.isArray||function(xs){return"[object Array]"===Object.prototype.toString.call(xs)},objectKeys=Object.keys||function(obj){var res=[];for(var key in obj)Object.prototype.hasOwnProperty.call(obj,key)&&res.push(key);return res}},{}],3:[function(require,module,exports){"use strict";exports.decode=exports.parse=require("./decode"),exports.encode=exports.stringify=require("./encode")},{"./decode":1,"./encode":2}],4:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_SnipButton=require("../modules/SnipButton"),_SnipButton2=_interopRequireDefault(_SnipButton),_TempMarker=require("../modules/TempMarker"),_TempMarker2=_interopRequireDefault(_TempMarker),_PanelShade=require("../modules/panels/PanelShade"),_PanelShade2=_interopRequireDefault(_PanelShade),_PanelSave=require("../modules/panels/PanelSave"),_PanelSave2=_interopRequireDefault(_PanelSave),SnipIt=function(){function SnipIt(){_classCallCheck(this,SnipIt),this.isPanelOpen=!1}return _createClass(SnipIt,[{key:"getSelection",value:function(){return this._window.getSelection()}},{key:"getSelectionText",value:function(selection){return selection.toString().trim()}},{key:"onMouseUp",value:function(){if(!this.isPanelOpen){var selection=this.getSelection(),selectionText=this.getSelectionText(selection);if(selectionText.length>0){var range=selection.getRangeAt(0).cloneRange();range.collapse(!1),range.insertNode(_TempMarker2.default.create()),_SnipButton2.default.setPosition(_TempMarker2.default.getPosition()),_TempMarker2.default.destroy()}else _SnipButton2.default.destroy()}}},{key:"init",value:function(_ref){var window=_ref.window,document=_ref.document;this._window=window,this._document=document,_SnipButton2.default.init({window:window,document:document}),_TempMarker2.default.init({window:window,document:document}),_PanelShade2.default.init({window:window,document:document}),_PanelSave2.default.init({window:window,document:document}),this._document.onmouseup=this.onMouseUp.bind(this),_SnipButton2.default.onClick=this.onButtonClick.bind(this),_PanelShade2.default.onClick=this.onHidePanels.bind(this)}},{key:"onButtonClick",value:function(){_SnipButton2.default.destroy();var selection=this.getSelection(),selectionText=this.getSelectionText(selection);selectionText&&(this.isPanelOpen=!0,_PanelShade2.default.show(),_PanelSave2.default.show(selectionText))}},{key:"onHidePanels",value:function(){this.isPanelOpen=!1,_PanelSave2.default.hide(),_PanelShade2.default.hide()}}]),SnipIt}();exports.default=new SnipIt},{"../modules/SnipButton":11,"../modules/TempMarker":12,"../modules/panels/PanelSave":13,"../modules/panels/PanelShade":14}],5:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(htmlText){return String(htmlText).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}},{}],6:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_Languages=require("./Languages"),_Languages2=_interopRequireDefault(_Languages),LanguageDetector=function(){function LanguageDetector(){_classCallCheck(this,LanguageDetector),this.detectedLanguage=null}return _createClass(LanguageDetector,[{key:"init",value:function(tags){if(tags.length)for(var i=0,n=tags.length;n>i;i++)if(_Languages2.default.indexOf(tags[i])>-1){this.detectedLanguage=tags[i].toLowerCase();break}}},{key:"languages",value:function(){return _Languages2.default}},{key:"getLanguage",value:function(){return this.detectedLanguage}}]),LanguageDetector}();exports.default=new LanguageDetector},{"./Languages":7}],7:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=["1c","accesslog","actionscript","ada","apache","applescript","arduino","armasm","asciidoc","aspectj","autohotkey","autoit","avrasm","axapta","bash","basic","bnf","brainfuck","cal","capnproto","ceylon","clojure","clojure-repl","cmake","coffeescript","cos","cpp","crmsh","crystal","cs","csp","css","d","dart","delphi","diff","django","dns","dockerfile","dos","dts","dust","elixir","elm","erb","erlang","erlang-repl","fix","fortran","fsharp","gams","gauss","gcode","gherkin","glsl","go","golo","gradle","groovy","haml","handlebars","haskell","haxe","hsp","htmlbars","http","inform7","ini","irpf90","java","javascript","json","julia","kotlin","lasso","less","lisp","livecodeserver","livescript","lua","makefile","markdown","mathematica","matlab","maxima","mel","mercury","mipsasm","mizar","mojolicious","monkey","moonscript","nginx","nimrod","nix","nsis","objectivec","ocaml","openscad","oxygene","parser3","perl","pf","php","powershell","processing","profile","prolog","protobuf","puppet","purebasic","python","q","qml","r","rib","roboconf","rsl","ruby","ruleslanguage","rust","scala","scheme","scilab","scss","smali","smalltalk","sml","sqf","sql","stan","stata","step21","stylus","swift","taggerscript","tcl","tex","thrift","tp","twig","typescript","vala","vbnet","vbscript","vbscript-html","verilog","vhdl","vim","x86asm","xl","xml","xquery","yaml","zephir"]},{}],8:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(document){var tags=[],relTags=document.querySelectorAll("[rel='tag']");if(relTags.length)for(var i=0,n=relTags.length;n>i;i++){var tag=relTags[i].innerText;tags.indexOf(tag)>-1||tags.push(tag)}return tags}},{}],9:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_querystring=require("querystring"),_querystring2=_interopRequireDefault(_querystring),XHR=function(){function XHR(){_classCallCheck(this,XHR),this.xhr=new XMLHttpRequest,this.backend="http://192.168.99.100:3000"}return _createClass(XHR,[{key:"setBackendPath",value:function(path){this.backend=path}},{key:"send",value:function(_ref){var _this=this,_ref$type=_ref.type,type=void 0===_ref$type?"get":_ref$type,url=_ref.url,data=_ref.data,onSuccess=_ref.onSuccess,onFail=_ref.onFail,APIUrl=(this.backend||"")+url;this.xhr.open(type.toUpperCase(),APIUrl,!0),this.xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded"),this.xhr.onerror=function(){"function"==typeof onFail&&onFail()},this.xhr.onload=function(){_this.xhr.status>=200&&_this.xhr.status<300&&"function"==typeof onSuccess&&onSuccess(_this.xhr.response)},this.xhr.send(_querystring2.default.encode(data))}},{key:"get",value:function(_ref2){var url=_ref2.url,data=_ref2.data,_ref2$onSuccess=_ref2.onSuccess,onSuccess=void 0===_ref2$onSuccess?null:_ref2$onSuccess,_ref2$onFail=_ref2.onFail,onFail=void 0===_ref2$onFail?null:_ref2$onFail;this.send({type:"get",url:url,data:data,onSuccess:onSuccess,onFail:onFail})}},{key:"post",value:function(_ref3){var url=_ref3.url,data=_ref3.data,_ref3$onSuccess=_ref3.onSuccess,onSuccess=void 0===_ref3$onSuccess?null:_ref3$onSuccess,_ref3$onFail=_ref3.onFail,onFail=void 0===_ref3$onFail?null:_ref3$onFail;this.send({type:"post",url:url,data:data,onSuccess:onSuccess,onFail:onFail})}}]),XHR}();exports.default=new XHR},{querystring:3}],10:[function(require,module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),HTMLElement=function(){function HTMLElement(elementType,elementId){var clickCallback=arguments.length<=2||void 0===arguments[2]?!1:arguments[2],attachToDocumentBody=arguments.length<=3||void 0===arguments[3]?!1:arguments[3];_classCallCheck(this,HTMLElement),this._elementType=elementType,this._elementId=elementId,this._clickCallback=clickCallback,this._attachToDocumentBody=attachToDocumentBody}return _createClass(HTMLElement,[{key:"init",value:function(_ref){var window=_ref.window,document=_ref.document;this._window=window,this._document=document}},{key:"create",value:function(){var element=this.get();return element||(element=this._document.createElement(this._elementType),element.id=this._elementId,this._clickCallback&&(element.onclick=this.onClick),this._attachToDocumentBody&&this._document.body.appendChild(element)),element}},{key:"get",value:function(){return this._document.getElementById(this._elementId)}},{key:"show",value:function(){var element=this.create();return element.style.display="block",element}},{key:"hide",value:function(){var element=this.get();return element&&(element.style.display="none"),element}},{key:"destroy",value:function(){var element=this.get();element&&element.parentNode.removeChild(element)}},{key:"onClick",value:function(){}}]),HTMLElement}();exports.default=HTMLElement},{}],11:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_get=function get(object,property,receiver){null===object&&(object=Function.prototype);var desc=Object.getOwnPropertyDescriptor(object,property);if(void 0===desc){var parent=Object.getPrototypeOf(object);return null===parent?void 0:get(parent,property,receiver)}if("value"in desc)return desc.value;var getter=desc.get;if(void 0!==getter)return getter.call(receiver)},_HTMLElement2=require("./HTMLElement"),_HTMLElement3=_interopRequireDefault(_HTMLElement2),snipButtonId="snipItButton",snipButtonText="Snip It!",SnipButton=function(_HTMLElement){function SnipButton(){return _classCallCheck(this,SnipButton),_possibleConstructorReturn(this,Object.getPrototypeOf(SnipButton).call(this,"button",snipButtonId,!0,!0))}return _inherits(SnipButton,_HTMLElement),_createClass(SnipButton,[{key:"create",value:function(){var btn=_get(Object.getPrototypeOf(SnipButton.prototype),"create",this).call(this);return btn.innerText=snipButtonText,btn}},{key:"setPosition",value:function(position){var btn=this.create();btn.style.top=position.top+"px",btn.style.left=position.left+"px"}}]),SnipButton}(_HTMLElement3.default);exports.default=new SnipButton},{"./HTMLElement":10}],12:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_get=function get(object,property,receiver){null===object&&(object=Function.prototype);var desc=Object.getOwnPropertyDescriptor(object,property);if(void 0===desc){var parent=Object.getPrototypeOf(object);return null===parent?void 0:get(parent,property,receiver)}if("value"in desc)return desc.value;var getter=desc.get;if(void 0!==getter)return getter.call(receiver)},_HTMLElement2=require("./HTMLElement"),_HTMLElement3=_interopRequireDefault(_HTMLElement2),tmpMarkerId="snipItTemporaryMarker",tmpMarkerText="x",TempMarker=function(_HTMLElement){function TempMarker(){return _classCallCheck(this,TempMarker),_possibleConstructorReturn(this,Object.getPrototypeOf(TempMarker).call(this,"span",tmpMarkerId,!1,!1))}return _inherits(TempMarker,_HTMLElement),_createClass(TempMarker,[{key:"create",value:function(){var marker=_get(Object.getPrototypeOf(TempMarker.prototype),"create",this).call(this);return marker.appendChild(this._document.createTextNode(tmpMarkerText)),marker}},{key:"getPosition",value:function(){var obj=this.get(),left=0,top=0;do left+=obj.offsetLeft,top+=obj.offsetTop;while(obj=obj.offsetParent);return{top:top,left:left}}}]),TempMarker}(_HTMLElement3.default);exports.default=new TempMarker},{"./HTMLElement":10}],13:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_get=function get(object,property,receiver){null===object&&(object=Function.prototype);var desc=Object.getOwnPropertyDescriptor(object,property);if(void 0===desc){var parent=Object.getPrototypeOf(object);return null===parent?void 0:get(parent,property,receiver)}if("value"in desc)return desc.value;var getter=desc.get;if(void 0!==getter)return getter.call(receiver)},_HTMLElement2=require("../HTMLElement"),_HTMLElement3=_interopRequireDefault(_HTMLElement2),_HtmlEntities=require("../../helpers/HtmlEntities"),_HtmlEntities2=_interopRequireDefault(_HtmlEntities),_TagFinder=require("../../helpers/TagFinder"),_TagFinder2=_interopRequireDefault(_TagFinder),_LanguageDetector=require("../../helpers/LanguageDetector"),_LanguageDetector2=_interopRequireDefault(_LanguageDetector),_XHR=require("../../helpers/XHR"),_XHR2=_interopRequireDefault(_XHR),panelSaveId="snipItPanelSave",PanelSave=function(_HTMLElement){function PanelSave(){_classCallCheck(this,PanelSave);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(PanelSave).call(this,"div",panelSaveId,!1,!0));return _this.properties={title:null,url:null,text:null,tags:[],detectedLanguage:null},_this}return _inherits(PanelSave,_HTMLElement),_createClass(PanelSave,[{key:"show",value:function(){var text=arguments.length<=0||void 0===arguments[0]?null:arguments[0],panel=_get(Object.getPrototypeOf(PanelSave.prototype),"show",this).call(this);this.properties.title=this._document.title,this.properties.url=this._document.location.href,this.properties.text=text;var tags=(0,_TagFinder2.default)(this._document),detectedLanguage=null;tags.length&&(this.properties.tags=tags,_LanguageDetector2.default.init(tags),detectedLanguage=_LanguageDetector2.default.getLanguage(),this.properties.detectedLanguage=detectedLanguage),this.draw(panel)}},{key:"draw",value:function(panelElement){var panel=panelElement||this.get();panel.innerHTML=this.HTMLPanel(),this.initControls()}},{key:"initControls",value:function(){var _this2=this,showSelectLanguage=this._document.getElementById("snipItPanelSaveShowSelectLanguage");showSelectLanguage&&(showSelectLanguage.onclick=this.showSelectLanguage.bind(this));var tags=this._document.querySelectorAll("[id^=snipItPanelSaveTag_]");if(tags.length)for(var _loop=function(i,n){tags[i].onclick=function(){_this2.properties.tags.splice(i,1),_this2.draw()}},i=0,n=tags.length;n>i;i++)_loop(i,n);var submitButton=this._document.getElementById("snipItPanelSaveSubmitButton");submitButton&&(submitButton.onclick=this.submitPanelSave.bind(this));var title=this._document.getElementById("snipItPanelSaveTitle");title&&(title.onkeyup=title.onblur=function(){_this2.properties.title=title.value});var languages=this._document.getElementById("snipItPanelSaveSelectLanguage");languages&&(languages.onchange=function(){_this2.properties.selectedLanguage=languages.value});var codeBlock=this._document.getElementById("snipItPanelSaveCodeBlock");codeBlock&&(codeBlock.onkeyup=codeBlock.onblur=function(){_this2.properties.text=codeBlock.value})}},{key:"HTMLPanel",value:function(){return'\n            <div>\n                <form>\n                    <div>\n                        <label for="snipItPanelSaveTitle">Title:</label>\n                        <input type="text" name="snipItTitle" id="snipItPanelSaveTitle" value="'+this.properties.title+'" autocomplete="off" />\n                    </div>\n                    <div>\n                        <label class="snipItInlineLabel" for="snipItPanelSaveSelectLanguage">Language:</label>\n                        '+(this.properties.detectedLanguage?this.HTMLLanguageSuggest():this.HTMLLanguageSelect())+'\n                    </div>\n                    <div>\n                        <label class="snipItInlineLabel">Tags:</label>\n                        '+this.properties.tags.map(function(item,index){return'<span class="snipItTag" id="snipItPanelSaveTag_'+index+'" title="Remove this tag">'+item+"</span>"}).join(" ")+'\n                    </div>\n                    <div>\n                        <label for="snipItPanelSaveCodeBlock">Code:</label>\n                        <textarea name="snipItCodeBlock" id="snipItPanelSaveCodeBlock" rows="10" wrap="off">'+(0,_HtmlEntities2.default)(this.properties.text)+'</textarea>\n                    </div>\n                    <button type="button" id="snipItPanelSaveSubmitButton">Save!</button>\n                </form>\n            </div>'}},{key:"HTMLLanguageSuggest",value:function(){return'<span class="snipItTag">'+this.properties.detectedLanguage+'</span>\n                <small>(detected; <a href="#!" id="snipItPanelSaveShowSelectLanguage">change</a>)</small>'}},{key:"HTMLLanguageSelect",value:function(){var _this3=this;return'<select id="snipItPanelSaveSelectLanguage">\n                    '+_LanguageDetector2.default.languages().map(function(item){var isSelected=null;return _this3.properties.selectedLanguage==item&&(isSelected='selected="selected"'),'<option value="'+item+'" '+isSelected+">"+item+"</option>"})+"\n                </select>"}},{key:"showSelectLanguage",value:function(){return this.properties.selectedLanguage=this.properties.detectedLanguage,this.properties.detectedLanguage=null,this.draw(),!1}},{key:"submitPanelSave",value:function(){var objectToSend={url:this.properties.url,title:this.properties.title,language:this.properties.selectedLanguage||this.properties.detectedLanguage,tags:this.properties.tags,code:this.properties.text};_XHR2.default.post({url:"/save",data:objectToSend,onSuccess:function(response){console.log("YAY, the ajax is done!",response)}})}}]),PanelSave}(_HTMLElement3.default);exports.default=new PanelSave},{"../../helpers/HtmlEntities":5,"../../helpers/LanguageDetector":6,"../../helpers/TagFinder":8,"../../helpers/XHR":9,"../HTMLElement":10}],14:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _HTMLElement2=require("../HTMLElement"),_HTMLElement3=_interopRequireDefault(_HTMLElement2),panelShadeId="snipItPanelShade",PanelShade=function(_HTMLElement){function PanelShade(){return _classCallCheck(this,PanelShade),_possibleConstructorReturn(this,Object.getPrototypeOf(PanelShade).call(this,"div",panelShadeId,!0,!0))}return _inherits(PanelShade,_HTMLElement),PanelShade}(_HTMLElement3.default);exports.default=new PanelShade},{"../HTMLElement":10}],15:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var _SnipIt=require("./app/SnipIt"),_SnipIt2=_interopRequireDefault(_SnipIt);_SnipIt2.default.init({window:window,document:document})},{"./app/SnipIt":4}]},{},[15]);