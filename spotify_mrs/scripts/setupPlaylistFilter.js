require([
  '$api/models',
 'scripts/echonestDynamic'
 
], function(models,echonestDynamic ) {
  'use strict';


  var setupPlaylistFilter = function() {
   setupPlaylistFilter1(echonestDynamic);
 
  };
  
  
  var setAutoCompleteArray = function(IDandNameObjectArray) {
	  setAutoCompleteArray1(IDandNameObjectArray);
	 
	  };

  exports.setupPlaylistFilter = setupPlaylistFilter;
  exports.setAutoCompleteArray = setAutoCompleteArray;
});

var tasteProfileIDsArray = new Array();
var playlistNamesArray = new Array();


function setupPlaylistFilter1(echonestDynamic){
	console.log('setupPlaylistFilter1() was called');
	
	//tasteProfileIDsArray.push('CARHJKV140E8922AA8' );
	
	  $( "#tags1" ).autocomplete({
    		// source: playlistNamesArray,
    		 minLength: 0,
    		
    		 select: function( event, ui){
    			
    			 console.log('EventHandlerPlaylist List sent this playlist name: '+ui.item.label);
    			
    			 for (var i=0; i<=tasteProfileIDsArray.length-1; i++){  
    				 
    				if(ui.item.label == tasteProfileIDsArray[i].name){
    					console.log('TRYING TO CHANGE TO PLAYLIST SIMILARITY WITH ID: '+tasteProfileIDsArray[i].tasteProfileID);
    				
    					echonestDynamic.changeToPlaylistSimilarity(tasteProfileIDsArray[i]);
    					break;
    				}
    				
    			
    		};
    			 
    			 
    		
    		
    		
    		
    			 
    			 
    			$(this).val(''); return false;
    			 
    		 }
         
        
    		
    		 }).focus(function(){     
    		        //Use the below line instead of triggering keydown
    		        //$(this).data("autocomplete").search($(this).val());
    		        //$(this).autocomplete("search");
    			 
    		        $(this).autocomplete('search', $(this).val());
    		    });
	 
	 
	 
	
}








function setAutoCompleteArray1(IDandNameObjectArray){
	console.log('setAutoCompleteArray1() was called');
	 tasteProfileIDsArray = IDandNameObjectArray;
	 console.log('ARRAY USED FOR AUTOCOMPLETE PLAYLIST SIMILARITY: '+JSON.stringify(tasteProfileIDsArray));
	 
 for (var i=0; i<=IDandNameObjectArray.length-1; i++){  
		 
		 //var playlistName = JSON.stringify(IDandNameObjectArray[i].name);
		 var playlistName = IDandNameObjectArray[i].name;
		 playlistNamesArray.push(playlistName);
	
}

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