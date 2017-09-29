// Makes an XMLHttpRequest for a file, then runs a callback.
// example
// asyncGet('timeframe.json', true, useAsyncData, errorCallback);
// parameters: url of resource to request, json bool, function to call with asyncData
// isJson bool should be true if resource is json, else false and you'll get text
// callback function gets passed a json object if isJson===true, else text
// error callback gets passed the url that failed to load

// callback example
// function useAsyncData(data) {
//	   console.log(data);
// }

// error callback example
// function requestFailure(url) {
//     alert('Failed to load ' + url);
// }

function asyncGet(url, isJson, cb, errcb) {
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
			// call a function that uses the data
			if(cb) {
				cb(asyncData);
			} else console.log('asyncGet(' + url + '): no callback was given);
		} else {
			attempts++;
			console.log('asyncGet(' + url + '): No response received yet (attempt ' + attempts + '), retrying...');
			// after 4 failed requests
			if (attempts >= 4) {
				console.log('asyncGet(' + url + '): failed to load resource after ' + attempts + ' attempts. Will now call errcb if given.');
				// call error cb with url
				if (errcb && typeof(errcb) === "function") errcb(url);
			} else return;
		}
	}
}