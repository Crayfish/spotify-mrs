jQuery.ajaxSettings.traditional = true;


require([
  '$api/models',
  'scripts/heading',
  'scripts/generatePlaylistButton',
  'scripts/setupSlider',
  'scripts/echonest',
  'scripts/setupSimilarityRadioButtons'
  
  
  

  // generatePlaylistButton,
], function(models, heading,   generatePlaylistButton, setupSlider, echonest, setupSimilarityRadioButtons) {
  'use strict';
  
 
  
  
  
  $(document).ready(function(){

	  heading.writeHeading();
	  generatePlaylistButton.setUpGeneratePlaylistButton();
	  setupSimilarityRadioButtons.setupSimilarityButtons();
	  setupSlider.setUpPopSlider(echonest);
	  setupSlider.setUpHotSlider(echonest);
	 

	}); 


});
