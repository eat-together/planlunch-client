import ajax from 'ic-ajax';

export default Ember.Route.extend({
  init: function() {
    var route = this;
    setInterval(function() {
      route.refresh();
    }, 1* 60 * 1000);
  },

  beforeModel: function() {
    if (!localStorage.getItem('user.name')) {
      this.transitionTo('askname');
    }
  },

  model: function() {
    return ajax('places').then(function(model) {
      if(model) {
        model.forEach(function(place) {
          if (place.hasOwnProperty('time_slots')) {
            place.time_slots.forEach(function(timeSlot) {
              timeSlot = timeSlot.users.join(', ');
            });
          }
        });
        return model.sortBy('name');
      }
      return [];
    });
  },

  actions: {
    attend: function(timeSlot) {
      var route = this;
      $.post('places/' + this.get('currentPlaceForModal.name'), {
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
    setCurrentPlaceForModal: function(place) {
      this.set('currentPlaceForModal', place);
    }
  }
});
