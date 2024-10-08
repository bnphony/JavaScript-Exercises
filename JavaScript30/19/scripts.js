const $video = document.querySelector('.player');
const $canvas = document.querySelector('.photo');
const $ctx = $canvas.getContext('2d');
const $strip = document.querySelector('.strip');
const $snap = document.querySelector('.snap');


function getVideo() {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(localMediaStream => {
            $video.srcObject = localMediaStream;
            $video.play();
        })
        .catch(err => {
            console.error(`OH NO!`, err);
        });
}

function paintToCanvas() {
    const width = $video.videoWidth;
    const height = $video.videoHeight;
    $canvas.width = width;
    $canvas.height = height;

    return setInterval(() => {
        $ctx.drawImage($video, 0, 0, width, height);
        // take the pixels out
        let pixels = $ctx.getImageData(0, 0, width, height);
        // mess with them
        // pixels  = redEffect(pixels); // Red tone

        
        // pixels = rgbSplit(pixels);   // Old 3D movie effect
        // $ctx.globalAlpha = 0.8;  // Make Alpha accumulate and generate a tail blur effect

        greenScreen(pixels);
        // put them back
        $ctx.putImageData(pixels, 0, 0);
    }, 16);
}


// Any value that are out of the range, it is out!
function greenScreen(pixels) {
    const levels = {};

    // Get the Values of All the Video Controls
    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
    });

    for (i = 0; i < pixels.data.length; i += 4) {
        red = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];

        if (red >= levels.rmin 
            && green >= levels.gmin
            && blue >= levels.bmin
            && red <= levels.rmax
            && green <= levels.gmax
            && blue <= levels.bmax) {
                pixels.data[i + 3] = 0;
        }
        
    }
    return pixels;
}

// Change the color tone
function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i +=4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 100;  // RED
        pixels.data[i + 1] = pixels.data[i + 1] - 50;   // GREEN
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5;   // BLUE
    }
    return pixels;
}

// Magic RGB effect, like old 3D movies
function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i +=4) {
        pixels.data[i - 150] = pixels.data[i + 0];  // RED
        pixels.data[i + 100] = pixels.data[i + 1];   // GREEN
        pixels.data[i - 150] = pixels.data[i + 2];   // BLUE
    }
    return pixels;
}

function takePhoto() {
    // palyed the sound
    $snap.currentTime = 0;
    $snap.play();

    // take the data out of the canvas
    const data = $canvas.toDataURL('img/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src="${data}" alt="Handsome Man"/>`;
    $strip.insertBefore(link, $strip.firstChild);


}

getVideo();

// ? NO se puede llamar a paintToCanvas() directamente
$video.addEventListener('canplay', paintToCanvas);