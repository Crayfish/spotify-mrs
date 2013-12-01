/**
 * Set up the search button
 */

require([
  '$api/models',
  '$views/buttons',
  'scripts/echonestDynamic'
  //'scripts/setupSimilarityRadioButtons'
], function(models, buttons, echonestDynamic ) {
  'use strict';

  var setUpNextSongsButton = function(){

		$('#nextSongsButton').button().click(function(event) {
			event.preventDefault();

			console.log('Get Next Songs Button was clicked');
			
			//make sure if genre or playlist similarity is selected, the autocomplete widget is not empty
			if($('#genreRadiobtn').prop('checked')){
				if($('#tags').val()==''){
				return;
				}
			}
			
			
			
			if($('#playlistRadiobtn').prop('checked')){
				if($('#tags1').val()==''){
				return;
				}
			}
			

			echonestDynamic.checkIfNewSessionIdIsNeeded();

		});

  };

  exports.setUpNextSongsButton = setUpNextSongsButton;

});
