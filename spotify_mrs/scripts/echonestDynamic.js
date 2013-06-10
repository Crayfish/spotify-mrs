

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
  
  
  exports.getNextSong=getNextSong;
  exports.startNewSession = startNewSession;
 
});//end of require()





var session_id ='';

function startNewSession1(models1, throbber1, trackCover1){
	 console.log("New session is started");
	 
	 var track = models1.player.load('track');
     //console.log('TRACK= '+track);
     var artist = models1.player.track.artists[0];
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
    
    var artistName = models1.player.track.artists[0].name;
    
    var trackName =  models1.player.track.name;
  
    
    
    info('Getting Songs like "'+trackName+'" by '+ artistName);
    
    
    var artist_id=  models1.player.track.artists[0].toString();
    console.log('artist_id: '+artist_id);
    
    var replacedArtistID= artist_id.replace('spotify', 'spotify-WW');
    console.log('Replaced Artist ID: '+replacedArtistID);
   
    //replacedArtistID = 'spotify-WW:artist:4Z8W4fKeB5YxbusRsdQVPb';
    
    var song_id=models1.player.track.uri.toString();
    //.decodeForText();
    console.log('Spotify Song ID: '+song_id);
    //var replacedSongID= models1.player.track.uri.decodeForText().replace('spotify', 'spotify-WW');
    var replacedSongID= song_id.replace('spotify', 'spotify-WW');
    console.log('Replaced ID: '+replacedSongID);
    //replacedSongID = '"'+replacedSongID+'"';
   //console.log('Replaced ID mit " "': '+replacedSongID);
    //Format:  spotify-WW:track:3L7BcXHCG8uT92viO6Tikl
  // replacedSongID = 'spotify-WW:track:3L7BcXHCG8uT92viO6Tikl';
  // console.log('Replaced ID: '+replacedSongID);
   
   
   
    
    
   //Setzen der Werte für die Query
    var minHotness = $( "#slider-hot" ).slider( "values", 0 )/100;
    var maxHotness = $( "#slider-hot" ).slider( "values", 1 )/100;
    var minPopularity = $( "#slider-pop" ).slider( "values", 0 )/100;
    var maxPopularity = $( "#slider-pop" ).slider( "values", 1 )/100;
    
    //console.log('minPopularity getPlaylist(): '+minPopularity);
   // console.log('maxPopularity getPlaylist(): '+maxPopularity);
    
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
        'song_min_hotttnesss': minHotness, 'song_max_hotttnesss': maxHotness,
        'artist_max_familiarity': maxPopularity, 'artist_min_familiarity': minPopularity
            //bucket : ['id:spotify-WW', 'tracks'],
            },
            function(data) {
        if (checkResponse(data)) {
            info("");
           $("#albumCoverContainer").empty();
            
           
            session_id = data.response.session_id;
            console.log('session_id: '+session_id);
            
       	 //for (var i = 0; i <20; i++){
            getNextXXSong1(trackCover1, 10);
       	// }  
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
	console.log('getNextSong() was called');
	
	var randomNumber =  Math.floor(Math.random()*100);
	 var url = 'http://developer.echonest.com/api/v4/playlist/dynamic/next?api_key=BNV9970E1PHXZ9RQW&format=json&results=1&session_id='+session_id+'&_='+randomNumber;
	    //&session_id=3c717a4465dc4a2ba871747a2044f441';
	    //var session_id ='';
	    var numberOfSongs = 1;

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
	           // info("");
	           // $("#albumCoverContainer").empty();
	            
	           
	           // session_id = data.response.session_id;
	        	
	           // console.log('Next song:' +data.response.songs[0].title+' by '+data.response.songs[0].artist_name);
	            
	            //var id = data.response.songs[0].tracks[0].foreign_id;
                //trackCover1.getTrackCover(id);
                
                
           	// for (var i = 0; i < data.response.songs.length; i++){
 	            console.log('Next song:' +data.response.songs[0].title+' by '+data.response.songs[0].artist_name);
 	            
 	            var echnonestTrackId = data.response.songs[0].id;
 	           // console.log('echnonestTrackId: '+echnonestTrackId);
 	            
 	          
 	            
 	           
 	          
 	            
 	           
 	            var id = data.response.songs[0].tracks[0].foreign_id;
 	            trackCover1.getTrackCover(id);
               
                
 	            banSongFeedBack(trackCover1, echnonestTrackId);
 	            
 	        	
              
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




function getNextXXSong1(trackCover1, numberOfSongs){
	console.log('getNextXXSong() was called');
	
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
	           // info("");
	           // $("#albumCoverContainer").empty();
	            
	           
	           // session_id = data.response.session_id;
	        	 for (var i = 0; i < data.response.songs.length; i++){
	            console.log('Next song:' +data.response.songs[i].title+' by '+data.response.songs[i].artist_name);
	            
	            var id = data.response.songs[i].tracks[0].foreign_id;
                trackCover1.getTrackCover(id);
                
               
	            
	        	 }
	        	 
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
	        	
	        	 //setTimeout(function(){getNextSong1(trackCover1)},3000);
	        	
	        	//getPlaylistInfo(); 
	        	//getSongsSchleife(trackCover1); 
	        	 
	         
	            
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

