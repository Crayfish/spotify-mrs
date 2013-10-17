/**
 * Information collector.
 * collects the user settings and information for the currently generated playlist.
 */

require([
  '$api/models'
], function(models) {
  'use strict';
  
  
  var addYear = function addYear(track){
	  addYear1(models, track);
  }
  
  var reset = function reset(){
	  reset1();
  }
  
  var getInfo = function getInfo(){
	  return getInfo1();
  }
  
  var setSimilarityMode = function setSimilarityMode(mode){
	  setSimilarityMode1(mode);
  }
  
  var setSimilarityBase = function setSimilarityBase(base){
	  setSimilarityBase1(base);
  }
  
  var excludeSeedArtist = function excludeSeedArtist(exclude){
	  excludeSeedArtist1(exclude);
  }
  
  var excludePlaylistSongs = function excludePlaylistSongs(exclude){
	  excludePlaylistSongs1(exclude);
  }
  
  var setArtistFamilarityLevel = function setArtistFamilarityLevel(level){
	  setArtistFamilarityLevel1(level);
  }
  
  var setArtistHotnessLevel = function setArtistHotnessLevel(level){
	  setArtistHotnessLevel1(level);
  }
  
  var setSongHotnessLevel = function setSongHotnessLevel(level){
	  setSongHotnessLevel1(level);
  }
  
  var setAdventurousness = function setAdventurousness(value){
	  setAdventurousness1(value);
  }
  
  var setArtistVariety = function setArtistVariety(value){
	  setArtistVariety1(value);
  }
  
  var setArtistTermsArray = function setArtistTermsArray(termsarray){
	  setArtistTermsArray1(termsarray);
  }
  
  var setArtistStartYearBefore = function(year){
	  setArtistStartYearBefore1(year);
  };
	 
  var setArtistStartYearAfter = function(year){
	  setArtistStartYearAfter1(year);
  };
	 
  var setArtistEndYearBefore = function(year){
	  setArtistEndYearBefore1(year);
  };
  
  var setArtistEndYearAfter = function(year){
	  setArtistEndYearAfter1(year);
  };
    
  exports.addYear = addYear;
  exports.reset = reset;
  exports.getInfo = getInfo;
  exports.setSimilarityMode = setSimilarityMode;
  exports.setSimilarityBase = setSimilarityBase;
  exports.excludeSeedArtist = excludeSeedArtist;
  exports.excludePlaylistSongs = excludePlaylistSongs;
  exports.setArtistFamilarityLevel = setArtistFamilarityLevel;
  exports.setArtistHotnessLevel = setArtistHotnessLevel;
  exports.setSongHotnessLevel = setSongHotnessLevel;
  exports.setAdventurousness = setAdventurousness;
  exports.setArtistVariety = setArtistVariety;
  exports.setArtistTermsArray = setArtistTermsArray;
  exports.setArtistStartYearBefore = setArtistStartYearBefore;
  exports.setArtistStartYearAfter = setArtistStartYearAfter;
  exports.setArtistEndYearBefore = setArtistEndYearBefore;
  exports.setArtistEndYearAfter = setArtistEndYearAfter;
  
});//end require

/**********************************************************************************************************************/
	/**minimum and maximum years in the collection (temporary playlist)*/
	var min = 2013;
	var max = 1900;
	
	/**
	 * Similarity mode:
	 * 0=artist
	 * 1=song
	 * 2=genre
	 * 3=playlist
	 */
	var mode = 0;
	
	/**
	 * similarity based on this (artist name, song name, genre name, playlist name)
	 */
	var similaritybase = "not specified";

	/**true if artists songs are banned*/
	var excludeArtist = false;
	
	/**true if playlist songs are banned*/
	var excludePlaylist = false;
	
	/**value of the artist familarity slider*/
	var artistFamilarityLevel = 0;
	
	/**value of the artist hotness slider*/
	var artistHotnessLevel = 0;
	
	/**value of the song hotness slider*/
	var songHotnessLevel = 0;
	
	/**value of the adventurousness slider*/
	var adventurousness = 20;
	
	/**value of the artist variety slider*/
	var artistVariety = 50;
	
	/**array of the selected artist terms*/
	var artistterms = new Array();
	
	/**year picker values*/
	var artistStartYearBefore 	= "off";
	var artistStartYearAfter  	= "off";
	var artistEndYearBefore 	= "off";
	var artistEndYearAfter		= "off";

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
			});
		});
	}
	
	/**
	 * Reset all values but the checkboxes.
	 */
	function reset1(){
		min = 2013;
		max = 1900;
		artistFamilarityLevel = 0;
		artistHotnessLevel = 0;
		songHotnessLevel = 0;
		artistVariety = 50;
		artistStartYearBefore 	= "off";
		artistStartYearAfter  	= "off";
		artistEndYearBefore 	= "off";
		artistEndYearAfter		= "off";
	}
	
	/**
	 * reset only year values
	 */
	function resetYear(){
		min = 2013;
		max = 1900;
	}
	
	/**
	 * Get the collected playlist information as formatted string
	 * @returns {String}
	 */
	function getInfo1(){
		var returnstring = "<div id='info'>These recommendations are based upon ";
		
		switch(mode){
		case 0: returnstring = returnstring+"<i>artist</i>"+" <b>"+similaritybase+"</b>"; 
				if(excludeArtist) returnstring = returnstring+" (artist's songs excluded)";
				break;
		case 1: returnstring = returnstring+"<i>song</i> <b>"+similaritybase+"</b>"; 
				if(excludeArtist) returnstring = returnstring+" (artist's songs excluded)";
				break;
		case 2: returnstring = returnstring+"<i>genre</i> "+"<b>"+similaritybase+"</b>"; break;
		case 3: returnstring = returnstring+"<i>playlist</i> <b> "+similaritybase+"</b>"; break;
		}
		
		if(excludePlaylist){
			returnstring = returnstring + "<br/> Songs from my spotify playlists are excluded.";
		}
		
		returnstring = returnstring +"<br/>Tracks were released between "+min+" and "+max;
		
		var value1;
		switch(songHotnessLevel){
			case 0: value1 = "Off"; break;
			case 1: value1 = "Lowest"; break;
			case 2: value1 = "Low"; break;
			case 3: value1 = "Medium"; break;
			case 4: value1 = "High"; break;
			case 5: value1 = "Highest"; break;
		}
		returnstring = returnstring+"<br/>Song Trendiness:<i>( "+value1+" )    </i>   ";
	
		var value2;
		switch(artistHotnessLevel){
			case 0: value2 = "Off"; break;
			case 1: value2 = "Lowest"; break;
			case 2: value2 = "Low"; break;
			case 3: value2 = "Medium"; break;
			case 4: value2 = "High"; break;
			case 5: value2 = "Highest"; break;
		}
		returnstring = returnstring+"<br/>Artist Trendiness:<i>( "+value2+" )    </i>   ";
	
		var value3;
		switch(artistFamilarityLevel){
			case 0: value3 = "Off"; break;
			case 1: value3 = "Lowest"; break;
			case 2: value3 = "Low"; break;
			case 3: value3 = "Medium"; break;
			case 4: value3 = "High"; break;
			case 5: value3 = "Highest"; break;
		}
		returnstring = returnstring+"<br/>Artist Popularity:<i>( "+value3+" )    </i>   ";
	
		if (artistVariety != 50){
			returnstring = returnstring+"<br/>Artist Variety:<i>( "+parseInt(artistVariety)+" )     </i>";
		}
		
		if(adventurousness!=20){
			returnstring = returnstring+"<br/>Adventurousness:<i>( "+parseInt(adventurousness)+" ) </i>";
		}
		
		if(artistterms.length != 0){
			returnstring = returnstring+ "<br/> Songs are played by artists matching the following descriptions: ";
			for(var i=0; i< artistterms.length;i++){
				
				returnstring = returnstring+" " +artistterms[i];
				
				if((i+1)!=artistterms.length){
					returnstring = returnstring+", "
				}
			}
		}
		
		if(artistStartYearBefore!="off"){
			returnstring = returnstring + "<br>Artists of these tracks <i>started</i> recording music <i>before</i> "+artistStartYearBefore;
		}
		
		if(artistStartYearAfter!="off"){
			returnstring = returnstring + "<br>Artists of these tracks <i>started</i> recording music <i>after</i> "+artistStartYearAfter;
		}
		
		if(artistEndYearBefore!="off"){
			returnstring = returnstring + "<br>Artists of these tracks <i>ended</i> recording music <i>before</i> "+artistEndYearBefore;
		}
		
		if(artistEndYearAfter!="off"){
			returnstring = returnstring + "<br>Artists of these tracks <i>ended</i> recording music <i>after</i> "+artistEndYearAfter;
		}
		
		console.log(artistStartYearBefore+" "+artistStartYearAfter+" "+artistEndYearBefore+" "+artistEndYearAfter);
		
		returnstring = returnstring+"</div>"
		
		resetYear();
		
		return returnstring;
	}
	
	function setSimilarityBase1(base1){
		similaritybase = base1;
	}
	
	function setSimilarityMode1(mode1){
		mode = mode1;
	}
	
	function excludeSeedArtist1(exclude1){
		excludeArtist = exclude1;
	}
	
	function excludePlaylistSongs1(exclude1){
		excludePlaylist = exclude1;
	}
	
	function setArtistFamilarityLevel1(level1){
		 artistFamilarityLevel = level1;
	}
	
	function setArtistHotnessLevel1(level1){
		artistHotnessLevel = level1;
	}
	
	function setSongHotnessLevel1(level1){
		songHotnessLevel = level1;
	}
	
	function setAdventurousness1(value1){
		adventurousness = value1;
	}
	
	function setArtistVariety1(value1){
		artistVariety = value1;
	}
	
	function setArtistTermsArray1(termsarray1){
		artistterms = termsarray1;
	}
	
	function setArtistStartYearBefore1(year1){
		artistStartYearBefore = year1;
	}
	
	function setArtistStartYearAfter1(year1){
		artistStartYearAfter = year1;
	}
	
	function setArtistEndYearBefore1(year1){
		artistEndYearBefore = year1;
	}
	
	function setArtistEndYearAfter1(year1){
		artistEndYearAfter = year1;
	}

