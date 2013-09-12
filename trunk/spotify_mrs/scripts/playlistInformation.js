

require([
'scripts/heading',
  '$api/models',
  '$api/library#Library',
   //'scripts/echonestProfile'
  

], function( echonestTasteProfileManagment, models, Library) {
  'use strict';


  var setUpPlaylistInformation = function() {
	  setUpPlaylistInformation1(echonestTasteProfileManagment, models, Library/*, echonestTasteProfile*/);
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

var arrayStoredPlaylistObjects = new Array();
var currentPlaylistObjectsArray = new Array();

var isFirstLocalStorage = false;

//var echonestTasteProfileScript = null;


function updateArrayStoredPlaylistObjects(){
	for (var i=0; i<=localStorage.length-1; i++)  
    {   
       var  key = localStorage.key(i);  
       var playlistObject = JSON.parse(localStorage.getItem(key));  
        
        //console.log('NEXT PLAYLIST OBJECT: '+JSON.stringify(playlistObject));
        
        arrayStoredPlaylistObjects.push( playlistObject);
    }  
}


function firstLocalStorageOfPlaylists1(tasteProfileScript){
	console.log('firstLocalStorageOfPlaylists1() was called');
	
	if(localStorage.length ==0){isFirstLocalStorage = true};
	
	//if it is not the first local storage: get the playlist Information already stored in Local Storage
	
	if(!isFirstLocalStorage){
		updateArrayStoredPlaylistObjects();
	}
	 //console.log('PLAYLIST INFO ALREADY STORED IN LOCAL STORAGE: '+JSON.stringify(arrayStoredPlaylistObjects));
	
	
	
	
	//get current state of playlist Information
	playlistCollection.snapshot().done(function(snapshot) {
		
		  for (var i = 0; i < snapshot.length; i++) {
		    //console.log(snapshot.get(i));
		    
		    var playlistI = snapshot.get(i)
		    
		    if(playlistI!=null){
//		    console.log(playlistI.name);
		    
		    var playlistName = playlistI.name;
		    
		    var playlistURI = playlistI.uri;
		    
		    
		    
		   var arrayforDuplicateIDsCheck = new Array();  
		    
		  //create a playlist Object
		    
		    var playlistObject = {};
		    
		    playlistObject.playlistName = playlistName;
		    playlistObject.playlistURI = playlistURI;
		    playlistObject.tasteProfileID = null;
		    playlistObject.itemArray = [];
		    
		
		    
		    
		   var tracks = null;
			   
			playlistI.load('tracks').done(function(playlistI){
				tracks =playlistI.tracks;
				
				
				
				tracks.snapshot().done(function(snapshot1) {
			    	  //var len = Math.min(snapshot.length, 50);
			    	  for (var i = 0; i < snapshot1.length; i++) {
			    	    //console.log(' playlistI tracks snapshot: '+ snapshot1.get(i));
			    	    
			    	    
			    	    var itemObject = {};
			    	    var innerItem = {};
			    	    //innerItem.item_id = snapshot1.get(i).uri.replace(/:/g, '');
			    	    var itemID = snapshot1.get(i).uri;//.replace('spotify:track:', 'gruber').toUpperCase();
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
		   
			currentPlaylistObjectsArray.push(playlistObject);
		    //localStorage.setItem( playlistURI, JSON.stringify(playlistObject) );
		    
		  	}
		    }
		
	
		    
		  
	});
	
	
	//console.log('CURRENT PLAYLIST OBJECT ARRAY: '+ JSON.stringify(currentPlaylistObjectsArray));
	//end of getting current playlist state
	
	//check for new playlists
	//if first local storage, store all the playlist
    
	if(isFirstLocalStorage){
		currentPlaylistObjectsArray.forEach(function(entry) {
	    	
	    	
			//console.log(' ENTRY OF arrayPlaylistObjects: '+JSON.stringify(entry));
	    	
	    		var playlistURIForFirstStorage = entry.playlistURI;
	    		  console.log("DETECTED A FIRST LOCAL STORAGE PLAYLIST: "+playlistURIForFirstStorage);
	    		  //store the new playlist Object
	    		  localStorage.setItem( playlistURIForFirstStorage, JSON.stringify(entry) );
	    		  updateArrayStoredPlaylistObjects();
	    		  //and store for Creation of EchonestTaste Profiles
	    		  tasteProfileScript.createAllTasteProfiles();
	    		
	    
	    });
		//else check for new playlists, store new playlists and update arrayStoredPLaylistsobjects
	}else{
    currentPlaylistObjectsArray.forEach(function(entry) {
    	
    	
		//console.log(' ENTRY OF arrayPlaylistObjects: '+JSON.stringify(entry));
    	var playlistURIForComparison = entry.playlistURI;
    	if (localStorage.getItem(playlistURIForComparison) === null) {
    		  console.log("DETECTED A NEW PLAYLIST: "+playlistURIForComparison);
    		  //store the new playlist Object
    		  localStorage.setItem( playlistURIForComparison, JSON.stringify(entry) );
    		  updateArrayStoredPlaylistObjects();
    		  //and store new playlist info for echonest calls
    		}
    
    });
    
    
    
    
    
}//end of new Playlist Check
	
	
	
	
	
	if(!isFirstLocalStorage){
	//check for deleted playlists in order to delete Echonest Taste Profile
	if(arrayStoredPlaylistObjects.length > currentPlaylistObjectsArray.length){
		//console.log('DETECTED PLAYLISTS TO BE DELETED' );
		
		var arrayStoredIDs = new Array();
		var arrayCurrentIDs = new Array();
		
		arrayStoredPlaylistObjects.forEach(function(entry) {
			arrayStoredIDs.push(entry.playlistURI);
		});
		
		currentPlaylistObjectsArray.forEach(function(entry) {
			arrayCurrentIDs.push(entry.playlistURI);
		});
		
		arrayStoredIDs.forEach(function(entry) {
			if($.inArray(entry,arrayCurrentIDs)==-1){
				console.log('DETECTED PLAYLISTS TO BE DELETED: '+entry );
				//remove the playlist from local storage
				 localStorage.removeItem(entry);
				 updateArrayStoredPlaylistObjects();
				//store delete info for echonestcalls
				
			}
		});
		
	}//end of deleted playlists check
	
	//check if there are  deleted Songs in an existing playlist
	checkIfDeletedSongsInPLaylists();
	//check if there are new songs in existing playlists
	checkIfNewSongsInPlaylists();
	}//end of !isFirstLocalStorageCheck	
}//end of function

function checkIfNewSongsInPlaylists(){
	console.log('checkIfNewSongsInPlaylists() was called');
	
	currentPlaylistObjectsArray.forEach(function(entry) {
	
	var playlistObjectForComparison = null;
	var storedPlaylistItemArray = new Array();
	
	var currentPlaylistItemArray = entry.itemArray;
	var currentPlaylistURI = entry.playlistURI;
	
	
	//console.log('STARTED NEW SONGS DEDECTION FOR :'+entry.playlistName);
	//console.log('storedPlaylistItemArray :'+JSON.stringify(storedPlaylistItemArray));
	
	//das Vergleichsobjekt finden
	for(var i = 0; i < arrayStoredPlaylistObjects.length; i++){
		
		var storedPlaylistURI = arrayStoredPlaylistObjects[i].playlistURI;
		if(currentPlaylistURI==storedPlaylistURI ){
			playlistObjectForComparison = arrayStoredPlaylistObjects[i];
			storedPlaylistItemArray = playlistObjectForComparison.itemArray;
			//console.log('COMPARISION OBJECT NEW SONGS FOUND: '+playlistObjectForComparison.playlistName);
			break;
		}
	}
	
	
	
	//comparing the two itemArrays, detecting new  songs
	
	currentPlaylistItemArray.forEach(function (entry1){
		//console.log('entry1: '+JSON.stringify(entry1) );
		var currentTrackIDForComparison = entry1.item.track_id;
		//console.log('storedTrackIDForComparison: '+storedTrackIDForComparison);
		
		var storedObjectTrackIdsArray = new Array();
		
		storedPlaylistItemArray.forEach(function(entry2){
			storedObjectTrackIdsArray.push(entry2.item.track_id);
		});
		
		
		if($.inArray( currentTrackIDForComparison,storedObjectTrackIdsArray )==-1){
			console.log('DETECTED A NEW SONG IN STORED PLAYLIST: '+playlistObjectForComparison.playlistName);
			localStorage.setItem(currentPlaylistURI , JSON.stringify(entry));
			//echonest Taste Profile update call
		};
	});
	
	
	
	
	
	
});
}

function checkIfDeletedSongsInPLaylists(){
	console.log('checkIfDeletedSongsInPLaylists() was called');
	
	arrayStoredPlaylistObjects.forEach(function(entry) {
		var playlistObjectForComparison = null;
		var storedPlaylistItemArray = new Array();
		var currentPlaylistItemArray = new Array();
		var storedPlaylistURI = entry.playlistURI;
		
		storedPlaylistItemArray = entry.itemArray;
		
		//console.log('STARTED DELETED SONGS DEDECTION FOR :'+entry.playlistName);
		//console.log('storedPlaylistItemArray :'+JSON.stringify(storedPlaylistItemArray));
		
		//das Vergleichsobjekt finden
		for(var i = 0; i < currentPlaylistObjectsArray.length; i++){
			
			var currentPlaylistURI = currentPlaylistObjectsArray[i].playlistURI;
			if(storedPlaylistURI == currentPlaylistURI){
				playlistObjectForComparison = currentPlaylistObjectsArray[i];
				currentPlaylistItemArray = playlistObjectForComparison.itemArray;
				//console.log('COMPARISION OBJECT: '+playlistObjectForComparison.playlistName);
				break;
			}
		}
		
		
		
		//comparing the two itemArrays, first detect deleted songs
		
		storedPlaylistItemArray.forEach(function (entry1){
			//console.log('entry1: '+JSON.stringify(entry1) );
			var storedTrackIDForComparison = entry1.item.track_id;
			//console.log('storedTrackIDForComparison: '+storedTrackIDForComparison);
			
			var currentObjectTrackIdsArray = new Array();
			
			currentPlaylistItemArray.forEach(function(entry2){
				currentObjectTrackIdsArray.push(entry2.item.track_id);
			});
			
			
			if($.inArray( storedTrackIDForComparison,currentObjectTrackIdsArray )==-1){
				console.log('DETECTED A DELETED SONG IN CURRENT PLAYLIST: '+playlistObjectForComparison.playlistName);
				localStorage.setItem(playlistObjectForComparison.playlistURI ,JSON.stringify(playlistObjectForComparison));
				updateArrayStoredPlaylistObjects();
				//echonest Taste Profile update call
			};
		});
		
		
		
		
		
		
	});//end of for each() of deleted songs detection;
}


function getArrayOfAllSongsInSpotifyPlaylists1(){
	return arrayOfAllSongsInSpotifyPlaylists;
}


function  setUpPlaylistInformation1(tasteProfileScript, models1, Library/* echonestTasteProfile*/){
	
	//tasteProfileScript.createAllTasteProfiles();
	console.log('setUpPlaylistInformation1 was called');
	models = models1;
	library = Library;
	userLibrary =  library.forCurrentUser();
	
	playlistCollection = userLibrary.playlists;
	
	//echonestTasteProfileScript = echonestTasteProfileManagment;
	
	
	playlistCollection.snapshot().done(function(snapshot) {
		
		  for (var i = 0; i < snapshot.length; i++) {
		    //console.log(snapshot.get(i));
		    
		    var playlistI = snapshot.get(i)
		    if(playlistI != null){
		    	
		    
//		    console.log(playlistI.name);
		    
		    var playlistName = playlistI.name;
		    
		    arrayOfPlaylistNames.push(playlistName);
		    
		    //console.log('arrayOfPlaylistNames ' +i+': '+arrayOfPlaylistNames[i]);
		    
		    
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
		    }
		
	
		    
		  
	});
		  
	
	
	
	


    localStorage.clear();	
    //console.log('CLEARED LOCAL STORAGE');
	firstLocalStorageOfPlaylists1(tasteProfileScript);  
 
	
	
	
}
