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
    		 source: playlistNamesArray,
    		 minLength: 0,
    		
    		 select: function( event, ui){
    			
    			 console.log('EventHandlerPlaylist List sent event');
    			 echonestDynamic.changeToPlaylistSimilarity( ui.item.label);
    			 
    			$(this).val(''); return false;
    			 
    		 }
         
        
    		
    		 });
	 
	 
	 
	
}



function setAutoCompleteArray1(IDandNameObjectArray){
	console.log('setAutoCompleteArray1() was called');
	 tasteProfileIDsArray = IDandNameObjectArray;
	 
 for (var i=0; i<=IDandNameObjectArray.length-1; i++){  
		 
		 var playlistName = JSON.stringify(IDandNameObjectArray[i].name);
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