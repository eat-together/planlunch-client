import Ember from 'ember';

export default Ember.Object.extend({
  isNew: function() {
    return this.get('tags') && this.get('tags').contains('new');
  }.property(),

  isHeadquarter: function() {
    return this.get('tags') && this.get('tags').contains('inxmail');
  }.property(),

  hasUsers: function() {
    return this.get('time_slots') && this.get('time_slots').length > 0;
  }.property(),

  hasChangingLunchSpecials: function() {
    return this.get('tags') && this.get('tags').contains('lunch-specials');
  }.property(),

  timeSlots: function() {
    if(this.get('time_slots')) {
      return this.get('time_slots').map(function(timeSlot) {
        return {
          time: timeSlot.time,
          users: timeSlot.users.join(', ')
        };
      });
    } else {
      return [];
    }
  }.property()
});
