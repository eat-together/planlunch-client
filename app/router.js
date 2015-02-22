import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('dashboard', function() {
    this.route('menus');
    this.route('map');
  });
  this.route("signup");
  this.route("login");
});

export default Router;
