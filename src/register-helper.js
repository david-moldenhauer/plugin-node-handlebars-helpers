'use strict';
const loremIpsum = require('lorem-ipsum');
const fs = require('fs');

function registerHelper(patternlab, Handlebars) {
    Handlebars.registerHelper("set", function() {
        for(let n in arguments){
            if(arguments[n].hash){
                for (let key in arguments[n].hash) {
                    this[key] = arguments[n].hash[key];
                }
            }
            if(arguments[n].fn){
                try{
                    let object = JSON.parse(arguments[n].fn(this));
                    if(object){
                        for (let key in object) {
                            if(undefined == this[key]){
                                this[key] = object[key];
                            }else{
                                this[key] = Object.assign(this[key], object[key]);
                            }
                        }
                    }
                }catch(error){
                    console.log("\x1b[31m%s\x1b[0m", "there is something wrong with the JSON sent to {{#set}}...{{/set}}\n"+error.toString());
                }
            }
        }
        return '';
    });
    Handlebars.registerHelper("file", function(file, escaped){
        if(fs.existsSync(file)){
            let data = fs.readFileSync(file, "utf8");
            if(escaped === true){
                data = data.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
            }
            return data;
        }else{
            console.log("\x1b[31m%s\x1b[0m", "the file {{file \""+file+"\"}} does not exist\n");
        }

    });
    Handlebars.registerHelper("eitherOr", function() {
        let length = Object.keys(arguments).length;
        let index = 0;
        for(let n in arguments){
            index++;if(index === length){return false;}
            if(arguments[n]){return arguments[n];}
        }
        return false;
    });
    Handlebars.registerHelper("push", function(options) {
        try {
            let target = options.hash.to;
            let replace = options.hash.replace || false;
            let object = JSON.parse(options.fn(this));
            if (replace) {
                for (let i = 0; i < target.length; i++) {
                    if (JSON.stringify(target[i]) == JSON.stringify(object)) {
                        return '';
                    }
                }
            }
            target.push(object);
            options.fn(target);
        }catch(error){
            console.log("\x1b[31m%s\x1b[0m", "there is something wrong with the arguments sent to {{#push}}...{{/push}}\n"+error.toString());
        }
        return '';
    });
    Handlebars.registerHelper("uuid", function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    });
    Handlebars.registerHelper('imgInterchange', function(options) {
        let html = '';
        let src = options.hash.src;
        let classes = options.hash.classes || "";
        let breakpoints = options.hash.breakpoint.split(/[\,\;\| ]+/);
        if(!src || breakpoints.length < 1){
            console.log("\x1b[31m%s\x1b[0m", "there is something wrong with the arguments passed to imgInterchange!\nsrc: "+src+"breakpoints: "+breakpoints.toString());
            return "";
        }
        html += '<img class="'+classes+'" src="'+src.replace(/([^\s]+)(\.)(jpg|png|gif|bmp)$/, '$1-'+breakpoints[0]+'.$3')+'" data-interchange="';
        breakpoints.forEach(function(breakpoint) {
            html += src.replace(/([^\s]+)(\.)(jpg|png|gif|bmp)$/, '[$1-'+breakpoint+'.$3, '+breakpoint+'],');
        });
        html = html.substring(0,html.length-1);
        html += '">';
        return new Handlebars.SafeString(html);
    });
    Handlebars.registerHelper("lorem-ipsum", function(count, units, format, dictionary) {
        if(!dictionary){dictionary = patternlab.config.plugins['plugin-node-handlebars-helpers'].client}
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
    Handlebars.registerHelper("toJson", function(object) {
        return new Handlebars.SafeString(JSON.stringify(object));
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
    Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

        switch (operator) {
            case '==':
                return (v1 == v2) ? options.fn(this) : options.inverse(this);
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '!=':
                return (v1 != v2) ? options.fn(this) : options.inverse(this);
            case '!==':
                return (v1 !== v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        }
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
    Handlebars.registerHelper("contains", function(object, value) {
        return object.indexOf(value) != -1;
    });
}

module.exports = registerHelper;
