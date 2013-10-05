require([
  '$api/models',
  //'scripts/echonestDynamic'

 
], function(models) {
  'use strict';



  var setupPages = function() {
	  setupPages1();
 
  };

  exports.setupPages = setupPages;
});


function setupPages1(){
	console.log('setupPages1() was called');
	

	  $("#holder").jPages({
	    containerID : "albumCoverContainer",
	    perPage      :12,
	   /* first       : "first",
        previous    : "previous",
        next        : "next",
        last        : "last",*/
        first       : false,
        previous    : false,
        next        : false,
        last        : false,
      animation   : "fadeInLeftBig",
    	
       
       
	  
	  });
	  
	/*  $("div.p_holder").jPages({
		    containerID : "playlistContainer",
		    perPage      :1,
		    first       : "first",
	        previous    : "previous",
	        next        : "next",
	        last        : "last",
	        first       : false,
	        previous    : false,
	        next        : false,
	        last        : false,
	      animation   : "fadeInLeftBig",
	    	
	       
	       
		  
		  });*/
	
}