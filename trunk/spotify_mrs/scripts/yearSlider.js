require([
  '$api/models'

], function(models) {
  'use strict';
  
  var setupYearSlider = function setupYearSlider(){
	  setupYearSlider1();
  }
  
  var addYear = function addYear(track){
	  addYear1(models, track);
  }
  
  exports.addYear = addYear;
  exports.setupYearSlider = setupYearSlider;
  
});//end require

/**********************************************************************************************************************/
	/**minimum and maximum years in the collection (temporary playlist)*/
	var min = 2013;
	var max = 1900;

	/**selected minimum and maximum year values*/
	var minvalue = 2013;
	var maxvalue = 2013;
	
	var slider;
	
	
	function setupYearSlider1(){
		console.log('setting up yearslider');
		
		slider = $( "#yearSlider" ).slider({
	       
			range: true,
			min: 2012,
			max: 2013,
			step:1,
			

	        slide: function( event, ui ) {
	        	$( "#amount" ).val(ui.values[ 0 ] + " - " + ui.values[ 1 ] );
	        },
	       
	        stop: function ( event, ui ) {
	        }
	       
	    });
		$( "#amount" ).val( $( "#yearSlider" ).slider( "values", 0 ) +
			      " - " + $( "#yearSlider" ).slider( "values", 1 ) );
	}

	function addYear1(models, track){
		track.load('album').done(function(){
			track.album.load('date').done(function(){
				var year = track.album.date;
				console.log("track release year: "+year);
				if(year > max){
					max = year;
					//slider.slider("option", "max", max);
				}
				
				else if (year < min){
					min = year;
					slider.slider("option", "min", min);
				}
				
				$( "#amount" ).val(min+" - "+ max);
				console.log("min year: "+min+" max year: "+max);
			});
			
		});
	}

