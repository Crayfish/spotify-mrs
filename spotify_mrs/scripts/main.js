jQuery.ajaxSettings.traditional = true;


require([
  '$api/models',
  'scripts/heading',
  'scripts/generatePlaylistButton',
  'scripts/trackCover',
  'scripts/setupSlider'
  
  

  // generatePlaylistButton,
], function(models, heading,  generatePlaylistButton, trackCover, setupSlider) {
  'use strict';
  
 
  heading.writeHeading();
  generatePlaylistButton.setUpGeneratePlaylistButton();
  setupSlider.setUpPopSlider();
  setupSlider.setUpHotSlider();
  
  
  //generatePlaylistButton.doShareButtonForArtist();
  generatePlaylistButton.doPlayButtonForAlbum();
  //trackCover.getTrackCover();
  //playlistExample.doPlaylistForAlbum();

});
