function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
}

function handleFileDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const imgPreview = document.getElementById('imagePreview');
            imgPreview.src = event.target.result;
            
        }
        reader.readAsDataURL(file);
    } else {
        alert('Please drop an image file.');
    }
}

function showImage() {
    const imgPreview = document.getElementById('imagePreview');
    if (imgPreview.src != '#') {
        alert('Image uploaded successfully!');
    } else {
        alert('Please upload an image first.');
    }
}