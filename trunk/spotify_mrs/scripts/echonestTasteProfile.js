require([
  '$api/models',

 
], function(models) {
  'use strict';

 

  var createTasteProfile = function() {
	  createTasteProfile1();
 
  };

  exports.createTasteProfile = createTasteProfile;
});


var profile_id ='';

function createTasteProfile1(){
	console.log('createTasteProfile () was called');
	
	var createURL = "http://developer.echonest.com/api/v4/catalog/create";
	
	//curl -F "api_key=BNV9970E1PHXZ9RQW" -F "format=json" -F "type=artist" -F "name=test_artist_catalog"
	
	$.post(createURL, 
    		{
    	'api_key':'BNV9970E1PHXZ9RQW',
    	'format':'json',
    	'type':'song',
    	'name':'TasteProfile'+Math.floor(Math.random()*10000),
    	
            }).done(function(data) {	
            	console.log(JSON.stringify(data.response));
            	
            	profile_id = data.response.id;
            	
            	console.log('Taste Profile Id: '+profile_id );
            	
            	
            	
            	//reading JSON Data from a file
            	
            	 $.getJSON('sp://cover/TasteProfileJSONS/testProfile.json', function(data)
                         {
                             console.log('READ FROM A JSON FILE: ' +JSON.stringify(data));
                            
                            
                         });
            	
            	
            	//addSongsToProfile();
            	
            	var updateURL = "http://developer.echonest.com/api/v4/catalog/update";
            	
        
          
            	                    
            	var jsonDataVariable = [
            	                        	{
            	                        		"item":
            	                        		{
            	                        			"item_id": "0CF07A178DBF78F7",
            	                        			 "track_id": "spotify-WW:track:40UKRC2BtRJxHvjgJjs0h1",
            	                        			
            	                        		}
            	                        	},
            	                        	{
            	                        		"item":
            	                        		{
            	                        			"item_id": "0CF07A178DBF78B9",
            	                        			 "track_id": "spotify-WW:track:4K8Hy4KiqptXWHO5mDbKne",
            	                        			
            	                        		}
            	                        	},
            	                        	{
            	                        		"item":
            	                        		{
            	                        			"item_id": "0CF07A178DBF78Z5",
            	                        			 "track_id": "spotify-WW:track:2iYbAoOny6ua9s74TKSa0B",
            	                        			
            	                        		}
            	                        	}
 	                                ];
  
            	
            		$.post(updateURL, 
            	    		{
            	    	'api_key':'BNV9970E1PHXZ9RQW',
            	    	'format':'json',
            	    	'id': profile_id,
            	    	'data_type':'json',
            	    	'data':   JSON.stringify(jsonDataVariable )       	    	
            	            }).done(function(data) {
            	            	console.log('tasteProfile update call response: '+JSON.stringify(data.response));
            	            	
            	            	
            	            	
            	            	
            	            	
            	            	
            	            	
            	            		
            	            		
            	            	
            	            });	
            		
            	
            });
	

	
	
	
}







/*function addSongsToProfile(){
	
	var updateURL = "http://developer.echonest.com/api/v4/catalog/update";
	

	//-F "api_key=BNV9970E1PHXZ9RQW" -F "data_type=json" -F "format=json" -F "id=CAJTFEO131216286ED" -F "data=@data_file.json"
	
	
	$.post(updateURL, 
    		{
    	'api_key':'BNV9970E1PHXZ9RQW',
    	'data_type':'json',
    	'format':'json',
    	'id': profile_id ,
    	'data': [
    {
        "action": "update"
        "item":
            {
                "item_id": "0CF07A178DBF78F7",
                "rating": 7
            }
    },
    
]
    	
            }).done(function(data) {
            	console.log(JSON.stringify(data.response));
            	
            	
            	
            });
	
	
}*/



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