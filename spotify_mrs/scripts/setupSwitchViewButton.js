/**
 * Setup the "switch view" button.
 * Switches between cover and playlist views.
 * Handles pagination.
 */

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


/**
 * setup switch view button
 * @param customplaylist
 */
function setupFlipButton1(customplaylist){
	console.log("flip button setup");
	
	var flipbutton = document.getElementById('flipbutton');
	 
	flipbutton.onclick=function(){
		  
		if( $('#playlistContainer').is(':hidden') ) { // if covers are front switch to playlist view
		 
			console.log("playlist is front");
			
			//show and hide appropriate views
			$('#playlistHeader').show();
			$('#subscribebutton').show();
			$('#albumCoverContainer').hide();
			$('#playlistContainer').show();

			//rebuild playlist pagination
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
					//tell the playlist handler which playlist is shown in case of saving
					customplaylist.setActivePage(currentpagePlaylist);
				}
			
			});
				
			console.log("playlist pagination to set: "+currentpageCover);
			
			//update pagination control
			$("#holder").jPages( currentpageCover );
			currentpagePlaylist = currentpageCover;
			  
		}
		else{// if playlist view is front swith to covers view
			
			console.log("covers are front");
			  
			//show and hide gui elements
			$('#playlistContainer').hide();
			$('#albumCoverContainer').show();
			$('#playlistHeader').hide();
			$('#subscribebutton').hide();
			 
			//rebuild pagination
			$("#holder").jPages("destroy").jPages({
				containerID   : "albumCoverContainer",
				perPage       :13,
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
			console.log("cover pageination to set: "+currentpagePlaylist);
			$("#holder").jPages( currentpagePlaylist );
			currentpageCover = currentpagePlaylist;
		}
		
	}
	  
}

/**
 * add a new cover page when covers are added.
 * called by jPagesTrackCover script.
 */
function newCoverPage1(){
	//show covers
	$('#albumCoverContainer').show();
	$('#playlistContainer').hide();
	$('#playlistHeader').hide();
	$('#subscribebutton').hide();
	 
	//update cover pagination
	$("#holder").jPages("destroy").jPages({
		containerID   : "albumCoverContainer",
		perPage       :13,
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