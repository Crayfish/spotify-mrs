require([
  '$api/models',
  '$views/list#List',
  'scripts/yearSlider'
], function(models, List, yearSlider) {
  'use strict';
  
  
  var createNewPlaylist = function() {
	  createNewPlaylist1(models, List, yearSlider);
  };
  
  var addTrackToPlaylist = function(trackID){
	  addTrackToPLaylist1(List, models, trackID, yearSlider);
  };
  
  var setupFlipButton = function(){
	  console.log("flip button setup");
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
	  setupPlaylistAccordion1();
	  
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
var activeplaylist = 0;

/**
 * Create a new empty playlist, and a new list in the playlist accordion.
 * The different playlists are saved in an array.
 * @param models1 @see spotify api.models
 * @param List @see spotify views.List
 */
function createNewPlaylist1(models1, List, yearSlider){
	
	console.log("playlist: "+playlist);
	
	
	//if (playlist != null) clearPlaylist(models1);
	yearSlider.reset();
	
	//playlist = null;
	var playlist1 = models1.Playlist.createTemporary("MRS Playlist "+playlistcnt).done(function(playlist1){
		playlists[playlistcnt] = playlist1;
		playlistcnt++;
		clearPlaylist(models1);
		console.log("Empty playlist created: "+playlist1.uri);
	});
	
	playlist = playlist1;
	
	
	
	//bind the playlist to the a new list and add an item to the playlist accordion
	playlist.done(function(playlist){
		//if(list == null){
			list = List.forPlaylist(playlist, {height:"fixed",style:"rounded", fields: ["ordinal","star","share", "track","time", "artist", "album"]});
		    var h3 = document.createElement("h3");
		    h3.innerHTML = "playlist "+playlistcnt;
		    
		    var div = document.createElement("div");
		    div.appendChild(list.node);
			
			document.getElementById('playlistaccordion').appendChild(h3);
			document.getElementById('playlistaccordion').appendChild(div);
		    list.init();
		    $( "#playlistaccordion" ).accordion("refresh");
		    
		//}
		
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
	console.log("clearing playlist");
	if(playlist!=null){
		playlist._args[0].load("tracks").done(function(tracks){
			playlist._args[0].tracks.clear();
			//list.clear();
			console.log("playlist deleted");
		});
	}
	
	
	

}


/**
 * Create a new subscribe button, that saves the current playlist for the user. 
 * Tracks from the temporary playlist are copied to a persistent new playlist.
 * @param models1 @see spotify api.models
 */
function setupSubscribeButton(models1){
	console.log("subscribe button setup");
	var subscribebutton = document.getElementById('subscribebutton');
	  subscribebutton.onclick=function(){
		  
		  console.log("Subscribe button clicked.");
		  console.log("Nr of active playlist: "+activeplaylist);
		  console.log("playlist to save: "+playlists[activeplaylist]);
		  //create new playlist
		  var newplaylist = models1.Playlist.create("TMR Playlist "+activeplaylist);
		  //var currentplaylist = playlists[activeplaylist];
		  
		  //console.log("currentplaylist: "+models1.Playlist.fromURI(currentplaylist));
		  //console.log("playlist: "+playlist);
		  
		  //load tracks from temporary playlist
		 // models1.Playlist.fromURI(currentplaylist).done(function(playlist){
		  	playlists[activeplaylist].load('tracks').done(function(playlist1){
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
//		  });
	  }
}

/**
 * Setup the playlist accordions.
 * When an accordion is selected, change the nr of the playlist to save.
 */
function setupPlaylistAccordion1(){
	console.log("Setting up playlist accordion");
	
	$( "#playlistaccordion" ).accordion({ heightStyle: "content"});
	 
	 $( "#playlistaccordion").accordion({
		 activate: function( event, ui ) {
			 
			var active = $( "#playlistaccordion" ).accordion( "option", "active" );	 
			console.log("A new playlistaccordion header was activated: "+active);
			activeplaylist = parseInt(active);
			console.log("Nr of active playlist: "+active);
		 
		 }
	 	});
	
	   $(".ui-accordion-content").css("padding","4px"); 
}

