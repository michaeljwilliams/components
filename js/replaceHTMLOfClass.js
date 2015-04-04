// replace the innerHTML of all elements with class inClass with html newHTML
function replaceHTMLOfClass(inClass, newHTML) {
	// get array of all classes with given name
	var allInstancesOfClass = document.getElementsByClassName(inClass);

	// loop through array of classes
	for (var i = 0; i < allInstancesOfClass.length; i++) {
		allInstancesOfClass[i].innerHTML = newHTML;
	}
}