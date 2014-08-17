export default Ember.Component.extend({

  classNames: ['leaflet-map'],
  attributeBindings: ['style'],
  style: 'width:630px; height:700px',

  markerRegistry: {},
  markers: [],

  initComponent: function() {
    L.Icon.Default.imagePath = 'assets';
    var map = L.map(this.get('elementId')).setView([47.99399997057934, 7.841277122497559], 15);

    L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
      maxZoom: 18,
      id: 'examples.map-i86knfo3'
    }).addTo(map);

    _addMarkers(map, this);


  }.on('didInsertElement'),

  placeChanged: function() {
    var place = this.get('hoveredPlace'),
        markerRegistry = this.get('markerRegistry'),
        markers = this.get('markers');

    if(place) {
      markerRegistry[place.name].setOpacity(1);
    } else {
      markers.forEach(function(marker) {
        marker.setOpacity(0.5);
      });
    }
  }.observes('hoveredPlace')

});

function _addMarkers(map, mapComponent) {
  var markerRegistry = mapComponent.get('markerRegistry'),
      markers = mapComponent.get('markers');
  mapComponent.get('places').forEach(function(place) {
    var marker = L.marker(place.geo, {opacity: 0.5}).addTo(map);
    marker.on('mouseover', function() {
      mapComponent.set('hoveredPlace', place);
    });
    marker.on('mouseout',function() {
      mapComponent.set('hoveredPlace', null);
    });
    markerRegistry[place.name] = marker;
    markers.push(marker);
  });
}
