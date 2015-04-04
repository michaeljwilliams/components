// replace the text of all elements with class inClass with text newText
function replaceTextOfClass(inClass, newText) {
	// get array of all classes with given name
	var allInstancesOfClass = document.getElementsByClassName(inClass);

	// loop through array of classes
	for (var i = 0; i < allInstancesOfClass.length; i++) {
		allInstancesOfClass[i].textContent = newText;
	}
}