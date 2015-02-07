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
        route.transitionTo('dashboard');
      }, function() {
        // TODO what to do in case of an error?
      });
    }
  }
});
