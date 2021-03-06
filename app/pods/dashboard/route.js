import Ember from 'ember';
import CONFIG from '../../config/environment';
import Place from 'planlunch/models/place';
import placesRawData from 'planlunch/places';
import ajax from 'ic-ajax';

export default Ember.Route.extend({
  init: function() {
    var route = this;

    setInterval(function() {
      route.refresh();
    }, 5 * 60 * 1000);
  },

  model: function() {
    return Ember.$.get(CONFIG.API_URL + 'appointments').then(function(appointments) {
var data = '[out:json];node["amenity"="restaurant"](47.944989,7.746975,48.060045,7.921231);out body;>;out skel qt;'
      return Ember.$.post("http://overpass-api.de/api/interpreter", data).then(function(result) {
        var placesRawData = result.elements.map(function(element) {
          return {
            id: element.id,
            name: element.tags.name,
            geo: [element.lat, element.lon],
            cuisine: element.tags.cuisine,
            distance: Math.round(Math.random()*3000)
          };
        });
        var places = placesRawData.map(function(place) {
          return Place.create(place);
        });


        var sortedPlaces = places.sortBy('distance');
        var half = Math.ceil(sortedPlaces.length / 2);

        return {
          allPlaces: sortedPlaces,
          placesLeft: sortedPlaces.slice(0, half),
          placesRight: sortedPlaces.slice(half, sortedPlaces.length)
        };
      });
    });
  },

  actions: {
    attend: function(time) {
      var route = this;
      return ajax({
        url: CONFIG.API_URL + 'appointments/',
        type: 'POST',
        contentType: 'application/json',
        headers: {
          "Authorization": 'Token token="'+ localStorage.getItem('user.token') + '"'
        },
        data: JSON.stringify({
          place_id: this.get('controller.currentPlaceForModal.id'),
          time: time
        })
      }).then(function() {
        Ember.$('#askTimeModal').modal('hide');
        route.refresh();
      }, function(reason) {
        Ember.$('#askTimeModal').modal('hide');
        if(reason.jqXHR.status === 401) {
          route.set('controller.unauthorized', true);
        }
      });
    },
    withdraw: function() {
      var route = this;
      ajax({
        url: CONFIG.API_URL + 'appointments/1',
        type: 'DELETE',
        headers: {
          "Authorization": 'Token token="'+ localStorage.getItem('user.token') + '"'
        },
        contentType: 'application/json'
      }).then(function() {
        route.refresh();
      }, function(reason) {
        if(reason.jqXHR.status === 401) {
          route.set('controller.unauthorized', true);
        }
      });
    },
    willTransition: function() {
      // modal does not get destroyed properly if transitioning to other route
      Ember.$('.modal-backdrop').remove();
    }
  }
});
