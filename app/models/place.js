export default Ember.Object.extend({
  isNew: function() {
    return this.get('tags') && this.get('tags').contains('new');
  }.property(),

  isHeadquarter: function() {
    return this.get('tags') && this.get('tags').contains('inxmail');
  }.property(),

  hasUsers: function() {
    return this.get('time_slots') && this.get('time_slots').length > 0;
  }.property()
});
