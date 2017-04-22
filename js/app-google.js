var map;
var panorama;
var markers = [];

function initAutocomplete() {
  var defaultLatLng = {lat: 44.0635437, lng: 12.5639284};
  var sv = new google.maps.StreetViewService();

  panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), {
    fullscreenControl: false
  });

  markerSatLat = $( "#js-marker-satellite-lat" ).text( defaultLatLng.lat );
  markerSatLng = $( "#js-marker-satellite-lng" ).text( defaultLatLng.lng );

  // Set up the map.
  map = new google.maps.Map(document.getElementById('map'), {
    center: defaultLatLng,
    zoom: 13,
    streetViewControl: false
  });

  // Set the initial Street View camera to the center of the map
  sv.getPanorama({location: defaultLatLng, radius: 50}, processSVData);

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function(event) {
    searchBox.setBounds(map.getBounds());
  });

  // [START region_getplaces]
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function(event) {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
      console.log('zero');
    }

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();

    places.forEach(function(place) {

      setMapOnAll(null);

      myMarker( place.geometry.location );
      
      if ( typeof place.geometry.viewport === "undefined" ) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);

        $('#js-notification').show().find('.notification-text').text( "Street View data not found for this location" );

      } else {

        bounds.extend(place.geometry.location);

        mapsLatitudine = place.geometry.location.lat();
        mapsLongitudine = place.geometry.location.lng();

        $( "#js-lat" ).text( mapsLatitudine );
        $( "#js-long" ).text( mapsLongitudine );

        markerSatLat = $( "#js-marker-satellite-lat" ).text( mapsLatitudine );
    	  markerSatLng = $( "#js-marker-satellite-lng" ).text( mapsLongitudine );

        sv.getPanorama({location: {lat: mapsLatitudine, lng: mapsLongitudine}, radius: 50}, processSVData);

      }
    });
    map.fitBounds(bounds);
  });
  // [END region_getplaces]
}


function myMarker( locationMarker ) {
  var markerIcon = {
    url: 'https://filippoquacquarelli.it/kessydish/images/satellite.png',
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(32, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(16, 40)
  };

  // Create a marker for each place.
  var marker = new google.maps.Marker({
    map: map,
    icon: markerIcon,
    position: locationMarker,
    draggable: true
  });

  markers.push(marker);

  google.maps.event.addListener(marker, 'dragend', function(){
    markerLat = marker.getPosition().lat();
    markerLng = marker.getPosition().lng();

    new google.maps.StreetViewService().getPanorama({location: {lat: markerLat, lng: markerLng}, radius: 50}, processSVData);

    markerSatLat = $( "#js-marker-satellite-lat" ).text( markerLat );
    markerSatLng = $( "#js-marker-satellite-lng" ).text( markerLng );

  });

}

function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function processSVData(data, status)
{
  if (status === google.maps.StreetViewStatus.OK) {
    var marker = new google.maps.Marker({
      position: data.location.latLng,
      map: map,
      title: data.location.description
    });

    panorama.setPano(data.location.pano);

    panoramaHeading = 45;
    panoramaPitch = 0;

    panorama.setPov({
      heading: panoramaHeading,
      pitch: panoramaPitch
    });

    panorama.setVisible(true);

    marker.addListener('click', function() {
      var markerPanoID = data.location.pano;

      // Set the Pano to use the passed panoID.
      panorama.setPano(markerPanoID);
      panorama.setPov({
        heading: panoramaHeading,
        pitch: panoramaPitch
      });
      panorama.setVisible(true);
    });

    $('#js-notification').hide();
  } else {
    $('#js-notification').show().find('.notification-text').text( "Street View data not found for this location" );
  }
}

function reprocessSVData(panoramaHeading, panoramaPitch) {

    panorama.setPov({
      heading: panoramaHeading,
      pitch: panoramaPitch
    });

    $( "#azimuth_google" ).text( panoramaHeading );
    $( "#elevation_google" ).text( panoramaPitch );
}
