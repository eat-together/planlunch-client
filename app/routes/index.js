import Ember from 'ember';
import ajax from 'ic-ajax';
import Place from 'planlunch/models/place';
import CONFIG from '../config/environment';

export default Ember.Route.extend({
  init: function() {
    var route = this;

    setInterval(function() {
      route.refresh();
    }, 1 * 60 * 1000);

    Ember.$(document).ajaxError(function(event, request) {
      if (request.responseJSON.message === 'user fails to match the required pattern') {
        localStorage.removeItem('user.name');
        route.transitionTo('askname');
      }
    });
  },

  beforeModel: function() {
    if (!localStorage.getItem('user.name')) {
      this.transitionTo('askname');
    }
  },

  model: function() {
    return ajax(CONFIG.API_URL + 'places').then(function(model) {
      if (model) {
        var places = model.map(function(place) {
          return Place.create(place);
        });
        var sortedModel = places.sortBy('distance'),
            half = Math.ceil(sortedModel.length / 2);
        return {
          allPlaces: sortedModel,
          placesLeft: sortedModel.slice(0, half),
          placesRight: sortedModel.slice(half, sortedModel.length)
        };
      }
      return {
        allPlaces: [],
        placesLeft: [],
        placesRight: []
      };
    });
  },

  actions: {
    attend: function(timeSlot) {
      var route = this;
      Ember.$.post(CONFIG.API_URL + 'places/' + this.get('controller.currentPlaceForModal.name'), {
        user: localStorage.getItem('user.name'),
        time_slot: timeSlot
      }).then(function() {
        Ember.$('#askTimeModal').modal('hide');
        route.refresh();
      });
    },
    withdraw: function() {
      var route = this;
      Ember.$.post(CONFIG.API_URL + 'places', {
        user: localStorage.getItem('user.name'),
        action: 'withdraw'
      }).then(function() {
        route.refresh();
      });
    },
    changeName: function() {
      this.send('withdraw');
      localStorage.removeItem('user.name');
      this.transitionTo('askname');
    },
    willTransition: function() {
      // modal does not get destroyed properly if transitioning to other route
      Ember.$('.modal-backdrop').remove();
    }
  }
});
