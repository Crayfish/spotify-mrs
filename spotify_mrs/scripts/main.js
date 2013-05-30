require([
  '$api/models',
  'scripts/heading',
  'scripts/generatePlaylistButton',
  'scripts/trackCover'
  
  

  // generatePlaylistButton,
], function(models, heading,  generatePlaylistButton, trackCover) {
  'use strict';
  
 
  heading.writeHeading();
  generatePlaylistButton.setUpGeneratePlaylistButton();
  
  
  
  //generatePlaylistButton.doShareButtonForArtist();
  generatePlaylistButton.doPlayButtonForAlbum();
  //trackCover.getTrackCover();
  //playlistExample.doPlaylistForAlbum();

});
