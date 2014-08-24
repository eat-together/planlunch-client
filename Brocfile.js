/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  fingerprint: {
    exclude: ['icons-000000@2x.png']
  }
});


app.import('vendor/bootstrap/dist/js/bootstrap.js');
app.import('vendor/bootstrap/dist/css/bootstrap.css');
app.import('vendor/bootstrap/dist/fonts/glyphicons-halflings-regular.woff', {
  destDir: 'fonts'
});

app.import('vendor/mapbox.js/mapbox.js');
app.import('vendor/mapbox.js/mapbox.css');


module.exports = app.toTree();
