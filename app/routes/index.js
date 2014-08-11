import ajax from 'ic-ajax';

export default Ember.Route.extend({
  beforeModel: function() {
    if(!localStorage.getItem('user.name')) {
      this.transitionTo('askname');
    }
  },

  model: function() {
    return ajax('http://localhost:8080/places').then(function(model) {
      model.forEach(function(place) {
        if(place.attendees) {
          place.attendees = place.attendees.join(', ');
        }
      });
      return model.sortBy('name');
    });
  },

  actions: {
    attend: function(place) {
      var route = this;
      $.post('http://localhost:8080/places/' + place.name, {
        attendee: localStorage.getItem('user.name')
      }).then(function() {
        route.refresh();
      });
    }
  }
});
