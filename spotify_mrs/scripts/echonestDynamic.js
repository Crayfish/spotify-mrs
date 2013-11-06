/***
 * Handler for echonest requests and results.
 */
require([
	'$api/models', 
	'$views/throbber#Throbber', 
	'scripts/jPagesTrackCover',
	'scripts/apiKey',
	//'scripts/customplaylist'

],function(models, throbber, trackCover,apiKey/*,customplaylist*/) {
	'use strict';

	var startNewSession = function() {
		startNewSession1(models, throbber, trackCover, apiKey/*, yearSlider*/);
	};

	var getNextSong = function() {
		getNextSong1();
	};

	var changeArtistFamiliarity = function(artistFamilarityLevel) {
		changeArtistFamiliarity1(artistFamilarityLevel);
	};

	var changeArtistHotness = function(artistHotnessLevel) {
		changeArtistHotness1(artistHotnessLevel);
	};

	var changeSongHotness = function(songHotnessLevel) {
		changeSongHotness1(songHotnessLevel);
	};

	var changeToGenreSimilarity = function(genreName) {
		changeToGenreSimilarity1(genreName);
	};

	var changeToPlaylistSimilarity = function(tasteProfileID) {
		changeToPlaylistSimilarity1(tasteProfileID);
	};

	var changeArtistVariety = function() {
		changeArtistVariety1();
	};

	var changeAdventurousness = function() {
		changeAdventurousness1();
	};

	var setTermFilter = function(term) {
		setTermFilter1(term);
	};

	var changeToSongSimilarity = function() {
		changeToSongSimilarity1();
	};

	var changeToArtistSimilarity = function() {
		changeToArtistSimilarity1();
	};

	var changeSeedSongSimilarity = function() {
		changeSeedSongSimilarity1();
	};
	
	var changeSeedArtistSimilarity = function() {
		changeSeedArtistSimilarity1();
	};

	var setBanedArtistId = function(setValue) {
		setBanedArtistId1(setValue);
	};

	var setNoSpotifyPlaylistSongs = function(setValue) {
		setNoSpotifyPlaylistSongs1(setValue);
	};

	var setArrayOfAllSongs = function(array1) {
		setArrayOfAllSongs1(array1);
	};
			
	var removeTermFromCurrentlySetTermsArray = function(tagToBeRemoved){
		removeTermFromCurrentlySetTermsArray1(tagToBeRemoved);
	};
			 
/*	var setTagCloudResetDueToSimialrityChangeIsNeededToFalse= function(){
		setTagCloudResetDueToSimialrityChangeIsNeededToFalse1();
	};
		*/	 
	var setArtistStartYearBefore = function(year){
		setArtistStartYearBefore1(year);
	};
	
	var setArtistStartYearAfter = function(year){
		setArtistStartYearAfter1(year);
	};
			 
	var setArtistEndYearBefore = function(year){
		setArtistEndYearBefore1(year);
	};
	
	var setArtistEndYearAfter = function(year){
		setArtistEndYearAfter1(year);
	};
			 
	var returnGuiDisabled = function(){
		return returnGuiDisabled1();
	};
	

	var restartSessionWithCurrentGuiState = function(){
		restartSessionWithCurrentGuiState1();
	};
	
	var changeToGenreSimlarityOverloadMethod = function(){
		changeToGenreSimlarityOverloadMethod1();
	};
	
	var changeToPlaylistSimlarityOverloadMethod = function(){
		changeToPlaylistSimlarityOverloadMethod1();
	};
			 
	exports.getNextSong = getNextSong;
	exports.startNewSession = startNewSession;
	exports.changeArtistFamiliarity = changeArtistFamiliarity;
	exports.changeArtistHotness = changeArtistHotness;
	exports.changeSongHotness = changeSongHotness;
	exports.changeToGenreSimilarity = changeToGenreSimilarity;
	exports.changeToPlaylistSimilarity = changeToPlaylistSimilarity;
	exports.changeArtistVariety = changeArtistVariety;
	exports.changeAdventurousness = changeAdventurousness;
	exports.setTermFilter = setTermFilter;
	exports.changeToSongSimilarity = changeToSongSimilarity;
	exports.changeToArtistSimilarity = changeToArtistSimilarity;
	exports.changeSeedSongSimilarity = changeSeedSongSimilarity;
	exports.changeSeedArtistSimilarity = changeSeedArtistSimilarity;
	exports.setBanedArtistId = setBanedArtistId;
	exports.setNoSpotifyPlaylistSongs = setNoSpotifyPlaylistSongs;
	exports.setArrayOfAllSongs = setArrayOfAllSongs;
	exports.removeTermFromCurrentlySetTermsArray = removeTermFromCurrentlySetTermsArray;
	//exports.setTagCloudResetDueToSimialrityChangeIsNeededToFalse = setTagCloudResetDueToSimialrityChangeIsNeededToFalse;
	exports.setArtistStartYearBefore = setArtistStartYearBefore;
	exports.setArtistStartYearAfter = setArtistStartYearAfter;
	exports.setArtistEndYearBefore = setArtistEndYearBefore;
	exports.setArtistEndYearAfter = setArtistEndYearAfter;
	exports.returnGuiDisabled = returnGuiDisabled;
	
	exports.restartSessionWithCurrentGuiState = restartSessionWithCurrentGuiState;
	exports.changeToGenreSimlarityOverloadMethod = changeToGenreSimlarityOverloadMethod;
	exports.changeToPlaylistSimlarityOverloadMethod = changeToPlaylistSimlarityOverloadMethod;

});// end of require()******************************************************************

var echonestApiKey = null;

var session_id = '';

var seedArtistSpotifyId = '';

var song_id = '';

/**currently used artist name*/
var artistName = '';

/**currently used track name*/
var trackName = '';

var songsAlreadyUsed = new Array();

var styleTermObjects = new Array();
var styleTermNames = new Array();

var continueFetchSongsLoop = true;

/**trobber to use for playlist and covers*/
var throbber = null;
/**throbber to use for tagcloud*/
var throbberTagCloud = null;

/**included scipts*/
var trackCoverScript = null;
//var customPlaylistScript = null;
//var yearSliderScript = null;
var models = null;

var trackCurrentlyPlaying = null;

var seedArtistIdforEchonestCalls = null;

var banedSeedArtistId = null;

var noSpotifyPlaylistSongs = false;

var arrayOfTracksInSpotifyPlaylists = new Array();

var similarityModeIsGenre = false;
var similarityModeIsArtist = false;
var similarityModeIsSong = false;
var similarityModeIsPlaylist = false;

var lowerArtistHotnessBorderForGenreSimilarity = null;
var upperArtistHotnessBorderForGenreSimilarity = null;
var lowerArtistFamilarityBorderForGenreSimilarity = null;
var upperArtistFamilarityBorderForGenreSimilarity = null;
var lowerSongHotnessBorderForGenreSimilarity = null;
var upperSongHotnessBorderForGenreSimilarity = null;

var mittelwertArtistHotnesGenreSimliarity = null;
var varianzArtistHotnesGenreSimliarity = null;
var mittelwertArtistFamiliarityGenreSimliarity = null;
var varianzArtistFamiliarityGenreSimliarity = null;
var mittelwertSongHotnesGenreSimliarity = null;
var varianzSongHotnesGenreSimliarity = null;

var arrayArtistIdsForTermsQuery = new Array();

/**selected genre if genre mode is on*/
var selectedgenre = "";

/**selected spotify playlist of the user if playlist similarity mode is on*/
var selectedUserPlaylistName = "";
var currentlyUsedTasteProfileObject = null;

/**values of the sliders*/
var songTrendiness = 0;
var artistTrendiness = 0;
var artistPopularity = 0;
var artistVariety = 50;

/** current restart values */
var currentArtistStartYearBefore = 'off';
var currentArtistStartYearAfter = 'off';
var currentArtistEndYearBefore = 'off';
var currentArtistEndYearAfter = 'off';


var currentSimilarityInfoString = '';


/** current steering values */
var currentSongHotnesValue = 0;
var currentArtistHotnesValue = 0;
var currentArtistPopularityValue = 0;
var currentAdventurousnessValue = 20;
var currentlySetTagCloudTermsArray= new Array();

var guiDisabled = false;

//var tagCloudResetDueToSimialrityChangeIsNeeded = false;
var isInfoSet = false;

function returnGuiDisabled1(){
	return  guiDisabled;
}

function setArtistStartYearBefore1(year){
	console.log('ECHONEST DYNAMIC  setArtistStartYearBefore1() was called with year: '+year);
	currentArtistStartYearBefore = year;
//	yearSliderScript.setArtistStartYearBefore(year);
	//restartSessionWithCurrentGuiState();
}



	
	
	
	


function  setArtistStartYearAfter1(year){
	console.log('ECHONEST DYNAMIC  setArtistStartYearAfter1() was called with year: '+year);
	currentArtistStartYearAfter = year;
//	yearSliderScript.setArtistStartYearAfter(year);
	//restartSessionWithCurrentGuiState();
}

function setArtistEndYearBefore1(year){
	console.log('ECHONEST DYNAMIC  setArtistEndYearBefore1() was called with year: '+year);
	 currentArtistEndYearBefore = year;
//	 yearSliderScript.setArtistEndYearBefore(year);
	// restartSessionWithCurrentGuiState();
}


function setArtistEndYearAfter1(year){
	console.log('ECHONEST DYNAMIC  setArtistEndYearAfter1() was called with year: '+year);
	currentArtistEndYearAfter = year;
//	yearSliderScript.setArtistEndYearAfter(year);
	//restartSessionWithCurrentGuiState();
	
}


function setArrayOfAllSongs1(array1) {
	arrayOfTracksInSpotifyPlaylists = array1;
}


function removeTermFromCurrentlySetTermsArray1(tagToBeRemoved){
	console.log('ECHONEST  DYNAMIC removeTermFromCurrentlySetTermsArray() was called with term: '+tagToBeRemoved);

	for (var i= currentlySetTagCloudTermsArray.length-1; i>=0; i--) {
	    if ( currentlySetTagCloudTermsArray[i] === tagToBeRemoved) {
	    	currentlySetTagCloudTermsArray.splice(i, 1);
	        // break;       //<-- Uncomment  if only the first term has to be removed
	    }
	}
	
	console.log('ECHONEST DYNAMIC removeTermFromCurrentlySetTermsArray() state of set Terms Array: '+currentlySetTagCloudTermsArray);
	
//	yearSliderScript.setArtistTermsArray(currentlySetTagCloudTermsArray);
	restartSessionWithCurrentGuiState();
}




function changeToPlaylistSimlarityOverloadMethod1(){

	
	if(currentlyUsedTasteProfileObject == null){
		$('#similarityInfo').text('Current Seed Playlist: There is no playlist selected yet');
	}else{
		$('#similarityInfo').text('Current Seed Playlist: '+currentlyUsedTasteProfileObject.name );
	}
	
	
}


function changeToPlaylistSimilarity1(tasteProfileIDandNameObject) {

	console.log('changeToPlaylistSimilarity1() was called with tasteProfileID: '
					+ tasteProfileIDandNameObject.tasteProfileID);
	
	
	currentlyUsedTasteProfileObject = tasteProfileIDandNameObject;
	selectedUserPlaylistName = tasteProfileIDandNameObject.name;
	console.log('ECHONEST DYNAMIC changeToPlaylistSimilarit() selectedUserPlaylistName: '+selectedUserPlaylistName)
	//tagCloudResetDueToSimialrityChangeIsNeeded = true;
	similarityModeIsGenre = false;
	similarityModeIsArtist = false;
	similarityModeIsSong = false;
	similarityModeIsPlaylist = true;
	

	
	songsAlreadyUsed = new Array();
	currentlySetTagCloudTermsArray= new Array();
	

	
	//resetSliders();
	$("#adventurousnessSlider").slider( "value", 20 );
	$("#adventurousnessSliderLabel").show();
	$("#adventurousnessSlider").show();
	
	
	$("#throbberInfo").text(
			'Downloading songs that are simliar to your \"'
					+ tasteProfileIDandNameObject.name
					+ '\" Spotify-playlist');
	$('#similarityInfo').text('Current Seed playlist: '+tasteProfileIDandNameObject.name );
	currentSimilarityInfoString = 'Current Seed playlist: '+tasteProfileIDandNameObject.name

	/*var randomNumber = Math.floor(Math.random() * 100);
	var genreUrl = 'http://developer.echonest.com/api/v4/playlist/dynamic/create?api_key='
			+ echonestApiKey
			+ '&type=catalog-radio&bucket=id:spotify-WW&bucket=tracks&callback=?&_='
			+ randomNumber;
	$.getJSON(genreUrl, {// 'artist_id':replacedArtistID ,
		// 'track_id': replacedSongID,
		'format' : 'jsonp',
		'limit' : true,
		'seed_catalog' : tasteProfileIDandNameObject.tasteProfileID
	// 'type':'catalog-radio'

	// 'max_song_hotttnesss':maxSongHotness,
	// 'min_song_hotttnesss':minSongHotness
	// 'artist_max_familiarity': maxPopularity, 'artist_min_familiarity':
	// minPopularity
	// bucket : ['id:spotify-WW', 'tracks'],
	}, function(data) {
		if (checkResponse(data)) {

			console.log('Changed to Similarity Radio: '
					+ tasteProfileIDandNameObject.tasteProfileID);

			$('#playlistSimilarityInfo').text(
					'Now songs are recommended because they are simliar to your \"'
							+ tasteProfileIDandNameObject.name
							+ '\" Spotify-playlist');
			
			//$("#throbberInfo").show();
			styleTermNames = new Array();
			styleTermObjects = new Array();
			$("#tagCloud").tagCloud(styleTermObjects);

			session_id = data.response.session_id;

			console.log("New session ID  is used: " + session_id);
			restartSessionWithCurrentGuiState();
			//getNextSong1();

		} else {
			info("trouble getting results");
		}
	});*/

}


function disableGUI(){
	 guiDisabled = true;
	 $('.similaritySection').find(':input').prop('disabled', true);
	 $('.noveltySection').find(':input').prop('disabled', true);
	 $('#yearSection').find(':input').prop('disabled', true);
	 $('.similaritySection').find(':button').prop('disabled', true);
	 $('#nextSongsButton').prop('disabled', true);
	 $( "#adventurousnessSlider" ).slider( "option", "disabled", true );
	 $( "#artistVarietySlider" ).slider( "option", "disabled", true );
	 $( "#slider-pop" ).slider( "option", "disabled", true );
	 $( "#slider-hot" ).slider( "option", "disabled", true );
	 $( "#slider-songHot" ).slider( "option", "disabled", true );
}

function enableGUI(){
	guiDisabled = false;
	$('.similaritySection').find(':input').prop('disabled',false);
	 $('.noveltySection').find(':input').prop('disabled', false);
	 $('#yearSection').find(':input').prop('disabled', false);
	 $('.similaritySection').find(':button').prop('disabled', false);
	 $('#nextSongsButton').prop('disabled', false);
	$( "#adventurousnessSlider" ).slider( "option", "disabled", false );
	$( "#artistVarietySlider" ).slider( "option", "disabled", false );
	
	
	//enable only if not in Off Position
	if( $("#slider-songHot").slider( "option", "value" ) != 0){
		$( "#slider-songHot" ).slider( "option", "disabled", false );
	};
	
	if( $("#slider-hot").slider( "option", "value" ) != 0){
		$( "#slider-hot" ).slider( "option", "disabled", false );
	};
	
	if( $("#slider-pop").slider( "option", "value" ) != 0){
	$( "#slider-pop" ).slider( "option", "disabled", false );
	}
	
}


function setNoSpotifyPlaylistSongs1(setValue) {
	noSpotifyPlaylistSongs = setValue;
//	yearSliderScript.excludePlaylistSongs(setValue);
	console.log('echonestDynamic noSpotifyPlaylistSongs was set to: '
			+ noSpotifyPlaylistSongs);
}

function setBanedArtistId1(setValue) {
	console.log('echonestDynamic setBanedArtistId1(setValue) was called');
	if (setValue) {
		banedSeedArtistId = seedArtistSpotifyId;
		trackCoverScript.setBannedSeedArtist(banedSeedArtistId);
//		yearSliderScript.excludeSeedArtist(true);
		console.log(' banedSeedArtistId was set to : ' + banedSeedArtistId);
	} else {
		banedSeedArtistId = null;
		trackCoverScript.setBannedSeedArtist(null);
//		yearSliderScript.excludeSeedArtist(false);
		console.log(' banedSeedArtistId was set to: ' + banedSeedArtistId);
	}

}


function setTermFilter1(term) {
	console.log('echonestDynamic setTermFilter1() was called with term: '
			+ term);

	currentlySetTagCloudTermsArray.push(term);
	
//	yearSliderScript.setArtistTermsArray(currentlySetTagCloudTermsArray);
	restartSessionWithCurrentGuiState();
	
}

function changeAdventurousness1() {
	console.log('ECHONEST DYNAMIC changeAdventurousness() was called');

	var adventurousnessSliderValue = $("#adventurousnessSlider")
			.slider("value") / 100;
//	yearSliderScript.setAdventurousness(adventurousnessSliderValue*100);
	
	console.log('adventurousnessSliderValue:' + adventurousnessSliderValue);
	var randomNumber = Math.floor(Math.random() * 100);

	var url = 'http://developer.echonest.com/api/v4/playlist/dynamic/steer?session_id='
			+ session_id + '&_=' + randomNumber;
	var args = {
		api_key : echonestApiKey,
		format : 'json',
		adventurousness : adventurousnessSliderValue

	}

	// getJSON Syntax: URL(wohin geht die Anfrage), DATA (Objekt oder String der
	// mit der anfrage geschickt wird), CALLBACK (Funktion, die bei
	// erfolgreicher Anfrage ausgeführt wird)
	$.getJSON(url, args, function(data) {
		if (checkResponse(data)) {

			getPlaylistInfo('adventurousness');

		} else {
			info("trouble getting results");
		}
	}).fail(function( jqxhr, textStatus, error ) {
		var err = textStatus + ", " + error;
		console.log( "ECHONEST DYNAMIC changeAdventurousness1() Request Failed: " + err );
		errorHandlingforEchonestCalls(jqxhr, textStatus, error);
		
	});

}

function changeArtistVariety1() {
	console.log('EchonestDynamic changeArtistVariety() was called');

	// slider Value
	var changeArtistVarietySliderValue = $("#artistVarietySlider").slider("value") / 100;
	console.log('changeArtistVarietySliderValue:'+ changeArtistVarietySliderValue);
	artistVariety = changeArtistVarietySliderValue*100;
	
	var randomNumber = Math.floor(Math.random() * 100);

	var url = 'http://developer.echonest.com/api/v4/playlist/dynamic/steer?session_id='
			+ session_id + '&_=' + randomNumber;
	var args = {
		api_key : echonestApiKey,
		format : 'json',
		variety : changeArtistVarietySliderValue

	};

	// getJSON Syntax: URL(wohin geht die Anfrage), DATA (Objekt oder String der
	// mit der anfrage geschickt wird), CALLBACK (Funktion, die bei
	// erfolgreicher Anfrage ausgeführt wird)
	$.getJSON(url, args, function(data) {
		if (checkResponse(data)) {

			getPlaylistInfo('artistVariety');

		} else {
			info("trouble getting results");
		}
	});
}



function changeArtistFamiliarity1(artistFamilarityLevel) {
	console.log("changeArtistFamiliarity() was called with artistPopularityLevel: "+ artistFamilarityLevel);
	
	artistPopularity = artistFamilarityLevel;
//	yearSliderScript.setArtistFamilarityLevel(artistFamilarityLevel);

	if (similarityModeIsArtist || similarityModeIsSong
			|| similarityModeIsPlaylist) {
		/*
		 * switch (artistFamilarityLevel) { case 0: minFamilarity = 0.0;
		 * maxFamilarity = 0.3; break; case 1: minFamilarity = 0.3;
		 * maxFamilarity = 0.4; break; case 2: minFamilarity = 0.4;
		 * maxFamilarity = 0.5; break; case 3: minFamilarity = 0.5;
		 * maxFamilarity = 0.6; break; case 4: minFamilarity = 0.6;
		 * maxFamilarity =0.8; break; case 5: minFamilarity = 0.8; maxFamilarity =
		 * 1; break;
		 *  }
		 */

		var targetValue = null;
		
		if(artistFamilarityLevel  == 0){
			console.log("ECHONEST DYNAMIC artist popularity slider was moved to Off Position");
			
			//disable the slider
			//$("#slider-pop").slider( "value", 0 );
			$("#slider-pop").slider( "option", "disabled", true );
			currentArtistPopularityValue = 0.0;
			restartSessionWithCurrentGuiState();

			
		}else{
			
			switch (artistFamilarityLevel) {
			case 1:
				targetValue = 0.0;
				currentArtistPopularityValue = targetValue;
				break;
			case 2:
				targetValue = 0.25;
				currentArtistPopularityValue = targetValue;
				break;
			case 3:
				targetValue = 0.5;
				currentArtistPopularityValue = targetValue;
				break;
			case 4:
				targetValue = 0.75;
				currentArtistPopularityValue = targetValue;
				break;
			case 5:
				targetValue = 1.0;
				currentArtistPopularityValue = targetValue;
				break;

		}
		
		var args = {
				session_id : session_id,
				api_key : echonestApiKey,
				format : 'json',
				target_artist_familiarity : targetValue
			// max_artist_hotttnesss :maxHotness,
			// min_artist_hotttnesss :minHotness,
			// max_artist_familiarity: 0.0,
			// min_artist_familiarity: 0.0
			};
		
		var randomNumber = Math.floor(Math.random() * 100);

		var url = 'http://developer.echonest.com/api/v4/playlist/dynamic/steer?&_='
				+ randomNumber;
		
		$.getJSON(url, args, function(data) {
			if (checkResponse(data)) {

				getPlaylistInfo('constraints');

			} else {
				info("trouble getting results");
			}
		}).fail(function( jqxhr, textStatus, error ) {
			var err = textStatus + ", " + error;
			console.log( "ECHONEST DYNAMIC Request Failed: " + err );
			errorHandlingforEchonestCalls(jqxhr, textStatus, error);
			
		});
		
		
		}

	}

	/*
	 * if(similarityModeIsSong){ switch (artistFamilarityLevel) { case 0:
	 * minFamilarity = 0.0; maxFamilarity = 0.3; break; case 1: minFamilarity =
	 * 0.3; maxFamilarity = 0.4; break; case 2: minFamilarity = 0.4;
	 * maxFamilarity = 0.5; break; case 3: minFamilarity = 0.5; maxFamilarity =
	 * 0.6; break; case 4: minFamilarity = 0.6; maxFamilarity =0.8; break; case
	 * 5: minFamilarity = 0.8; maxFamilarity = 1; break;
	 *  } }
	 */

	/*
	 * if(similarityModeIsPlaylist){ switch (artistFamilarityLevel) { case 0:
	 * minFamilarity = 0.0; maxFamilarity = 0.3; break; case 1: minFamilarity =
	 * 0.3; maxFamilarity = 0.4; break; case 2: minFamilarity = 0.4;
	 * maxFamilarity = 0.5; break; case 3: minFamilarity = 0.5; maxFamilarity =
	 * 0.6; break; case 4: minFamilarity = 0.6; maxFamilarity =0.8; break; case
	 * 5: minFamilarity = 0.8; maxFamilarity = 1; break;
	 *  } }
	 */
	// Variante mit fixen Bereichen
	/*
	 * if(similarityModeIsGenre){ minFamilarity =
	 * lowerArtistFamilarityBorderForGenreSimilarity; maxFamilarity =
	 * upperArtistFamilarityBorderForGenreSimilarity; var range =
	 * upperArtistFamilarityBorderForGenreSimilarity -
	 * lowerArtistFamilarityBorderForGenreSimilarity; var rangeStep = range/5;
	 * 
	 * switch (artistFamilarityLevel) { case 0: minFamilarity = 0.0;
	 * 
	 * break; case 1: minFamilarity =
	 * lowerArtistFamilarityBorderForGenreSimilarity;
	 * 
	 * break; case 2: minFamilarity =
	 * lowerArtistFamilarityBorderForGenreSimilarity + rangeStep;
	 * 
	 * break; case 3: minFamilarity =
	 * lowerArtistFamilarityBorderForGenreSimilarity + 2*rangeStep;
	 * 
	 * break; case 4: minFamilarity =
	 * lowerArtistFamilarityBorderForGenreSimilarity + 3*rangeStep;
	 * 
	 * break; case 5: minFamilarity =
	 * upperArtistFamilarityBorderForGenreSimilarity-rangeStep;
	 * 
	 * break;
	 *  } }
	 */


	if (similarityModeIsGenre) {
		
		if(artistFamilarityLevel  == 0){
			console.log("ECHONEST DYNAMIC artist popularity slider was moved to Off Position");
			
			//disable the slider
			//$("#slider-pop").slider( "value", 0 );
			$("#slider-pop").slider( "option", "disabled", true );
			currentArtistPopularityValue = 0;
			restartSessionWithCurrentGuiState();
			
		}else{

			var targetValue = null;
	
			switch (artistFamilarityLevel) {
		
			case 1:
				targetValue = 0.0;
				currentArtistPopularityValue = targetValue;
				break;
			case 2:
				targetValue = 0.25;
				currentArtistPopularityValue = targetValue;
				break;
			case 3:
				targetValue = 0.5;
				currentArtistPopularityValue = targetValue;
				break;
			case 4:
				targetValue = 0.75;
				currentArtistPopularityValue = targetValue;
				break;
			case 5:
				targetValue = 1.0;
				currentArtistPopularityValue = targetValue;
				break;

		}

		// Variante mit Varianzberechnung
		/*
		 * minFamilarity = 0;// lowerArtistHotnessBorderForGenreSimilarity;
		 * maxFamilarity = upperArtistFamilarityBorderForGenreSimilarity;
		 * 
		 * switch (artistFamilarityLevel) { case 0: minFamilarity = 0.0;
		 * maxFamilarity =
		 * mittelwertArtistFamiliarityGenreSimliarity-varianzArtistFamiliarityGenreSimliarity;
		 * break; case 1: minFamilarity =
		 * mittelwertArtistFamiliarityGenreSimliarity-varianzArtistFamiliarityGenreSimliarity;
		 * maxFamilarity =
		 * mittelwertArtistFamiliarityGenreSimliarity-1/2*varianzArtistFamiliarityGenreSimliarity;
		 * break; case 2: minFamilarity =
		 * mittelwertArtistFamiliarityGenreSimliarity-1/2*varianzArtistFamiliarityGenreSimliarity;
		 * maxFamilarity = mittelwertArtistFamiliarityGenreSimliarity; break;
		 * case 3: minFamilarity = mittelwertArtistFamiliarityGenreSimliarity;
		 * maxFamilarity =
		 * mittelwertArtistFamiliarityGenreSimliarity+1/2*varianzArtistFamiliarityGenreSimliarity;
		 * break; case 4: minFamilarity =
		 * mittelwertArtistFamiliarityGenreSimliarity+1/2*varianzArtistFamiliarityGenreSimliarity;
		 * maxFamilarity =
		 * mittelwertArtistFamiliarityGenreSimliarity+varianzArtistFamiliarityGenreSimliarity;
		 * break; case 5: minFamilarity =
		 * mittelwertArtistFamiliarityGenreSimliarity+varianzArtistFamiliarityGenreSimliarity
		 * maxFamilarity =upperArtistFamilarityBorderForGenreSimilarity break;
		 *  }
		 * 
		 * 
		 * 
		 * console.log('maxArtistFamilarity changeArtistFamilarity1(): '+
		 * maxFamilarity); console.log('minArtistFamilarity
		 * changeArtistFamilarity1(): '+minFamilarity);
		 */

		var randomNumber = Math.floor(Math.random() * 100);

		var url = 'http://developer.echonest.com/api/v4/playlist/dynamic/steer?&_='
				+ randomNumber;

		var args = {
			session_id : session_id,
			api_key : echonestApiKey,
			format : 'json',
			target_artist_familiarity : targetValue

		};

		// getJSON Syntax: URL(wohin geht die Anfrage), DATA (Objekt oder String
		// der mit der anfrage geschickt wird), CALLBACK (Funktion, die bei
		// erfolgreicher Anfrage ausgeführt wird)
		$.getJSON(url, args,

		function(data) {
			if (checkResponse(data)) {

				getPlaylistInfo('constraints');

			} else {
				info("trouble getting results");
			}
		}).fail(function( jqxhr, textStatus, error ) {
			var err = textStatus + ", " + error;
			console.log( "ECHONEST DYNAMIC  Request Failed: " + err );
			errorHandlingforEchonestCalls(jqxhr, textStatus, error);
			
			});

	}
	}

}

function changeArtistHotness1(artistHotnessLevel) {
	console.log("changeArtistHotness() was called with artistHotnessLevel: "+ artistHotnessLevel);
	
	artistTrendiness = artistHotnessLevel;
//	yearSliderScript.setArtistHotnessLevel(artistHotnessLevel);

	getPlaylistInfo('constraints');

	if (similarityModeIsArtist || similarityModeIsSong
			|| similarityModeIsPlaylist) {

		/*
		 * switch (artistHotnessLevel) { case 0: minHotness = 0.0; maxHotness =
		 * 0.3; break; case 1: minHotness = 0.3; maxHotness = 0.4; break; case
		 * 2: minHotness = 0.4; maxHotness = 0.5; break; case 3: minHotness =
		 * 0.5; maxHotness = 0.6; break; case 4: minHotness = 0.6; maxHotness
		 * =0.8; break; case 5: minHotness = 0.8; maxHotness = 1; break;
		 *  }
		 */
		
		if(artistHotnessLevel==0){
			//disable the slider
			//$("#slider-hot").slider( "value", 0 );
			$("#slider-hot").slider( "option", "disabled", true );
			currentArtistHotnesValue = 0.0;
			restartSessionWithCurrentGuiState();
		}else{

			var targetValue = null;
	
			switch (artistHotnessLevel) {
		
			case 1:
				targetValue = 0.0;
				currentArtistHotnesValue = targetValue;
				break;
			case 2:
				targetValue = 0.25;
				currentArtistHotnesValue = targetValue;
				break;
			case 3:
				targetValue = 0.5;
				currentArtistHotnesValue = targetValue;
				break;
			case 4:
				targetValue = 0.75;
				currentArtistHotnesValue = targetValue;
				break;
			case 5:
				targetValue = 1;
				currentArtistHotnesValue = targetValue;
				break;

		}

		var randomNumber = Math.floor(Math.random() * 100);

		var url = 'http://developer.echonest.com/api/v4/playlist/dynamic/steer?&_='
				+ randomNumber;
		var args = {
			session_id : session_id,
			api_key : echonestApiKey,
			format : 'json',
			target_artist_hotttnesss : targetValue,
		};

		// getJSON Syntax: URL(wohin geht die Anfrage), DATA (Objekt oder String
		// der mit der anfrage geschickt wird), CALLBACK (Funktion, die bei
		// erfolgreicher Anfrage ausgeführt wird)
		$.getJSON(url, args, function(data) {
			if (checkResponse(data)) {

				getPlaylistInfo('constraints');

			} else {
				info("trouble getting results");
			}
		}).fail(function( jqxhr, textStatus, error ) {
			var err = textStatus + ", " + error;
			console.log( "ECHONEST DYNAMIC  Request Failed: " + err );
			errorHandlingforEchonestCalls(jqxhr, textStatus, error);
			
		});

		}
	}

	/*
	 * if(similarityModeIsSong){ switch (artistHotnessLevel) { case 0:
	 * minHotness = 0.0; maxHotness = 0.3; break; case 1: minHotness = 0.3;
	 * maxHotness = 0.4; break; case 2: minHotness = 0.4; maxHotness = 0.5;
	 * break; case 3: minHotness = 0.5; maxHotness = 0.6; break; case 4:
	 * minHotness = 0.6; maxHotness =0.8; break; case 5: minHotness = 0.8;
	 * maxHotness = 1; break;
	 *  } }
	 */

	/*
	 * if(similarityModeIsPlaylist){ switch (artistHotnessLevel) { case 0:
	 * minHotness = 0.0; maxHotness = 0.3; break; case 1: minHotness = 0.3;
	 * maxHotness = 0.4; break; case 2: minHotness = 0.4; maxHotness = 0.5;
	 * break; case 3: minHotness = 0.5; maxHotness = 0.6; break; case 4:
	 * minHotness = 0.6; maxHotness =0.8; break; case 5: minHotness = 0.8;
	 * maxHotness = 1; break;
	 *  } }
	 */

	if (similarityModeIsGenre) {

		if(artistHotnessLevel==0){
			//disable the slider
			//$("#slider-hot").slider( "value", 0 );
			$("#slider-hot").slider( "option", "disabled", true );
			currentArtistHotnesValue = 0.0;
			restartSessionWithCurrentGuiState();
		}else{
		
			var targetValue = null;
	
			switch (artistHotnessLevel) {
		
			case 1:
				targetValue = 0.0;
				currentArtistHotnesValue = targetValue;
				break;
			case 2:
				targetValue = 0.25;
				currentArtistHotnesValue = targetValue;
				break;
			case 3:
				targetValue = 0.5;
				currentArtistHotnesValue = targetValue;
				break;
			case 4:
				targetValue = 0.75;
				currentArtistHotnesValue = targetValue;
				break;
			case 5:
				targetValue = 1.0;
				currentArtistHotnesValue = targetValue;
				break;

		}

		var randomNumber = Math.floor(Math.random() * 100);

		var url = 'http://developer.echonest.com/api/v4/playlist/dynamic/steer?&_='
				+ randomNumber;
		var args = {
			session_id : session_id,
			api_key : echonestApiKey,
			format : 'json',
			target_artist_hotttnesss : targetValue

		};

		// getJSON Syntax: URL(wohin geht die Anfrage), DATA (Objekt oder String
		// der mit der anfrage geschickt wird), CALLBACK (Funktion, die bei
		// erfolgreicher Anfrage ausgeführt wird)
		$.getJSON(url, args, function(data) {
			if (checkResponse(data)) {

				getPlaylistInfo('constraints');

			} else {
				info("trouble getting results");
			}
		});

	}
	}

	// Variante mit Varianz Berechung
	/*
	 * if(similarityModeIsGenre){ minHotness = 0;//
	 * lowerArtistHotnessBorderForGenreSimilarity; maxHotness =
	 * upperArtistHotnessBorderForGenreSimilarity;
	 * 
	 * 
	 * //Variante mit fixen Bereichen //var range =
	 * upperArtistHotnessBorderForGenreSimilarity -
	 * lowerArtistHotnessBorderForGenreSimilarity; //var rangeStep = range/5;
	 * 
	 * switch (artistHotnessLevel) { case 0: minHotness = 0.0;
	 * 
	 * break; case 1: //minHotness = lowerArtistHotnessBorderForGenreSimilarity;
	 * minHotness =
	 * mittelwertArtistHotnesGenreSimliarity-varianzArtistHotnesGenreSimliarity
	 * break; case 2: //minHotness = lowerArtistHotnessBorderForGenreSimilarity +
	 * rangeStep; minHotness =
	 * mittelwertArtistHotnesGenreSimliarity-1/2*varianzArtistHotnesGenreSimliarity
	 * break; case 3: //minHotness = lowerArtistHotnessBorderForGenreSimilarity +
	 * 2*rangeStep; minHotness = mittelwertArtistHotnesGenreSimliarity break;
	 * case 4: //minHotness = lowerArtistHotnessBorderForGenreSimilarity +
	 * 3*rangeStep; minHotness =
	 * mittelwertArtistHotnesGenreSimliarity+1/2*varianzArtistHotnesGenreSimliarity
	 * break; case 5: //minHotness =
	 * upperArtistHotnessBorderForGenreSimilarity-rangeStep; minHotness =
	 * mittelwertArtistHotnesGenreSimliarity+varianzArtistHotnesGenreSimliarity
	 * break;
	 *  }
	 * 
	 * switch (artistHotnessLevel) { case 0: minHotness = 0.0; maxHotness =
	 * mittelwertArtistHotnesGenreSimliarity-varianzArtistHotnesGenreSimliarity;
	 * break; case 1: minHotness =
	 * mittelwertArtistHotnesGenreSimliarity-varianzArtistHotnesGenreSimliarity;
	 * maxHotness =
	 * mittelwertArtistHotnesGenreSimliarity-1/2*varianzArtistHotnesGenreSimliarity;
	 * break; case 2: minHotness =
	 * mittelwertArtistHotnesGenreSimliarity-1/2*varianzArtistHotnesGenreSimliarity;
	 * maxHotness = mittelwertArtistHotnesGenreSimliarity; break; case 3:
	 * minHotness = mittelwertArtistHotnesGenreSimliarity; maxHotness =
	 * mittelwertArtistHotnesGenreSimliarity+1/2*varianzArtistHotnesGenreSimliarity;
	 * break; case 4: minHotness =
	 * mittelwertArtistHotnesGenreSimliarity+1/2*varianzArtistHotnesGenreSimliarity;
	 * maxHotness =
	 * mittelwertArtistHotnesGenreSimliarity+varianzArtistHotnesGenreSimliarity;
	 * break; case 5: minHotness =
	 * mittelwertArtistHotnesGenreSimliarity+varianzArtistHotnesGenreSimliarity
	 * maxHotness = upperArtistHotnessBorderForGenreSimilarity; break;
	 *  }
	 * 
	 * console.log('maxArtistHotness changeArtistHotness1(): '+maxHotness);
	 * console.log('minArtistHotness changeArtistHotness1(): '+minHotness);
	 * 
	 * 
	 * var randomNumber = Math.floor(Math.random()*100);
	 * 
	 * 
	 * 
	 * var url =
	 * 'http://developer.echonest.com/api/v4/playlist/dynamic/steer?&_='+randomNumber;
	 * var args = { session_id: session_id, api_key: echonestApiKey,
	 * format:'json', max_artist_hotttnesss :maxHotness, min_artist_hotttnesss
	 * :minHotness, // max_artist_familiarity: 0.0, //min_artist_familiarity:
	 * 0.0 };
	 * 
	 * //getJSON Syntax: URL(wohin geht die Anfrage), DATA (Objekt oder String
	 * der mit der anfrage geschickt wird), CALLBACK (Funktion, die bei
	 * erfolgreicher Anfrage ausgeführt wird) $.getJSON(url, args,
	 * function(data) { if (checkResponse(data)) {
	 * 
	 * //console.log('Changed Hotness Values'); getConstraintsInfo();
	 * getNextSong1();
	 * 
	 *  } else { info("trouble getting results"); } });
	 *  }
	 */

}



function changeSongHotness1(songHotnessLevel) {
	console.log("changeSongHotness() was called with songHotnessLevel: "+ songHotnessLevel);
	
	songTrendiness = songHotnessLevel;
//	yearSliderScript.setSongHotnessLevel(songHotnessLevel);

	if (similarityModeIsArtist || similarityModeIsSong
			|| similarityModeIsPlaylist) {
		
		if(songHotnessLevel==0){
			//$("#slider-songHot").slider( "value", 0 );
			$("#slider-songHot").slider( "option", "disabled", true );
			currentSongHotnesValue = 0.0;
			restartSessionWithCurrentGuiState();
			
		}else{

			var targetValue = 0;
	
			switch (songHotnessLevel) {
			
			case 1:
				targetValue = 0.0;
				currentSongHotnesValue = targetValue;
				break;
			case 2:
				targetValue =0.25;
				currentSongHotnesValue = targetValue;
				break;
			case 3:
				targetValue = 0.5;
				currentSongHotnesValue = targetValue;
				break;
			case 4:
				targetValue = 0.75;
				currentSongHotnesValue = targetValue;
				break;
			case 5:
				targetValue = 1.0;
				currentSongHotnesValue = targetValue;
				break;

		}

		var randomNumber = Math.floor(Math.random() * 100);

		var url = 'http://developer.echonest.com/api/v4/playlist/dynamic/steer?&_='
				+ randomNumber;
		var args = {
			session_id : session_id,
			api_key : echonestApiKey,
			format : 'json',
			target_song_hotttnesss : targetValue
	
		};

		// getJSON Syntax: URL(wohin geht die Anfrage), DATA (Objekt oder String
		// der mit der anfrage geschickt wird), CALLBACK (Funktion, die bei
		// erfolgreicher Anfrage ausgeführt wird)
		$.getJSON(url, args, function(data) {
			if (checkResponse(data)) {

				console.log('ECHONEST DYNAMIC Changed Hotness Values');
				getPlaylistInfo('constraints');

			} else {
				info("trouble getting results");
			}
		}).fail(function( jqxhr, textStatus, error ) {
			var err = textStatus + ", " + error;
			console.log( "ECHONEST DYNAMIC  Request Failed: " + err );
			errorHandlingforEchonestCalls(jqxhr, textStatus, error);
			
			});

	}
	}

	/*
	 * if(similarityModeIsSong){ switch (songHotnessLevel) { case 0:
	 * minSongHotness = 0.0; maxSongHotness = 0.3; break; case 1: minSongHotness =
	 * 0.3; maxSongHotness = 0.4; break; case 2: minSongHotness = 0.4;
	 * maxSongHotness = 0.5; break; case 3: minSongHotness = 0.5; maxSongHotness =
	 * 0.6; break; case 4: minSongHotness = 0.6; maxSongHotness =0.8; break;
	 * case 5: minSongHotness = 0.8; maxSongHotness = 1; break;
	 *  } }
	 * 
	 * if(similarityModeIsPlaylist){ switch (songHotnessLevel) { case 0:
	 * minSongHotness = 0.0; maxSongHotness = 0.3; break; case 1: minSongHotness =
	 * 0.3; maxSongHotness = 0.4; break; case 2: minSongHotness = 0.4;
	 * maxSongHotness = 0.5; break; case 3: minSongHotness = 0.5; maxSongHotness =
	 * 0.6; break; case 4: minSongHotness = 0.6; maxSongHotness =0.8; break;
	 * case 5: minSongHotness = 0.8; maxSongHotness = 1; break;
	 *  } }
	 */

	// Variante mit fixen Bereichen
	/*
	 * if(similarityModeIsGenre){
	 * 
	 * minSongHotness = lowerSongHotnessBorderForGenreSimilarity; maxSongHotness =
	 * upperSongHotnessBorderForGenreSimilarity; var range =
	 * upperSongHotnessBorderForGenreSimilarity -
	 * lowerSongHotnessBorderForGenreSimilarity; var rangeStep = range/5;
	 * 
	 * switch (songHotnessLevel) { case 0: minSongHotness = 0.0;
	 * 
	 * break; case 1: minSongHotness = lowerSongHotnessBorderForGenreSimilarity;
	 * 
	 * break; case 2: minSongHotness = lowerSongHotnessBorderForGenreSimilarity +
	 * rangeStep;
	 * 
	 * break; case 3: minSongHotness = lowerSongHotnessBorderForGenreSimilarity +
	 * 2*rangeStep;
	 * 
	 * break; case 4: minSongHotness = lowerSongHotnessBorderForGenreSimilarity +
	 * 3*rangeStep;
	 * 
	 * break; case 5: minSongHotness =
	 * upperSongHotnessBorderForGenreSimilarity-rangeStep;
	 * 
	 * break;
	 *  } }
	 */


	if (similarityModeIsGenre) {
		
		if(songHotnessLevel==0){
			//$("#slider-songHot").slider( "value", 0 );
			$("#slider-songHot").slider( "option", "disabled", true );
			currentSongHotnesValue = 0.0;
			restartSessionWithCurrentGuiState();
			
		}else{

			var targetValue = 0;
	
			switch (songHotnessLevel) {
			
			case 1:
				targetValue = 0.0;
				currentSongHotnesValue = targetValue;
				break;
			case 2:
				targetValue = 0.25;
				currentSongHotnesValue = targetValue;
				break;
			case 3:
				targetValue = 0.5;
				currentSongHotnesValue = targetValue;
				break;
			case 4:
				targetValue = 0.75;
				currentSongHotnesValue = targetValue;
				break;
			case 5:
				targetValue =1;
				currentSongHotnesValue = targetValue;
				break;

		}

		// Variante mit Varianzberechung
		/*
		 * minSongHotness = 0;// lowerArtistHotnessBorderForGenreSimilarity;
		 * maxSongHotness = upperSongHotnessBorderForGenreSimilarity;
		 * 
		 * switch (songHotnessLevel) { case 0: minSongHotness = 0.0;
		 * maxSongHotness
		 * =mittelwertSongHotnesGenreSimliarity-varianzSongHotnesGenreSimliarity ;
		 * break; case 1: minSongHotness =
		 * mittelwertSongHotnesGenreSimliarity-varianzSongHotnesGenreSimliarity ;
		 * maxSongHotness =
		 * mittelwertSongHotnesGenreSimliarity-1/2*varianzSongHotnesGenreSimliarity ;
		 * break; case 2: minSongHotness =
		 * mittelwertSongHotnesGenreSimliarity-1/2*varianzSongHotnesGenreSimliarity ;
		 * maxSongHotness = mittelwertSongHotnesGenreSimliarity; break; case 3:
		 * minSongHotness = mittelwertSongHotnesGenreSimliarity; maxSongHotness =
		 * mittelwertSongHotnesGenreSimliarity+1/2*varianzSongHotnesGenreSimliarity ;
		 * break; case 4: minSongHotness =
		 * mittelwertSongHotnesGenreSimliarity+1/2*varianzSongHotnesGenreSimliarity ;
		 * maxSongHotness
		 * =mittelwertSongHotnesGenreSimliarity+varianzSongHotnesGenreSimliarity ;
		 * break; case 5: minSongHotness =
		 * mittelwertSongHotnesGenreSimliarity+varianzSongHotnesGenreSimliarity;
		 * maxSongHotness = upperSongHotnessBorderForGenreSimilarity; break;
		 *  }
		 * 
		 * console.log('maxSongHotness changeSongHotness1(): '+maxSongHotness);
		 * console.log('minSongHotness changesongHotness1(): '+minSongHotness);
		 */
		var randomNumber = Math.floor(Math.random() * 100);

		var url = 'http://developer.echonest.com/api/v4/playlist/dynamic/steer?&_='
				+ randomNumber;
		var args = {
			session_id : session_id,
			api_key : echonestApiKey,
			format : 'json',
			target_song_hotttnesss : targetValue,
		};

		$.getJSON(url, args,

		function(data) {
			if (checkResponse(data)) {

				getPlaylistInfo('constraints');

			} else {
				info("trouble getting results");
			}
		}).fail(function( jqxhr, textStatus, error ) {
			var err = textStatus + ", " + error;
			console.log( "ECHONEST DYNAMIC  Request Failed: " + err );
			errorHandlingforEchonestCalls(jqxhr, textStatus, error);
			
		});

	}
	}

}


function changeToGenreSimlarityOverloadMethod1(){
	if(selectedgenre == ""){
		$('#similarityInfo').text('Current Seed Genre: There is no genre selected yet'+selectedgenre );
	}else{
		$('#similarityInfo').text('Current Seed Genre: '+selectedgenre );
	}
	
}

/**
 * When user chooses a genre in the genre accordion.
 * 
 * @param genreName
 */
function changeToGenreSimilarity1(genreName) {
	console.log('changeToGenreSimilarity1() was called with genre: '
			+ genreName);

	selectedgenre = genreName;
	currentlySetTagCloudTermsArray= new Array();
	songsAlreadyUsed = new Array();
	//tagCloudResetDueToSimialrityChangeIsNeeded = true;
	similarityModeIsGenre = true;
	similarityModeIsArtist = false;
	similarityModeIsSong = false;
	similarityModeIsPlaylist = false;
	
	$("#throbberInfo").text(
			'Downloading songs that represent the genre '
					+ genreName);
	$('#similarityInfo').text('Current Seed Genre: '+genreName );
	currentSimilarityInfoString = 'Current Seed Genre: '+genreName ;
	
/*	var randomNumber = Math.floor(Math.random() * 100);
	var genreUrl = 'http://developer.echonest.com/api/v4/playlist/dynamic/create?api_key='
			+ echonestApiKey
			+ '&type=genre-radio&bucket=id:spotify-WW&bucket=tracks&_='
			+ randomNumber;
	$.getJSON(genreUrl, {
		format : 'json',
		limit : true,
		genre : genreName

	}, function(data) {
		if (checkResponse(data)) {

			console.log('Changed to Genre Radio: ' + genreName);

			$('#genreSimilarityInfo').text(
					'Now songs are recommended because the represent the genre: '
							+ genreName);
			
			//$("#throbberInfo").show();
			//info("");
			styleTermNames = new Array();
			styleTermObjects = new Array();
			$("#tagCloud").tagCloud(styleTermObjects);

			session_id = data.response.session_id;

			console.log("New session ID  is used: " + session_id);
			restartSessionWithCurrentGuiState();
			//getNextSong1();

		} else {
			info("trouble getting results");
		}
	}).fail(function( jqxhr, textStatus, error ) {
		var err = textStatus + ", " + error;
		console.log( "ECHONEST DYNAMIC  Request Failed: " + err );
		errorHandlingforEchonestCalls(jqxhr, textStatus, error);
		
	});*/

}

function getSongHotnesRangeforGenre(genreName) {

	console.log('ECHONEST DYNAMIC getSongHotnesRangeforGenre(genreName) was called');
	var randomNumber = Math.floor(Math.random() * 100);

	var urlHotnes = 'http://developer.echonest.com/api/v4/song/search?';
	// get the lowest value
	var args = {
		api_key : echonestApiKey,
		format : 'json',
		bucket : [ 'song_hotttnesss' ],
		sort : 'song_hotttnesss-desc',
		results : '10',
		style : genreName

	}

	$
			.getJSON(
					urlHotnes,
					args,
					function(genreData) {
						if (checkResponse(genreData)) {

							// console.log('GENRE '+entry+':
							// '+JSON.stringify(genreData));

							var arraySongHotnessValues = new Array();
							// console.log('GENRE '+entry+' Ascending');
							for ( var i = 0; i < genreData.response.songs.length; i++) {
								arraySongHotnessValues
										.push(genreData.response.songs[i].song_hotttnesss);
								// console.log('song hotness asc for
								// '+genreData.response.songs[i].artist_name+':
								// '+genreData.response.songs[i].song_hotttnesss);

							}
							upperSongHotnessBorderForGenreSimilarity = arraySongHotnessValues[0];
							console
									.log('upperSongHotnessBorderForGenreSimilarity for genre '
											+ genreName
											+ ': '
											+ upperSongHotnessBorderForGenreSimilarity);

						}
					});

	// get the highest value
	var args1 = {
		api_key : echonestApiKey,
		format : 'json',
		bucket : [ 'song_hotttnesss' ],
		sort : 'song_hotttnesss-asc',
		results : '10',
		style : genreName
	}

	$
			.getJSON(
					urlHotnes,
					args1,
					function(genreData) {
						if (checkResponse(genreData)) {

							// console.log('GENRE '+entry+':
							// '+JSON.stringify(genreData));

							var arraySongHotnessValues = new Array();
							// console.log('GENRE '+entry+' Ascending');
							for ( var i = 0; i < genreData.response.songs.length; i++) {
								arraySongHotnessValues
										.push(genreData.response.songs[i].song_hotttnesss);
								// console.log('song hotness asc for
								// '+genreData.response.songs[i].artist_name+':
								// '+genreData.response.songs[i].song_hotttnesss);

							}
							lowerSongHotnessBorderForGenreSimilarity = arraySongHotnessValues[0];
							console
									.log('lowerSongHotnessBorderForGenreSimilarity for genre '
											+ genreName
											+ ': '
											+ lowerSongHotnessBorderForGenreSimilarity);

						}
					});

	// mittelwertSongHotnesGenreSimliarity
	// varianzSongHotnesGenreSimliarity

	// Test auf Normalverteilung
	var args2 = {
		api_key : echonestApiKey,
		format : 'json',
		bucket : [ 'song_hotttnesss' ],
		// sort : 'hotttnesss-desc',
		results : '100',
		style : genreName
	}

	var arraySongHotnessValues = new Array();

	$.getJSON(urlHotnes, args2, function(genreData) {
		if (checkResponse(genreData)) {
			// console.log('RESPONSE SONG HOTNES VALUES: '
			// +JSON.stringify(genreData.response.songs));
			// console.log('GENRE '+entry+' Descending');
			for ( var i = 0; i < genreData.response.songs.length; i++) {
				// console.log('RESPONSE SONG HOTNES VALUES: '
				// +genreData.response.songs);
				arraySongHotnessValues
						.push(genreData.response.songs[i].song_hotttnesss);
				// console.log('artist hotness desc for
				// '+genreData.response.artists[i].name+':
				// '+genreData.response.artists[i].hotttnesss);

			}

			arraySongHotnessValues.sort(function(a, b) {
				return a - b
			});
			console.log('ECHONEST GENRE ' + genreName
					+ ' STCIHPROBE SONG HOTNESS : ' + arraySongHotnessValues);

			// Mittelwert berechnen

			var summe = 0;

			for ( var i = 0; i < arraySongHotnessValues.length; i++) {
				summe = summe + arraySongHotnessValues[i];
			}

			mittelwertSongHotnesGenreSimliarity = summe
					/ arraySongHotnessValues.length;

			console.log('ECHONEST GENRE ' + genreName
					+ ' SONG HOTNESS MITTELWERT FOR GENRE SIMILARITY: '
					+ mittelwertSongHotnesGenreSimliarity);

			// Varianz berechnen

			var varianzSumme = 0;
			for ( var i = 0; i < arraySongHotnessValues.length; i++) {
				varianzSumme = varianzSumme
						+ Math.pow(arraySongHotnessValues[i]
								- mittelwertSongHotnesGenreSimliarity, 2);
			}

			varianzSongHotnesGenreSimliarity = Math
					.sqrt((1 / (arraySongHotnessValues.length - 1))
							* varianzSumme);

			console.log('ECHONEST GENRE ' + genreName
					+ ' SONG HOTNESS VARIANZ  FOR GENRE SIMILARITY: '
					+ varianzSongHotnesGenreSimliarity);

			/*
			 * var mittelwertPlusVarianz1 = mittelwert + varianz; var
			 * mittelwertPlusVarianz2 = mittelwert + 2*varianz; var
			 * mittelwertPlusVarianz3 = mittelwert + 3*varianz;
			 * 
			 * var mittelwertMinusVarianz1 = mittelwert - varianz; var
			 * mittelwertMinusVarianz2 = mittelwert - 2*varianz; var
			 * mittelwertMinusVarianz3 = mittelwert - 3*varianz;
			 * 
			 * console.log('ECHONEST GENRE DATA ARTIST HOTNESS GENRE SPANNE 1
			 * VON: '+ mittelwertMinusVarianz1+' bis '+mittelwertPlusVarianz1+' =
			 * 68% ABDECKUNG'); console.log('ECHONEST GENRE DATA ARTIST HOTNESS
			 * GENRE SPANNE 2 VON: '+ mittelwertMinusVarianz2+' bis
			 * '+mittelwertPlusVarianz2+ ' = 95% BADECKUNG');
			 * console.log('ECHONEST GENRE DATA ARTIST HOTNESS GENRE SPANNE 3
			 * VON: '+ mittelwertMinusVarianz3+' bis '+mittelwertPlusVarianz3 +' =
			 * 99% ABDECKUNG');
			 */
		}
	});

}

function getArtistHotnesRangeforGenre(genreName) {
	console
			.log('ECHONEST DYNAMIC getArtistHotnesRangeforGenre(genreName) was called');
	var randomNumber = Math.floor(Math.random() * 100);
	var url = 'http://developer.echonest.com/api/v4/artist/search?_='
			+ randomNumber;

	// get the lowest Value of the range
	var args = {
		api_key : echonestApiKey,
		format : 'json',
		bucket : [ 'hotttnesss' ],
		sort : 'hotttnesss-asc',
		results : '10',
		genre : genreName
	}

	$.getJSON(url, args, function(genreData) {
		if (checkResponse(genreData)) {
			var arrayHotnessValues = new Array();

			for ( var i = 0; i < genreData.response.artists.length; i++) {
				arrayHotnessValues
						.push(genreData.response.artists[i].hotttnesss);

			}

			// console.log('ECHONEST GENRE DATA HOTNESS ASCENDING FOR GENRE
			// '+genreName+': '+ arrayHotnessValues);

			lowerArtistHotnessBorderForGenreSimilarity = arrayHotnessValues[0];
			console.log('lowerArtistHotnessBorderForGenreSimilarity for genre '
					+ genreName + ': '
					+ lowerArtistHotnessBorderForGenreSimilarity);

		}
	});

	// get the highest value of the range
	var args1 = {
		api_key : echonestApiKey,
		format : 'json',
		bucket : [ 'hotttnesss' ],
		sort : 'hotttnesss-desc',
		results : '10',
		genre : genreName
	}

	$.getJSON(url, args1, function(genreData) {
		if (checkResponse(genreData)) {
			var arrayHotnessValues = new Array();

			for ( var i = 0; i < genreData.response.artists.length; i++) {
				arrayHotnessValues
						.push(genreData.response.artists[i].hotttnesss);

			}

			// console.log('ECHONEST GENRE DATA HOTNESS DESCENDING FOR GENRE
			// '+genreName+': '+ arrayHotnessValues);
			upperArtistHotnessBorderForGenreSimilarity = arrayHotnessValues[0];
			console.log('upperArtistHotnessBorderForGenreSimilarity for genre '
					+ genreName + ': '
					+ upperArtistHotnessBorderForGenreSimilarity);

		}
	});

	// Test auf Normalverteilung
	var args2 = {
		api_key : echonestApiKey,
		format : 'json',
		bucket : [ 'hotttnesss' ],
		// sort : 'hotttnesss-desc',
		results : '100',
		genre : genreName
	}

	var arrayHotnessValues = new Array();

	$
			.getJSON(
					url,
					args2,
					function(genreData) {
						if (checkResponse(genreData)) {

							// console.log('GENRE '+entry+' Descending');
							for ( var i = 0; i < genreData.response.artists.length; i++) {
								arrayHotnessValues
										.push(genreData.response.artists[i].hotttnesss);
								// console.log('artist hotness desc for
								// '+genreData.response.artists[i].name+':
								// '+genreData.response.artists[i].hotttnesss);

							}

							arrayHotnessValues.sort(function(a, b) {
								return a - b
							});
							console.log('ECHONEST GENRE ' + genreName
									+ ' STCIHPROBE ARTIST HOTNESS : '
									+ arrayHotnessValues);

							// Mittelwert berechnen

							var summe = 0;

							for ( var i = 0; i < arrayHotnessValues.length; i++) {
								summe = summe + arrayHotnessValues[i];
							}

							mittelwertArtistHotnesGenreSimliarity = summe
									/ arrayHotnessValues.length;

							console
									.log('ECHONEST GENRE '
											+ genreName
											+ ' ARTIST HOTNESS MITTELWERT FOR GENRE SIMILARITY: '
											+ mittelwertArtistHotnesGenreSimliarity);

							// Varianz berechnen

							var varianzSumme = 0;
							for ( var i = 0; i < arrayHotnessValues.length; i++) {
								varianzSumme = varianzSumme
										+ Math
												.pow(
														arrayHotnessValues[i]
																- mittelwertArtistHotnesGenreSimliarity,
														2);
							}

							varianzArtistHotnesGenreSimliarity = Math
									.sqrt((1 / (arrayHotnessValues.length - 1))
											* varianzSumme);

							console
									.log('ECHONEST GENRE '
											+ genreName
											+ ' ARTIST HOTNESS VARIANZ  FOR GENRE SIMILARITY: '
											+ varianzArtistHotnesGenreSimliarity);

							/*
							 * var mittelwertPlusVarianz1 = mittelwert +
							 * varianz; var mittelwertPlusVarianz2 = mittelwert +
							 * 2*varianz; var mittelwertPlusVarianz3 =
							 * mittelwert + 3*varianz;
							 * 
							 * var mittelwertMinusVarianz1 = mittelwert -
							 * varianz; var mittelwertMinusVarianz2 = mittelwert -
							 * 2*varianz; var mittelwertMinusVarianz3 =
							 * mittelwert - 3*varianz;
							 * 
							 * console.log('ECHONEST GENRE DATA ARTIST HOTNESS
							 * GENRE SPANNE 1 VON: '+ mittelwertMinusVarianz1+'
							 * bis '+mittelwertPlusVarianz1+' = 68% ABDECKUNG');
							 * console.log('ECHONEST GENRE DATA ARTIST HOTNESS
							 * GENRE SPANNE 2 VON: '+ mittelwertMinusVarianz2+'
							 * bis '+mittelwertPlusVarianz2+ ' = 95%
							 * BADECKUNG'); console.log('ECHONEST GENRE DATA
							 * ARTIST HOTNESS GENRE SPANNE 3 VON: '+
							 * mittelwertMinusVarianz3+' bis
							 * '+mittelwertPlusVarianz3 +' = 99% ABDECKUNG');
							 */
						}
					});

}

function getArtistFamilarityRangeforGenre(genreName) {
	console
			.log('ECHONEST DYNAMIC getArtistFamilarityRangeforGenre(genreName) was called');
	var randomNumber = Math.floor(Math.random() * 100);
	var url = 'http://developer.echonest.com/api/v4/artist/search?_='
			+ randomNumber;

	// get the lowest Value of the range
	var args = {
		api_key : echonestApiKey,
		format : 'json',
		bucket : [ 'familiarity' ],
		sort : 'familiarity-asc',
		results : '10',
		genre : genreName
	}

	$
			.getJSON(
					url,
					args,
					function(genreData) {
						if (checkResponse(genreData)) {
							var arrayFamilarityValues = new Array();

							for ( var i = 0; i < genreData.response.artists.length; i++) {
								arrayFamilarityValues
										.push(genreData.response.artists[i].familiarity);

							}

							// console.log('ECHONEST GENRE DATA FAMILARITY
							// ASCENDING FOR GENRE '+genreName+': '+
							// arrayFamilarityValues);

							lowerArtistFamilarityBorderForGenreSimilarity = arrayFamilarityValues[0];
							console
									.log('lowerArtistFamilarityBorderForGenreSimilarity for genre '
											+ genreName
											+ ': '
											+ lowerArtistFamilarityBorderForGenreSimilarity);

						}
					});

	// get the highest value of the range
	var args1 = {
		api_key : echonestApiKey,
		format : 'json',
		bucket : [ 'familiarity' ],
		sort : 'familiarity-desc',
		results : '10',
		genre : genreName
	}

	$
			.getJSON(
					url,
					args1,
					function(genreData) {
						if (checkResponse(genreData)) {
							var arrayFamilarityValues = new Array();

							for ( var i = 0; i < genreData.response.artists.length; i++) {
								arrayFamilarityValues
										.push(genreData.response.artists[i].familiarity);

							}

							// console.log('ECHONEST GENRE DATA FAMILARITY
							// DESCENDING FOR GENRE '+genreName+': '+
							// arrayFamilarityValues);

							upperArtistFamilarityBorderForGenreSimilarity = arrayFamilarityValues[0];
							console
									.log('upperArtistFamilarityBorderForGenreSimilarity for genre '
											+ genreName
											+ ': '
											+ upperArtistFamilarityBorderForGenreSimilarity);

						}
					});

	// Test auf Normalverteilung
	var args2 = {
		api_key : echonestApiKey,
		format : 'json',
		bucket : [ 'familiarity' ],
		// sort : 'hotttnesss-desc',
		results : '100',
		genre : genreName
	}

	var arrayFamiliarityValues = new Array();

	$
			.getJSON(
					url,
					args2,
					function(genreData) {
						if (checkResponse(genreData)) {

							// console.log('GENRE '+entry+' Descending');
							for ( var i = 0; i < genreData.response.artists.length; i++) {
								arrayFamiliarityValues
										.push(genreData.response.artists[i].familiarity);
								// console.log('artist hotness desc for
								// '+genreData.response.artists[i].name+':
								// '+genreData.response.artists[i].hotttnesss);

							}

							arrayFamiliarityValues.sort(function(a, b) {
								return a - b
							});
							console.log('ECHONEST GENRE ' + genreName
									+ ' STICHPROBE  ARTIST FAMILIARITY : '
									+ arrayFamiliarityValues);

							// Mittelwert berechnen

							var summe = 0;

							for ( var i = 0; i < arrayFamiliarityValues.length; i++) {
								summe = summe + arrayFamiliarityValues[i];
							}

							mittelwertArtistFamiliarityGenreSimliarity = summe
									/ arrayFamiliarityValues.length;

							console
									.log('ECHONEST GENRE '
											+ genreName
											+ ' ARTIST FAMILIARITY MITTELWERT FOR GENRE SIMILARITY: '
											+ mittelwertArtistFamiliarityGenreSimliarity);

							// Varianz berechnen

							var varianzSumme = 0;
							for ( var i = 0; i < arrayFamiliarityValues.length; i++) {
								varianzSumme = varianzSumme
										+ Math
												.pow(
														arrayFamiliarityValues[i]
																- mittelwertArtistFamiliarityGenreSimliarity,
														2);
							}

							varianzArtistFamiliarityGenreSimliarity = Math
									.sqrt((1 / (arrayFamiliarityValues.length - 1))
											* varianzSumme);

							console
									.log('ECHONEST GENRE '
											+ genreName
											+ ' ARTIST FAMILIARITY VARIANZ  FOR GENRE SIMILARITY: '
											+ varianzArtistFamiliarityGenreSimliarity);

							/*
							 * var mittelwertPlusVarianz1 = mittelwert +
							 * varianz; var mittelwertPlusVarianz2 = mittelwert +
							 * 2*varianz; var mittelwertPlusVarianz3 =
							 * mittelwert + 3*varianz;
							 * 
							 * var mittelwertMinusVarianz1 = mittelwert -
							 * varianz; var mittelwertMinusVarianz2 = mittelwert -
							 * 2*varianz; var mittelwertMinusVarianz3 =
							 * mittelwert - 3*varianz;
							 * 
							 * console.log('ECHONEST GENRE DATA ARTIST HOTNESS
							 * GENRE SPANNE 1 VON: '+ mittelwertMinusVarianz1+'
							 * bis '+mittelwertPlusVarianz1+' = 68% ABDECKUNG');
							 * console.log('ECHONEST GENRE DATA ARTIST HOTNESS
							 * GENRE SPANNE 2 VON: '+ mittelwertMinusVarianz2+'
							 * bis '+mittelwertPlusVarianz2+ ' = 95%
							 * BADECKUNG'); console.log('ECHONEST GENRE DATA
							 * ARTIST HOTNESS GENRE SPANNE 3 VON: '+
							 * mittelwertMinusVarianz3+' bis
							 * '+mittelwertPlusVarianz3 +' = 99% ABDECKUNG');
							 */
						}
					});

}

function startNewSession1(models1, throbber1, trackCover1,
		apiKey/*, yearSlider1 , playlistInformation1 */) {
	console.log("New session is started");

	echonestApiKey = apiKey.getApiKey();
	console.log('ECHONEST DYNAMIC apiKey was set to: ' + echonestApiKey);

	models = models1;



	trackCoverScript = trackCover1;
//	yearSliderScript = yearSlider1;

	songsAlreadyUsed = new Array();

	

	trackCurrentlyPlaying = models.player.load('track');


	if (trackCurrentlyPlaying == null) {
		info('Start playing something and I ll make a playlist of good songs based on that song');

	} else {

		
		//$("#albumCoverContainer").hide();
	

		var throbberContainer = document.getElementById('display');
		throbber = throbber1.forElement(throbberContainer);
		throbber.setPosition('center', 'center');

		var throbberContainerTagCloud = document.getElementById("tagCloud");
		throbberTagCloud = throbber1.forElement(throbberContainerTagCloud);
		throbberTagCloud.setPosition('center', 'center');

		disableGUI();
	
		artistName = models.player.track.artists[0].name;
		
//		yearSliderScript.reset();
//		yearSliderScript.setSimilarityMode(0);
//		yearSliderScript.setSimilarityBase(artistName);
		
		trackName = models.player.track.name;
		
		//$("#artistSimilarityInfo").text(artistName);
		$("#throbberInfo").text(
				'Downloading Songs that are played by artists similar to '
						+ artistName);
		
		$('#similarityInfo').text('Current Seed Artist: '+artistName );
		currentSimilarityInfoString = 'Current Seed Artist: '+artistName 
		seedArtistSpotifyId = models.player.track.artists[0].toString();
		// console.log('artist_id: '+artist_id);

		seedArtistIdforEchonestCalls = seedArtistSpotifyId.replace('spotify',
				'spotify-WW');
		// console.log('Replaced Artist ID: '+replacedArtistID);

		
		//song_id = spotify Song ID for GUI Changes 
		song_id = models.player.track.uri.toString();
		//code to use the spotify song Id for echnonest calls
		//var replacedSongID= song_id.replace('spotify', 'spotify-WW');
		// console.log('Replaced ID: '+replacedSongID);

		var randomNumber = Math.floor(Math.random() * 100);

		// api_key='+echonestApiKey+'&
		// &artist_id='+seedArtistIdforEchonestCalls+'
		// &bucket=id:spotify-WW&bucket=tracks
		var url = 'http://developer.echonest.com/api/v4/playlist/dynamic/create?&_='
				+ randomNumber;
		var args = {
			api_key : echonestApiKey,
			artist_id : seedArtistIdforEchonestCalls,
			format : 'json',
			limit : true,
			type : 'artist-radio',
			bucket : [ 'song_hotttnesss', 'artist_familiarity',
					'artist_hotttnesss', 'tracks', 'id:spotify-WW' ]

		}

		// getJSON Syntax: URL(wohin geht die Anfrage), DATA (Objekt oder String
		// der mit der anfrage geschickt wird), CALLBACK (Funktion, die bei
		// erfolgreicher Anfrage ausgeführt wird)
		$.getJSON(url, args,

		function(data) {
			if (checkResponse(data)) {
				info("");
			
				styleTermNames = new Array();
				styleTermObjects = new Array();
				//$("#tagCloud").tagCloud(styleTermObjects);

				session_id = data.response.session_id;

				console.log("ECHONEST DYNAMIC New session ID  is used: "
						+ session_id);
				
				similarityModeIsArtist = true;
				getNextSong1();
				
			} else {
				info("trouble getting results");
			}
		});

	}

}

function changeSeedArtistSimilarity1() {
	console.log('echonestDynamic changeSeedArtistSimilarity1() was called');

//	resetSliders();
	songsAlreadyUsed = new Array();

	var track = models.player.load('track');
	// console.log('TRACK= '+track);
	var artist = models.player.track.artists[0];
	// console.log('ARTIST: '+artist);

	if (track == null) {
		info('Start playing something and I ll make a playlist of good songs based on that song');
		console.log('ECHONEST DYNAMIC changeSeedArtistSimilarity1() TRACK =NULL!!! ');

	} else {

		var cover = document.getElementById('albumCoverContainer');
		// var cover = $(".albumCoverContainer") ;
		// var pictureThrobber = throbber1.forElement(cover);
		// pictureThrobber.setSize('normal');

		// getAllEchonestGenres();

		// var artist_id =
		// models1.player.track.artists[0].uri.replace('spotify', 'spotify-WW');

		artistName = models.player.track.artists[0].name;

		trackName = models.player.track.name;
		
//		yearSliderScript.reset();
//		yearSliderScript.setSimilarityMode(0);
//		yearSliderScript.setSimilarityBase(artistName);

		//$("#artistSimilarityInfo").text(artistName);
		$("#throbberInfo").text(
				'Downloading Songs that are played by artists  similar to '
						+ artistName);
		$('#similarityInfo').text("Current Seed Artist: "+artistName);
		currentSimilarityInfoString="Current Seed Artist: "+artistName;
		// info('Getting Songs like "'+trackName+'" by '+ artistName);

		seedArtistSpotifyId = models.player.track.artists[0].toString();
		// console.log('artist_id: '+artist_id);

		seedArtistIdforEchonestCalls = seedArtistSpotifyId.replace('spotify',
				'spotify-WW');
		// console.log('Replaced Artist ID: '+replacedArtistID);

		// replacedArtistID = 'spotify-WW:artist:4Z8W4fKeB5YxbusRsdQVPb';

		song_id = models.player.track.uri.toString();
		// .decodeForText();
		// console.log('Spotify Song ID: '+song_id);
		// var replacedSongID=
		// models1.player.track.uri.decodeForText().replace('spotify',
		// 'spotify-WW');
		var replacedSongID = song_id.replace('spotify', 'spotify-WW');
		// console.log('Replaced ID: '+replacedSongID);
		// replacedSongID = '"'+replacedSongID+'"';
		// console.log('Replaced ID mit " "': '+replacedSongID);
		// Format: spotify-WW:track:3L7BcXHCG8uT92viO6Tikl
		// replacedSongID = 'spotify-WW:track:3L7BcXHCG8uT92viO6Tikl';
		// console.log('Replaced ID: '+replacedSongID);
		console.log("-----checkbox: "+$('#excludeSeedArtistCheckBox').prop('checked'));

		if ($('#excludeSeedArtistCheckBox').prop('checked')) {

			console.log("-----EXCLUDE SEED ARTIST");
			banedSeedArtistId = seedArtistSpotifyId;
			trackCoverScript.setBannedSeedArtist(banedSeedArtistId);
//			yearSliderScript.excludeSeedArtist(true);

		}
		

		/*
		 * if( $('#excludeSeedArtistCheckBox').prop('checked')){
		 * banArtistFeedback1(); }
		 */
/*
		var randomNumber = Math.floor(Math.random() * 100);

		// var artistIdsForPopularity = new Array();
		var url = 'http://developer.echonest.com/api/v4/playlist/dynamic/create?&_=' + randomNumber;
		var args = {
			api_key : echonestApiKey,
			artist_id : seedArtistIdforEchonestCalls,
			format : 'json',
			limit : true,
			type : 'artist-radio',
			bucket : [ 'song_hotttnesss', 'artist_familiarity',
					'artist_hotttnesss', 'tracks', 'id:spotify-WW' ]

		};
		
		
	
		

		// getJSON Syntax: URL(wohin geht die Anfrage), DATA (Objekt oder String
		// der mit der anfrage geschickt wird), CALLBACK (Funktion, die bei
		// erfolgreicher Anfrage ausgeführt wird)
		$.getJSON(url, args,

		function(data) {
			if (checkResponse(data)) {
				info("");
				// $("#albumCoverContainer").empty();
				styleTermNames = new Array();
				styleTermObjects = new Array();
				$("#tagCloud").tagCloud(styleTermObjects);

				session_id = data.response.session_id;
				// console.log('session_id: '+session_id);
				console.log("New session ID  is used: " + session_id);
				
				//getNextSong1();
				

			} else {
				info("trouble getting results");
			}
		}).fail(function( jqxhr, textStatus, error ) {
			var err = textStatus + ", " + error;
			console.log( "ECHONEST DYNAMIC  Request Failed: " + err );
			errorHandlingforEchonestCalls(jqxhr, textStatus, error);
			
			});*/

	}

	// getPlaylistInfo();
}

function changeSeedSongSimilarity1() {
	console.log('echonestDynamic changeSeedSongSimilarity1() was called');

	// numberOfSongs=10;
	 songsAlreadyUsed = new Array();
//	 resetSliders();
	
	var track = models.player.load('track');
	console.log('TRACK= ' + track);
	var artist = models.player.track.artists[0];
	console.log('ARTIST: ' + artist);

	if (track == null) {
		info('Start playing something and I ll make a playlist of good songs based on that song');

	} else {

		var cover = document.getElementById('albumCoverContainer');
		

		artistName = models.player.track.artists[0].name;

		trackName = models.player.track.name;
		


		//$("#songSimilarityInfo").text('"' + trackName + '" by ' + artistName);
		$("#throbberInfo").text(
				'Downloading Songs that are similar to ' + '"'
						+ trackName + '" by ' + artistName);
		$('#similarityInfo').text('Current Seed Song: '+'\"'+trackName+'\" '+'by '+ artistName );
		currentSimilarityInfoString = 'Current Seed Song: '+'\"'+trackName+'\" '+'by '+ artistName;
		// info('Getting Songs like "'+trackName+'" by '+ artistName);

		seedArtistSpotifyId = models.player.track.artists[0].toString();
		// console.log('artist_id: '+artist_id);

		var replacedArtistID = seedArtistSpotifyId.replace('spotify',
				'spotify-WW');
		// console.log('Replaced Artist ID: '+replacedArtistID);

		// replacedArtistID = 'spotify-WW:artist:4Z8W4fKeB5YxbusRsdQVPb';

		song_id = models.player.track.uri.toString();
		// .decodeForText();
		// console.log('Spotify Song ID: '+song_id);
		// var replacedSongID=
		// models1.player.track.uri.decodeForText().replace('spotify',
		// 'spotify-WW');
		var replacedSongID = song_id.replace('spotify', 'spotify-WW');
		// console.log('Replaced ID: '+replacedSongID);
		// replacedSongID = '"'+replacedSongID+'"';
		// console.log('Replaced ID mit " "': '+replacedSongID);
		// Format: spotify-WW:track:3L7BcXHCG8uT92viO6Tikl
		// replacedSongID = 'spotify-WW:track:3L7BcXHCG8uT92viO6Tikl';
		// console.log('Replaced ID: '+replacedSongID);

		console.log("-----checkbox: "+$('#excludeSeedArtistCheckBox').prop('checked'));
		if ($('#excludeSeedArtistCheckBox').prop('checked')) {

			console.log("-----EXCLUDE SEED ARTIST");
			banedSeedArtistId = seedArtistSpotifyId;
			trackCoverScript.setBannedSeedArtist(banedSeedArtistId);
//			yearSliderScript.excludeSeedArtist(true);

		}
		

		/*var randomNumber = Math.floor(Math.random() * 100);

		var artistIdsForPopularity = new Array();
		var url = 'http://developer.echonest.com/api/v4/playlist/dynamic/create?&_=' + randomNumber;
		var args = {
			api_key : echonestApiKey,
			song_id : replacedSongID,
			artist_id : seedArtistIdforEchonestCalls,
			format : 'json',
			bucket : [ 'song_hotttnesss', 'artist_familiarity',
					'artist_hotttnesss', 'tracks', 'id:spotify-WW' ],
			type : 'song-radio'

		};

		// getJSON Syntax: URL(wohin geht die Anfrage), DATA (Objekt oder String
		// der mit der anfrage geschickt wird), CALLBACK (Funktion, die bei
		// erfolgreicher Anfrage ausgeführt wird)
		$.getJSON(url, args,

		function(data) {
			if (checkResponse(data)) {
				info("");
				// $("#albumCoverContainer").empty();
				styleTermNames = new Array();
				styleTermObjects = new Array();
				$("#tagCloud").tagCloud(styleTermObjects);

				session_id = data.response.session_id;
			
				//getNextSong1();
			

			} else {
				info("trouble getting results");
			}
		}).fail(function( jqxhr, textStatus, error ) {
			var err = textStatus + ", " + error;
			console.log( "ECHONEST DYNAMIC  Request Failed: " + err );
			errorHandlingforEchonestCalls(jqxhr, textStatus, error);
			
			});*/

	}

}

function changeToArtistSimilarity1() {
	// console.log("New session is started");

	//tagCloudResetDueToSimialrityChangeIsNeeded = true;

	similarityModeIsGenre = false;
	similarityModeIsArtist = true;
	similarityModeIsSong = false;
	similarityModeIsPlaylist = false;
	
	songsAlreadyUsed = new Array();
	currentlySetTagCloudTermsArray= new Array();
	
	
	

	//var cover = document.getElementById('albumCoverContainer');
	
	$('#changeSeedArtist').show();
	//$('#similarityInfo').css('padding-left', '125px');
	$('#similarityInfo').text('Current Seed Artist: '+artistName);
	currentSimilarityInfoString = 'Current Seed Artist: '+artistName;
	$('#changeSeedSong').hide();

	//$("#artistSimilarityInfo").text(artistName);

	$("#throbberInfo").text(
			'Downloading Songs that are played by artists  similar to '
					+ artistName);
	//$("#throbberInfo").show();
	$('#tags').hide();
	$('#genreSelectLabel').hide();

	$('#excludeSeedArtistCheckBox').show();

	$('#excludeSeedArtistLabel').show();

	$('#excludeSeedArtistLabel').next('br').show();
	
	$("#artistVarietySlider").slider( "value", 50 );
	$('.yearpick').val('off');

	$("#adventurousnessSlider").hide();
	$("#adventurousnessSliderLabel").hide();
	
/*
	var replacedArtistID = seedArtistSpotifyId.replace('spotify', 'spotify-WW');

	var replacedSongID = song_id.replace('spotify', 'spotify-WW');


	var randomNumber = Math.floor(Math.random() * 100);

	var artistIdsForPopularity = new Array();
	var url = 'http://developer.echonest.com/api/v4/playlist/dynamic/create?api_key='
			+ echonestApiKey
			+ '&callback=?&bucket=id:spotify-WW&bucket=tracks&artist_id='
			+ replacedArtistID + '&_=' + randomNumber;
	
	$.getJSON(url, {
		'format' : 'jsonp',
		limit : true,
		'type' : 'artist-radio',

	}, function(data) {
		if (checkResponse(data)) {
			
		
			styleTermNames = new Array();
			styleTermObjects = new Array();
			$("#tagCloud").tagCloud(styleTermObjects);

			session_id = data.response.session_id;

			console.log("New session ID  is used: " + session_id);

			restartSessionWithCurrentGuiState();
			
		
		} else {
			info("trouble getting results");
		}
	}).fail(function( jqxhr, textStatus, error ) {
		var err = textStatus + ", " + error;
		console.log( "ECHONEST DYNAMIC  Request Failed: " + err );
		errorHandlingforEchonestCalls(jqxhr, textStatus, error);
		
		});*/



	

}

function changeToSongSimilarity1() {
	console.log(" echonest changeToSongSimilarity1() was called");
	//tagCloudResetDueToSimialrityChangeIsNeeded = true;
	similarityModeIsGenre = false;
	similarityModeIsArtist = false;
	similarityModeIsSong = true;
	similarityModeIsPlaylist = false;
	
	songsAlreadyUsed = new Array();
	currentlySetTagCloudTermsArray= new Array();
	
//	yearSliderScript.reset();
//	yearSliderScript.setSimilarityMode(1);
//	yearSliderScript.setSimilarityBase(trackName + '" by ' + artistName);
//	yearSliderScript.setArtistTermsArray(currentlySetTagCloudTermsArray);

	
	var cover = document.getElementById('albumCoverContainer');

	//$("#songSimilarityInfo").text('"' + trackName + '" by ' + artistName);
	$("#throbberInfo").text(
			'Downloading songs that are similar to ' + '"'
					+ trackName + '" by ' + artistName);
	
	//$('#similarityInfo').css('padding-left' , '185px');
	$('#similarityInfo').text('Current Seed Song: '+'\"'+trackName+'\" '+'by '+ artistName );
	currentSimilarityInfoString = 'Current Seed Song: '+'\"'+trackName+'\" '+'by '+ artistName ;
	//$("#throbberInfo").show();
	// var changeSeedArtistButton = document.getElementById("changeSeedArtist");
	// changeSeedArtistButton.style.display = 'none';
	// var changeSeedSongButton = document.getElementById("changeSeedSong");
	// changeSeedArtistButton.style.display = 'none';
	$('#changeSeedArtist').hide();
	$("#changeSeedSong").show();
	$('#tags').hide();
	$('#genreSelectLabel').hide();
	$('#tags1').hide();
	$('#playlistSelectLabel').hide();

	$('#excludeSeedArtistCheckBox').show();

	$('#excludeSeedArtistLabel').show();

	$('#excludeSeedArtistLabel').next('br').show();
	
	$("#artistVarietySlider").slider( "value", 50 );

	$("#adventurousnessSlider").hide();
	$("#adventurousnessSliderLabel").hide();
	


//	resetSliders();

	
/*	var replacedSongID = song_id.replace('spotify', 'spotify-WW');

	var randomNumber = Math.floor(Math.random() * 100);

	var url = 'http://developer.echonest.com/api/v4/playlist/dynamic/create?api_key='
			+ echonestApiKey
			+ '&bucket=id:spotify-WW&bucket=tracks&song_id='
			+ replacedSongID + '&_=' + randomNumber;

	// getJSON Syntax: URL(wohin geht die Anfrage), DATA (Objekt oder String der
	// mit der anfrage geschickt wird), CALLBACK (Funktion, die bei
	// erfolgreicher Anfrage ausgeführt wird)
	$.getJSON(url, {// 'artist_id': " " ,
		// 'track_id': replacedSongID,
		'format' : 'json',
		limit : true,
		'type' : 'song-radio',
	// 'bucket' : ['song_hotttnesss', 'artist_familiarity','artist_hotttnesss']

	// 'song_min_hotttnesss': minHotness, 'song_max_hotttnesss': maxHotness,
	// 'artist_max_familiarity': maxPopularity, 'artist_min_familiarity':
	// minPopularity
	// bucket : ['id:spotify-WW', 'tracks'],
	}, function(data) {
		if (checkResponse(data)) {
			info("");
			// $("#albumCoverContainer").empty();
			styleTermNames = new Array();
			styleTermObjects = new Array();
			$("#tagCloud").tagCloud(styleTermObjects);

			session_id = data.response.session_id;

			console.log("New session ID  is used: " + session_id);
			restartSessionWithCurrentGuiState();
			
			//getNextSong1();
			

		} else {
			info("trouble getting results");
		}
	}).fail(function( jqxhr, textStatus, error ) {
		var err = textStatus + ", " + error;
		console.log( "ECHONEST DYNAMIC  Request Failed: " + err );
		errorHandlingforEchonestCalls(jqxhr, textStatus, error);
		
		});*/

}



function getNextSong1() {

	/*throbber.show();
	throbberTagCloud.show();
	$('#throbberInfo').show();*/
	
	var echonestTrackId = null;
	var id = null;
	var echonestArtistId = null;
	var replacedTrackId  = null;
	
	
	if(!guiDisabled){
		disableGUI();
	}

	var randomNumber = Math.floor(Math.random() * 100);
	var url = 'http://developer.echonest.com/api/v4/playlist/dynamic/next?session_id='+ session_id + '&_=' + randomNumber;
	var args = {
		api_key : echonestApiKey,
		format : 'json',
		results : 1,
	};

	$.getJSON(
			url,
			args,
			function(data) {
				if (checkResponse(data)) {
					
					try{
						console.log('Next song is: '
								+ data.response.songs[0].title + ' by '
								+ data.response.songs[0].artist_name);

						echonestTrackId = data.response.songs[0].id;
						id = data.response.songs[0].tracks[0].foreign_id;
						echonestArtistId = data.response.songs[0].artist_id;
						replacedTrackId = id.replace('spotify-WW','spotify');
							
							
					}catch(err){
						console.log('ECHONEST DYNAMIC getNextsong() catch block error message: '+err.message);
						getNextSong1();
					}
							
					
					if ($.inArray(echonestTrackId, songsAlreadyUsed) > -1) {
						console.log('Song bereits verwendet');		
						banSongFeedBack(echonestTrackId);
					
					} else {
						songsAlreadyUsed.push(echonestTrackId);
								
						console.log('getNextSong1() replaced response track id: '+ replacedTrackId);

						if (noSpotifyPlaylistSongs) {
							console.log('start checking if track is in a spotifyplaylist');
							
							if ($.inArray(id,arrayOfTracksInSpotifyPlaylists) > -1) {
								console.log('DETECTED a song already in your playlist and noSpotifyPlaylistSongs was set to:'+ noSpotifyPlaylistSongs);
								banSongFeedBack(echonestTrackId);
							
							} else {
								if(!isInfoSet){
									trackCoverScript.setInfo(getInfo());
									isInfoSet = true;
									console.log("---informations pulled");
								}
								trackCoverScript.getTrackCover(replacedTrackId);
									
								arrayArtistIdsForTermsQuery.push(echonestArtistId);
								banSongFeedBack(echonestTrackId);
							}
						
						} else {
							if(!isInfoSet){
								trackCoverScript.setInfo(getInfo());
								isInfoSet = true;
							}
							trackCoverScript.getTrackCover(replacedTrackId);
									
							arrayArtistIdsForTermsQuery.push(echonestArtistId);
							banSongFeedBack(echonestTrackId);
						}

					}

				} else {
					info("trouble getting results");
				}
			}).fail(function( jqxhr, textStatus, error ) {
				var err = textStatus + ", " + error;
				console.log( "ECHONEST DYNAMIC getNextSong1() Request Failed: " + err );
				errorHandlingforEchonestCalls(jqxhr, textStatus, error);
						
			});

}


/*function setTagCloudResetDueToSimialrityChangeIsNeededToFalse1(){
	tagCloudResetDueToSimialrityChangeIsNeeded = false;
}*/

/**
 * Get the Artist terms for the current artists
 */
function getArtistsTerms() {

	console.log('ECHONEST DYNAMIC getArtistsTerms() was called');
	console.log('ECHONEST DYNAMIC NUMBER OF ARTISTS TO GET TERMS FOR: '+ arrayArtistIdsForTermsQuery.length);

	var readyToSetTagCloudArray = false;
	var counter = arrayArtistIdsForTermsQuery.length;
	var artistTermsObjectArray = new Array();
	var styleTermObjectsForTagCloud = new Array();

	$("#tagCloud").tagCloud(new Array());
	$("#tagCloud").empty();

	arrayArtistIdsForTermsQuery.forEach(function(entry) {

		var artistTermsObject = {};
		artistTermsObject.id = entry;
		artistTermsObject.termAndWeightObjectsArray = new Array();

		var randomNumber = Math.floor(Math.random() * 100);
		var url1 = 'http://developer.echonest.com/api/v4/artist/terms?api_key='
			+ echonestApiKey + '&format=json&_=' + randomNumber;

		$.getJSON(
				url1,
				{'id' : entry},
				function(dataGenre) {
					if (checkResponse(dataGenre)) {
						counter = counter - 1;
						
						for ( var i = 0; i < dataGenre.response.terms.length; i++) {

							var name = dataGenre.response.terms[i].name;
							var weight = dataGenre.response.terms[i].weight
							
							var termAndWeight = {
									tag : name,
									count : weight
							};

							artistTermsObject.termAndWeightObjectsArray.push(termAndWeight);

						}//end for loop

						artistTermsObjectArray.push(artistTermsObject);

						console.log('ECHONEST DYNAMIC getArtistsTerms() ARTIST TERMS OBJECT:  '
								+ JSON.stringify(artistTermsObject));
						
						if (counter == 0) {
							readyToSetTagCloudArray = true
						};	
						
						if (readyToSetTagCloudArray) {

							var styleTermNamesArray = new Array();

							artistTermsObjectArray.forEach(function(entry1) {
								
								entry1.termAndWeightObjectsArray.forEach(function(entry2) {
									var name = entry2.tag;
									if ($.inArray(name,styleTermNamesArray) == -1) {
										
										styleTermNamesArray.push(name);
											styleTermObjectsForTagCloud.push(entry2);
											
									} else {
										for ( var i = 0; i < styleTermObjectsForTagCloud.length; i++) {
											if (styleTermObjectsForTagCloud[i].tag == entry2.tag) {
																				
												styleTermObjectsForTagCloud[i].count = styleTermObjectsForTagCloud[i].count+ entry2.count;
												break;
											}//end if
										}//end for
											
									}//end else

								});//end foreach
							});//end foreach

							console.log('ECHONESST DYNAMIC STYLE TERM OBJET ARRAY FOR TAGCLOUD: '
									+ JSON.stringify(styleTermObjectsForTagCloud));

							$("#tagCloud").tagCloud(styleTermObjectsForTagCloud);
							
							arrayArtistIdsForTermsQuery = new Array();
						
						}//end if

					}//end if checkresponse
				}) .fail(function( jqxhr, textStatus, error ) {
					var err = textStatus + ", " + error;
					console.log( "ECHONEST DYNAMIC getArtistTerms() Request Failed: " + err );
					errorHandlingforEchonestCalls(jqxhr, textStatus, error);
									
				});//end function 

			});// end arrayArtistIdsForTermsQuery foreach
}

/**
 * Error handling for echonest calls, handles "Too many requests" errors.
 * @param jqxhr
 * @param textStatus
 * @param error
 */
function errorHandlingforEchonestCalls(jqxhr, textStatus, error ){
	console.log('ECHONEST DYNAMIC errorHandlingforEchonestCalls() was called');
	console.log('ECHONEST DYNAMIC errorHandlingforEchonestCalls() jqxhr: '+JSON.stringify(jqxhr));
	console.log('ECHONEST DYNAMIC errorHandlingforEchonestCalls() textStatus: '+textStatus);
	console.log('ECHONEST DYNAMIC errorHandlingforEchonestCalls() error: '+ error);
	
	//if too many requests show message to user an continue after x seconds
	if(error == 'Too Many Requests'){
		console.log('ECHONEST DYNAMIC errorHandlingforEchonestCalls() TOO MANY REQUESTS ERROR');
		
		alert(error+'\nThis app is limited to 120 echonest server calls per Minute.\n Wait a few seconds and then click OK to continue.');

		getNextSong1();	
	
	}
	
}


function banSongFeedBack(echnonestTrackId) {

	var randomNumber = Math.floor(Math.random() * 100);
	var skipUrl = 'http://developer.echonest.com/api/v4/playlist/dynamic/feedback?session_id='
			+ session_id + '&_=' + randomNumber;
	var args = {
		api_key : echonestApiKey,
		format : 'json',
		ban_song : echnonestTrackId,

	}
	
	$.getJSON(
			skipUrl,
			args,
			function(data) {
				if (checkResponse(data)) {

					var continueLoop = trackCoverScript.checkLoopContinue();
							
					if (continueLoop) {
						getNextSong1();
					}

					if (!continueLoop) {
						isInfoSet = false;
						enableGUI();
						$('#throbberInfo').hide();
						throbber.hide();
						
						throbberTagCloud.hide();
						console.log('ECHONEST DYNAMIC SIZE OF ARRAY OF USED SONGS AT THE END OF THE LOOP: '
												+ songsAlreadyUsed.length);

						trackCoverScript.setLoopContinueToTrue();
						getArtistsTerms();
					}

				} else {
					info("trouble getting results");
				}
			}).fail(function( jqxhr, textStatus, error ) {
				var err = textStatus + ", " + error;
				console.log( "ECHONEST DYNAMIC banSongFeedBack() Request Failed: " + err );
				errorHandlingforEchonestCalls(jqxhr, textStatus, error );
				
			});
}

/**
 * Gets the banned songs and prints them to the console
 */
function getBanedSongsInfo() {
	console.log('getBanedSongsInfo() was called');

	var randomNumber = Math.floor(Math.random() * 100);
	var infoUrl = 'http://developer.echonest.com/api/v4/playlist/dynamic/info?api_key='
			+ echonestApiKey
			+ '&session_id='
			+ session_id
			+ '&_='
			+ randomNumber;
	
	$.getJSON(infoUrl, {}, function(data) {
		if (checkResponse(data)) {

			for ( var i = 0; i < data.response.banned_song_ids.length; i++) {

				console.log('Banned Song Number ' + i + ' with ID: '
						+ data.response.banned_song_ids[i]);
			}

		} else {
			info("trouble getting results");
		}
	});
}

/**
 * Gets the banned artists and prints them to the console.
 */
function getBanedArtistInfo() {
	console.log('getBanedArtistInfo() was called');

	var randomNumber = Math.floor(Math.random() * 100);
	var infoUrl = 'http://developer.echonest.com/api/v4/playlist/dynamic/info?api_key='
			+ echonestApiKey
			+ '&session_id='
			+ session_id
			+ '&_='
			+ randomNumber;
	
	$.getJSON(infoUrl, {}, function(data) {
		if (checkResponse(data)) {

			for ( var i = 0; i < data.response.banned_artist_ids.length; i++) {

				console.log('Banned Artist Number ' + i + ' with ID: '
						+ data.response.banned_artist_ids[i]);
			}

		} else {
			info("trouble getting results");
		}
	});
}

/**
 * Gets the info for the playlist and the given infostring and prints to the console
 * @param infoString
 */
function getPlaylistInfo(infoString) {

	var randomNumber = Math.floor(Math.random() * 100);
	var infoUrl = 'http://developer.echonest.com/api/v4/playlist/dynamic/info?api_key='
			+ echonestApiKey
			+ '&session_id='
			+ session_id
			+ '&_='
			+ randomNumber;
	
	$.getJSON(
			infoUrl,
			{},
			function(data) {
				if (checkResponse(data)) {

					if (infoString == 'adventurousness') {
						console.log(' ECHONEST DYNAMIC Playlist Info adventurousness was set to: '
									+ JSON.stringify(data.response.options.adventurousness));
					}
							
					if(infoString == 'artistVariety'){
						console.log(' ECHONEST DYNAMIC Playlist Info artist variety was set to: '
								+ JSON.stringify(data.response.options.variety));
					}
							
					if(infoString == 'style'){
						console.log(' ECHONEST DYNAMIC Playlist Info currently used style terms: '
								+ JSON.stringify(data.response.seeds.descriptions));
					}
							
					if(infoString == 'all'){
						console.log(' ECHONEST DYNAMIC Playlist Info All Info: '
								+ JSON.stringify(data.response));
					}
							
					if(infoString == 'type'){
						console.log(' ECHONEST DYNAMIC Playlist Info playlist type: '
								+ JSON.stringify(data.response.options.playlist_type));
					}
							
					if(infoString == 'genre'){
						console.log(' ECHONEST DYNAMIC Playlist Info playlist genre: '
								+ JSON.stringify(data.response.seeds.genres));
					}
							
					if(infoString == 'constraints'){
						console.log(' ECHONEST DYNAMIC playlist Info Constraints: '
								+ JSON.stringify(data.response.constraints));
					}
							
				} else {
					info("trouble getting results");
				}
			});
}

/**
 * Reset the sliders and GUI elements to the initial state
 */
function resetSliders(){
	
	console.log("---resetting sliders!");
	
	$("#slider-songHot").slider( "value", 0 );
	$("#slider-songHot").slider( "option", "disabled", true );
	
	$("#slider-hot").slider( "value", 0 );
	$("#slider-hot").slider( "option", "disabled", true );
	$("#slider-pop").slider( "value", 0 );
	$("#slider-pop").slider( "option", "disabled", true );
	
	$("#artistVarietySlider").slider( "value", 50 );
	
	$('.yearInput').val('off');
	
	$("#excludeSeedArtistCheckBox").prop('checked', false);
	$("#excludeSpotifyPlaylistSongsCheckBox").prop('checked', false);
	


	console.log("---sliders resetted!");
}

/**
 * Restarts the session with the current settings to set the artist year settings.
 */
function restartSessionWithCurrentGuiState1(){
    
	throbber.show();
	throbberTagCloud.show();
	$('#throbberInfo').show();
	disableGUI();
	
    var randomNumber = Math.floor(Math.random() * 100);

    var url = 'http://developer.echonest.com/api/v4/playlist/dynamic/restart?&_='
                + randomNumber;
    
    var args = {
                session_id : session_id,
                api_key : echonestApiKey,
                format : 'json',
                limit : true,
       			bucket : [ 'song_hotttnesss', 'artist_familiarity',
    					'artist_hotttnesss', 'tracks', 'id:spotify-WW' ]
                
    };
    
    //check which similiarity mode is shown on the GUI
    if( $('#artistRadiobtn').prop('checked')){
          args.type ='artist-radio';
          args.artist_id = seedArtistIdforEchonestCalls;

      	$("#throbberInfo").text(
      			'Downloading Songs that are played by artists  similar to '
      					+ artistName);
    };
    
    if( $('#songRadiobtn').prop('checked')){
   		var replacedSongID= song_id.replace('spotify', 'spotify-WW');
    	 args.type ='song-radio';
    	 args.song_id =replacedSongID;
    		$("#throbberInfo").text(
    				'Downloading songs that are similar to ' + '"'
    						+ trackName + '" by ' + artistName);
    };
    
    if($('#genreRadiobtn').prop('checked')){
	   args.type ='genre-radio';
	   args.genre = selectedgenre;
		$("#throbberInfo").text(
				'Downloading songs that represent the genre '
						+ selectedgenre);
    };
    
    if($('#playlistRadiobtn').prop('checked')){
    	args.type='catalog-radio';
    	args.seed_catalog = currentlyUsedTasteProfileObject.tasteProfileID
    	
    	$("#throbberInfo").text(
    			'Downloading songs that are simliar to your \"'
    					+ currentlyUsedTasteProfileObject.name
    					+ '\" Spotify-playlist');
    };
    
    
    
    
    if(currentArtistStartYearBefore != 'off'){
    	args.artist_start_year_before = currentArtistStartYearBefore;	
    };
    
    if(currentArtistStartYearAfter != 'off'){
    	args.artist_start_year_after = currentArtistStartYearAfter;
    };
    
    if(currentArtistEndYearBefore != 'off'){
    	args.artist_end_year_before =  currentArtistEndYearBefore;
    };
    
    if(currentArtistEndYearAfter != 'off'){
    	args.artist_end_year_after = currentArtistEndYearAfter;
    };
    
    $.getJSON(url, args, function(data) {
          if (checkResponse(data)) {

                console.log('ECHONEST DYNAMIC response Data RESTART:'+JSON.stringify(data));
                steeringAfterReset();

          } else {
                info("trouble getting results");
          }
    });
}



function steeringAfterReset(){

	var randomNumber = Math.floor(Math.random() * 100);

	
	var url = 'http://developer.echonest.com/api/v4/playlist/dynamic/steer?&_='
			+ randomNumber;

	var args = {
		session_id : session_id,
		api_key : echonestApiKey,
		format : 'json'
		
	};
	
	
	//Steetering for Trendiness and Popularity Values
	 //0.0 value means slider is set to off position
	if(currentArtistPopularityValue != 0.0){
		args.target_artist_familiarity = currentArtistPopularityValue;
	}
	
	if(currentArtistHotnesValue != 0.0){
		args.target_artist_hotttnesss = currentArtistHotnesValue;
	}
	
	if(currentSongHotnesValue != 0.0){
		args.target_song_hotttnesss = currentSongHotnesValue;
	}
	
	//steering for artist variety
	var currentArtistVarietyValue = $("#artistVarietySlider").slider(
	"value") / 100;
	args.variety=currentArtistVarietyValue;
	
	//steering for adventouressness
	if($("#adventurousnessSlider").is(':visible')){
		currentAdventurousnessValue= $("#adventurousnessSlider").slider("value");
		args.adventurousness =currentAdventurousnessValue / 100;
	}
	
	//steering for style terms
	var styleString = '';
	if(currentlySetTagCloudTermsArray.length != 0 ){
	for(var i = 0; i< currentlySetTagCloudTermsArray.length; i++){
		if(i==0){
			styleString = currentlySetTagCloudTermsArray[i];
		}else{
		styleString = styleString + ', '+currentlySetTagCloudTermsArray[i];
		}
		
	}
	console.log('ECHONEST DYNAMIC setTermFilter1()  styleString to set: '+styleString);
	args.style = styleString;	
	}

	$.getJSON(url, args,

		function(data) {
			if (checkResponse(data)) {
				
				console.log('ECHONEST DYNAMIC steeringAfterReset was sucessfull');
	         	getPlaylistInfo('constraints');
	         	getNextSong1();
	
			} else {
				info("trouble getting results");
			}
		});
	
	
}

/**
 * Show info on Gui
 * @param s
 */
function info(s) {
	var info = document.getElementById('info');
	info.innerHTML = (s);

}

/**
 * turns the echonest ID to the Spotify ID
 * @param song
 * @returns
 */
function getSpotifyID(song) {
	console.log('getSpotifyID():' + song.tracks[0].id);
	var uri = song.tracks[0].id;
	return uri.replace('spotify-WW', 'spotify');
}

/**
 * Checks the result data returning from the echonest request
 * @param data
 * @returns {Boolean}
 */
function checkResponse(data) {
	if (data.response) {
		if (data.response.status.code != 0) {
			console.log('ECHONEST DYNAMIC checkResponse(): '+JSON.stringify(data.response));
		} else {
			return true;
		}
	} else {
		error("Unexpected response from server");
	}
	return false;
}

/**
 * Collects the current settings and returns them in a map
 */
function getInfo(){
	var info={
		"artist": artistName,
		"track" : trackName, 
		"genre" : selectedgenre, 
		"playlist": selectedUserPlaylistName, 
		"artistmode": similarityModeIsArtist, 
		"songmode": similarityModeIsSong,
		"genremode": similarityModeIsGenre,
		"playlistmode": similarityModeIsPlaylist,
		"excludeplaylist": noSpotifyPlaylistSongs, 
		"excludeartist": (banedSeedArtistId!=null), 
		"songtrendiness": songTrendiness, 
		"artisttrendiness": artistTrendiness, 
		"artistpopularity": artistPopularity, 
		"artistvariety": artistVariety, 
		"adventurousness": currentAdventurousnessValue,
		"artiststartyearbefore": currentArtistStartYearBefore,
		"artiststartyearafter": currentArtistStartYearAfter,
		"artistendyearbefore": currentArtistEndYearBefore,
		"artistendyearafter": currentArtistEndYearAfter, 
		"artistterms": currentlySetTagCloudTermsArray,
		"similarityInfoString": currentSimilarityInfoString,
	};
	return info;
}

