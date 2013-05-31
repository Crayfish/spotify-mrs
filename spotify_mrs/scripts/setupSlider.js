require([
  //'$api/models',
  //'$views/image#Image',
  //'$views/popup#Popup'
  'scripts/echonest'
], function(echonest) {
  'use strict';

	
  var setUpPopSlider = function setUpPopSlider(){
	  
	  console.log('SetUpPopSlider() betreten');
		//jQuery Syntax: $(selector).action(), # steht für element with id="slider-range"
		$( "#slider-pop" ).slider({
		//setzen der Slider Attributte	
		range: true,
		min: 0,
		max: 100,
		values: [0, 100 ],
		slide: function( event, ui ) {
		$( "#pop" ).val(  ui.values[ 0 ] + " - " + ui.values[ 1 ] );
		},
		stop: function ( event, ui ) {
			echonest.fetchPlaylist();
		}	
		
		});
		
		$( "#pop" ).val(  $( "#slider-pop" ).slider( "values", 0 ) +
		" - " + $( "#slider-pop" ).slider( "values", 1 ) );
	}
  
  
  var setUpHotslider = function setUpHotSlider(){
	  
	  	console.log('SetUpHotSlider() betreten');
		//jQuery Syntax: $(selector).action(), # steht für element with id="slider-range"
		$( "#slider-hot" ).slider({
		//setzen der Slider Attributte	
		range: true,
		min: 0,
		max: 100,
		values: [0, 100 ],
		slide: function( event, ui ) {
		$( "#hot" ).val(  ui.values[ 0 ] + " - " + ui.values[ 1 ] );
		},
		stop: function ( event, ui ) {
			echonest.fetchPlaylist();
		}	
		
		});
		
		$( "#hot" ).val(  $( "#slider-hot" ).slider( "values", 0 ) +
		" - " + $( "#slider-hot" ).slider( "values", 1 ) );
	}
  
  
  exports.setUpHotSlider = setUpHotslider;
  exports.setUpPopSlider = setUpPopSlider;
 
});
