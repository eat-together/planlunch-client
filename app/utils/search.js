import Ember from 'ember';
var computed = Ember.computed;
 
export default function search(dependentKey, propertyKey, searchQueryKey, returnEmptyArray) {
  returnEmptyArray = (typeof returnEmptyArray === "undefined") ? false : returnEmptyArray;
  return computed("" + dependentKey + ".@each." + propertyKey, searchQueryKey, function() {
    var items, query;
    if (returnEmptyArray && !this.get(searchQueryKey)) {
      return Ember.A([]);
    }
    
    query = this.get(searchQueryKey) || '';
    query = query.toLowerCase();
    items = this.get(dependentKey) || Ember.A([]);
    
    return items.filter(function(item) {
      if (item.get(propertyKey)) {
        return item.get(propertyKey).toLowerCase().indexOf(query) !== -1;
      }
    });
  });
}
