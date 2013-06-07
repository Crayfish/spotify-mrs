require([
  //'$api/models',
  //'$views/image#Image',
  //'$views/popup#Popup'
  'scripts/echonest'
], function(echonest) {
  'use strict';

       
  var setUpPopSlider = function setUpPopSlider(echonest){
          setUpPopSlider1(echonest);
       
        };
 
 
 
 
  var setUpHotslider = function setUpHotSlider(echonest){
          setUpHotSlider1(echonest);
         
        };
 
 
  exports.setUpHotSlider = setUpHotslider;
  exports.setUpPopSlider = setUpPopSlider;
 
 
});



function setUpPopSlider1(echonest){
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
                        //console.log("Pop slider Stop");
                	if(document.getElementById('song').checked){
                        echonest.getPlaylistSongSimilarity();
                	}else{
                		echonest.getPlaylistArtistSimilarity();
                	}
                },
               
                /*change: function( event, ui ) {
                        console.log('Slider Change Event');
                }*/
               
                });
               
       
               
                $( "#pop" ).val(  $( "#slider-pop" ).slider( "values", 0 ) +
                " - " + $( "#slider-pop" ).slider( "values", 1 ) );
}

function setUpHotSlider1(echonest){
        console.log('SetUpHotSlider() betreten');
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
                if(document.getElementById('song').checked){
                    echonest.getPlaylistSongSimilarity();
            	}else{
            		echonest.getPlaylistArtistSimilarity();
            	}
        }      
       
        });
       
        $( "#hot" ).val(  $( "#slider-hot" ).slider( "values", 0 ) +
        " - " + $( "#slider-hot" ).slider( "values", 1 ) );
}

