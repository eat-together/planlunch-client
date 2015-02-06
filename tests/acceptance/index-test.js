import Ember from 'ember';
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';
var App, server, appointments;

module('Acceptance - index', {
  setup: function() {
    App = startApp();

    server = new Pretender(function(){
      this.get('appointments/', function() {
        return [200, {"Content-Type": "application/json"}, JSON.stringify(appointments)];
      });
      this.post('appointments/', function(request) {
        var body = JSON.parse(request.requestBody);
        appointments = [{
          place_id: body.appointment.place_id,
          time_slots: [{time: body.appointment.time, users: ['Max']}]
        }];
        return [201];
      });
      this.delete('appointments/', function(request) {
        appointments = [];
        return [200];
      });
    });

  },
  teardown: function() {
    server.shutdown();
    Ember.run(App, App.destroy);
  }
});

test('a user should be able to attend a place', function() {
  expect(1);

  appointments = [];

  visit('/');
  click('div.title-bar:contains("Lila Bar") span');
  click('button:contains("12:00")');
  andThen(function() {
    ok(find('.time-slot:contains("Max")').length === 1, 'expected Max to attend Lila Bar');
  });
});

test('a user should be able to change the place he attends', function() {
  expect(1);
  appointments = [{
    place_id: 1,
    time_slots: [{time: '12:15', users: ['Max']}]
  }];

  visit('/');
  click('div.title-bar:contains("Brasil") span');
  click('button:contains("12:00")');
  andThen(function() {
    ok(find('.time-slot:contains("Max")').length === 1, 'expected to find one row with name Max inside');
  });
});

test('a user should be able to withdraw', function() {
  expect(1);

  appointments = [{
    place_id: 1,
    time_slots: [{time: '12:15', users: ['Max']}]
  }];

  visit('/');
  click('button:contains("Trag mich aus")');
  andThen(function() {
    ok(find('.time-slot:contains("Max")').length === 0, 'did not expected to find any row with name Max inside');
  });
});
