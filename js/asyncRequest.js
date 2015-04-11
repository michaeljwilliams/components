// example
// asyncGet('timeframe.json', true, useAsyncData);
// url of resource to request, json bool, function to call with asyncData
// json bool should be true if resource is json, else false and you'll get text
// callback function gets passed a json object if json===true, else text

// callback example
// function useAsyncData(data) {
//	console.log(data);
// }

function asyncGet(url, json, fname) {
	// var to contain async data
	var asyncData;

	// xhr object accessible in entire function
	var xhr;

	// make async request
	makeRequest(url);

	function makeRequest(url) {
		xhr = new XMLHttpRequest();
		// run prepdata when response received from server
		xhr.onreadystatechange = prepData;
		// send request
		xhr.open('GET', url, true);
		xhr.send();
	}

	function prepData() {
		// readyState 4 means xhr request successful and response received from server
		// http status 200 means server OK'd response (200: "OK")
		// note that status should be 0 when retrieving from filesystem (without server)
		if (xhr.readyState === 4 && xhr.status === 200) {
			if (json === true) { // if json
				asyncData = JSON.parse(xhr.responseText);
			} else if (json === false) { // if text
				asyncData = xhr.responseText;
			} else console.log('asyncGet(json) argument was not a bool');
		} else {
			console.log('No response received yet, retrying...');
			return;
		}
		// call a function that uses the data
		fname(asyncData);
	}
}