export default Ember.View.extend({
  tagName: 'a',
  attributeBindings: ['href'],
  href: '#',
  isActive: false,
  classNameBindings: ['isActive:active'],

  click: function() {
    this.get('controller').send('attend', this.get('place'));
  },

  mouseEnter: function() {
    this.get('parentView.markerRegistry')[this.get('place.name')].setOpacity(1);
  },
  mouseLeave: function() {
    this.get('parentView.markerRegistry')[this.get('place.name')].setOpacity(0.5);
  }
});
