require([
     'scripts/echonestDynamic'
],function(echonestDynamic) {
	'use strict';

	var currentlySetTagCloudObjects = new Array();
	var tagCloudObjects = new Array();
	
	var options = {};

	// Default settings:
	var defaults = {
			sort : function(a, b) {
				return a.tag < b.tag ? -1 : (a.tag == b.tag ? 0 : 1)
			},// default sorting: abc

			click : function(tag) {
				console.log('TAG CLOUD click function() this term was clicked on: '+ tag);

				// store the clicked TermAndCount Object
				for ( var k = 0; k < tagCloudObjects.length; k++) {
					if (tagCloudObjects[k].tag == tag) {
						if (tagCloudObjects[k].currentlySet) {
							tagCloudObjects[k].currentlySet = false;

							$('.tagcloudlink').filter(function() {
								return $(this).text() === tag;
							}).css("color", '#666667');

							echonestDynamic.removeTermFromCurrentlySetTermsArray(tag);

							} else {
								tagCloudObjects[k].currentlySet = true;

								$('.tagcloudlink').filter(function() {
									return $(this).text() === tag;
								}).css("color", "red");

								echonestDynamic.setTermFilter(tag);
							}
							;
							console.log('TAG CLOUD marked the following object as currentlySet: '+ JSON.stringify(tagCloudObjects[k]));
							break;
						}
					}

				},// end of click function
				maxFontSizeEm : 4
	}

	jQuery.fn.tagCloud = function(cl, givenOptions) { // return
		
		console.log('TAG CLOUD tagCloud() was called()');

		if (!cl || !cl.length) return this;

		currentlySetTagCloudObjects = new Array();

		for ( var g = 0; g < tagCloudObjects.length; g++) {
			if (tagCloudObjects[g].currentlySet) {
				currentlySetTagCloudObjects.push(tagCloudObjects[g]);
			}
		}

		console.log('TAG CLOUD currentlySetTagCloudObjects Array:' + JSON.stringify(currentlySetTagCloudObjects));

		// reset the tagCloudObjects array
		tagCloudObjects = new Array();

		// store the new Tag Cloud Objects
		for ( var m = 0; m < cl.length; m++) {
			var tagCloudObject = {};
			tagCloudObject.tag = cl[m].tag;
			tagCloudObject.count = cl[m].count;
			tagCloudObject.currentlySet = false;
			tagCloudObjects.push(tagCloudObject);
		}

		console.log('TAG CLOUD tagCloudObjects Array items: '+ JSON.stringify(tagCloudObjects))

		// check if the alreadyset Objects are in the tagCloudObjects
		// Array, this array contains the same tags as the cl Array by now
		for ( var e = 0; e < currentlySetTagCloudObjects.length; e++) {
			var hasToBeAddedToTagCloudObjectsArray = true;
			for ( var r = 0; r < tagCloudObjects.length; r++) {
				if (currentlySetTagCloudObjects[e].tag == tagCloudObjects[r].tag) {
					hasToBeAddedToTagCloudObjectsArray = false;
					break;
				}
			}
			if (hasToBeAddedToTagCloudObjectsArray) {
				tagCloudObjects.push(currentlySetTagCloudObjects[e]);
			}
			
		}

		// check if all alreadySetValues are set correctly
		for ( var e = 0; e < currentlySetTagCloudObjects.length; e++) {

			for ( var r = 0; r < tagCloudObjects.length; r++) {
				if (currentlySetTagCloudObjects[e].tag == tagCloudObjects[r].tag) {
					tagCloudObjects[r].currentlySet = true;
					break;
				}
			}

		}

		jQuery.extend(options, defaults, givenOptions);

		// calculating the max and min count values
		var max = -1;
		var min = tagCloudObjects[0].count;
		$.each(tagCloudObjects, function(i, n) {
			max = Math.max(n.count, max);
			min = Math.min(n.count, min);
		});

		if (options.sort) {
			tagCloudObjects.sort(options.sort);
		}

		// Normalization helper
		var diff = (max == min ? 1 // if all values are equal, do not
				// divide by zero
				: (max - min) / (options.maxFontSizeEm - 1)); // optimization:
				// Originally we  want to divide by diff and multiple by maxFontSizeEm - 1 in getNormalizedSize.
		function getNormalizedSize(count) {
			return 1 + (count - min) / diff;
		}

		// Generating the output
		this.empty();
		
		for ( var i = 0; i < tagCloudObjects.length; ++i) {
			
			var tag = tagCloudObjects[i].tag;

			// if used as filter add it to the tag cloud and change its color
			if (tagCloudObjects[i].currentlySet) {
				var tagEl = $(
								'<a href="" class="tagcloudlink" style="font-size: '
										+ getNormalizedSize(tagCloudObjects[i].count)
										+ 'em">' + tag + '<\/a>').data('tag',
								tag);

						tagEl.click(function(event) {
							event.preventDefault();

							options.click(jQuery(event.target).data('tag'),
									event);

						});

						this.append(tagEl).append(" ");
						$('.tagcloudlink').filter(function() {
							return $(this).text() === tag;
						}).css("color", "red");

					} else {
						// just add the tag without color change

						var tagEl = $(
								'<a href="" class="tagcloudlink" style="font-size: '
										+ getNormalizedSize(tagCloudObjects[i].count)
										+ 'em">' + tag + '<\/a>').data('tag',
								tag);

						tagEl.click(function(event) {
							event.preventDefault();

							options.click(jQuery(event.target).data('tag'),
									event);

						});

						this.append(tagEl).append(" ");

					}
				}

				return this;

			}
	$.fn.setTerms = function(terms){
		console.log("TAGCLOUD SETTING TERMS:"+JSON.stringify(terms));
		
		//remove all selections
		for ( var k = 0; k < tagCloudObjects.length; k++) {
			if (tagCloudObjects[k].currentlySet) {
				tagCloudObjects[k].currentlySet = false;

				$('.tagcloudlink').filter(function() {
					return $(this).text() === tagCloudObjects[k].tag;
				}).css("color", '#666667');

				echonestDynamic.removeTermFromCurrentlySetTermsArray(tagCloudObjects[k].tag);
			}
		}
		
		//select the given terms
		for ( var k = 0; k < tagCloudObjects.length; k++) {
			if($.inArray(tagCloudObjects[k].tag, terms)>-1){
				tagCloudObjects[k].currentlySet = true;
				
				$('.tagcloudlink').filter(function() {
					return $(this).text() === tagCloudObjects[k].tag;
				}).css("color", "red");

				echonestDynamic.setTermFilter(tagCloudObjects[k].tag);
			}
			
		}
		
	}

		});// end of require()

