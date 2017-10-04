// Makes an XMLHttpRequest for a file, then runs a callback.
// example
// asyncGet('timeframe.json', useAsyncData, errorCallback);
// parameters: url of resource to request, function to call with asyncData
// error callback gets passed the url that failed to load

// callback example
// function useAsyncData(data) {
//	   console.log(data);
// }

// error callback example
// function requestFailure(url) {
//     alert('Failed to load ' + url);
// }

function asyncGet(url, cb, errcb) { // Extra args will be passed to cb
        
    var asyncData,      // var to contain async data
        xhr,            // xhr object accessible in entire function
        cbArgs;         // Extra args are passed to cb

    xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send(null);

    xhr.timeout = 10000;
    xhr.ontimeout = function() {
        console.error("asyncGet: The request for " + url + " failed after 5 seconds.");
    };

    xhr.onload = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            cb(xhr);	// Call a function that uses the data
        } else {
            console.error(xhr.statusText);                     			// Log error to console
            if(errcb && typeof(errcb) === "function") errcb(url);      	// Call errcb if given
        }
    };
}