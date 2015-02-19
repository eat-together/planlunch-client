import { test, module } from 'qunit';
import Place from 'planlunch/models/place';

module('Unit - Place');

test('isNew returns true if new tag is present', function(assert) {
  assert.expect(2);

  assert.ok(Place.create({tags: ['new']}).get('isNew'));
  assert.ok(Place.create({tags: ['new', 'foo']}).get('isNew'));
});

test('isNew returns false if new tag is not present', function(assert) {
  assert.expect(3);

  assert.ok(!Place.create({tags: ['foo']}).get('isNew'));
  assert.ok(!Place.create({tags: []}).get('isNew'));
  assert.ok(!Place.create().get('isNew'));
});

test('hasChangingLunchSpecials returns true if lunch-special tag is present', function(assert) {
  assert.expect(1);

  assert.ok(Place.create({tags: ['lunch-specials']}).get('hasChangingLunchSpecials'));
});
