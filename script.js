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
    navigator.getBattery().then(function(battery) {
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