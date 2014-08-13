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
        var user = request.requestBody.split('=')[1];
        if(user && request.params.name === 'Lila Bar') {
          lilaBar.users = [user];
        }
        if(user && request.params.name === 'Brasil') {
          delete lilaBar.users;
          brasil.users = [user];
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
  click('tr:contains("Lila Bar") button');
  andThen(function() {
    ok(find('tr:contains("Max")').length === 1, 'expected to find row with name Max inside');
  });
});

test('a user should be able to change the place he attends', function() {
  expect(1);
  lilaBar.users = ['Max'];

  visit('/');
  click('tr:contains("Brasil") button');
  andThen(function() {
    ok(find('tr:contains("Max")').length === 1, 'expected to find one row with name Max inside');
  });
});

test('a user should be able to withdraw', function() {
  expect(1);
  lilaBar.users = ['Max'];

  visit('/');
  click('button:contains("Trag mich aus")');
  andThen(function() {
    ok(find('tr:contains("Max")').length === 0, 'did not expected to find any row with name Max inside');
  });
});

