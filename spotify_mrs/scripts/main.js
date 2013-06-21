jQuery.ajaxSettings.traditional = true;


require([
  //'$api/models',
  'scripts/heading',
  'scripts/generatePlaylistButton',
  'scripts/setupSlider',

  'scripts/echonestDynamic',
  'scripts/echonest',
  'scripts/setupGenreFilter',
  'scripts/setupTagCloud'
  
  
  

  // generatePlaylistButton,
], function( heading,generatePlaylistButton,setupSlider, echonestDynamic, echonest, setupGenreFilter,setupTagCloud) {
  'use strict';
  
 
  
  
  
  $(document).ready(function(){
	  
	  //console.log('Main() executed');

	 heading.writeHeading();
	  
	  generatePlaylistButton.setUpNewSeedButton();
	  generatePlaylistButton.setUpNextSongsButton();
	  
	 setupSlider.setUpPopSlider(echonestDynamic);
	 setupSlider.setUpHotSlider(echonestDynamic);
	 setupSlider.setUpSongHotSlider(echonestDynamic);
	 setupSlider.setUpArtistVarietySlider(echonestDynamic);
	 setupSlider.setUpAdventurousnessSlider(echonestDynamic);
	 
	 //setupTagCloud.addTagCloudEventHandler(echonestDynamic);
	  
	 echonestDynamic.startNewSession();
	 
	 setupGenreFilter.setupGenreFilter(echonestDynamic);
	  
	 // generatePlaylistButton.setUpNewSeedButton();
	 // generatePlaylistButton.setUpGeneratePlaylistButton();
	  
	 // setupSimilarityRadioButtons.setupSimilarityButtons();
	  
	  //setupSlider.setUpPopSlider(echonest);
	 // setupSlider.setUpHotSlider(echonest);
	 

	}); 


});
