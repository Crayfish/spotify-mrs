require([
  '$api/models',
 'scripts/echonestDynamic'
 
], function(models,echonestDynamic ) {
  'use strict';


  var addTagCloudEventHandler = function() {
	  addTagCloudEventHandler1(echonestDynamic);
 
  };

  exports.addTagCloudEventHandler = addTagCloudEventHandler;
});




function addTagCloudEventHandler1(echonestDynamic){
	
	
	$("#tagCloud.tagcloudlink").on("click", function(e) {
		e.preventDefault();
		var tag = $(this).text();
		
		console.log('This tag was clicked on: '+tag);

		//alert(tag);

		//sayHello(tag);
		
		
	});
	
	console.log('TagCloud EventHandler finished setup');
	
	
}

