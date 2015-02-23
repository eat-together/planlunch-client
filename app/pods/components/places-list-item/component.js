import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ['isActive:highlighted'],
  classNames: ['places-list-item'],

  actions: {
    selectPlace: function() {
      this.sendAction('selectPlace', this.get('place'));
    }
  },

  mouseEnter: function() {
    this.set('hoveredPlace', this.get('place'));
  },
  mouseLeave: function() {
    this.set('hoveredPlace', null);
  },

  hoveredPlaceChanged: function() {
    if(this.get('hoveredPlace.name') === this.get('place.name')) {
      this.set('isActive', true);
    } else {
      this.set('isActive', false);
    }
  }.observes('hoveredPlace')
});
