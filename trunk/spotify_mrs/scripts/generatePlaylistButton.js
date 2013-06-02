

require([
  '$api/models',
  '$views/buttons',
  'scripts/echonest'
], function(models, buttons, echonest ) {
  'use strict';


  var setUpGeneratePlaylistButton = function() {
	    var generatePlaylistButton = document.getElementById('generatePlaylistButton');
	    generatePlaylistButton.onclick=function(){
	    	//console.log("Pressed GeneratePlaylistButton");
	    	echonest.fetchPlaylist();
	  }
  };


  exports.setUpGeneratePlaylistButton = setUpGeneratePlaylistButton;
});
