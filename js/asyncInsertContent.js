// Makes an XMLHttpRequest for a file, then inserts the content of the file at a specified location (if given).
// example
// asyncInsertContent('data.json', true, "table .data", "replace", useAsyncData, asyncFailure);
// parameters
// • url: url of resource to request
// • isJson: bool should be true if resource is json, else false and you'll get text
// • where: Where the content should be inserted. [where] should be a unique CSS selector.
// • addOrReplace: Determines whether to simply add the content or replace the destination content. Should be a 
// string of "add" or "replace". It defaults to add.
// • cb: Callback function that receives the data. Gets passed a json object if isJson===true, else text
// • errcb: Called when the async request fails. Gets passed the url that failed to load.

// callback example
// function useAsyncData(data) {
//	   console.log(data);
// }

// error callback example
// function requestFailure(url) {
//     alert('Failed to load ' + url);
// }

function asyncGet(url, isJson, where, addOrReplace, cb, errcb) {
    var asyncData,      // var to contain async data
        asyncRequest,   // asyncRequest object accessible in entire function
        attempts = 0;   // init number of request attempts; will call errcb after several unsuccessful attempts

	// make async request
	makeRequest(url);

	function makeRequest(url) {
		asyncRequest = new XMLHttpRequest();
		// run prepdata when response received from server
		asyncRequest.onreadystatechange = prepData;
		// send request
		asyncRequest.open('GET', url, true);
		asyncRequest.send();
	}

	function prepData() {
		// readyState 4 means asyncRequest successful and response received from server
		// http status 200 means server OK'd response (200: "OK")
		// note that status should be 0 when retrieving from filesystem (without HTTP server)
		if (asyncRequest.readyState === 4 && asyncRequest.status === 200) {
			if (isJson === true) { // if json
				asyncData = JSON.parse(asyncRequest.responseText); // parse json
			} else if (isJson === false) { // if text
				asyncData = asyncRequest.responseText;
			} else console.log('Error in function [asyncGet]: argument [isJson] was not a bool');

			if (where) {
				insertContent(where, asyncData, addOrReplace);
			} else cb(asyncData); // call a function that uses the data
			
		} else {
			attempts++;
			console.log('asyncGet(' + url + '): No response received yet (attempt ' + attempts + '), retrying...');
			// after 10 failed requests
			if (attempts >= 10) {
				console.log('asyncGet(' + url + '): failed to load resource after ' + attempts + ' attempts. Will now call errcb if given.');
				// call error cb with url
				if (errcb && typeof(errcb) === "function") errcb(url);
			} else return;
		}
	}

	// Inserts the specified [content] into the specified element/location [where]
	// [where] should be a unique CSS selector
	// [addOrReplace] determines whether to simply add the content or replace the destination content.
	// [addOrReplace] should be a string of "add" or "replace". It defaults to add
	// example: insertContent("main", "<h1>hello!</h1>"); // inserts an <h1> into the <main> element
	function insertContent(where, content, addOrReplace = "add") {
	    if(addOrReplace === "replace") {
	        document.querySelector(where).innerHTML = content;
	    } else if(addOrReplace === "add" ) {
	        document.querySelector(where).innerHTML += content;
	    }
	}
}