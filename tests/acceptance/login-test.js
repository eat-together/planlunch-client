import Ember from 'ember';
import { test, module } from 'qunit';
import startApp from '../helpers/start-app';

var application, server;

module('Acceptance - login', {
  setup: function() {
    application = startApp();

    server = new Pretender(function() {
      this.get('login/', function(request) {
        var credentials = request.requestHeaders.Authorization;
        if(credentials.split(':')[0] === 'foo' && credentials.split(':')[1] === 'bar') {
          return [200, {"Content-Type": "application/json"}, JSON.stringify({"token": "foobar"})];
        } else {
          return [401];
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

test('user can log in', function(assert) {
  assert.expect(1);

  visit('/login');

  fillIn('#name', 'foo');
  fillIn('#password', 'bar');
  click('button');
  andThen(function() {
    assert.equal(currentRouteName(), 'dashboard.menus');
  });
});
