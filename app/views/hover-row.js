export default Ember.View.extend({
  tagName: 'li',
  isActive: false,
  classNameBindings: ['isActive:active'],

  //mouseEnter: function() {
    //this.get('parentView.markerRegistry')[this.get('place.name')].setOpacity(1);
  //},
  //mouseLeave: function() {
    //this.get('parentView.markerRegistry')[this.get('place.name')].setOpacity(0.5);
  //}
});
