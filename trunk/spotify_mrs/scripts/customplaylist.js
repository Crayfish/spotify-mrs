require([
  '$api/models',
  '$views/list#List'
], function(models, List) {
  'use strict';

  
  
  var createNewPlaylist = function() {
	  createNewPlaylist1(models, List);
  };
  
  var addTrackToPlaylist = function(trackID){
	  addTrackToPLaylist1(List, models, trackID);
  };
  
  var setupFlipButton = function(){
	  var flipbutton = document.getElementById('flipbutton');
	  flipbutton.onclick=function(){
	    console.log("flip button pressed");
	    showPlaylist();
	  }
  };
  
  var showPlaylist = function(){
	  showPlaylist1(List);
  };

  exports.addTrackToPlaylist = addTrackToPlaylist; 
  exports.createNewPlaylist = createNewPlaylist;
  exports.setupFlipButton = setupFlipButton;
  exports.showPlaylist = showPlaylist;
  
});//end require

//***************************************************************************************************************


var playlist = null;
var list = null;

/**
 * Create a new empty playlist.
 * @param models1 @see spotify api.models
 * @param List @see spotify views.List
 */
function createNewPlaylist1(models1, List){
	
	if (playlist != null) clearPlaylist(models1);
	
	playlist = null;
	playlist = models1.Playlist.createTemporary("my new mrs playlist").done(function(playlist){
		console.log("empty playlist created: ");
	});
	
	playlist.done(function(playlist){
		if(list == null){
			list = List.forPlaylist(playlist);
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
			track.load('playable').done(function(track) {
				if(track.playable){
					loadedPlaylist.tracks.add(track);
					console.log("track added to playlist");
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
function showPlaylist1(List){
	console.log(playlist);
	playlist.done(function(playlist){
		list.clear();
		list.setItem(playlist);
		list.init();
	});
	
//	playlist.done(function(playlist){
//		if(list == null){
//			list = List.forPlaylist(playlist);
//		    document.getElementById('playlistContainer').appendChild(list.node);
//		    list.init();
//		}
//		else{
//			
//			list.setItem(playlist);
//			list.init();
//		}
//		
//	});
//	console.log(list);
}

/**
 * Clears the playlist and the list.
 * Called on new session. 
 * @param models1 @see spotify api.models
 */
function clearPlaylist(models1){
	
//	playlist.load("tracks").done(function(playlist){{
//		playlist.tracks.clear();
//	}
	
//	playlist.done(function(playlist){
//		playlist.load("tracks").done(function(loadedPlaylist){
//			loadedPlaylist.tracks.clear();
//		}
//	});
	
//	if (list!=null) {
//		playlist.done(function(playlist){
//			list.destroy();
//		});
//	}
//	
//	console.log("playlist before remove= "+playlist);
//	playlist.done(function(playlist){
//		models1.Playlist.removeTemporary(playlist);
//	});

	playlist = models1.Playlist.removeTemporary("my new mrs playlist").done(function(playlist){
		this.playlist = playlist;
		console.log("playlist deleted");
	});
	
	console.log("playlist after remove= "+playlist);
//		
	//list.destroy();
	console.log(list);
	
		
	
	
	
}

