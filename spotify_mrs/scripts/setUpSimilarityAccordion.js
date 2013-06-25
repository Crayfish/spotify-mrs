require([
  '$api/models',
  'scripts/echonestDynamic'
  
 
], function(models, echonestDynamic) {
  'use strict';

  

  var setupAccordion = function() {
	  setupAccordion1(echonestDynamic);
 
  }

  exports.setupAccordion = setupAccordion;
});


function setupAccordion1(echonestDynamic){
	console.log('setupAccordion1() was called');
	
	
		 $( "#accordion" ).accordion({ heightStyle: "content"});
		 
		 $( "#accordion").accordion({
			 activate: function( event, ui ) {
			 
			 //var headerText = $("#accordion").eq(active).text();
				 
			var active = $( "#accordion" ).accordion( "option", "active" );	 
			 console.log("A new header was activated: "+active);
			 
			 switch (active)
			 {
			 case 0:
				 echonestDynamic.changeToArtistSimilarity();
			   break;
			 case 1:
				 echonestDynamic.changeToSongSimilarity();
			   break;
			 case 2:
			   
			   break;
			 case 3:
			   
			   break;
			 
			 } 
			 
			 
			 }
			 });
		
}