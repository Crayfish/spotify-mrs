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
	                 minLength: 0,
	           		 source: genreArray,
	           		
	           		 select: function( event, ui){
	           			
	           			 console.log('EventHandler Genre List sent event');
	           			 resetSliders();
	           			 echonestDynamic.changeToGenreSimilarity( ui.item.label);
	           			 
	           			$(this).blur(); 
	           			$(this).val(''); return false;
	           			 
	           		 }
	                
	               
	           		
	           		 }).focus(function(){     
	     		        //Use the below line instead of triggering keydown
	     		        //$(this).data("autocomplete").search($(this).val());
	     		        //$(this).autocomplete("search");
	     			 
	     		        $(this).autocomplete('search', $(this).val());
	     		    });
	                
	              
	                
	            	   
	            	}
	            });
	
	  
	  
	  //when enter key is pressed down, select if it is in genre array
	  $( "#tags" ).keydown(function(event) {
		  
			if(event.keyCode == 13) {
				console.log( "SETUP GENERE FILTER enter key was pressed down" );
				
				//get the current text written into the form field
				var currentText =  $( "#tags" ).val();
				//console.log("SETUP GENERE FILTER currently entered text: "+ currentText)
				//check if it is the genre array
				if(jQuery.inArray( currentText, genreArray)!= -1){
					console.log("SETUP GENERE FILTER  entered text matches genre name: "+ currentText)
					 resetSliders();
					echonestDynamic.changeToGenreSimilarity(currentText);
					$( "#tags" ).val('');
					$( "#tags" ).blur();
				}
				
				
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

	$("#artistVarietySlider").slider( "value", 50 );
	$('.yearpick').val('off');
	
	
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
