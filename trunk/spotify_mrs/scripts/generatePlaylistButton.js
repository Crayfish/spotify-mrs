/**
 * Set up the search button
 */

require([
  '$api/models',
  '$views/buttons',
  'scripts/echonestDynamic',
  'scripts/setupSimilarityRadioButtons'
], function(models, buttons, echonestDynamic, setupSimilarityRadioButtons ) {
  'use strict';

  var setUpNextSongsButton = function(){

		$('#nextSongsButton').button().click(function(event) {
			event.preventDefault();

			console.log('Get Next Songs Button was clicked');
			
		

			echonestDynamic.restartSessionWithCurrentGuiState();

		});

  };

  exports.setUpNextSongsButton = setUpNextSongsButton;

});
