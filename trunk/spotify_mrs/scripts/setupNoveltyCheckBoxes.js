

require([
  //'$api/models',
 // '$views/buttons',
  //'scripts/echonest',
  'scripts/echonestDynamic',
  //'scripts/jPagesTrackCover'
], function( echonestDynamic ) {
  'use strict';


  var setUpExcludeSeedArtistCheckBox = function() {
	  setUpExcludeSeedArtistCheckBox1(echonestDynamic );
  };
  
  
/*  var getExcludeSeedArtistCheckBoxisChecked = function() {
	  getExcludeSeedArtistCheckBoxisChecked1();
  };*/


  

  exports.setUpExcludeSeedArtistCheckBox = setUpExcludeSeedArtistCheckBox;
  //exports.getExcludeSeedArtistCheckBoxisChecked = getExcludeSeedArtistCheckBoxisChecked;
  
});



//var excludeSeedArtistCheckBoxisChecked = false;

var echonestDynamicScript = null;




function  setUpExcludeSeedArtistCheckBox1(echonestDynamic){
	
	echonestDynamicScript = echonestDynamic;
	
	
    var excludeSeedArtistCheckBox = document.getElementById('excludeSeedArtistCheckBox');
    excludeSeedArtistCheckBox.onclick=function(){
    	//console.log("exclude seed artist checkbox was checked");
    	
    	var isChecked = $('#excludeSeedArtistCheckBox').prop('checked');
    	if(isChecked){
    		console.log('excludeSeedArtistCheckBox is checked')
    		//excludeSeedArtistCheckBoxisChecked = true;
    		echonestDynamic.setBanedArtistId(true);
    	}else{
    		if(!isChecked){
    			console.log('excludeSeedArtistCheckBox is not checked');
    			echonestDynamic.setBanedArtistId(false);
    		
    			//excludeSeedArtistCheckBoxisChecked= false;
    		}
    	}

    	
    	
    
  };
	
	
	
}

/*function getExcludeSeedArtistCheckBoxisChecked1(){
	return excludeSeedArtistCheckBoxisChecked;
}*/

