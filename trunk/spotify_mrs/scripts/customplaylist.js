require([
  '$api/models',
  '$views/list#List', 
  '$views/buttons#ShareButton'
], function(models, List, ShareButton) {
  'use strict';
  
  
  var createNewPlaylist = function() {
	  createNewPlaylist1(models, List, ShareButton);
  };
  
  var addTrackToPlaylist = function(trackID){
	  addTrackToPLaylist1(List, models, trackID);
  };
  
  var setupFlipButton = function(){
	  var cnt = 0;
	  var flipbutton = document.getElementById('flipbutton');
	  flipbutton.onclick=function(){
		  if(cnt%2==0){
			  console.log("playlist is front");
			  showPlaylist();
		  }
		  else{
			  console.log("covers are front");
		  }
		  
		  document.querySelector('#flip-toggle').classList.toggle('flip');
		  cnt++;
	  }
  };
  
  var showPlaylist = function(){
	  showPlaylist1(List, ShareButton);
  };

  exports.addTrackToPlaylist = addTrackToPlaylist; 
  exports.createNewPlaylist = createNewPlaylist;
  exports.setupFlipButton = setupFlipButton;
  exports.showPlaylist = showPlaylist;
  
});//end require

//***************************************************************************************************************


var playlist = null;
var list = null;
var button =null;

/**
 * Create a new empty playlist.
 * The playlist is created once, the tracks are deleted on new session.
 * @param models1 @see spotify api.models
 * @param List @see spotify views.List
 * @param List @see spotify views.buttons#ShareButton
 */
function createNewPlaylist1(models1, List, ShareButton){
	
	if (playlist != null) clearPlaylist(models1);
	
	playlist = null;
	playlist = models1.Playlist.createTemporary("MRS Playlist").done(function(playlist){
		console.log("Empty playlist created.");
	});
	
	if(button==null){
		playlist.done(function(playlist){
			button = ShareButton.forPlaylist(playlist);
			document.getElementById('playlistHeader').appendChild(button.node);
		});
	}
	//bind the playlist to the list when first created
	playlist.done(function(playlist){
		if(list == null){
			list = List.forPlaylist(playlist, {height:"fixed",style:"rounded"});
		    document.getElementById('playlistContainer').appendChild(list.node);
		    list.init();
		}
		
	});
	
}

/**
 * Add a new track to the playlist. Tracks are provided by the echonestDynamic.js script.
 * @param List @see spotify views.List
 * @param models1 @see spotify api.models
 * @param trackID echonest ID of the track to be added
 */
function addTrackToPLaylist1(List, models1, trackID){
	
	var id = trackID.replace('-WW','');
	
	playlist.done(function(playlist){
		playlist.load("tracks").done(function(loadedPlaylist){
			var track = models1.Track.fromURI(id);
			track.load('playable', 'name').done(function(track) {
				if(track.playable){
					loadedPlaylist.tracks.add(track);
					console.log("Track added to playlist: "+track.name);
				}
			});
			
		});
	});
	
}

/**
 * Make the playlist visible for the user.
 * Triggered by user interaction (button click).
 * Adds the content of the playlist to the List.
 * @param List @see spotify views.List
 */
function showPlaylist1(List, ShareButton){

	playlist.done(function(playlist){
		list.clear();
		list.setItem(playlist);
		list.init();
		button = ShareButton.forPlaylist(playlist);
	});
	
}

/**
 * Clears the playlist`s tracks list and the list.
 * Called on new session. 
 * @param models1 @see spotify api.models
 */
function clearPlaylist(models1){
	
	playlist._args[0].load("tracks").done(function(tracks){
		playlist._args[0].tracks.clear();
		list.clear();
		console.log("playlist deleted");
	});
	
	

}

