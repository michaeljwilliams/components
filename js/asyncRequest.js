// globally-available var to contain data
	var asyncData;

	// run request function
	asyncGet('timeframe.json');

	function asyncGet(url) {
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
				// if json
				asyncData = JSON.parse(xhr.responseText);
				// if text
				// asyncData = xhr.responseText;
			} else return;
			// call a function that uses the data
			useData(asyncData);
		}
	}

	// function that uses the data
	function useData(data) {
		console.log(data);
	}