const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResultsBox');

function serachQuery() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm.length > 0) {
        // Call a function to fetch search results using YouTube Data API
        fetchSearchResults(searchTerm);
        searchInput.style.border = '0.1px solid rgb(81, 81, 81)';
    } else {
        searchInput.style.border = '0.1px solid red';
    }
}

function fetchSearchResults(searchTerm) {
    // const apiKey = 'AIzaSyCkzOqQxFUSEBsN7pO_W797gQCZJ9_haM4';
    const apiKey = 'AIzaSyAkwWwQdwiHGsPvxCf0_PEZRVYCIBnmasw';
    const maxResults = 10;

    const apiUrl = `https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&key=${apiKey}&maxResults=${maxResults}&part=snippet&type=video`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (!data.items) {
                throw new Error('No items found in the search results');
            }
            displaySearchResults(data.items);
        })
        .catch(error => {
            console.error('Error fetching search results:', error);
        });
}


function displaySearchResults(results) {
    // Clear previous search results
    searchResults.innerHTML = '';


    // Iterate over the search results and create HTML elements to display them
    results.forEach(result => {
        const title = result.snippet.title;
        const videoId = result.id.videoId;
        const thumbnailUrl = result.snippet.thumbnails.high.url;
        const discription = result.snippet.description;
        const channelId = result.snippet.channelId;

        const resultItem = document.createElement('div');
        resultItem.classList.add('search-result');
        resultItem.innerHTML = `
        <div class="video-detail-box" onclick="storeDataToLocal('${title}', '${videoId}', '${discription.replace(/'/g, "\\'")}', '${channelId}')">
            <img class="thumbnail-image" src="${thumbnailUrl}" alt="${title}">
            <h3 class="title">${title}</h3>
        </div>
    `;

        // Append the search result to the search results container
        searchResults.appendChild(resultItem);
    });
}

function storeDataToLocal(title, videoId, discription, channelId) {

    let getTitle = localStorage.setItem('title-youtube', title);
    let getUrl = localStorage.setItem('url-youtube', videoId);
    let getDiscription = localStorage.setItem('discription-youtube', discription);
    let getchannelId = localStorage.setItem('channelId-youtube', channelId);

    window.location.href = "components/video_player/video_player.html";
}

// ************************************** DOM load video display ***************************************************************

// const apiKey = 'AIzaSyCkzOqQxFUSEBsN7pO_W797gQCZJ9_haM4';
// const apiKey = 'AIzaSyAkwWwQdwiHGsPvxCf0_PEZRVYCIBnmasw';
const apiKey = 'ab5deb5f6bmsh503cc98ec9fec87p10b9bfjsnc2bbbd734c8b';
const maxResults = 10;

function fetchVideos() {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&order=date&maxResults=${maxResults}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayVideos(data.items);
        })
        .catch(error => console.error('Error fetching videos:', error));
}

function displayVideos(videos) {

    videos.forEach(video => {
        const title = video.snippet.title;
        const videoId = video.id.videoId;
        const thumbnailUrl = video.snippet.thumbnails.high.url;
        let discription = video.snippet.description;
        console.log(discriptionRepair(discription));
        // discription = discriptionRepair(discription);
        // console.log(discription);
        const channelId = video.snippet.channelId;

        const resultItem = document.createElement('div');
        resultItem.classList.add('search-result');
        resultItem.innerHTML = `
        <div class="video-detail-box" onclick="storeDataToLocal('${discriptionRepair(title)}', '${videoId}', '${discriptionRepair(discription)}', '${channelId}')">
            <img class="thumbnail-image" src="${thumbnailUrl}" alt="${title}">
            <h3 class="title">${title}</h3>
        </div>
    `;

        // Append the search result to the search results container
        searchResults.appendChild(resultItem);
    });
}

function discriptionRepair(text) {
    console.log('discription repair');

    text = text.replace(/&/g, "&amp;");
    text = text.replace(/</g, "&lt;");
    text = text.replace(/>/g, "&gt;");
    text = text.replace(/"/g, "&quot;");
    text = text.replace(/'/g, "&#039;");
    text = text.replace(/`/g, "&#96;");

    return text;

    // return text
    //     .replace(/&/g, "")
    //     .replace(/</g, "")
    //     .replace(/>/g, "")
    //     .replace(/"/g, "")
    //     .replace(/'/g, "")
    //     .replace(/`/g, "");
}

document.addEventListener('DOMContentLoaded', () => {
    fetchVideos();
});
