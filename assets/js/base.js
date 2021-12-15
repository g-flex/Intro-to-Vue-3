function coloredLog(phrase) { console.log('%c'+phrase, 'font-weight: bold;font-size: 30px; background:  linear-gradient(0deg, rgba(230,100,101,1) 0%, rgba(94,98,126,1) 39%, rgba(2,70,103,1) 100%); color: #bada55'); }
const $ = s => { return document.querySelector(s); }
function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
}
function convertHTML(str) {
    if(!str) { return '' }
    let replacements = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
        "<>": "&lt;&gt;",
    }
    return str.replace(/(&|<|>|"|'|<>)/gi, function(noe) {
        return replacements[noe];
    });
}
function deepObjCopy(refObj){
    if(!(refObj instanceof Object) || Object.keys(refObj).length < 1) { return (refObj instanceof Array) ? [] : {}; }
    var result = (refObj instanceof Array) ? [] : {};
    for(var key in refObj){
        if(refObj[key] instanceof Object){
            if(refObj[key] instanceof Array){
                result[key] = [];
                refObj[key].forEach(function(item){
                    if(item instanceof Object){
                        result[key].push(deepObjCopy(item));
                    } else {
                        result[key].push(item);
                    }
                });
            } else {
                result[key] = deepObjCopy(refObj[key]);
            }
        } else {
            result[key] = refObj[key];
        }
    }
    return result
}
function sameArrayItems(array1, array2) {
    return array1.sort().join(',') === array2.sort().join(',');
}
function getArraysCommonElements(arr1, arr2) {
    return arr1.filter(function(n) {
        return arr2.indexOf(n) !== -1;
    });
}
function submitQuery(container, fn) {
    document.activeElement.blur();
    container.querySelector('pre code').textContent = '';
    Loader.init().showTargeted(container);
    API.init()[fn](container.querySelector('input').value, r=>{
        container.querySelector('pre code').innerHTML = parseObjectForPrinting(r);
        Loader.init().hideTargeted(container);
    });
}
function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}
function parseObjectForPrinting(obj) { return syntaxHighlight(JSON.stringify(obj, null, 3)); }