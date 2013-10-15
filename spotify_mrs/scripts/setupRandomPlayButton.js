/**
 * Play a random song on button click, when no songs are currently playling.
 */

require([
  '$api/toplists', 
  '$views/buttons#PlayButton',
], function(toplists, PlayButton) {
  'use strict';
  
  var setupPlayButton = function setupPlayButton(){
	  var list = toplists.Toplist.forCurrentUser();
	  var button = PlayButton.forItem(list);
	  document.getElementById("randomplaybutton").appendChild(button.node);
  }
  
  exports.setupPlayButton = setupPlayButton;
  
});//end require

/**********************************************************************************************************************/