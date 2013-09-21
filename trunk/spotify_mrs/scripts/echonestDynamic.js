

require([
	  
  '$api/models',
  '$views/throbber#Throbber',
  'scripts/jPagesTrackCover',
  'scripts/customplaylist',
  'scripts/apiKey',
  //'scripts/setupNoveltyCheckBoxes',

  ], function(models, throbber, trackCover, customplaylist, apiKey/*, playlistInformation*/) {
 
	  'use strict';

  
  var startNewSession = function(){
	 // console.log("New session is started");
	  startNewSession1(models, throbber, trackCover, customplaylist, apiKey/*, playlistInformation*/);
	 
  };
  
  
  var getNextSong = function(){
	 // console.log("New session is started");
	  
	
	  getNextSong1( );
	 
  };
  
/*  var getNextXXSong = function(){
		 // console.log("New session is started");
		  getNextXXSong1( );
		 
	  };*/
	  
	var changeArtistFamiliarity = function(artistFamilarityLevel){
		changeArtistFamiliarity1(artistFamilarityLevel);
	};  
	
	
	var changeArtistHotness = function(artistHotnessLevel){
		changeArtistHotness1(artistHotnessLevel);
	}; 
	
	
	var changeSongHotness = function(songHotnessLevel){
		changeSongHotness1(songHotnessLevel);
	};
	
	var changeToGenreSimilarity = function(genreName){
		changeToGenreSimilarity1(genreName);
	};
	
	var changeToPlaylistSimilarity = function(tasteProfileID){
		changeToPlaylistSimilarity1(tasteProfileID);
	};
	
	var changeArtistVariety = function(){
		changeArtistVariety1();
	};
	
	var changeAdventurousness = function(){
		changeAdventurousness1();
	};
	
	var setTermFilter = function(term){
		setTermFilter1(term);
	};
	
	var changeToSongSimilarity = function(){
		changeToSongSimilarity1();
	};
	
	var changeToArtistSimilarity = function(){
		changeToArtistSimilarity1();
	};
	
	var changeSeedSongSimilarity = function(){
		changeSeedSongSimilarity1( );
	};
	
	var changeSeedArtistSimilarity = function(){
		changeSeedArtistSimilarity1();
	};
	
	

	
	
	var setBanedArtistId = function(setValue){
		setBanedArtistId1(setValue);
	};
	

	var setNoSpotifyPlaylistSongs = function(setValue){
		setNoSpotifyPlaylistSongs1(setValue);
	};
	
	 var setArrayOfAllSongs = function(array1){
		 setArrayOfAllSongs1(array1);
	 }
  
  //exports.getNextXXSong =getNextXXSong;
  exports.getNextSong=getNextSong;
  exports.startNewSession = startNewSession;
  exports.changeArtistFamiliarity =  changeArtistFamiliarity;
  exports.changeArtistHotness = changeArtistHotness;
  exports.changeSongHotness =changeSongHotness;
  exports.changeToGenreSimilarity =  changeToGenreSimilarity;
  exports.changeToPlaylistSimilarity = changeToPlaylistSimilarity;
  exports.changeArtistVariety = changeArtistVariety;
  exports.changeAdventurousness= changeAdventurousness;
  exports.setTermFilter = setTermFilter;
  exports.changeToSongSimilarity = changeToSongSimilarity;
  exports.changeToArtistSimilarity = changeToArtistSimilarity;
  exports.changeSeedSongSimilarity = changeSeedSongSimilarity;
  exports.changeSeedArtistSimilarity = changeSeedArtistSimilarity;

  exports.setBanedArtistId = setBanedArtistId;
  exports.setNoSpotifyPlaylistSongs = setNoSpotifyPlaylistSongs;
  exports.setArrayOfAllSongs = setArrayOfAllSongs;



});//end of require()



var echonestApiKey = null;

var session_id ='';

var seedArtistSpotifyId= '';

var song_id ='';

var artistName = '';

var trackName = '';


//var numberOfSongs = 10;

var songsAlreadyUsed = new Array();

var styleTermObjects = new Array();
var styleTermNames = new Array();

var continueFetchSongsLoop = true;

var throbber= null;

var trackCoverScript = null;

var customPlaylistScript = null;

var models = null;

var trackCurrentlyPlaying = null;

var seedArtistIdforEchonestCalls = null;

var banedSeedArtistId = null;

var noSpotifyPlaylistSongs = false;

//var playlistInformationScript = null;

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

function setArrayOfAllSongs1(array1){
	arrayOfTracksInSpotifyPlaylists = array1;
}

function changeToPlaylistSimilarity1(tasteProfileIDandNameObject){
	
console.log('changeToPlaylistSimilarity1() was called with tasteProfileID: '+tasteProfileIDandNameObject.tasteProfileID);
	
similarityModeIsGenre = false;
similarityModeIsArtist = false;
similarityModeIsSong = false;
similarityModeIsPlaylist = true;
	
	
	var randomNumber =  Math.floor(Math.random()*100);
	var genreUrl = 'http://developer.echonest.com/api/v4/playlist/dynamic/create?api_key='+echonestApiKey+'&type=catalog-radio&bucket=id:spotify-WW&bucket=tracks&callback=?&_='+randomNumber;
	$.getJSON(genreUrl, 
    		{// 'artist_id':replacedArtistID ,
    	//'track_id': replacedSongID, 
    	'format':'jsonp',
    	'limit':true,
    	'seed_catalog':tasteProfileIDandNameObject.tasteProfileID
    	//'type':'catalog-radio'
    	
        
    	//'max_song_hotttnesss':maxSongHotness,
    	// 'min_song_hotttnesss':minSongHotness 
        //'artist_max_familiarity': maxPopularity, 'artist_min_familiarity': minPopularity
            //bucket : ['id:spotify-WW', 'tracks'],
            },
            function(data) {
        if (checkResponse(data)) {
            
        console.log('Changed to Similarity Radio: '+tasteProfileIDandNameObject.tasteProfileID);
        //console.log('CHANGE TO PLAYLIST SIMILARITY DATA: '+JSON.stringify(data));
        
        $('#playlistSimilarityInfo').text('Now songs are recommended because they are simliar to your \"'+tasteProfileIDandNameObject.name +'\" Spotify-playlist');
       // $("#accordion" ).accordion( "refresh" );
       
        info("");
       // $("#albumCoverContainer").empty();
        styleTermNames = new Array();
        styleTermObjects = new Array();
        $("#tagCloud").tagCloud(styleTermObjects); 
         
        session_id = data.response.session_id;
        
        console.log("New session ID  is used: "+session_id);
       
        getNextSong1();
        
        
        } else {
            info("trouble getting results");
        }
    });
	
	
} 

function setNoSpotifyPlaylistSongs1(setValue){
	noSpotifyPlaylistSongs = setValue;
	console.log('echonestDynamic noSpotifyPlaylistSongs was set to: '+ noSpotifyPlaylistSongs);
}

function setBanedArtistId1(setValue){
	console.log('echonestDynamic setBanedArtistId1(setValue) was called');
	if(setValue ){
		banedSeedArtistId =seedArtistSpotifyId;
		trackCoverScript.setBannedSeedArtist(banedSeedArtistId);
		console.log(' banedSeedArtistId was set to : '+banedSeedArtistId);
	}else{
		banedSeedArtistId = null;
		trackCoverScript.setBannedSeedArtist(null);
		console.log(' banedSeedArtistId was set to: '+banedSeedArtistId);
	}
	
}



function setTermFilter1(term){
	console.log('echonestDynamic setTermFilter1() was called with term: '+term);
	
var randomNumber =  Math.floor(Math.random()*100);
    
    
    //var artistIdsForPopularity = new Array();
    var url = 'http://developer.echonest.com/api/v4/playlist/dynamic/steer?api_key='+echonestApiKey+'&callback=?&session_id='+session_id+'&_='+randomNumber;
    	

    //getJSON Syntax: URL(wohin geht die Anfrage), DATA (Objekt oder String der mit der anfrage geschickt wird), CALLBACK (Funktion, die bei erfolgreicher Anfrage ausgeführt wird)
    $.getJSON(url, 
    		{// 'artist_id':replacedArtistID ,
    	//'track_id': replacedSongID, 
    	'format':'jsonp',
    	//limit : true,
        //'type':'artist-radio', 
    	//'max_artist_hotttnesss':maxHotness,
    	 'style': term
        //'artist_max_familiarity': maxPopularity, 'artist_min_familiarity': minPopularity
            //bucket : ['id:spotify-WW', 'tracks'],
            },
            function(data) {
        if (checkResponse(data)) {
            
        	//console.log('Changed Hotness Values');
        	getPlaylistInfo();
           
       
        } else {
            info("trouble getting results");
        }
    });
	
}


function changeAdventurousness1(){
	console.log('EchonestDynamic changeAdventurousness() was called');
	
	var adventurousnessSliderValue = $( "#adventurousnessSlider" ).slider( "value" )/100;
	console.log('adventurousnessSliderValue:'+adventurousnessSliderValue);
    var randomNumber =  Math.floor(Math.random()*100);
    
    
    //var artistIdsForPopularity = new Array();
    var url = 'http://developer.echonest.com/api/v4/playlist/dynamic/steer?session_id='+session_id+'&_='+randomNumber;
    var args ={
			api_key : echonestApiKey,
			format: 'json',
			adventurousness :adventurousnessSliderValue 
			
			} 	

    //getJSON Syntax: URL(wohin geht die Anfrage), DATA (Objekt oder String der mit der anfrage geschickt wird), CALLBACK (Funktion, die bei erfolgreicher Anfrage ausgeführt wird)
    $.getJSON(url, args,
            function(data) {
        if (checkResponse(data)) {
            
        	//console.log('Changed Hotness Values');
        	getPlaylistInfo();
           
       
        } else {
            info("trouble getting results");
        }
    });
	
}

function changeArtistVariety1(){
	console.log('EchonestDynamic changeArtistVariety() was called');
	
	//slider Value
    
	var changeArtistVarietySliderValue = $( "#artistVarietySlider" ).slider( "value" )/100;
	console.log('changeArtistVarietySliderValue:'+changeArtistVarietySliderValue);
    var randomNumber =  Math.floor(Math.random()*100);
    
    
    //var artistIdsForPopularity = new Array();
    var url = 'http://developer.echonest.com/api/v4/playlist/dynamic/steer?session_id='+session_id+'&_='+randomNumber;
    var  args ={
    		api_key : echonestApiKey,
    		format: 'json',
    		variety : changeArtistVarietySliderValue 
    		
    		
    };	

    //getJSON Syntax: URL(wohin geht die Anfrage), DATA (Objekt oder String der mit der anfrage geschickt wird), CALLBACK (Funktion, die bei erfolgreicher Anfrage ausgeführt wird)
    $.getJSON(url, 
    		args,
            function(data) {
        if (checkResponse(data)) {
            
        	//console.log('Changed Hotness Values');
        	getPlaylistInfo();
           
       
        } else {
            info("trouble getting results");
        }
    });
}


function  changeArtistFamiliarity1(artistFamilarityLevel){
	console.log("changeArtistFamiliarity() was called with artistPopularityLevel: "+artistFamilarityLevel);
	
		getConstraintsInfo();
	
		var minFamilarity = 0.0;
		var maxFamilarity = 1.0;
		
	
	if(similarityModeIsGenre){
		minFamilarity = lowerArtistFamilarityBorderForGenreSimilarity;
		maxFamilarity = upperArtistFamilarityBorderForGenreSimilarity;
		var range = upperArtistFamilarityBorderForGenreSimilarity - lowerArtistFamilarityBorderForGenreSimilarity;
		var rangeStep = range/5;
		
		switch (artistFamilarityLevel)
		{
		case 0:
			minFamilarity = 0.0;
			
		  break;
		case 1:
			minFamilarity = lowerArtistFamilarityBorderForGenreSimilarity;
			
		  break;
		case 2:
			minFamilarity =  lowerArtistFamilarityBorderForGenreSimilarity + rangeStep;
			
		  break;
		case 3:
			minFamilarity = lowerArtistFamilarityBorderForGenreSimilarity + 2*rangeStep;
			
		  break;
		case 4:
			minFamilarity = lowerArtistFamilarityBorderForGenreSimilarity + 3*rangeStep;
			
		  break;
		case 5:
			minFamilarity = upperArtistFamilarityBorderForGenreSimilarity-rangeStep;
			
		  break;
		
		} 
		}  
		   
			console.log('maxArtistFamilarity changeArtistFamilarity1(): '+ maxFamilarity);
		    console.log('minArtistFamilarity changeArtistFamilarity1(): '+minFamilarity);
		   
	
	   
		
	    
	    
	
	    
	    
	    var randomNumber =  Math.floor(Math.random()*100);
	    
	    
	   // var artistIdsForPopularity = new Array();
	    var url = 'http://developer.echonest.com/api/v4/playlist/dynamic/steer?&_='+randomNumber;
	    
	    var args = {
				session_id: session_id,
				 api_key: echonestApiKey,
			     format:'json',
			     min_artist_familiarity : minFamilarity,
			     max_artist_familiarity : maxFamilarity
			     	
		};

	    //getJSON Syntax: URL(wohin geht die Anfrage), DATA (Objekt oder String der mit der anfrage geschickt wird), CALLBACK (Funktion, die bei erfolgreicher Anfrage ausgeführt wird)
	    $.getJSON(url, args,
	    		
	            function(data) {
	        if (checkResponse(data)) {
	            
	        	//console.log('Changed Popularity Values');
	        	getConstraintsInfo();
	        	getNextSong1();
	       
	        } else {
	            info("trouble getting results");
	        }
	    });
	
	
	
}


function  changeArtistHotness1(artistHotnessLevel){
	console.log("changeArtistHotness() was called with artistHotnessLevel: "+artistHotnessLevel);
	
		getConstraintsInfo();
	
		var minHotness = null;
		var maxHotness = null;	
		
	
	if(similarityModeIsArtist){
		switch (artistHotnessLevel)
		{
		case 0:
			minHotness = 0.0;
			maxHotness = 0.3;
		  break;
		case 1:
			minHotness = 0.3;
			maxHotness = 0.4;
		  break;
		case 2:
			minHotness = 0.4;
			maxHotness = 0.5;
		  break;
		case 3:
			minHotness = 0.5;
			maxHotness = 0.6;
		  break;
		case 4:
			minHotness = 0.6;
			maxHotness =0.8;
		  break;
		case 5:
			minHotness = 0.8;
			maxHotness = 1;
		  break;
		
		} 
	} 
	
	
	if(similarityModeIsSong){
		switch (artistHotnessLevel)
		{
		case 0:
			minHotness = 0.0;
			maxHotness = 0.3;
		  break;
		case 1:
			minHotness = 0.3;
			maxHotness = 0.4;
		  break;
		case 2:
			minHotness = 0.4;
			maxHotness = 0.5;
		  break;
		case 3:
			minHotness = 0.5;
			maxHotness = 0.6;
		  break;
		case 4:
			minHotness = 0.6;
			maxHotness =0.8;
		  break;
		case 5:
			minHotness = 0.8;
			maxHotness = 1;
		  break;
		
		} 
	}
	
	if(similarityModeIsPlaylist){
		switch (artistHotnessLevel)
		{
		case 0:
			minHotness = 0.0;
			maxHotness = 0.3;
		  break;
		case 1:
			minHotness = 0.3;
			maxHotness = 0.4;
		  break;
		case 2:
			minHotness = 0.4;
			maxHotness = 0.5;
		  break;
		case 3:
			minHotness = 0.5;
			maxHotness = 0.6;
		  break;
		case 4:
			minHotness = 0.6;
			maxHotness =0.8;
		  break;
		case 5:
			minHotness = 0.8;
			maxHotness = 1;
		  break;
		
		} 
	} 
		
		
	if(similarityModeIsGenre){
	minHotness = 0;// lowerArtistHotnessBorderForGenreSimilarity;
	maxHotness = upperArtistHotnessBorderForGenreSimilarity;
	
	//var range = upperArtistHotnessBorderForGenreSimilarity - lowerArtistHotnessBorderForGenreSimilarity;
	//var rangeStep = range/5;
	
	/*switch (artistHotnessLevel)
	{
	case 0:
		minHotness = 0.0;
		
	  break;
	case 1:
		//minHotness = lowerArtistHotnessBorderForGenreSimilarity;
		minHotness = mittelwertArtistHotnesGenreSimliarity-varianzArtistHotnesGenreSimliarity
	  break;
	case 2:
		//minHotness =  lowerArtistHotnessBorderForGenreSimilarity + rangeStep;
		minHotness = mittelwertArtistHotnesGenreSimliarity-1/2*varianzArtistHotnesGenreSimliarity
	  break;
	case 3:
		//minHotness = lowerArtistHotnessBorderForGenreSimilarity + 2*rangeStep;
		minHotness = mittelwertArtistHotnesGenreSimliarity
	  break;
	case 4:
		//minHotness = lowerArtistHotnessBorderForGenreSimilarity + 3*rangeStep;
		minHotness = mittelwertArtistHotnesGenreSimliarity+1/2*varianzArtistHotnesGenreSimliarity
	  break;
	case 5:
		//minHotness = upperArtistHotnessBorderForGenreSimilarity-rangeStep;
		minHotness = mittelwertArtistHotnesGenreSimliarity+varianzArtistHotnesGenreSimliarity
	  break;
	
	} */
	
	//Variante mit Bereichen
	switch (artistHotnessLevel)
	{
	case 0:
		minHotness = 0.0;
		maxHotness = mittelwertArtistHotnesGenreSimliarity-varianzArtistHotnesGenreSimliarity;
	  break;
	case 1:
		minHotness = mittelwertArtistHotnesGenreSimliarity-varianzArtistHotnesGenreSimliarity;
		maxHotness = mittelwertArtistHotnesGenreSimliarity-1/2*varianzArtistHotnesGenreSimliarity;
	  break;
	case 2:
		minHotness = mittelwertArtistHotnesGenreSimliarity-1/2*varianzArtistHotnesGenreSimliarity;
		maxHotness = mittelwertArtistHotnesGenreSimliarity;
	  break;
	case 3:
		minHotness = mittelwertArtistHotnesGenreSimliarity;
		maxHotness = mittelwertArtistHotnesGenreSimliarity+1/2*varianzArtistHotnesGenreSimliarity;
	  break;
	case 4:
		minHotness = mittelwertArtistHotnesGenreSimliarity+1/2*varianzArtistHotnesGenreSimliarity;
		maxHotness = mittelwertArtistHotnesGenreSimliarity+varianzArtistHotnesGenreSimliarity;
	  break;
	case 5:
		minHotness = mittelwertArtistHotnesGenreSimliarity+varianzArtistHotnesGenreSimliarity
		maxHotness = upperArtistHotnessBorderForGenreSimilarity;
	  break;
	
	} 
	
	
	
	}  
	   
		console.log('maxArtistHotness changeArtistHotness1(): '+maxHotness);
	    console.log('minArtistHotness changeArtistHotness1(): '+minHotness);
	   
	    
	    var randomNumber =  Math.floor(Math.random()*100);
	    
	    
	   
	    var url = 'http://developer.echonest.com/api/v4/playlist/dynamic/steer?&_='+randomNumber;
		var args = {
				session_id: session_id,
				 api_key: echonestApiKey,
			     format:'json',
			     max_artist_hotttnesss :maxHotness,
		    	 min_artist_hotttnesss :minHotness,
		    	// max_artist_familiarity: 0.0,
		    	 //min_artist_familiarity: 0.0
		};

	    //getJSON Syntax: URL(wohin geht die Anfrage), DATA (Objekt oder String der mit der anfrage geschickt wird), CALLBACK (Funktion, die bei erfolgreicher Anfrage ausgeführt wird)
	    $.getJSON(url, args,
	            function(data) {
	        if (checkResponse(data)) {
	            
	        	//console.log('Changed Hotness Values');
	        	getConstraintsInfo();
	        	getNextSong1();
	           
	       
	        } else {
	            info("trouble getting results");
	        }
	    });
	
	
	
}


//old function with slider rage
/*function  changeArtistHotness1(artistHotnessLevel){
	console.log("changeArtistHotness() was called");
	
		//getConstraintsInfo();
	
	   //Setzen der Werte für die Query
		var minHotness = $( "#slider-hot" ).slider( "values", 0 )/100;
		var maxHotness = $( "#slider-hot" ).slider( "values", 1 )/100;
	   
		console.log('maxArtistHotness changeArtistHotness1(): '+maxHotness);
	    console.log('minArtistHotness changeArtistHotness1(): '+minHotness);
	   
	    
	    var randomNumber =  Math.floor(Math.random()*100);
	    
	    
	    //var artistIdsForPopularity = new Array();
	    var url = 'http://developer.echonest.com/api/v4/playlist/dynamic/steer?api_key=BNV9970E1PHXZ9RQW&callback=?&session_id='+session_id+'&_='+randomNumber;
	    	

	    //getJSON Syntax: URL(wohin geht die Anfrage), DATA (Objekt oder String der mit der anfrage geschickt wird), CALLBACK (Funktion, die bei erfolgreicher Anfrage ausgeführt wird)
	    $.getJSON(url, 
	    		{// 'artist_id':replacedArtistID ,
	    	//'track_id': replacedSongID, 
	    	'format':'jsonp',
	    	//limit : true,
	        //'type':'artist-radio', 
	    	'max_artist_hotttnesss':maxHotness,
	    	 'min_artist_hotttnesss':minHotness 
	        //'artist_max_familiarity': maxPopularity, 'artist_min_familiarity': minPopularity
	            //bucket : ['id:spotify-WW', 'tracks'],
	            },
	            function(data) {
	        if (checkResponse(data)) {
	            
	        	//console.log('Changed Hotness Values');
	        	getConstraintsInfo();
	           
	       
	        } else {
	            info("trouble getting results");
	        }
	    });
	
	
	
}
*/

function  changeSongHotness1(songHotnessLevel){
	console.log("changeSongHotness() was called with songHotnessLevel: "+songHotnessLevel);
	
	var minSongHotness = 0.0;
	var maxSongHotness = 1.0;
	
	
	
	
	if(similarityModeIsGenre){
		
	minSongHotness = lowerSongHotnessBorderForGenreSimilarity;
	maxSongHotness = upperSongHotnessBorderForGenreSimilarity;
	var range = upperSongHotnessBorderForGenreSimilarity - lowerSongHotnessBorderForGenreSimilarity;
	var rangeStep = range/5;
	
	switch (songHotnessLevel)
	{
	case 0:
		minSongHotness = 0.0;
		
	  break;
	case 1:
		minSongHotness = lowerSongHotnessBorderForGenreSimilarity;
		
	  break;
	case 2:
		minSongHotness =  lowerSongHotnessBorderForGenreSimilarity + rangeStep;
		
	  break;
	case 3:
		minSongHotness = lowerSongHotnessBorderForGenreSimilarity + 2*rangeStep;
		
	  break;
	case 4:
		minSongHotness = lowerSongHotnessBorderForGenreSimilarity + 3*rangeStep;
		
	  break;
	case 5:
		minSongHotness =  upperSongHotnessBorderForGenreSimilarity-rangeStep;
		
	  break;
	
	} 
	}  
	   
		console.log('maxSongHotness changeSongHotness1(): '+maxSongHotness);
	    console.log('minSongHotness changesongHotness1(): '+minSongHotness);
	    
	    var randomNumber =  Math.floor(Math.random()*100);
	    
	    
	    
	    var url = 'http://developer.echonest.com/api/v4/playlist/dynamic/steer?&_='+randomNumber;
		var args = {
				session_id: session_id,
				 api_key: echonestApiKey,
			     format:'json',
			     max_song_hotttnesss :maxSongHotness,
		    	 min_song_hotttnesss :minSongHotness,
		    	// max_artist_familiarity: 0.0,
		    	 //min_artist_familiarity: 0.0
		};

	 

	    
	    $.getJSON(url, args,
	    		
	            function(data) {
	        if (checkResponse(data)) {
	            
	        	//console.log('Changed Hotness Values');
	        	getConstraintsInfo();
	        	getNextSong1();
	           
	       
	        } else {
	            info("trouble getting results");
	        }
	    });
	
	
	
}


function changeToGenreSimilarity1(genreName){
	console.log('changeToGenreSimilarity1() was called with genre: '+genreName);
	
	similarityModeIsGenre = true;
	similarityModeIsArtist = false;
	similarityModeIsSong = false;
	similarityModeIsPlaylist = false;
	
	//get the popularity range for a given genre
	getArtistHotnesRangeforGenre(genreName);
	getArtistFamilarityRangeforGenre(genreName);
	getSongHotnesRangeforGenre(genreName);
	
	
	
	var randomNumber =  Math.floor(Math.random()*100);
	var genreUrl = 'http://developer.echonest.com/api/v4/playlist/dynamic/create?api_key='+echonestApiKey+'&type=genre-radio&bucket=id:spotify-WW&bucket=tracks&_='+randomNumber;
	$.getJSON(genreUrl, 
    		{
    	format:'json',
    	limit : true,
    	genre :genreName
    	
            },
            function(data) {
        if (checkResponse(data)) {
            
        console.log('Changed to Genre Radio: '+genreName);
        
        $('#genreSimilarityInfo').text('Now songs are recommended because the represent the genre: ' +genreName);
       // $("#accordion" ).accordion( "refresh" );
       
        info("");
       // $("#albumCoverContainer").empty();
        styleTermNames = new Array();
        styleTermObjects = new Array();
        $("#tagCloud").tagCloud(styleTermObjects); 
         
        session_id = data.response.session_id;
        
        console.log("New session ID  is used: "+session_id);
       
        getNextSong1();
        
        
        } else {
            info("trouble getting results");
        }
    });

}


function getSongHotnesRangeforGenre(genreName){
	
	
	
	console.log('ECHONEST DYNAMIC getSongHotnesRangeforGenre(genreName) was called');
	var randomNumber =  Math.floor(Math.random()*100);
	
	var urlHotnes = 'http://developer.echonest.com/api/v4/song/search?';
	//get the lowest value
	var args = {
			 api_key: echonestApiKey,
		     format:'json',
		     bucket : ['song_hotttnesss'],
		     sort : 'song_hotttnesss-desc',
		     results: '10',
		     style: genreName
		    	
			
	}
	
	$.getJSON(urlHotnes, args,
            function(genreData) {
	  			if (checkResponse(genreData)) {
	  				
	  				//console.log('GENRE '+entry+': '+JSON.stringify(genreData));
	  				
	  				var arraySongHotnessValues = new Array();
	  				//console.log('GENRE '+entry+' Ascending');
	  				for(var i = 0; i<genreData.response.songs.length;i++){
	  					arraySongHotnessValues.push(genreData.response.songs[i].song_hotttnesss);
	  					//console.log('song hotness asc for '+genreData.response.songs[i].artist_name+': '+genreData.response.songs[i].song_hotttnesss);
	  					
	  				}
	  				upperSongHotnessBorderForGenreSimilarity = arraySongHotnessValues[0];
	  				console.log('upperSongHotnessBorderForGenreSimilarity for genre '+genreName+': '+upperSongHotnessBorderForGenreSimilarity);
	  				
	  				
	  				
	  				
	  				
	  				 
	  			}
            });
	
	//get the highest value
	var args1 = {
			 api_key: echonestApiKey,
		     format:'json',
		     bucket : ['song_hotttnesss'],
		     sort : 'song_hotttnesss-asc',
		     results: '10',
		     style: genreName
		    }
	
	$.getJSON(urlHotnes, args1,
            function(genreData) {
	  			if (checkResponse(genreData)) {
	  				
	  				//console.log('GENRE '+entry+': '+JSON.stringify(genreData));
	  				
	  				var arraySongHotnessValues = new Array();
	  				//console.log('GENRE '+entry+' Ascending');
	  				for(var i = 0; i<genreData.response.songs.length;i++){
	  					arraySongHotnessValues.push(genreData.response.songs[i].song_hotttnesss);
	  					//console.log('song hotness asc for '+genreData.response.songs[i].artist_name+': '+genreData.response.songs[i].song_hotttnesss);
	  					
	  				}
	  				lowerSongHotnessBorderForGenreSimilarity = arraySongHotnessValues[0];
	  				console.log('lowerSongHotnessBorderForGenreSimilarity for genre '+genreName+': '+lowerSongHotnessBorderForGenreSimilarity);
	  				
	  				
	  				
	  				
	  				
	  				 
	  			}
            });
	
}

function getArtistHotnesRangeforGenre(genreName){
	console.log('ECHONEST DYNAMIC getArtistHotnesRangeforGenre(genreName) was called');
	var randomNumber =  Math.floor(Math.random()*100);
	var url = 'http://developer.echonest.com/api/v4/artist/search?_='+randomNumber;
	
	//get the lowest Value of the range
	var args = {
			 api_key: echonestApiKey,
		     format:'json',
		     bucket : ['hotttnesss'],
		     sort : 'hotttnesss-asc',
		     results: '10',
		     genre: genreName
	}	
	
	$.getJSON(url, args,
            function(genreData) {
	  			if (checkResponse(genreData)) {
	  				var arrayHotnessValues = new Array();
	  				
	  				for(var i = 0; i<genreData.response.artists.length;i++){
	  					arrayHotnessValues.push(genreData.response.artists[i].hotttnesss);
	  					
	  					
	  				}
	  					
	  				//console.log('ECHONEST GENRE DATA HOTNESS ASCENDING FOR GENRE '+genreName+': '+ arrayHotnessValues);
	  				
	  				lowerArtistHotnessBorderForGenreSimilarity = arrayHotnessValues[0];
	  				console.log('lowerArtistHotnessBorderForGenreSimilarity for genre '+genreName+': '+lowerArtistHotnessBorderForGenreSimilarity);
	  				
	  				
	  				 
	  			}
            });
	
	//get the highest value of the range
	var args1 = {
			 api_key: echonestApiKey,
		     format:'json',
		     bucket : ['hotttnesss'],
		     sort : 'hotttnesss-desc',
		     results: '10',
		     genre: genreName
	}	
	
	$.getJSON(url, args1,
           function(genreData) {
	  			if (checkResponse(genreData)) {
	  				var arrayHotnessValues = new Array();
	  				
	  				for(var i = 0; i<genreData.response.artists.length;i++){
	  					arrayHotnessValues.push(genreData.response.artists[i].hotttnesss);
	  					
	  					
	  				}
	  					
	  				//console.log('ECHONEST GENRE DATA HOTNESS DESCENDING FOR GENRE '+genreName+': '+ arrayHotnessValues);
	  				upperArtistHotnessBorderForGenreSimilarity = arrayHotnessValues[0];
	  				console.log('upperArtistHotnessBorderForGenreSimilarity for genre '+genreName+': '+upperArtistHotnessBorderForGenreSimilarity);
	  				
	  				
	  				
	  				 
	  			}
           });
	
	
	
	
	//Test auf Normalverteilung 
	var args2 = {
			 api_key: echonestApiKey,
		     format:'json',
		     bucket : ['hotttnesss'],
		     //sort : 'hotttnesss-desc',
		     results: '100',
		    	genre: genreName
	}	
	
	var arrayHotnessValues = new Array();
	
	$.getJSON(url, args2,
            function(genreData) {
	  			if (checkResponse(genreData)) {
	  			
	  				//console.log('GENRE '+entry+' Descending');
	  				for(var i = 0; i<genreData.response.artists.length;i++){
	  					arrayHotnessValues.push(genreData.response.artists[i].hotttnesss);
	  					//console.log('artist hotness desc for '+genreData.response.artists[i].name+': '+genreData.response.artists[i].hotttnesss);
	  					
	  				}
	  					
	  				arrayHotnessValues.sort(function(a,b){return a-b});
	  				console.log('ECHONEST GENRE DATA REGGAE ARTIST HOTNESS : '+ arrayHotnessValues);
	  				
	  				
	  				//Mittelwert berechnen
	  				
	  				
	  				var summe = 0;
	  				
	  				for(var i =0; i<arrayHotnessValues.length;i++){
	  					summe = summe +arrayHotnessValues[i];
	  				}
	  				
	  				mittelwertArtistHotnesGenreSimliarity = summe/arrayHotnessValues.length;
	  				
	  				console.log('ECHONEST GENRE DATA ARTIST HOTNESS MITTELWERT FOR GENRE SIMILARITY: '+mittelwertArtistHotnesGenreSimliarity);
	  				
	  				//Varianz berechnen
	  				
	  				var varianzSumme= 0;
	  				for(var i =0; i<arrayHotnessValues.length;i++){
	  					varianzSumme =  varianzSumme + Math.pow(arrayHotnessValues[i]- mittelwertArtistHotnesGenreSimliarity,2);
	  				}
	  				
	  				
	  				
	  				
	  				 varianzArtistHotnesGenreSimliarity =  Math.sqrt((1/(arrayHotnessValues.length -1))*varianzSumme);
	  				
	  				
	  				console.log('ECHONEST GENRE DATA ARTIST HOTNESS VARIANZ  FOR GENRE SIMILARITY: '+varianzArtistHotnesGenreSimliarity);
	  				
	  				/*var mittelwertPlusVarianz1 = mittelwert + varianz;
	  				var mittelwertPlusVarianz2 = mittelwert + 2*varianz;
	  				var mittelwertPlusVarianz3 = mittelwert + 3*varianz;
	  				
	  				var mittelwertMinusVarianz1 = mittelwert - varianz;
	  				var mittelwertMinusVarianz2 = mittelwert - 2*varianz;
	  				var mittelwertMinusVarianz3 = mittelwert - 3*varianz;
	  				
	  				console.log('ECHONEST GENRE DATA ARTIST HOTNESS GENRE SPANNE 1 VON: '+ mittelwertMinusVarianz1+' bis '+mittelwertPlusVarianz1+' = 68% ABDECKUNG');
	  				console.log('ECHONEST GENRE DATA ARTIST HOTNESS GENRE SPANNE 2  VON: '+ mittelwertMinusVarianz2+' bis '+mittelwertPlusVarianz2+ ' = 95% BADECKUNG');
	  				console.log('ECHONEST GENRE DATA ARTIST HOTNESS GENRE SPANNE 3  VON: '+ mittelwertMinusVarianz3+' bis '+mittelwertPlusVarianz3 +' = 99% ABDECKUNG');*/
	  			}
            });
	
	
	
	
}



function getArtistFamilarityRangeforGenre(genreName){
	console.log('ECHONEST DYNAMIC getArtistFamilarityRangeforGenre(genreName) was called');
	var randomNumber =  Math.floor(Math.random()*100);
	var url = 'http://developer.echonest.com/api/v4/artist/search?_='+randomNumber;
	
	//get the lowest Value of the range
	var args = {
			 api_key: echonestApiKey,
		     format:'json',
		     bucket : ['familiarity'],
		     sort : 'familiarity-asc',
		     results: '10',
		     genre: genreName
	}	
	
	$.getJSON(url, args,
            function(genreData) {
	  			if (checkResponse(genreData)) {
	  				var arrayFamilarityValues = new Array();
	  				
	  				for(var i = 0; i<genreData.response.artists.length;i++){
	  					 arrayFamilarityValues.push(genreData.response.artists[i].familiarity);
	  					
	  					
	  				}
	  					
	  				//console.log('ECHONEST GENRE DATA FAMILARITY ASCENDING FOR GENRE '+genreName+': '+  arrayFamilarityValues);
	  				
	  				lowerArtistFamilarityBorderForGenreSimilarity = arrayFamilarityValues[0];
	  				console.log('lowerArtistFamilarityBorderForGenreSimilarity for genre '+genreName+': '+lowerArtistFamilarityBorderForGenreSimilarity);
	  				
	  			
	  				
	  				 
	  			}
            });
	
	//get the highest value of the range
	var args1 = {
			 api_key: echonestApiKey,
		     format:'json',
		     bucket : ['familiarity'],
		     sort : 'familiarity-desc',
		     results: '10',
		     genre: genreName
	}	
	
	$.getJSON(url, args1,
           function(genreData) {
	  			if (checkResponse(genreData)) {
	  				var arrayFamilarityValues = new Array();
	  				
	  				for(var i = 0; i<genreData.response.artists.length;i++){
	  					 arrayFamilarityValues.push(genreData.response.artists[i].familiarity);
	  					
	  					
	  				}
	  					
	  				//console.log('ECHONEST GENRE DATA FAMILARITY DESCENDING FOR GENRE '+genreName+': '+  arrayFamilarityValues);
	  				
	  				upperArtistFamilarityBorderForGenreSimilarity = arrayFamilarityValues[0];
	  				console.log('upperArtistFamilarityBorderForGenreSimilarity for genre '+genreName+': '+upperArtistFamilarityBorderForGenreSimilarity);
	  				
	  				
	  				 
	  			}
           });
	
}



function startNewSession1(models1, throbber1, trackCover1, customplaylist1, apiKey/*, playlistInformation1*/ ){
	 console.log("New session is started");
	
	 echonestApiKey = apiKey.getApiKey();
	 console.log('ECHONEST DYNAMIC apiKey was set to: '+echonestApiKey);
	 
	 models = models1;
	 
	 //models.player.playTrack(models.Track.fromURI('spotify:track:3P6p25MvU3qnvWa8L7i5Lr'));
	 
	 customPlaylistScript =  customplaylist1;
	 
	 trackCoverScript = trackCover1;
	 
	// playlistInformationScript = playlistInformation1 ;
	 
	 //arrayOfTracksInSpotifyPlaylists = playlistInformationScript.getArrayOfAllSongsInSpotifyPlaylists();
	 
	 //console.log('startNewSession()  arrayOfTracksInSpotifyPlaylists: '+arrayOfTracksInSpotifyPlaylists);
	 
	// numberOfSongs=10;
	 songsAlreadyUsed = new Array();
	 
	 
	customPlaylistScript.setupFlipButton();
	 customPlaylistScript.createNewPlaylist();
	 
/*	 models.player.track.load('name', 'duration').done(function(){
		 console.log('Loaded track name and duration');
	 });
	 */
	 
	// trackCurrentlyPlaying = models.player.load('track');
	 
	 trackCurrentlyPlaying = models.player.load('track');
	 
	 
/*	 
	 models.player.load('track').done(function(track) {
		 //console.log('The track '+trackCurrentlyPlaying.name+'  is ' + trackCurrentlyPlaying.duration + ' ms long.');
		 track.load('name').done(function(track){
			 
		 });
		 
		 trackCurrentlyPlaying = track;
		 
		 trackCurrentlyPlaying.load('artists', 'name');
	 });*/
    
	 
	 //console.log('TRACK= '+trackCurrentlyPlaying);
     
     //var artist = models.player.track.artists[0];
     //console.log('ARTIST: '+artist);
	
	
	    if (trackCurrentlyPlaying == null) {
	    	info('Start playing something and I ll make a playlist of good songs based on that song');
	    	
	    } else {
	
    
    //var cover = document.getElementById('albumCoverContainer');
    //var cover = document.getElementById('albumCoverContainer');
    $("#albumCoverContainer").hide();
    //cover.hide();
    
	    	var throbberContainer = document.getElementById('flip-toggle');
	    	throbber = throbber1.forElement( throbberContainer);  	
	    	throbber.setPosition( 'center',  'center');
	    	
	    	
	    	
	    	 
	    	
	    	 
	    	
  //var throbberContainer = $("#throbberContainer") ;
  // var pictureThrobber = throbber1.forElement(throbberContainer);
   // pictureThrobber.setSize('normal');
   
    //getAllEchonestGenres();
    
   // var artist_id = models1.player.track.artists[0].uri.replace('spotify', 'spotify-WW');
    
	 //models.player.   	
    artistName = models.player.track.artists[0].name;
    //models.player
    trackName = models.player.track.name;
  
    
    $( "#artistSimilarityInfo").text(artistName);
    //info('Getting Songs like "'+trackName+'" by '+ artistName);
    
    
    seedArtistSpotifyId=  models.player.track.artists[0].toString();
   // console.log('artist_id: '+artist_id);
    
     seedArtistIdforEchonestCalls= seedArtistSpotifyId.replace('spotify', 'spotify-WW');
    //console.log('Replaced Artist ID: '+replacedArtistID);
   
    //replacedArtistID = 'spotify-WW:artist:4Z8W4fKeB5YxbusRsdQVPb';
    
     song_id=models.player.track.uri.toString();
    //.decodeForText();
   // console.log('Spotify Song ID: '+song_id);
    //var replacedSongID= models1.player.track.uri.decodeForText().replace('spotify', 'spotify-WW');
    //var replacedSongID= song_id.replace('spotify', 'spotify-WW');
    //console.log('Replaced ID: '+replacedSongID);
    //replacedSongID = '"'+replacedSongID+'"';
   //console.log('Replaced ID mit " "': '+replacedSongID);
    //Format:  spotify-WW:track:3L7BcXHCG8uT92viO6Tikl
  // replacedSongID = 'spotify-WW:track:3L7BcXHCG8uT92viO6Tikl';
  // console.log('Replaced ID: '+replacedSongID);
   
   
   
    
    

    
    var randomNumber =  Math.floor(Math.random()*100);
    
  //api_key='+echonestApiKey+'&
   //&artist_id='+seedArtistIdforEchonestCalls+'
    //&bucket=id:spotify-WW&bucket=tracks
    var url = 'http://developer.echonest.com/api/v4/playlist/dynamic/create?&_='+randomNumber;
    var args = {
        	api_key : echonestApiKey,
        	artist_id : seedArtistIdforEchonestCalls,
        	format :'json',
        	limit : true,
            type :'artist-radio', 
            bucket : ['song_hotttnesss', 'artist_familiarity','artist_hotttnesss', 'tracks', 'id:spotify-WW']
           
         }

    //getJSON Syntax: URL(wohin geht die Anfrage), DATA (Objekt oder String der mit der anfrage geschickt wird), CALLBACK (Funktion, die bei erfolgreicher Anfrage ausgeführt wird)
    $.getJSON(url, args,
    		
            function(data) {
        if (checkResponse(data)) {
            info("");
          // $("#albumCoverContainer").empty();
           styleTermNames = new Array();
           styleTermObjects = new Array();
           $("#tagCloud").tagCloud(styleTermObjects); 
            
           
            session_id = data.response.session_id;
           
            console.log("ECHONEST DYNAMIC New session ID  is used: "+session_id);
       	 //for (var i = 0; i <20; i++){
            //var i =0;
            //while(i<20){
            similarityModeIsArtist = true;
            getNextSong1( );
            //setTimeout(function() {info("Timeout");},1000);
            //i++;
            //console.log("Timeout ended");
           //}  
          // getSongsSchleife(trackCover1);
            
            
            //getPlaylistSongSimilarity(models1, size, throbber1,  trackCover1, sliderUpdate1);
            
          // getArtistPopularity(artistIdsForPopularity, sliderUpdate1 );
           //getArtistHotness(artistIdsForPopularity, sliderUpdate1);
            
        } else {
            info("trouble getting results");
        }
    });
    
	   }   
    
	 
	 
	 
}


function changeSeedArtistSimilarity1(){
	console.log('echonestDynamic changeSeedArtistSimilarity1() was called');
	
	
	 //numberOfSongs=10;
	 songsAlreadyUsed = new Array();
	 
	 var track = models.player.load('track');
    //console.log('TRACK= '+track);
    var artist = models.player.track.artists[0];
    //console.log('ARTIST: '+artist);
	
	
	    if (track == null) {
	    	info('Start playing something and I ll make a playlist of good songs based on that song');
	    	
	    } else {
	
   
   var cover = document.getElementById('albumCoverContainer');
  // var cover = $(".albumCoverContainer") ;
   //var pictureThrobber = throbber1.forElement(cover);
   //pictureThrobber.setSize('normal');
  
   //getAllEchonestGenres();
   
  // var artist_id = models1.player.track.artists[0].uri.replace('spotify', 'spotify-WW');
   
    artistName = models.player.track.artists[0].name;
   
    trackName =  models.player.track.name;
 
   
   $( "#artistSimilarityInfo").text(artistName);
   //info('Getting Songs like "'+trackName+'" by '+ artistName);
   
   
   seedArtistSpotifyId=  models.player.track.artists[0].toString();
  // console.log('artist_id: '+artist_id);
   
   seedArtistIdforEchonestCalls= seedArtistSpotifyId.replace('spotify', 'spotify-WW');
   //console.log('Replaced Artist ID: '+replacedArtistID);
  
   //replacedArtistID = 'spotify-WW:artist:4Z8W4fKeB5YxbusRsdQVPb';
   
   song_id=models.player.track.uri.toString();
   //.decodeForText();
  // console.log('Spotify Song ID: '+song_id);
   //var replacedSongID= models1.player.track.uri.decodeForText().replace('spotify', 'spotify-WW');
   var replacedSongID= song_id.replace('spotify', 'spotify-WW');
   //console.log('Replaced ID: '+replacedSongID);
   //replacedSongID = '"'+replacedSongID+'"';
  //console.log('Replaced ID mit " "': '+replacedSongID);
   //Format:  spotify-WW:track:3L7BcXHCG8uT92viO6Tikl
 // replacedSongID = 'spotify-WW:track:3L7BcXHCG8uT92viO6Tikl';
 // console.log('Replaced ID: '+replacedSongID);
  
  
   
   if($('#excludeSeedArtistCheckBox').prop('checked')){
	   
	   banedSeedArtistId = seedArtistSpotifyId;
	   trackCoverScript.setBannedSeedArtist( banedSeedArtistId);
	   
   };
   
   
   
/*  if( $('#excludeSeedArtistCheckBox').prop('checked')){
	  banArtistFeedback1();
  }*/

   
   var randomNumber =  Math.floor(Math.random()*100);
   
   
   //var artistIdsForPopularity = new Array();
   var url = 'http://developer.echonest.com/api/v4/playlist/dynamic/restart?session_id='+session_id+'&_='+randomNumber;
  var args ={
		  	api_key : echonestApiKey,
		  	artist_id : seedArtistIdforEchonestCalls,
			format:'json',
		   	limit : true,
		    type :'artist-radio', 
		    bucket : ['song_hotttnesss', 'artist_familiarity','artist_hotttnesss', 'tracks' , 'id:spotify-WW' ]
 
  };

   //getJSON Syntax: URL(wohin geht die Anfrage), DATA (Objekt oder String der mit der anfrage geschickt wird), CALLBACK (Funktion, die bei erfolgreicher Anfrage ausgeführt wird)
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
           console.log("New session ID  is used: "+session_id);
      	 //for (var i = 0; i <20; i++){
           //var i =0;
           //while(i<20){
           getNextSong1( );
           //setTimeout(function() {info("Timeout");},1000);
           //i++;
           //console.log("Timeout ended");
          //}  
         // getSongsSchleife(trackCover1);
           
           
           //getPlaylistSongSimilarity(models1, size, throbber1,  trackCover1, sliderUpdate1);
           
         // getArtistPopularity(artistIdsForPopularity, sliderUpdate1 );
          //getArtistHotness(artistIdsForPopularity, sliderUpdate1);
           
       } else {
           info("trouble getting results");
       }
   });
   
	   }   
   
	   // getPlaylistInfo();
}


function changeSeedSongSimilarity1(){
	console.log('echonestDynamic changeSeedSongSimilarity1() was called');
	
	//numberOfSongs=10;
	 //songsAlreadyUsed = new Array();
	 
	 var track = models.player.load('track');
   console.log('TRACK= '+track);
   var artist = models.player.track.artists[0];
   console.log('ARTIST: '+artist);
	
	
	    if (track == null) {
	    	info('Start playing something and I ll make a playlist of good songs based on that song');
	    	
	    } else {
	
  
  var cover = document.getElementById('albumCoverContainer');
 // var cover = $(".albumCoverContainer") ;
  //var pictureThrobber = throbber1.forElement(cover);
  //pictureThrobber.setSize('normal');
 
  //getAllEchonestGenres();
  
 // var artist_id = models1.player.track.artists[0].uri.replace('spotify', 'spotify-WW');
  
  artistName = models.player.track.artists[0].name;
  
  trackName =  models.player.track.name;

  
  $( "#songSimilarityInfo").text('"'+trackName+'" by '+ artistName);
  //info('Getting Songs like "'+trackName+'" by '+ artistName);
  
  
   seedArtistSpotifyId=  models.player.track.artists[0].toString();
 // console.log('artist_id: '+artist_id);
  
  var replacedArtistID= seedArtistSpotifyId.replace('spotify', 'spotify-WW');
  //console.log('Replaced Artist ID: '+replacedArtistID);
 
  //replacedArtistID = 'spotify-WW:artist:4Z8W4fKeB5YxbusRsdQVPb';
  
   song_id=models.player.track.uri.toString();
  //.decodeForText();
 // console.log('Spotify Song ID: '+song_id);
  //var replacedSongID= models1.player.track.uri.decodeForText().replace('spotify', 'spotify-WW');
  var replacedSongID= song_id.replace('spotify', 'spotify-WW');
  //console.log('Replaced ID: '+replacedSongID);
  //replacedSongID = '"'+replacedSongID+'"';
 //console.log('Replaced ID mit " "': '+replacedSongID);
  //Format:  spotify-WW:track:3L7BcXHCG8uT92viO6Tikl
// replacedSongID = 'spotify-WW:track:3L7BcXHCG8uT92viO6Tikl';
// console.log('Replaced ID: '+replacedSongID);
 
 
 
  if($('#excludeSeedArtistCheckBox').prop('checked')){
	   
	   banedSeedArtistId = seedArtistSpotifyId;
	   trackCoverScript.setBannedSeedArtist( banedSeedArtistId);
	   
  };
  

  
  var randomNumber =  Math.floor(Math.random()*100);
  
  
  var artistIdsForPopularity = new Array();
  var url = 'http://developer.echonest.com/api/v4/playlist/dynamic/restart?session_id='+session_id+'&_='+randomNumber;
  var args ={
		  	api_key : echonestApiKey,
		  	song_id : replacedSongID,
		  	artist_id : seedArtistIdforEchonestCalls,
			format:'json',
		   	limit : true,
		    type :'song-radio', 
		   

};

  //getJSON Syntax: URL(wohin geht die Anfrage), DATA (Objekt oder String der mit der anfrage geschickt wird), CALLBACK (Funktion, die bei erfolgreicher Anfrage ausgeführt wird)
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
          console.log("New session ID  is used: "+session_id);
     	 //for (var i = 0; i <20; i++){
          //var i =0;
          //while(i<20){
          getNextSong1( );
          //setTimeout(function() {info("Timeout");},1000);
          //i++;
          //console.log("Timeout ended");
         //}  
        // getSongsSchleife(trackCover1);
          
          
          //getPlaylistSongSimilarity(models1, size, throbber1,  trackCover1, sliderUpdate1);
          
        // getArtistPopularity(artistIdsForPopularity, sliderUpdate1 );
         //getArtistHotness(artistIdsForPopularity, sliderUpdate1);
          
      } else {
          info("trouble getting results");
      }
  });
  
	   }   
  
	 
	
}


function changeToArtistSimilarity1(){
	// console.log("New session is started");
	 
	
	similarityModeIsGenre = false;
	similarityModeIsArtist = true;
	similarityModeIsSong = false;
	similarityModeIsPlaylist = false;
	
	 //numberOfSongs=10;
	 songsAlreadyUsed = new Array();
	 
	/* var track = models1.player.load('track');
    console.log('TRACK= '+track);
    var artist = models1.player.track.artists[0];
    console.log('ARTIST: '+artist);
	
	
	    if (track == null) {
	    	info('Start playing something and I ll make a playlist of good songs based on that song');
	    	
	    } else {*/
	
   
   var cover = document.getElementById('albumCoverContainer');
  // var cover = $(".albumCoverContainer") ;
   //var pictureThrobber = throbber1.forElement(cover);
   //pictureThrobber.setSize('normal');
  
   //getAllEchonestGenres();
   
  // var seedArtistSpotifyId = models1.player.track.artists[0].uri.replace('spotify', 'spotify-WW');
   
   //var artistName = models1.player.track.artists[0].name;
   
   //var trackName =  models1.player.track.name;
 
   
   $( "#artistSimilarityInfo").text(artistName);
   //info('Getting Songs like "'+trackName+'" by '+ artistName);
   
   
   //var artist_id=  models1.player.track.artists[0].toString();
  // console.log('artist_id: '+artist_id);
   
   var replacedArtistID= seedArtistSpotifyId.replace('spotify', 'spotify-WW');
   //console.log('Replaced Artist ID: '+replacedArtistID);
  
   //replacedArtistID = 'spotify-WW:artist:4Z8W4fKeB5YxbusRsdQVPb';
   
   //var song_id=models1.player.track.uri.toString();
   //.decodeForText();
  // console.log('Spotify Song ID: '+song_id);
   //var replacedSongID= models1.player.track.uri.decodeForText().replace('spotify', 'spotify-WW');
   var replacedSongID= song_id.replace('spotify', 'spotify-WW');
   //console.log('Replaced ID: '+replacedSongID);
   //replacedSongID = '"'+replacedSongID+'"';
  //console.log('Replaced ID mit " "': '+replacedSongID);
   //Format:  spotify-WW:track:3L7BcXHCG8uT92viO6Tikl
 // replacedSongID = 'spotify-WW:track:3L7BcXHCG8uT92viO6Tikl';
 // console.log('Replaced ID: '+replacedSongID);
  
  
  
   
   

   
   var randomNumber =  Math.floor(Math.random()*100);
   
   
   var artistIdsForPopularity = new Array();
   var url = 'http://developer.echonest.com/api/v4/playlist/dynamic/create?api_key='+echonestApiKey+'&callback=?&bucket=id:spotify-WW&bucket=tracks&artist_id='+replacedArtistID+'&_='+randomNumber;
   	//&track_id='+replacedSongID;
   	//&track_id='+replacedSongID;
   //var session_id ='';

   //getJSON Syntax: URL(wohin geht die Anfrage), DATA (Objekt oder String der mit der anfrage geschickt wird), CALLBACK (Funktion, die bei erfolgreicher Anfrage ausgeführt wird)
   $.getJSON(url, 
   		{// 'artist_id':replacedArtistID ,
   	//'track_id': replacedSongID, 
   	'format':'jsonp',
   	limit : true,
       'type':'artist-radio', 
       //'bucket' : ['song_hotttnesss', 'artist_familiarity','artist_hotttnesss']
      
       //'song_min_hotttnesss': minHotness, 'song_max_hotttnesss': maxHotness,
      // 'artist_max_familiarity': maxPopularity, 'artist_min_familiarity': minPopularity
           //bucket : ['id:spotify-WW', 'tracks'],
           },
           function(data) {
       if (checkResponse(data)) {
           info("");
         // $("#albumCoverContainer").empty();
          styleTermNames = new Array();
          styleTermObjects = new Array();
          $("#tagCloud").tagCloud(styleTermObjects); 
           
          
          session_id = data.response.session_id;
          
          console.log("New session ID  is used: "+session_id);
      	 
          //for (var i = 0; i <20; i++){
           //var i =0;
           //while(i<20){
           getNextSong1( );
           //setTimeout(function() {info("Timeout");},1000);
           //i++;
           //console.log("Timeout ended");
          //}  
         // getSongsSchleife(trackCover1);
           
           
           //getPlaylistSongSimilarity(models1, size, throbber1,  trackCover1, sliderUpdate1);
           
         // getArtistPopularity(artistIdsForPopularity, sliderUpdate1 );
          //getArtistHotness(artistIdsForPopularity, sliderUpdate1);
           
       } else {
           info("trouble getting results");
       }
   });
   
	   //}   
   
	   // getPlaylistInfo();
	 
	 
}



function changeToSongSimilarity1(){
	 console.log(" echonest changeToSongSimilarity1() was called");
	 
	 similarityModeIsGenre = false;
		similarityModeIsArtist = false;
		similarityModeIsSong = true;
		similarityModeIsPlaylist = false;
	 
	
	
   
   var cover = document.getElementById('albumCoverContainer');
  
 
   
   $( "#songSimilarityInfo").text('"'+trackName+'" by '+ artistName);
  
   var replacedSongID= song_id.replace('spotify', 'spotify-WW');
  
  
  
   
   

   
   var randomNumber =  Math.floor(Math.random()*100);
   
   
   //var artistIdsForPopularity = new Array();
   var url = 'http://developer.echonest.com/api/v4/playlist/dynamic/create?api_key='+echonestApiKey+'&bucket=id:spotify-WW&bucket=tracks&song_id='+replacedSongID+'&_='+randomNumber;
   	//&track_id='+replacedSongID;
   	//&track_id='+replacedSongID;
   //var session_id ='';

   //getJSON Syntax: URL(wohin geht die Anfrage), DATA (Objekt oder String der mit der anfrage geschickt wird), CALLBACK (Funktion, die bei erfolgreicher Anfrage ausgeführt wird)
   $.getJSON(url, 
   		{//'artist_id': " " ,
   	//'track_id': replacedSongID, 
   	'format':'json',
   	limit : true,
       'type':'song-radio', 
       //'bucket' : ['song_hotttnesss', 'artist_familiarity','artist_hotttnesss']
      
       //'song_min_hotttnesss': minHotness, 'song_max_hotttnesss': maxHotness,
      // 'artist_max_familiarity': maxPopularity, 'artist_min_familiarity': minPopularity
           //bucket : ['id:spotify-WW', 'tracks'],
           },
           function(data) {
       if (checkResponse(data)) {
           info("");
         // $("#albumCoverContainer").empty();
          styleTermNames = new Array();
          styleTermObjects = new Array();
          $("#tagCloud").tagCloud(styleTermObjects); 
           
          
          session_id = data.response.session_id;
          
          console.log("New session ID  is used: "+session_id);
      	 
          
          //for (var i = 0; i <20; i++){
           //var i =0;
           //while(i<20){
           getNextSong1( );
           //setTimeout(function() {info("Timeout");},1000);
           //i++;
           //console.log("Timeout ended");
          //}  
         // getSongsSchleife(trackCover1);
           
           
           //getPlaylistSongSimilarity(models1, size, throbber1,  trackCover1, sliderUpdate1);
           
         // getArtistPopularity(artistIdsForPopularity, sliderUpdate1 );
          //getArtistHotness(artistIdsForPopularity, sliderUpdate1);
           
       } else {
           info("trouble getting results");
       }
   });
   
	  // }   
   
	 
	    //getPlaylistInfo();
	 
}



function getNextSong1( ){
	//console.log('getNextSong() was called');
	
	throbber.show();
	// $("#albumCoverContainer").hide();
	
	//api_key=BNV9970E1PHXZ9RQW&format=json&results=1&
	var randomNumber =  Math.floor(Math.random()*100);
	var url = 'http://developer.echonest.com/api/v4/playlist/dynamic/next?session_id='+session_id+'&_='+randomNumber;
	var args ={
				api_key : echonestApiKey,
				format: 'json',
				results : 1,
				}   
	   
	    $.getJSON(url, args,
	            function(data) {
	        if (checkResponse(data)) {
	        	
             
                
           	// for (var i = 0; i < data.response.songs.length; i++){
	        	//console.log('ECHONEST DYNAMIC getNextSong1() DATA RESPONSE: '+JSON.stringify(data.response));
 	            console.log('Next song is: ' +data.response.songs[0].title+' by '+data.response.songs[0].artist_name);
 	            
 	            var echonestTrackId = data.response.songs[0].id;
 	           // console.log('echnonestTrackId: '+echnonestTrackId);
 	           
 	            //Varainte ohne lokales Array
 	         /*  var id = data.response.songs[0].tracks[0].foreign_id; 
 	           trackCover1.getTrackCover(id); 
 	           banSongFeedBack(trackCover1, echonestTrackId); 
 	            */
 	            
 	           if($.inArray(echonestTrackId,  songsAlreadyUsed) > -1){
 	 	            console.log('Song bereits verwendet');
 	 	           // numberOfSongs = numberOfSongs+1;
 	 	            banSongFeedBack( echonestTrackId); 
 	 	          }else{
 	 	        	  
 	 	        	
 	 	        	  
 	 	        	songsAlreadyUsed.push(echonestTrackId);
 	 	        	//console.log('getNextsong1() data.response: '+JSON.stringify(data.response));
 	 	        	var id = data.response.songs[0].tracks[0].foreign_id;
 	 	        	//console.log('getNextSong1() response track id: ' + id);
 	 	        	var replacedTrackId = id.replace('spotify-WW', 'spotify');
 	 	        	console.log('getNextSong1() replaced response track id: ' + replacedTrackId);
 	 	        	
 	 	        	//console.log('getNextSong1() response  information: ' + JSON.stringify(data.response));
 	 	        	var echonestArtistId =  data.response.songs[0].artist_id;
 	 	        	
 	 	        	if(noSpotifyPlaylistSongs){
 	 	        		console.log('start checking if track is in a spotifyplaylist');
 	 	        		if($.inArray(id ,  arrayOfTracksInSpotifyPlaylists) > -1){
 	 	 	 	           console.log('DETECTED a song already in your playlist and noSpotifyPlaylistSongs was set to:'+noSpotifyPlaylistSongs);
 	 	 	 	            banSongFeedBack( echonestTrackId); 
 	 	 	 	          }else{
 	 	 	 	        	customPlaylistScript.addTrackToPlaylist(id);
 	 	 	 	        	trackCoverScript.getTrackCover(id);
 	 	 	 	        	//customplaylist1.addTrackToPLaylist(id);
 	 	 	 	        	
 	 	 	 	            getArtistTerms(echonestArtistId);
 	 	 	 	          
 	 	 	 	            banSongFeedBack( echonestTrackId);
 	 	 	 	          }
 	 	        	}else{
 	 	        	
 	 	        	
 	 	        	
 	 	        	//var playable = playableCheck.checkIfTrackIsPlayable(id);
 	 	        	//console.log('echonestDynamic getNextsong1() return from checkIfTrackIsPlayable(): '+playable);
 	 	        	
 	 	        
 	 	        	
 	 	        	customPlaylistScript.addTrackToPlaylist(id);
 	 	        	trackCoverScript.getTrackCover(id);
 	 	        	
 	 	            getArtistTerms(echonestArtistId);
 	 	          
 	 	            banSongFeedBack( echonestTrackId);
 	 	        	}
 	 	        	
 	 	          };
 	            
 	            
 	       
	            
	        } else {
	            info("trouble getting results");
	        }
	    });
	  
}




/*function getNextXXSong1( ){
	console.log('getNextXXSong() was called');
	
	
	//numberOfSongs=10;
	
	
	
	var randomNumber =  Math.floor(Math.random()*100);
	 var url = 'http://developer.echonest.com/api/v4/playlist/dynamic/next?api_key=BNV9970E1PHXZ9RQW&format=json&results=5&lookahead=5&session_id='+session_id+'&_='+randomNumber;
	    //&session_id=3c717a4465dc4a2ba871747a2044f441';
	    //var session_id ='';
	    //var numberOfSongs = 1;

	    //getJSON Syntax: URL(wohin geht die Anfrage), DATA (Objekt oder String der mit der anfrage geschickt wird), CALLBACK (Funktion, die bei erfolgreicher Anfrage ausgeführt wird)
	    $.getJSON(url, 
	    		{ //'artist_id': artist_id,//
	    	//'lookahead' = 5,
	    	//'results' = '1',
	    	//'track_id':replacedSongID, 
	    	//'format':'jsonp',
	    	//limit : true,
	        //'type':'song-radio', 
	       // 'song_min_hotttnesss': minHotness, 'song_max_hotttnesss': maxHotness,
	       // 'artist_max_familiarity': maxPopularity, 'artist_min_familiarity': minPopularity
	            //bucket : ['id:spotify-WW', 'tracks'],
	            },
	            function(data) {
	        if (checkResponse(data)) {
	          
	            
	        	
	        	 info("");
	            // $("#albumCoverContainer").empty();
	              
	             
	           
	              getNextSong1( );
	           
	           // session_id = data.response.session_id;
	        	 for (var i = 0; i < data.response.songs.length; i++){
	            console.log('Next song:' +data.response.songs[i].title+' by '+data.response.songs[i].artist_name);
	            
	            var id = data.response.songs[i].tracks[0].foreign_id;
                trackCover1.getTrackCover(id);
                
               
	            
	        	 }
	        	 
	        	 for (var i = 0; i < data.response.lookahead.length; i++){
	 	            console.log('Next song:' +data.response.lookahead[i].title+' by '+data.response.lookahead[i].artist_name);
	 	            
	 	            var id = data.response.lookahead[i].tracks[0].foreign_id;
	                 trackCover1.getTrackCover(id);
	                 
	                
	 	            
	 	        }
	        	 
	        	 if(counter == 1){
	        	steerPlaylist(trackCover1);
	        	 }
	        	 
	        	 
	            
	          // getArtistPopularity(artistIdsForPopularity, sliderUpdate1 );
	           //getArtistHotness(artistIdsForPopularity, sliderUpdate1);
	            
	        } else {
	            info("trouble getting results");
	        }
	    });
	
}*/



function getArtistTerms(artistID){
	
	//$("#styleresults").empty();
	//$('#cblist').empty();
	
	//var artist2=	models.player.track.artists[0]	
	//console.log('Das ist der Artist für die Genre Query: '+artist2);
		
	//Spotify artists - Example: spotify-WW:artist:4Z8W4fKeB5YxbusRsdQVPb
	//var artist_id3 = artist2.uri.replace('spotify', 'spotify-WW');
	//console.log(artist_id3);
	
	var randomNumber= Math.floor(Math.random()*100);	
	var url1 = 'http://developer.echonest.com/api/v4/artist/terms?api_key='+echonestApiKey+'&format=json&type=style'+'&_='+randomNumber;
	//console.log(url1);
	
	
	$.getJSON(url1,
			{
			'id':artistID
				//artist_id3,
			//'artist':artist_id3
            },
            function(dataGenre) {
            	if (checkResponse(dataGenre)) {
            	for (var i = 0; i < dataGenre.response.terms.length; i++) {
                   
                // console.log( 'Genre Query Output: '+ dataGenre.response.terms[i].name);
                 
                /* var li1 = $("<li>");
                 li1.append(dataGenre.response.terms[i].name);
                 $("#styleresults").append(li1);*/
                 
                 //Falls Genre oder Style des Artists noch nicht als Checkbox dargestellt-->neue Checkbox hinzufügen
                 
                // var container = $('#cblist');
                 
                 var name= dataGenre.response.terms[i].name;
                 var weight = dataGenre.response.terms[i].weight.toString();
                 weight = weight.substring(0,4);
                 //console.log("Gekürztes Terms Gewicht: "+weight);
                 
                 var termAndWeight ={tag: name, count: weight};
                 
                 //check ob style term bereits vorhanden: 
                 
                 //var styleNameAlreadyThere = $.inArray(styleTermNames, name);
                 //console.log('styleNameAlreadyThere: '+styleNameAlreadyThere);
                 
                 
                 
                 if($.inArray(name,styleTermNames) == -1){
  	 	            //console.log('Style Term  not alreday used');
  	 	            styleTermNames.push(name);
  	 	            styleTermObjects.push(termAndWeight);
  	 	            
  	 	           
  	 	            
  	 	          }
                 
                 /*if($.inArray(styleTermNames, name) >= -1){
  	 	        	//styleTermNames.push(name);
  	 	        	console.log('styleTermNames Array: '+styleTermNames);
  	 	            styleTermObjects.push(termAndWeight);
  	 	            $("#tagCloud").tagCloud(styleTermObjects);
  	 	          }*/
                 
                 //var styleTermObjects = new Array();
                 //var styleTermNames = new Array();
               
                 
                 //var tags = [{tag: "Techno", count: 0.2}, {tag: "Jazz" , count :0.9}, {tag: "Classic" , count :0.7}, {tag: "Deep" , count :0.4}, {tag: "Punk" , count :0.76}, {tag: "Rock" , count :0.22}];
                 
                 
              
              
                 
                 
            
            	}
            	//console.log('styleTermNames Array: '+styleTermNames);
            	//$("#tagCloud").empty();
            	$("#tagCloud").tagCloud(styleTermObjects);
        }});
           
}





/*function banArtistFeedback1 (){
	
	//Spotify artists - Example: spotify-WW:artist:4Z8W4fKeB5YxbusRsdQVPb
	
	console.log('echonestDynamic banArtistFeedback() was called') ;
	
	var randomNumber= Math.floor(Math.random()*100);
	var banArtistUrl ='http://developer.echonest.com/api/v4/playlist/dynamic/feedback?api_key=BNV9970E1PHXZ9RQW&format=json&session_id='+session_id+'&_='+randomNumber;
	
	
	 $.getJSON(banArtistUrl, 
	    		{'ban_artist':seedArtistIdforEchonestCalls
	            },
	            function(data) {
	        if (checkResponse(data)) {
	          
	        	
	        	
	        	
	        console.log("Sucessfully baned Seed Artist");
	        getBanedArtistInfo();
	        	
	        	
	        	
	        	
	        	
	        	
	        
	        	
	        	
	        	
	        } 
	    });
	
	
}*/


/*function unbanArtistFeedback1 (){
	
	//Spotify artists - Example: spotify-WW:artist:4Z8W4fKeB5YxbusRsdQVPb
	
	console.log('echonestDynamic banArtistFeedback() was called') ;
	
	var randomNumber= Math.floor(Math.random()*100);
	var banArtistUrl ='http://developer.echonest.com/api/v4/playlist/dynamic/feedback?api_key=BNV9970E1PHXZ9RQW&format=json&session_id='+session_id+'&_='+randomNumber;
	
	
	 $.getJSON(banArtistUrl, 
	    		{'ban_artist':seedArtistIdforEchonestCalls
	            },
	            function(data) {
	        if (checkResponse(data)) {
	          	        	 
	        	
	        console.log("Sucessfully baned Seed Artist");
	        	
	        	
	        	
	        	
	        	
	        	
	        
	        	
	        	
	        	
	        } 
	    });
	
	
}*/




function banSongFeedBack( echnonestTrackId){
	
	var randomNumber= Math.floor(Math.random()*100);
	var skipUrl ='http://developer.echonest.com/api/v4/playlist/dynamic/feedback?session_id='+session_id+'&_='+randomNumber;
	var args ={
			api_key : echonestApiKey,
			format: 'json',
			ban_song : echnonestTrackId,
			
			} 
	 $.getJSON(skipUrl, args,
	            function(data) {
	        if (checkResponse(data)) {
	          	        	 
	       
	        	
	        	var continueLoop = trackCoverScript.checkLoopContinue();
	        	
	        	//console.log('bansongFeddback() result of checkLoopContinue(): '+continueLoop);
	        
	        	if(continueLoop){
	        	
	        	//numberOfSongs = numberOfSongs-1;
	        	getNextSong1( ); 
	        	}
	        	
	        	if(!continueLoop){
	        		throbber.hide();
	        		trackCoverScript.setLoopContinueToTrue();
	        	}
	        	
	
	        	
	        	
	        
	        	
	        	
	        	
	        } else {
	            info("trouble getting results");
	        }
	    });
	
	
}



function getBanedSongsInfo(){
	console.log('getBanedSongsInfo() was called');
	
	var randomNumber= Math.floor(Math.random()*100);	
	var infoUrl = 'http://developer.echonest.com/api/v4/playlist/dynamic/info?api_key='+echonestApiKey+'&session_id='+session_id+'&_='+randomNumber;
	$.getJSON(infoUrl, 
			{
	        },
	        function(data) {
	    if (checkResponse(data)) {
	      	        	 
	    	//console.log('Playlist Info'+JSON.stringify(data));
	    	 
	    	for(var i=0;i<data.response.banned_song_ids.length;i++){
	    	
	    		console.log('Banned Song Number '+i+' with ID: '+data.response.banned_song_ids[i]);
	    	 
	    	}
	        
	    } else {
	        info("trouble getting results");
	    }
	});
}


function getBanedArtistInfo(){
	console.log('getBanedArtistInfo() was called');
	
	var randomNumber= Math.floor(Math.random()*100);	
	var infoUrl = 'http://developer.echonest.com/api/v4/playlist/dynamic/info?api_key='+echonestApiKey+'&session_id='+session_id+'&_='+randomNumber;
	$.getJSON(infoUrl, 
			{
	        },
	        function(data) {
	    if (checkResponse(data)) {
	      	        	 
	    	//console.log('Playlist Info'+JSON.stringify(data));
	    	 
	    	for(var i=0;i<data.response.banned_artist_ids.length;i++){
	    	
	    		console.log('Banned Artist Number '+i+' with ID: '+data.response.banned_artist_ids[i]);
	    	 
	    	}
	        
	    } else {
	        info("trouble getting results");
	    }
	});
}





function getConstraintsInfo(){
console.log('getConstraintsInfo() was called');
	
	var randomNumber= Math.floor(Math.random()*100);	
	var infoUrl = 'http://developer.echonest.com/api/v4/playlist/dynamic/info?api_key='+echonestApiKey+'&session_id='+session_id+'&_='+randomNumber;
	$.getJSON(infoUrl, 
			{
	        },
	        function(data) {
	    if (checkResponse(data)) {
	      	        	 
	    	//console.log('Playlist Info'+JSON.stringify(data));
	    	 
	    	//for(var i=0;i<data.response.banned_song_ids.length;i++){
	    	
	    		console.log(' ECHONEST DYNAMIC getConstraintsInfo() Constraints: '+JSON.stringify(data.response.constraints));
	    		//console.log('Constraints: '+JSON.stringify(data.response));
	    	 
	    	//}
	        
	    } else {
	        info("trouble getting results");
	    }
	});
	
}

function getPlaylistInfo(){
	
var randomNumber= Math.floor(Math.random()*100);	
var infoUrl = 'http://developer.echonest.com/api/v4/playlist/dynamic/info?api_key='+echonestApiKey+'&session_id='+session_id+'&_='+randomNumber;
$.getJSON(infoUrl, 
		{
        },
        function(data) {
    if (checkResponse(data)) {
      	        	 
    	console.log('Playlist Info'+JSON.stringify(data));
    	 
    	//getSongsSchleife(trackCover1); 
    	 
     
        
    } else {
        info("trouble getting results");
    }
});

}




function info(s) {
	  var info =document.getElementById('info');
	  info.innerHTML=(s);
	 
	}




function getSpotifyID(song) {
	  	console.log('getSpotifyID():'+ song.tracks[0].id);
	    var uri = song.tracks[0].id;
	    return uri.replace('spotify-WW', 'spotify');
	}





function checkResponse(data) {
    if (data.response) {
        if (data.response.status.code != 0) {
            info("Whoops... Unexpected error from server. " + data.response.status.message);
            console.log(JSON.stringify(data.response));
        } else {
            return true;
        }
    } else {
        error("Unexpected response from server");
    }
    return false;
}

