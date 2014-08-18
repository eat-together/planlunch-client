export default Ember.Component.extend({
  actions: {
    selectPlace: function(place) {
      this.set('selectedPlace', place);
    }
  }
});
