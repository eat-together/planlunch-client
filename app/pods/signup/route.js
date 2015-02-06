import Ember from 'ember';
import CONFIG from '../../config/environment';

export default Ember.Route.extend({
  actions: {
    save: function() {
      var route = this;
      Ember.$.ajax({
        url: CONFIG.API_URL + 'users/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          user: {
            name: this.get('controller.name'),
            password: this.get('controller.password')
          }
        })
      }).then(function(responseBody) {
        localStorage.setItem('user.token', responseBody.token);
        route.transitionTo('dashboard');
      }, function(reason) {
        // TODO what to do in case of an error?
      });
    }
  }
});
