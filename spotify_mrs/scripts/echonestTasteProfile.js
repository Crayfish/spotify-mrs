require([
  '$api/models',
  'scripts/setupPlaylistFilter'
  

 
], function(models, setupPlaylistFilter) {
  'use strict';

 

  var createTasteProfile = function() {
	  createTasteProfile1(setupPlaylistFilter);
 
  };

  exports.createTasteProfile = createTasteProfile;
});


var arrayProfileIDsAndPlaylistNames = new Array();
var arrayPlaylistObjects = new Array();
var readyToSetAutoComplete = false;
var numberOfPlaylists = 0;



function createTasteProfile1(setupPlaylistFilter){
	
	console.log('createTasteProfile () was called');
	
	//arrayProfileIDsAndPlaylistNames = new Array();
	//arrayPlaylistObjects = new Array();
	
	
	//test local storage
	
    if (localStorage){
    	console.log('LOCALSTORAGE IS SUPPORTED');
    }else{
    	console.log('LOCALSTORAGE IS NOT SUPPORTED');
    }  
	
	
    //Test mit einer Playlist
    
/*    var hipHop = JSON.parse(localStorage.getItem('spotify:user:@:playlist:0gOAverzbND0xpwY49uF4q'));
    
   //console.log('HIPHOP: '+JSON.stringify(JSON.parse( hipHop ) ));
   console.log('HIPHOP: '+JSON.stringify(hipHop ) );
   
    console.log('HIPHOP ITEM ARRAY: '+JSON.stringify( hipHop.itemArray ) );
    
    var car = [
               {
                   "item": {
                       "item_id": "0CF07A178DBF78F7",
                       "track_id": "spotify-WW:track:40UKRC2BtRJxHvjgJjs0h1"
                   }
               },
               {
                   "item": {
                       "item_id": "0CF07A178DBF78B9",
                       "track_id": "spotify-WW:track:4K8Hy4KiqptXWHO5mDbKne"
                   }
               },
               {
                   "item": {
                       "item_id": "0CF07A178DBF78Z5",
                       "track_id": "spotify-WW:track:2iYbAoOny6ua9s74TKSa0B"
                   }
               }
           ];
    

 

    
    
    
   
    
    
  
    //localStorage.setItem( 'car', JSON.stringify(car) );
    //console.log( 'LOCAL STORAGE OUTPUT:'+JSON.stringify(JSON.parse( localStorage.getItem( 'car' ) ) ));
    
    
	
	
	var jsonDataVariable = JSON.stringify( hipHop.itemArray );
	//var jsonDataVariable = JSON.stringify(car);
	
	
	
	//reading JSON Data from a file
	
	 $.getJSON('sp://cover/TasteProfileJSONS/testProfile.json', function(data)
            {
                console.log('READ FROM A JSON FILE: ' +JSON.stringify(data));
               
                jsonDataVariable = JSON.stringify(data); 
                
            });
	 
	 //reading the Taste Profile Data from LOCAL HTMl5 Storage
	 //jsonDataVariable = JSON.stringify(JSON.parse( localStorage.getItem( 'car' ) ) );
	
	//jsonDataVariable = JSON.stringify(hipHop.itemArray);
	//jsonDataVariable = JSON.parse(hipHop.itemArray);
	//jsonDataVariable =  hipHop.itemArray;
	
	console.log('JSONDATAVARIABLE: '+jsonDataVariable)*/
    
    
    
    //get all playlist Information from local storage
    
  
        for (var i=0; i<=localStorage.length-1; i++)  
        {   
           var  key = localStorage.key(i);  
           var playlistObject = JSON.parse(localStorage.getItem(key));  
            
            console.log('NEXT PLAYLIST OBJECT: '+JSON.stringify(playlistObject));
            
            arrayPlaylistObjects.push( playlistObject);
        }  
   
    
    
        numberOfPlaylists = arrayPlaylistObjects.length;
	
	
	
	//create a tasteProfile for each playlistObject
	
        var createURL = "http://developer.echonest.com/api/v4/catalog/create";  
        
	 for (var i=0; i<=arrayPlaylistObjects.length-1; i++){  
		
		 var tasteProfileName = JSON.stringify(arrayPlaylistObjects[i].playlistName);
		 var jsonDataVariable = JSON.stringify(arrayPlaylistObjects[i].itemArray );   
		 
		 console.log('TASTE PROFILE NAME: '+ tasteProfileName);
	
	$.post(createURL, 
    		{
    	'api_key':'BNV9970E1PHXZ9RQW',
    	'format':'json',
    	'type':'song',
    	'name': Math.floor(Math.random()*10000)+tasteProfileName
    	
            }).done(function(data) {	
            	console.log(JSON.stringify(data.response));
            	
            	var profile_id = data.response.id;
            	var profileName = data.response.name;
            	
            	console.log('Taste Profile Id: '+profile_id );
            	
            	
            	
            	
            	
            	//addSongsToProfile();
            	
            	var updateURL = "http://developer.echonest.com/api/v4/catalog/update";
            	
        
          
            	                 
         
  
            	
            		$.post(updateURL, 
            	    		{
            	    	'api_key':'BNV9970E1PHXZ9RQW',
            	    	'format':'json',
            	    	'id': profile_id,
            	    	'data_type':'json',
            	    	'data':  jsonDataVariable        	    	
            	            }).done(function(data) {
            	            	console.log('tasteProfile update call response: '+JSON.stringify(data.response));
            	            	
            	            	
            	            	
            	         //add Taste Profile Object {id and name} to array    	
            	            	
            	            	var nameAndIdObject = {};
            	            	
            	            	var profileName1 = profileName.substring(4);
            	            	console.log('PROFILE NAME USED FOR IDandNAME OBJECT: '+profileName1);
            	            	nameAndIdObject.name=  profileName1;
            	            	nameAndIdObject.tasteProfileID = profile_id;
            	            	
            	            	arrayProfileIDsAndPlaylistNames.push(nameAndIdObject);  		
            	            	console.log('ARRAY TASTE PROFILE OBJECTS: '+JSON.stringify(arrayProfileIDsAndPlaylistNames));
            	            	
            	            	
            	           //if all playlist have a profile set autocomplete for playlist similarity
            	            	
            	            	numberOfPlaylists = numberOfPlaylists-1;
            	            	if(numberOfPlaylists == 0){readyToSetAutoComplete = true}
            	            	if(readyToSetAutoComplete){
            	            	setupPlaylistFilter.setAutoCompleteArray(arrayProfileIDsAndPlaylistNames);
            	            	}
            	            	
            	            });	
            		
            	
            });
	
	 }
	
	 //console.log(' XXXXXXXXXXXXXXXXXXXXXXXXXX ARRAY TASTE PROFILE OBJECTS: '+arrayProfileIDsAndPlaylistNames);
	
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