require([
  '$api/models',
  'scripts/setupPlaylistFilter'
  

 
], function(models, setupPlaylistFilter) {
  'use strict';

 

  var createTasteProfile = function() {
	  createTasteProfile1(setupPlaylistFilter);
 
  };
  
  var  getAllTasteProfileIDs = function() {
	  getAllTasteProfileIDs1();
 
  };
  
  
  var  deleteAllTasteProfiles = function() {
	  deleteAllTasteProfiles1();
 
  };
  
  var  getBasicInformationOfAllTasteProfiles = function() {
	  getBasicInformationOfAllTasteProfiles1();
 
  };
  

  exports.deleteAllTasteProfiles = deleteAllTasteProfiles;
  exports.createTasteProfile = createTasteProfile;
  exports.getAllTasteProfileIDs = getAllTasteProfileIDs;
  exports.getBasicInformationOfAllTasteProfiles = getBasicInformationOfAllTasteProfiles;
});


var arrayProfileIDsAndPlaylistNames = new Array();
var arrayPlaylistObjects = new Array();
var readyToSetAutoComplete = false;
var numberOfPlaylists = 0;

function getBasicInformationOfAllTasteProfiles1(){
	var randomNumber =  Math.floor(Math.random()*100);
	var listTasteProfileIDsURL = 'http://developer.echonest.com/api/v4/catalog/list?api_key=BNV9970E1PHXZ9RQW&format=json'+'&_='+randomNumber;
	var getBasicInfoURL = 'http://developer.echonest.com/api/v4/catalog/profile?api_key=BNV9970E1PHXZ9RQW&format=json';
		
	$.getJSON(listTasteProfileIDsURL, 
	    		{'results':'100'
	            },
	            function(data) {
	        if (checkResponse(data)) {
	        	 //console.log('LIST OF ALL TASTE PROFILE IDs: '+JSON.stringify(data)); 
	        	 //console.log('LIST OF ALL TASTE PROFILE IDs NUMBER OF TASTE PROFILES: '+data.response.catalogs.length); 
	        	 
	        	 
	        	 //get Basic Info of all taste Profiles	
	       
	        		console.log('NUMBER OF PROFILES TO GET BASIC INFO: '+ data.response.total);
	        		//var arrayAllTasteProfileIDs = JSON.parse(JSON.stringify(data1.response.catalogs));
	        		var arrayAllTasteProfileIDs = data.response.catalogs;
	        		
	        		//console.log('ARRAY FOR DELETING ALL TASTE PROFILES: '+arrayAllTasteProfileIDs);
	        		//console.log('arrayAllTasteProfileIDs LENGHT: '+arrayAllTasteProfileIDs.length);
	        		
	        		
	        		
	        		/*var arrayDeleteIDs = new Array();
	        		for(var i=0; i < arrayAllTasteProfileIDs.length; i++){
	        			arrayDeleteIDs.push(arrayAllTasteProfileIDs[i]);
	        		}
	        		
	        		console.log('ARRAY DELETE IDS: '+arrayDeleteIDs);*/
	        		
	        		
	        		for(var i= 0; i < arrayAllTasteProfileIDs.length; i++){
	        			var idForInfo = JSON.stringify(arrayAllTasteProfileIDs[i].id).replace(/"/g , "");
	        			console.log('ID FOR INFO: '+idForInfo);
	        			
	        			$.getJSON(getBasicInfoURL, 
	        		    		{'id':idForInfo
	        		            },
	        		            function(data) {
	        		        if (checkResponse(data)) {
	        		        	
	        		        	 
	        		        	 //print out Basic Info of all taste Profiles	
	        		       
	        		        		console.log('BASIC INFO TASTE PROFILE: '+ JSON.stringify(data.response));
	        		        	
	        		    
	        		        
	        		        
	        		        } else {
	        		            info("trouble getting results");
	        		        }
	        		    });	
	        			
	        		
	        			
	        			
	        		};
	    
	        
	        
	        } else {
	            info("trouble getting results");
	        }
	    });	
	
	
}

function createTasteProfile1(setupPlaylistFilter){
	
	console.log('createTasteProfile () was called');
	
	
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
    
/*    
    var jsonDataVariable = JSON.stringify([
                            {
                                "item": {
                                    "item_id": "0CF07A178DBF78F7",
                                    "track_id": "spotify-WW:track:62HPkBnymwKwrMrT9SLbOx"
                                }
                            },
                            {
                                "item": {
                                    "item_id": "0CF07A178DBF78B9",
                                    "track_id": "spotify-WW:track:7v3cWjR0s7OGMwFUKNGxhy"
                                }
                            },
                            {
                                "item": {
                                    "item_id": "0CF07A178DBF78Z5",
                                    "track_id": "spotify-WW:track:43dn0HVATaRnIDqY2ZUEjIB"
                                }
                            }
                        ]);*/
                 
    
    
    //get all playlist Information from local storage
    
  
        for (var i=0; i<=localStorage.length-1; i++)  
        {   
           var  key = localStorage.key(i);  
           var playlistObject = JSON.parse(localStorage.getItem(key));  
            
            //console.log('NEXT PLAYLIST OBJECT: '+JSON.stringify(playlistObject));
            
            arrayPlaylistObjects.push( playlistObject);
        }  
   
    
    
        numberOfPlaylists = arrayPlaylistObjects.length;
	
	
	
	//create a tasteProfile for each playlistObject
	
        var createURL = "http://developer.echonest.com/api/v4/catalog/create";  
       
        
	// for (var i=0; i<=arrayPlaylistObjects.length-1; i++){  
		//var notYetFinishedTransmittingProfileData = true;
		//var readyforNextOne = true;
		//var i =7;
		
        //while(notYetFinishedTransmittingProfileData){
        	//if(readyforNextOne){
        		//notYetFinishedTransmittingProfileData = false;
		
		arrayPlaylistObjects.forEach(function(entry) {
			console.log(' ENTRY OF arrayPlaylistObjects: '+JSON.stringify(entry));
		
		
		
			
		
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
                    	            		setupPlaylistFilter.setAutoCompleteArray(arrayProfileIDsAndPlaylistNames);
                    	            	}
                    	            	
                    	            });	
                    		
                    	
                    });
        	
		});//end of forEachLoop
        	//}//ifEnde
       // }//while ende
		
		
	
	// }//for schleife Ende
	
	
	
}




function getAllTasteProfileIDs1(){
	var randomNumber =  Math.floor(Math.random()*100);
	var listTasteProfileIDsURL = 'http://developer.echonest.com/api/v4/catalog/list?api_key=BNV9970E1PHXZ9RQW&format=json'+'&_='+randomNumber;
	
		$.getJSON(listTasteProfileIDsURL, 
	    		{'results':'100'
	            },
	            function(data) {
	        if (checkResponse(data)) {
	        	 console.log('LIST OF ALL TASTE PROFILE IDs: '+JSON.stringify(data)); 
	        	 //console.log('LIST OF ALL TASTE PROFILE IDs NUMBER OF TASTE PROFILES: '+data.response.catalogs.length); 
	        	 
	        	 
	        	 //deleteAllTasteProfiles(data);	
	       
	        
	    
	        
	        
	        } else {
	            info("trouble getting results");
	        }
	    });	
}


function deleteAllTasteProfiles1(){
	
var randomNumber =  Math.floor(Math.random()*100);
	var listTasteProfileIDsURL = 'http://developer.echonest.com/api/v4/catalog/list?api_key=BNV9970E1PHXZ9RQW&format=json'+'&_='+randomNumber;
	var deleteURL = 'http://developer.echonest.com/api/v4/catalog/delete';
		
	$.getJSON(listTasteProfileIDsURL, 
	    		{'results':'200'
	            },
	            function(data) {
	        if (checkResponse(data)) {
	        	 console.log('LIST OF ALL TASTE PROFILE IDs: '+JSON.stringify(data)); 
	        	 //console.log('LIST OF ALL TASTE PROFILE IDs NUMBER OF TASTE PROFILES: '+data.response.catalogs.length); 
	        	 
	        	 
	        	 //delete All Taste Profiles;	
	       
	        		console.log('NUMBER OF PROFILES TO DELETE: '+ data.response.total);
	        		//var arrayAllTasteProfileIDs = JSON.parse(JSON.stringify(data1.response.catalogs));
	        		var arrayAllTasteProfileIDs = data.response.catalogs;
	        		
	        		console.log('ARRAY FOR DELETING ALL TASTE PROFILES: '+arrayAllTasteProfileIDs);
	        		console.log('arrayAllTasteProfileIDs LENGHT: '+arrayAllTasteProfileIDs.length);
	        		
	        		
	        		
	        		/*var arrayDeleteIDs = new Array();
	        		for(var i=0; i < arrayAllTasteProfileIDs.length; i++){
	        			arrayDeleteIDs.push(arrayAllTasteProfileIDs[i]);
	        		}
	        		
	        		console.log('ARRAY DELETE IDS: '+arrayDeleteIDs);*/
	        		
	        		
	        		for(var i= 0; i < arrayAllTasteProfileIDs.length; i++){
	        			var IdToBeDeleted = JSON.stringify(arrayAllTasteProfileIDs[i].id).replace(/"/g , "");
	        			console.log('ID TO BE DELETED: '+IdToBeDeleted);
	        			
	        			
	        			
	        			$.post(deleteURL, 
	        		    		{
	        		    	'api_key':'BNV9970E1PHXZ9RQW',
	        		    	'format':'json',
	        		    	'id': IdToBeDeleted,
	        		    	    	    	
	        		            }).done(function(data) {
	        		            	console.log('tasteProfile delete call response: '+JSON.stringify(data.response));
	        		            	
	        		            	
	        		            	
	        		         
	        		            	
	        		            	
	        		          
	        		            	
	        		            });	
	        			
	        			
	        		};
	    
	        
	        
	        } else {
	            info("trouble getting results");
	        }
	    });		
	
	
	
	/*//Test mit einer ID
	
	$.post(deleteURL, 
    		{
    	'api_key':'BNV9970E1PHXZ9RQW',
    	'format':'json',
    	'id':'CACWUDH140E8C6EDEB'
    	    	    	
            }).done(function(data) {
            	console.log('tasteProfile delete ONE ID call response: '+JSON.stringify(data.response));
            	
            	
            	
         
            	
            	
          
            	
            });	*/
	
	
	

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




/*readyforNextOne = false;
var tasteProfileName = JSON.stringify(arrayPlaylistObjects[i].playlistName);
//var jsonDataVariable = JSON.stringify(arrayPlaylistObjects[i].itemArray );  
var jsonDataVariable = arrayPlaylistObjects[i].itemArray; 

console.log('TASTE PROFILE NAME: '+ tasteProfileName);
console.log('TASTE PROFILE DATA USED FOR TRANSMISSION TO ECHONEST: '+ JSON.stringify(arrayPlaylistObjects[i].itemArray ));

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
	            	
	              	i++;
	            	readyforNextOne = true;
	          
	            	
	            	
	           //if all playlist have a profile set autocomplete for playlist similarity
	            	
	            	numberOfPlaylists = numberOfPlaylists-1;
	            	if(numberOfPlaylists == 0){readyToSetAutoComplete = true;
	            								notYetFinishedTransmittingProfileData = false;
	            	}
	            	readyToSetAutoComplete = true;
	            	if(readyToSetAutoComplete){
	            		getAllTasteProfileIDs1();
	            		setupPlaylistFilter.setAutoCompleteArray(arrayProfileIDsAndPlaylistNames);
	            	}
	            	
	            });	
		
	
});*/



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