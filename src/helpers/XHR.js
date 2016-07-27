"use strict";

import AppConfig from "../config/index";

class XHR
{
    send({type = 'get', url, data, onSuccess, onFail}) {

        let xhr = new XMLHttpRequest();
        let APIUrl = (AppConfig.api.baseURL || '') + url;

        xhr.open(type.toUpperCase(), APIUrl, true);

        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        xhr.withCredentials = true;

        xhr.onerror = () => {
            if (typeof onFail === 'function') { onFail(); }
        };

        xhr.onreadystatechange = () => {
            if (xhr.readyState == XMLHttpRequest.HEADERS_RECEIVED && xhr.status >= 400) {
                if (typeof onFail === 'function') { onFail(); }
            }
        };

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                if (typeof onSuccess === 'function') {
                    onSuccess(JSON.parse(xhr.response));
                }
            }
        };

        xhr.send(JSON.stringify(data));
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