import Ember from 'ember';
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';
var App, server, lilaBar, brasil;

module('Acceptance - index', {
  setup: function() {
    App = startApp();
    localStorage.setItem('user.name', 'Max');

    server = new Pretender(function(){
      lilaBar = { name: 'Lila Bar', geo: [47.9939093, 7.8419898], website: 'http://www.lilabar-freiburg.de/karte/mittagstisch/' };
      brasil = { name: 'Brasil', geo: [47.9982693, 7.8362522], website: 'http://www.brasil-freiburg.de/mittagstisch.php' };

      this.get('/places', function(request){
        var all =  JSON.stringify([lilaBar, brasil]);
        return [200, {"Content-Type": "application/json"}, all];
      });

      this.post('/places', function(request) {
        delete lilaBar.users;
        return [200];
      });

      this.post('/places/:name', function(request) {
        var user = request.requestBody.split('&')[0].split('=')[1];
        var time = request.requestBody.split('&')[1].split('=')[1];
        if(user && request.params.name === 'Lila Bar') {
          lilaBar.time_slots = [{time: time, users: [user]}];
        }
        if(user && request.params.name === 'Brasil') {
          delete lilaBar.time_slots;
          brasil.time_slots = [{time: time, users: [user]}];
        }
        return [200];
      });

    });
    server.unhandledRequest = function(verb, path, request) {
      console.error('unhandled: ' + verb + ', ' + path);
    };
  },
  teardown: function() {
    localStorage.clear();
    server.shutdown();
    Ember.run(App, App.destroy);
  }
});

test('a user should be able to attend a place', function() {
  expect(1);

  visit('/');
  click('div:contains("Lila Bar") span');
  click('button:contains("12:00")');
  andThen(function() {
    ok(find('.time-slot:contains("Max")').length === 1, 'expected Max to attend Lila Bar');
  });
});

test('a user should be able to change the place he attends', function() {
  expect(1);
  lilaBar.time_slots = [{time: '12:15', users: ['Max']}];

  visit('/');
  click('div:contains("Brasil") span');
  click('button:contains("12:00")');
  andThen(function() {
    ok(find('.time-slot:contains("Max")').length === 1, 'expected to find one row with name Max inside');
  });
});

test('a user should be able to withdraw', function() {
  expect(1);
  lilaBar.users = ['Max'];

  visit('/');
  click('button:contains("Trag mich aus")');
  andThen(function() {
    ok(find('.time-slot:contains("Max")').length === 0, 'did not expected to find any row with name Max inside');
  });
});

test('show message if nobody is attending any place', function() {
  expect(1);

  visit('/');
  andThen(function() {
    ok(find('div:contains("Es hat sich noch niemand eingetragen.")').length > 0, 'expect to find message that indicates nobody is attending any place yet');
  });
});

test('dont show message if someone is attending a place', function() {
  expect(1);
  lilaBar.time_slots = [{time: '12:00', users: ['Max']}];

  visit('/');
  andThen(function() {
    ok(find('div:contains("Es hat sich noch niemand eingetragen.")').length === 0, 'did not expect to find message that indicates nobody is attending any place yet');
  });
});

