require([
  '$api/models',
 'scripts/echonestDynamic',
 '$views/popup#Popup'
 
], function(models,echonestDynamic,Popup ) {
  'use strict';


  var addTagCloudEventHandler = function() {
	  addTagCloudEventHandler1(echonestDynamic,Popup);
 
  };

  exports.addTagCloudEventHandler = addTagCloudEventHandler;
});




function addTagCloudEventHandler1(echonestDynamic,Popup){
	
	
	$("#tagCloud.tagcloudlink").on("click", function(e) {
		e.preventDefault();
		var tag = $(this).text();
		
		console.log('This tag was clicked on: '+tag);

		//alert(tag);

		//sayHello(tag);
		
		
	});
	
	
	
	
}

