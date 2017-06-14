'use strict';

function registerHelper(patternlab, Handlebars) {
  Handlebars.registerHelper('responsiveImage', function(options) {
    let html = '';
    let src = patternlab.responsiveImage[options.hash.src];
    let suffix = patternlab.responsiveImage[options.hash.suffix];
    html = src;
    html += ', suffix: ';
    html += suffix;
    /*<img data-interchange="[{{imageName}}-520.jpg, small], [{{imageName}}-980.jpg, medium], [{{imageName}}-1680.jpg, large]">
    responsiveImage.forEach(function(listitem) {
      if (patternlab.config.debug) {
        console.log(listitem);
      }
      html = html + options.fn(listitem)
    })*/
    return html;
  });
}

module.exports = registerHelper;
