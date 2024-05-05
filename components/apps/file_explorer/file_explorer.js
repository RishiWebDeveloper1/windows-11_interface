const imageInput = document.getElementById('imageInput');
const uploadButton = document.getElementById('uploadButton');
const showButton = document.getElementById('showButton');
const imagePreview = document.getElementById('imagePreview');

imageInput.addEventListener('change',

    function () {
        const file = imageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                const imageData = reader.result;
                let imageName = file.name;
                localStorage.setItem(imageName, imageData);
                loadImageList();
            };
        }
    }
);

function loadImageList() {
    let allImage = document.querySelector('.loaded-file-box');
    allImage.innerHTML = '';
    const storage = window.localStorage;
    const keys = Object.keys(storage);

    for (const getImageName of keys) {
        let imageCheck = ['.jpg', '.png', '.jpeg']

        for (let i of imageCheck) {
            let index = getImageName.indexOf(i);
            
            if (index !== -1) {
                // console.log('in if')
                
                const folderDetailBox = document.createElement('div');
                folderDetailBox.classList.add('folder-detail-box');
                folderDetailBox.onclick = () => {
                    showImage(getImageName);
                }
                
                const folderDetailIconBox = document.createElement('div');
                folderDetailIconBox.classList.add('folder-detail-icon-box');
                
                const folderIcon = document.createElement('img');
                folderIcon.src = 'images/image_icon.png';
                folderIcon.alt = 'image';
                folderIcon.classList.add('folder-icon');
                
                const folderDetailContentBox = document.createElement('div');
                folderDetailContentBox.classList.add('folder-detail-box');
                
                const folderDetailNameBox = document.createElement('div');
                folderDetailNameBox.classList.add('folder-detail-name-box');
                folderDetailNameBox.textContent = getImageName;
                
                const dateModifiedBox = document.createElement('div');
                dateModifiedBox.classList.add('date-modified-box');
                dateModifiedBox.textContent = '04-05-2024 06:08 PM';
            
                const typeBox = document.createElement('div');
                typeBox.classList.add('type-box');
                typeBox.textContent = 'File Folder';
                
                const sizeBox = document.createElement('div');
                sizeBox.classList.add('size-box');
                sizeBox.textContent = '100GB';
                
                folderDetailIconBox.appendChild(folderIcon);
                folderDetailBox.appendChild(folderDetailIconBox);
                folderDetailContentBox.appendChild(folderDetailNameBox);
                folderDetailContentBox.appendChild(dateModifiedBox);
                folderDetailContentBox.appendChild(typeBox);
                folderDetailContentBox.appendChild(sizeBox);
                folderDetailBox.appendChild(folderDetailContentBox);
                allImage.appendChild(folderDetailBox);
            }
        }
    }
}

function showImage(imageName) {
    let imagePreviewBox = document.querySelector('.image-preview-box');
    let getImage = localStorage.getItem(imageName);
    imagePreview.src = getImage;
    imagePreviewBox.style.display = 'flex';
    setTimeout(() => {
        if (imagePreview.naturalWidth > imagePreview.naturalHeight) {
            console.log('width is greater')
            imagePreview.style.width = '90%';
        }
        else {
            console.log('height is greater')
            imagePreview.style.height = '90%';
        }        
    }, 500);
}

function closeImage() {
    let imagePreviewBox = document.querySelector('.image-preview-box');
    imagePreviewBox.style.display = 'none';
    imagePreview.style.width = 'auto';
    imagePreview.style.height = 'auto';
}

loadImageList();