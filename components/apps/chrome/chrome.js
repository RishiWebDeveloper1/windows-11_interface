let searchInput = document.querySelector('.search-bar');
let iframe = document.querySelector('iframe');
let searchHistoryUrl = [`https://www.google.com/search?q=&igu=1`];
let searchHistoryQuery = [`https://www.google.com/search?q=&igu=1`];


searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchCommand()
    }
});

function searchCommand() {
    // console.log(iframe);
    searchQuery = searchInput.value;
    let urlCheck = searchQuery.slice(0, 7);
    console.log(searchHistoryUrl);
    
    if (searchInput.value == searchHistoryUrl[searchHistoryUrl.length - 1] || searchInput.value == searchHistoryQuery[searchHistoryQuery.length - 1]) {
        console.log('same ulr search');
    }
    else if (urlCheck == 'http://' || urlCheck == 'https:/') {
        iframe.src = searchQuery;
        searchHistoryUrl.push(searchQuery);
        searchHistoryQuery.push(searchQuery);
    }
    else {
        iframe.src = `https://www.google.com/search?q=${searchQuery}&igu=1`;
        searchHistoryUrl.push(`https://www.google.com/search?q=${searchQuery}&igu=1`);
        searchHistoryQuery.push(searchQuery);
    }
}

function backButtonCommand() {
    console.log('heloo backbut here!!!!!!!!!!');
    console.log(searchHistoryUrl[searchHistoryUrl.length - 1]);
    console.log(searchHistoryUrl[searchHistoryQuery.length - 1]);

    if (searchHistoryUrl.length == 1) {
        alert('you are at last!!!')
    }
    else {
        iframe.src = searchHistoryUrl[searchHistoryUrl.length - 1];
        searchInput.value = searchHistoryQuery[searchHistoryQuery.length - 1];
        searchHistoryUrl.pop();
        searchHistoryQuery.pop();
    }

}

function refreshButtonCommand() {
    iframe.src = iframe.src;
}