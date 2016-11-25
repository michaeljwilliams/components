
// Check that local storage is accessible.
// Returns true if it accessible, else returns false.
function checkLocalStorage() {
    function test() {
        if(logging === true) console.log('Checking local storage...');
        var b = 'foo';
        try {
            localStorage.setItem(b,b);
            localStorage.removeItem(b);
            return true;
        } catch(e) {
            return false;
        }
    }

    if(test() === true) {
        if(logging === true) console.log('Local storage is accessible.');
        return true;
    } else {
        alert('Unable to access local storage. This may occur when using "Private Browsing" in Safari or a similar feature of your web browser. Try browsing normally instead.');
        if(logging === true) console.log('Unable to access local storage. This may occur when using "Private Browsing" in Safari or a similar feature of your web browser. Try browsing normally instead.');
        return false;
    }
}