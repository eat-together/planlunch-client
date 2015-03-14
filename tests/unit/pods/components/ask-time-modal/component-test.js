import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('ask-time-modal');

test('it sends action to target object when time is clicked', function(assert) {
  assert.expect(1);

  var component = this.subject();
  var $component = this.append();

  var targetObject = {
    externalAction: function(time) {
      assert.equal(time, '12:15');
    }
  };

  component.set('attend', 'externalAction');
  component.set('targetObject', targetObject);

  $component.find('button:contains("12:15")').click();
});

test('it shows name of place in modal title', function(assert) {
  assert.expect(1);

  var component = this.subject();
  Ember.run(function() {
    component.set('place', {name: 'foobar'});
  });
  var $component = this.append();
  assert.ok($component.find('.modal-title').text().indexOf('foo') >= 0);
});
