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

var labelArtist_start_year_before_input= '';
var labelArtist_start_year_after_input= '';
var labelArtist_end_year_before_input = '';
var labelArtist_end_year_after_input = '';

function setUpYearPicker1(echonestDynamic){
	console.log('YEAR PICKER setupYearPicker() was called');
	
	var yearPickerArray = new Array();
	yearPickerArray.push('off');
	//yearPickerArray.push('present');
	
	 //$('.yearpick').append($('<option />').val('off').html('off'));
	 //$('.yearpick').append($('<option />').val('present').html('present'));
	
	for (var i = new Date().getFullYear(); i > 1900; i--)
	{
		//$('.yearpick').append($('<option />').val(i).html(i));
		console.log('YEAR PICKER SETUP add date loop: '+i);
		yearPickerArray.push(i.toString());
	}
	
	
	
	$( "#artist_start_year_before_input" ).autocomplete({
		minLength: 0,
		source: yearPickerArray,
		appendTo: '#yearSection',  
	    open: function() { $('#yearSection .ui-menu').width(70)},
		close: function(event, ui){
			console.log("YEAR PICKER SETUP FOCUS LOST");
			document.getElementById('artist_start_year_before_input').value=labelArtist_start_year_before_input; },
		select: function( event, ui){
		
			labelArtist_start_year_before_input = ui.item.label; 
			document.getElementById('artist_start_year_before_input').value=ui.item.label; 
			echonestDynamic.setArtistStartYearBefore(ui.item.label);
			$(this).blur(); 
			 return false;
		}
	
	 	}).focus(function(){  
	 		document.getElementById('artist_start_year_before_input').value=''; 
	 		$(this).autocomplete('search', $(this).val());
	 	});
	
	
	
	$( "#artist_start_year_after_input" ).autocomplete({
		minLength: 0,
		source: yearPickerArray,
		appendTo: '#yearSection',  
	    open: function() { $('#yearSection .ui-menu').width(70)},
		close: function(event, ui){
			console.log("YEAR PICKER SETUP FOCUS LOST");
			document.getElementById('artist_start_year_after_input').value=labelArtist_start_year_after_input; },
		select: function( event, ui){
		
			labelArtist_start_year_after_input = ui.item.label; 
			document.getElementById('artist_start_year_after_input').value=ui.item.label; 
			echonestDynamic.setArtistStartYearAfter(ui.item.label);
			$(this).blur(); 
			 return false;
		}
	
	 	}).focus(function(){  
	 		document.getElementById('artist_start_year_after_input').value=''; 
	 		$(this).autocomplete('search', $(this).val());
	 	});
	
	
	$( "#artist_end_year_before_input" ).autocomplete({
		minLength: 0,
		source: yearPickerArray,
		appendTo: '#yearSection',  
	    open: function() { $('#yearSection .ui-menu').width(70)},
		close: function(event, ui){
			console.log("YEAR PICKER SETUP FOCUS LOST");
			document.getElementById('artist_end_year_before_input').value=labelArtist_end_year_before_input; },
		select: function( event, ui){
		
			labelArtist_end_year_before_input = ui.item.label; 
			document.getElementById('artist_end_year_before_input').value=ui.item.label; 
			echonestDynamic.setArtistEndYearBefore(ui.item.label);
			$(this).blur(); 
			 return false;
		}
	
	 	}).focus(function(){  
	 		document.getElementById('artist_end_year_before_input').value=''; 
	 		$(this).autocomplete('search', $(this).val());
	 	});
	
	
	
	$( "#artist_end_year_after_input" ).autocomplete({
		minLength: 0,
		source: yearPickerArray,
		appendTo: '#yearSection',  
	    open: function() { $('#yearSection .ui-menu').width(70)},
		close: function(event, ui){
			console.log("YEAR PICKER SETUP FOCUS LOST");
			document.getElementById('artist_end_year_after_input').value=labelArtist_end_year_after_input; },
		select: function( event, ui){
		
			labelArtist_end_year_after_input = ui.item.label; 
			document.getElementById('artist_end_year_after_input').value=ui.item.label; 
			echonestDynamic.setArtistEndYearAfter(ui.item.label);
			$(this).blur(); 
			 return false;
		}
	
	 	}).focus(function(){  
	 		document.getElementById('artist_end_year_after_input').value=''; 
	 		$(this).autocomplete('search', $(this).val());
	 	});
	
	
	//init all of the yearPickers with off
	$('.yearInput').val('off');
	labelArtist_start_year_before_input= 'off';
	labelArtist_start_year_after_input= 'off';
	labelArtist_end_year_before_input = 'off';
	labelArtist_end_year_after_input = 'off';
	
	
	
/*	
	
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
	 });  */
	
	
}