/**
 * Setup jpages pagination for covers
 */

require([
  '$api/models',
 
], function(models) {
  'use strict';

  var setupPages = function() {
	  setupPages1();
  };

  exports.setupPages = setupPages;

});//end require ************************************************************



function setupPages1(){
	console.log('setupPages1() was called');

	  $("#holder").jPages({
	    containerID : "albumCoverContainer",
	    perPage      :12,
        first       : false,
        previous    : false,
        next        : false,
        last        : false,
        animation   : "fadeInLeftBig",
    	
	  });
	
}