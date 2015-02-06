import Ember from 'ember';
import startApp from '../helpers/start-app';

var application, server;

module('Acceptance - signup', {
  setup: function() {
    application = startApp();

    server = new Pretender(function() {
      this.post('users/', function(request) {
        var payload = JSON.parse(request.requestBody);
        if(payload.user.name === 'foo' && payload.user.password === 'bar') {
          return [201, {"Content-Type": "application/json"}, JSON.stringify({"token": "foobar"})];
        } else {
          return [500];
        }
      });

      this.get('appointments/', function(request) {
        return [200, {"Content-Type": "application/json"}, '[]'];
      });
    });
  },
  teardown: function() {
    server.shutdown();
    Ember.run(application, 'destroy');
  }
});

test('user can create an account', function() {
  visit('/signup');

  fillIn('#name', 'foo');
  fillIn('#password', 'bar');
  click('button');
  andThen(function() {
    equal(currentRouteName(), 'dashboard');
  });
});
