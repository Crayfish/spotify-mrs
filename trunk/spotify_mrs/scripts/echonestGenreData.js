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
		  				
		  				// console.log('ECHONEST GENRE DATA: '+genreArray );
		  				
		  				 getGenreInfo();
		  				 
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
/*	var fiveGenreNamesArray = new Array();
	
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
	});*/
	
	
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
	
	
	//Test auf Normalverteilung 
	var args2 = {
			 api_key: 'BNV9970E1PHXZ9RQW',
		     format:'json',
		     bucket : ['hotttnesss'],
		     //sort : 'hotttnesss-desc',
		     results: '100',
		    	genre: 'reggae' 
	}	
	
	
	$.getJSON(url, args2,
            function(genreData) {
	  			if (checkResponse(genreData)) {
	  				var arrayHotnessValues = new Array();
	  				//console.log('GENRE '+entry+' Descending');
	  				for(var i = 0; i<genreData.response.artists.length;i++){
	  					arrayHotnessValues.push(genreData.response.artists[i].hotttnesss);
	  					//console.log('artist hotness desc for '+genreData.response.artists[i].name+': '+genreData.response.artists[i].hotttnesss);
	  					
	  				}
	  					
	  				arrayHotnessValues.sort(function(a,b){return a-b});
	  				console.log('ECHONEST GENRE DATA REGGAE ARTIST HOTNESS ASCENDING: '+ arrayHotnessValues);
	  				
	  				
	  				
	  				
	  				
	  				 
	  			}
            });
	
	
	
	//Funktion für alle Genres
/*	genreArray.forEach(function(entry){
		 args['genre'] = entry;
		 
		  $.getJSON(url, args,
		            function(genreData) {
			  			if (checkResponse(genreData)) {
			  				
			  				for (var i = 0; i< genreData.response.length; i++) {
			  					 console.log('ECHONEST GENRE DATA FOR GENRE '+entry+': '+JSON.stringify(genreData ));
			  				}
			  				
			  				
			  				
			  				
			  				 
			  			}
		            });
		
		
		
	});*/
	
	
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
