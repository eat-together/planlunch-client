/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

app.import('vendor/bootstrap/dist/js/bootstrap.js');
app.import('vendor/bootstrap/dist/css/bootstrap.css');
app.import('vendor/bootstrap/dist/fonts/glyphicons-halflings-regular.woff', {
  destDir: 'fonts'
});

app.import('vendor/leaflet/dist/leaflet.js');
app.import('vendor/leaflet/dist/leaflet.css');
app.import('vendor/leaflet/dist/images/marker-icon.png', {
  destDir: 'assets'
});
app.import('vendor/leaflet/dist/images/marker-shadow.png', {
  destDir: 'assets'
});


module.exports = app.toTree();
