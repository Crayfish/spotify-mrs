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
  
  var reset = function reset(){
	  reset1();
  }
  
  var checkYear = function checkYear(track){
	  checkYear1(models, track);
  }
  
    
  exports.addYear = addYear;
  exports.setupYearSlider = setupYearSlider;
  exports.reset = reset;
  exports.checkYear = checkYear;
  
});//end require

/**********************************************************************************************************************/
	/**minimum and maximum years in the collection (temporary playlist)*/
	var min = 2013;
	var max = 1900;

	/**selected minimum and maximum year values*/
	var minvalue = 2013;
	var maxvalue = 1900;
	
	/**
	 * Set up year input fields. The value is checked on validity every time it changes.
	 */
	function setupYearSlider1(){
		
		$("#yearto").change( function (){
			if(checkInput(this)){
				max = this.value;
			}
			else{
				
				$("#yearto").val("");
			}
		});
		
		$("#yearfrom").change( function (){
			if(checkInput(this)){
				min = this.value;
			}
			else{
				
				$("#yearfrom").val("");
			}
		});
		
	}

	/**
	 * Extract the release year of the track and update the min and max year values.
	 * @param models spotify models api
	 * @param track the current track
	 */
	function addYear1(models, track){
		track.load('album').done(function(){
			track.album.load('date').done(function(){
				var year = track.album.date;
				console.log("track release year: "+year);
				max = Math.max(max,year);
				min = Math.min(min,year);
				
				$("#yearto").attr("placeholder", max);
				$("#yearfrom").attr("placeholder", min);
				
			});
			
		});
	}
	
	/**
	 * Reset min and max year values.
	 */
	function reset1(){
		min = 2013;
		max = 1900;
	}
	
	/**
	 * Validate the input values on the GUI.
	 * Input value has to be a number between 1300 and 2050. (regarding future use)
	 * @param input input value
	 * @returns {Boolean} true if input is valid
	 */
	function checkInput(input){
		var value = input.value;
		
		if(isNaN(value)){
			return false;
		}
		
		else{
			if(value < 2050 && value > 1300){
				return true;
			}
			else return false;
		} 
		
		return false;
	}
	
	/**
	 * Check if the track is in the given year range.
	 * @param models spotify models to access data
	 * @param track the current track to check
	 * @returns {Boolean} true if the track is in the given year range 
	 * or if there is no input in the year input boxes.
	 */
	function checkYear(models, track){
		var minval = $("#yearfrom").val();
		var maxval = $("#yearto").val();
		
		track.load('album').done(function(){
			track.album.load('date').done(function(){
				var year = track.album.date;
				console.log("track release year: "+year);
				
				
				
			});
			
		});
		 return true;
	}

