import Ember from 'ember';
import { test, module } from 'qunit';
import startApp from '../helpers/start-app';

var application, server;

module('Acceptance - signup', {
  setup: function() {
    application = startApp();
  },
  teardown: function() {
    server.shutdown();
    Ember.run(application, 'destroy');
  }
});

test('user can create an account', function(assert) {
  assert.expect(1);

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

  visit('/signup');

  fillIn('#name', 'foo');
  fillIn('#password', 'bar');
  fillIn('#email', 'foo@bar.invalid');
  click('button');
  andThen(function() {
    assert.equal(currentRouteName(), 'dashboard.menus');
  });
});

test('user can not create an account if an user with that name already exists', function(assert) {
  assert.expect(1);

  var errors = {errors: {name: 'foobar'}};
  server = new Pretender(function() {
    this.post('users/', function(request) {
      return [422, {"Content-Type": "application/json"}, JSON.stringify(errors)];
    });
  });
  visit('/signup');

  fillIn('#name', 'foo');
  fillIn('#password', 'bar');
  fillIn('#email', 'foo@bar.invalid');
  click('button');
  andThen(function() {
    assert.equal(find('.alert-danger').text(), 'foobar');
  });
});
