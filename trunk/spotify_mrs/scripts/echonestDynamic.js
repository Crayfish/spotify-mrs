

require([
	  
  '$api/models',
  '$views/throbber#Throbber',
  'scripts/trackCover'
 
  
 

  
], function(models, throbber, trackCover) {
 
	  'use strict';

 


 
  
  
  var startNewSession = function(){
	 // console.log("New session is started");
	  startNewSession1(models, throbber, trackCover);
	 
  };
  
  
  var getNextSong = function(){
	 // console.log("New session is started");
	  getNextSong1(trackCover);
	 
  };
  
  var getNextXXSong = function(){
		 // console.log("New session is started");
		  getNextXXSong1(trackCover);
		 
	  };
	  
	var changeArtistPopularity = function(){
		 changeArtistPopularity1();
	};  
	
	
	var changeArtistHotness = function(){
		changeArtistHotness1();
	}; 
	
	
	var changeSongHotness = function(){
		changeSongHotness1();
	};
	
	var startGenreRadio = function(genreName){
		startGenreRadio1(genreName);
	};
	
	var changeArtistVariety = function(){
		changeArtistVariety1();
	};
	
	var changeAdventurousness = function(){
		changeAdventurousness1();
	};
	
  
  exports.getNextXXSong =getNextXXSong;
  exports.getNextSong=getNextSong;
  exports.startNewSession = startNewSession;
  exports.changeArtistPopularity =  changeArtistPopularity;
  exports.changeArtistHotness = changeArtistHotness;
  exports.changeSongHotness =changeSongHotness;
  exports.startGenreRadio =  startGenreRadio;
  exports.changeArtistVariety = changeArtistVariety;
  exports.changeAdventurousness= changeAdventurousness;
});//end of require()





var session_id ='';

var numberOfSongs = 20;

var songsAlreadyUsed = new Array();

var styleTermObjects = new Array();
var styleTermNames = new Array();


function changeAdventurousness1(){
	console.log('EchonestDynamic changeAdventurousness() was called');
	
	var adventurousnessSliderValue = $( "#adventurousnessSlider" ).slider( "value" )/100;
	console.log('adventurousnessSliderValue:'+adventurousnessSliderValue);
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
    	//'max_artist_hotttnesss':maxHotness,
    	 'adventurousness':adventurousnessSliderValue 
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

function changeArtistVariety1(){
	console.log('EchonestDynamic changeArtistVariety() was called');
	
	//slider Value
    
	var changeArtistVarietySliderValue = $( "#artistVarietySlider" ).slider( "value" )/100;
	console.log('changeArtistVarietySliderValue:'+changeArtistVarietySliderValue);
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
    	//'max_artist_hotttnesss':maxHotness,
    	 'variety':changeArtistVarietySliderValue 
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


function  changeArtistPopularity1(){
	console.log("changeArtistPopularity() was called");
	
		//getConstraintsInfo();
	
	   //Setzen der Werte für die Query
		
	    var minPopularity = $( "#slider-pop" ).slider( "values", 0 )/100;
	    var maxPopularity = $( "#slider-pop" ).slider( "values", 1 )/100;
	    
	    console.log('maxPopularity changeArtistPopularity1(): '+maxPopularity);
	    console.log('minPopularity changeArtistPopularity1(): '+minPopularity);
	    
	    
	    var randomNumber =  Math.floor(Math.random()*100);
	    
	    
	   // var artistIdsForPopularity = new Array();
	    var url = 'http://developer.echonest.com/api/v4/playlist/dynamic/steer?api_key=BNV9970E1PHXZ9RQW&callback=?&session_id='+session_id+'&_='+randomNumber;
	    	

	    //getJSON Syntax: URL(wohin geht die Anfrage), DATA (Objekt oder String der mit der anfrage geschickt wird), CALLBACK (Funktion, die bei erfolgreicher Anfrage ausgeführt wird)
	    $.getJSON(url, 
	    		{// 'artist_id':replacedArtistID ,
	    	//'track_id': replacedSongID, 
	    	'format':'jsonp',
	    	//limit : true,
	        //'type':'artist-radio', 
	    	// 'target_artist_familiarity': maxPopularity
	    	'max_artist_familiarity':maxPopularity,  'min_artist_familiarity':minPopularity 
	        //'artist_max_familiarity': maxPopularity, 'artist_min_familiarity': minPopularity
	            //bucket : ['id:spotify-WW', 'tracks'],
	            },
	            function(data) {
	        if (checkResponse(data)) {
	            
	        	//console.log('Changed Popularity Values');
	        	getConstraintsInfo();
	           
	       
	        } else {
	            info("trouble getting results");
	        }
	    });
	
	
	
}

function  changeArtistHotness1(){
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


function  changeSongHotness1(){
	console.log("changeSongHotness() was called");
	
		//getConstraintsInfo();
	
	   //Setzen der Werte für die Query
		var minSongHotness = $( "#slider-songHot" ).slider( "values", 0 )/100;
		var maxSongHotness = $( "#slider-songHot" ).slider( "values", 1 )/100;
	   
		console.log('maxSongHotness changeSongHotness1(): '+maxSongHotness);
	    console.log('minSongHotness changeSongHotness1(): '+minSongHotness);
	   
	    
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
	    	'max_song_hotttnesss':maxSongHotness,
	    	 'min_song_hotttnesss':minSongHotness 
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


function startGenreRadio1(genreName){
	//console.log('startGenreRadio1() was called with genre: '+genreName);
	var randomNumber =  Math.floor(Math.random()*100);
	var genreUrl = 'http://developer.echonest.com/api/v4/playlist/dynamic/restart?api_key=BNV9970E1PHXZ9RQW&type=genre-radio&bucket=id:spotify-WW&bucket=tracks&callback=?&session_id='+session_id+'&_='+randomNumber;
	$.getJSON(genreUrl, 
    		{// 'artist_id':replacedArtistID ,
    	//'track_id': replacedSongID, 
    	'format':'jsonp',
    	'genre':genreName
    	//limit : true,
        //'type':'artist-radio', 
    	//'max_song_hotttnesss':maxSongHotness,
    	// 'min_song_hotttnesss':minSongHotness 
        //'artist_max_familiarity': maxPopularity, 'artist_min_familiarity': minPopularity
            //bucket : ['id:spotify-WW', 'tracks'],
            },
            function(data) {
        if (checkResponse(data)) {
            
        console.log('Canged to Genre Radio: '+genreName);
        
           
       
        } else {
            info("trouble getting results");
        }
    });

}


function startNewSession1(models1, throbber1, trackCover1){
	 console.log("New session is started");
	 
	 numberOfSongs=20;
	 songsAlreadyUsed = new Array();
	 
	 var track = models1.player.load('track');
     console.log('TRACK= '+track);
     var artist = models1.player.track.artists[0];
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
    
    var artistName = models1.player.track.artists[0].name;
    
    var trackName =  models1.player.track.name;
  
    
    
    info('Getting Songs like "'+trackName+'" by '+ artistName);
    
    
    var artist_id=  models1.player.track.artists[0].toString();
   // console.log('artist_id: '+artist_id);
    
    var replacedArtistID= artist_id.replace('spotify', 'spotify-WW');
    //console.log('Replaced Artist ID: '+replacedArtistID);
   
    //replacedArtistID = 'spotify-WW:artist:4Z8W4fKeB5YxbusRsdQVPb';
    
    var song_id=models1.player.track.uri.toString();
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
    var url = 'http://developer.echonest.com/api/v4/playlist/dynamic/create?api_key=BNV9970E1PHXZ9RQW&callback=?&bucket=id:spotify-WW&bucket=tracks&artist_id='+replacedArtistID+'&_='+randomNumber;
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
        'bucket' : ['song_hotttnesss', 'artist_familiarity','artist_hotttnesss']
       
        //'song_min_hotttnesss': minHotness, 'song_max_hotttnesss': maxHotness,
       // 'artist_max_familiarity': maxPopularity, 'artist_min_familiarity': minPopularity
            //bucket : ['id:spotify-WW', 'tracks'],
            },
            function(data) {
        if (checkResponse(data)) {
            info("");
           $("#albumCoverContainer").empty();
           styleTermNames = new Array();
           styleTermObjects = new Array();
           $("#tagCloud").tagCloud(styleTermObjects); 
            
           
            session_id = data.response.session_id;
           // console.log('session_id: '+session_id);
            console.log("New session ID  is used: "+session_id);
       	 //for (var i = 0; i <20; i++){
            //var i =0;
            //while(i<20){
            getNextSong1(trackCover1);
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



function getNextSong1(trackCover1){
	//console.log('getNextSong() was called');
	
	var randomNumber =  Math.floor(Math.random()*100);
	 var url = 'http://developer.echonest.com/api/v4/playlist/dynamic/next?api_key=BNV9970E1PHXZ9RQW&format=json&results=1&session_id='+session_id+'&_='+randomNumber;
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
	          // bucket : ['id:spotify-WW', 'tracks'],
	          
	    	//'callback': console.log('Calllback executed');
	            },
	            function(data) {
	        if (checkResponse(data)) {
	        
                
                
           	// for (var i = 0; i < data.response.songs.length; i++){
 	            console.log('Next song no ' +numberOfSongs+': ' +data.response.songs[0].title+' by '+data.response.songs[0].artist_name);
 	            
 	            var echonestTrackId = data.response.songs[0].id;
 	           // console.log('echnonestTrackId: '+echnonestTrackId);
 	           
 	            //Varainte ohne lokales Array
 	         /*  var id = data.response.songs[0].tracks[0].foreign_id; 
 	           trackCover1.getTrackCover(id); 
 	           banSongFeedBack(trackCover1, echonestTrackId); 
 	            */
 	            
 	           if($.inArray(echonestTrackId,  songsAlreadyUsed) > -1){
 	 	            console.log('Song bereits verwendet');
 	 	            numberOfSongs = numberOfSongs+1;
 	 	            banSongFeedBack(trackCover1, echonestTrackId); 
 	 	          }else{
 	 	        	songsAlreadyUsed.push(echonestTrackId);
 	 	        	//console.log('getNextsong1() data.response: '+JSON.stringify(data.response));
 	 	        	var id = data.response.songs[0].tracks[0].foreign_id;
 	 	        	var echonestArtistId =  data.response.songs[0].artist_id;
 	 	            trackCover1.getTrackCover(id);
 	 	            getArtistTerms(echonestArtistId);
 	 	            banSongFeedBack(trackCover1, echonestTrackId);
 	 	           
 	 	          }
 	            
 	            
 	         /*  
 	          if($.inArray(echonestTrackId,  songsAlreadyUsed) == -1){
 	            songsAlreadyUsed.push(echonestTrackId);
 	          }
 	          
 	         // console.log('IN ARRAY with INDEX: '+ $.inArray(echonestTrackId,  songsAlreadyUsed));
 	            
 	           
 	          if( $.inArray(echonestTrackId,  songsAlreadyUsed) > -1){
 	        	  //console.log('TRACK ALREADY USED');
 	            var id = data.response.songs[0].tracks[0].foreign_id;
 	            trackCover1.getTrackCover(id);
 	          }
                
 	           banSongFeedBack(trackCover1, echonestTrackId);*/
 	            
 	        	
              
	            //steerPlaylist(trackCover1);
                
               
	        	
	        	 
	        	/* for (var i = 0; i < data.response.lookahead.length; i++){
	 	            console.log('Next song:' +data.response.lookahead[i].title+' by '+data.response.lookahead[i].artist_name);
	 	            
	 	            var id = data.response.lookahead[i].tracks[0].foreign_id;
	                 trackCover1.getTrackCover(id);
	                 
	                
	 	            
	 	        }*/
	        	 
	        	
	        	 
	        	 
	            
	          // getArtistPopularity(artistIdsForPopularity, sliderUpdate1 );
	           //getArtistHotness(artistIdsForPopularity, sliderUpdate1);
	            
	        } else {
	            info("trouble getting results");
	        }
	    });
	  
}




function getNextXXSong1(trackCover1){
	console.log('getNextXXSong() was called');
	
	
	numberOfSongs=20;
	
	
	
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
	             $("#albumCoverContainer").empty();
	              
	             
	           
	              getNextSong1(trackCover1);
	           
	           // session_id = data.response.session_id;
	        	/* for (var i = 0; i < data.response.songs.length; i++){
	            console.log('Next song:' +data.response.songs[i].title+' by '+data.response.songs[i].artist_name);
	            
	            var id = data.response.songs[i].tracks[0].foreign_id;
                trackCover1.getTrackCover(id);
                
               
	            
	        	 }*/
	        	 
	        	/* for (var i = 0; i < data.response.lookahead.length; i++){
	 	            console.log('Next song:' +data.response.lookahead[i].title+' by '+data.response.lookahead[i].artist_name);
	 	            
	 	            var id = data.response.lookahead[i].tracks[0].foreign_id;
	                 trackCover1.getTrackCover(id);
	                 
	                
	 	            
	 	        }
	        	 */
	        	/* if(counter == 1){
	        	steerPlaylist(trackCover1);
	        	 }
	        	 */
	        	 
	            
	          // getArtistPopularity(artistIdsForPopularity, sliderUpdate1 );
	           //getArtistHotness(artistIdsForPopularity, sliderUpdate1);
	            
	        } else {
	            info("trouble getting results");
	        }
	    });
	
}



function getArtistTerms(artistID){
	
	//$("#styleresults").empty();
	//$('#cblist').empty();
	
	//var artist2=	models.player.track.artists[0]	
	//console.log('Das ist der Artist für die Genre Query: '+artist2);
		
	//Spotify artists - Example: spotify-WW:artist:4Z8W4fKeB5YxbusRsdQVPb
	//var artist_id3 = artist2.uri.replace('spotify', 'spotify-WW');
	//console.log(artist_id3);
	
	var randomNumber= Math.floor(Math.random()*100);	
	var url1 = 'http://developer.echonest.com/api/v4/artist/terms?api_key=BNV9970E1PHXZ9RQW&format=json&type=style&'+'&_='+randomNumber;
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
  	 	            console.log('Style Term  not alreday used');
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



function steerPlaylist(trackCover1){
	
	var tempo = Math.floor(Math.random()*100);
	 var urlSteer ='http://developer.echonest.com/api/v4/playlist/dynamic/steer?api_key=BNV9970E1PHXZ9RQW&session_id='+session_id+'&min_tempo='+tempo
	 
	   $.getJSON(urlSteer, 
	    		{
	            },
	            function(data) {
	        if (checkResponse(data)) {
	          	        	 
	        	console.log('steerPlaylist() was called');
	        	 
	        	getSongsSchleife(trackCover1); 
	        	 
	         
	            
	        } else {
	            info("trouble getting results");
	        }
	    });
	
}


function banSongFeedBack(trackCover1, echnonestTrackId){
	
	var randomNumber= Math.floor(Math.random()*100);
	var skipUrl ='http://developer.echonest.com/api/v4/playlist/dynamic/feedback?api_key=BNV9970E1PHXZ9RQW&format=json&session_id='+session_id+'&_='+randomNumber;
	
	 $.getJSON(skipUrl, 
	    		{'ban_song':echnonestTrackId
	            },
	            function(data) {
	        if (checkResponse(data)) {
	          	        	 
	        	console.log('banSong() was called with echonest ID: '+echnonestTrackId);
	        	
	        	 //setTimeout(function(){getNextSong1(trackCover1)},1000);
	        	
	        	
	        	/*if(numberOfSongs == 0){
	        		
	        		console.log('Number of fetched songs: '+songsAlreadyUsed.length);
	        		 for(var j =0; j< songsAlreadyUsed.length;j++){
	        			 console.log('Song Already Used no '+j+': '+songsAlreadyUsed[j]);
	        		 }
	        		 getBanedSongsInfo();
	        		
	        	}*/
	        
	        	if(numberOfSongs !=0){
	        	
	        	numberOfSongs = numberOfSongs-1;
	        	getNextSong1(trackCover1); 
	        	}
	        	
	       /* 	else{
	        	$("#tagCloud").empty();
	            	$("#tagCloud").tagCloud(styleTermObjects);
	        	}
	        	*/
	        	
	        	
	        	
	         
	        	//getPlaylistInfo(); 
	        } else {
	            info("trouble getting results");
	        }
	    });
	
	
}

function getBanedSongsInfo(){
	console.log('getBanedSongsInfo() was called');
	
	var randomNumber= Math.floor(Math.random()*100);	
	var infoUrl = 'http://developer.echonest.com/api/v4/playlist/dynamic/info?api_key=BNV9970E1PHXZ9RQW&session_id='+session_id+'&_='+randomNumber;
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

function getConstraintsInfo(){
console.log('getConstraintsInfo() was called');
	
	var randomNumber= Math.floor(Math.random()*100);	
	var infoUrl = 'http://developer.echonest.com/api/v4/playlist/dynamic/info?api_key=BNV9970E1PHXZ9RQW&session_id='+session_id+'&_='+randomNumber;
	$.getJSON(infoUrl, 
			{
	        },
	        function(data) {
	    if (checkResponse(data)) {
	      	        	 
	    	//console.log('Playlist Info'+JSON.stringify(data));
	    	 
	    	//for(var i=0;i<data.response.banned_song_ids.length;i++){
	    	
	    		console.log('Constraints: '+JSON.stringify(data.response.constraints));
	    	 
	    	//}
	        
	    } else {
	        info("trouble getting results");
	    }
	});
	
}

function getPlaylistInfo(){
	
var randomNumber= Math.floor(Math.random()*100);	
var infoUrl = 'http://developer.echonest.com/api/v4/playlist/dynamic/info?api_key=BNV9970E1PHXZ9RQW&session_id='+session_id+'&_='+randomNumber;
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

