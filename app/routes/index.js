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
          if (place.users) {
            place.users = place.users.join(', ');
          }
        });
        return model.sortBy('name');
      }
      return [];
    });
  },

  actions: {
    attend: function(place) {
      var route = this;
      $.post('places/' + place.name, {
        user: localStorage.getItem('user.name')
      }).then(function() {
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
    }
  }
});
