(function(module, require) {
  'use strict';
  var Pageres = require('pageres');
  var driver = new Pageres({delay: 5});

  module.exports = PageBag;

  function PageBag(collection) {
    var destination = __dirname + '/pagebag/' + collection.source;
    var collector = setupCollectorWith(driver);
    var sources = {
      chrome: {
        collectPages: function collectPages(collection) {
          var item;

          for(item in collection) {
            if(collection.hasOwnProperty('children')) {
              lookInsideChildren(collection.children);
            } else {
              this.collectPages(collection[item]);
            }
          }

          function lookInsideChildren(children) {
            children.forEach(function (child) {
              if(child.hasOwnProperty('children')) {
                lookInsideChildren(child.children);
              } else if(child.hasOwnProperty('url')) {
                console.log('Collecting:', child.url);
                // collector.getPage('child.url');
              }
            });
          }
        }
      }
    };

    if (collection.hasOwnProperty('sources') &&
      collection.sources instanceof Array) {
        collection.sources.forEach(function(source) {
          if (typeof source === 'string') {
            sources[source].collectPages(collection.data.roots);
          }
        });
    }

    if (collection.hasOwnProperty('source')) {
      sources[collection.source].collectPages(collection.data.roots);
    }

    driver
      .run(function (err) {
        if (err) { return; }
        console.log('All pages were successfully collected.');
      });

    function setupCollectorWith(driver) {
      return {
        getPage: function getPage(url) {
          driver
            .src(url,['1920x1200'])
            .dest(destination);
        }
      };
    }
  }
}(module, require));
