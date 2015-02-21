import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    selectPlace: function(place) {
      this.sendAction('selectPlace', place);
    }
  },

  placesWithMenu: Ember.computed('places', function() {
    return this.get('places').filter(function(place) {
      if(place.get('hasMenuImage')) {
        return place;
      }
    });
  })
});
