const video = document.getElementById('video');
const captureButton = document.querySelector('.camera-button-box');
const capturedPhoto = document.getElementById('captured-photo');
navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.error('Error accessing the camera:', err);
    });

captureButton.addEventListener('click', () => {
    if (cameraButtonBox.id == 'active') {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataURL = canvas.toDataURL('image/png');
        capturedPhoto.src = imageDataURL;
        let num = 1;
        let fileName = `camera_photo${num}.png`;

        while (localStorage.getItem(fileName) != null) {
            fileName = `camera_photo${num}.png`;
            console.log(fileName);
            num += 1;
            if (num == 100) {
                break;
            }
        }
        localStorage.setItem(fileName, imageDataURL);
    }
});

let vidoeButtonIcon = document.querySelector('.video-button-icon')
let videoButtonBox = document.querySelector('.video-button-box')
videoButtonBox.addEventListener('click', () => {
    activeButton('video');
})
let cameraButtonIcon = document.querySelector('.camera-button-icon')
let cameraButtonBox = document.querySelector('.camera-button-box')
cameraButtonBox.addEventListener('click', () => {
    activeButton('camera');
})
let qrButtonIcon = document.querySelector('.qr-button-icon')
let qrButtonBox = document.querySelector('.qr-button-box')
qrButtonBox.addEventListener('click', () => {
    activeButton('qr');
})

function activeButton(buttonName) {
    console.log('hello active button function is working');

    let ButtonElement = document.querySelector(`.${buttonName}-button-box`);
    videoButtonBox.id = '';
    vidoeButtonIcon.src = "images/video_button_icon_white.png";
    cameraButtonBox.id = '';
    cameraButtonIcon.src = "images/camera_button_icon_white.png";
    qrButtonBox.id = '';
    qrButtonIcon.src = "images/qr_button_icon_white.png";
    if (ButtonElement.id != "active") {
        ButtonElement.id = "active";
        document.querySelector(`.${buttonName}-button-icon`).src = `images/${buttonName}_button_icon_black.png`;
    }
}

let slideUpButtonBox = document.querySelector('.slide-up-button-box');
slideUpButtonBox.addEventListener('click', slideUpButtonArrow);
let slideDownButtonBox = document.querySelector('.slide-down-button-box');
slideDownButtonBox.addEventListener('click', slideDownButtonArrow);
function slideUpButtonArrow() {
    // videoButtonBox.id = '';
    // vidoeButtonIcon.src = "images/video_button_icon_white.png";
    // cameraButtonBox.id = '';
    // cameraButtonIcon.src = "images/camera_button_icon_white.png";
    // qrButtonBox.id = '';
    // qrButtonIcon.src = "images/qr_button_icon_white.png";
    if (cameraButtonBox.id == 'active') {
        videoButtonBox.id = 'active';
        vidoeButtonIcon.src = "images/video_button_icon_black.png";

        cameraButtonBox.id = '';
        cameraButtonIcon.src = "images/camera_button_icon_white.png";
        qrButtonBox.id = '';
        qrButtonIcon.src = "images/qr_button_icon_white.png";
    }
    else if (qrButtonBox.id == 'active') {
        videoButtonBox.id = '';
        vidoeButtonIcon.src = "images/video_button_icon_white.png";
        cameraButtonBox.id = '';
        qrButtonBox.id = '';
        qrButtonIcon.src = "images/qr_button_icon_white.png";

        cameraButtonBox.id = 'active';
        cameraButtonIcon.src = "images/camera_button_icon_black.png";
    }
}

function slideDownButtonArrow() {
    if (cameraButtonBox.id == 'active') {
        qrButtonBox.id = 'active';
        qrButtonIcon.src = "images/qr_button_icon_black.png";

        videoButtonBox.id = '';
        vidoeButtonIcon.src = "images/video_button_icon_white.png";
        cameraButtonBox.id = '';
        cameraButtonIcon.src = "images/camera_button_icon_white.png";
    }
    else if (videoButtonBox.id == 'active') {
        videoButtonBox.id = '';
        vidoeButtonIcon.src = "images/video_button_icon_white.png";
        cameraButtonBox.id = '';
        qrButtonBox.id = '';
        qrButtonIcon.src = "images/qr_button_icon_white.png";

        cameraButtonBox.id = 'active';
        cameraButtonIcon.src = "images/camera_button_icon_black.png";
    }
}