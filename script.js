let wallpaper = document.querySelector('.wallpaper');
let applicationBox = document.getElementById('applicationBox');

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
    removeKeyboardLanguage();
    removeHiddenIconsBox();
    removeContextMenuBox();
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

navigator.getBattery().then((battery) => {
    battery.addEventListener("chargingchange", () => {
        batteryLevel();
    });
});

let batteryBox = document.querySelector('.battery-box');
let batteryLevelBox = document.createElement("div");
batteryLevelBox.classList.add('battery-level-box');
batteryBox.appendChild(batteryLevelBox);
function batteryLevel() {
    let batteryIcon = document.getElementById('batteryIcon');
    navigator.getBattery().then(function (battery) {

        let batteryLevel = parseInt(battery.level * 100);
        batteryLevelBox.textContent = batteryLevel + '%';

        let isBatteryCharging = battery.charging;
        // let chargingTime = battery.chargingTime;
        // let dischargingTime = battery.dischargingTime;

        if (isBatteryCharging == true) {
            batteryIcon.src = "images/battery_charging_icon.png";
        }
        else if (batteryLevel <= 10) {
            batteryIcon.src = "images/battery_empty_icon.png";
        }
        else if (batteryLevel <= 20) {
            batteryIcon.src = "images/battery_low_icon.png";
        }
        else if (batteryLevel <= 50) {
            batteryIcon.src = "images/battery_half_icon.png";
        }
        else if (batteryLevel <= 80) {
            batteryIcon.src = "images/battery_high_icon.png";
        }
        else if (batteryLevel <= 100) {
            batteryIcon.src = "images/battery_full_icon.png";
        }
    });

    if (document.querySelector('.quick-setting-menu-box')) {
        quickSettingBatteryLevel();
    }
}

function refreshMainWindowComponents() {
    changeTimeDate();
    batteryLevel();
}

changeTimeDate();
batteryLevel();
setInterval(refreshMainWindowComponents, 60000);

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
    removeQuickSettingMenu();
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
        wallpaper.insertBefore(calendarContainer, applicationBox);

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
    removeCalendar();
    if (quickSettingMenuCheck == true) {
        const quickSettingMenuBox = document.createElement('div');
        quickSettingMenuBox.classList.add('quick-setting-menu-box');
        quickSettingMenuBox.addEventListener('click', () => {
            event.stopPropagation();
        });

        const toggleButtonContainerBox = document.createElement('div');
        toggleButtonContainerBox.classList.add('toggle-button-container-box');

        const toggleButtonsData = [
            { iconSrc: 'images/wifi_icon.png', name: 'Wi-Fi', moreOption: true },
            { iconSrc: 'images/wifi_icon.png', name: 'Bluetooth', moreOption: true },
            { iconSrc: 'images/wifi_icon.png', name: 'Battery saver' },
            { iconSrc: 'images/wifi_icon.png', name: 'Nigth light' },
            { iconSrc: 'images/wifi_icon.png', name: 'Accessibility' },
            { iconSrc: 'images/wifi_icon.png', name: 'Cast' },
            { iconSrc: 'images/wifi_icon.png', name: 'Mobile hotspot' },
            { iconSrc: 'images/wifi_icon.png', name: 'Project' },
            { iconSrc: 'images/wifi_icon.png', name: 'Nearby sharing' }
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
        batteryChargeIcon.src = 'images/battery_half_icon.png';
        batteryChargeIcon.alt = '';
        batteryChargeIcon.classList.add('battery-charge-icon');

        const batteryChargePercentage = document.createElement('div');
        batteryChargePercentage.textContent = '59%';
        batteryChargePercentage.classList.add('battery-charge-percentage');

        const batteryChargingStauts = document.createElement('div');
        batteryChargingStauts.textContent = 'Charging';
        batteryChargingStauts.classList.add('battery_charging_status');

        batteryChargeLevel.appendChild(batteryChargeIcon);
        batteryChargeLevel.appendChild(batteryChargePercentage);
        batteryChargeLevel.appendChild(batteryChargingStauts);

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

        wallpaper.insertBefore(quickSettingMenuBox, applicationBox);

        quickSettingBatteryLevel();

        quickSettingMenuCheck = false;
    }
    else {
        removeQuickSettingMenu();
    }
}

function quickSettingBatteryLevel() {
    let batteryIcon = document.getElementById('batteryIcon');
    let batteryChargingIcon = document.querySelector('.battery-charge-icon');
    let batteryChargingStauts = document.querySelector('.battery_charging_status');
    navigator.getBattery().then(function (battery) {

        let batteryLevel = parseInt(battery.level * 100);
        batteryLevelBox.textContent = batteryLevel + '%';
        document.querySelector('.battery-charge-percentage').textContent = batteryLevel + '%';

        let isBatteryCharging = battery.charging;
        let chargingTime = battery.chargingTime;
        let dischargingTime = battery.dischargingTime;
        // dischargingTime = parseInt(dischargingTime / 60);
        // console.log()

        batteryChargingStauts.textContent = '';
        batteryChargingStauts.style.color = 'white';
        if (isBatteryCharging == true) {
            batteryIcon.src = "images/battery_charging_icon.png";
            batteryChargingIcon.src = "images/battery_charging_icon.png";
            batteryChargingStauts.textContent = 'Charging';
            batteryChargingStauts.style.color = 'rgb(0, 211, 0)';
        }
        else if (batteryLevel <= 10) {
            batteryIcon.src = "images/battery_empty_icon.png";
            batteryChargingIcon.src = "images/battery_empty_icon.png";
            batteryChargingStauts.textContent = 'Battery Low';
            batteryChargingStauts.style.color = 'rgb(211, 0, 0)';
        }
        else if (batteryLevel <= 20) {
            batteryIcon.src = "images/battery_low_icon.png";
            batteryChargingIcon.src = "images/battery_low_icon.png";
            // batteryChargingStauts.textContent = dischargingTime;
        }
        else if (batteryLevel <= 50) {
            batteryIcon.src = "images/battery_half_icon.png";
            batteryChargingIcon.src = "images/battery_half_icon.png";
            // batteryChargingStauts.textContent = dischargingTime;
        }
        else if (batteryLevel <= 80) {
            batteryIcon.src = "images/battery_high_icon.png";
            batteryChargingIcon.src = "images/battery_high_icon.png";
            // batteryChargingStauts.textContent = dischargingTime;
        }
        else if (batteryLevel <= 100) {
            batteryIcon.src = "images/battery_full_icon.png";
            batteryChargingIcon.src = "images/battery_full_icon.png"
            // batteryChargingStauts.textContent = dischargingTime;
        }
    });
}

function removeQuickSettingMenu() {
    if (document.querySelector('.quick-setting-menu-box')) {
        let quickSettingMenuBox = document.querySelector('.quick-setting-menu-box')
        quickSettingMenuBox.remove();
        quickSettingMenuCheck = true;
    }
}

document.querySelector('.language-box').addEventListener('click', createKeyboardLanguage)
let keyboardLanguageBoxCheck = true;
function createKeyboardLanguage() {
    event.stopPropagation();
    if (keyboardLanguageBoxCheck == true) {
        const keyboardLanguageBox = document.createElement('div');
        keyboardLanguageBox.classList.add('keyboard-language-box');
        keyboardLanguageBox.addEventListener('click', () => {
            event.stopPropagation();
        });

        const keyboardLayoutBox = document.createElement('div');
        keyboardLayoutBox.classList.add('keyboard-layout-box');
        keyboardLayoutBox.textContent = 'Keyboard layout';

        const languageFeedBox = document.createElement('div');
        languageFeedBox.classList.add('language-feed-box');

        const languageFeed1 = document.createElement('div');
        languageFeed1.classList.add('language-feed1');

        const languageShortName1 = document.createElement('div');
        languageShortName1.classList.add('language-short-name');
        languageShortName1.textContent = 'ENG';

        const languageFullName1 = document.createElement('div');
        languageFullName1.classList.add('language-full-name');
        languageFullName1.textContent = 'English India';

        let languageActiveBar = document.createElement('div');
        languageActiveBar.classList.add('language-active');
        languageFeed1.insertBefore(languageActiveBar, languageFeed1.firstChild);
        languageFeed1.id = ('language-feed-active');

        languageFeed1.appendChild(languageShortName1);
        languageFeed1.appendChild(languageFullName1);
        languageFeed1.onclick = () => {
            if (!document.querySelector('.language-feed1 .language-active')) {
                let languageFeed2 = document.querySelector('.language-feed2');
                languageFeed2.id = 'language-feed-active-None';
                let languageFeed2Active = document.querySelector('.language-feed2 .language-active');
                languageFeed2Active.remove();
                let languageActiveBar = document.createElement('div');
                languageActiveBar.classList.add('language-active');
                languageFeed1.insertBefore(languageActiveBar, languageFeed1.firstChild);
                languageFeed1.id = ('language-feed-active');
            }
        }

        const languageFeed2 = document.createElement('div');
        languageFeed2.classList.add('language-feed2');

        const languageShortName2 = document.createElement('div');
        languageShortName2.classList.add('language-short-name');
        languageShortName2.textContent = 'ENG';

        const languageFullName2 = document.createElement('div');
        languageFullName2.classList.add('language-full-name');
        languageFullName2.textContent = 'English (United States)';

        languageFeed2.appendChild(languageShortName2);
        languageFeed2.appendChild(languageFullName2);
        languageFeed2.onclick = () => {
            if (!document.querySelector('.language-feed2 .language-active')) {
                let languageFeed1 = document.querySelector('.language-feed1');
                languageFeed1.id = 'language-feed-active-None';
                let languageFeed1Active = document.querySelector('.language-feed1 .language-active');
                languageFeed1Active.remove();
                let languageActiveBar = document.createElement('div');
                languageActiveBar.classList.add('language-active');
                languageFeed2.insertBefore(languageActiveBar, languageFeed2.firstChild);
                languageFeed2.id = ('language-feed-active');
            }
        }

        languageFeedBox.appendChild(languageFeed1);
        languageFeedBox.appendChild(languageFeed2);

        const languageMoreBox = document.createElement('div');
        languageMoreBox.classList.add('language-more-box');
        languageMoreBox.textContent = 'More Keyboard Settings';

        keyboardLanguageBox.appendChild(keyboardLayoutBox);
        keyboardLanguageBox.appendChild(languageFeedBox);
        keyboardLanguageBox.appendChild(languageMoreBox);

        wallpaper.insertBefore(keyboardLanguageBox, applicationBox);

        keyboardLanguageBoxCheck = false;
    }
    else {
        removeKeyboardLanguage();
    }
}

function removeKeyboardLanguage() {
    if (document.querySelector('.keyboard-language-box')) {
        let keyboardLanguageBox = document.querySelector('.keyboard-language-box')
        keyboardLanguageBox.remove();
        keyboardLanguageBoxCheck = true;
    }
}

document.querySelector('.hidden-icons').addEventListener('click', createHiddenIconsBox)
let hiddenIconBoxCheck = true;
function createHiddenIconsBox() {
    event.stopPropagation();
    if (hiddenIconBoxCheck == true) {

        const hiddenIconsBox = document.createElement('div');
        hiddenIconsBox.classList.add('hidden-icons-box');
        hiddenIconsBox.addEventListener('click', () => {
            event.stopPropagation();
        });

        const hiddenAppsBox = document.createElement('div');
        hiddenAppsBox.classList.add('hidden-apps-box');

        const imageSources = ["king1.png", "images/app_images/vs-code_icon.png", "king3.png", "king4.png"];

        function handleClick() {
            console.log('App clicked!');
        }

        imageSources.forEach(src => {
            const hiddenApp = document.createElement('div');
            hiddenApp.classList.add('hidden-app');

            const img = document.createElement('img');
            img.src = src;
            img.alt = '';
            img.classList.add('hidden-app-icon');

            hiddenApp.addEventListener('click', handleClick);
            hiddenApp.appendChild(img);
            hiddenAppsBox.appendChild(hiddenApp);
        });

        hiddenIconsBox.appendChild(hiddenAppsBox);

        wallpaper.insertBefore(hiddenIconsBox, applicationBox);

        hiddenIconBoxCheck = false;
    }
    else {
        removeHiddenIconsBox();
    }
}

function removeHiddenIconsBox() {
    if (document.querySelector('.hidden-icons-box')) {
        let hiddenIconsBox = document.querySelector('.hidden-icons-box')
        hiddenIconsBox.remove();
        hiddenIconBoxCheck = true;
    }
}

applicationBox.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    createContextMenuBox(e);
});
let contextMenuBoxCheck = true;
function createContextMenuBox(event) {
    event.stopPropagation();
    if (contextMenuBoxCheck == true) {

        const contextMenuBox = document.createElement('div');
        contextMenuBox.classList.add('context-menu-box');
        contextMenuBox.addEventListener('click', () => {
            event.stopPropagation();
        });

        const contextMenuData = [
            { iconSrc: 'images/view_grid_4_icon.png', name: 'View' },
            { iconSrc: 'images/sorting_arrows_icon.png', name: 'Sort by' },
            { iconSrc: 'images/reload_icon.png', name: 'Refresh' },
            { iconSrc: 'images/reload_icon.png', name: 'Inspect' }
        ];

        contextMenuData.forEach(item => {
            const contextMenuButton = document.createElement('div');
            contextMenuButton.classList.add('context-menu-button');

            const iconBox = document.createElement('div');
            iconBox.classList.add('context-menu-button-icon-box');

            // Create icon
            const icon = document.createElement('img');
            icon.src = item.iconSrc;
            icon.alt = '';
            icon.classList.add('context-menu-button-icon');

            iconBox.appendChild(icon);

            const buttonName = document.createElement('div');
            buttonName.classList.add('context-menu-button-name');
            buttonName.textContent = item.name;

            contextMenuButton.appendChild(iconBox);
            contextMenuButton.appendChild(buttonName);

            contextMenuBox.appendChild(contextMenuButton);
        });
        let mouseCoordinat_X = event.clientX;
        let mouseCoordinat_Y = event.clientY;
        if (mouseCoordinat_X <= 300 && mouseCoordinat_Y <= 400) {
            contextMenuBox.style.left = `${event.clientX}px`;
            contextMenuBox.style.top = `${event.clientY}px`;
            // alert(`top left ${mouseCoordinat_X} ${mouseCoordinat_Y}`);
        }
        else if (mouseCoordinat_X > 300 && mouseCoordinat_Y <= 400) {
            contextMenuBox.style.left = `${event.clientX - 250}px`;
            contextMenuBox.style.top = `${event.clientY}px`;
            // alert(`top right ${mouseCoordinat_X} ${mouseCoordinat_Y}`);
        }
        else if (mouseCoordinat_X <= 300 && mouseCoordinat_Y > 400) {
            contextMenuBox.style.left = `${event.clientX}px`;
            contextMenuBox.style.top = `${event.clientY - 300}px`;
            // alert(`bottom left ${mouseCoordinat_X} ${mouseCoordinat_Y}`);
        }
        else if (mouseCoordinat_X > 300 && mouseCoordinat_Y > 400) {
            contextMenuBox.style.left = `${event.clientX - 250}px`;
            contextMenuBox.style.top = `${event.clientY - 300}px`;
            // alert(`bottom right ${mouseCoordinat_X} ${mouseCoordinat_Y}`);
        }

        wallpaper.insertBefore(contextMenuBox, applicationBox);

        contextMenuBoxCheck = false;
    }
    else {
        removeContextMenuBox();
    }
}

function removeContextMenuBox() {
    if (document.querySelector('.context-menu-box')) {
        let hiddenIconsBox = document.querySelector('.context-menu-box');
        hiddenIconsBox.remove();
        contextMenuBoxCheck = true;
    }
}

function handleKeyPress(event) {
    event.preventDefault();
    // console.log(event)
    if (event.key === "Meta" || event.key === "Windows") {
        createStartMenu();
    }
}
document.addEventListener("keydown", handleKeyPress);


















































































































// // Log browser's user agent
// console.log('User Agent:', navigator.userAgent);

// // Log language preference
// console.log('Language:', navigator.language);

// // Log online status
// console.log('Online:', navigator.onLine);

// // Log cookie enabled status
// console.log('Cookies Enabled:', navigator.cookieEnabled);

// // Log platform
// console.log('Platform:', navigator.platform);

// // Log network type
// console.log('Connection Type:', navigator.connection ? navigator.connection.type : 'Unavailable');

// // Log effective connection type
// console.log('Effective Connection Type:', navigator.connection ? navigator.connection.effectiveType : 'Unavailable');

// // Log device memory
// console.log('Device Memory (GB):', navigator.deviceMemory || 'Unavailable');

// // Log hardware concurrency
// console.log('Hardware Concurrency:', navigator.hardwareConcurrency || 'Unavailable');

// // Log geolocation availability
// console.log('Geolocation Supported:', 'geolocation' in navigator);

// // Log service worker availability
// console.log('Service Worker Supported:', 'serviceWorker' in navigator);

// // User agent string
// console.log('User Agent:', navigator.userAgent);

// // Operating system platform
// console.log('Platform:', navigator.platform);

// // Browser vendor
// console.log('Vendor:', navigator.vendor);

// // Browser language
// console.log('Language:', navigator.language);

// // Whether cookies are enabled
// console.log('Cookies Enabled:', navigator.cookieEnabled);

// // Whether the browser is online
// console.log('Online:', navigator.onLine);

// // Whether Java is enabled
// console.log('Java Enabled:', navigator.javaEnabled());

// // Screen width and height
// console.log('Screen Width:', screen.width);
// console.log('Screen Height:', screen.height);

// // Screen pixel depth
// console.log('Screen Pixel Depth:', screen.pixelDepth);

// // Available screen width and height for the current window
// console.log('Available Screen Width:', screen.availWidth);
// console.log('Available Screen Height:', screen.availHeight);

// // Screen orientation (angle, type: 'portrait-primary', 'portrait-secondary', 'landscape-primary', 'landscape-secondary')
// console.log('Screen Orientation:', screen.orientation.angle, screen.orientation.type);

// // Device pixel ratio
// console.log('Device Pixel Ratio:', window.devicePixelRatio);

// // Browser's supported features
// console.log('Browser Features:', window.navigator);

// // Geolocation support
// console.log('Geolocation Enabled:', 'geolocation' in navigator);

// // Battery status
// navigator.getBattery().then(function (battery) {
//     console.log('Battery Level:', battery.level);
//     console.log('Battery Charging:', battery.charging);
//     console.log('Battery Charging Time:', battery.chargingTime);
//     console.log('Battery Discharging Time:', battery.dischargingTime);
// });

// // Memory status
// console.log('Device Memory (GB):', navigator.deviceMemory);

// // Connection type (returns 'bluetooth', 'cellular', 'ethernet', 'none', 'mixed', 'other', 'unknown', 'wifi', or 'wimax')
// console.log('Connection Type:', navigator.connection.type);

// // Hardware concurrency (number of CPU cores)
// console.log('Hardware Concurrency:', navigator.hardwareConcurrency);

// // WebRTC support
// console.log('WebRTC Supported:', !!navigator.mediaDevices && !!navigator.mediaDevices.getUserMedia);

// // WebGL support
// console.log('WebGL Supported:', !!window.WebGLRenderingContext);

// // Touchscreen support
// console.log('Touchscreen Supported:', 'ontouchstart' in window);

// // Gamepad support
// console.log('Gamepad Supported:', !!navigator.getGamepads || !!navigator.webkitGetGamepads);

// // Clipboard support
// console.log('Clipboard Supported:', !!navigator.clipboard);

// // IndexedDB support
// console.log('IndexedDB Supported:', !!window.indexedDB);

// // Web Workers support
// console.log('Web Workers Supported:', !!window.Worker);

// // Service Worker support
// console.log('Service Worker Supported:', 'serviceWorker' in navigator);

// // WebAssembly support
// console.log('WebAssembly Supported:', typeof WebAssembly !== 'undefined');

// const devices = navigator.mediaDevices.enumerateDevices();
// const audioOutputDevices = devices.filter(device => device.kind === 'audiooutput');
// const speaker = audioOutputDevices[0];

// console.log(speaker);