

function azimuth(satlong,eslat,eslong) {

  longdiffr=(eslong-satlong)/57.29578;

  esazimuth=180+57.29578*Math.atan(Math.tan(longdiffr)/Math.sin((eslat/57.29578)));

  if (eslat<0) esazimuth=esazimuth-180;

  if (esazimuth<0) esazimuth=esazimuth+360.0;

  return esazimuth;
}

function elevation(satlong,eslat,eslong) {

  longdiffr=(eslong-satlong)/57.29578;

  eslatr=eslat/57.29578;

  r1=1+35786/6378.16;

  v1=r1*Math.cos(eslatr)*Math.cos(longdiffr)-1;

  v2=r1*Math.sqrt(1-Math.cos(eslatr)*Math.cos(eslatr)*Math.cos(longdiffr)*Math.cos(longdiffr));

  eselevation=57.29578*Math.atan(v1/v2);

  return eselevation;
}

function tilt(satlong,eslat,eslong) {

	longdiffr=(satlong-eslong)/57.29578;

	eslatr=eslat/57.29578;

	poltilt=-57.29578*Math.atan(Math.sin(longdiffr)/Math.tan(eslatr));

	return poltilt;
}

function computeform() {

    eselevation = elevation(longitudineSatelliteValue,mapsLatitudine,mapsLongitudine);

    esazimuth   = azimuth(longitudineSatelliteValue,mapsLatitudine,mapsLongitudine);

    gradiIncrement = parseInt( $('#gradi-elevation').val() );

    //poltilt     = tilt     (longitudineSatelliteValue,mapsLatitudine,mapsLongitudine);

    $( "#elevation" ).text( eselevation );
    $( "#azimuth" ).text( esazimuth );

    $( "#js-view-details-elevation" ).text( eselevation );
    $( "#js-view-details-azimuth" ).text( esazimuth );

    reprocessSVData( esazimuth, eselevation + gradiIncrement );

    return;
}

$( "#js-calcAziElev" ).click(function() {
  if( typeof mapsLatitudine === 'undefined' || mapsLatitudine === null ){

      $('#js-notification').show().find('.notification-text').text( "Select a destination in the search bar" );
    } else {
      computeform();
    }


  $('#js-mirino').addClass('in');

  setTimeout(function(){
    $('#js-mirino').removeClass('in');
  }, 10000);
});
