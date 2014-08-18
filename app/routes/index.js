import ajax from 'ic-ajax';

export default Ember.Route.extend({
  init: function() {
    var route = this;

    setInterval(function() {
      route.refresh();
    }, 1 * 60 * 1000);

    $(document).ajaxError(function(event, request) {
      if (request.responseJSON.message === 'user contains an invalid value') {
        localStorage.removeItem('user.name');
        route.controllerFor('askname').set('haha', true);
        route.transitionTo('askname');
      }
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
    return ajax('places').then(function(model) {
      if (model) {
        model.forEach(function(place) {
          if (place.hasOwnProperty('time_slots')) {
            place.time_slots.forEach(function(timeSlot, i) {
              place.time_slots[i].users = timeSlot.users.join(', ');
            });
          }
        });
        var sortedModel = model.sortBy('name'),
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
    markerMouseOver: function() {
      console.log("mouse over!");
    },
    markerMouseOut: function() {
      console.log("mouse out!");
    },
    attend: function(timeSlot) {
      var route = this;
      $.post('places/' + this.get('controller.currentPlaceForModal.name'), {
        user: localStorage.getItem('user.name'),
        time_slot: timeSlot
      }).then(function() {
        $('#askTimeModal').modal('hide');
        route.refresh();
      });
    },
    withdraw: function() {
      var route = this;
      $.post('places', {
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
      $('.modal-backdrop').remove();
    }
  }
});
