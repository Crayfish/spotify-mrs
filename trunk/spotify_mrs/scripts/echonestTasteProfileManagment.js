require([
         '$api/models',
        
         'scripts/setupPlaylistFilter'
 
], function(models, setupPlaylistFilter) {
  'use strict';

  

  var initalCreationOfTasteProfiles = function() {
    console.log('initalCreationOfTasteProfiles() was called');
 
  };

  exports.initalCreationOfTasteProfiles = initalCreationOfTasteProfiles;
});
