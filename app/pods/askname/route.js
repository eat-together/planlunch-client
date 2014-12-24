import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    if(localStorage.getItem('user.name')) {
      this.transitionTo('index');
    }
  }
});
