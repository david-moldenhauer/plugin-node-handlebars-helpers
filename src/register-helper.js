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
    Handlebars.registerHelper("moduloIf", function(index_count,mod,eq,block) {
        if(parseInt(index_count)%(mod)=== eq){
            return block.fn(this);}
    });
}

module.exports = registerHelper;
