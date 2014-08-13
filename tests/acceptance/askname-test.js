import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';
var App, server;

module('Acceptance - askname', {
  setup: function() {
    App = startApp();
    localStorage.clear();

    server = new Pretender(function() {
      this.get('/places', function(request) {
        return [200];
      });
    });
  },
  teardown: function() {
    Ember.run(App, App.destroy);
    server.shutdown();
  }
});

test('ask for name if it has not been entered yet', function() {
  expect(3);

  visit('/');
  andThen(function() {
    equal(currentRouteName(), 'askname');
  });
  fillIn('input', 'Max');
  click('button');
  andThen(function() {
    equal(currentRouteName(), 'index');
    equal(localStorage.getItem('user.name'), 'Max');
  });
});

test('redirect to index if name is present and user goes to askname route', function() {
  expect(1);

  localStorage.setItem('user.name', 'Max');
  visit('/askname');
  andThen(function() {
    equal(currentRouteName(), 'index');
  });
});
