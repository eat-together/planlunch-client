import Ember from 'ember';
import CONFIG from '../../config/environment';
import Place from 'planlunch/models/place';
import placesRawData from 'planlunch/places';

export default Ember.Route.extend({
  init: function() {
    var route = this;

    setInterval(function() {
      route.refresh();
    }, 1 * 60 * 1000);
  },

  model: function() {
    return Ember.$.get(CONFIG.API_URL + 'appointments').then(function(appointments) {
      var places = placesRawData.map(function(place) {
        return Place.create(place);
      });

      appointments.forEach(function(appointment) {
        var place = places.findBy('id', appointment.place_id);
        place.time_slots = appointment.time_slots;
      });

      var sortedPlaces = places.sortBy('distance');
      var half = Math.ceil(sortedPlaces.length / 2);

      return {
        allPlaces: sortedPlaces,
        placesLeft: sortedPlaces.slice(0, half),
        placesRight: sortedPlaces.slice(half, sortedPlaces.length)
      };
    });
  },

  actions: {
    attend: function(time) {
      var route = this;
      Ember.$.ajax({
        url: CONFIG.API_URL + 'appointments/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          appointment: {
            place_id: this.get('controller.currentPlaceForModal.id'),
            user_token: localStorage.getItem('user.token'),
            time: time
          }
        })
      }).then(function() {
        Ember.$('#askTimeModal').modal('hide');
        route.refresh();
      });
    },
    withdraw: function() {
      var route = this;
      Ember.$.ajax({
        url: CONFIG.API_URL + 'appointments/' + localStorage.getItem('user.token'),
        type: 'DELETE',
        contentType: 'application/json'
      }).then(function() {
        route.refresh();
      });
    },
    willTransition: function() {
      // modal does not get destroyed properly if transitioning to other route
      Ember.$('.modal-backdrop').remove();
    }
  }
});
