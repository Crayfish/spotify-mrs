require([
  '$api/models',
  'scripts/echonestDynamic'
  
 
], function(models, echonestDynamic) {
  'use strict';

  

  var setupAccordion = function() {
	  setupAccordion1(echonestDynamic);
 
  };
  
  
  var setupChangeSeedArtistButton = function() {
	  setupChangeSeedArtistButton1(echonestDynamic);
 
  };

  var setupChangeSeedSongButton = function() {
	  setupChangeSeedSongButton1( echonestDynamic);
 
  };
  
  exports.setupAccordion = setupAccordion;
  exports.setupChangeSeedArtistButton = setupChangeSeedArtistButton;
  exports.setupChangeSeedSongButton = setupChangeSeedSongButton;
});


function setupChangeSeedArtistButton1(echonestDynamic){
	
	 $( "#changeSeedArtist" ).button().click(function( event ) {
	 event.preventDefault();
	 
	 //console.log('Change Seed Artist Button was clicked');
	 
	 echonestDynamic.changeSeedArtistSimilarity();
	 
	 });
	
	
	
}


function setupChangeSeedSongButton1(echonestDynamic){
	
	 $( "#changeSeedSong" ).button().click(function( event ) {
		 event.preventDefault();
		 
		// console.log('Change Seed Song Button was clicked');
		 
		 echonestDynamic.changeSeedSongSimilarity();
		 
		 });
	
	
	
	
}

function setupAccordion1(echonestDynamic){
	console.log('setupAccordion1() was called');
	
	
		// $( "#accordion" ).accordion({heightStyle: "content"});
		 
		 $( "#accordion").accordion({
			 activate: function( event, ui ) {
			 
			 //var headerText = $("#accordion").eq(active).text();
				 
			var active = $( "#accordion" ).accordion( "option", "active" );	 
			 console.log("A new header was activated: "+active);
			 
			 switch (active)
			 {
			 case 0:
				 echonestDynamic.changeToArtistSimilarity();
				 $('#genreSimilarityInfo').text('There is no genre selected.');
				 $('#playlistSimilarityInfo').text('There is no playlist selected.');
			   break;
			 case 1:
				 echonestDynamic.changeToSongSimilarity();
				 $('#genreSimilarityInfo').text('There is no genre selected.');
				 $('#playlistSimilarityInfo').text('There is no playlist selected.');
			   break;
			 case 2:
				 $('#playlistSimilarityInfo').text('There is no playlist selected.');
			   break;
			 case 3:
				 $('#genreSimilarityInfo').text('There is no genre selected.');
			   break;
			 
			 } 
			 
			
			 
			 }
			 });
		 
		 
		
}