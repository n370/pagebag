debugger;
var system = require('system'),
    args = system.args,
    page = phantomjs.page.create();

page.open(args[1], function() {
  page.render(args[2]);
  phantom.exit();
}
