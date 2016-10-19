/*
* This script enhances Prince's JS/DOM features to ensure it is
* compatible with the ABC.js music notation library.
* Usage: run Prince with arguments
*  `--javascript --script compat.js `
* and the file name or URL of a page using ABC.js
*/
var tmp = document.createElement('textarea');
if(!('value' in tmp)){
    Object.defineProperty(HTMLTextAreaElement.prototype, 'value', {
        get: function(){
            return (this.firstChild && this.firstChild.data) || '';
        }
    });
}
// This method should really be defined on SVGTextContentElement
// but Prince doesn't support or expose that interface yet
if(!(typeof SVGTextContentElement !== 'undefined' && SVGTextContentElement.prototype.getNumberOfChars)){
    Element.prototype.getNumberOfChars = function(){
        return this.textContent.length;
    }
}
