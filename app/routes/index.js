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
    return ajax(PlanlunchENV.SERVER_URL + 'places').then(function(model) {
      model.forEach(function(place) {
        if (place.users) {
          place.users = place.users.join(', ');
        }
      });
      return model.sortBy('name');
    });
  },

  actions: {
    attend: function(place) {
      var route = this;
      $.post(PlanlunchENV.SERVER_URL + 'places/' + place.name, {
        user: localStorage.getItem('user.name')
      }).then(function() {
        route.refresh();
      });
    },
    withdraw: function() {
      var route = this;
      $.post(PlanlunchENV.SERVER_URL + 'places', {
        user: localStorage.getItem('user.name'),
        action: 'withdraw'
      }).then(function() {
        route.refresh();
      });
    }
  }
});
