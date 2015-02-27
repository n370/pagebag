# Pagebag


#### Mac OS X
```~/Library/Application\ Support/Google/Chrome/<user_profile>/Bookmarks```  
```<user_profile>``` is a directory where user's specific data are stored.

###### Model
```
[
    {
        roots: {
            other: {
                children: {…}
            }
        }
    }
]
```

###### Mongo shell

db.collection.find()[0].roots.other.children



#### Resources
- [Screen Capture | PhantomJS](http://phantomjs.org/screen-capture.html)
- [Troubleshooting | PhantomJS](http://phantomjs.org/troubleshooting.html)
- [phantomjs/rasterize.js at master · ariya/phantomjs](https://github.com/ariya/phantomjs/blob/master/examples/rasterize.js)
