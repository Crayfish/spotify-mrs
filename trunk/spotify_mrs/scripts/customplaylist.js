require([
  '$api/models',
  '$views/list#List'
], function(models, List) {
  'use strict';

  
  
  var doPlaylistForAlbum = function() {
	  doPlaylistForAlbum1(models, List);
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

  exports.addTrackToPLaylist = addTrackToPlaylist; 
  exports.doPlaylistForAlbum = doPlaylistForAlbum;
  exports.setupFlipButton = setupFlipButton;
  exports.showPlaylist = showPlaylist;
  
});

var cnt = 0;
var playlist;
var album;
var list;

function doPlaylistForAlbum1(models1, List){
	
	album = new models1.Playlist("my playlist");
	//album = models1.Playlist.create();
	//album = models1.Album.fromURI('spotify:album:2mCuMNdJkoyiXFhsQCLLqw');
	 list = new List(album);
//	 list.init();
	 console.log("empty playlist created");
	
}

function addTrackToPLaylist1(List, models1, trackID1){
	//var album = models1.Album.fromURI('spotify:album:5rCCCernTo6IwFwEZM4H53');
	//album = new models1.Playlist("my playlist");
	var id = trackID1.replace('-WW','');
	var track = models1.Track.fromURI(id);
	album.tracks.add(track);
	
//    album.load("tracks").done(function(album){
//    	var id = trackID1.replace('-WW','');
//    	 console.log("album loaded");
//    	var track = models1.Track.fromURI(id).load("name").done(function(track){
//    		album.tracks.add(track).done(function(track){
//    			console.log("Track added to the playlist: "+track.name);
//    		});
//    		
//    	});
//        
//    });
	
	

    //list.init();
//	var playlist1 = models1.Playlist.fromURI("spotify:user:spotify:playlist:3Yrvm5lBgnhzTYTXx2l55x");
//    playlist1.subscribed = true;
//    var id = trackID1.replace('-WW','');
//	playlist1.add(models1.Track.fromURI(id));
	
//	var pl = new models1.Playlist("temp");
//	pl.subscribed = true;
//	var id = trackID1.replace('-WW','');
//	console.log("add song "+id+ " to playlist "+pl.name);
//	
//	var track = models1.Track.fromURI(id).load().done(function(pl){
//		console.log("playlist cnt: "+cnt);
//		cnt = cnt +1;
//			
//	});
//	pl.tracks.add(track);
	
	
//	playlist = new models1.PLaylist("My Playlist").load('tracks').done(function(playlist){
//		console.log("playlist loaded: "+playlist);
//	});
	
	
	
	
//	var playlist = new models1.Playlist("My Playlist").load('tracks').done(function(playlist){
//		console.log("playlist: "+playlist);
//		console.log("add new track to playlist: "+id);
//		var track = models1.Track.fromURI(id);
//		playlist.tracks.add(track);
//		
//		track.load('name','artists').done(function(track) {
//			console.log("track: "+track.name);
//		});
//		var list = List.forPlaylist(playlist);
//		document.getElementById('playlistContainer').appendChild(list.node);
//		
//	});
	
	//var list = new List(playlist);	
	//document.getElementById('playlistContainer').appendChild(list.node);
	
	  
}

function showPlaylist1(List){
	console.log(album.tracks);
	
		//var collection = album.tracks;
	   	//list = List.forCollection(collection);
	   //list = List.forPlaylist(album);
    document.getElementById('playlistContainer').appendChild(list.node);
    list.init();
    list.focus();
    
   
}

function clearPLaylist(){
	album.clear();
}

