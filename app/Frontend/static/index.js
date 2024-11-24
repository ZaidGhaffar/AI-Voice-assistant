const orb = document.querySelector('.orb-container');
const glowEffect = document.querySelector('.glow-effect');
const innerGradient = document.querySelector('.inner-gradient');
const sliderContainer = document.querySelector('.slider-container');
const sliderButton = document.querySelector('.slider-button');
const sliderFill = document.querySelector('.slider-fill');
const sliderText = document.querySelector('.slider-text');
const micIcon = sliderButton.querySelector('svg');

let isDragging = false;
let startX, startLeft;

function setActive(active) {
    glowEffect.style.opacity = active ? '1' : '0.4';
    innerGradient.style.transform = active ? 'scale(1.1)' : 'scale(0.9)';
    sliderFill.style.right = active ? '4px' : 'calc(100% - 60px)';
    sliderButton.style.left = active ? 'calc(100% - 60px)' : '4px';
    micIcon.style.fill = active ? '#3b82f6' : 'none';
    sliderText.textContent = active ? 'Release to stop' : 'Slide to talk with assistant';
    if (active) {
        // 🌟 Request Microphone Access 🎤
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                // 🟢 Microphone access granted!
                console.log("Microphone access granted 🎙️");
                sliderText.textContent = "Listening... 🎧";
            })
            .catch(error => {
                // 🔴 Microphone access denied
                console.error("Microphone access denied ❌", error);
                sliderText.textContent = "Mic access denied 😢";
            });
    }
}

sliderButton.addEventListener('mousedown', startDragging);
sliderButton.addEventListener('touchstart', startDragging);

function startDragging(e) {
    isDragging = true;
    startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    startLeft = sliderButton.offsetLeft;
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('mouseup', stopDragging);
    document.addEventListener('touchend', stopDragging);
}

function drag(e) {
    if (!isDragging) return;
    const x = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const walk = x - startX;
    let newLeft = startLeft + walk;
    const maxLeft = sliderContainer.offsetWidth - sliderButton.offsetWidth;
    newLeft = Math.max(0, Math.min(newLeft, maxLeft));
    const active = newLeft > sliderContainer.offsetWidth * 0.6;
    setActive(active);
    sliderButton.style.left = `${newLeft}px`;
    sliderFill.style.right = `${sliderContainer.offsetWidth - newLeft - sliderButton.offsetWidth}px`;
}

function stopDragging() {
    isDragging = false;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('touchmove', drag);
    document.removeEventListener('mouseup', stopDragging);
    document.removeEventListener('touchend', stopDragging);
    setActive(false);
}