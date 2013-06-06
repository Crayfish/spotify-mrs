require([
  '$api/models',
  //'scripts/echonest'
], function(models) {
  

  
 

  var updatePopSlider = function(popValueArray) {
    updatePopSlider1(popValueArray);
  };
  
  var updateHotSlider = function(hotValue) {
	    updateHotSlider1(hotValue);
	  };

  exports.updatePopSlider = updatePopSlider;
  exports.updateHotSlider = updateHotSlider;
});


function updatePopSlider1(popularityArray){
	var numberOfPopValues = 20;
	//console.log('numberOfPopValues'+numberOfPopValues);
	//console.log("Updating Popularity Slider with Values: "+ popularityArray[0]);
	
	if(popularityArray.length ==numberOfPopValues){
	
	
	popularityArray.sort(function(a,b){return b-a});
	//console.log('popularityArray for updatePopSlider(): '+popularityArray);
	
	
	var lowestPopValue = popularityArray[popularityArray.length - 1];
	var highestPopValue = popularityArray[0];
	
	
	
	//console.log(' lowestPopValue: '+ lowestPopValue.toFixed(2));
	//console.log(' highestPopValue: '+ highestPopValue.toFixed(2));
	
	$( "#slider-pop" ).slider( "values", 0,lowestPopValue.toFixed(2)*100  );
	$( "#slider-pop" ).slider( "values", 1,highestPopValue.toFixed(2)*100  );
	$( "#pop" ).val(lowestPopValue.toFixed(2)*100 +" - " + highestPopValue.toFixed(2)*100);
	
	}
}
	/*var currentLowerPopValue =$( "#slider-pop" ).slider( "values", 0 );
	var currentHigherPopValue=$( "#slider-pop" ).slider( "values", 1 );
	 currentLowerPopValue =  currentLowerPopValue.toFixed(2);
	 currentHigherPopValue =currentHigherPopValue.toFixed(2);+
	 console.log('currentHigherPopValue: '+ currentHigherPopValue);
	
	console.log("Current Popularity SliderValues: "+ currentLowerPopValue+"/"+currentHigherPopValue);
	
	// var lowerPopNumber =+currentLowerPopValue;
	 //var higherPopNumber =+;
	// var lowerPopInt =parseInt(currentLowerPopValue);
	
	 
	 
	
	if(popValue1 >  currentLowerPopValue && popValue1 < currentHigherPopValue){
		//console.log('if von updatePopSlider() betreten');
		highestPopValue
		$( "#slider-pop" ).slider( "values", 0,popValue1.toFixed(2)*100  );
	}
	
	
	if(popValue1 <  currentLowerPopValue && popValue1 < currentHigherPopValue){
		//console.log('if von updatePopSlider() betreten');
		$( "#pop" ).val(popValue1.toFixed(2) +" - " + currentHigherPopValue);
		$( "#slider-pop" ).slider( "values", 0,popValue1.toFixed(2)*100  );
	}
	
	if( popValue1 > currentHigherPopValue){
		//console.log('if von updatePopSlider() betreten');
		$( "#pop" ).val(currentLowerPopValue +" - " + popValue1.toFixed(2));
		$( "#slider-pop" ).slider( "values", 1,popValue1.toFixed(2)*100  );
	}
	
	else{
		if(popValue1 < currentHigherPopValue ){
			//console.log('if von updatePopSlider() betreten');
			$( "#pop" ).val(popValue1.toFixed(2) +" - " + popValue1.toFixed());
			$( "#slider-pop" ).slider( "values", 0,popValue1.toFixed(2)*100  );
		}else{
			$( "#pop" ).val(currentLowerPopValue +" - " + popValue1.toFixed());
			$( "#slider-pop" ).slider( "values", 0,popValue1.toFixed(2)*100  );
		}
	}
	*/
	
	
	
	


function updateHotSlider1(hotnessArray){
	//console.log("Updating Hotness Slider with Value: "+hotValue1);
	
	var numberOfHotValues = 20;
	//console.log('numberOfPopValues'+numberOfPopValues);
	//console.log("Updating Popularity Slider with Values: "+ popularityArray[0]);
	
	if(hotnessArray.length ==numberOfHotValues){
	
	
	hotnessArray.sort(function(a,b){return b-a});
	console.log('hotnessArray for updateHotSlider(): '+hotnessArray);
	
	
	var lowestHotValue = hotnessArray[hotnessArray.length - 1];
	var highestHotValue = hotnessArray[0];
	
	
	
	console.log(' lowestHotValue: '+ lowestHotValue.toFixed(2));
	console.log(' highestHotValue: '+ highestHotValue.toFixed(2));
	
	$( "#slider-hot" ).slider( "values", 0,lowestHotValue.toFixed(2)*100  );
	$( "#slider-hot" ).slider( "values", 1,highestHotValue.toFixed(2)*100  );
	$( "#hot" ).val(lowestHotValue.toFixed(2)*100 +" - " + highestHotValue.toFixed(2)*100);
	
	
	
}
}