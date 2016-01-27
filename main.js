(function(module, require) {
  'use strict';
  // https://github.com/sindresorhus/pageres/issues/178#issuecomment-127375281
  require('events').EventEmitter.defaultMaxListeners = Infinity;

  var Pageres = require('pageres');

  module.exports = PageBag;

/**
 * PageBag v0.1.0
 *
 * @function PageBag
 * @summary Access web pages and capture full rendered static images of them.
 *          TODO Store binary data with other properties of each page.
 *
 * @param {Object|Object[]} source - A source object or an array of source objects.
 * @param {string} source.browser|source[].browser - A browser name.
 * @param {Object} source.bookmarks|source[].bookmarks - A JSON object containing this browser bookmark data.
 */

  function PageBag(source) {
    var basePath = __dirname + '/pagebag/';
    var bag = [];
    var sources = {
      chrome: {
        collectPages: collectPages,
        collectPageImages: collectPageImages
      }
    };

    initialize(source);

    function initialize(source) {
      if (source instanceof Array) {
        source.forEach(function(source) {
          if(source.browser === 'chrome') {
            sources.chrome.collectPages(source.bookmarks.roots);
          }
        });
      } else if (source.hasOwnProperty('browser')) {
        if(source.browser === 'chrome') {
          sources.chrome.collectPages(source.bookmarks.roots);
        }
      }

      // Collect images and save to bag.
      sources[source.browser].collectPageImages(bag, basePath + source.browser);
    }


    function collectPages(bookmarks) {
      var item;

      for(item in bookmarks) {
        if(bookmarks.hasOwnProperty('children')) {
          lookInsideChildren(bookmarks.children);
        } else {
          this.collectPages(bookmarks[item]);
        }
      }

      // Inside collectPages. Recurse into array objects looking for urls.
      function lookInsideChildren(children) {
        children.forEach(function forEachChild(child) {
          if (child.hasOwnProperty('children')) {
            lookInsideChildren(child.children);
          } else if (child.hasOwnProperty('url')) {
            bag.push({title: child.name, url: child.url});
            console.log(child.url, 'successfully collected.');
          }
        });
      }
    }

    function collectPageImages(bag, destination) {
      bag.map(function(page){
        return new Pageres({ delay: 5, crop: false }).src(page.url,['1920x1200']).dest(destination).run();
      });

      Promise.all(bag).then(() => console.log('All images were successfully collected.'));
    }
  }
}(module, require));
