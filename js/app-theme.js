
function satelliteLong() {

	$( "#satellite" ).change(function() {

	    var longitudineSatelliteText = $("#satellite option:selected").text();
	    longitudineSatelliteValue = $("#satellite option:selected").val();

	    $( "#satellite option:selected" ).each(function() {
	    	longitudineSatelliteValue;
	    });

	    $( "#namesat" ).text( longitudineSatelliteText );
	    $( "#longsat" ).text( longitudineSatelliteValue );
	}).trigger( "change" );
}

function debug() {
	$('body').on('keydown', function(event) {
		if (event.which == 68 && event.ctrlKey && event.altKey) {
		    $('#debug').find('.debug__body').addClass('is-visible');
		    $('#debug').find('.fade').addClass('in');
		}
	});

	$( "#js-debug__close" ).click(function() {
		$('#debug').find('.debug__body').removeClass('is-visible');
		$('#debug').find('.fade').removeClass('in');
	});
}

function buttonVisibleBox( button, box, toggle ) {
	$( button ).click(function() {
    	if( toggle == false ){
			$( box ).addClass('is-visible');
        } else if( toggle == true ) {
        	$( box ).toggleClass('is-visible');
        }
	});
}

function notification() {
	var btnClose = $('#js-notification').find('.btn-close');

	btnClose.click(function() {
		$('#js-notification').hide();
	});
}

function gmapResize() {
	if ($(window).width() < 768) {
		$('#map').css({
	    	'width': '0px',
	    	'height': '0px',
	    });

		$('#js-gmap-resize').click( function() {
	        var toggleWidth = $("#map").width() == 280 ? "0px" : "280px";
	        var toggleHeight = $("#map").height() == 160 ? "0px" : "160px";
	        $('#map').css({
	        	'width': toggleWidth,
	        	'height': toggleHeight,
	        });
	    });
	} else if ( $(window).width() > 767 && $(window).width() < 1025 ){
		$('#map').css({
	    	'width': '0px',
	    	'height': '0px',
	    });

		$('#js-gmap-resize').click( function() {
	        var toggleWidth = $("#map").width() == 480 ? "0px" : "480px";
	        var toggleHeight = $("#map").height() == 480 ? "0px" : "480px";
	        $('#map').css({
	        	'width': toggleWidth,
	        	'height': toggleHeight,
	        });
	    });
	}
}

function reset()
{
	$('#js-input-reset').css('display', 'none');
  $('input[type=text]').val('');
}

$( document ).ready(function() {
	satelliteLong();
    debug();
    buttonVisibleBox( '#js-view-details', '#js-container-view-details', toggle = true );
	buttonVisibleBox( '#js-view-info__button', '#js-view-info', toggle = true );
    notification();
    gmapResize();

		$('#pac-input').keyup(function()
		{
			if( $(this).val().length > 0 )
			{
				inputReset = $('#js-input-reset');

				inputReset.css('display', 'block');

				inputReset.click( function() {
					reset();
				});
			}
		});
});

$( window ).load(function() {
});
