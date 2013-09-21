require([
  '$api/models',
  //'scripts/setupPlaylistFilter',
  '/strings/main.lang'
 
], function(models, /*setupPlaylistFilter,*/ mainStrings) {
  'use strict';

  //Setup a short-hand to get translation
  var _ = SP.bind(mainStrings.get, mainStrings);

  var writeHeading = function() {
    document.querySelector('h1').innerHTML = _('Hier ensteht ein transparenter Music Recommender');
 
  };
  
  var createAllTasteProfiles = function() {
	 createAllTasteProfiles1();
	 
	  };
  
  exports.createAllTasteProfiles = createAllTasteProfiles;
  exports.writeHeading = writeHeading;
});

var arrayProfileIDsAndPlaylistNames = new Array();
var arrayPlaylistObjects = new Array();
var readyToSetAutoComplete = false;
var numberOfPlaylists = 0;

function  createAllTasteProfiles1(){
	console.log('createAllTasteProfiles1() was called ');
	
//test local storage
	
    if (localStorage){
    	console.log('LOCALSTORAGE IS SUPPORTED');
    }else{
    	console.log('LOCALSTORAGE IS NOT SUPPORTED');
    }  
	
	

                 
    
    
    //get all playlist Information from local storage
    
  
        for (var i=0; i<localStorage.length; i++)  
        	
        {   
           var  key = localStorage.key(i);  
           var playlistObject = JSON.parse(localStorage.getItem(key));  
            
            //console.log('NEXT PLAYLIST OBJECT: '+JSON.stringify(playlistObject));
            
            arrayPlaylistObjects.push( playlistObject);
        }  
   
    
    
        numberOfPlaylists = arrayPlaylistObjects.length;
	
	
	
	//create a tasteProfile for each playlistObject
	
        var createURL = "http://developer.echonest.com/api/v4/catalog/create";  
       
        
	
		
		arrayPlaylistObjects.forEach(function(entry) {
			//console.log(' ENTRY OF arrayPlaylistObjects: '+JSON.stringify(entry));
		
		
		
			
		
					//readyforNextOne = false;
        		 var tasteProfileName = JSON.stringify(entry.playlistName);
        		console.log('TASTE PROFILE NAME: '+ tasteProfileName);
        		 //var jsonDataVariable = JSON.stringify(arrayPlaylistObjects[i].itemArray );  
        		 var jsonDataVariable = entry.itemArray; 
        		 
        		
        		 //console.log('TASTE PROFILE DATA USED FOR TRANSMISSION TO ECHONEST: '+ JSON.stringify(arrayPlaylistObjects[i].itemArray ));
        	
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
                    	
                    	//console.log('Taste Profile Id: '+profile_id );
                    	
                    	
                    	
                    	
                    	
                    	//addSongsToProfile();
                    	
                    	var updateURL = "http://developer.echonest.com/api/v4/catalog/update";
                    	
                    	
                    		$.post(updateURL, 
                    	    		{
                    	    	'api_key':'BNV9970E1PHXZ9RQW',
                    	    	'format':'json',
                    	    	'id': profile_id,
                    	    	'data_type':'json',
                    	    	'data':  JSON.stringify(jsonDataVariable )       	    	
                    	            }).done(function(data) {
                    	            	console.log('tasteProfile update call response: '+JSON.stringify(data.response));
                    	            	
                    	            	
                    	            	
                    	         //add Taste Profile Object {id and name} to array    	
                    	            	
                    	            	var nameAndIdObject = {};
                    	            	
                    	            	var profileName1 = profileName.substring(4).replace(/"/g , "");
                    	            	//console.log('PROFILE NAME USED FOR IDandNAME OBJECT: '+profileName1);
                    	            	//console.log('UND SO SIEHT EIN STRING AUS: '+"das ist ein String");
                    	            	nameAndIdObject.name=  profileName1;
                    	            	nameAndIdObject.tasteProfileID = profile_id;
                    	            	
                    	            	arrayProfileIDsAndPlaylistNames.push(nameAndIdObject);  		
                    	            	console.log('ARRAY TASTE PROFILE OBJECTS: '+JSON.stringify(arrayProfileIDsAndPlaylistNames));
                    	            	
                    	              	//i++;
                    	            	//readyforNextOne = true;
                    	          
                    	            	
                    	            	
                    	           //if all playlist have a profile set autocomplete for playlist similarity
                    	            	
                    	            	numberOfPlaylists = numberOfPlaylists-1;
                    	            	if(numberOfPlaylists == 0){readyToSetAutoComplete = true;
                    	            								//notYetFinishedTransmittingProfileData = false;
                    	            	}
                    	            	//readyToSetAutoComplete = true;
                    	            	if(readyToSetAutoComplete){
                    	            		getAllTasteProfileIDs1();
                    	            		//setupPlaylistFilter.setAutoCompleteArray(arrayProfileIDsAndPlaylistNames);
                    	            	}
                    	            	
                    	            });	
                    		
                    	
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
