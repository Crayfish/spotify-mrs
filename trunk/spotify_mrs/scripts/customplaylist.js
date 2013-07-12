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
  
});

var cnt = 0;
var playlist;
var album;
var list;

function createNewPlaylist1(models1, List){
	
	//clearPlaylist(models1);
	
	playlist = models1.Playlist.createTemporary("my new mrs playlist").done(function(playlist){
		console.log("empty playlist created: ");
	});
	
}

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

function showPlaylist1(List){
	console.log(playlist);

	playlist.done(function(playlist){
		list = List.forPlaylist(playlist);
	    document.getElementById('playlistContainer').appendChild(list.node);
	    list.init();
	});
	
}

function clearPlaylist(models1){
	models1.Playlist.removeTemporary(playlist).done(function(playlist){
		console.log("old playlist deleted")
	});
}

