 var playableCovers = new Array();

 var pageCount = 1;
 
 var numberOfSongs =12;
 
 var loopContinue = true;
 
 var bannedSeedArtist = null;
 
 var trackIdsforPlaylist = new Array();

require([
  '$api/models',
  '$api/search',

  '$views/image#Image',
  '$views/popup#Popup',
  'scripts/customplaylist',
], function(models,search, Image, Popup, customplaylist) {
  'use strict';

       
  


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
   
    track.load('playable','name','artists').done(function(track) {
        if(!track.playable){console.log('TRACK NOT PLAYABLE');};
        if(track.playable){
        	
        		
        	   var artist = models.Artist.fromURI(track.artists[0]);
               
               console.log('jpagesTrackCover.getTrackCover() artist Id: '+artist);
               console.log('jpagesTrackCover.getTrackCover()  banned artist Id: '+bannedSeedArtist);
               
               if(artist == bannedSeedArtist){
               	console.log('jpagesTrackCover.getTrackCover() detected song by banned seed artist');
               };	
        	
               if(artist != bannedSeedArtist){
               
     
   
            	   trackIdsforPlaylist.push(id);
        	
        	
        
        
        	
        	//console.log('Trackname: ' + track.name);
        /*    var artist = models.Artist.fromURI(track.artists[0]);
            
            console.log('jpagesTrackCover.getTrackCover() artist Id: '+artist);
            console.log('jpagesTrackCover.getTrackCover()  banned artist Id: '+bannedSeedArtist);
            
            if(artist == bannedSeedArtist){
            	console.log('jpagesTrackCover.getTrackCover() detected song by banned seed artist');
            };
            */
           
            
            artist.load('name').done(function(artist){
//            	var toolTipString = track.name.decodeForHtml()+' by '+artist.name.decodeForHtml();
            	var trackname = track.name.decodeForHtml();
            	var artist = artist.name.decodeForHtml();
            	
            	var image = Image.forTrack(track, {width: 150, height: 150, player: true, overlay:[trackname, artist]});

                var target1 = document.createElement('div');
                target1.setAttribute('style', 'width: 150px; height: 150px; display: inline-block; margin: 5px;');
                target1.className = 'target';
           
                //add the current image to the container
                target1.appendChild(image.node);

                //console.log('Artistname: ' + artist.name.decodeForText());    
//                
//                        
//                       
//                        //create image caption
//                        var h2 = document.createElement('h2');
//                        h2.className = 'description';
//                       
//                       
//                        var span = document.createElement('span');
//                        var tracknametext = document.createTextNode(trackname);
//                        var artisttext = document.createTextNode(artist);
//                        var spacer1 = document.createElement('span');
//                        spacer1.className ='spacer';
//                        var spacer2 = document.createElement('span');
//                        spacer2.className ='spacer';
//                        var br = document.createElement('br');
//                       
//                        span.appendChild(tracknametext);
//                        span.appendChild(spacer1);
//                        span.appendChild(br);
//                        span.appendChild(spacer2);
//                        span.appendChild(artisttext);
//                       
//                        h2.appendChild(span);
//                       
//                        target1.appendChild(h2);
//       
//                        target1.setAttribute('data-tooltip', toolTipString);
//                       
                        //add image container to the main cover container
                     
                        
                     playableCovers.push(target1);   
                     console.log('size of playableCovers: '+playableCovers.length);
                     
                    
                     if(playableCovers.length == numberOfSongs){
                    	 for(var i = 0; i < playableCovers.length; i++){
                    		 covercontainer.appendChild(playableCovers[i]);
                    	 }
                    	 
                    	
                    	 playableCovers = new Array();
                    	 
                    	 loopContinue = false;
                    	 
                    	 $('#playlistContainer').hide();
                    	 $('#playlistHeader').hide();
           			  	$('#subscribebutton').hide();
                    	 
                    	  $("#holder").jPages("destroy").jPages({
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
  	        		   
  	        		   $("#holder").jPages( pageCount );
  	        		   pageCount= pageCount+1;
                    	
  	        		 customplaylist.createNewPlaylist(trackIdsforPlaylist);
  	        		 /* for(var i = 0; i< trackIdsforPlaylist.length; i++){
  	        			 customplaylist.addTrackToPlaylist(trackIdsforPlaylist[i]);
  	        		  }*/
  	        		 trackIdsforPlaylist = new Array(); 
                     }
                        
                    //covercontainer.appendChild(target1);
                    //echonestDynmic.playableCovers.push(target1);
                 
                    
            });
            //}
          //}
       // );
}}});
       
       
  };

  var checkLoopContinue = function(){
		
	  return loopContinue;
		 
	  };
	  
	  
	  var setLoopContinueToTrue = function(){
			
		   loopContinue = true;
			 
		  };  
		  
	 var setBannedSeedArtist = function(bannedSeedArtistFromEchonestDynamic){
				
			   bannedSeedArtist = bannedSeedArtistFromEchonestDynamic;
			   
			   console.log('jpagesTrackCover.setBannedSeedArtist() :' +bannedSeedArtistFromEchonestDynamic);
				 
			  };  

	exports.setLoopContinueToTrue=setLoopContinueToTrue;  
	exports.checkLoopContinue = checkLoopContinue;  
	exports.getTrackCover = getTrackCover;
	exports.setBannedSeedArtist = setBannedSeedArtist;
});


