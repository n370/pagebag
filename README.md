### Pagebag
Pagebag is a small application that helps you build a cross-browser visual catalogue of your bookmarked webpages.

#### Chrome
##### Mac OS X
On Mac OS X look for your bookmarks raw data in JSON format inside ```~/Library/Application\Support/Google/Chrome/<user_profile>/Bookmarks```.  

```<user_profile>``` is the directory where data associated with your chrome user profile are stored.  

### Example
Assuming you copied your bookmarks.json to the root of this repo.

```js
// ./example.js

var Pagebag = require('./main.js');
var data = require('./bookmarks.json');
Pagebag({browser: 'chrome', bookmarks: data});
```

Npm install pagebag dependencies and execute the example.

```bash
>_ npm install && node example
```
