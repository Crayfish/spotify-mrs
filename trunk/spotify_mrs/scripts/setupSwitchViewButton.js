require([
  '$api/models',
  
], function(models) {
  'use strict';
  
  


  
  var setupFlipButton = function(){
	  console.log("flip button setup");
	
	  var flipbutton = document.getElementById('flipbutton');
	 
	  flipbutton.onclick=function(){
		  
		  var pageCurrentlyShown =0;
		  
		  if( $('#playlistContainer').is(':hidden') ) {
		 
			  console.log("playlist is front");
			
			 //TODO:get the currently shown page and display it on view change
			  
			  
			  $('#playlistHeader').show();
			  $('#subscribebutton').show();
			  $('#albumCoverContainer').hide();
			  $('#playlistContainer').show();
				
		
				
				$("#holder").jPages("destroy").jPages({
			        containerID   : "playlistContainer",
			        perPage       :1,
			        first       : "first",
			        previous    : "previous",
			        next        : "next",
			       last        : "last",
			       
			        animation   : "fadeInLeftBig",
			      
			       
			    });
				
			  
		  }
		  else{
			  console.log("covers are front");
			
			  //TODO:get the currently shown page and display it on view change
			  
			  $('#playlistContainer').hide();
			  $('#albumCoverContainer').show();
			  $('#playlistHeader').hide();
			  $('#subscribebutton').hide();
			  
			  $("#holder").jPages("destroy").jPages({
                    containerID   : "albumCoverContainer",
                    perPage       :12,
                    first       : "first",
                    previous    : "previous",
                    next        : "next",
                   last        : "last", 
                   
                  
                    animation   : "fadeInLeftBig",
                  
                   
    		   	
                });
    		   
		  }
		  
		
	  }
	  
	 
	  
  };
  




  exports.setupFlipButton = setupFlipButton;

  
});//end require