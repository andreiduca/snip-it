"use strict";

import XHR from "../XHR";

class VendorChrome
{
    constructor(chrome) {
        this.chrome = chrome;
    }

    setBackendPath(path) {
        XHR.setBackendPath(path);
    }

    // content_script -> background xhr proxy
    sendXHR(data) {
        this.sendMessage({action: "send_xhr", data: data});
    }

    // communication bridge between background and injected scripts
    sendMessage({action = '', tab = null, data}) {
        if (tab) {
            this.chrome.tabs.sendMessage(tab.id, {action: action, data: data}, function (response) {
                console.log("tab said", response);
            });
        }
        else {
            this.chrome.runtime.sendMessage({action: action, data: data}, function (response) {
                console.log("background.js said", response);
            });
        }

        /*this.chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            this.chrome.tabs.sendMessage(tabs[0].id, {action: "receive_xhr"}, function (response) { });
        });*/
    }

    // receive a Message
    registerReceiveMessages() {
        this.chrome.runtime.onMessage.addListener(
            (request, sender, messageCallback) => {
                /*console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");*/

                var response = null;

                switch(request.action) {
                    // instruction to make and XHR request
                    case 'send_xhr': {
                        if (sender.tab) {

                            // register success callback
                            request.data.onSuccess = (response) => {
                                this.sendMessage({
                                    action: "receive_xhr",
                                    tab: sender.tab,
                                    data: response
                                });
                            };

                            // register failure callback
                            request.data.onFail = () => {
                                this.sendMessage({
                                    action: "receive_xhr",
                                    tab: sender.tab,
                                    data: {
                                        status: "error"
                                    }
                                });
                            };

                            // send the request
                            XHR.send(request.data);

                            response = 'sent_xhr';
                        }
                    } break;

                    // requested inside the XHR callbacks
                    case 'receive_xhr': {
                        this.callbackProxy(request.data);

                        response = 'received_xhr';
                    } break;
                }

                // respond to action
                messageCallback({message: response});
            }
        );
    }

    callbackProxy() {
        // this will be overwritten
    }
}

export default VendorChrome;