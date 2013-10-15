require([
  '$api/models',
  //'scripts/setupPlaylistFilter',
 
 
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

});



var apiKey = null;



function setEchonestApiKey1(userName){
	console.log('API KEY getEchonestApiKey1() was called ');
	
/*	//reading JSON Data from  file
	
	 $.getJSON('sp://cover/APIKeyJSON/apiKey.jsnop', function(data)
           {
               console.log('READ FROM  API KEY JSON FILE: ' +JSON.stringify(data));

               console.log('API KEY READ FROM  API KEY JSON FILE: ' +JSON.stringify(data));
              apiKey = data.key;
               
               
           });*/
	
	
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

