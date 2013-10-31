require([
  '$api/models',
  '$views/list#List',
  'scripts/yearSlider'
], function(models, List, yearSlider) {
  'use strict';
  
  
  var createNewPlaylist = function(idsArray) {
	  createNewPlaylist1(models, List, yearSlider, idsArray);
  };
  
  
  var setupSubscribeButton = function(){
	  setupSubscribeButton1(models);
  };
  
  var showPlaylist = function(){
	  showPlaylist1(List);
  };
  
  var setActivePage = function(pagenr){
	  setActivePage1(pagenr);
  };
  
  var setInfo = function(info){
	  setInfo1(info);
  };
  
  var getInfoString = function(){
	  return getInfoString1();
  };
  
  var getInfoTitle = function(){
	  return getInfoTitle1();
  };

  exports.createNewPlaylist = createNewPlaylist;
  exports.setupSubscribeButton = setupSubscribeButton;
  exports.showPlaylist = showPlaylist;
  exports.setActivePage = setActivePage;
  exports.setInfo = setInfo;
  exports.getInfoString = getInfoString;
  exports.getInfoTitle = getInfoTitle;
  
});//end require

//***************************************************************************************************************

/**the current (last created) playlist*/
var playlist = null;
/**the current list to show the playlist*/
var list = null;
/**array of all created playlists*/
var playlists = new Array();
/**array of all settings*/
var infos = new Array();
/**playlist counter*/
var playlistcnt = 0;
/**the number of the currently shown playlist in the accordion, for saving purposes*/
var activeplaylist = 0;
/**the collection of string literals used for the current search. showed as hint*/
var searchstring = "hello world<br>thisis a new line";
var pageCnt = 0;


var infoStringArray = new Array();

/**
 * Create a new empty playlist, and a new list in the playlist accordion.
 * The different playlists are saved in an array.
 * @param models1 @see spotify api.models
 * @param List @see spotify views.List
 */
function createNewPlaylist1(models1, List, yearSlider, idsArray){
	
	list = null;
	var processed = 0;
	
	//create a temporary playlist and clear it, save it to the array
	var playlist1 = models1.Playlist.createTemporary("MRS Playlist "+playlistcnt).done(function(playlist1){
		playlists[playlistcnt] = playlist1;
		playlistcnt++;
		

		//load tracks into playlist
		playlist1.load("tracks").done(function(tracks) {
				
			console.log("delete old songs from the playlist");
			playlist1.tracks.clear().done(function(clearedtracks){
				console.log("adding new tracks");
				
				var tracksarray = models1.Track.fromURIs(idsArray);
				console.log("Tracks loaded from URI: "+tracksarray.length);
				
				playlist1.tracks.add(tracksarray).done(function(addedManyTracks){
					console.log("all tracks added to the playlist "+addedManyTracks.uri);
					showPlaylist1(List, yearSlider);
				});
				
			});
		});

		console.log("empty playlist created");
	});
	
	
	
	playlist = playlist1;


}


/**
 * Make the playlist visible for the user.
 * Triggered by user interaction (button click).
 * Adds the content of the playlist to the List.
 * @param List @see spotify views.List
 */
function showPlaylist1(List, yearSlider){

	console.log("adding list item to playlist view");
	
	playlist.done(function(playlist){
		if(list == null){//add playlist only once
			
			list = List.forPlaylist(playlist, {height:"dynamic",style:"rounded",fields: ["ordinal","star","share", "track","time", "artist", "album"]});
			document.getElementById('playlistContainer').appendChild(list.node);
			list.init();
			
			
			
			
		/*	var infodiv = document.createElement('div');
			infodiv.className="playlistinfo";
			infodiv.innerHTML = 
				'<img id="infobutton" src="img/info.png" title="Recommendation made upon the following settings">'
				+ yearSlider.getInfo();
			$('#playlistContainer').prepend(infodiv);*/
				
		}
		else{
			console.log("show playlist: list is not null");
		}
		
		console.log("show playlist "+playlist);
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
			playlist._args[0].tracks.clear().done(function(){
				console.log("playlist deleted");
			});
			
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
	
	$("#subscribebutton").button().click(function(event) {
		//event.preventDefault();
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
	});
	
}



/**
 * Set the active page in the pagination, for playlist saving purposes.
 * active playlist = active page - 1!
 * @param pagenr the current page number in the pagination
 */
function setActivePage1(pagenr){
	activeplaylist = pagenr -1;
	var info = infos[pagenr-1];
	
	$("#slider-songHot").slider( "value", parseInt(info.songtrendiness) );
	$("#slider-hot").slider( "value", parseInt(info.artisttrendiness));
	$("#slider-pop").slider( "value", parseInt(info.artistpopularity));
	$("#artistVarietySlider").slider( "value", parseInt(info.artistvariety));
	if(!isNaN(info.adventurousness)) $("#adventurousnessSlider").slider( "value", parseInt(info.adventurousness));
	
	
}

/**
 * Set settings information for the currrent search
 */
function setInfo1(info){
	infos[pageCnt] = info;
	console.log("-----Informaion set for page "+pageCnt+": "+infos[pageCnt].artist);
	pageCnt++;
	
	
}

function getInfoString1(){
	var info = infos[pageCnt-1];
	var returnstring = "<div id='info'>Recommendations are based upon the following settings: <br/>";
	
	if(info.artistmode){
		returnstring = returnstring+"<i>artist</i>"+" <b>"+info.artist+"</b>"; 
		if(info.excludeartist) returnstring = returnstring+" (artist's songs excluded)";
	}
	else if(info.songmode){
		returnstring = returnstring+"<i>song</i> <b>"+info.track+"</b>"; 
		if(info.excludeartist) returnstring = returnstring+" (artist's songs excluded)";
	}
	else if(info.genremode){
		returnstring = returnstring+"<i>genre</i> "+"<b>"+info.genre+"</b>";
	}
	else if(info.playlistmode){
		returnstring+"<i>playlist</i> <b> "+info.playlist+"</b>";
	}
	
	if(info.excludeplaylist){
		returnstring = returnstring + "<br/> Songs from my spotify playlists are excluded.";
	}
	
	//returnstring = returnstring +"<br/>Tracks were released between "+min+" and "+max;
	
	var value1;
	switch(info.songtrendiness){
		case 0: value1 = "Off"; break;
		case 1: value1 = "Lowest"; break;
		case 2: value1 = "Low"; break;
		case 3: value1 = "Medium"; break;
		case 4: value1 = "High"; break;
		case 5: value1 = "Highest"; break;
	}
	returnstring = returnstring+"<br/>Song Trendiness:<i>( "+value1+" )    </i>   ";

	var value2;
	switch(info.artisttrendiness){
		case 0: value2 = "Off"; break;
		case 1: value2 = "Lowest"; break;
		case 2: value2 = "Low"; break;
		case 3: value2 = "Medium"; break;
		case 4: value2 = "High"; break;
		case 5: value2 = "Highest"; break;
	}
	returnstring = returnstring+"<br/>Artist Trendiness:<i>( "+value2+" )    </i>   ";

	var value3;
	switch(info.artistpopularity){
		case 0: value3 = "Off"; break;
		case 1: value3 = "Lowest"; break;
		case 2: value3 = "Low"; break;
		case 3: value3 = "Medium"; break;
		case 4: value3 = "High"; break;
		case 5: value3 = "Highest"; break;
	}
	returnstring = returnstring+"<br/>Artist Popularity:<i>( "+value3+" )    </i>   ";

	if (info.artistvariety != 50){
		returnstring = returnstring+"<br/>Artist Variety:<i>( "+parseInt(info.artistvariety)+" )     </i>";
	}
	
	if(info.adventurousness!=20 || !isNaN(info.adventurousness)){
		returnstring = returnstring+"<br/>Adventurousness:<i>( "+parseInt(info.adventurousness)+" ) </i>";
	}
	
//	if(artistterms.length != 0){
//		returnstring = returnstring+ "<br/> Songs are played by artists matching the following descriptions: ";
//		for(var i=0; i< artistterms.length;i++){
//			
//			returnstring = returnstring+" " +artistterms[i];
//			
//			if((i+1)!=artistterms.length){
//				returnstring = returnstring+", "
//			}
//		}
//	}
	
	if(info.artiststartyearbefore!="off"){
		returnstring = returnstring + "<br>Artists of these tracks <i>started</i> recording music <i>before</i> "+artistStartYearBefore;
	}
	
	if(info.artiststartyearafter!="off"){
		returnstring = returnstring + "<br>Artists of these tracks <i>started</i> recording music <i>after</i> "+artistStartYearAfter;
	}
	
	if(info.artistendyearbefore!="off"){
		returnstring = returnstring + "<br>Artists of these tracks <i>ended</i> recording music <i>before</i> "+artistEndYearBefore;
	}
	
	if(info.artistendyearafter!="off"){
		returnstring = returnstring + "<br>Artists of these tracks <i>ended</i> recording music <i>after</i> "+artistEndYearAfter;
	}
	
	//console.log(artistStartYearBefore+" "+artistStartYearAfter+" "+artistEndYearBefore+" "+artistEndYearAfter);
	
	returnstring = returnstring+"</div>"
	
	//resetYear();
	
	return returnstring;
}

function getInfoTitle1(){
	var info = infos[pageCnt-1];
	var infotitle;
	if(info.artistmode) infotitle = "Recommendations for "+info.artist;
	else if(info.songmode) infotitle = "Recommendations for "+info.track;
	else if(info.genremode) infotitle = "Recommendations for "+info.genre;
	else if(info.playlistmode) infotitle = "Recommendations for your playlist "+info.playlist;
	
	return infotitle;
}

