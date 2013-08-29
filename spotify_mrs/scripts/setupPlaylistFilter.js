require([
  '$api/models',
 'scripts/echonestDynamic'
 
], function(models,echonestDynamic ) {
  'use strict';


  var setupPlaylistFilter = function() {
   setupPlaylistFilter1(echonestDynamic);
 
  };

  exports.setupPlaylistFilter = setupPlaylistFilter;
});

var tasteProfileIDsArray = new Array();

function setupPlaylistFilter1(echonestDynamic){
	console.log('setupPlaylistFilter1() was called');
	
	tasteProfileIDsArray.push('CAJRDGH140C9967652' );
	
	  $( "#tags1" ).autocomplete({
    		 source: tasteProfileIDsArray,
    		
    		 select: function( event, ui){
    			
    			 console.log('EventHandlerPlaylist List sent event');
    			 echonestDynamic.changeToPlaylistSimilarity( ui.item.label);
    			 
    			$(this).val(''); return false;
    			 
    		 }
         
        
    		
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