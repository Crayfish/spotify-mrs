require([
  '$api/models',
 //'scripts/echonestDynamic'
 
], function(models/*echonestDynamic*/ ) {
  'use strict';


  var getGenreData = function() {
   getGenreData1();
 
  };

  exports.getGenreData = getGenreData;
});

var genreArray = new Array();

var genreDataObjects = new Array();

function getGenreData1(echonestDynamic){
	console.log('getGenreData() was called');
	
	
	
	 getAllEchonestGenres(echonestDynamic);
	 
	 
	 
	
}






function getAllEchonestGenres(echonestDynamic){
	
	
	
	
	
	
	var randomNumber =  Math.floor(Math.random()*100);
	 var url = 'http://developer.echonest.com/api/v4/artist/list_genres?_='+randomNumber;
	 var args = {
	        api_key: 'BNV9970E1PHXZ9RQW',
	        format:'json'
	  };
	  
	  $.getJSON(url, args,
	            function(genreData) {
		  			if (checkResponse(genreData)) {
		  				
		  				for (var i = 0; i< genreData.response.genres.length; i++) {
		  					genreArray.push(genreData.response.genres[i].name);
		  				}
		  				
		  				 //console.log('ECHONEST GENRE DATA: '+genreArray );
		  				
		  				//getGenreInfo();
		  				 //getSongHotnesValuesForGenre();
		  				
		  				getDistributionData();
		  				 
		  			}
	            });
	  
	 
	
}


function getDistributionData(){
	
	var randomNumber =  Math.floor(Math.random()*100);
	var url = 'http://developer.echonest.com/api/v4/artist/search?_='+randomNumber;
	var genreName = 'hip hop'
	
	
	//untere Grenze der Spannweite ermittelen
	var args = {
			 api_key: 'BNV9970E1PHXZ9RQW',
		     format:'json',
		     bucket : ['hotttnesss'],
		     sort : 'hotttnesss-asc',
		     results: '10',
		    genre: genreName
	}	
	
	
	
	$.getJSON(url, args,
            function(genreData) {
	  			if (checkResponse(genreData)) {
	  			
	  					 console.log('ECHONEST GENRE DATA GENRE REAGGAE LOWER BORDER: '+genreData.response.artists[0].hotttnesss);
	  				
	  				
	  				
	  				
	  				
	  				 
	  			}
            });
	
	
	//obere Grenze der Spannweite ermitteln
	var args1 = {
			 api_key: 'BNV9970E1PHXZ9RQW',
		     format:'json',
		     bucket : ['hotttnesss'],
		     sort : 'hotttnesss-desc',
		     results: '10',
		    genre: genreName
	}	
	
	
	
	$.getJSON(url, args1,
           function(genreData) {
	  			if (checkResponse(genreData)) {
	  			
	  					 console.log('ECHONEST GENRE DATA GENRE REAGGAE UPPER BORDER: '+genreData.response.artists[0].hotttnesss);
	  				
	  				
	  				
	  				
	  				
	  				 
	  			}
           });
	
	
	
	
	//Test auf Normalverteilung 
	var args2 = {
			 api_key: 'BNV9970E1PHXZ9RQW',
		     format:'json',
		     bucket : ['hotttnesss'],
		     //sort : 'hotttnesss-desc',
		     results: '100',
		    	genre: 'reggae' 
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
	  				
	  				var mittelwert = 0;
	  				var summe = 0;
	  				
	  				for(var i =0; i<arrayHotnessValues.length;i++){
	  					summe = summe +arrayHotnessValues[i];
	  				}
	  				
	  				mittelwert = summe/arrayHotnessValues.length;
	  				
	  				console.log('ECHONEST GENRE DATA ARTIST HOTNESS MITTELWERT  GENRE REAGGAE: '+mittelwert);
	  				
	  				//Varianz berechnen
	  				var varianz = 0;
	  				var varianzSumme= 0;
	  				for(var i =0; i<arrayHotnessValues.length;i++){
	  					varianzSumme =  varianzSumme + Math.pow(arrayHotnessValues[i]- mittelwert,2);
	  				}
	  				
	  				
	  				
	  				  varianz =  Math.sqrt((1/(arrayHotnessValues.length -1))*varianzSumme);
	  				
	  				
	  				console.log('ECHONEST GENRE DATA ARTIST HOTNESS VARIANZ  GENRE REAGGAE: '+varianz);
	  				
	  				var mittelwertPlusVarianz1 = mittelwert + varianz;
	  				var mittelwertPlusVarianz2 = mittelwert + 2*varianz;
	  				var mittelwertPlusVarianz3 = mittelwert + 3*varianz;
	  				
	  				var mittelwertMinusVarianz1 = mittelwert - varianz;
	  				var mittelwertMinusVarianz2 = mittelwert - 2*varianz;
	  				var mittelwertMinusVarianz3 = mittelwert - 3*varianz;
	  				
	  				console.log('ECHONEST GENRE DATA ARTIST HOTNESS GENRE SPANNE 1 VON: '+ mittelwertMinusVarianz1+' bis '+mittelwertPlusVarianz1+' = 68% ABDECKUNG');
	  				console.log('ECHONEST GENRE DATA ARTIST HOTNESS GENRE SPANNE 2  VON: '+ mittelwertMinusVarianz2+' bis '+mittelwertPlusVarianz2+ ' = 95% BADECKUNG');
	  				console.log('ECHONEST GENRE DATA ARTIST HOTNESS GENRE SPANNE 3  VON: '+ mittelwertMinusVarianz3+' bis '+mittelwertPlusVarianz3 +' = 99% ABDECKUNG');
	  			}
            });
	
	

}


function getGenreInfo(){
	console.log('echonestGenreData getGenreInfo() was called');
	var randomNumber =  Math.floor(Math.random()*100);
	var url = 'http://developer.echonest.com/api/v4/artist/search?_='+randomNumber;
		
	var args = {
			 api_key: 'BNV9970E1PHXZ9RQW',
		     format:'json',
		     bucket : ['hotttnesss'],
		     sort : 'hotttnesss-asc',
		     results: '10'
	}	
	
	
	
	//Test mit den ersten fünf Genres
	var fiveGenreNamesArray = new Array();
	
	for(var i =0; i<5;i++){
		fiveGenreNamesArray[i] = genreArray[i];
	}
	
	fiveGenreNamesArray.forEach(function(entry){
		args['genre'] = entry;
		$.getJSON(url, args,
		            function(genreData) {
			  			if (checkResponse(genreData)) {
			  			
			  					 console.log('ECHONEST GENRE DATA FOR GENRE '+entry+': '+JSON.stringify(genreData ));
			  				
			  				
			  				
			  				
			  				
			  				 
			  			}
		            });
	});
	
	
	//Test mit fünf Genres
	
	var fiveGenreNamesArray = new Array();
	
	fiveGenreNamesArray =['reggae', 'dancehall', 'hip hop' , 'psychedelic trance', 'acid jazz'];
	
	fiveGenreNamesArray.forEach(function(entry){
		args['genre'] = entry;
		$.getJSON(url, args,
		            function(genreData) {
			  			if (checkResponse(genreData)) {
			  				var arrayHotnessValues = new Array();
			  				console.log('GENRE '+entry+' Ascending');
			  				for(var i = 0; i<genreData.response.artists.length;i++){
			  					arrayHotnessValues.push(genreData.response.artists[i].hotttnesss);
			  					console.log('artist hotness asc for '+genreData.response.artists[i].name+': '+genreData.response.artists[i].hotttnesss);
			  					
			  				}
			  					
			  					 //console.log('ECHONEST GENRE DATA HOTNESS ASCENDING FOR GENRE '+entry+': '+ arrayHotnessValues);
			  				
			  				
			  				
			  				
			  				
			  				 
			  			}
		            });
	});
	
		
	
	var args1 = {
			 api_key: 'BNV9970E1PHXZ9RQW',
		     format:'json',
		     bucket : ['hotttnesss'],
		     sort : 'hotttnesss-desc',
		     results: '10'
	}	
	
	fiveGenreNamesArray.forEach(function(entry){
		args1['genre'] = entry;
		$.getJSON(url, args1,
		            function(genreData) {
			  			if (checkResponse(genreData)) {
			  				var arrayHotnessValues = new Array();
			  				console.log('GENRE '+entry+' Descending');
			  				for(var i = 0; i<genreData.response.artists.length;i++){
			  					arrayHotnessValues.push(genreData.response.artists[i].hotttnesss);
			  					console.log('artist hotness desc for '+genreData.response.artists[i].name+': '+genreData.response.artists[i].hotttnesss);
			  					
			  				}
			  					
			  					 //console.log('ECHONEST GENRE DATA HOTNESS DESCENDING FOR GENRE '+entry+': '+ arrayHotnessValues);
			  				
			  				
			  				
			  				
			  				
			  				 
			  			}
		            });
	});	
	
	
	
	
	

	
	
}

function  getSongHotnesValuesForGenre(){
//get song hotness data for genre

	var fiveGenreNamesArray = new Array();
	
	fiveGenreNamesArray =['reggae', 'dancehall', 'hip hop' , 'psychedelic trance', 'acid jazz'];
	
	var urlHotnes = 'http://developer.echonest.com/api/v4/song/search?';
	
	var args = {
			 api_key: 'BNV9970E1PHXZ9RQW',
		     format:'json',
		     bucket : ['song_hotttnesss'],
		     sort : 'song_hotttnesss-desc',
		     results: '10',
		    	
			
	}
	
	
	fiveGenreNamesArray.forEach(function(entry){
		
	
		args['style'] = entry;
		
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
			  					
			  				console.log('ECHONEST GENRE DATA SONG HOTNESS DESCENDING FOR GENRE '+entry+': '+ arraySongHotnessValues);
			  				
			  				
			  				
			  				
			  				
			  				 
			  			}
		            });
	});
	
	
	//get the song hotnes values de
	
	var args1 = {
			 api_key: 'BNV9970E1PHXZ9RQW',
		     format:'json',
		     bucket : ['song_hotttnesss'],
		     sort : 'song_hotttnesss-asc',
		     results: '10',
		    	
			
	}
	fiveGenreNamesArray.forEach(function(entry){
		
		
		args1['style'] = entry;
		
		
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
			  					
			  				console.log('ECHONEST GENRE DATA SONG HOTNESS ASCENDING FOR GENRE '+entry+': '+ arraySongHotnessValues);
			  				
			  				
			  				
			  				
			  				
			  				 
			  			}
		            });
	});
	
	
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
