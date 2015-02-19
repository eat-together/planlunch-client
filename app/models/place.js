import Ember from 'ember';

function hasTag(tag) {
  return Ember.computed(function() {
    return this.get('tags') && this.get('tags').contains(tag);
  });
}

export default Ember.Object.extend({
  isNew: hasTag('new'),
  isHeadquarter: hasTag('inxmail'),
  hasChangingLunchSpecials: hasTag('lunch-specials')
});
