let noOfApplicatons = 0;

function applicationLayoutManager() {
    let application = document.getElementsByClassName('application');

    if (noOfApplicatons == 1) {
        for (let element of application) {
            element.style.width = '50%';
            element.style.height = '100%';
            element.style.position = 'static';
        }
    }
    else if (noOfApplicatons == 2) {
        for (let element of application) {
            element.style.width = '50%';
            element.style.height = '100%';
            element.style.position = 'static';
        }
    }
    else if (noOfApplicatons == 3) {
        for (let element of application) {
            element.style.width = '33.3%';
            element.style.height = '100%';
            element.style.position = 'static';
        }
    }
    else if (noOfApplicatons == 4) {
        for (let element of application) {
            element.style.width = '50%';
            element.style.height = '50%';
            element.style.position = 'static';
        }
    }
    else if (noOfApplicatons == 5) {
        for (let element of application) {
            element.style.width = '33.3%';
            element.style.height = '50%';
            element.style.position = 'static';
        }
    }
    else if (noOfApplicatons == 6) {
        for (let element of application) {
            element.style.width = '33.3%';
            element.style.height = '50%';
            element.style.position = 'static';
        }
    }
}

function nothingToDo() {
    console.log('nothing for do');
}

function createApplication(text, url) {
    if (noOfApplicatons >= 6) {
        createAlertWindow();
    }
    else {
        let randomId = Array.from({ length: 5 }, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');

        let applicatonBox = document.getElementById('applicationBox');
        let applicaton = document.createElement('div');
        applicaton.id = randomId;
        let titleBar = document.createElement('div');
        let appName = document.createElement('div');
        // appName.onclick = function () {
        //     maximizeWindow(randomId);
        // }
        let test = document.createElement('div');
        test.onclick = function () {
            focusWindow(randomId);
        }
        let operationBox = document.createElement('div');
        let minimizeBox = document.createElement('div');
        minimizeBox.onclick = function () {
            minimizeWindow(randomId);
        }
        let minimizeIcon = document.createElement('img');
        let maximizeBox = document.createElement('div')
        maximizeBox.onclick = function () {
            maximizeWindow(randomId);
        }
        maximizeBox.addEventListener('mouseenter', function () {
            console.log('maximize box enterd of mouse');
            snapLayoutManager(randomId);
        });
        maximizeBox.addEventListener('mouseleave', function () {
            let snapLayoutBox = document.querySelector('.snap-layout-box');
            let snapLayoutEntryCheck = false;
            snapLayoutBox.addEventListener('mouseenter', () => {
                snapLayoutEntryCheck = true;
            })
            snapLayoutBox.addEventListener('mouseleave', () => {
                snapLayoutManager(randomId);
            })
            setTimeout(() => {
                if (snapLayoutEntryCheck == true) {
                }
                else {
                    snapLayoutManager(randomId);
                }
            }, 500);
        });
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
        test.classList.add('test');
        minimizeBox.classList.add('minimize-box');
        minimizeIcon.classList.add('minimize-icon');
        maximizeBox.classList.add('maximize-box');
        maximizeIcon.classList.add('maximize-icon');
        closeBox.classList.add('close-box');
        closeIcon.classList.add('close-icon');
        appPage.classList.add('app-page');
        ifarme.classList.add('iframe');

        minimizeIcon.src = 'images/minimize_icon.png';
        maximizeIcon.src = 'images/maximize_icon.png';
        closeIcon.src = 'images/close_cross_icon.png';

        noOfApplicatons = noOfApplicatons + 1;

        minimizeBox.appendChild(minimizeIcon);
        maximizeBox.appendChild(maximizeIcon);
        closeBox.appendChild(closeIcon);
        operationBox.appendChild(minimizeBox);
        operationBox.appendChild(maximizeBox);
        operationBox.appendChild(closeBox);
        titleBar.appendChild(appName);
        titleBar.appendChild(test);
        titleBar.appendChild(operationBox);
        appPage.appendChild(ifarme);
        applicaton.appendChild(titleBar);
        applicaton.appendChild(appPage);
        applicatonBox.appendChild(applicaton);

        appName.textContent = text;
        ifarme.src = url;
        ifarme.style.border = '0';

        applicationLayoutManager();
    }
}

function minimizeWindow(idName) {
    let appFullScreen = document.getElementById(idName);

    appFullScreen.style.width = '50%';
    appFullScreen.style.height = '100%';
    appFullScreen.style.position = 'static';

    applicationLayoutManager();
    focusWindow();
}

function maximizeWindow(idName) {
    let appFullScreen = document.getElementById(idName);

    appFullScreen.style.width = '100%';
    appFullScreen.style.height = '95%';
    appFullScreen.style.position = 'fixed';
    appFullScreen.style.top = '0';
    appFullScreen.style.left = '0';
    appFullScreen.style.zIndex = '3';
}

function deleteWindow(idName) {
    var windowFrame = document.getElementById(idName);
    windowFrame.remove();

    noOfApplicatons = noOfApplicatons - 1;

    applicationLayoutManager();
}

function focusWindow(idName) {
    let allApplication = document.getElementsByClassName('application');
    
    for (let element of allApplication) {
        element.style.zIndex = '2';
    }
    
    if (document.getElementById(idName)) {
        let application = document.getElementById(idName);
        application.style.zIndex = '3';
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

let test2 = true;
function snapLayoutManager(idName) {

    const firstParagraph = document.querySelector(`#${idName} .title-bar .operation-box`);

    if (test2 == true) {
        let snapLayoutBox = document.createElement('div');
        snapLayoutBox.classList.add('snap-layout-box');

        let boxesData = [
            ['box1', 'box2'],
            ['box3', 'box4'],
            ['box5', 'box6', 'box7'],
            ['box8', 'box9', 'box10', 'box11']
        ];

        boxesData.forEach(boxData => {
            let boxContainer = document.createElement('div');
            boxContainer.classList.add('box-container');
            let boxContainer3 = document.createElement('div');
            boxContainer3.classList.add('box-container3');
            let lastBoxName = '';

            boxData.forEach(boxName => {
                if (boxName == "box8" || boxName == "box9" || boxName == "box10" || boxName == "box11") {
                    console.log('box8 to box11');
                    let box = document.createElement('div');
                    box.classList.add(boxName);
                    box.onclick = function () {
                        snapLayoutMiniManager(idName, boxName);
                    }
                    boxContainer3.appendChild(box);
                    lastBoxName = boxName;
                }
                else {
                    let box = document.createElement('div');
                    box.classList.add(boxName);
                    box.onclick = function () {
                        snapLayoutMiniManager(idName, boxName);
                    }
                    boxContainer.appendChild(box);
                }
            });
            if (lastBoxName == 'box11') {
                snapLayoutBox.appendChild(boxContainer3);
            }
            else {
                snapLayoutBox.appendChild(boxContainer);
            }
        });

        firstParagraph.appendChild(snapLayoutBox);
        test2 = false;
    }
    else {
        if (document.querySelector('.snap-layout-box')) {
            document.querySelector('.snap-layout-box').remove();
            test2 = true;
        }
    }
}

function snapLayoutMiniManager(idName, box) {
    console.log(box)
    if (box == 'box1') {
        let application = document.getElementById(idName);

        application.style.width = '50%';
        application.style.height = '95%';
        application.style.position = 'fixed';
        application.style.top = '0';
        application.style.left = '0';
    }
    else if (box == 'box2') {
        let application = document.getElementById(idName);

        application.style.width = '50%';
        application.style.height = '95%';
        application.style.position = 'fixed';
        application.style.top = '0';
        application.style.left = '50%';
    }
    else if (box == 'box3') {
        let application = document.getElementById(idName);

        application.style.width = '67%';
        application.style.height = '95%';
        application.style.position = 'fixed';
        application.style.top = '0';
        application.style.left = '0';
    }
    else if (box == 'box4') {
        let application = document.getElementById(idName);

        application.style.width = '33.3%';
        application.style.height = '95%';
        application.style.position = 'fixed';
        application.style.top = '0';
        application.style.left = '67%';
    }
    else if (box == 'box5') {
        let application = document.getElementById(idName);

        application.style.width = '33.3%';
        application.style.height = '95%';
        application.style.position = 'fixed';
        application.style.top = '0';
        application.style.left = '0';
    }
    else if (box == 'box6') {
        let application = document.getElementById(idName);

        application.style.width = '33.3%';
        application.style.height = '95%';
        application.style.position = 'fixed';
        application.style.top = '0';
        application.style.left = '33.5%';
    }
    else if (box == 'box7') {
        let application = document.getElementById(idName);

        application.style.width = '33.3%';
        application.style.height = '95%';
        application.style.position = 'fixed';
        application.style.top = '0';
        application.style.left = '67%';
    }
    else if (box == 'box8') {
        let application = document.getElementById(idName);

        application.style.width = '50%';
        application.style.height = '47.5%';
        application.style.position = 'fixed';
        application.style.top = '0';
        application.style.left = '0';
    }
    else if (box == 'box9') {
        let application = document.getElementById(idName);

        application.style.width = '50%';
        application.style.height = '47.5%';
        application.style.position = 'fixed';
        application.style.top = '0';
        application.style.left = '50%';
    }
    else if (box == 'box10') {
        let application = document.getElementById(idName);

        application.style.width = '50%';
        application.style.height = '47.5%';
        application.style.position = 'fixed';
        application.style.top = '47.5%';
        application.style.left = '0';
    }
    else if (box == 'box11') {
        let application = document.getElementById(idName);

        application.style.width = '50%';
        application.style.height = '47.5%';
        application.style.position = 'fixed';
        application.style.top = '47.5%';
        application.style.left = '50%';
    }
}