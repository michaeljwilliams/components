// Makes an XMLHttpRequest for a file, then runs a callback.
// example
// asyncGet('timeframe.json', useAsyncData, errorCallback);
// parameters: url of resource to request, function to call with asyncData, error callback
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
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send(null);

    xhr.timeout = 10000;
    xhr.ontimeout = function() {
        console.error("asyncGet: The request for " + url + " timed out after 5 seconds.");
    };

    xhr.onload = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            cb(xhr.response);
        } else { // Log error to console
            console.error("asyncGet: The request for " + url + " failed with error: " + xhr.statusText);
            if(errcb) errcb(url);               // Call errcb if given
        }
    };
}