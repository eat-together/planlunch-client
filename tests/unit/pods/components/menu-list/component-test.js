import {
  moduleForComponent,
  test
}
from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('menu-list');

test('it shows images of places with menuImageUrl property', function(assert) {
  assert.expect(1);

  var places = [{
    menuImageUrl: 'http://cdn.grumpycats.com/wp-content/uploads/2014/04/100percent-unimpressed.jpg'
  }, {
    menuImageUrl: 'http://cdn.grumpycats.com/wp-content/uploads/2014/04/100percent-unimpressed.jpg'
  }, {
    foo: 'bar'
  }];

  var component = this.subject();
  Ember.run(function(){
    component.set('places', places);
  });

  var $component = this.render();
  assert.equal($component.find('img').length, 2);
});
