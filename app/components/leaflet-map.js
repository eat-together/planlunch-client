export default Ember.Component.extend({

  classNames: ['leaflet-map'],
  attributeBindings: ['style'],
  style: 'width:630px; height:700px',

  markerRegistry: {},
  markers: [],

  initComponent: function() {
    L.mapbox.accessToken = 'pk.eyJ1IjoicG9nb3BhdWxlIiwiYSI6Il9KNERfQUkifQ.arQkKPM3rfejv_45fNftSA';
    var map = L.mapbox.map(this.get('elementId'), 'pogopaule.j8kopcp9').setView([47.99399997057934, 7.841277122497559], 15);

    _createMarkers();

    _addMarkers(map, this);


  }.on('didInsertElement'),

  placeChanged: function() {
    var place = this.get('hoveredPlace'),
        markerRegistry = this.get('markerRegistry'),
        markers = this.get('markers');

    if(place) {
      markerRegistry[place.name].setIcon(highlightedPlaceMarker);
    } else {
      markers.forEach(function(marker) {
        marker.setIcon(placeMarker);
      });
    }
  }.observes('hoveredPlace')

});

var placeMarker, highlightedPlaceMarker;

function _createMarkers() {
  placeMarker = L.mapbox.marker.icon({
    'marker-size': 'medium',
    'marker-color': '#428bca'
  });
  highlightedPlaceMarker = L.mapbox.marker.icon({
    'marker-size': 'medium',
    'marker-color': '#febc14'
  });
}

function _addMarkers(map, mapComponent) {
  var markerRegistry = mapComponent.get('markerRegistry'),
      markers = mapComponent.get('markers');
  mapComponent.get('places').forEach(function(place) {
    var marker = L.marker(place.geo, {
      icon: placeMarker
    }).addTo(map);

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
