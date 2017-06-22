'use strict';

function registerHelper(patternlab, Handlebars) {
    Handlebars.registerHelper('imgInterchange', function(options) {
        let html = '';
        let src = options.hash.src;
        let breakpoints = options.hash.breakpoint.split(/[\,\;\| ]+/);
        html += '<img data-interchange="';
        breakpoints.forEach(function(breakpoint) {
            html += src.replace(/([^\s]+)(\.)(jpg|png|gif|bmp)$/, '[$1-'+breakpoint+'.$3, '+breakpoint+'],');
        });
        html = html.substring(0,html.length-1);
        html += '">';
        return new Handlebars.SafeString(html);
    });
    Handlebars.registerHelper("mod", function(index_count,modulo) {
        return index_count % modulo;
    });
    Handlebars.registerHelper("eq", function(item1, item2) {
        if(item1 == item2){
            return true;
        }
        return false
    });
    Handlebars.registerHelper("ne", function(item1, item2) {
        if(item1 != item2){
            return true;
        }
        return false
    });
    Handlebars.registerHelper("gt", function(item1, item2) {
        if(item1 > item2){
            return true;
        }
        return false
    });
    Handlebars.registerHelper("lt", function(item1, item2) {
        if(item1 < item2){
            return true;
        }
        return false
    });
    Handlebars.registerHelper("le", function(item1, item2) {
        if(item1 <= item2){
            return true;
        }
        return false
    });
    Handlebars.registerHelper("ge", function(item1, item2) {
        if(item1 >= item2){
            return true;
        }
        return false
    });
}

module.exports = registerHelper;
