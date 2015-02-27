var path = require('path'),
    childProcess = require('child_process'),
    phantomjs = require('phantomjs'),
    binPath = phantomjs.path,
    childArgs = [
      path.join(__dirname, 'shoot.js'),
      process.argv[2],
      process.argv[3]
    ];

childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
  console.log(arguments);
});
