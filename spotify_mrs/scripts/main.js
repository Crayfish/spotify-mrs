jQuery.ajaxSettings.traditional = true;


require([
  '$api/models',
  'scripts/heading',
  'scripts/generatePlaylistButton',
  'scripts/setupSlider'
  
  
  

  // generatePlaylistButton,
], function(models, heading,   generatePlaylistButton, setupSlider) {
  'use strict';
  
 
  
  
  
  $(document).ready(function(){

	  heading.writeHeading();
	  generatePlaylistButton.setUpGeneratePlaylistButton();
	  setupSlider.setUpPopSlider();
	  setupSlider.setUpHotSlider();
	 

	}); 


});
