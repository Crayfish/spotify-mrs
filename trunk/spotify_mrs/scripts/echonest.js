require([
  '$api/models',
  'scripts/trackCover',
  '$views/throbber#Throbber'
], function(models, trackCover, Throbber) {
  'use strict';

  var fetchPlaylist = function() {
	  console.log("Pressed GeneratePlaylistButton");
	  
	  
	  var track = models.player.track;
	    if (track == null) {
	    	info('Start playing something and I ll make a playlist of good songs based on that song');
	    } else {
	    	info('Request sent to Echonest');
	    	getPlaylist(models.player.track.artists[0],20);
	        
	    	
	    }
  };


  function getPlaylist(artist, size) {
	    info('Getting playlist for ' + artist.name);
	    var cover = document.getElementById('albumCoverContainer');
        var throbber = Throbber.forElement(cover);
	    var artist_id = artist.uri.replace('spotify', 'spotify-WW');
	    var url = 'http://developer.echonest.com/api/v4/playlist/static?api_key=BNV9970E1PHXZ9RQW&callback=?&bucket=id:spotify-WW&bucket=tracks';
	    
	    var song_id=models.player.track.uri;
	    //console.log('Spotify Song ID: '+song_id);
	    var replacedSongID= models.player.track.uri.replace('spotify', 'spotify-WW');
	    //console.log('Replaced ID: '+replacedSongID);
	    
	   //Setzen der Werte für die Query
	   // var minHotness = $( "#slider-hot" ).slider( "values", 0 )/100;
	    //var maxHotness = $( "#slider-hot" ).slider( "values", 1 )/100;
	    //var minPopularity = $( "#slider-pop" ).slider( "values", 0 )/100;
	   // var maxPopularity = $( "#slider-pop" ).slider( "values", 1 )/100;
	    
	    //console.log('minHotness: '+minHotness.toString());
	    
	    //var songName = song.artist_name;

	    //getJSON Syntax: URL(wohin geht die Anfrage), DATA (Objekt oder String der mit der anfrage geschickt wird), CALLBACK (Funktion, die bei erfolgreicher Anfrage ausgeführt wird)
	    $.getJSON(url, 
	    		{ //'artist_id': artist_id,//
	    	'track_id': replacedSongID, 
	    	'format':'jsonp', limit: true,
	            'results': size, 'type':'song-radio', 
	            //bucket : ['id:spotify-WW', 'tracks'],
	            },
	            function(data) {
	        if (checkResponse(data)) {
	            info("");
	            $("#albumCoverContainer").empty();
	           
	            for (var i = 0; i < data.response.songs.length; i++) {
	                //console.log('Song ID: '+data.response.songs[i].id +' SongName: '+data.response.songs[i].title);
	                //console.log('Track ID: '+JSON.stringify(data.response.songs[i].tracks[2].foreign_id));
	                var id = data.response.songs[i].tracks[0].foreign_id;
	                trackCover.getTrackCover(id);
	            }
	            throbber.hide();

	            
	        } else {
	            info("trouble getting results");
	        }
	    });
	    
	    //getArtistGenre();
	    
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
  
  
  
  exports.fetchPlaylist = fetchPlaylist;
 
});