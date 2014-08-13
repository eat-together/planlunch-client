export default Ember.View.extend({

  markerRegistry: {},

  initView: function() {
    L.Icon.Default.imagePath = 'assets';
    var map = L.map('map').setView([47.99399997057934, 7.841277122497559], 15);

    L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
      maxZoom: 18,
      id: 'examples.map-i86knfo3'
    }).addTo(map);

    var markerRegistry = this.get('markerRegistry');
    var self = this;
    this.get('controller.model').forEach(function(place) {
      var marker = L.marker(place.geo, {opacity: 0.5}).addTo(map);
      marker.on('mouseover', function() {
        _getView(place.name, self.get('childViews')).set('isActive', true);
      });
      marker.on('mouseout',function() {
        _getView(place.name, self.get('childViews')).set('isActive', false);
      });
      markerRegistry[place.name] = marker;
    });

  }.on('didInsertElement'),

});

function _getView(placeName, childViews) {
  var result;
  childViews.forEach(function(view) {
    if(view.get('place.name') === placeName) {
      result = view;
    }
  });
  return result;
}
