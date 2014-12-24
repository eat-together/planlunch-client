import Ember from 'ember';

export default Ember.Controller.extend({

  infoMessage: function() {
    var hasUser = function(place) {
      return place.get('hasUsers');
    };
    return this.get('model').allPlaces.any(hasUser) ? null : 'Es hat sich noch niemand eingetragen. Sei der/die Erste!';
  }.property('model')

});
