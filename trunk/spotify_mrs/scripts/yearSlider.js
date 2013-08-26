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
		//$("#yearto").val(max);
		//$("#yearfrom").val(min);
		
	}

	function addYear1(models, track){
		track.load('album').done(function(){
			track.album.load('date').done(function(){
				var year = track.album.date;
				console.log("track release year: "+year);
				max = Math.max(max,year);
				min = Math.min(min,year);
				
				//$("#yearto").val(max);
				//$("#yearfrom").val(min);
				
			});
			
		});
	}

