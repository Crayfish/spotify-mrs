jQuery.ajaxSettings.traditional = true;


require([
  '$api/models',
  'scripts/heading',
  'scripts/generatePlaylistButton',
  'scripts/setupSlider',
  'scripts/echonest'
  
  
  

  // generatePlaylistButton,
], function(models, heading,   generatePlaylistButton, setupSlider, echonest) {
  'use strict';
  
 
  
  
  
  $(document).ready(function(){

	  heading.writeHeading();
	  generatePlaylistButton.setUpGeneratePlaylistButton();
	  setupSlider.setUpPopSlider(echonest);
	  setupSlider.setUpHotSlider(echonest);
	 

	}); 


});
