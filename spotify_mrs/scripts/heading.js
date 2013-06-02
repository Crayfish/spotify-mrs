require([
  '$api/models',
  '/strings/main.lang',
  //'scripts/setupSlider'
], function(models, mainStrings) {
  'use strict';

  //Setup a short-hand to get translation
  var _ = SP.bind(mainStrings.get, mainStrings);

  var writeHeading = function() {
    document.querySelector('h1').innerHTML = _('Hier ensteht ein transparenter Music Recommender');
    //setupSlider.updatePopularitySliderValues();
  };

  exports.writeHeading = writeHeading;
});
