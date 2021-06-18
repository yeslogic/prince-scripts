/*
* This script makes highchart.js work better in Prince
* Usage: call Prince with arguments
*   --javascript --script compat.js
* and the file name or URL of a page using Highchart.
*/

/*
* Just to satisfy the "do you SVG?" test, which is
* !!y.createElementNS(Ia, "svg").createSVGRect
* Note: it should be defined on a more specific interface than Element
*/
var intrface = typeof SVGSVGElement !== 'undefined' ? window.SVGSVGElement : Element;
if(!intrface.prototype.createSVGRect) {
    intrface.prototype.createSVGRect = function () {
        return document.createElementNS("http://www.w3.org/2000/svg", "rect");
    }
}

/*
* Lack of offsetHeight/Width support - there is no real workaround..
* This hack just assumes that each character in a string will add around 8 px
* to its width.
* 2019-07-16: try to add multiline support when jQuery is available.
* This works best when 'useHTML' is enabled for labels etc.
*/
function get_multiline_maxwidth(node) {
    if(jQuery === undefined) {
        return node.textContent.length;  // fallback without jQuery
    }
    var newline_tags = /(<\/h\d>|<\/p>|<br>)/,  // HTML tags which indicates a newline (blocked elements endtag also needed)
        html = jQuery(node).html(),
        txt_length = 0;
    html.split(newline_tags).forEach(function(line) {
        var txt = line.replace(/<[^>]*>?/gm, '');
        if(txt.length > txt_length) txt_length = txt.length;  // determine longest line
    });
    return txt_length;
}

Object.defineProperty(Element.prototype, 'offsetWidth', {
    get: function(){
        //console.log('Wants offsetWidth of ' + this + ', ' + this.textContent);
        var txtWidth = get_multiline_maxwidth(this);
        return parseInt(txtWidth * 8, 10);
    }
});

/*
* Similar precautions for offsetHeight: we assume a single-line element and return
* a fairly typical height - 18px.
*/
Object.defineProperty(Element.prototype, 'offsetHeight', {
    get: function(){
        //console.log('Wants offsetHeight of ' + this + ', ' + this.textContent);
        return 18;
    }
});

// Prince lacks setInterval support
if(!window.setInterval) {
    window.setInterval = setTimeout;
}

// These are defined to avoid an apparently harmless error message
if(!('pageXOffset' in window)) {
    window.pageXOffset = 0;
    window.pageYOffset = 0;
}

// MAX_VALUE support coming to Prince Oct-2016, until then..
if(!Number.MAX_VALUE)Number.MAX_VALUE = 1.7976931348623157e+308;

/*
* Drastic hack: disable 'animation'
* To make graphs render OK in Prince, the Highcharts JS must not animate
* the graphs when it starts rendering them. The author of a web page
* using Highcharts can configure this by setting
* plotOptions.series.animation
* to false - like this in the configuration object passed to the
* highcharts method:
*
        plotOptions: {
            series: {
                animation: false
            }
        }
* The hack below will return "false" for *any* property named
* animation, anywhere. This is a brute-force hack that might
* affect other, non-Highchart JS too.
*/
Object.defineProperty(Object.prototype, 'animation', {
 set: function(value){},
 get: function(){return false}
});
