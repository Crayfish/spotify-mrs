/**
 * Handler for similarity radio buttons.
 * Updates GUI on selection.
 */
require([ 
          '$api/models',
          'scripts/echonestDynamic'
], function(models,echonestDynamic) {
	'use strict';

	var setupSimilarityButtons = function() {
		
		var artistRadiobtn = document.getElementById("artistRadiobtn");
		artistRadiobtn.checked = true;

		$('#changeSeedSong').hide();
		$('#tags').hide();
		$('#genreSelectLabel').hide();
		$('#tags1').hide();
		$('#playlistSelectLabel').hide();
		$("#adventurousnessSlider").hide();
		$("#adventurousnessSliderLabel").hide();

		var radios = document.forms[0].elements["sim"];
		for ( var i = [ 0 ]; i < radios.length; i++)
			radios[i].onclick = radioClicked;

		setupChangeSeedArtistButton(echonestDynamic);
		setupChangeSeedSongButton(echonestDynamic);

	};

	var returnSimilarityMode = function() {
		var mode = returnSimilarityMode1();
		return mode;
	};

	function radioClicked() {

		switch (this.value) {
		case "song":
			console.log('Song Similarity Radio Button was clicked');
			echonestDynamic.changeToSongSimilarity();
			break;
			
		case "artist":
			console.log('Artist Similarity Radio Button was clicked');
			$('#tags1').hide();
			$('#playlistSelectLabel').hide();
			echonestDynamic.changeToArtistSimilarity();
			break;
			
		case "genre":
			console.log('Genre Similarity Radio Button was clicked');
			$('#tags').show();
			$('#genreSelectLabel').show();
			$('#changeSeedSong').hide();
			$('#changeSeedArtist').hide();
			$("#similarityInfo").text('');
			$('#tags1').hide();
			$('#playlistSelectLabel').hide();
			$('#excludeSeedArtistCheckBox').hide();
			$('#excludeSeedArtistLabel').hide();
			$('#excludeSeedArtistLabel').next('br').hide();
			$("#adventurousnessSlider").hide();
			$("#adventurousnessSliderLabel").hide();
			break;
			
		case "spotifyPLaylist":
			console.log('Playlist Similarity Radio Button was clicked');
			$('#tags1').show();
			$('#playlistSelectLabel').show();
			$('#changeSeedSong').hide();
			$('#changeSeedArtist').hide();
			$("#similarityInfo").text('');
			$('#tags').hide();
			$('#genreSelectLabel').hide();
			$('#excludeSeedArtistCheckBox').hide();
			$('#excludeSeedArtistLabel').hide();
			$('#excludeSeedArtistLabel').next('br').hide();
			break;

		}

	}

	exports.setupSimilarityButtons = setupSimilarityButtons;
	exports.returnSimilarityMode = returnSimilarityMode;
	
});//end require*********************************************************************

function setupChangeSeedArtistButton(echonestDynamic) {

	$("#changeSeedArtist").button().click(function(event) {
		event.preventDefault();
		echonestDynamic.changeSeedArtistSimilarity();
	});

}

function setupChangeSeedSongButton(echonestDynamic) {

	$("#changeSeedSong").button().click(function(event) {
		event.preventDefault();
		echonestDynamic.changeSeedSongSimilarity();
	});

}

function returnSimilarityMode1() {
	
	if (document.getElementById('song').checked) {
		var song = 'song';
		return song;
		
	} else {
		if (document.getElementById('song').checked) {
			var artist = 'artist';
			return artist;
		}
	}
}
