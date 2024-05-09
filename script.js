let wallpaper = document.querySelector('.wallpaper');

let time = document.getElementById('time');
let date = document.getElementById('date');


let fullScreen = document.getElementById('fullScreen');
fullScreen.addEventListener('click', openFullscreen)
function openFullscreen() {
    // document.documentElement.requestFullscreen();
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

document.querySelector('.megacontainer').addEventListener('click', removeAllWindows);
function removeAllWindows() {
    removeStartMenu();
    removeCalendar();
    removeQuickSettingMenu();
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
        batteryLevelBox.textContent = parseInt(batteryLevel) + '%';
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
let startButton = document.querySelector('.window-start-button');
startButton.addEventListener('click', createStartMenu);
function createStartMenu() {
    event.stopPropagation();

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
    let applicationBox = document.getElementById('applicationBox');
    let startMenuBox = document.createElement('div');
    startMenuBox.classList.add('start-menu-box');
    startMenuBox.addEventListener('click', () => {
        event.stopPropagation();
    });

    if (startButtonCheck == true) {

        const searchBarBox = document.createElement('div');
        searchBarBox.classList.add('start-menu-search-bar-box');

        const searchInput = document.createElement('input');
        searchInput.setAttribute('type', 'text');
        searchInput.setAttribute('name', 'menu-search-bar');
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
        removeStartMenu();
    }
}

function removeStartMenu() {
    if (document.querySelector('.start-menu-box')) {
        let startMenuBox = document.querySelector('.start-menu-box');
        startMenuBox.remove();
        startButtonCheck = true;
    }
}

let calendarCheck = true;
function createCalendar() {
    event.stopPropagation();
    if (calendarCheck == true) {
        const calendarContainer = document.createElement('div');
        calendarContainer.classList.add('calendar-container');
        calendarContainer.addEventListener('click', () => {
            event.stopPropagation();
        });
        const calendarHeader = document.createElement('header');
        calendarHeader.classList.add('calendar-header');
        const currentDate = document.createElement('p');
        currentDate.classList.add('calendar-current-date');
        calendarHeader.appendChild(currentDate);
        const calendarNavigation = document.createElement('div');
        calendarNavigation.classList.add('calendar-navigation');
        const prevMonthButton = document.createElement('span');
        prevMonthButton.id = 'calendar-prev';
        const prevMonthIcon = document.createElement('img');
        prevMonthIcon.src = 'images/arrow_triangle.png'; // Add the URL of the previous month icon
        prevMonthIcon.alt = 'Previous Month';
        prevMonthIcon.classList.add('calendar-prev-icon');
        prevMonthButton.appendChild(prevMonthIcon);
        calendarNavigation.appendChild(prevMonthButton);
        const nextMonthButton = document.createElement('span');
        nextMonthButton.id = 'calendar-next';
        const nextMonthIcon = document.createElement('img');
        nextMonthIcon.src = 'images/arrow_triangle.png'; // Add the URL of the next month icon
        nextMonthIcon.alt = 'Next Month';
        nextMonthIcon.classList.add('calendar-next-icon');
        nextMonthButton.appendChild(nextMonthIcon);
        calendarNavigation.appendChild(nextMonthButton);
        calendarHeader.appendChild(calendarNavigation);
        calendarContainer.appendChild(calendarHeader);
        const calendarBody = document.createElement('div');
        calendarBody.classList.add('calendar-body');
        const calendarWeekdays = document.createElement('ul');
        calendarWeekdays.classList.add('calendar-weekdays');
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        weekdays.forEach(day => {
            const weekday = document.createElement('li');
            weekday.textContent = day;
            calendarWeekdays.appendChild(weekday);
        });
        calendarBody.appendChild(calendarWeekdays);
        const calendarDates = document.createElement('ul');
        calendarDates.classList.add('calendar-dates');
        calendarBody.appendChild(calendarDates);
        calendarContainer.appendChild(calendarBody);
        wallpaper.appendChild(calendarContainer);

        calendarCheck = false;
    }
    else {
        removeCalendar();
    }
}

function removeCalendar() {
    if (document.querySelector('.calendar-container')) {
        let calendarContainer = document.querySelector('.calendar-container');
        calendarContainer.remove();
        calendarCheck = true;
    }
}

document.querySelector('.quick-setting-box').addEventListener('click', createQuickSettingMenu)
let quickSettingMenuCheck = true;
function createQuickSettingMenu() {
    event.stopPropagation();
    if (quickSettingMenuCheck == true) {
        const quickSettingMenuBox = document.createElement('div');
        quickSettingMenuBox.classList.add('quick-setting-menu-box');
        quickSettingMenuBox.addEventListener('click', () => {
            event.stopPropagation();
        });

        const toggleButtonContainerBox = document.createElement('div');
        toggleButtonContainerBox.classList.add('toggle-button-container-box');

        const toggleButtonsData = [
            { iconSrc: 'images/wifi_icon.png', name: 'Wi-Fi' },
            { iconSrc: 'images/wifi_icon.png', name: 'Wi-Fi' },
            { iconSrc: 'images/wifi_icon.png', name: 'Wi-Fi' },
            { iconSrc: 'images/wifi_icon.png', name: 'Cast', moreOption: true },
            { iconSrc: 'images/wifi_icon.png', name: 'Wi-Fi' },
            { iconSrc: 'images/wifi_icon.png', name: 'Wi-Fi' },
            { iconSrc: 'images/wifi_icon.png', name: 'Wi-Fi' },
            { iconSrc: 'images/wifi_icon.png', name: 'Wi-Fi' },
            { iconSrc: 'images/wifi_icon.png', name: 'Wi-Fi' }
        ];

        toggleButtonsData.forEach(data => {
            const toggleButtonBox = document.createElement('div');
            toggleButtonBox.classList.add('toggle-button-box');

            const toggleButton = document.createElement('div');
            toggleButton.classList.add('toggle-button');

            const toggleButtonIconBox = document.createElement('div');
            toggleButtonIconBox.classList.add('toggle-button-icon-box');

            const toggleButtonIcon = document.createElement('img');
            toggleButtonIcon.src = data.iconSrc;
            toggleButtonIcon.alt = '';
            toggleButtonIcon.classList.add('toggle-button-icon');
            toggleButtonIconBox.appendChild(toggleButtonIcon);

            toggleButton.appendChild(toggleButtonIconBox);

            if (data.moreOption) {
                const moreOption = document.createElement('div');
                moreOption.classList.add('more-option');

                const moreOptionIcon = document.createElement('img');
                moreOptionIcon.src = 'images/up-arrow-tail-less.png';
                moreOptionIcon.alt = '';
                moreOptionIcon.classList.add('more-option-icon');
                moreOption.appendChild(moreOptionIcon);

                toggleButton.appendChild(moreOption);
            }

            toggleButtonBox.appendChild(toggleButton);

            const toggleButtonName = document.createElement('div');
            toggleButtonName.textContent = data.name;
            toggleButtonName.classList.add('toggle-button-name');

            toggleButtonBox.appendChild(toggleButtonName);

            toggleButtonContainerBox.appendChild(toggleButtonBox);
        });

        const levelAdjustmentContainerBox = document.createElement('div');
        levelAdjustmentContainerBox.classList.add('level-adjustment-container-box');

        const levelAdjustmentBox1 = document.createElement('div');
        levelAdjustmentBox1.classList.add('level-adjustment-box');

        const brightnessIcon = document.createElement('img');
        brightnessIcon.src = 'images/brightness_icon.png';
        brightnessIcon.alt = '';
        brightnessIcon.classList.add('volume-icon');

        const brightnessLevelAdjustment = document.createElement('input');
        brightnessLevelAdjustment.type = 'range';
        brightnessLevelAdjustment.min = '0';
        brightnessLevelAdjustment.max = '100';
        brightnessLevelAdjustment.value = '70';
        brightnessLevelAdjustment.classList.add('brightness-level-adjustment');

        levelAdjustmentBox1.appendChild(brightnessIcon);
        levelAdjustmentBox1.appendChild(brightnessLevelAdjustment);

        const levelAdjustmentBox2 = document.createElement('div');
        levelAdjustmentBox2.classList.add('level-adjustment-box');

        const volumeIcon = document.createElement('img');
        volumeIcon.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE0jgMnmoSxm1Wr3IE53rPbntwTVgYdSQwDL-Xn26I3A&s';
        volumeIcon.alt = '';
        volumeIcon.classList.add('volume-icon');

        const volumeLevelAdjustment = document.createElement('input');
        volumeLevelAdjustment.type = 'range';
        volumeLevelAdjustment.min = '0';
        volumeLevelAdjustment.max = '100';
        volumeLevelAdjustment.value = '70';
        volumeLevelAdjustment.classList.add('volume-level-adjustment');

        levelAdjustmentBox2.appendChild(volumeIcon);
        levelAdjustmentBox2.appendChild(volumeLevelAdjustment);

        levelAdjustmentContainerBox.appendChild(levelAdjustmentBox1);
        levelAdjustmentContainerBox.appendChild(levelAdjustmentBox2);

        const quickSettingEditBox = document.createElement('div');
        quickSettingEditBox.classList.add('quick-setting-edit-box');

        const batteryChargeLevel = document.createElement('div');
        batteryChargeLevel.classList.add('battery-charge-level');

        const batteryChargeIcon = document.createElement('img');
        batteryChargeIcon.src = 'images/battery_icon.png';
        batteryChargeIcon.alt = '';
        batteryChargeIcon.classList.add('battery-charge-icon');

        const batteryChargePercentage = document.createElement('div');
        batteryChargePercentage.textContent = '59%';
        batteryChargePercentage.classList.add('battery-charge-percentage');

        batteryChargeLevel.appendChild(batteryChargeIcon);
        batteryChargeLevel.appendChild(batteryChargePercentage);

        const settingBox = document.createElement('div');
        settingBox.classList.add('setting-box');

        const editBox = document.createElement('div');
        editBox.classList.add('edit-box');

        const editIcon = document.createElement('img');
        editIcon.src = 'images/edit_icon.png';
        editIcon.alt = '';
        editIcon.classList.add('edit-icon', 'quick-setting-icons');

        editBox.appendChild(editIcon);

        const allSettingBox = document.createElement('div');
        allSettingBox.classList.add('all-setting-box');

        const settingIcon = document.createElement('img');
        settingIcon.src = 'images/setting_icon.png';
        settingIcon.alt = '';
        settingIcon.classList.add('setting-icon', 'quick-setting-icons');

        allSettingBox.appendChild(settingIcon);

        settingBox.appendChild(editBox);
        settingBox.appendChild(allSettingBox);

        quickSettingEditBox.appendChild(batteryChargeLevel);
        quickSettingEditBox.appendChild(settingBox);

        quickSettingMenuBox.appendChild(toggleButtonContainerBox);
        quickSettingMenuBox.appendChild(levelAdjustmentContainerBox);
        quickSettingMenuBox.appendChild(quickSettingEditBox);

        wallpaper.appendChild(quickSettingMenuBox);

        quickSettingMenuCheck = false
    }
    else {
        removeQuickSettingMenu();
    }
}

function removeQuickSettingMenu() {
    if (document.querySelector('.quick-setting-menu-box')) {
        let quickSettingMenuBox = document.querySelector('.quick-setting-menu-box')
        quickSettingMenuBox.remove();
        quickSettingMenuCheck = true;
    }
}

// let applicationBox = document.getElementById('applicationBox');
// applicationBox.addEventListener("contextmenu", function (e) {
//     e.preventDefault();
// });

function handleKeyPress(event) {
    event.preventDefault();
    console.log(event)
    if (event.key === "Meta" || event.key === "Windows") {
        createStartMenu();
        console.log('ssss')
    }
}

// Add event listener for key press event
document.addEventListener("keydown", handleKeyPress);
// document.addEventListener("keyup", handleKeyPress);
// document.addEventListener("keypress", handleKeyPress);