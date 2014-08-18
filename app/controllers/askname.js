export default Ember.Controller.extend({
  actions: {
    save: function() {
      var name = this.get('name');
      if(!name.match(/^[a-z]{3,4}$/)) {
        this.set('error', 'Das Kürzel hat 3 oder 4 Kleinbuchstaben!');
      } else {
        localStorage.setItem('user.name', this.get('name'));
        this.transitionToRoute('index');
      }
    }
  }
});
