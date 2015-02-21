import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    selectPlace: function(place) {
      this.sendAction('selectPlace', place);
    }
  }
});
