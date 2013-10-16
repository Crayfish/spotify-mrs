/**
 * Handler for the year pickers.
 * Sets the values of the pickers in the echonestDynamic script.
 */

require([
  '$api/models',
  'scripts/echonestDynamic'

 
], function(models, echonestDynamic) {
  'use strict';

  var setUpYearPicker = function() {
	  setUpYearPicker1(echonestDynamic);
 
  };
  
  exports.setUpYearPicker = setUpYearPicker;
 
});



function setUpYearPicker1(echonestDynamic){
	console.log('YEAR PICKER setupYearPicker() was called');
	
	 $('.yearpick').append($('<option />').val('off').html('off'));
	 $('.yearpick').append($('<option />').val('present').html('present'));
	
	for (var i = new Date().getFullYear(); i > 1900; i--)
	{
		$('.yearpick').append($('<option />').val(i).html(i));
	}
	
	
	//EVENT Listners
	//artist_start_year_before	Matches artists that have an earliest start year before the given value
	 $('#artist_start_year_before').change(function() {
		 console.log('YEAR PICKER SETUP artist_start_year_before: '+$(this).val());
		 echonestDynamic.setArtistStartYearBefore($(this).val());
	 });  
	
	//artist_start_year_after 	Matches artists that have an earliest start year after the given value
	 $('#artist_start_year_after').change(function() {
		 console.log('YEAR PICKER SETUP artist_start_year_after : '+$(this).val());
		 echonestDynamic.setArtistStartYearAfter($(this).val());
	 });  
	
	 //artist_end_year_before 	Matches artists that have a latest end year before the given value
	 $('#artist_end_year_before').change(function() {
		 console.log('YEAR PICKER SETUP artist_end_year_before : '+$(this).val());
		 echonestDynamic.setArtistEndYearBefore($(this).val());
	 });  
	
	 //artist_end_year_after		Matches artists that have a latest end year after the given value
	 $('#artist_end_year_after').change(function() {
		 console.log('YEAR PICKER SETUP artist_end_year_after : '+$(this).val());
		 echonestDynamic.setArtistEndYearAfter($(this).val());
	 });  
	
	
}