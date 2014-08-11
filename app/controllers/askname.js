export default Ember.Controller.extend({
  actions: {
    save: function() {
      localStorage.setItem('user.name', this.get('name'));
      this.transitionToRoute('index');
    }
  }
});
