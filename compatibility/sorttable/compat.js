/*
* This script makes sorttables.js by Stuart Langridge work better in Prince
* Usage: call Prince with arguments
*   --javascript --script compat.js
* and the file name or URL of a page using Highchart.
*/

/*
* Helper method to filter getElementsByTagName() output
*/
function onlyDirectChildren(node, collection){
	var theChildren = [];
	for(var i = 0; i < collection.length; i++){
		if(collection[i].parentNode === node)theChildren.push(collection[i]);
	}
	return theChildren;
}

/*
* Fake support for some DOM properties Prince is missing:
*    x HTMLTableElement.rows
*    x HTMLTableSectionElement.rows
*    x HTMLTableElement.tHead
*    x HTMLTableElement.tBodies
*    X HTMLTableRowElement.cells
*/

if(!('rows' in HTMLTableElement.prototype))Object.defineProperty(
	HTMLTableElement.prototype,
	'rows',
	{

		get: function(){
			return onlyDirectChildren(this, this.getElementsByTagName('tr'));
		}
	}

);

if(!('rows' in HTMLTableSectionElement.prototype))Object.defineProperty(
	HTMLTableSectionElement.prototype,
	'rows',
	{

		get: function(){
			return onlyDirectChildren(this, this.getElementsByTagName('tr'));
		}
	}

);

if(!('tBodies' in HTMLTableElement.prototype))Object.defineProperty(
	HTMLTableElement.prototype,
	'tBodies',
	{

		get: function(){
			return onlyDirectChildren(this, this.getElementsByTagName('tbody'));
		}
	}

);

if(!('tHead' in HTMLTableElement.prototype))Object.defineProperty(
	HTMLTableElement.prototype,
	'tHead',
	{

		get: function(){
			return onlyDirectChildren(this, this.getElementsByTagName('thead'))[0];
		}
	}

);

if(!('cells' in HTMLTableRowElement.prototype))Object.defineProperty(
	HTMLTableRowElement.prototype,
	'cells',
	{

		get: function(){
			return onlyDirectChildren(this, this.querySelectorAll('th,td'));
		}
	}

);
