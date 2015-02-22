import Ember from 'ember';
import CONFIG from '../../config/environment';
import ajax from 'ic-ajax';

export default Ember.Route.extend({
  actions: {
    login: function() {
      var route = this;
      return ajax({
        url: CONFIG.API_URL + 'login/',
        type: 'GET',
        contentType: 'application/json',
        headers: {
          "Authorization": this.get('controller.name') + ':' + this.get('controller.password')
        }
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
