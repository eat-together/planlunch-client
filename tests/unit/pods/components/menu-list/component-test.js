import {
  moduleForComponent,
  test
}
from 'ember-qunit';
import Ember from 'ember';
import Place from 'planlunch/models/place';

moduleForComponent('menu-list', {
  needs: ['component:menu-list-item']
});

test('it shows images of places with menu-image tag', function(assert) {
  assert.expect(1);

  var places = [
    Place.create({
      id: 1,
      tags: ['menu-image']
    }),
    Place.create({
      id: 2,
      tags: ['menu-image']
    }),
    Place.create({
      id: 3,
      tags: ['foobar']
    })
  ];

  var component = this.subject();
  Ember.run(function(){
    component.set('places', places);
  });

  var $component = this.render();
  assert.equal($component.find('.menu-list-item').length, 2);
});
