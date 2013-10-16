/**
 * Handler for Sliders.
 * Sets the selected value in the echonestDynamic script.
 */

require([
  'scripts/echonestDynamic'
], function(echonest) {
  'use strict';

  var setUpPopSlider = function setUpPopSlider(echonestDynamic){
	  setUpPopSlider1(echonestDynamic);
  };
 
  var setUpHotslider = function setUpHotSlider(echonestDynamic){
	  setUpHotSlider1(echonestDynamic);
  };
        
  var setUpSongHotSlider = function setUpSongHotSlider(echonestDynamic){
	  setUpSongHotSlider1(echonestDynamic);
  };
        
  var setUpArtistVarietySlider = function setUpArtistVarietySlider(echonestDynamic){
	  setUpArtistVarietySlider1(echonestDynamic);
  };  
            
  var setUpAdventurousnessSlider = function setUpAdventurousnessSlider(echonestDynamic){
	  setUpAdventurousnessSlider1(echonestDynamic);
  };    
 
  exports.setUpHotSlider = setUpHotslider;
  exports.setUpPopSlider = setUpPopSlider;
  exports.setUpSongHotSlider=setUpSongHotSlider;
  exports.setUpArtistVarietySlider =setUpArtistVarietySlider;
  exports.setUpAdventurousnessSlider = setUpAdventurousnessSlider;
 
});//end require ************************************************************************



function setUpAdventurousnessSlider1(echonestDynamic){
	console.log('setUpAdventurousnessSlider was called');
	
    $( "#adventurousnessSlider" ).slider({
       
    	min: 0,
    	max: 100,
    	value: 20 ,
       
        slide: function( event, ui ) { },
       
        stop: function ( event, ui ) {
        	echonestDynamic.changeAdventurousness();
        },
    });
}


function setUpArtistVarietySlider1(echonestDynamic){
	console.log('setUpArtistVarietySlider was called');
	
	 $( "#artistVarietySlider" ).slider({
		
		 min: 0,
		 max: 100,
		 value: 50 ,

		 slide: function( event, ui ) { },
	       
		 stop: function ( event, ui ) {
			 echonestDynamic.changeArtistVariety();
		 },
	       
	 });
	
}


function setUpPopSlider1(echonestDynamic){
    console.log('SetUpPopSlider() was called');
    
    $( "#slider-pop" ).bind("mousedown", function(event){
    
    	var guiDisabled = echonestDynamic.returnGuiDisabled();
    	
    	if( $( "#slider-pop" ).slider( "option", "disabled" )&& !guiDisabled){
    		$( "#slider-pop" ).slider( "enable" );
    	}  

    });
    
    //jQuery Syntax: $(selector).action(), # steht für element with id="slider-range"
    $( "#slider-pop" ).slider({

    	min: 0,
    	max: 5,
    	step: 1,
    	animate: true,
 
    	create: function( event, ui ) {
    		setSliderTicks(event.target);
    	},
	           
    	slide: function( event, ui ) { },
	         
    	stop: function ( event, ui ) {
    		
    		var artistFamilarityLevel = ui.value;
    		echonestDynamic.changeArtistFamiliarity(artistFamilarityLevel);
	        	 
    	},
	         
    	change: function( event, ui ) {}
	         
    });
    
    //disbale for app start  
    $("#slider-pop").slider( "value", 0 );
    $("#slider-pop").slider( "option", "disabled", true );
 
}


function setUpHotSlider1(echonestDynamic){
    console.log('SetUpSongHotSlider() was called');
    
    $( "#slider-hot" ).bind("mousedown", function(event){
    	
    	var guiDisabled = echonestDynamic.returnGuiDisabled();
    	
    	if( $( "#slider-hot" ).slider( "option", "disabled" )&& !guiDisabled){
    		$( "#slider-hot" ).slider( "enable" );
    	}  

    });
    
    //jQuery Syntax: $(selector).action(), # steht für element with id="slider-range"
    $( "#slider-hot" ).slider({
    	
    	min: 0,
    	max: 5,
    	step: 1,                
    	animate: true,
    
    	create: function( event, ui ) {
    		setSliderTicks(event.target);
    	},
    
    	slide: function( event, ui ) {},
    
    	stop: function ( event, ui ) {
    		console.log('Hot slider Stop');
            var artistHotnessLevel = ui.value;// $( ".selector" ).slider( "option", "value" );
            echonestDynamic.changeArtistHotness(artistHotnessLevel);
    	}      
   
    });	
   
    //disable for app start
    $("#slider-hot").slider( "value", 0 );
	$("#slider-hot").slider( "option", "disabled", true ); 
}


function setUpSongHotSlider1(echonestDynamic){
	  console.log('SetUpHotSlider() was called');
	  
	  $( "#slider-songHot" ).bind("mousedown", function(event){
		  
		  var guiDisabled = echonestDynamic.returnGuiDisabled();
		  
		  if( $( "#slider-songHot" ).slider( "option", "disabled" )&& !guiDisabled){
	       		 $( "#slider-songHot" ).slider( "enable" );
		  }  

	  });
	  
	  //jQuery Syntax: $(selector).action(), # steht für element with id="slider-range"
	  $( "#slider-songHot" ).slider({
	   
		  min: 0,
		  max: 5,
		  step: 1,
		  animate: true,
		  
		  create: function( event, ui ) {
	        setSliderTicks(event.target);
		  },
		  
		  slide: function( event, ui ) { },
	   
		  stop: function ( event, ui ) {
			  console.log('SongHot slider Stop');
			  var songHotnesLevel =  ui.value
			  echonestDynamic.changeSongHotness(songHotnesLevel);
		  }
	    
	  });
	   
	  //disable for app start
	  $("#slider-songHot").slider( "value", 0 );
	  $("#slider-songHot").slider( "option", "disabled", true );
}


/**
 * Draw ticks on the sliders.
 * @param el
 */
function setSliderTicks(el) {
    var $slider =  $(el);
    var max =  $slider.slider("option", "max");    
    var min =  $slider.slider("option", "min");    
    var spacing =  100 / (max - min);

    $slider.find('.ui-slider-tick-mark').remove();
    for (var i = 0; i < max-min ; i++) {
    	if(i>0){
    		$('<span class="ui-slider-tick-mark"></span>').css('left', (spacing * i) +  '%').appendTo($slider); 
    	}
        
     }
}

