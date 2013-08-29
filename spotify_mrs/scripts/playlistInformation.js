

require([
  '$api/models',
  '$api/library#Library',
  // '$views/buttons',
  //'scripts/echonestDynamic',

], function( models, Library ) {
  'use strict';


  var setUpPlaylistInformation = function() {
	  setUpPlaylistInformation1(models, Library);
  };
  
  
var getArrayOfAllSongsInSpotifyPlaylists = function(){
	 return getArrayOfAllSongsInSpotifyPlaylists1();
};

  

  exports.setUpPlaylistInformation = setUpPlaylistInformation;
  exports.getArrayOfAllSongsInSpotifyPlaylists= getArrayOfAllSongsInSpotifyPlaylists;
  
});





var models = null;

var library = null;
var userLibrary = null;

var playlistCollection = null;

var arrayOfPlaylistNames = new Array();

var arrayOfAllSongsInSpotifyPlaylists = new Array();


function getArrayOfAllSongsInSpotifyPlaylists1(){
	return arrayOfAllSongsInSpotifyPlaylists;
}


function  setUpPlaylistInformation1(models1, Library){
	
	console.log('setUpPlaylistInformation1 was called');
	models = models1;
	library = Library;
	userLibrary =  library.forCurrentUser();
	
	playlistCollection = userLibrary.playlists;
	
	
	playlistCollection.snapshot().done(function(snapshot) {
		
		  for (var i = 0; i < snapshot.length; i++) {
		    //console.log(snapshot.get(i));
		    
		    var playlistI = snapshot.get(i)
		    
//		    console.log(playlistI.name);
		    
		    var playlistName = playlistI.name;
		    
		    arrayOfPlaylistNames.push(playlistName);
		    
		    console.log('arrayOfPlaylistNames ' +i+': '+arrayOfPlaylistNames[i]);
		    
		    
		   var tracks = null;
			   
			playlistI.load('tracks').done(function(playlistI){
				tracks =playlistI.tracks;
				//console.log('tracks: '+tracks);
				
				
				tracks.snapshot().done(function(snapshot1) {
			    	  //var len = Math.min(snapshot.length, 50);
			    	  for (var i = 0; i < snapshot1.length; i++) {
			    	    //console.log(' playlistI tracks snapshot: '+ snapshot1.get(i));
			    	    
			    	    arrayOfAllSongsInSpotifyPlaylists.push(snapshot1.get(i));
			    	  }
			    	});
				
				//console.log('arrayOfAllSongsInSpotifyPlaylists: '+arrayOfAllSongsInSpotifyPlaylists);
				
			});
		   
	
		    
		    }
		
	
		    
		  
	});
		  
	
	
	
	


    	
    
 
	
	
	
}