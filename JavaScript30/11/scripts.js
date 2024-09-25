/* Get Our Elements */
const $player = document.querySelector('.player');
const $video = $player.querySelector('.viewer');
// $video.src = 'Openings2023.mp4';
const $progress = $player.querySelector('.progress');
const $progressBar = $player.querySelector('.progress__filled');

const $toggle = $player.querySelector('.toggle');
const $skipButtons = $player.querySelectorAll('[data-skip]');
const $ranges = $player.querySelectorAll('.player__slider');

const $fullScreen = $player.querySelector('.full__screen');

const $restartButton = $player.querySelector('.restartBtn');

// Hover Element
const $tooltip = document.getElementById('tooltip');

/* Build out functions */
function togglePlay() {
    const method = $video.paused ? 'play' : 'pause';
    $video[method]();
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    $toggle.textContent = icon;
}

function skip() {
    $video.currentTime += parseFloat(this.dataset.skip);
}

function handlerangeUpdate() {
    $video[this.name] = this.value;
    
}

// Update the progress bar
function handleProgress() {
    const percent = ($video.currentTime / $video.duration) * 100;
    $progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / $progress.offsetWidth) * $video.duration;
    $video.currentTime = scrubTime;
    mousedown = false;
}

function showTooltip(event, element) {
    $tooltip.textContent = element.value;
    $tooltip.style.display = 'block';
    $tooltip.style.left = `${event.pageX + 5}px`;
    $tooltip.style.top = `${event.pageY - 30}px`;
}

// Control de Full-Screen
function fullScreenVideo() {
    if(!document.fullscreenElement) {
        if ($video.requestFullscreen) {  // Modern browers
            $video.requestFullscreen();
        } else if ($video.mozRequestFullScreen) { // Firefox
            $video.mozRequestFullScreen();
        } else if ($video.webkitRequestFullscreen) { // Chrome, Safari
            $video.webkitRequestFullscreen();
        } else if ($video.msRequestFullscreen) { // IE/Edge
            $video.msRequestFullscreen();
        }
    } else {
        document.exitFullscreen();
    }
}

function restartVideo() {
    $video.currentTime = 0;
}

/* Hook up the event listeners */
$video.addEventListener('click', togglePlay);
// Control the play/pause button
$video.addEventListener('play', updateButton);
$video.addEventListener('pause', updateButton);

// Play/Pause Button
$toggle.addEventListener('click', togglePlay);

// Full-Screen Button
$fullScreen.addEventListener('click', fullScreenVideo);

// Restart Video
$restartButton.addEventListener('click', restartVideo);

// ProgressBarUpdate
// timeupdate -> se activa cuando va avanzando/retrocediendo el video
$video.addEventListener('timeupdate', handleProgress);

// Skip buttons
$skipButtons.forEach(button => button.addEventListener('click', skip));

// Sliders Volume/Speed
// Click
$ranges.forEach(range => range.addEventListener('change', handlerangeUpdate));
// Hold the click
$ranges.forEach(range => range.addEventListener('mousemove', handlerangeUpdate));

// $ranges.forEach(function(range) {
    //     range.addEventListener('mouseenter', function(e) {
        //         showTooltip(e, this);  // 'this' refers to the DOM element (range) that triggered the event
        //     });
        // });
        
// Control the Hover Tooltip
$ranges.forEach(range => range.addEventListener('mousemove', (e) => showTooltip(e, range)));
$ranges.forEach(range => range.addEventListener('mouseenter', (e) => showTooltip(e, range)));
$ranges.forEach(range => range.addEventListener('mouseleave', () => $tooltip.style.display = 'none'));


let mousedown = false;
// Click to skip in the progress bar
$progress.addEventListener('click', scrub);
// Hold the click in the progress bar
$progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
// Control that only when hold the click you active 'mousemove'
$progress.addEventListener('mousedown', () => mousedown = true);
$progress.addEventListener('mouseup', () => mousedown = false);
