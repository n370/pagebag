/**
 * Chrome bookmarks example.
 */

var Pagebag = require('./main.js');
var collection = require('./20141022-manga-bookmarks.json');
Pagebag({source: 'chrome', data: collection});
