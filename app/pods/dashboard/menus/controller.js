import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['dashboard'],

  actions: {
    selectPlace: function(place) {
      this.get('controllers.dashboard').send('selectPlace', place);
    }
  }
});
