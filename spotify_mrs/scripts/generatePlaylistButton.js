

require([
  '$api/models',
  '$views/buttons',
  'scripts/echonest',
  'scripts/setupSimilarityRadioButtons'
], function(models, buttons, echonest, setupSimilarityRadioButtons ) {
  'use strict';


  var setUpGeneratePlaylistButton = function() {
	    var generatePlaylistButton = document.getElementById('generatePlaylistButton');
	    generatePlaylistButton.onclick=function(){
	    	console.log("Pressed GeneratePlaylistButton");
	    	
	    	if(setupSimilarityRadioButtons.returnSimilarityMode()=='song'){
				echonest.getPlaylistSongSimilarity();
			}else{
				//if(setupSimilarityRadioButtons.returnSimilarityMode()=='artist'){
				echonest.getPlaylistArtistSimilarity();	
				//}
				}
	  }
  };


  exports.setUpGeneratePlaylistButton = setUpGeneratePlaylistButton;
});
