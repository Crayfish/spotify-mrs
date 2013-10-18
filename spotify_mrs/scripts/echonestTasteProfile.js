/**
 * Handler for user taste profile based on user playlists.
 */

require([
  '$api/models',
  'scripts/echonestDynamic',
  'scripts/apiKey'
 
], function(models, echonestDynamic, apiKey) {
  'use strict';

  echonestDynamicScript = echonestDynamic;

  var setApiKey = function(){
	  echonestApiKey = apiKey.getApiKey();
  }
  
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
  };

  var deleteSongsInTasteProfiles = function(deleteSongsObjectsArray){
	  deleteSongsInTasteProfiles1(deleteSongsObjectsArray);
  };

  var addSongsInTasteProfiles = function(addSongsObjectsArray){
	  addSongsInTasteProfiles1(addSongsObjectsArray);
  }

  exports.deleteAllTasteProfiles = deleteAllTasteProfiles;
  exports.initialCreateOfAllTasteProfile = initialCreateOfAllTasteProfile;
  exports.getAllTasteProfileIDs = getAllTasteProfileIDs;
  exports.getBasicInformationOfAllTasteProfiles = getBasicInformationOfAllTasteProfiles;
  exports. deleteTasteProfiles =  deleteTasteProfiles;
  exports.createNewTasteProfiles = createNewTasteProfiles;
  exports.setupPlaylistSimilarity =  setupPlaylistSimilarity;
  exports.noNewOrDeletedPlaylists = noNewOrDeletedPlaylists;
  exports.deleteSongsInTasteProfiles = deleteSongsInTasteProfiles;
  exports.addSongsInTasteProfiles =  addSongsInTasteProfiles;
  exports.setApiKey = setApiKey;

});// end require ********************************************************


	var arrayProfileIDsAndPlaylistNames = new Array();
	var arrayPlaylistObjects = new Array();
	var readyToSetAutoComplete = false;
	var numberOfPlaylists = 0;
	var autocompletePlaylistNamesArray = new Array();
	var autocompleTasteProfileIDsAndNamesArray = new Array();
	var echonestDynamicScript = null;
	var numberOfNewPlaylists = 0;
	var arrayNewProfileIDsAndPlaylistNames = new Array();
	var echonestApiKey = null;
	
	
	function addSongsInTasteProfiles1(addSongsObjectsArray){
		console.log('ECHONEST TASTE PROFILE addSongsInTasteProfiles1() was called');
		console.log('ECHONEST TASTE PROFILE ADD SONGS  OBJECT: '+JSON.stringify(addSongsObjectsArray));
		
		var addSongsURL = "http://developer.echonest.com/api/v4/catalog/update";
		
		addSongsObjectsArray.forEach(function(entry){
			var tasteProfileID = entry.tasteProfileId;
			console.log('ADD SONGS TASTE PROFILE ID USED FOR ECHONEST CALL: '+tasteProfileID);
			var jsonData = JSON.stringify(entry.addItemsArray);
				
			$.post(addSongsURL, 
					{
			    	'api_key': echonestApiKey,
			    	'format':'json',
			    	'id': tasteProfileID,
			    	'data_type':'json',
			    	'data' : jsonData
			    	
					}).done(function(data) {	
						console.log('ADD SONGS UPDATE CALL RESPONSE: '+JSON.stringify(data.response));
					});
		});
		
	}

	
	function deleteSongsInTasteProfiles1(deleteSongsObjectsArray){
		console.log('ECHONEST TASTE PROFILE deleteSongsInTasteProfiles1() was called');
		console.log('ECHONEST TASTE PROFILE DELETE OBJECT: '+JSON.stringify(deleteSongsObjectsArray));
		
		
		var deleteSongsURL = "http://developer.echonest.com/api/v4/catalog/update";
		
		deleteSongsObjectsArray.forEach(function(entry){
			var tasteProfileID = entry.tasteProfileId;
			console.log('DELETE SONGS TASTE PROFILE ID USED FOR ECHONEST CALL: '+tasteProfileID);
			var jsonData = JSON.stringify(entry.deleteItemsArray);
				
			$.post(deleteSongsURL, 
					{
			    	'api_key':echonestApiKey,
			    	'format':'json',
			    	'id': tasteProfileID,
			    	'data_type':'json',
			    	'data' : jsonData
			    	
					}).done(function(data) {	
						console.log('DELETE SONGS UPDATE CALL RESPONSE: '+JSON.stringify(data.response));
					});
		});
	}
	
	
	function noNewOrDeletedPlaylists1(){
		console.log('ECHONEST TASTE PROFILE noNewOrDeletedPlaylists1() was called');
		
		var arrayStoredPlaylistObjects = new Array();
	
		for (var i=0; i<=localStorage.length-1; i++){   
			var  key = localStorage.key(i);  
			var playlistObject = JSON.parse(localStorage.getItem(key));  
	        
	        arrayStoredPlaylistObjects.push( playlistObject);
	    }  
		
		//create the autocomplete Objects and add them to array
		arrayStoredPlaylistObjects.forEach(function(entry){
			
			var nameAndIdObject = {};
	    	nameAndIdObject.name=  entry.playlistName;
	    	nameAndIdObject.tasteProfileID = entry.tasteProfileID;
	    	
	    	if(checkIfAutocompleteObjectHasToBeAddedToArray(nameAndIdObject)){
	    		arrayNewProfileIDsAndPlaylistNames.push(nameAndIdObject); 
	    	}
		});
		
		addToAutocompleteArray();
		
	}
	
	
	function createNewTasteProfiles1(arrayNewPlaylistObjects){
		console.log('createNewTasteProfiles1() was called');
		
		console.log('ECHONEST TASTE PROFILE arrayNewPlaylistObjects: '+arrayNewPlaylistObjects);
		
		var arrayStoredPlaylistObjects = new Array();
		
		//get already stored playlist Objects
		for (var i=0; i<=localStorage.length-1; i++){   
			var  key = localStorage.key(i);  
			var playlistObject = JSON.parse(localStorage.getItem(key));  
	        
	        arrayStoredPlaylistObjects.push( playlistObject);
	    }  
		
		//get already stored objects name and Id, add them to new arrayNewProfileIDsAndPlaylistNames
		arrayStoredPlaylistObjects.forEach(function(entry){
			
			var nameAndIdObject = {};
	    	
	    	var profileName1 = entry.playlistName;
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
		       
			
			var tasteProfileName = entry.playlistName;
			console.log('TASTE PROFILE NAME: '+ tasteProfileName);
			
			var jsonDataVariable = entry.itemArray; 
		        	
			$.post(createURL, 
					{
					'api_key': echonestApiKey,
					'format':'json',
					'type':'song',
					'name': Math.floor(Math.random()*10000)+tasteProfileName
					}).done(function(data) {	
						console.log(JSON.stringify(data.response));

						var profile_id = data.response.id;
						var profileName = data.response.name;
						
						//store the new TasteProfileId in playlist object
						entry.tasteProfileID = profile_id;
						localStorage.setItem( entry.playlistURI,JSON.stringify(entry ));
		                    	
						
						var updateURL = "http://developer.echonest.com/api/v4/catalog/update";
		                    	
						$.post(updateURL, 
								{
								'api_key': echonestApiKey,
								'format':'json',
								'id': profile_id,
								'data_type':'json',
								'data':  JSON.stringify(jsonDataVariable )       	    	
								}).done(function(data) {
									console.log('tasteProfile new Profiles update call response: '+JSON.stringify(data.response));
		                    	            	
									var nameAndIdObject = {};
		                    	            	
									var profileName1 = profileName.substring(4).replace(/"/g , "");

									nameAndIdObject.name=  profileName1;
									nameAndIdObject.tasteProfileID = profile_id;
		                    	            	
									arrayNewProfileIDsAndPlaylistNames.push(nameAndIdObject);  		
		                    	            	
									console.log('ARRAY  TASTE PROFILE OBJECTS at createNewTastePRofile(): '+JSON.stringify(arrayNewProfileIDsAndPlaylistNames));
		                    	            	
									//if all playlist have a profile set autocomplete for playlist similarity
									numberOfNewPlaylists = numberOfNewPlaylists-1;
									if(numberOfNewPlaylists == 0){
										readyToSetAutoComplete = true;
									}

									if(readyToSetAutoComplete){
										addToAutocompleteArray();
									}
									
								});	
		                    		
					});
		        	
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
					'api_key': echonestApiKey,
					'format':'json',
					'id': IdToBeDeleted,
		    	    	    	
		            }).done(function(data) {
		            	console.log('tasteProfile delete call response: '+JSON.stringify(data.response));
		            });	
		});
		
		
		//set the autocomplete data
		var arrayStoredPlaylistObjects = new Array();
		
		for (var i=0; i<=localStorage.length-1; i++){   
	       var  key = localStorage.key(i);  
	       var playlistObject = JSON.parse(localStorage.getItem(key));  
	        
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
		var listTasteProfileIDsURL = 'http://developer.echonest.com/api/v4/catalog/list?api_key='+echonestApiKey+'&format=json'+'&_='+randomNumber;
		var getBasicInfoURL = 'http://developer.echonest.com/api/v4/catalog/profile?api_key='+echonestApiKey+'&format=json';
			
		$.getJSON(listTasteProfileIDsURL, 
		    		{'results':'100'},
		            function(data) {
		    			if (checkResponse(data)) {

		    				//get Basic Info of all taste Profiles	
		       
		    				console.log('NUMBER OF PROFILES TO GET BASIC INFO: '+ data.response.total);

		    				var arrayAllTasteProfileIDs = data.response.catalogs;
		        		
		        		
		    				for(var i= 0; i < arrayAllTasteProfileIDs.length; i++){
		    					var idForInfo = JSON.stringify(arrayAllTasteProfileIDs[i].id).replace(/"/g , "");
		        			
		    					$.getJSON(getBasicInfoURL, 
		        		    		{'id':idForInfo
		        		            },
		        		            function(data) {
		        		            	if (checkResponse(data)) {
		        		        	
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
		
		//test local storage
	    if (localStorage){
	    	console.log('LOCALSTORAGE IS SUPPORTED');
	    }else{
	    	console.log('LOCALSTORAGE IS NOT SUPPORTED');
	    }  
		

	    //get all playlist Information from local storage
	    for (var i=0; i<=localStorage.length-1; i++){   
	    	var  key = localStorage.key(i);  
	    	var playlistObject = JSON.parse(localStorage.getItem(key));  
	            
	    	arrayPlaylistObjects.push( playlistObject);
	    }  
	   
	    numberOfPlaylists = arrayPlaylistObjects.length;
		
		//create a tasteProfile for each playlistObject
	    var createURL = "http://developer.echonest.com/api/v4/catalog/create";  
	       
	    arrayPlaylistObjects.forEach(function(entry) {
	    	console.log(' ENTRY OF arrayPlaylistObjects: '+JSON.stringify(entry));
			
			
	    	var tasteProfileName = JSON.stringify(entry.playlistName);
	    	console.log('TASTE PROFILE NAME: '+ tasteProfileName);
	    	
	    	var jsonDataVariable = entry.itemArray; 
	        		 
	    	$.post(createURL, 
	    			{
	            	api_key: echonestApiKey,
	            	format : 'json',
	            	type:'song',
	            	name : Math.floor(Math.random()*10000)+tasteProfileName
	            	
	    			}).done(function(data) {	
	    				console.log(JSON.stringify(data.response));
	                    	
	    				var profile_id = data.response.id;
	    				var profileName = data.response.name;
	    				
	    				//store the new playlist objects
	    				entry.tasteProfileID = profile_id;
	    				localStorage.setItem( entry.playlistURI,JSON.stringify(entry ));
	                    	
	    				var updateURL = "http://developer.echonest.com/api/v4/catalog/update";
	                    	
	    				$.post(updateURL, 
	    						{
	    						'api_key': echonestApiKey,
	    						'format':'json',
	    						'id': profile_id,
	    						'data_type':'json',
	    						'data':  JSON.stringify(jsonDataVariable )       	    	
	    						}).done(function(data) {
	    							console.log('tasteProfile update call response: '+JSON.stringify(data.response));
	                    	            	
	                    	         //add Taste Profile Object {id and name} to array    	
	    							
	    							var nameAndIdObject = {};
	                    	            	
	    							var profileName1 = profileName.substring(4).replace(/"/g , "");

	    							nameAndIdObject.name=  profileName1;
	    							nameAndIdObject.tasteProfileID = profile_id;
	                    	            	
	    							arrayNewProfileIDsAndPlaylistNames.push(nameAndIdObject);  		
	    							console.log('ARRAY TASTE PROFILE OBJECTS: '+JSON.stringify(arrayNewProfileIDsAndPlaylistNames));
	                    	            	
	    							//if all playlist have a profile set autocomplete for playlist similarity
	                    	            	
	    							numberOfPlaylists = numberOfPlaylists-1;
	    							if(numberOfPlaylists == 0){
	    								readyToSetAutoComplete = true;
	    							}

	    							if(readyToSetAutoComplete){
	    								addToAutocompleteArray();
	    							}
	                    	            	
	    						});	
	                    		
	    			});
	        	
			});//end of forEachLoop
	        	
	}
	

	
	function checkIfAutocompleteObjectHasToBeAddedToArray(autocompleteObject){
	
		//check for Duplicate Entrys in autocompleTasteProfileIDsAndNamesArray
		
		for(var i = 0; i<arrayNewProfileIDsAndPlaylistNames.length; i++){
			var comparisonTasteProfileID = arrayNewProfileIDsAndPlaylistNames[i].tasteProfileID
			
			if(comparisonTasteProfileID==autocompleteObject.tasteProfileID||autocompleteObject.tasteProfileID == null){
				console.log('DEDECTED A DUPLICAT ENTRY IN ARRAY NEW PROFILE IDS AND NAMES: '+JSON.stringify(autocompleteObject));
				return false;
			}
			
		}
		
		return true;
	}	

	
	function addToAutocompleteArray(){
		console.log('ECHONEST TASTE PROFILE addToAutocompleteArray() was called');
		
		autocompleTasteProfileIDsAndNamesArray =arrayNewProfileIDsAndPlaylistNames;
		
		console.log('ARRAY USED FOR AUTOCOMPLETE PLAYLIST SIMILARITY: '+JSON.stringify(autocompleTasteProfileIDsAndNamesArray));
		 
		 
		for (var i=0; i<autocompleTasteProfileIDsAndNamesArray.length; i++){  
			var doubleName = false;
			 var playlistName = autocompleTasteProfileIDsAndNamesArray[i].name;
			 
			 if($.inArray(playlistName, autocompletePlaylistNamesArray )>-1){
				 console.log('TRYING TO PUTTING A DUPLICATE ENTRY INTO AUTOCOMPLETE NAMES ARRAY');
				 doubleName = true;
			 }
			
			 if(!doubleName){
				 autocompletePlaylistNamesArray.push(playlistName)
			 };
		}
			 
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
						$(this).blur(); 
	    					echonestDynamicScript.changeToPlaylistSimilarity(autocompleTasteProfileIDsAndNamesArray[i]);
	    					break;
	    				}
	    		};
	    			 
	    			 
	    		$(this).val(''); return false;
	    			 
			}
	         
	        
	    		
		}).focus(function(){     
			$(this).autocomplete('search', $(this).val());
		});
		 
		  
		//when enter key is pressed down, select if it is in genre array
		$( "#tags1" ).keydown(function(event) {
			  
			if(event.keyCode == 13) {
				console.log( "ECHONEST TASTE PROFILE enter key was pressed down" );
					
				//get the current text written into the form field
				var currentText =  $( "#tags1" ).val();

				//check if it is the genre array
				if(jQuery.inArray( currentText, autocompletePlaylistNamesArray)!= -1){
					console.log("SETUP GENERE FILTER  entered text matches playlist name: "+ currentText)
				
					for (var i=0; i<=autocompleTasteProfileIDsAndNamesArray.length-1; i++){  
							 
						if(currentText == autocompleTasteProfileIDsAndNamesArray[i].name){
							console.log('TRYING TO CHANGE TO PLAYLIST SIMILARITY WITH ID: '+autocompleTasteProfileIDsAndNamesArray[i].tasteProfileID);
							$( "#tags1" ).val('');
							$( "#tags1" ).blur();
							echonestDynamicScript.changeToPlaylistSimilarity(autocompleTasteProfileIDsAndNamesArray[i]);
							break;
						}
			    				
			    			
					};
					
				}
					
			}
			  
		});
		  
	}

	
	function getAllTasteProfileIDs1(){
		var randomNumber =  Math.floor(Math.random()*100);
		var listTasteProfileIDsURL = 'http://developer.echonest.com/api/v4/catalog/list?api_key='+echonestApiKey+'&format=json'+'&_='+randomNumber;
		
			$.getJSON(listTasteProfileIDsURL, 
		    		{'results':'100'
		            },
		            function(data) {
				        if (checkResponse(data)) {
				        	 console.log('LIST OF ALL TASTE PROFILE IDs: '+JSON.stringify(data)); 
				        } else {
				            info("trouble getting results");
				        }
		            });	
	}
	
	
	
	function deleteAllTasteProfiles1(){
		
		var randomNumber =  Math.floor(Math.random()*100);
		var listTasteProfileIDsURL = 'http://developer.echonest.com/api/v4/catalog/list?api_key='+echonestApiKey+'&format=json'+'&_='+randomNumber;
		var deleteURL = 'http://developer.echonest.com/api/v4/catalog/delete';
			
		$.getJSON(listTasteProfileIDsURL, 
		    		{'results':'400'
		            },
		            function(data) {
		            	if (checkResponse(data)) {
		            		console.log('LIST OF ALL TASTE PROFILE IDs: '+JSON.stringify(data)); 
		        	 
		            		//delete All Taste Profiles;	
		       
		            		console.log('NUMBER OF PROFILES TO DELETE: '+ data.response.total);
			        		var arrayAllTasteProfileIDs = data.response.catalogs;
			        		
			        		console.log('ARRAY FOR DELETING ALL TASTE PROFILES: '+arrayAllTasteProfileIDs);
			        		console.log('arrayAllTasteProfileIDs LENGHT: '+arrayAllTasteProfileIDs.length);
		        		
		        		
			        		for(var i= 0; i < arrayAllTasteProfileIDs.length; i++){
			        			var IdToBeDeleted = JSON.stringify(arrayAllTasteProfileIDs[i].id).replace(/"/g , "");
			        			console.log('ID TO BE DELETED: '+IdToBeDeleted);
		        			
			        			$.post(deleteURL, 
			        					{
			        					'api_key': echonestApiKey,
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
		
	}// end of delete
	
	
	
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