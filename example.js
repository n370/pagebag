/**
 * Chrome bookmarks example.
 */

var Pagebag = require('./main.js');
var data = require('./20141022-manga-bookmarks.json');
Pagebag({browser: 'chrome', bookmarks: data});
