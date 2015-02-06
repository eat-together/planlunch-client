import { test } from 'ember-qunit';
import Place from 'planlunch/models/place';

module('Unit - Place');

test('isNew returns true if new tag is present', function() {
  expect(2);

  ok(Place.create({tags: ['new']}).get('isNew'));
  ok(Place.create({tags: ['new', 'foo']}).get('isNew'));
});

test('isNew returns false if new tag is not present', function() {
  expect(3);

  ok(!Place.create({tags: ['foo']}).get('isNew'));
  ok(!Place.create({tags: []}).get('isNew'));
  ok(!Place.create().get('isNew'));
});
