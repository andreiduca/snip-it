"use strict";

export default (document) => {
    let tags = [];

    let relTags = document.querySelectorAll("[rel='tag']");
    if (relTags.length) {
        for (let i = 0, n = relTags.length; i < n; i++) {
            let tag = relTags[i].innerText;

            if(tags.indexOf(tag) > -1) {
                continue;
            }

            tags.push(tag);
        }
    }

    return tags;
}