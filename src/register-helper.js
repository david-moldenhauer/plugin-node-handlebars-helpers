'use strict';
var loremIpsum = require('lorem-ipsum');

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
    Handlebars.registerHelper("lorem-ipsum", function(count, units, format, dictionary) {
        if(!units || !(units == 'words' || units == 'sentences' || units == 'paragraphs')){
            units = 'paragraphs';
        }if(!format || !(format == 'plain' || format == 'html')){
            format = 'html';
        }if(dictionary == 'bacon'){
            dictionary = require('./lorem-ipsum-dictionaries/bacon.js').words;
        }else if(dictionary == 'starwars'){
            dictionary = require('./lorem-ipsum-dictionaries/starwars.js').words;
        }else if(dictionary == 'bmw'){
            dictionary = require('./lorem-ipsum-dictionaries/bmw.js').words;
        }else{
            dictionary = false;
        }
        count = parseInt(count) || 1;
        let output = loremIpsum({count:parseInt(count), units:units, format:format, words:dictionary});
        return new Handlebars.SafeString(output);
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
    Handlebars.registerHelper("random", function(quantifier) {
        return parseInt(Math.random()*quantifier);
    });
    Handlebars.registerHelper("add", function(value1, value2) {
        return parseInt(value1+value2);
    });
    Handlebars.registerHelper("subtract", function(value1, value2) {
        return parseInt(value1-value2);
    });
}

module.exports = registerHelper;
