/*
* This script makes angular.js work better in Prince by providing temporary
* workarounds for some API methods Price has not implemented yet as of January 2018.
* Usage: call Prince with arguments
*   --javascript --script compat.js
* and the file name or URL of a page using Angular.
*/

/*
* Prince does not implement the HTTP header-related methods of XMLHttpRequest
* We provide stubs to prevent Angular from failing, but there is no way
* to implement the actual functionality. The stub implementation must
* carefully avoid overwriting an actual implementation should Prince add one.
*/

if (!XMLHttpRequest.prototype.getAllResponseHeaders){
    XMLHttpRequest.prototype.getAllResponseHeaders = function(){
        if (this.getResponseHeader) {
            var headers = ['Content-Length', 'Content-type', 'Date', 'Last-Modified', 'Server'];
            var result = [];
            headers.forEach(function(header) {
                if (this.getResponseHeader(header)){
                    result.push(header + ': ' + this.getResponseHeader(header));
                }
            });
            return result.join('\r\n');
        }
        console.log('Warning: getAllResponseHeaders not supported');
        return '';
    };
}

if (!XMLHttpRequest.prototype.setRequestHeader){
    XMLHttpRequest.prototype.setRequestHeader = function(n,v){
        console.log('Warning: can not set request header ' + n + ' to ' + v);
    };
}

/*
* Prince's support for DocumentFragment is ..fragmentaric. It is supposed to
* have several methods found on real Document objects, like getElementsByTagName(),
* getElementById() and querySelector/querySelectorAll(). Angular templating mechanism
* depends on DocumentFragment.querySelectorAll('*') which we'll fake below.
*/

if (!DocumentFragment.prototype.querySelectorAll) {
    DocumentFragment.prototype.querySelectorAll = function(query) {
        if (query === '*') {
            return this.childNodes;
        }
        console.log('Warning: DocumentFragment querySelectorAll not fully implemented, no support for querying ' + query);
    };
}
