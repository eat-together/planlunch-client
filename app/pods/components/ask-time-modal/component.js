import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    attend: function(time) {
      this.sendAction('attend', time);
    }
  }
});
