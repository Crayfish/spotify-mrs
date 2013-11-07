require([
  '$api/models',
  '$views/list#List'
  //'scripts/yearSlider',
  
 
], function(models, List) {
  'use strict';
  
  
  var createNewPlaylist = function(idsArray) {
	  createNewPlaylist1(models, List, idsArray);
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
  
  
  var addYear = function addYear(track){
	  addYear1(models, track);
  }
  
  var setArtistTerms = function(artisttermsarray){
	  setArtistTerms1(artisttermsarray);
  }

  var setActivePageForNewPage = function(pagenr){
	  setActivePageForNewPage1(pagenr);
  }
  
  exports.createNewPlaylist = createNewPlaylist;
  exports.setupSubscribeButton = setupSubscribeButton;
  exports.showPlaylist = showPlaylist;
  exports.setActivePage = setActivePage;
  exports.setInfo = setInfo;
  exports.getInfoString = getInfoString;
  exports.getInfoTitle = getInfoTitle;
  exports.addYear = addYear;
  exports.setArtistTerms = setArtistTerms;
  exports.setActivePageForNewPage = setActivePageForNewPage;

  
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
/**minimum and maximum years in the collection (temporary playlist)*/
var min = 2013;
var max = 1900;


var infoStringArray = new Array();

/**
 * Create a new empty playlist, and a new list in the playlist accordion.
 * The different playlists are saved in an array.
 * @param models1 @see spotify api.models
 * @param List @see spotify views.List
 */
function createNewPlaylist1(models1, List, idsArray){
	
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
					showPlaylist1(List);
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
function showPlaylist1(List){

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

function setActivePageForNewPage1(pagenr){
	activeplaylist = pagenr -1;
}

/**
 * Set the active page in the pagination, for playlist saving purposes.
 * active playlist = active page - 1!
 * @param pagenr the current page number in the pagination
 */
function setActivePage1(pagenr){
	activeplaylist = pagenr -1;
	
	
	var info = infos[pagenr-1];
	
	
	//console.log('SET ACTIVE PAGE simlarityInfoString: '+info.similarityInfoString);
	$('#similarityInfo').text(info.similarityInfoString);
	
	
	
	
	$("#slider-songHot").slider( "value", parseInt(info.songtrendiness) );
	if(parseInt(info.songtrendiness)==0){
		 $( "#slider-songHot" ).slider( "option", "disabled", true );
	}else{
		 $( "#slider-songHot" ).slider( "option", "disabled", false );
	}
	
	$("#slider-hot").slider( "value", parseInt(info.artisttrendiness));
	if(parseInt(info.artisttrendiness)==0){
		 $( "#slider-hot" ).slider( "option", "disabled", true );
	}else{
		 $( "#slider-hot" ).slider( "option", "disabled", false );
	}
	
	$("#slider-pop").slider( "value", parseInt(info.artistpopularity));
	if( parseInt(info.artistpopularity)==0){
		 $( "#slider-pop" ).slider( "option", "disabled", true );
		
	}else{
		 $( "#slider-pop" ).slider( "option", "disabled", false );
	}
	
	$("#artistVarietySlider").slider( "value", parseInt(info.artistvariety));
	if(!isNaN(info.adventurousness)) $("#adventurousnessSlider").slider( "value", parseInt(info.adventurousness));
	if(info.excludeplaylist){
		if(!$('#excludeSpotifyPlaylistSongsCheckBox').is(":checked")) $('#excludeSpotifyPlaylistSongsCheckBox').click();
	}
	else if(!info.excludeplaylist){
		if($('#excludeSpotifyPlaylistSongsCheckBox').is(":checked")) $('#excludeSpotifyPlaylistSongsCheckBox').click();
	}
	
	if(info.excludeartist){
		if(!$('#excludeSeedArtistCheckBox').is(":checked")) $('#excludeSeedArtistCheckBox').click();
	}
	else if(!info.excludeplaylist){
		if($('#excludeSeedArtistCheckBox').is(":checked")) $('#excludeSeedArtistCheckBox').click();
	}
	
	$('#artist_start_year_before_input').val(info.artiststartyearbefore);
	$('#artist_start_year_after_input').val(info.artiststartyearafter);
	$('#artist_end_year_before_input').val(info.artistendyearbefore);
	$('#artist_end_year_after_input').val(info.artistendyearafter);
	
	if(info.artistmode){
		/*document.forms["formSimilaritySection"]["artistRadiobtn"].click();*/
		$('#artistRadiobtn').prop('checked',true);
		//set the hidden <div> that new echonest calls are using for the query
		$('#seedArtistID').text(info.artistIDForEchonestCalls);
		$("#throbberInfo").text('Downloading Songs that are played by artists  similar to '+ info.artist);
		//hide playlist select GUI Items
		$('#tags1').hide();
		$('#playlistSelectLabel').hide();
		//show change seed artist Gui Items
		$('#changeSeedArtist').show();
		$('#changeSeedSong').hide();
		//hide genre select GUI Itmes
		$('#tags').hide();
		$('#genreSelectLabel').hide();
		//show excludeSeedArtistCheckBox
		$('#excludeSeedArtistCheckBox').show();
		$('#excludeSeedArtistLabel').show();
		$('#excludeSeedArtistLabel').next('br').show();
		//hide the adventurousness Slider
		$("#adventurousnessSlider").hide();
		$("#adventurousnessSliderLabel").hide();
		
		
		
	}
	else if(info.songmode){
		/*document.forms["formSimilaritySection"]["songRadiobtn"].click();*/
		
		//show somng similarity GUI Items
		$('#songRadiobtn').prop('checked',true);
		$('#seedsongID').text(info.trackIdForEchonestCalls);
		$("#throbberInfo").text('Downloading songs that are similar to ' + '"'+ info.track + '" by ' + info.artist);
		$('#excludeSeedArtistCheckBox').show();
		$('#excludeSeedArtistLabel').show();
		$('#excludeSeedArtistLabel').next('br').show();
		//hide change Seed artist and Seed Song Buttons
		$('#changeSeedArtist').hide();
		$("#changeSeedSong").show();
		//hide genre and Playlist GUI Items
		$('#tags').hide();
		$('#genreSelectLabel').hide();
		$('#tags1').hide();
		$('#playlistSelectLabel').hide();
		//hide adventurousness Slider
		$("#adventurousnessSlider").hide();
		$("#adventurousnessSliderLabel").hide();
		
		
	}
	else if(info.genremode) {
		/*document.forms["formSimilaritySection"]["genreRadiobtn"].click();*/
		
		//show genre GUI Items
		$('#genreRadiobtn').prop('checked',true);
		$('#tags').val(info.genre);
		$('#tags').show();
		$("#throbberInfo").text('Downloading songs that represent the genre '+ info.genre);
		$('#genreSelectLabel').show();
		//hide change Seed Song and Seed Artist
		$('#changeSeedSong').hide();
		$('#changeSeedArtist').hide();
		//playlist select GUI Items
		$('#tags1').hide();
		$('#playlistSelectLabel').hide();
		//hide  exclude seed artist
		$('#excludeSeedArtistCheckBox').hide();
		$('#excludeSeedArtistLabel').hide();
		$('#excludeSeedArtistLabel').next('br').hide();
		//hide adventurousness Slider
		$("#adventurousnessSlider").hide();
		$("#adventurousnessSliderLabel").hide();
	}
	else if(info.playlistmode) {
		/*document.forms["formSimilaritySection"]["playlistRadiobtn"].click();*/
		
		$('#seedCatalogID').text(info.seedCatalogID);
		
		//show playlist GUI Items
		$('#playlistRadiobtn').prop('checked',true);
		$('#tags1').val(info.playlist);
		$('#tags1').show();
		$('#playlistSelectLabel').show();
		$("#throbberInfo").text('Downloading songs that are simliar to your \"'+ info.playlist+ '\" Spotify-playlist');
		//show adventurousness Slider
		$("#adventurousnessSliderLabel").show();
		$("#adventurousnessSlider").show();
		//hide change Seed Song and Seed Artist
		$('#changeSeedSong').hide();
		$('#changeSeedArtist').hide();
		// hide genre select Gui Items
		$('#tags').hide();
		$('#genreSelectLabel').hide();
		//hide exclude seed artist
		$('#excludeSeedArtistCheckBox').hide();
		$('#excludeSeedArtistLabel').hide();
		$('#excludeSeedArtistLabel').next('br').hide();
		
	}
	
//	$("#tagCloud").tagCloud(new Array());
//	$("#tagCloud").empty();
	console.log("************info: "+JSON.stringify(info));
	console.log("===SETTING TAG CLOUD ARTIST TERMS: "+JSON.stringify(info.artisttermsarray));
	if (info.artisttermsarray instanceof Array){
		console.log("SETTING TAGCLOUD TAGS!!!!!!!!!!!!!!!!!");
		$("#tagCloud").tagCloud(new Array());
		$("#tagCloud").empty();
		$("#tagCloud").tagCloud(info.artisttermsarray);
	}
	if(info.selectedartistterms instanceof Array){
		console.log("_____selected artist terms");
		$("#tagCloud").setTerms(info.selectedartistterms);
	}
	
	//set the style term <div>
	var styleString = '';
	if(info.selectedartistterms instanceof Array && info.selectedartistterms.length != 0 ){
	for(var i = 0; i< info.selectedartistterms.length; i++){
		if(i==0){
			styleString = info.selectedartistterms[i];
		}else{
		styleString = styleString + ', '+info.selectedartistterms[i];
		}
		
	}
	console.log('CUSTOMPLAYLIST setActivePage1()  styleString to set: '+styleString);
	$('#styleTerm').text(styleString);	
	}
	
	
	console.log("Set Active page done.");

}

/**
 * Set settings information for the currrent search
 */
function setInfo1(info){
	infos[pageCnt] = info;
	console.log("-----Informaion set for page "+pageCnt+": "+infos[pageCnt].artist);
	pageCnt++;
	
}

function setArtistTerms1(artisttermsarray1){
	//console.log("---INFO to insert artist terms: "+JSON.stringify(infos[pageCnt-1]));
	
	//console.log("-----Artist terms array set for page "+(pageCnt-1)+": "+JSON.stringify(artisttermsarray1));
	infos[pageCnt-1].artisttermsarray= artisttermsarray1;
	//$("#tagCloud").tagCloud(artisttermsarray);
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
	
	returnstring = returnstring +"<br/>Tracks were released between "+min+" and "+max;
	
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
	
	if(info.adventurousness!=20 ){
		returnstring = returnstring+"<br/>Adventurousness:<i>( "+parseInt(info.adventurousness)+" ) </i>";
	}
	
	if(info.selectedartistterms.length != 0){
		var artistterms = info.selectedartistterms;
		returnstring = returnstring+ "<br/> Songs are played by artists matching the following descriptions: ";
		for(var i=0; i< info.selectedartistterms.length;i++){
			
			returnstring = returnstring+" " +info.selectedartistterms[i];
			
			if((i+1)!=info.selectedartistterms.length){
				returnstring = returnstring+", "
			}
		}
	}
	
	if(info.artiststartyearbefore!="off"){
		returnstring = returnstring + "<br>Artists of these tracks <i>started</i> recording music <i>before</i> "+info.artiststartyearbefore;
	}
	
	if(info.artiststartyearafter!="off"){
		returnstring = returnstring + "<br>Artists of these tracks <i>started</i> recording music <i>after</i> "+info.artiststartyearafter;
	}
	
	if(info.artistendyearbefore!="off"){
		returnstring = returnstring + "<br>Artists of these tracks <i>ended</i> recording music <i>before</i> "+info.artistendyearbefore;
	}
	
	if(info.artistendyearafter!="off"){
		returnstring = returnstring + "<br>Artists of these tracks <i>ended</i> recording music <i>after</i> "+info.artistendyearafter;
	}
	
	//console.log(artistStartYearBefore+" "+artistStartYearAfter+" "+artistEndYearBefore+" "+artistEndYearAfter);
	
	returnstring = returnstring+"</div>"
	
	
	//resetYear();
	
	
	return returnstring;
}

function getInfoTitle1(){
	var info = infos[pageCnt-1];
	var infotitle;
	if(info.artistmode) infotitle = "Songs played by artists simliar to "+info.artist;
	else if(info.songmode) infotitle = "Songs similar to \""+info.track+"\" by "+info.artist;
	else if(info.genremode) infotitle = "Songs for genre "+info.genre;
	else if(info.playlistmode) infotitle = "Songs similar to your spotify "+info.playlist+" playlist";
	
	return infotitle;
}

/**
 * Extract the release year of the track and update the min and max year values.
 * @param models spotify models api
 * @param track the current track
 */
function addYear1(models, track){
	
	track.load('album').done(function(){
		track.album.load('date').done(function(){
			
			var year = track.album.date;
			
			if(year > 0){
				console.log("track release year: "+year);
				max = Math.max(max,year);
				min = Math.min(min,year);
			}
		});
	});
}

