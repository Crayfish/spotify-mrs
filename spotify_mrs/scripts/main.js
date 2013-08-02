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
  'scripts/playlistInformation',
  'scripts/yearSlider'
  
], function( models, heading,generatePlaylistButton,setupSlider, 
		echonestDynamic, echonest, setupGenreFilter,setupTagCloud, 
		setUpSimilarityAccordion, echonestTasteProfile, customplaylist, 
		jPagesSetup, setupNoveltyCheckBoxes, playlistInformation, yearSlider) {
  'use strict';
 
  	  /**load a page when the app is started*/
  	  $(document).ready(loadpage()); 
  	  
  	  /**detect when app goes offline*/
	  models.session.addEventListener('change', loadpage);
	  
	 
	  /**
	   * Check if connected to the internet and if a track is currently playing.
	   * Load a page according to the state: 
	   * 	- online : 			pages/main.html
	   * 	- offline: 			pages/offline.html
	   * 	- nothing playing: 	pages/intro.html
	   */
	  function loadpage(){
		  models.session.load('online').done(function(session){
			  var online = models.session.online;
			  
			  if(online){
				  console.log("app is online");
				  
				  var playing;
				  models.player.load('track').done(function(player){
					  playing = models.player.track;
				  });
				  console.log("currently playling: "+playing==null);
				  
				  
				  $('#main').load('pages/main.html',function(){
					  console.log("main loaded");
					  init();
				  });
				  
				  if(!playing){
					  
					  $('#overlay-wrapper').load('pages/intro.html',function(){
						  console.log("no tracks playing. showing intro.");
						  models.player.addEventListener('change', removeoverlay);
					  });
				  }
				  
			  }
			  else if(!online){
				  console.log("app is offline");
				  $('#main').load('pages/offline.html',function(){
					  console.log("no internet connection. offline page showing.");
				  });
			  }
		  });
	  }
  
	  /**
	   * Init the scripts.
	   */
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
		
		yearSlider.setupYearSlider();

		//setupTagCloud.addTagCloudEventHandler(echonestDynamic);
		// generatePlaylistButton.setUpNewSeedButton();
		// generatePlaylistButton.setUpGeneratePlaylistButton();
		// setupSimilarityRadioButtons.setupSimilarityButtons();
		//setupSlider.setUpPopSlider(echonest);
		// setupSlider.setUpHotSlider(echonest);
		 
	  }
	  
	  function removeoverlay(){
		  var playing;
		  models.player.load('track').done(function(player){
			  playing = models.player.track;
		  });
		  if(playing){
			  $('#intro').remove();
			  $('#main').load('pages/main.html',function(){
				  console.log("main loaded");
				  init();
				  models.player.removeEventListener('change', removeoverlay);
			  });
		  }
		  
	  }
	
	
});
