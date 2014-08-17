export default Ember.Component.extend({

  classNames: ['places-map'],
  attributeBindings: ['style'],
  style: 'width:630px; height:700px',

  markerRegistry: {},
  markers: [],

  initComponent: function() {
    L.mapbox.accessToken = 'pk.eyJ1IjoicG9nb3BhdWxlIiwiYSI6Il9KNERfQUkifQ.arQkKPM3rfejv_45fNftSA';
    var map = L.mapbox.map(this.get('elementId'), 'pogopaule.j8kopcp9').setView([47.99399997057934, 7.841277122497559], 15);

    _createIcons();

    _addMarkers(map, this);

  }.on('didInsertElement'),

  placeChanged: function() {
    var hoveredPlace = this.get('hoveredPlace'),
        places = this.get('places'),
        markerRegistry = this.get('markerRegistry');

    if(hoveredPlace) {
      var marker = markerRegistry[hoveredPlace.name];
      _setHighlightedMarkerIcon(marker, hoveredPlace);
      marker.setZIndexOffset(1000);
    } else {
      places.forEach(function(place) {
        var marker = markerRegistry[place.name];
        _setMarkerIcon(marker, place);
        marker.setZIndexOffset(0);
      });
    }
  }.observes('hoveredPlace')

});

var placeIcon, highlightedPlaceIcon, inxmailIcon, highlightedInxmailIcon;

function _createIcons() {
  placeIcon = L.mapbox.marker.icon({
    'marker-size': 'medium',
    'marker-color': '#428bca'
  });
  highlightedPlaceIcon = L.mapbox.marker.icon({
    'marker-size': 'medium',
    'marker-color': '#febc14'
  });
  inxmailIcon = L.mapbox.marker.icon({
    'marker-size': 'medium',
    'marker-symbol': 'star',
    'marker-color': '#428bca'
  });
  highlightedInxmailIcon = L.mapbox.marker.icon({
    'marker-size': 'medium',
    'marker-symbol': 'star',
    'marker-color': '#febc14'
  });
}

function _addMarkers(map, mapComponent) {
  var markerRegistry = mapComponent.get('markerRegistry'),
      markers = mapComponent.get('markers');

  mapComponent.get('places').forEach(function(place) {
    var marker = L.marker(place.geo).addTo(map);

    _setMarkerIcon(marker, place);

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

function _setMarkerIcon(marker, place) {
  if(place && place.tags && place.tags.contains('inxmail')) {
    marker.setIcon(inxmailIcon);
  } else {
    marker.setIcon(placeIcon);
  }
}

function _setHighlightedMarkerIcon(marker, place) {
  if(place && place.tags && place.tags.contains('inxmail')) {
    marker.setIcon(highlightedInxmailIcon);
  } else {
    marker.setIcon(highlightedPlaceIcon);
  }
}
