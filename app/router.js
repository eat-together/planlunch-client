import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  console.log("loc:" + Router.location);
  this.route('askname');
});

export default Router;
