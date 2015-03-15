import Ember from 'ember';
import computedSearch from '../../../utils/search';
 

export default Ember.Component.extend({
  searchQuery: null,
  searchResults: computedSearch('model', 'name', 'searchQuery'),

  actions: {
    selectPlace: function(place) {
      this.sendAction('selectPlace', place);
    }
  }
});
