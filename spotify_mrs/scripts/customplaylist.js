require([
  '$api/models',
  '$views/list#List',
  'scripts/yearSlider'
], function(models, List, yearSlider) {
  'use strict';
  
  
  var createNewPlaylist = function(idsArray) {
	  createNewPlaylist1(models, List, yearSlider, idsArray);
  };
  
  var addTrackToPlaylist = function(trackID){
	  addTrackToPLaylist1(List, models, trackID, yearSlider);
  };
  
  var setupSubscribeButton = function(){
	  console.log("Subscribe button setup");
	 
	  
	  setupSubscribeButton1(models);
	 
	  
  };
  
  var showPlaylist = function(){
	  showPlaylist1(List);
  };
  
  var setSearchAttributes = function(searchattributes){
	  setSearchAttributes1(searchattributes);
  };

  exports.addTrackToPlaylist = addTrackToPlaylist; 
  exports.createNewPlaylist = createNewPlaylist;
  exports.setupSubscribeButton = setupSubscribeButton;
  exports.showPlaylist = showPlaylist;
  exports.setSearchAttributes = setSearchAttributes;
  
});//end require

//***************************************************************************************************************

/**the current (last created) playlist*/
var playlist = null;
/**the current list to show the playlist*/
var list = null;
/**array of all created playlists*/
var playlists = new Array();
/**playlist counter*/
var playlistcnt = 0;
/**the number of the currently shown playlist in the accordion, for saving purposes*/
var activeplaylist = 0;
/**the collection of string literals used for the current search. showed as hint*/
var searchstring = "hello world<br>thisis a new line";

var pageCount = 1;

/**
 * Create a new empty playlist, and a new list in the playlist accordion.
 * The different playlists are saved in an array.
 * @param models1 @see spotify api.models
 * @param List @see spotify views.List
 */
function createNewPlaylist1(models1, List, yearSlider, idsArray){
	
	console.log("playlist: "+playlist);
	
	console.log('CUSTOM PLAYLIST createNewPlaylist1 ids Array: '+idsArray)
	
	//reset the year range when a new list is created
	yearSlider.reset();
	
	//create a temporary playlist and clear it, save it to the array
	var playlist1 = models1.Playlist.createTemporary("MRS Playlist "+playlistcnt).done(function(playlist1){
		playlists[playlistcnt] = playlist1;
		playlistcnt++;
		clearPlaylist(models1);
		console.log("Empty playlist created: "+playlist1.uri);
		
	});
	
	//set the current playlist
	playlist = playlist1;
	
	playlist.done(function(playlist){
		playlist.load("tracks").done(function(loadedplaylist){
			for(var i; i<idsArray.lenght; i++){
				console.log("next track id "+id);
				loadedplaylist.tracks.add(models1.Track.fromURI(id));
			}
		});
	});
	
	
	//bind the playlist to the a new list and add an item to the playlist accordion
	playlist.done(function(playlist){
		
		//create a List for the current playlist
		list = List.forPlaylist(playlist, {height:"dynamic",style:"rounded",fields: ["ordinal","star","share", "track","time", "artist", "album"]});
		
		
		
		document.getElementById('playlistContainer').appendChild(list.node);
		
		 //init the list
		list.init();
		
		
	});
/*	$("div.p_holder").jPages("destroy").jPages({
        containerID   : "playlistContainer",
        perPage       :1,
        first       : "first",
        previous    : "previous",
        next        : "next",
       last        : "last",
       // last        :  "Next Songs",
        animation   : "fadeInLeftBig",
      
       
    });
     
     $("div.p_holder").jPages( pageCount );
     pageCount= pageCount+1;
     
     console.log("page count: "+pageCount )*/
}

/**
 * Add a new track to the playlist. Tracks are provided by the echonestDynamic.js script.
 * @param List @see spotify views.List
 * @param models1 @see spotify api.models
 * @param trackID echonest ID of the track to be added
 */
function addTrackToPLaylist1(List, models1, trackID, yearSlider){
	
	//convert track ID
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
			console.log("playlist deleted");
		});
	}
	
	
	

}


/**
 * Create a new subscribe button, that saves the current playlist for the user. 
 * Tracks from the temporary playlist are copied to a persistent new playlist.
 * @param models1 @see spotify api.models
 */
function setupSubscribeButton1(models1){
	console.log("subscribe button setup");
	var subscribebutton = document.getElementById('subscribebutton');
	 
	subscribebutton.onclick=function(){
		  
		  console.log("Subscribe button clicked.");
		 
		  //create new persistent playlist
		  var newplaylist = models1.Playlist.create("TMR Playlist "+activeplaylist);
		  
		  //load tracks from temporary playlist
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
	  }
}

/**
 * Setup the playlist accordions.
 * When an accordion is selected, change the nr of the playlist to save.
 */
/*function setupPlaylistAccordion1(){
	console.log("Setting up playlist accordion");
	
	 $( "#playlistaccordion").accordion({
		 activate: function( event, ui ) {
			 
			var active = $( "#playlistaccordion" ).accordion( "option", "active" );	 
			console.log("A new playlistaccordion header was activated: "+active);
			activeplaylist = parseInt(active);
		 
		 }
	 });
}*/

/**
 * Set the search string for the current search. Used as hint in the playlist view.
 * @param searchattributes collection of string literals
 */
function setSearchAttributes1(searchattributes){
	searchstring = searchattributes;
}

