require([
  '$api/models',
  '$api/search',
  '$views/image#Image',
  '$views/popup#Popup'
], function(models,search, Image, Popup) {
  'use strict';

       
        var popup = Popup.withText('Default text');

  var getTrackCover = function(trackID) {
   
        //get the container for the covers and set width
    var covercontainer = document.getElementById('albumCoverContainer');
        covercontainer.setAttribute('style', 'width: 645px;');

        //load track from id
      
        var id = trackID.replace('-WW','');
    var track = models.Track.fromURI(id);

    //if track not playable --> no cover download
   
    track.load('playable').done(function(track) {
        if(!track.playable){console.log('TRACK NOT PLAYABLE')};
        if(track.playable){
        //load image for the track
    var image = Image.forTrack(track, {width: 150, height: 150, player: true});

        //create a div container for the image
        var target1 = document.createElement('div');
        target1.setAttribute('style', 'width: 150px; height: 150px; display: inline-block; margin: 5px;');
        target1.className = 'target';
   
        //add the current image to the container
        target1.appendChild(image.node);

        //set mouse listeners for the container
/*      target1.addEventListener('mouseover', showPopup, false);
        target1.addEventListener('mouseout', hidePopup, false);
*/
        //load the track informations
        track.load('name','artists').done(function(track) {
        	
        	//get year
            var album = models.Album.fromURI(track.album);
            
            album.load('name').done(function(album){
            	console.log('album: '+album.name);
//            	var mysearch = search.Search.search("album:"+album.name);
//            	console.log(mysearch.albums[0]);   
            });	
//            
//            	    for(var i in mysearch.albums) {
//            	        var a = models.Album.fromURI(search.albums[i].uri, function(album) {
//            	          console.log(album.year);
//            	        });
//            	    }
//            	
            	
           
            
            
           
            
            
        	
        	//console.log('Trackname: ' + track.name);
            var artist = models.Artist.fromURI(track.artists[0]);
            
            console.log('trackCover.getTrackCover() artistID: '+artist);
            
            artist.load('name').done(function(artist){
                //console.log('Artistname: ' + artist.name.decodeForText());    
                var toolTipString = track.name.decodeForHtml()+' by '+artist.name.decodeForHtml();
                var trackname = track.name.decodeForHtml();
                        var artist = ' by '+artist.name.decodeForHtml();
                       
                        //create image caption
                        var h2 = document.createElement('h2');
                        h2.className = 'description';
                       
                       
                        var span = document.createElement('span');
                        var tracknametext = document.createTextNode(trackname);
                        var artisttext = document.createTextNode(artist);
                        var spacer1 = document.createElement('span');
                        spacer1.className ='spacer';
                        var spacer2 = document.createElement('span');
                        spacer2.className ='spacer';
                        var br = document.createElement('br');
                       
                        span.appendChild(tracknametext);
                        span.appendChild(spacer1);
                        span.appendChild(br);
                        span.appendChild(spacer2);
                        span.appendChild(artisttext);
                       
                        h2.appendChild(span);
                       
                        target1.appendChild(h2);
       
                        target1.setAttribute('data-tooltip', toolTipString);
                       
                        //add image container to the main cover container
                    covercontainer.appendChild(target1);
            });
          });
}});
       
       
  };



  exports.getTrackCover = getTrackCover;
});


//mouseover function
function showPopup() {
       

        popup.setText(this.getAttribute('data-tooltip'));

       
        popup.showFor(this);
  }
       
//mouseout function
  function hidePopup() {
    popup.hide();
//this.innerHTML = "";
}