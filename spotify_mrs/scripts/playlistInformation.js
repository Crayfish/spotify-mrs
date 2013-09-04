

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

/*var firstLocalStorageOfPlaylists = function() {
	firstLocalStorageOfPlaylists1(models, Library);
}; */

  exports.setUpPlaylistInformation = setUpPlaylistInformation;
  exports.getArrayOfAllSongsInSpotifyPlaylists= getArrayOfAllSongsInSpotifyPlaylists;
  //exports.firstLocalStorageOfPlaylists = firstLocalStorageOfPlaylists;
});





var models = null;

var library = null;
var userLibrary = null;

var playlistCollection = null;

var arrayOfPlaylistNames = new Array();

var arrayOfAllSongsInSpotifyPlaylists = new Array();


function firstLocalStorageOfPlaylists1(){
	console.log('firstLocalStorageOfPlaylists1() was called');
	
	//empty local storage
	
	localStorage.clear();  
	
	
	//storing playlist information
	playlistCollection.snapshot().done(function(snapshot) {
		
		  for (var i = 0; i < snapshot.length; i++) {
		    //console.log(snapshot.get(i));
		    
		    var playlistI = snapshot.get(i)
		    
//		    console.log(playlistI.name);
		    
		    var playlistName = playlistI.name;
		    
		    var playlistURI = playlistI.uri;
		    
		    
		    
		   var arrayforDuplicateIDsCheck = new Array();  
		    
		  //create a playlist Object
		    
		    var playlistObject = {};
		    
		    playlistObject.playlistName = playlistName;
		    playlistObject.playlistURI = playlistURI;
		    playlistObject.tasteProfileID = '';
		    playlistObject.itemArray = [];
		    
		
		    
		    
		   var tracks = null;
			   
			playlistI.load('tracks').done(function(playlistI){
				tracks =playlistI.tracks;
				
				
				
				tracks.snapshot().done(function(snapshot1) {
			    	  //var len = Math.min(snapshot.length, 50);
			    	  for (var i = 0; i < snapshot1.length; i++) {
			    	    //console.log(' playlistI tracks snapshot: '+ snapshot1.get(i));
			    	    
			    	    
			    	    var itemObject = {}
			    	    var innerItem = {};
			    	    //innerItem.item_id = snapshot1.get(i).uri.replace(/:/g, '');
			    	    var itemID = snapshot1.get(i).uri.replace('spotify:track:', 'gruber').toUpperCase();
			    	    innerItem.item_id = itemID;
			    	    
			    	    //console.log('ITEM_ID: '+snapshot1.get(i))
			    	    //var track_id = '';
			    	    //var track_id = JSON.stringify(snapshot1.get(i));
			    	    
			    	    
			    	    innerItem.track_id = snapshot1.get(i).uri.replace( 'spotify', 'spotify-WW');
			    	    
			    	    itemObject.item = innerItem;
			    	    
			    	    //falls kein Duplikat hinzufügen 
			    	    if($.inArray(itemID,  arrayforDuplicateIDsCheck)== -1){
			    	    playlistObject.itemArray.push(itemObject);
			    	    }
			    	    arrayforDuplicateIDsCheck.push(itemID);
			    	    
			    	  }
			    	});
				
			
				
			});
		   
		    localStorage.setItem( playlistURI, JSON.stringify(playlistObject) );
		    
		    }
		
	
		    
		  
	});
	
	
	
	
	
}

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
		  
	
	
	
	


    	
	firstLocalStorageOfPlaylists1();  
 
	
	
	
}