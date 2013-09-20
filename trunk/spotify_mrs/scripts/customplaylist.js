require([
  '$api/models',
  '$views/list#List',
  'scripts/yearSlider'
], function(models, List, yearSlider) {
  'use strict';
  
  
  var createNewPlaylist = function() {
	  createNewPlaylist1(models, List);
  };
  
  var addTrackToPlaylist = function(trackID){
	  addTrackToPLaylist1(List, models, trackID, yearSlider);
  };
  
  var setupFlipButton = function(){
	  var cnt = 0;
	  var flipbutton = document.getElementById('flipbutton');
	  var flipimg = document.getElementById('flipbuttonimg');
	  flipbutton.onclick=function(){
		  if(cnt%2==0){
			  console.log("playlist is front");
			  flipimg.src="img/cover.png";
			  showPlaylist();
		  }
		  else{
			  console.log("covers are front");
			  flipimg.src="img/listicon.png";
		  }
		  
		  document.querySelector('#flip-toggle').classList.toggle('flip');
		  cnt++;
	  }
	  
	  setupSubscribeButton(models);
	 
	  
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
var playlists = new Array();
var playlistcnt = 0;

/**
 * Create a new empty playlist.
 * The playlist is created once, the tracks are deleted on new session.
 * The temporary playlist will be deleted automatically, when the application is closed.
 * @param models1 @see spotify api.models
 * @param List @see spotify views.List
 */
function createNewPlaylist1(models1, List){
	
	if (playlist != null) clearPlaylist(models1);
	
	playlist = null;
	playlist = models1.Playlist.createTemporary("MRS Playlist").done(function(playlist){
		playlist.collaborative = true;
		playlists[playlistcnt] = playlist;
		playlistcnt++;
		console.log("Empty playlist created: "+playlist.uri);
	});
	
	//bind the playlist to the list when first created
	playlist.done(function(playlist){
		if(list == null){
			list = List.forPlaylist(playlist, {height:"fixed",style:"rounded", fields: ["ordinal","star","share", "track","time", "artist", "album"]});
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
function addTrackToPLaylist1(List, models1, trackID, yearSlider){
	
	var id = trackID.replace('-WW','');
	
	playlist.done(function(playlist){
		playlist.load("tracks").done(function(loadedPlaylist){
			var track = models1.Track.fromURI(id);
			track.load('playable', 'name').done(function(track) {
				if(track.playable){
					loadedPlaylist.tracks.add(track);
					console.log("Track added to playlist: "+track.name);
					list.refresh();
					yearSlider.addYear(track);
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

	playlist.done(function(playlist){
		list.clear();
		list.setItem(playlist);
		list.init();
		console.log(playlist);
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


/**
 * Create a new subscribe button, that saves the current playlist for the user. 
 * Tracks from the temporary playlist are copied to a persistent new playlist.
 * @param models1 @see spotify api.models
 */
function setupSubscribeButton(models1){
	var subscribebutton = document.getElementById('subscribebutton');
	  subscribebutton.onclick=function(){
		  
		  //create new playlist
		  var newplaylist = models1.Playlist.create("my recommended playlist");
		  
		  //load tracks from temporary playlist
		  playlist.done(function(playlist){
			  playlist.load('tracks').done(function(playlist1){
				  playlist1.tracks.snapshot().done(function(snapshot1){
					  
					  //add tracks to the new playlist
					  newplaylist.done(function(newplaylist){
						  newplaylist.load('tracks').done(function(newplaylist){
							  for (var i = 0; i < snapshot1.length; i++) {
								  newplaylist.tracks.add(snapshot1.get(i));
							  }
							   
						  });
					  });
					  
				  });
			  });
		  });
	  }
}

