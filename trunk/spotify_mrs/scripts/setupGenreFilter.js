require([
  '$api/models',
 'scripts/echonestDynamic',
 'scripts/apiKey'
 
], function(models,echonestDynamic, apiKey ) {
  'use strict';

  

  var setupGenreFilter = function() {
   setupGenreFilter1(echonestDynamic, apiKey);
 
  };

  exports.setupGenreFilter = setupGenreFilter;
});

var genreArray = new Array();
var echonestApiKey = null;

function setupGenreFilter1(echonestDynamic, apiKey){
	console.log('setupGenreFilter() was called');
	
	echonestApiKey = apiKey.getApiKey();
	
	 getAllEchonestGenres(echonestDynamic);
	 
	 
	 
	
}






function getAllEchonestGenres(echonestDynamic){
	 var randomNumber =  Math.floor(Math.random()*100);
	var genreQueryUrl ='http://developer.echonest.com/api/v4/artist/list_genres?api_key='+echonestApiKey+'&format=json&_='+randomNumber;
	
	var genreArray = new Array();
	
	  $.getJSON(genreQueryUrl,
				{
				//'id':artistId
					//artist_id3,
				//'artist':artist_id3
	            },
	            function(genreData) {
	            	if (checkResponse(genreData)) {
	            	
	            		for (var i = 0; i < genreData.response.genres.length; i++) {
	            			genreArray.push(genreData.response.genres[i].name);
	                
	            		}
	                
	                //console.log('SETUP GENRE FILTER Genre List: '+genreArray);
	                 
	                	
	                $( "#tags" ).autocomplete({
	           		 source: genreArray,
	           		
	           		 select: function( event, ui){
	           			
	           			 console.log('EventHandler Genre List sent event');
	           			 resetSliders();
	           			 echonestDynamic.changeToGenreSimilarity( ui.item.label);
	           			 
	           			$(this).val(''); return false;
	           			 
	           		 }
	                
	               
	           		 //{console.log("A genre was choossen: "+  ui.item.label)}
	           		 //select: function( event, ui ) {console.log("A genre was choossen: "+  $(this).attr('name') )}
	           		 });
	                
	               // $( "#tags" ).on( "autocompletechange", function( event, ui ) {console.log('EventHandler Genre List sent event CHANGE')} );
	                
	            	   
	            	}
	            });
	
	
}


function resetSliders(){
	$("#slider-songHot").slider( "value", 0 );
	$("#slider-songHot").slider( "option", "disabled", true );
	$("#slider-hot").slider( "value", 0 );
	$("#slider-hot").slider( "option", "disabled", true );
	$("#slider-pop").slider( "value", 0 );
	$("#slider-pop").slider( "option", "disabled", true );

	

	
	
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
