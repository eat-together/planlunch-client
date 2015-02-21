import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    selectPlace: function(place) {
      this.set('currentPlaceForModal', place);
      Ember.$('#askTimeModal').modal('show');
    }
  }
});
