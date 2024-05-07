let time = document.getElementById('time');
let date = document.getElementById('date');

document.documentElement.requestFullscreen();
// window.confirm("how are you!")

function openFullscreen() {
    let fullScreen = document.getElementById('fullScreen');
    if (fullScreen.requestFullscreen) {
        fullScreen.requestFullscreen();
    }
    else if (fullScreen.webkitRequestFullscreen) { /* Safari */
        fullScreen.webkitRequestFullscreen();
    }
    else if (fullScreen.msRequestFullscreen) { /* IE11 */
        fullScreen.msRequestFullscreen();
    }
}

function changeTimeDate() {
    let Dates = new Date();

    currentDate = Dates.getDate();
    currentMouth = Dates.getMonth();
    currentMouth = currentMouth + 1
    currentYear = Dates.getFullYear();
    currentMinute = Dates.getMinutes();
    currentHour = Dates.getHours();
    let amPm = ' AM'

    if (currentHour > 12) {
        currentHour = currentHour - 12;
        amPm = ' PM'
    }

    if (currentDate <= 9) {
        currentDate = '0' + currentDate;
    }
    if (currentMouth <= 9) {
        currentMouth = '0' + currentMouth;
    }
    if (currentHour <= 9) {
        currentHour = '0' + currentHour;
    }
    if (currentMinute <= 9) {
        currentMinute = '0' + currentMinute;
    }

    time.innerHTML = currentHour + ':' + currentMinute + amPm;
    date.innerHTML = currentDate + '-' + currentMouth + '-' + currentYear;
}

let batteryBox = document.querySelector('.battery-box');
let batteryLevelBox = document.createElement("div");
batteryLevelBox.classList.add('battery-level-box');
batteryBox.appendChild(batteryLevelBox);
function batteryLevel() {
    navigator.getBattery().then(function (battery) {
        let batteryLevel = battery.level * 100;
        // batteryLevelBox.textContent = parseInt(batteryLevel) + '%';
        batteryLevelBox.textContent = batteryLevel + '%';
    });
}

function refreshMainWindowComponents() {
    changeTimeDate();
    batteryLevel();
}

changeTimeDate();
batteryLevel();
setInterval(refreshMainWindowComponents, 60000)

let startButtonCheck = true;
function windowStartButton() {
    let appNameList = [
        'File Explorer',
        'Vs code',
        'Chrome',
        'YouTube'
    ];
    let appIconList = [
        'https://winaero.com/blog/wp-content/uploads/2018/12/file-explorer-folder-libraries-icon-18298.png',
        'https://code.visualstudio.com/assets/images/code-stable.png',
        'https://cdn1.iconfinder.com/data/icons/google_jfk_icons_by_carlosjj/512/chrome.png',
        'components/apps/youtube/images/youtube_icon.png'
    ];
    let appUrlList = [
        'components/apps/file_explorer/file_explorer.html',
        'https://codewith.it/',
        'components/apps/chrome/chrome.html',
        'components/apps/youtube/youtube.html'
    ];
    console.log(startButtonCheck)
    let wallpaper = document.querySelector('.wallpaper');
    let applicationBox = document.getElementById('applicationBox');
    let startMenuBox = document.createElement('div');
    startMenuBox.classList.add('start-menu-box');

    if (startButtonCheck == true) {

        const searchBarBox = document.createElement('div');
        searchBarBox.classList.add('start-menu-search-bar-box');

        const searchInput = document.createElement('input');
        searchInput.setAttribute('type', 'text');
        searchInput.classList.add('start-menu-search-bar');
        searchInput.setAttribute('placeholder', 'Search for apps');

        searchBarBox.appendChild(searchInput);

        const buttonBox = document.createElement('div');
        buttonBox.classList.add('start-menu-button-box');

        const pinnedLabel = document.createElement('div');
        pinnedLabel.classList.add('start-menu-pinned-label');
        pinnedLabel.textContent = 'Pinned';

        const allAppsButton = document.createElement('div');
        allAppsButton.classList.add('start-menu-all-app-button');
        allAppsButton.textContent = 'All apps';

        buttonBox.appendChild(pinnedLabel);
        buttonBox.appendChild(allAppsButton);

        const allAppsBox = document.createElement('div');
        allAppsBox.classList.add('all-apps-box');

        let num = 0;
        for (let appNameCurrent of appNameList) {
            let appIconCurrent = appIconList[num];
            let appUrlCurrent = appUrlList[num];

            const appBox = document.createElement('div');
            appBox.classList.add('start-menu-app-box');

            const appIcon = document.createElement('img');
            appIcon.setAttribute('src', appIconCurrent);
            appIcon.setAttribute('alt', appNameCurrent);
            appIcon.classList.add('start-menu-app-icon');

            const appName = document.createElement('div');
            appName.classList.add('start-menu-app-name');
            appName.textContent = appNameCurrent;

            appBox.appendChild(appIcon);
            appBox.appendChild(appName);

            appBox.onclick = function () {
                createApplication(appNameCurrent, appUrlCurrent);
                windowStartButton();
            }

            allAppsBox.appendChild(appBox);
            num += 1;
        }

        // Append search bar box, button box, and all apps box to parent div
        startMenuBox.appendChild(searchBarBox);
        startMenuBox.appendChild(buttonBox);
        startMenuBox.appendChild(allAppsBox);


        wallpaper.insertBefore(startMenuBox, applicationBox);
        startButtonCheck = false;
    }
    else {
        let startMenuBox = document.querySelector('.start-menu-box')
        startMenuBox.remove()
        startButtonCheck = true;
    }
}