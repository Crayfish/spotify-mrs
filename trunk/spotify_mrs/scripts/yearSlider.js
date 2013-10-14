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
  
  var isInYearRange = function isInYearRange(track, callback){
	  isInYearRange1(models, track, callback);
  }
  
  var getMinValue = function getMinValue(){
	  return getMinValue1();
  }
  
  var getMaxValue = function getMaxValue(){
	  return getMaxValue1();
  }
  
    
  exports.addYear = addYear;
  exports.setupYearSlider = setupYearSlider;
  exports.reset = reset;
  exports.isInYearRange = isInYearRange;
  exports.getMinValue = getMinValue;
  exports.getMaxValue = getMaxValue;
  
});//end require

/**********************************************************************************************************************/
	/**minimum and maximum years in the collection (temporary playlist)*/
	var min = 2013;
	var max = 1900;

	/**selected minimum and maximum year values*/
	var minvalue = 1300;
	var maxvalue = 2050;
	
	/**
	 * Set up year input fields. The value is checked on validity every time it changes.
	 */
	function setupYearSlider1(){
		
		$("#yearto").change( function (){
			if(checkInput(this)){
				maxvalue = this.value;
			}
			else{
				
				$("#yearto").val("");
				maxvalue = 2050;
			}
		});
		
		$("#yearfrom").change( function (){
			if(checkInput(this)){
				minvalue = this.value;
			}
			else{
				
				$("#yearfrom").val("");
				minvalue = 1300;
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
				
				if(year > 0){
					console.log("track release year: "+year);
					max = Math.max(max,year);
					min = Math.min(min,year);
				}
				
				
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
	function isInYearRange1(models, track, callback){
		
		
		if(minvalue == 1300 && maxvalue == 2050){
			console.log("year range not specified");
			callback(true);
		}
		else{
			
			
			var album = models.Album.fromURI(track.album);
			
			
			track.load('album').done( function getAlbum(){
				track.album.load('date').done(function(){
					var year = track.album.date;
					console.log("track release year: "+year);
					
					if (year > minvalue && year < maxvalue){
						console.log("Track is IN the year range");
						callback(true);
					}
					else{
						console.log("Track is OUT the year range");
						callback(true);
					}
					
					
				});
				
			});
			
		}
	}
	
	function getMinValue1(){
		return min;
	}
	
	function getMaxValue1(){
		return max;
	}

