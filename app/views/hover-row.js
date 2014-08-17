export default Ember.View.extend({
  tagName: 'li',
  isActive: false,
  classNameBindings: ['isActive:highlighted'],

  mouseEnter: function() {
    this.set('controller.highlightedPlace', this.get('place'));
  },
  mouseLeave: function() {
    this.set('controller.highlightedPlace', null);
  },

  highlightedPlaceChanged: function() {
    if(this.get('controller.highlightedPlace.name') === this.get('place.name')) {
      this.set('isActive', true);
    } else {
      this.set('isActive', false);
    }
  }.observes('controller.highlightedPlace')
});
