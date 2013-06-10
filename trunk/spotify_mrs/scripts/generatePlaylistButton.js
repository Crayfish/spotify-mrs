

require([
  '$api/models',
  '$views/buttons',
  //'scripts/echonest',
  'scripts/echonestDynamic',
  'scripts/setupSimilarityRadioButtons'
], function(models, buttons, echonestDynamic, setupSimilarityRadioButtons ) {
  'use strict';


  var setUpNextSongsButton = function() {
	    var generateNextSongsButton = document.getElementById('nextSongsButton');
	    generateNextSongsButton.onclick=function(){
	    	console.log("Pressed NextSongs Button");
	    	
	    echonestDynamic.getNextXXSong();
	  }
  };

  
  var setUpNewSeedButton = function() {
	    var newSeedButton = document.getElementById('newSeed');
	    newSeedButton.onclick=function(){
	    	console.log("Pressed New Seed Button");
	    	
	    	echonestDynamic.startNewSession();
	  }
};
  

  exports.setUpNextSongsButton = setUpNextSongsButton;
  exports.setUpNewSeedButton = setUpNewSeedButton;
});
