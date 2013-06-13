jQuery.ajaxSettings.traditional = true;


require([
  //'$api/models',
  'scripts/heading',
  'scripts/generatePlaylistButton',
  'scripts/setupSlider',

  'scripts/echonestDynamic',
  'scripts/echonest',
  'scripts/setupGenreFilter'
  
  
  

  // generatePlaylistButton,
], function( heading,generatePlaylistButton,setupSlider, echonestDynamic, echonest, setupGenreFilter) {
  'use strict';
  
 
  
  
  
  $(document).ready(function(){
	  
	  //console.log('Main() executed');

	 heading.writeHeading();
	  
	  generatePlaylistButton.setUpNewSeedButton();
	  generatePlaylistButton.setUpNextSongsButton();
	  
	 setupSlider.setUpPopSlider(echonestDynamic);
	 setupSlider.setUpHotSlider(echonestDynamic);
	 setupSlider.setUpSongHotSlider(echonestDynamic);
	  
	 echonestDynamic.startNewSession();
	 
	 setupGenreFilter.setupGenreFilter(echonestDynamic);
	  
	 // generatePlaylistButton.setUpNewSeedButton();
	 // generatePlaylistButton.setUpGeneratePlaylistButton();
	  
	 // setupSimilarityRadioButtons.setupSimilarityButtons();
	  
	  //setupSlider.setUpPopSlider(echonest);
	 // setupSlider.setUpHotSlider(echonest);
	 

	}); 


});
