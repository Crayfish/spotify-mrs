jQuery.ajaxSettings.traditional = true;


require([
  '$api/models',
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
  
], function( models, heading,generatePlaylistButton,setupSlider, 
		echonestDynamic, echonest, setupGenreFilter,setupTagCloud, 
		setUpSimilarityAccordion, echonestTasteProfile, customplaylist, 
		jPagesSetup, setupNoveltyCheckBoxes, playlistInformation) {
  'use strict';
  
 
	  models.session.addEventListener('change', changeOffline);
	  
	  function changeOffline(){
		  models.session.load('online').done(function(session){
			  console.log(models.session.online);
		  });
	  }
  
	  $(document).ready(function(){
		
		  models.session.load('online').done(function(session){
			  var online = models.session.online;
			  
			  if(online){
				  console.log("app is online");
				  init();
			  }
			  else if(!online){
				  console.log("app is offline");
			  }
		  });
	
	  }); 
  
  
  
	  function init(){
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

		setUpSimilarityAccordion.setupChangeSeedArtistButton();

		setUpSimilarityAccordion.setupChangeSeedSongButton();

		customplaylist.setupFlipButton();
		customplaylist.createNewPlaylist();

		//setupTagCloud.addTagCloudEventHandler(echonestDynamic);
		// generatePlaylistButton.setUpNewSeedButton();
		// generatePlaylistButton.setUpGeneratePlaylistButton();
		// setupSimilarityRadioButtons.setupSimilarityButtons();
		//setupSlider.setUpPopSlider(echonest);
		// setupSlider.setUpHotSlider(echonest);
		 
	  }
	
	
});
