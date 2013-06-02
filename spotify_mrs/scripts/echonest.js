

require([
  '$api/models',
  '$views/throbber#Throbber',
  'scripts/trackCover',
  '$views/buttons',
  //'scripts/setupSlider'

  
], function(models,  Throbber,  trackCover, buttons) {
  'use strict';


 
  var fetchPlaylist = function() {
	  console.log("Pressed GeneratePlaylistButton");
	  
	

	  
	  var track = models.player.load('track');
	  //console.log('TRACK= '+track);
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
	    throbber.setSize('normal');
	    var artist_id = artist.uri.replace('spotify', 'spotify-WW');
	    var url = 'http://developer.echonest.com/api/v4/playlist/static?api_key=BNV9970E1PHXZ9RQW&callback=?&bucket=id:spotify-WW&bucket=tracks';
	    
	    var song_id=models.player.track.uri;
	    //console.log('Spotify Song ID: '+song_id);
	    var replacedSongID= models.player.track.uri.replace('spotify', 'spotify-WW');
	    //console.log('Replaced ID: '+replacedSongID);
	    
	   //Setzen der Werte für die Query
	    var minHotness = $( "#slider-hot" ).slider( "values", 0 )/100;
	    var maxHotness = $( "#slider-hot" ).slider( "values", 1 )/100;
	    var minPopularity = $( "#slider-pop" ).slider( "values", 0 )/100;
	    var maxPopularity = $( "#slider-pop" ).slider( "values", 1 )/100;
	    
	    //console.log('minHotness: '+minHotness.toString());
	    
	    //var songName = song.artist_name;

	    //getJSON Syntax: URL(wohin geht die Anfrage), DATA (Objekt oder String der mit der anfrage geschickt wird), CALLBACK (Funktion, die bei erfolgreicher Anfrage ausgeführt wird)
	    $.getJSON(url, 
	    		{ //'artist_id': artist_id,//
	    	'track_id': replacedSongID, 
	    	'format':'jsonp', limit: true,
	            'results': size, 'type':'song-radio', 
	            'song_min_hotttnesss': minHotness, 'song_max_hotttnesss': maxHotness,
	            'artist_max_familiarity': maxPopularity, 'artist_min_familiarity': minPopularity
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
	                
	               // console.log('ECHONEST artist_id: '+ data.response.songs[i].artist_id);
	                getArtistGenre(data.response.songs[i].artist_id);
	                getArtistPopularity(data.response.songs[i].artist_id);
	            }
				 throbber.hide();

	            
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
  
  function getArtistPopularity(artist_id){
	  console.log('Artist ID for Popularity Query: '+artist_id)
	  //setupSlider.updatePopularitySliderValues();
	  
	  
  }
  
  
  function getArtistGenre(artistID){
		
		$("#styleresults").empty();
		$('#cblist').empty();
		
		//var artist2=	models.player.track.artists[0]	
		//console.log('Das ist der Artist für die Genre Query: '+artist2);
			
		//Spotify artists - Example: spotify-WW:artist:4Z8W4fKeB5YxbusRsdQVPb
		//var artist_id3 = artist2.uri.replace('spotify', 'spotify-WW');
		//console.log(artist_id3);
		
		var url1 = 'http://developer.echonest.com/api/v4/artist/terms?api_key=BNV9970E1PHXZ9RQW&format=json&type=style'
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
	                 
	                 var container = $('#cblist');
	                 
	                 var name= dataGenre.response.terms[i].name;
	              
	                var boxShouldBeAdded = true;
	                $( '[type=checkbox]' ).each(function( index ) {
	                	//console.log( index + ": " + $(this).attr('value') );
	                	if($(this).attr('value')==name){
	                		boxShouldBeAdded=false;
	                		return false;
	                	}
	                	});
	                
	                
	                
	                 
	                 if(boxShouldBeAdded){
	                 var id = i;
	                 
	                //<input type="checkbox" name="incr" value="salami" style="-webkit-appearance: checkbox !important;" />hip hop</br>    
	                 $('<input />', { type: 'checkbox', id: 'cb'+id, value:name, style:'-webkit-appearance: checkbox !important;'  }).appendTo(container);
	                 $('<label />', { 'for': 'cb'+id, text: name }).appendTo(container);
	                 $('<br/>').appendTo(container);
	                 }
	            	}    
	        }});
	           
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