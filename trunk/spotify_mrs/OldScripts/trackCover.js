require([
  '$api/models',
  '$views/image#Image',
], function(models, Image) {
  'use strict';


  var getTrackCover = function(trackID) {
   
	  
	  console.log("TrackCover.js is called");
        //get the container for the covers and set width
	  	var covercontainer = document.getElementById('albumCoverContainer');

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

		        //load the track informations
		        track.load('name','artists').done(function(track) {
        	
		        	//console.log('Trackname: ' + track.name);
		            var artist = models.Artist.fromURI(track.artists[0]);
            
		            console.log('trackCover.getTrackCover() artistID: '+artist);
            
		            artist.load('name').done(function(artist){
		                
		            	var trackname = track.name;
		            	
                        var artist = ' by '+artist.name;
                       
                       
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
       
                       
                        //add image container to the main cover container
                        covercontainer.appendChild(target1);
            });
          });
}});
       
       
  };



  exports.getTrackCover = getTrackCover;
});

