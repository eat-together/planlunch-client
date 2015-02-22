import Ember from 'ember';
import CONFIG from '../../config/environment';
import ajax from 'ic-ajax';

export default Ember.Route.extend({
  actions: {
    save: function() {
      var route = this;
      ajax({
        url: CONFIG.API_URL + 'users/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          user: {
            name: route.get('controller.name'),
            password: route.get('controller.password'),
            email: route.get('controller.email')
          }
        })
      }).then(function(responseBody) {
        localStorage.setItem('user.token', responseBody.token);
        route.controllerFor('dashboard').set('unauthorized', false);
        route.transitionTo('dashboard.menus');
      }, function(reason) {
        var errors = reason.jqXHR.responseJSON.errors;
        var errorMessages = Object.keys(errors).map(function(key) {
          return errors[key];
        });
        route.set('controller.errors', errorMessages);
      });
    }
  }
});
