require([
  //'$api/models',
  //'$views/image#Image',
  //'$views/popup#Popup'
  'scripts/echonestDynamic'
], function(echonest) {
  'use strict';

       
  var setUpPopSlider = function setUpPopSlider(echonestDynamic){
          setUpPopSlider1(echonestDynamic);
       
        };
 
 
 
 
  var setUpHotslider = function setUpHotSlider(echonestDynamic){
          setUpHotSlider1(echonestDynamic);
         
        };
        
        
        var setUpSongHotSlider = function setUpHotSlider(echonestDynamic){
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
 
});



function setUpAdventurousnessSlider1(echonestDynamic){
	console.log('setUpAdventurousnessSlider was called');
	
    $( "#adventurousnessSlider" ).slider({
        //setzen der Slider Attributte  
        //range: true,
       min: 0,
       max: 100,
       value: 20 ,

        slide: function( event, ui ) {
      
        },
       
        stop: function ( event, ui ) {
        	// console.log("Adventurousness Slider Stop");
        	echonestDynamic.changeAdventurousness();
              
        	
        },
       
      
       
        });
	
}

function setUpArtistVarietySlider1(echonestDynamic){
	console.log('setUpArtistVarietySlider was called');
	
	 $( "#artistVarietySlider" ).slider({
	        //setzen der Slider Attributte  
	        //range: true,
	       min: 0,
	       max: 100,
	       value: 50 ,

	        slide: function( event, ui ) {
	      
	        },
	       
	        stop: function ( event, ui ) {
	        	 console.log("Artist Variety Slider Stop");
	        	echonestDynamic.changeArtistVariety();
	              
	        	
	        },
	       
	      
	       
	        });
	
	
	
}


//old code for range slider
/*function setUpPopSlider1(echonestDynamic){
          console.log('SetUpPopSlider() betreten');
                //jQuery Syntax: $(selector).action(), # steht für element with id="slider-range"
                $( "#slider-pop" ).slider({
                //setzen der Slider Attributte  
                range: true,
                min: 0,
                max: 100,
                values: [0, 100 ],
       
                slide: function( event, ui ) {
                $( "#pop" ).val(  ui.values[ 0 ] + " - " + ui.values[ 1 ] );
               
       
               
                if( ui.values[ 0 ] == ui.values[ 1 ]){
                        console.log('Slider slide() betreten');
                        $( "#slider-pop" ).slider( "values", 1,ui.values[ 0 ]+10  );
                }
                if( ui.values[ 1 ] == ui.values[ 0 ]){
                        console.log('Slider slide() betreten');
                        $( "#slider-pop" ).slider( "values", 0,ui.values[ 1 ]-10  );
                }
                },
               
                stop: function ( event, ui ) {
                	
                	echonestDynamic.changeArtistPopularity();
                        //console.log("Pop slider Stop");
                	if(document.getElementById('song').checked){
                        echonestDynamic.changeArtistPopularity();
                	}else{
                		 echonestDynamic.changeArtistPopularity();
                	}
                },
               
                change: function( event, ui ) {
                        console.log('Slider Change Event');
                }
               
                });
               
       
               
                $( "#pop" ).val(  $( "#slider-pop" ).slider( "values", 0 ) +
                " - " + $( "#slider-pop" ).slider( "values", 1 ) );
}*/

/*function setUpHotSlider1(echonestDynamic){
        console.log('SetUpSongHotSlider() betreten');
        //jQuery Syntax: $(selector).action(), # steht für element with id="slider-range"
        $( "#slider-hot" ).slider({
        //setzen der Slider Attributte  
        range: true,
        min: 0,
        max: 100,
        values: [0, 100 ],
        slide: function( event, ui ) {
        $( "#hot" ).val(  ui.values[ 0 ] + " - " + ui.values[ 1 ] );
        if( ui.values[ 0 ] == ui.values[ 1 ]){
                //console.log('Slider slide() betreten');
                $( "#slider-hot" ).slider( "values", 1,ui.values[ 0 ]+10  );
        }
        if( ui.values[ 1 ] == ui.values[ 0 ]){
                //console.log('Slider slide() betreten');
                $( "#slider-hot" ).slider( "values", 0,ui.values[ 1 ]-10  );
        }
        },
        stop: function ( event, ui ) {
                console.log('Hot slider Stop');
                echonestDynamic.changeArtistHotness();
                if(document.getElementById('song').checked){
                    echonest.getPlaylistSongSimilarity();
            	}else{
            		echonest.getPlaylistArtistSimilarity();
            	}
        }      
       
        });
       
        $( "#hot" ).val(  $( "#slider-hot" ).slider( "values", 0 ) +
        " - " + $( "#slider-hot" ).slider( "values", 1 ) );
}*/

function setUpPopSlider1(echonestDynamic){
    console.log('SetUpPopSlider() betreten');
          //jQuery Syntax: $(selector).action(), # steht für element with id="slider-range"
          $( "#slider-pop" ).slider({
          //setzen der Slider Attributte  
      
          min: 0,
          max: 5,
         step: 1,
 
         create: function( event, ui ) {
             setSliderTicks(event.target);
           },
           
          slide: function( event, ui ) {
         
          },
         
          stop: function ( event, ui ) {
        	var artistFamilarityLevel = ui.value;
          	echonestDynamic.changeArtistFamiliarity(  artistFamilarityLevel);
                  //console.log("Pop slider Stop");
          
          },
         
          change: function( event, ui ) {
                  //console.log('Slider Change Event');
          }
         
          });
         
 
         
        
}
function setUpHotSlider1(echonestDynamic){
    console.log('SetUpSongHotSlider() betreten');
    //jQuery Syntax: $(selector).action(), # steht für element with id="slider-range"
    $( "#slider-hot" ).slider({
    //setzen der Slider Attributte  
    
    min: 0,
    max: 5,
    step: 1,
    
    create: function( event, ui ) {
        setSliderTicks(event.target);
    },
    
    slide: function( event, ui ) {
  
    },
    
    stop: function ( event, ui ) {
            console.log('Hot slider Stop');
            var artistHotnessLevel = ui.value;// $( ".selector" ).slider( "option", "value" );
            //console.log('ARTIST HOTNESS SLIDER VALUE: '+artistHotnessLevel);
            echonestDynamic.changeArtistHotness(artistHotnessLevel);
           
    }      
   
    });
   
    
}


function setUpSongHotSlider1(echonestDynamic){
	  console.log('SetUpHotSlider() betreten');
	    //jQuery Syntax: $(selector).action(), # steht für element with id="slider-range"
	    $( "#slider-songHot" ).slider({
	    //setzen der Slider Attributte  
	   
	    min: 0,
	    max: 5,
	    step: 1,
	    create: function( event, ui ) {
	        setSliderTicks(event.target);
	    },
	    slide: function( event, ui ) {
	   
	    },
	    stop: function ( event, ui ) {
	            console.log('SongHot slider Stop');
	            var songHotnesLevel =  ui.value
	            echonestDynamic.changeSongHotness(songHotnesLevel);
	         
	    }
	    
	    });
	   
	   
}

/*function setUpSongHotSlider1(echonestDynamic){
    console.log('SetUpHotSlider() betreten');
    //jQuery Syntax: $(selector).action(), # steht für element with id="slider-range"
    $( "#slider-songHot" ).slider({
    //setzen der Slider Attributte  
    range: true,
    min: 0,
    max: 100,
    values: [0, 100 ],
    slide: function( event, ui ) {
    $( "#songHot" ).val(  ui.values[ 0 ] + " - " + ui.values[ 1 ] );
    if( ui.values[ 0 ] == ui.values[ 1 ]){
            //console.log('Slider slide() betreten');
            $( "#slider-songHot" ).slider( "values", 1,ui.values[ 0 ]+10  );
    }
    if( ui.values[ 1 ] == ui.values[ 0 ]){
            //console.log('Slider slide() betreten');
            $( "#slider-songHot" ).slider( "values", 0,ui.values[ 1 ]-10  );
    }
    },
    stop: function ( event, ui ) {
            console.log('SongHot slider Stop');
            echonestDynamic.changeSongHotness();
            if(document.getElementById('song').checked){
                echonest.getPlaylistSongSimilarity();
        	}else{
        		echonest.getPlaylistArtistSimilarity();
        	}
    }      
   
    });
   
    $( "#songHot" ).val(  $( "#slider-songHot" ).slider( "values", 0 ) +
    " - " + $( "#slider-songHot" ).slider( "values", 1 ) );
}*/

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

