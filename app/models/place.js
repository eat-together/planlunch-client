import Ember from 'ember';

function hasTag(tag) {
  return Ember.computed(function() {
    return this.get('tags') && this.get('tags').contains(tag);
  });
}

export default Ember.Object.extend({
  isNew: hasTag('new'),
  isHeadquarter: hasTag('inxmail'),
  hasChangingLunchSpecials: hasTag('lunch-special')

  hasUsers: function() {
    return this.get('time_slots') && this.get('time_slots').length > 0;
  }.property(),
});
