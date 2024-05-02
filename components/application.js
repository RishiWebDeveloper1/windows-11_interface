let noOfApplicatons = 0;

function applicationLayoutManager() {
    let application = document.getElementsByClassName('application');

    if (noOfApplicatons <= 2) {
        for (let element of application) {
            element.style.height = '100%';
        }
    }
    else if (noOfApplicatons <= 4) {
        for (let element of application) {
            element.style.height = '50%';
        }
    }
    else if (noOfApplicatons > 4) {
        for (let element of application) {
            element.style.width = '33%';
        }
    }
}


function createApplication(text, url) {
    if (noOfApplicatons >= 6) {
        createAlertWindow();
    }
    else {
        let randomId = (Math.random() + 1).toString(36).substring(7);

        let applicatonBox = document.getElementById('applicationBox');
        let applicaton = document.createElement('div');
        applicaton.id = randomId;
        let titleBar = document.createElement('div');
        let appName = document.createElement('div')
        let operationBox = document.createElement('div')
        let minimizeBox = document.createElement('div');
        minimizeBox.onclick = function () {
            minimizeWindow(randomId);
        }
        let minimizeIcon = document.createElement('img');
        let maximizeBox = document.createElement('div')
        maximizeBox.onclick = function () {
            maximizeWindow(randomId);
        }
        let maximizeIcon = document.createElement('img')
        let closeBox = document.createElement('div')
        closeBox.onclick = function () {
            deleteWindow(randomId);
        }
        let closeIcon = document.createElement('img')
        let appPage = document.createElement('div')
        let ifarme = document.createElement('iframe')

        applicaton.classList.add('application');
        titleBar.classList.add('title-bar');
        appName.classList.add('app-name');
        operationBox.classList.add('operation-box');
        minimizeBox.classList.add('minimize-box');
        minimizeIcon.classList.add('minimize-icon');
        maximizeBox.classList.add('maximize-box');
        maximizeIcon.classList.add('maximize-icon');
        closeBox.classList.add('close-box');
        closeIcon.classList.add('close-icon');
        appPage.classList.add('app-page');
        ifarme.classList.add('iframe');

        minimizeIcon.src = '../images/minimize_icon.png';
        maximizeIcon.src = '../images/maximize_icon.png';
        closeIcon.src = 'https://static-00.iconduck.com/assets.00/cross-icon-2048x2048-vz9m0pj3.png';

        noOfApplicatons = noOfApplicatons + 1;

        minimizeBox.appendChild(minimizeIcon);
        maximizeBox.appendChild(maximizeIcon);
        closeBox.appendChild(closeIcon);
        operationBox.appendChild(minimizeBox);
        operationBox.appendChild(maximizeBox);
        operationBox.appendChild(closeBox);
        titleBar.appendChild(appName);
        titleBar.appendChild(operationBox);
        appPage.appendChild(ifarme);
        applicaton.appendChild(titleBar);
        applicaton.appendChild(appPage);
        applicatonBox.appendChild(applicaton);

        appName.textContent = text;
        ifarme.src = url;

        applicationLayoutManager();
    }
}

function createAlertWindow() {
    let alertWindowBox = document.createElement('div');
    let alertmessage = document.createElement('div');
    let alertbutton = document.createElement('div');
    alertbutton.addEventListener('click', deleteAlertWindow);

    alertWindowBox.id = "alertWindowBox";
    alertWindowBox.classList.add('alert-window-box');
    alertmessage.classList.add('alert-messag');
    alertbutton.classList.add('alert-button');

    alertmessage.textContent = "Can't open more then 6 application";
    alertbutton.textContent = "OK";

    alertWindowBox.appendChild(alertmessage);
    alertWindowBox.appendChild(alertbutton);

    let applicatonBox = document.getElementById('applicationBox');
    applicatonBox.appendChild(alertWindowBox);
}

function deleteAlertWindow() {
    var windowFrame = document.getElementById("alertWindowBox");
    console.log(windowFrame);
    windowFrame.remove();
}

let fullScreenCheck = false;
function minimizeWindow(idName) {
    if (fullScreenCheck == true) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
        fullScreenCheck = false;
    }
}

function maximizeWindow(idName) {
    let appFullScreen = document.getElementById(idName)

    if (appFullScreen.requestFullscreen) {
        appFullScreen.requestFullscreen();
    }
    else if (appFullScreen.webkitRequestFullscreen) { /* Safari */
        appFullScreen.webkitRequestFullscreen();
    }
    else if (appFullScreen.msRequestFullscreen) { /* IE11 */
        appFullScreen.msRequestFullscreen();
    }
    fullScreenCheck = true;
}

function deleteWindow(idName) {
    var windowFrame = document.getElementById(idName);
    windowFrame.remove();

    noOfApplicatons = noOfApplicatons - 1;
}