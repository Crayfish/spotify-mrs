jQuery.ajaxSettings.traditional = true;


require([
  //'$api/models',
  'scripts/heading',
  'scripts/generatePlaylistButton',
  'scripts/setupSlider',

  'scripts/echonestDynamic',
  'scripts/echonest',
  'scripts/setupGenreFilter',
  'scripts/setupTagCloud',
  'scripts/setUpSimilarityAccordion',
  'scripts/echonestTasteProfile', 
  'scripts/customplaylist',
  'scripts/jPagesSetup',
  'scripts/setupNoveltyCheckBoxes',
  'scripts/playlistInformation'
  
  
  

  // generatePlaylistButton,
], function( heading,generatePlaylistButton,setupSlider, echonestDynamic, echonest, setupGenreFilter,setupTagCloud, setUpSimilarityAccordion, echonestTasteProfile, customplaylist, jPagesSetup, setupNoveltyCheckBoxes, playlistInformation) {
  'use strict';
  
 
  
  
  
  $(document).ready(function(){
	  
	  //console.log('Main() executed');

	// heading.writeHeading();
	  
	
	 
	 //echonestTasteProfile.createTasteProfile();
	  
	  playlistInformation.setUpPlaylistInformation();
	  
	  setupNoveltyCheckBoxes.setUpExcludeSeedArtistCheckBox();
	  setupNoveltyCheckBoxes.setUpNoSongsFromSpotifyCollectionCheckBox();
	 
	  generatePlaylistButton.setUpNewSeedButton();
	  generatePlaylistButton.setUpNextSongsButton();
	  
	 setupSlider.setUpPopSlider(echonestDynamic);
	 setupSlider.setUpHotSlider(echonestDynamic);
	 setupSlider.setUpSongHotSlider(echonestDynamic);
	 setupSlider.setUpArtistVarietySlider(echonestDynamic);
	 setupSlider.setUpAdventurousnessSlider(echonestDynamic);
	 
	 jPagesSetup.setupPages();
	 
	 echonestDynamic.startNewSession();
	 
	 setupGenreFilter.setupGenreFilter(echonestDynamic);
	 setUpSimilarityAccordion.setupAccordion();
	 
	 setUpSimilarityAccordion.setupChangeSeedArtistButton ();
	 
	 setUpSimilarityAccordion.setupChangeSeedSongButton();
	 
	customplaylist.setupFlipButton();
	
	 
	 //setupTagCloud.addTagCloudEventHandler(echonestDynamic);
	  
	
	 
	
	  
	 // generatePlaylistButton.setUpNewSeedButton();
	 // generatePlaylistButton.setUpGeneratePlaylistButton();
	  
	 // setupSimilarityRadioButtons.setupSimilarityButtons();
	  
	  //setupSlider.setUpPopSlider(echonest);
	 // setupSlider.setUpHotSlider(echonest);
	 

	}); 


});
