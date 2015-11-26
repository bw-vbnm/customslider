var Slider = function() {

	var images; 	// Slider image elements
	var spacing; 	// Spacing for nav lists

	// Element class name constants
	var CLASSNAME = {
		IMAGE					: 'gallery-image',
		IMAGE_SHOW		: 'gallery-image show',
		NAV						: 'slider-nav',
		LIST					: 'nav-list',
		LABEL					: 'nav-label',
		SPACING				: 'nav-spacing',
		TRIGGER				: 'nav-trigger'
	};

	/**
	*	Advances a slider to a specified index
	*/
	var slideTo = function(index) {
		if(index < 0 || index >= images.length) {
			console.log('Slide advance out of bounds');
			return;
		}

		for(var i = 0; i < images.length; i++) {
			images[i].className = CLASSNAME.IMAGE;
		}
		images[index].className = CLASSNAME.IMAGE_SHOW;
	};

	/**
	*	Advances a slider to the next image
	*/
	var slideNext = function(index) {
		var num_images = images.length;
		var nextIndex = (index+1) % num_images;
		images[index].className = CLASSNAME.IMAGE;
		images[nextIndex].className = CLASSNAME.IMAGE_SHOW;
	};

	var createNavList = function(text) {
		var navList = document.createElement('ul');
		var navLabel = document.createElement('div');
		var labelText = document.createTextNode(text);
		navLabel.className = CLASSNAME.LABEL;
		navList.className = CLASSNAME.LIST;
		navLabel.appendChild(labelText);
		navList.appendChild(navLabel);
		return navList;
	};

	var createNav = function(slider) {
		var nav = document.createElement('nav');
		nav.className = CLASSNAME.NAV;

		// Data attributes from slider
		spacing = slider.dataset.spacing;
		var label1 = slider.dataset.label1;
		var label2 = slider.dataset.label2;

		// Append first list
		nav.appendChild(createNavList(label1));

		// Valid spacing attribute, append spacer div and second list
		// Otherwise only use first list
		if(spacing > 0 && spacing < images.length) {
			var navSpacing = document.createElement('div');
			navSpacing.className = CLASSNAME.SPACING;
			nav.appendChild(navSpacing);
			nav.appendChild(createNavList(label2));
		}
		else{
			console.log('Spacing attribute on slider is invalid');
			spacing = images.length;
		}

		return nav;
	}

	/**
 	 *	Binds events to slider, adds nav bar, adds auto advance sliding
 	 *
 	 *	TODO: more robust, less assumptions
 	 */
	var initSlide = function(slider) {
		images = slider.children[0].children; // hardcoded, FIX LATER
		var nav = createNav(slider);

		for(var i = 0; i < images.length; i++) {
			(function(index) {
				// Create nav trigger
				var trigger = document.createElement('li');
				trigger.className = CLASSNAME.TRIGGER;
				trigger.addEventListener('click', function() {
					slideTo(index);
				});

				// Add to appropriate nav list
				// hardcoded to account for spacer, FIX LATER
				if(index < spacing){
					nav.children[0].appendChild(trigger);
				}
				else{
					nav.children[2].appendChild(trigger);
				}

				// Next image on click
				images[i].addEventListener('click', function() {
					slideNext(index);
				});
			})(i);
		}

		slider.appendChild(nav);
	};

	return {
		init: initSlide
	};

};
