import Ember from 'ember';

var Router = Ember.Router.extend({
  location: PlanlunchENV.locationType
});

Router.map(function() {
  this.route('askname');
});

export default Router;
