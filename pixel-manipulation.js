const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = 800;
canvas.height = 450;

const image1 = new Image();
image1.src = 'images/image1.jpg';

image1.addEventListener('load', function () {
    ctx.drawImage(image1, -50, -150, this.naturalWidth / 4, this.naturalHeight / 4);
    const scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height)
    console.log(scannedImage)
    const scannedData = scannedImage.data

    // Manually turning an image to grayscale
    for (let i = 0; i < scannedData.length; i += 4) {
        const total = scannedData[i] + scannedData[i + 1] + scannedData[i + 2];
        const averageColorValue = total / 3;
        scannedData[i] = averageColorValue
        scannedData[i + 1] = averageColorValue
        scannedData[i + 2] = averageColorValue
    }
    console.log(scannedData)

    scannedImage.data = scannedData;
    ctx.putImageData(scannedImage, 0, 0)
})
