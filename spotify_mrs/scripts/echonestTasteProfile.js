require([
  '$api/models',
  'scripts/echonestDynamic'
  

 
], function(models, echonestDynamic /*setupPlaylistFilter*/) {
  'use strict';

  echonestDynamicScript = echonestDynamic;

  var initialCreateOfAllTasteProfile = function() {
	  initialCreateOfAllTasteProfile1(echonestDynamic);
 
  };
  
  var  getAllTasteProfileIDs = function() {
	  getAllTasteProfileIDs1();
 
  };
  
  
  var  deleteAllTasteProfiles = function() {
	  deleteAllTasteProfiles1();
 
  };
  
  var  deleteTasteProfiles = function(arrayDeleteTasteProfileIDs) {
	  deleteTasteProfiles1(arrayDeleteTasteProfileIDs);
 
  };
  
  var  getBasicInformationOfAllTasteProfiles = function() {
	  getBasicInformationOfAllTasteProfiles1();
 
  };
  
  var createNewTasteProfiles = function(arrayNewPlaylistObjects){
	  createNewTasteProfiles1(arrayNewPlaylistObjects);
  };
  
var setupPlaylistSimilarity = function(){
	  setupPlaylistSimilarity1();
};

var noNewOrDeletedPlaylists = function(){
	noNewOrDeletedPlaylists1();
}

  
  exports.deleteAllTasteProfiles = deleteAllTasteProfiles;
  exports.initialCreateOfAllTasteProfile = initialCreateOfAllTasteProfile;
  exports.getAllTasteProfileIDs = getAllTasteProfileIDs;
  exports.getBasicInformationOfAllTasteProfiles = getBasicInformationOfAllTasteProfiles;
  exports. deleteTasteProfiles =  deleteTasteProfiles;
  exports.createNewTasteProfiles = createNewTasteProfiles;
  exports.setupPlaylistSimilarity =  setupPlaylistSimilarity;
  exports.noNewOrDeletedPlaylists = noNewOrDeletedPlaylists;
});


var arrayProfileIDsAndPlaylistNames = new Array();
var arrayPlaylistObjects = new Array();
var readyToSetAutoComplete = false;
var numberOfPlaylists = 0;

var autocompletePlaylistNamesArray = new Array();
var autocompleTasteProfileIDsAndNamesArray = new Array();

var echonestDynamicScript = null;


//var arrayStoredPlaylistObjects = new Array();

var numberOfNewPlaylists = 0;

var arrayNewProfileIDsAndPlaylistNames = new Array();


function noNewOrDeletedPlaylists1(){
	
	console.log('noNewOrDeletedPlaylists1() was called');
	//get the info from local storage
	var arrayStoredPlaylistObjects = new Array();

	for (var i=0; i<=localStorage.length-1; i++)  
    {   
       var  key = localStorage.key(i);  
       var playlistObject = JSON.parse(localStorage.getItem(key));  
        
        //console.log('NEXT PLAYLIST OBJECT: '+JSON.stringify(playlistObject));
        
        arrayStoredPlaylistObjects.push( playlistObject);
    }  
	
	//create the autocomplete Objects and add them to array
	arrayStoredPlaylistObjects.forEach(function(entry){
		
		var nameAndIdObject = {};
    	
    	
    	nameAndIdObject.name=  entry.playlistName;
    	nameAndIdObject.tasteProfileID = entry.tasteProfileID;
    	
    	
    	arrayNewProfileIDsAndPlaylistNames.push(nameAndIdObject); 
		
	});
	
	addToAutocompleteArray();
	
	
}

function createNewTasteProfiles1(arrayNewPlaylistObjects){
	console.log('createNewTasteProfiles1() was called');
	
	console.log('ECHONEST TASTE PROFILE arrayNewPlaylistObjects: '+arrayNewPlaylistObjects);
	
	var arrayStoredPlaylistObjects = new Array();
	
	//get already stored playlist Objects
	
	for (var i=0; i<=localStorage.length-1; i++)  
    {   
       var  key = localStorage.key(i);  
       var playlistObject = JSON.parse(localStorage.getItem(key));  
        
        //console.log('NEXT PLAYLIST OBJECT: '+JSON.stringify(playlistObject));
        
        arrayStoredPlaylistObjects.push( playlistObject);
        
    	
    }  
	
	
	//get already stored objects name and Id, add them to new arrayNewProfileIDsAndPlaylistNames
	
	arrayStoredPlaylistObjects.forEach(function(entry){
		
		var nameAndIdObject = {};
    	
    	var profileName1 = entry.playlistName;
    	//console.log('PROFILE NAME USED FOR IDandNAME OBJECT: '+profileName1);
    	//console.log('UND SO SIEHT EIN STRING AUS: '+"das ist ein String");
    	nameAndIdObject.name=  profileName1;
    	nameAndIdObject.tasteProfileID = entry.tasteProfileID;
    	
    	
    	var hasToBeAdded = checkIfAutocompleteObjectHasToBeAddedToArray(nameAndIdObject);
    	console.log('CREATE NEW TASTE PROFILES NAME AND ID OBJECT HAS TO BE ADDED: '+hasToBeAdded);
    	if(hasToBeAdded){
        	arrayNewProfileIDsAndPlaylistNames.push(nameAndIdObject); 
        	}
		
	});
	
	
	//for each new playlist
	arrayNewPlaylistObjects.forEach(function(entry){
		console.log('NEW PLAYLIST OBJECT FOR ECHONEST TASTE PROFILE CREATION: '+JSON.stringify(entry));
		
	 
	   
	    
	    
	        numberOfNewPlaylists = arrayNewPlaylistObjects.length;
	        
	        console.log('NUMBER OF NEW PLAYLISTS TO BE CREATED AT ECHONEST: '+ numberOfNewPlaylists);
		
		
		
		//create a tasteProfile for each playlistObject
		
	        var createURL = "http://developer.echonest.com/api/v4/catalog/create";  
	       
	        
	
			
			//arrayNewPlaylistObjects.forEach(function(entry) {
				//console.log(' ENTRY OF arrayNewPlaylistObjects: '+JSON.stringify(entry));
			
			
			
				
			
						//readyforNextOne = false;
	        		 var tasteProfileName = entry.playlistName;
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
	                    	
	                    	
	                    	//store the new TasteProfileId in playlist object
	                    	entry.tasteProfileID = profile_id;
	                    	localStorage.setItem( entry.playlistURI,JSON.stringify(entry ));
	                    	
	                    	//
	                    	
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
	                    	            	console.log('tasteProfile new Profiles update call response: '+JSON.stringify(data.response));
	                    	            	
	                    	            	
	                    	            	
	                    	         //add Taste Profile Object {id and name} to array    	
	                    	            	
	                    	            	var nameAndIdObject = {};
	                    	            	
	                    	            	var profileName1 = profileName.substring(4).replace(/"/g , "");
	                    	            	//console.log('PROFILE NAME USED FOR IDandNAME OBJECT: '+profileName1);
	                    	            	//console.log('UND SO SIEHT EIN STRING AUS: '+"das ist ein String");
	                    	            	nameAndIdObject.name=  profileName1;
	                    	            	nameAndIdObject.tasteProfileID = profile_id;
	                    	            	
	                    	            	arrayNewProfileIDsAndPlaylistNames.push(nameAndIdObject);  		
	                    	            	console.log('ARRAY  TASTE PROFILE OBJECTS at createNewTastePRofile(): '+JSON.stringify(arrayNewProfileIDsAndPlaylistNames));
	                    	            	
	                    	              	//i++;
	                    	            	//readyforNextOne = true;
	                    	          
	                    	            	
	                    	            	
	                    	           //if all playlist have a profile set autocomplete for playlist similarity
	                    	            	
	                    	            	numberOfNewPlaylists = numberOfNewPlaylists-1;
	                    	            	if(numberOfNewPlaylists == 0){readyToSetAutoComplete = true;
	                    	            								//notYetFinishedTransmittingProfileData = false;
	                    	            	}
	                    	            	//readyToSetAutoComplete = true;
	                    	            	if(readyToSetAutoComplete){
	                    	            		//getAllTasteProfileIDs1();
	                    	            		addToAutocompleteArray();
	                    	            	}
	                    	            	
	                    	            });	
	                    		
	                    	
	                    });
	        	
			//});
		
	});
	
}

function  deleteTasteProfiles1(arrayDeleteTasteProfileIDs){
	console.log('deleteTasteProfiles1() was called. Number of profiles to be deleted: '+arrayDeleteTasteProfileIDs.length);
	

	
	var deleteURL = 'http://developer.echonest.com/api/v4/catalog/delete';
	
	arrayDeleteTasteProfileIDs.forEach(function(entry){
		
		var IdToBeDeleted= entry;
		
		console.log('ID TO BE DELETED AT ECHONEST TASTE PROFILE SCRIPT: '+IdToBeDeleted);
		
		$.post(deleteURL, 
	    		{
	    	'api_key':'BNV9970E1PHXZ9RQW',
	    	'format':'json',
	    	'id': IdToBeDeleted,
	    	    	    	
	            }).done(function(data) {
	            	console.log('tasteProfile delete call response: '+JSON.stringify(data.response));
	            	
	            	
	            	
	         
	            
	            	
	            	
	            });	
	});
	
	
	
	//set the autocomplete data
	var arrayStoredPlaylistObjects = new Array();
	
	for (var i=0; i<=localStorage.length-1; i++)  
    {   
       var  key = localStorage.key(i);  
       var playlistObject = JSON.parse(localStorage.getItem(key));  
        
        //console.log('NEXT PLAYLIST OBJECT: '+JSON.stringify(playlistObject));
        
        arrayStoredPlaylistObjects.push( playlistObject);
    }  
	
	
	arrayStoredPlaylistObjects.forEach(function(entry){
		var nameAndIdObject = {};
    	
    	
    	nameAndIdObject.name=  entry.playlistName;
    	nameAndIdObject.tasteProfileID = entry.tasteProfileID;
    	
    	
    	var hasToBeAdded = checkIfAutocompleteObjectHasToBeAddedToArray(nameAndIdObject);
    	console.log('DELETE TASTE PROFILES, OBJECT HAS TO BE ADDED: '+hasToBeAdded);
    	if(hasToBeAdded){
    		
    	arrayNewProfileIDsAndPlaylistNames.push(nameAndIdObject); 
    	}
	});
	
	
	addToAutocompleteArray();
	
	
	
}


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
	        			//console.log('ID FOR INFO: '+idForInfo);
	        			
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

function initialCreateOfAllTasteProfile1(echonestDynamic){
	
	console.log('createTasteProfile () was called');
	
	
	//echonestDynamicScript = echonestDynamic
	
	//test local storage
	
    if (localStorage){
    	console.log('LOCALSTORAGE IS SUPPORTED');
    }else{
    	console.log('LOCALSTORAGE IS NOT SUPPORTED');
    }  
	
	

                 
    
    
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
                    	
                    	//store the new playlist objects
                    	entry.tasteProfileID = profile_id;
                    	localStorage.setItem( entry.playlistURI,JSON.stringify(entry ));
                    	
                    	
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
                    	            	
                    	            	arrayNewProfileIDsAndPlaylistNames.push(nameAndIdObject);  		
                    	            	console.log('ARRAY TASTE PROFILE OBJECTS: '+JSON.stringify(arrayNewProfileIDsAndPlaylistNames));
                    	            	
                    	              	//i++;
                    	            	//readyforNextOne = true;
                    	          
                    	            	
                    	            	
                    	           //if all playlist have a profile set autocomplete for playlist similarity
                    	            	
                    	            	numberOfPlaylists = numberOfPlaylists-1;
                    	            	if(numberOfPlaylists == 0){readyToSetAutoComplete = true;
                    	            								//notYetFinishedTransmittingProfileData = false;
                    	            	}
                    	            	//readyToSetAutoComplete = true;
                    	            	if(readyToSetAutoComplete){
                    	            		//getAllTasteProfileIDs1();
                    	            		 addToAutocompleteArray();
                    	            	}
                    	            	
                    	            });	
                    		
                    	
                    });
        	
		});//end of forEachLoop
        	//}//ifEnde
       // }//while ende
		
		
	
	// }//for schleife Ende
	
	
	
}


function checkIfAutocompleteObjectHasToBeAddedToArray(autocompleteObject){
//check for Duplicate Entrys in autocompleTasteProfileIDsAndNamesArray
	
	

	for(var i = 0; i<arrayNewProfileIDsAndPlaylistNames.length; i++){
		var comparisonTasteProfileID = arrayNewProfileIDsAndPlaylistNames[i].tasteProfileID
		
		//console.log('comparisonTasteProfileID: '+comparisonTasteProfileID);
		//console.log('tasteProfileId of current Object: '+autocompleteObject.tasteProfileID);
		
		if(comparisonTasteProfileID==autocompleteObject.tasteProfileID){
			console.log('DEDECTED A DUPLICAT ENTRY IN ARRAY NEW PROFILE IDS AND NAMES');
			//break;
			return false;
		}
			
		
	}
	
	return true;
	
	
}	
	
function addToAutocompleteArray(){
	console.log('ECHONEST TASTE PROFILE addToAutocompleteArray() was called');
	
	//tasteProfileIDsArray.push('CARHJKV140E8922AA8' );
	
	
	
	
	/*arrayNewProfileIDsAndPlaylistNames.forEach(function(entry){
		autocompleTasteProfileIDsAndNamesArray.push(entry);
	});*/
	
	
	autocompleTasteProfileIDsAndNamesArray =arrayNewProfileIDsAndPlaylistNames;
	

	 console.log('ARRAY USED FOR AUTOCOMPLETE PLAYLIST SIMILARITY: '+JSON.stringify(autocompleTasteProfileIDsAndNamesArray));
	 
	 
 for (var i=0; i<autocompleTasteProfileIDsAndNamesArray.length; i++){  
		 var doubleName = false;
		 //var playlistName = JSON.stringify(IDandNameObjectArray[i].name);
		 var playlistName = autocompleTasteProfileIDsAndNamesArray[i].name;
		if($.inArray(playlistName, autocompletePlaylistNamesArray )>-1){
			console.log('TRYING TO PUTTING A DUPLICATE ENTRY INTO AUTOCOMPLETE NAMES ARRAY');
			doubleName = true;
		}
		
		if(!doubleName){autocompletePlaylistNamesArray.push(playlistName)};
		}
		 
		 //}
	

 
 console.log(' addToAutocompleteArray() NAMES ARRAY FOR AUTOCOMPLETE: '+autocompletePlaylistNamesArray)

}

function setupPlaylistSimilarity1(){


	console.log('ECHONEST TASTEPROFILE setupPlaylistSimilarity1() was called');
	
	  $( "#tags1" ).autocomplete({
    		source: autocompletePlaylistNamesArray,
    		 minLength: 0,
    		
    		 select: function( event, ui){
    			
    			 console.log('EventHandlerPlaylist List sent this playlist name: '+ui.item.label);
    			 
    			 for (var i=0; i<=autocompleTasteProfileIDsAndNamesArray.length-1; i++){  
    				 
    				if(ui.item.label == autocompleTasteProfileIDsAndNamesArray[i].name){
    					console.log('TRYING TO CHANGE TO PLAYLIST SIMILARITY WITH ID: '+autocompleTasteProfileIDsAndNamesArray[i].tasteProfileID);
    					echonestDynamicScript.changeToPlaylistSimilarity(autocompleTasteProfileIDsAndNamesArray[i]);
    					break;
    				}
    				
    			
    		};
    			 
    			 
    		
    		
    		
    		
    			 
    			 //echonestDynamic.changeToPlaylistSimilarity( ui.item.label);
    			 
    			$(this).val(''); return false;
    			 
    		 }
         
        
    		
    		 }).focus(function(){     
    		        //Use the below line instead of triggering keydown
    		        //$(this).data("autocomplete").search($(this).val());
    		        //$(this).autocomplete("search");
    			 
    		        $(this).autocomplete('search', $(this).val());
    		    });
	 
	 
	 
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
	    		{'results':'400'
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
	        		            	console.log('tasteProfile delete all call response: '+JSON.stringify(data.response));
	        		            	
	        		            	
	        		            	
	        		         
	        		            	
	        		            	
	        		          
	        		            	
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
	
	
	

}// end of delete




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