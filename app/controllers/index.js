export default Ember.Controller.extend({

  infoMessage: function() {
    var hasUser = function(place) {
      return place.time_slots && place.time_slots.length > 0;
    };
    return this.get('model').allPlaces.any(hasUser) ? null : 'Es hat sich noch niemand eingetragen. Sei der/die Erste!';
  }.property('model')

});
