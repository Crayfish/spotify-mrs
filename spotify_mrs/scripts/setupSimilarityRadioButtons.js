

require([
  '$api/models',
 'scripts/echonest'
], function(models, echonest) {
  'use strict';

 
  var setupSimilarityButtons = function() {
	  var radios = document.forms[0].elements["similarity"];
	  for (var i = [0]; i < radios.length; i++)
	    radios[i].onclick=radioClicked;
  };

  
  var returnSimilarityMode = function(){
	  var mode =  returnSimilarityMode1();
	  return mode;
  };
  
  function radioClicked() {


		
		
	  switch(this.value) {
	    case "song" :
	      console.log('Song Similarity Radio Button was clicked');
	      echonest.getPlaylistSongSimilarity();
	       break;
	    case "artist" :
	       console.log('Artist Similarity Radio Button was clicked');
	       echonest.getPlaylistArtistSimilarity();
	       break;
	   
	  }

	}
  
  

  
  
  exports.setupSimilarityButtons = setupSimilarityButtons;
  exports.returnSimilarityMode =returnSimilarityMode;
});





function returnSimilarityMode1(){
	if(document.getElementById('song').checked){
		var song = 'song';
		return song;
	}else{
		if(document.getElementById('song').checked){
		var artist ='artist';
		return artist;
		}
	}
}


