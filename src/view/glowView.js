// Adds glowing background

const glowCircle = document.querySelector('.glow-circle');
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
const speed = 0.01; // Adjust for trailing speed (0 to 1)


document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});


function updateGlowPosition() {
    targetX += (mouseX - targetX) * speed;
    targetY += (mouseY - targetY) * speed;

    glowCircle.style.left = targetX + 'px';
    glowCircle.style.top = targetY + 'px';

    requestAnimationFrame(updateGlowPosition); // Call again on the next frame
}

updateGlowPosition(); // Start the animation loop