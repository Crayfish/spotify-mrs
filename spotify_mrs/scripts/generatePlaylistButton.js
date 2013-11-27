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
			
		

			echonestDynamic.checkIfNewSessionIdIsNeeded();

		});

  };

  exports.setUpNextSongsButton = setUpNextSongsButton;

});
