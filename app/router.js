import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('dashboard', function() {
    this.route('map');
    this.route('menus');
  });
  this.route("signup");
  this.route("login");
});

export default Router;
