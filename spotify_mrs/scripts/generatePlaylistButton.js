require([
  '$api/models',
  '$views/buttons',
  'scripts/echonest'
], function(models1, buttons, echonest ) {
  'use strict';

  var doPlayButtonForAlbum = function() {
    var album = models1.Album.fromURI('spotify:album:2mCuMNdJkoyiXFhsQCLLqw');
    var button = buttons.PlayButton.forItem(album);
    document.getElementById('buttonContainer').appendChild(button.node);
  };

/*  var doShareButtonForArtist = function() {
    var artist = models.Artist.fromURI('spotify:artist:0gxyHStUsqpMadRV0Di1Qt');
    var button = buttons.ShareButton.forArtist(artist);
    document.getElementById('buttonContainer').appendChild(button.node);
  };
  */
  var setUpGeneratePlaylistButton = function() {
	    var generatePlaylistButton = document.getElementById('generatePlaylistButton');
	    generatePlaylistButton.onclick=function(){
	    	//console.log("Pressed GeneratePlaylistButton");
	    	echonest.fetchPlaylist();
	  }
  };

  exports.doPlayButtonForAlbum = doPlayButtonForAlbum;
 // exports.doShareButtonForArtist = doShareButtonForArtist;
  exports.setUpGeneratePlaylistButton = setUpGeneratePlaylistButton;
});
