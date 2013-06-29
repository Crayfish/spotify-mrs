require([
  '$api/models',
  '$views/list#List'
], function(models, List) {
  'use strict';

  
  
  var doPlaylistForAlbum = function() {
	  doPlaylistForAlbum1(models);
  };
  
  var addTrackToPlaylist = function(trackID){
	  addTrackToPLaylist1(models, trackID);
  };

  exports.addTrackToPLaylist = addTrackToPlaylist; 
  exports.doPlaylistForAlbum = doPlaylistForAlbum;
  
});

var playlist;

function doPlaylistForAlbum1(models){
	 playlist = new models.Playlist();
	 console.log("empty playlist created");
	 /*var list = List.forPlaylist(playlist);
		document.getElementById('playlistContainer').appendChild(list.node);
		list.init();*/
}

function addTrackToPLaylist1(models1, trackID1){
	var id = trackID1.replace('-WW','');
	var playlist = new models1.Playlist();
	
	console.log("add new track to playlist: "+id);
	var track = models1.Track.fromURI(id);
	track.load('name','artists').done(function(track) {
		console.log("track: "+track.name);
	});
	
	  
}

