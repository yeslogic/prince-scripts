/*
* This script makes moment.js work better in Prince by providing temporary
* workarounds for some API methods Price has not implemented yet as of April 2020.
* Usage: call Prince with arguments
*   --javascript --script compat.js
* and the file name or URL of a page using Momentjs.
*
* Note: you may want to customize the value returned by getTimezoneOffset ..
*/

if (!Date.prototype.getTimezoneOffset)Date.prototype.getTimezoneOffset = function(){ return 240 }
