// Inserts the specified [content] into the specified element/location [where]
// [where] should be a unique CSS selector
// [addOrReplace] determines whether to simply add the content or replace the destination content.
// [addOrReplace] should be a string of "add" or "replace". It defaults to add
// example: insertContent("main", "<h1>hello!</h1>"); // inserts an <h1> into the <main> element
function insertContent(where, content, addOrReplace) { // Safari 9 doesn't support default parameters
    if(addOrReplace === "replace") {
        document.querySelector(where).innerHTML = content;
    } else if(addOrReplace !== "replace" ) {
        document.querySelector(where).innerHTML += content;
    }
}