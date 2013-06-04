

require([
	  
  '$api/models',
  '$views/throbber#Throbber',
  'scripts/trackCover',
  'scripts/sliderUpdate'
  
 

  
], function(models, throbber,   trackCover,  sliderUpdate) {
 


 
  var fetchPlaylist = function() {
	  console.log("Pressed GeneratePlaylistButton");
	  
	

	  
	  var track = models.player.load('track');
	  //console.log('TRACK= '+track);
	    if (track == null) {
	    	info('Start playing something and I ll make a playlist of good songs based on that song');
	    	
	    } else {
	    	info('Request sent to Echonest');
	    	
	    	getPlaylist(models.player.track.artists[0],20, throbber, models, trackCover, sliderUpdate);
	    	//setupSlider.updatePopularitySliderValues();
	    	//sliderUpdate.updatePopSlider();
	    	
	    }
  };


  
  exports.fetchPlaylist = fetchPlaylist;
 
})//end of require()




function getPlaylist(artist, size, throbber1, models1, trackCover1, sliderUpdate1) {
    info('Getting playlist for ' + artist.name);
    var cover = document.getElementById('albumCoverContainer');
   // var cover = $(".albumCoverContainer") ;
    var pictureThrobber = throbber1.forElement(cover);
    pictureThrobber.setSize('normal');
   
    var artist_id = artist.uri.replace('spotify', 'spotify-WW');
    var url = 'http://developer.echonest.com/api/v4/playlist/static?api_key=BNV9970E1PHXZ9RQW&callback=?&bucket=id:spotify-WW&bucket=tracks';
    
    var song_id=models1.player.track.uri;
    //console.log('Spotify Song ID: '+song_id);
    var replacedSongID= models1.player.track.uri.replace('spotify', 'spotify-WW');
    //console.log('Replaced ID: '+replacedSongID);
    
   //Setzen der Werte für die Query
    var minHotness = $( "#slider-hot" ).slider( "values", 0 )/100;
    var maxHotness = $( "#slider-hot" ).slider( "values", 1 )/100;
    var minPopularity = $( "#slider-pop" ).slider( "values", 0 )/100;
    var maxPopularity = $( "#slider-pop" ).slider( "values", 1 )/100;
    
    //console.log('minHotness: '+minHotness.toString());
    
    var artistIdsForPopularity = new Array();
    
    

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
                trackCover1.getTrackCover(id);
                
               // console.log('ECHONEST artist_id: '+ data.response.songs[i].artist_id);
                getArtistGenre(data.response.songs[i].artist_id);
                
                artistIdsForPopularity[i]= data.response.songs[i].artist_id
               //getArtistHotness(data.response.songs[i].artist_id, sliderUpdate1);
            }
			// throbber.hide();
            getArtistPopularity(artistIdsForPopularity, sliderUpdate1 );
            
        } else {
            info("trouble getting results");
        }
    });
    
   
    
}


function getArtistGenre(artistID){
	
	$("#styleresults").empty();
	$('#cblist').empty();
	
	//var artist2=	models.player.track.artists[0]	
	//console.log('Das ist der Artist für die Genre Query: '+artist2);
		
	//Spotify artists - Example: spotify-WW:artist:4Z8W4fKeB5YxbusRsdQVPb
	//var artist_id3 = artist2.uri.replace('spotify', 'spotify-WW');
	//console.log(artist_id3);
	
	var url1 = 'http://developer.echonest.com/api/v4/artist/terms?api_key=BNV9970E1PHXZ9RQW&format=json&type=style&'
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
                 var weight = dataGenre.response.terms[i].weight.toString();
                 weight = weight.substring(0,4);
                 //console.log("Gekürztes Terms Gewicht: "+weight);
              
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
                 $('<label />', { 'for': 'cb'+id, text: name+"_____W:"+weight }).appendTo(container);
                 $('<br/>').appendTo(container);
                 }
            	}    
        }});
           
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




function getArtistPopularity(artistArray,  sliderUpdate2){
	  
	  
	var popularityArray= new Array();
	
	
	
	 var popularityQueryUrl = 'http://developer.echonest.com/api/v4/artist/familiarity?api_key=BNV9970E1PHXZ9RQW&format=json';
	  
	 for (var i = 0; i < artistArray.length; i++) {
		 console.log('Artist ID for Popularity Query '+i+': '+artistArray[i])
         
         var artistId = artistArray[i];
         
		  $.getJSON(popularityQueryUrl,
				{
				'id':artistId
					//artist_id3,
				//'artist':artist_id3
	            },
	            function(dataArtistPopularity) {
	            	if (checkResponse(dataArtistPopularity)) {
	            	
	                   
	                
	                
	                 
	                 var artistName= dataArtistPopularity.response.artist.name;
	                 var artistPopulartityValue =dataArtistPopularity.response.artist.familiarity;
	                
	                console.log(" Get Artist Popularity Query: "+artistName +" PopValue:"+artistPopulartityValue);
	                 
	                	
	               // return artistPopulartityValue;
	                popularityArray.push(artistPopulartityValue);
	                console.log('popularityArray nach push'+i+ ': '+  popularityArray);
	                
	                sliderUpdate2.updatePopSlider(popularityArray);	
	                 
	                
	            	   
	            	}
	            });
        
     }
	 
	//console.log('popularityArray vor updateSlider() Aufruf: '+ popularityArray);
	//sliderUpdate2.updatePopSlider(popularityArray);	
}


function getArtistHotness(artist_id, sliderUpdate2){
	  //console.log('Artist ID for Hotness Query: '+artist_id)
	  
	  var hotnessQueryUrl = 'http://developer.echonest.com/api/v4/artist/hotttnesss?api_key=BNV9970E1PHXZ9RQW&format=json';
	  
	  
		
		$.getJSON(hotnessQueryUrl,
				{
				'id':artist_id
					//artist_id3,
				//'artist':artist_id3
	            },
	            function(dataArtistHotness) {
	            	if (checkResponse(dataArtistHotness)) {
	            	
	                   
	                
	                
	                 
	                 var artistName= dataArtistHotness.response.artist.name;
	                 var artistHotnessValue =dataArtistHotness.response.artist.hotttnesss;
	                
	                 //console.log("Artist Hotness Query: "+artistName +" HotValue:"+artistHotnessValue);
	                 
	                 sliderUpdate2.updateHotSlider(artistHotnessValue);
	                
	                
	                
	                 
	                
	            	   
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

