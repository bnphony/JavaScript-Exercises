// TODO: SOLUCION #2
function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if (!audio) return; // stop the function
    audio.currentTime = 0;
    audio.play();
    key.classList.add('pressed');
}
function removeTransition(e) {
    if (e.propertyName !== 'transform') return; // skip it if it's not a transform property
    this.classList.remove('pressed');
}
const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

window.addEventListener('keydown', playSound);

// * EJECICIO APARTE
// Calcular el costo total con descuento en cada mes completo
function calcular(ratePerHour, numDays, discount) {
    let dayRate = 8 * ratePerHour;
    let fullMonths = Math.floor(numDays / 22); // Number of full 20-day months
    let completeMonthDays = fullMonths * 22;   // Total days in full months
    let remainingDays = numDays - completeMonthDays; // Remaining days outside full months
    let discountPercentage = (100 - discount) / 100;

    // Apply discount to full months and add the full price for the remaining days
    return Math.ceil(
        dayRate * completeMonthDays * discountPercentage + // Discounted full months
        dayRate * remainingDays // Full price for remaining days
    );
}

console.log(calcular(16, 130, 15));  // Expected: 14528



// console.log(calcular(29.654321, 220, 11.2));
// console.log(calcular(29.654321, 155, 25.47));

// TODO: SOLUCION #1
/*
document.addEventListener('keydown', function(event) {
    const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
    const keyPressed = document.querySelector(`.key[data-key="${event.keyCode}"]`);
    if (!audio) return;
    keyPressed.classList.add('pressed');
    audio.currentTime = 0; // Reiniar el audio
    audio.play();
    setTimeout(function() {
        keyPressed.classList.remove('pressed');
    }, 300);

});

*/