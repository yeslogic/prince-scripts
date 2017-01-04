/*
* This script enhances Prince's JS/DOM features to ensure it is
* compatible with the jQuery.emphasis library.
* Usage: run Prince with arguments
*  `--javascript --script compat.js `
* and the file name or URL of a page using jQuery.emphasis.js
*/


// script dependson navigator.language being set
Object.defineProperty(navigator, 'language', {value: 'en'});

// We need to fake a little bit of the CSSOM document.styleSheets API
Object.defineProperty(document, 'styleSheets', {get: function(){
	var elms = document.getElementsByTagName('style'); // Caveat: would normally require LINK rel=stylesheet too
	var result = [];
	for (var el, i=0; el=elms[i]; i++) {
		el.insertRule = function(cssStr) {
			this.textContent += cssStr + '\n';
		}
		el.cssRules = [];
		result.push(el);
	}
	return result;
}});

/*Prince.addEventListener('complete', function(){
	console.log(document.getElementById('example1').innerHTML);
})*/
