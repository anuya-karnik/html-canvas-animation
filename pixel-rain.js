const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = 800;
canvas.height = 450;

const image1 = new Image();
image1.src = 'images/image2.jpg';

image1.addEventListener('load', function () {
    ctx.drawImage(image1, -160, -50, this.naturalWidth / 1.8, this.naturalHeight / 1.8);
        // ctx.drawImage(image1, -50, -150, this.naturalWidth / 4, this.naturalHeight / 4);
    // ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height)
    console.log(pixels)


    let particlesArray = [];
    const numberofParticles = 10000;

    let mappedImage = [];

    for (let y = 0; y < canvas.height; y++) {
        let row = []
        for (let x = 0; x < canvas.width; x++) {
            const red = pixels.data[(y * 4 * pixels.width) + (x * 4)]
            const green = pixels.data[(y * 4 * pixels.width) + (x * 4 + 1)]
            const blue = pixels.data[(y * 4 * pixels.width) + (x * 4 + 2)]
            const brightness = calculateRelativeBrightness(red, green, blue)
            const cell = [
                cellBrightness = brightness,
                cellColor = 'rgb(' + red + ', ' + green + ', ' + blue + ')'
            ]
            row.push(cell)

        }
        mappedImage.push(row)
    }

    function calculateRelativeBrightness(red, green, blue) {
        return Math.sqrt(
            (red * red) * 0.299 +
            (green * green) * 0.587 +
            (blue * blue) * 0.114
        ) / 100
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width
            this.y = 0;
            this.speed = 0;
            this.velocity = Math.random() * 5
            this.size = Math.random() * 1.5 + 1
            this.position1 = Math.floor(this.y)
            this.position2 = Math.floor(this.x)
            this.angle = 0;
        }

        update() {
            this.position1 = Math.floor(this.y)
            this.position2 = Math.floor(this.x)
            this.speed = mappedImage[this.position1][this.position2][0]
            let movement = this.speed + this.velocity + (this.speed * 0.002)
            this.angle++;
            
            this.y += movement/2;
            // this.x += movement/2;
            if (this.y >= canvas.height) {
                this.y = 0;
                this.x = Math.random() * canvas.width
            }

            if (this.x >= canvas.width) {
                this.x = 0;
                this.y = Math.random() * canvas.height
            }
        }

        draw() {
            ctx.beginPath();
            ctx.fillStyle = mappedImage[this.position1][this.position2][1]
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
            ctx.fill();

        }
    }

    function init() {
        for (let i = 0; i < numberofParticles; i++) {
            particlesArray.push(new Particle)
        }
    }

    init();
    function animate() {

        // ctx.drawImage(image1, 0,0, canvas.width, canvas.height);
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = 'rgb(0,0,0)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            ctx.globalAlpha = particlesArray[i].speed * 0.2
            particlesArray[i].draw();
        }
        requestAnimationFrame(animate);
    }
    animate();
})