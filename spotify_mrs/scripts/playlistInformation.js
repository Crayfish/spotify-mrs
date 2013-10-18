/**
 * 
 */

require([
	'scripts/echonestTasteProfile',
	'$api/models',
	'$api/library#Library',
	'scripts/echonestDynamic'
], function( echonestTasteProfile, models, Library, echonestDynamic) {
  'use strict';

  var setUpPlaylistInformation = function() {
	  setUpPlaylistInformation1(echonestTasteProfile, models, Library, echonestDynamic);
  };
  
  
  var getArrayOfAllSongsInSpotifyPlaylists = function(){
	  return getArrayOfAllSongsInSpotifyPlaylists1();
  };


  exports.setUpPlaylistInformation = setUpPlaylistInformation;
  exports.getArrayOfAllSongsInSpotifyPlaylists= getArrayOfAllSongsInSpotifyPlaylists;

});//end require*********************************************************************


	var models = null;
	var library = null;
	var userLibrary = null;
	var playlistCollection = null;
	var arrayOfPlaylistNames = new Array();
	var arrayOfAllSongsInSpotifyPlaylists = new Array();
	var arrayStoredPlaylistObjects = new Array();
	var currentPlaylistObjectsArray = new Array();
	var isFirstLocalStorage = false;
	var initialTasteProfileCreationNeeded = false;
	var tasteProfilesNeedToBeDeleted = false;
	var newTasteProfileIsNeeded = false;
	var tasteProfileDeleteUpdateIsNeeded = false;
	var tasteProfileAddUpdateIsNeeded = false;
	var arrayTasteProfileIdsToBeDeleted = new Array();
	var arrayNewPlaylistObjects = new Array();
	var echonestTasteProfileScript = null;
	var deleteSongsObjectsArray = new Array();
	var addSongsObjectsArray = new Array();
	var playlistObjectsToBeStoredAfterNewOrDeletedSongsCheck = new Array();
	
	
	function updateArrayStoredPlaylistObjects(){
		
		arrayStoredPlaylistObjects= new Array();
		
		for (var i=0; i<localStorage.length; i++){   
	       
			var  key = localStorage.key(i);  
			var playlistObject = JSON.parse(localStorage.getItem(key));  
	        
	        arrayStoredPlaylistObjects.push( playlistObject);
	    }  
	}
	
	
	function checkIfFirstLocalStorageOfPlaylists1(){
		console.log('PLAYLIST INFORMATION checkIfFirstLocalStorageOfPlaylists1() was called');
		
		if(localStorage.length == 0){
			isFirstLocalStorage = true
		};
		
		var finishedGettingCurrentPlaylistsState = false;
		
		if(!isFirstLocalStorage){
			updateArrayStoredPlaylistObjects();
		}
		
		var finishedGettingCurrentPlaylistsState = false;
		var counter = localStorage.length;

		playlistCollection.snapshot().done(function(snapshot) {
			
			var counter = snapshot.length;
			
			for (var i = 0; i < snapshot.length; i++) {
				console.log('PLAYLIST INFORMATION PLAYLIST COLLECTION SNAPSHOT: '+ snapshot.get(i));
			    
			    var playlistI = snapshot.get(i)
			    
			    if(playlistI!=null){
			    	
			    	console.log('PLAYLIST INFORMATION SNAPSHOT PLAYLIST NAME: '+playlistI.name);
			    
			    	playlistI.load('tracks').done(function(playlistI){
			    		var tracks =playlistI.tracks;
						var playlistName = playlistI.name;
						var playlistURI = playlistI.uri;
						
						tracks.snapshot().done(function(snapshot1) {
					    	  
							var arrayforDuplicateIDsCheck = new Array();  
							    
							//create a playlist Object
							var playlistObject = {};
							playlistObject.playlistName = playlistName;
							playlistObject.playlistURI = playlistURI;
							playlistObject.tasteProfileID = null;
							playlistObject.itemArray = [];
							    
							for (var i = 0; i < snapshot1.length; i++) {
					    	    
								var itemObject = {};
					    	    var innerItem = {};
					    	    var itemID = snapshot1.get(i).uri;//.replace('spotify:track:', 'gruber').toUpperCase();
					    	    innerItem.item_id = itemID;
					    	    
					    	    innerItem.track_id = snapshot1.get(i).uri.replace( 'spotify', 'spotify-WW');
					    	    
					    	    itemObject.item = innerItem;
					    	    
					    	    //falls kein Duplikat hinzufügen 
					    	    if($.inArray(itemID,  arrayforDuplicateIDsCheck)== -1){
					    	    	playlistObject.itemArray.push(itemObject);
					    	    }
					    	    
					    	    arrayforDuplicateIDsCheck.push(itemID);
					    	    
							}//end of tracks loop
					    	  
					    	  
							currentPlaylistObjectsArray.push(playlistObject);
							counter = counter -1;
							
							if(counter == 0){
								finishedGettingCurrentPlaylistsState = true;
								console.log('PLAYLIST INFORMATION  finishedGettingCurrentPlaylistsState: '+ finishedGettingCurrentPlaylistsState);
							}
					    	  
							if(finishedGettingCurrentPlaylistsState){
								startPlaylistUpdateLogic()
							};
					    	  
						});//end of load single tracks for playlist
			    	});//end of load tracks snapshot
			    }//end of 	 if(playlistI!=null) check		 
			}//end of playlist collection loop  
		});//end of getting current playlist state   
	}//end of function
		
	
	
	function startPlaylistUpdateLogic(){
		console.log('PLAYLIST INFORMATION startPlaylistUpdateLogic() was called');
		
		//check for new playlists
		//if first local storage, store all the playlist
	    
		if(isFirstLocalStorage){
			
			currentPlaylistObjectsArray.forEach(function(entry) {
		    	
				console.log(' PLAYLIST INFORMATION ENTRY OF arrayPlaylistObjects: '+JSON.stringify(entry));
		    	
				var playlistURIForFirstStorage = entry.playlistURI;
				console.log("DETECTED A FIRST LOCAL STORAGE PLAYLIST: "+playlistURIForFirstStorage);
				
				//store the new playlist Object
				localStorage.setItem( playlistURIForFirstStorage, JSON.stringify(entry) );
				updateArrayStoredPlaylistObjects();
				
				//and store for Creation of EchonestTaste Profiles
				initialTasteProfileCreationNeeded = true;
		    
		    });
		
		//else check for new playlists, store new playlists and update arrayStoredPLaylistsobjects
		}else{
	   
			checkForDeletedPlaylists();
			checkForNewPLaylists();
			checkIfDeletedSongsInPLaylists();
			checkIfNewSongsInPlaylists();
	    
		}//end of new Playlist Check
		

		//logic for Taste Profile Calls
		if(initialTasteProfileCreationNeeded){
			 echonestTasteProfileScript.initialCreateOfAllTasteProfile();
		}else{
		
			if( tasteProfilesNeedToBeDeleted){
				 echonestTasteProfileScript.deleteTasteProfiles(arrayTasteProfileIdsToBeDeleted);
					
				}
			if( newTasteProfileIsNeeded){
				 echonestTasteProfileScript.createNewTasteProfiles(arrayNewPlaylistObjects);
			}	
			//if there are no new or deleted playlists
			if(!tasteProfilesNeedToBeDeleted && !newTasteProfileIsNeeded){
				echonestTasteProfileScript.noNewOrDeletedPlaylists();
			}
			if(tasteProfileDeleteUpdateIsNeeded){
				echonestTasteProfileScript.deleteSongsInTasteProfiles(deleteSongsObjectsArray);
			}
			if(tasteProfileAddUpdateIsNeeded){
				echonestTasteProfileScript.addSongsInTasteProfiles(addSongsObjectsArray);
			}
				
		}  
		
	}
	
	
		
	function checkForDeletedPlaylists(){
		
		console.log('PLAYLIST INFORMATION checkForDeletedPlaylists() was called');
		
		//check for deleted playlists in order to delete Echonest Taste Profile
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
				tasteProfilesNeedToBeDeleted = true;
				
				//remove the playlist from local storage
				var plyListObject = JSON.parse(localStorage.getItem(entry));
				console.log('DELETE PLAYLIST OBJECT: '+plyListObject);
				var deleteTasteProfileID = plyListObject.tasteProfileID;
				
				console.log('DELETE ID at PLAYLIST INFORMATION SCRIPT: '+deleteTasteProfileID);
				arrayTasteProfileIdsToBeDeleted.push(deleteTasteProfileID);
				localStorage.removeItem(entry);
				updateArrayStoredPlaylistObjects();
					
			}
		});
			
		//end of deleted playlists check
	}
	
	
	function checkForNewPLaylists(){
		
		console.log('PLAYLIST INFORMATION checkForNewPlaylists() was called');
		 currentPlaylistObjectsArray.forEach(function(entry) {
		    	
			 var playlistURIForComparison = entry.playlistURI;
			 if (localStorage.getItem(playlistURIForComparison) === null) {
				 console.log("DETECTED A NEW PLAYLIST: "+playlistURIForComparison);
				 
				 //store the new playlist Object
				 newTasteProfileIsNeeded = true;
				 arrayNewPlaylistObjects.push(entry);
				 localStorage.setItem( playlistURIForComparison, JSON.stringify(entry) );
				 updateArrayStoredPlaylistObjects();
				 //and store new playlist info for echonest calls
			 }
		    
		 });
	}
	
	
	function checkIfNewSongsInPlaylists(){
		console.log('checkIfNewSongsInPlaylists() was called');
		
		currentPlaylistObjectsArray.forEach(function(entry) {
		
			var playlistObjectForComparison = null;
			var storedPlaylistItemArray = new Array();
			
			var currentPlaylistItemArray = entry.itemArray;
			var currentPlaylistURI = entry.playlistURI;
			
			var newSongsNeedToBeStored = false;
			
			//das Vergleichsobjekt finden
			for(var i = 0; i < arrayStoredPlaylistObjects.length; i++){
				
				var storedPlaylistURI = arrayStoredPlaylistObjects[i].playlistURI;
				if(currentPlaylistURI==storedPlaylistURI ){
					playlistObjectForComparison = arrayStoredPlaylistObjects[i];
					storedPlaylistItemArray = playlistObjectForComparison.itemArray;
					break;
				}
			}
			
			//create a addObject and store it in an array for the echonnest call
			var addObject = {};
			addObject.tasteProfileId = playlistObjectForComparison.tasteProfileID ;
			addObject.addItemsArray= [];
			
			//comparing the two itemArrays, detecting new  songs
			currentPlaylistItemArray.forEach(function (entry1){
	
				var currentTrackIDForComparison = entry1.item.track_id;
				
				var storedObjectTrackIdsArray = new Array();
				
				storedPlaylistItemArray.forEach(function(entry2){
					storedObjectTrackIdsArray.push(entry2.item.track_id);
				});
				
				if($.inArray( currentTrackIDForComparison,storedObjectTrackIdsArray )==-1){
					console.log('DETECTED A NEW SONG IN STORED PLAYLIST: '+playlistObjectForComparison.playlistName);
					entry.tasteProfileID = playlistObjectForComparison.tasteProfileID;
					
					playlistObjectsToBeStoredAfterNewOrDeletedSongsCheck.push(entry);
					
					
					var addItemId = entry1.item.item_id;
					
					var addTrackId = addItemId.replace('spotify', 'spotify-WW');
					
					var addItemObject ={
						        		"action": "update",
						        		"item":
						        				{
						        				"item_id": addItemId ,
						        				"track_id": addTrackId
						        				}
										};
						
						
					addObject.addItemsArray.push(addItemObject);
					
					newSongsNeedToBeStored = true;
				};
			});
			
			
			if(newSongsNeedToBeStored){
				addSongsObjectsArray.push(addObject);
				tasteProfileAddUpdateIsNeeded = true;
			}
			
			
		});
		
		playlistObjectsToBeStoredAfterNewOrDeletedSongsCheck.forEach(function(entry){
			localStorage.setItem(entry.playlistURI , JSON.stringify(entry));
		});
		
	}
	
	function checkIfDeletedSongsInPLaylists(){
		console.log('checkIfDeletedSongsInPLaylists() was called');
		
		arrayStoredPlaylistObjects.forEach(function(entry) {
			var playlistObjectForComparison = null;
			var storedPlaylistItemArray = new Array();
			var currentPlaylistItemArray = new Array();
			var storedPlaylistURI = entry.playlistURI;
			var deleteObjectNeedsToBeStored = false;
			
			storedPlaylistItemArray = entry.itemArray;

			//das Vergleichsobjekt finden
			for(var i = 0; i < currentPlaylistObjectsArray.length; i++){
				
				var currentPlaylistURI = currentPlaylistObjectsArray[i].playlistURI;
				if(storedPlaylistURI == currentPlaylistURI){
					playlistObjectForComparison = currentPlaylistObjectsArray[i];
					currentPlaylistItemArray = playlistObjectForComparison.itemArray;
					break;
				}
			}
			
			//create a deleteObject and store it in an array for the echonnest call
			var deleteObject = {};
			deleteObject.tasteProfileId = entry.tasteProfileID ;
			deleteObject.deleteItemsArray= [];
			
			//comparing the two itemArrays, first detect deleted songs
			storedPlaylistItemArray.forEach(function (entry1){
				var storedTrackIDForComparison = entry1.item.track_id;
				var storedTrackItemId = entry1.item.item_id;
				
				var currentObjectTrackIdsArray = new Array();
				
				currentPlaylistItemArray.forEach(function(entry2){
					currentObjectTrackIdsArray.push(entry2.item.track_id);
				});
				
				
				
				if($.inArray( storedTrackIDForComparison,currentObjectTrackIdsArray )==-1){
					console.log('DETECTED A DELETED SONG IN CURRENT PLAYLIST: '+playlistObjectForComparison.playlistName);
					playlistObjectForComparison.tasteProfileID = entry.tasteProfileID;
					//localStorage.setItem(playlistObjectForComparison.playlistURI ,JSON.stringify(playlistObjectForComparison));
					
					playlistObjectsToBeStoredAfterNewOrDeletedSongsCheck.push(playlistObjectForComparison);
					
					updateArrayStoredPlaylistObjects();
					
					 var deleteItemObject ={
					        "action": "delete",
					        "item":
					            {
					                "item_id": storedTrackItemId ,
					            }
					    };
					
					
					deleteObject.deleteItemsArray.push(deleteItemObject);
					deleteObjectNeedsToBeStored = true;
						
				};
			});
			
			if(deleteObjectNeedsToBeStored){
				deleteSongsObjectsArray.push(deleteObject);
				tasteProfileDeleteUpdateIsNeeded = true;
			}
			
		});//end of for each() of deleted songs detection;
	}
	
	
	function getArrayOfAllSongsInSpotifyPlaylists1(){
		return arrayOfAllSongsInSpotifyPlaylists;
	}
	
	
	function setUpPlaylistInformation1(tasteProfileScript1, models1, Library, echonestDynamic){
		
		echonestTasteProfileScript = tasteProfileScript1;
		echonestTasteProfileScript.setApiKey();
		echonestTasteProfileScript.setupPlaylistSimilarity();

		console.log('PLAYLIST INFORMATION setUpPlaylistInformation1 was called');
		models = models1;
		library = Library;
		userLibrary =  library.forCurrentUser();
		
		playlistCollection = userLibrary.playlists;
		
		playlistCollection.snapshot().done(function(snapshot) {
			
			  for (var i = 0; i < snapshot.length; i++) {
			    
			    var playlistI = snapshot.get(i)
			    if(playlistI != null){
			    
			    	var playlistName = playlistI.name;
			    
			    	arrayOfPlaylistNames.push(playlistName);
			    
			    	var tracks = null;
				   
			    	playlistI.load('tracks').done(function(playlistI){
			    		tracks =playlistI.tracks;
					
			    		tracks.snapshot().done(function(snapshot1) {
				    	  for (var i = 0; i < snapshot1.length; i++) {
				    	    arrayOfAllSongsInSpotifyPlaylists.push(snapshot1.get(i));
				    	  }
				    	  echonestDynamic.setArrayOfAllSongs(arrayOfAllSongsInSpotifyPlaylists);
				    	});
			    	});
		
			    }
			  }//end for loop
			  
		});
			  
	   checkIfFirstLocalStorageOfPlaylists1();  
	 
	}
