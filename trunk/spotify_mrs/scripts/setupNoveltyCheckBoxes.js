/**
 * Handler for Novelty checkboxes.
 * - exclude seed artist
 * - no songs from my spotify playlist
 * Sets the selected state in the echonestDynamic script
 */

require([
  'scripts/echonestDynamic',
], function( echonestDynamic ) {
  'use strict';


  var setUpExcludeSeedArtistCheckBox = function() {
	  setUpExcludeSeedArtistCheckBox1(echonestDynamic );
  };
  
  var setUpNoSongsFromSpotifyCollectionCheckBox = function() {
	  setUpNoSongsFromSpotifyCollectionCheckBox1(echonestDynamic);
  };

  exports.setUpExcludeSeedArtistCheckBox = setUpExcludeSeedArtistCheckBox;
  exports.setUpNoSongsFromSpotifyCollectionCheckBox = setUpNoSongsFromSpotifyCollectionCheckBox;
  
});//end require ****************************************************************************




function setUpNoSongsFromSpotifyCollectionCheckBox1(echonestDynamic){
	
	var excludeSpotifyPlaylistSongsCheckBox = document.getElementById('excludeSpotifyPlaylistSongsCheckBox');
	
	 excludeSpotifyPlaylistSongsCheckBox.onclick=function(){
	    	
	    	var isChecked = $('#excludeSpotifyPlaylistSongsCheckBox').prop('checked');
	    	
	    	echonestDynamic.setNoSpotifyPlaylistSongs(isChecked);
	    	
	    	console.log('excludeSpotifyPlaylistSongsCheckBox is checked: '+isChecked)
	    
	 };
		
}


function  setUpExcludeSeedArtistCheckBox1(echonestDynamic){
	
    var excludeSeedArtistCheckBox = document.getElementById('excludeSeedArtistCheckBox');
    
    excludeSeedArtistCheckBox.onclick=function(){
    	
    	var isChecked = $('#excludeSeedArtistCheckBox').prop('checked');
    	
    	echonestDynamic.setBanedArtistId(isChecked);
    	
    	console.log('excludeSeedArtistCheckBox is checked: '+isChecked);
    	
    };
	
}
