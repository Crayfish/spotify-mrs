/**
 * Echonest API key handler for the 3 developer
 * Julius Gruber
 * Mark Ormos
 * Thomas Mayr
 */

require([
  '$api/models',
 
], function(models) {
  'use strict';

  var setEchonestApiKey = function(userName) {
	  setEchonestApiKey1(userName);
  };
	  
  var getApiKey = function(){
	  return getApiKey1();
  }  
  
  exports.setEchonestApiKey = setEchonestApiKey;
  exports.getApiKey = getApiKey;

});//end require*************************************************************

	var apiKey = null;
	
	function setEchonestApiKey1(userName){
		console.log('API KEY getEchonestApiKey1() was called ');
		
		var keysArray= [
		            {
		                "userName": "Marc",
		                "apiKey": "QWX0DBDRJ1VJXS0WX"
		            },
		            {
		                "userName": "Tom",
		                "apiKey": "B9XVNLTRARHSTEWPV"
		            },
		            {
		                "userName": "Julius",
		                "apiKey": "BNV9970E1PHXZ9RQW"
		            }
		        ];
		
		
		for(var i = 0; i< keysArray.length;i++){
			if(keysArray[i].userName == userName){
				apiKey= keysArray[i].apiKey;
				console.log('APIKEY The Api Key was set to: '+apiKey+' for user '+keysArray[i].userName);
				break;
			}
		}
		
	}
	

	function getApiKey1(){
		return apiKey;
	}
