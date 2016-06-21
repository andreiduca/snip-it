"use strict";

import querystring from "querystring";

class XHR
{
    constructor() {
        this.xhr = new XMLHttpRequest();
        this.backend = 'http://localhost:3000';
    }

    setBackendPath(path) {
        this.backend = path;
    }

    send({type = 'get', url, data, onSuccess, onFail}) {

        let APIUrl = (this.backend || '') + url;

        this.xhr.open(type.toUpperCase(), APIUrl, true);

        // this.xhr.setRequestHeader('Content-type', 'application/json');
        // this.xhr.setRequestHeader('Accept', 'application/json');
        this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        this.xhr.onerror = () => {
            if (typeof onFail === 'function') {
                onFail();
            }
        };

        this.xhr.onload = () => {
            if (this.xhr.status >= 200 && this.xhr.status < 300) {
                if (typeof onSuccess === 'function') {
                    onSuccess(this.xhr.response);
                }
            } else {
            }
        };

        this.xhr.send(querystring.encode(data));
    }

    get({url, data, onSuccess = null, onFail = null}) {
        this.send({
            type: 'get',
            url: url,
            data: data,
            onSuccess: onSuccess,
            onFail: onFail
        });
    }

    post({url, data, onSuccess = null, onFail = null}) {
        this.send({
            type: 'post',
            url: url,
            data: data,
            onSuccess: onSuccess,
            onFail: onFail
        });
    }
}

export default new XHR();