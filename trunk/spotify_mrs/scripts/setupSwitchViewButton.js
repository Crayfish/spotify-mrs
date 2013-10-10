require([
  '$api/models',
  'scripts/customplaylist',
  
], function(models, customplaylist) {
  'use strict';
  
  
  var setupFlipButton = function(){
	  setupFlipButton1(customplaylist);
  };
  

  var newCoverPage = function(){
	  newCoverPage1();
  };


  exports.setupFlipButton = setupFlipButton;
  exports.newCoverPage = newCoverPage;
  
});//end require

var currentpageCover = 1;
var currentpagePlaylist = 1;
var pageCount = 1;



function setupFlipButton1(customplaylist){
	console.log("flip button setup");
	
	var flipbutton = document.getElementById('flipbutton');
	 
	flipbutton.onclick=function(){
		  
		  
		if( $('#playlistContainer').is(':hidden') ) {
		 
			console.log("playlist is front");
			
			customplaylist.showPlaylist();
			  
			 
			  
			$('#playlistHeader').show();
			$('#subscribebutton').show();
			$('#albumCoverContainer').hide();
			$('#playlistContainer').show();
				
		
				
			$("#holder").jPages("destroy").jPages({
				containerID   : "playlistContainer",
				perPage       :2,
				first       : "first",
				previous    : "previous",
				next        : "next",
				last        : "last",
				
				animation   : "fadeIn",
				callback    : function( pages,items ){
					
					console.log("playlist on page: "+pages.current);
					currentpagePlaylist = pages.current;
					customplaylist.setActivePage(currentpagePlaylist);
				}
			
			});
				
			console.log("playlist pageination to set: "+currentpageCover);
			$("#holder").jPages( currentpageCover );
			currentpagePlaylist = currentpageCover;
			  
		}
		else{
			console.log("covers are front");
			
			
			  
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
                 
				animation   : "fadeIn",
                
				callback    : function( pages,items ){
					console.log("covers on page: "+pages.current);
					currentpageCover = pages.current;
				}
  		   	
			});
			  
			console.log("cover pageination to set: "+currentpagePlaylist);
			$("#holder").jPages( currentpagePlaylist );
			currentpageCover = currentpagePlaylist;
		}
		
	}
	  
}


function newCoverPage1(){
	//show covers
	$('#albumCoverContainer').show();
	$('#playlistContainer').hide();
	$('#playlistHeader').hide();
	$('#subscribebutton').hide();
	 
	//update cover pagination
	$("#holder").jPages("destroy").jPages({
		containerID   : "albumCoverContainer",
		perPage       :12,
		first       : "first",
		previous    : "previous",
		next        : "next",
		last        : "last", 
		animation   : "fadeIn",
		callback    : function( pages,items ){
			console.log("covers on page: "+pages.current);
			currentpageCover = pages.current;
		}
	});
  
	//update pagination controls
	$("#holder").jPages( pageCount );
	pageCount= pageCount+1;
}