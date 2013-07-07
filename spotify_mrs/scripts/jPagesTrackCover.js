 var playableCovers = new Array();

 var pageCount = 1;
 
 var numberOfSongs =12;
 
 var loopContinue = true;

require([
  '$api/models',
  '$api/search',

  '$views/image#Image',
  '$views/popup#Popup',
  //'scripts/jPagesSetup',
], function(models,search, Image, Popup) {
  'use strict';

       
  var popup = Popup.withText('Default text');
  


  var getTrackCover = function(trackID) {
   
        //get the container for the covers and set width
    var covercontainer = document.getElementById('albumCoverContainer');
    covercontainer.setAttribute('style', 'width: 645px;');
    
    

  // for(var j =0; j< 20;j++){
	   //var list = document.getElementById('itemContainer');
    	//var li = document.createElement("li");
    	//li.appendChild(document.createTextNode("Your list item text"));
    	//list.appendChild(li);
   // }
    
   
    	
    	
    
    
        //load track from id
      
        var id = trackID.replace('-WW','');
        var track = models.Track.fromURI(id);

    //if track not playable --> no cover download
   
    track.load('playable').done(function(track) {
        if(!track.playable){console.log('TRACK NOT PLAYABLE');};
        if(track.playable){
        //load image for the track
    var image = Image.forTrack(track, {width: 150, height: 150, player: true});

        //create a li container for the image
    
    
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
                     
                        
                     playableCovers.push(target1);   
                     console.log('size of playableCovers: '+playableCovers.length);
                     
                     if(playableCovers.length == numberOfSongs){
                    	 for(var i = 0; i < playableCovers.length; i++){
                    		 covercontainer.appendChild(playableCovers[i]);
                    	 }
                    	 
                    	 playableCovers = new Array();
                    	 
                    	 loopContinue = false;
                    	 
                    	  $("div.holder").jPages("destroy").jPages({
  	                        containerID   : "albumCoverContainer",
  	                        perPage       :numberOfSongs,
  	                        first       : "first",
  	                        previous    : "previous",
  	                        next        : "next",
  	                       last        : "last", 
  	                       // last        :  "Next Songs", 
  	                        animation   : "fadeInLeftBig",
  	                      
  	                       /* callback    : function( pages, items ){
  	                                   pageCount =  pages.count;
  	                               
  	                        },*/
  	        		   
  	        		   		//startPage: pageCount 
  	        		   	
  	                    });
  	        		   
  	        		   $("div.holder").jPages( pageCount );
  	        		   pageCount= pageCount+1;
                    	 
                    	 
                     }
                        
                    //covercontainer.appendChild(target1);
                    //echonestDynmic.playableCovers.push(target1);
                 
                    
            });
          });
}});
       
       
  };

  var checkLoopContinue = function(){
		
	  return loopContinue;
		 
	  };
	  
	  
	  var setLoopContinueToTrue = function(){
			
		   loopContinue = true;
			 
		  };  

	exports.setLoopContinueToTrue=setLoopContinueToTrue;  
	exports.checkLoopContinue = checkLoopContinue;  
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