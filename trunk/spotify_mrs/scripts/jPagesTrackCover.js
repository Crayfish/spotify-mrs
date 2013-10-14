 var playableCovers = new Array();

 var numberOfSongs = 12;
 
 var loopContinue = true;
 
 var bannedSeedArtist = null;
 
 var trackIdsforPlaylist = new Array();
 
 var searchstring = "The playlist information could not be established.";

require([
  '$api/models',
  '$api/search',
  '$views/image#Image',
  '$views/popup#Popup',
  'scripts/customplaylist',
  'scripts/setupSwitchViewButton',
  'scripts/yearSlider',
], function(models,search, Image, Popup, customplaylist, setupSwitchViewButton, yearSlider) {
  'use strict';

  
  var getTrackCover = function(trackID) {
	  
   
	  //get the container for the covers and set width
	  var covercontainer = document.getElementById('albumCoverContainer');
	  covercontainer.setAttribute('style', 'width: 645px;');
    
	  //load track from id
	 // var id = trackID.replace('-WW','');
	  var track = models.Track.fromURI(trackID);

	  //if track not playable --> no cover download
	  track.load('playable','name','artists').done(function(track) {
		  if(!track.playable){
			  console.log('TRACK NOT PLAYABLE');
		  };
		  
		  if(track.playable){
        		
        	   var artist = models.Artist.fromURI(track.artists[0]);
               
               console.log('jpagesTrackCover.getTrackCover() artist Id: '+artist);
               console.log('jpagesTrackCover.getTrackCover()  banned artist Id: '+bannedSeedArtist);
               
               if(artist == bannedSeedArtist){
               	console.log('jpagesTrackCover.getTrackCover() detected song by banned seed artist');
               };	
        	
               if(artist != bannedSeedArtist){
            	   
            	   
            	   trackIdsforPlaylist.push(trackID);
            
            	   artist.load('name').done(function(artist){
            		   
            		   var trackname = track.name.decodeForText();
            		   var artist = artist.name.decodeForText();
            	
            		   var image = Image.forTrack(track, {width: 150, height: 150, player: true, overlay:[trackname, artist]});

            		   //create a div for the cover
            		   var target1 = document.createElement('div');
            		   target1.setAttribute('style', 'width: 150px; height: 150px; display: inline-block; margin: 5px;');
            		   target1.className = 'target';
           
            		   //add the current image to the container
            		   target1.appendChild(image.node);

                       //save the div to list
            		   playableCovers.push(target1);  
            		   
            		   //add year
            		   yearSlider.addYear(track);
            		   
            		   console.log('size of playableCovers: '+playableCovers.length);
                     
            		   //if there is enough covers to load
            		   if(playableCovers.length == numberOfSongs){
            			   
            			   customplaylist.setSearchAttributes(searchstring);
            			   
            			   //create a temporary playlist 
            			   customplaylist.createNewPlaylist(trackIdsforPlaylist);
            			   
            			   
            			   //add the covers to the container
            			   for(var i = 0; i < playableCovers.length; i++){
            				   covercontainer.appendChild(playableCovers[i]);
            			   }
                    	 
            			   //reset the cover list
            			   playableCovers = new Array();
                    	 
            			   //break the loop
            			   loopContinue = false;
            			   
            			   //add a new cover page to the pagination
            			   setupSwitchViewButton.newCoverPage();
                    	
            			   
            			   
            			   //reset track ID array
            			   trackIdsforPlaylist = new Array(); 
            			   searchstring = null;
            		   }
            		   
            	   });//end load artist
               }//end banned artist check
		  }//end playable track check
	  });//end load track
  };//end function

  
  /**
   * Return true if to continue with the song load loop.
   */
  var checkLoopContinue = function(){
	  
	  return loopContinue;
		 
  };
	  
  
  /**
   * Set the loop flag true.
   */
  var setLoopContinueToTrue = function(){
			
	  loopContinue = true;
			 
  };  
		  
  /**
   * Set the artist name to ban from the list.
   */
  var setBannedSeedArtist = function(bannedSeedArtistFromEchonestDynamic){
				
	  bannedSeedArtist = bannedSeedArtistFromEchonestDynamic;
			   
	  console.log('jpagesTrackCover.setBannedSeedArtist() :' +bannedSeedArtistFromEchonestDynamic);
				 
  };  
  
  /**
   * Set the search string for playlist view
   */
  var setSearchString = function(searchString){
	  searchstring = searchString;
  }
  
  /**
   * if the search string has been already set
   */
  var isSearchStringSet = function(){
	  return (searchstring != null);
  }
  
  var getYearRange = function(){
	  return (yearSlider.getMinValue()+" - "+ yearSlider.getMaxValue())
  }

  exports.setLoopContinueToTrue=setLoopContinueToTrue;  
  exports.checkLoopContinue = checkLoopContinue;  
  exports.getTrackCover = getTrackCover;
  exports.setBannedSeedArtist = setBannedSeedArtist;
  exports.setSearchString = setSearchString;
  exports.isSearchStringSet = isSearchStringSet;
  exports.getYearRange = getYearRange;
  
});


