const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const mainContainer = document.getElementById('mainContainer');
const successMessage = document.getElementById('successMessage');

// Messages to show on the No button
const noTexts = [
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;("
];

let yesFontSize = 1.2; // Initial font size in rem
let noClickCount = 0;

noBtn.addEventListener('click', handleNoInteraction);

function handleNoInteraction() {
    noClickCount++;

    // Change No button text
    const randomText = noTexts[Math.min(noClickCount, noTexts.length - 1)];
    noBtn.innerText = randomText;

    // Make Yes button bigger
    yesFontSize += 0.4;
    yesBtn.style.fontSize = `${yesFontSize}rem`;
    // Also increase padding to keep proportions
    const currentPadding = 15 + (noClickCount * 5);
    yesBtn.style.padding = `${currentPadding}px ${currentPadding * 2}px`;

    // Optional: Make No button smaller or move it
    // For this graceful version, we just let Yes take over
}

yesBtn.addEventListener('click', () => {
    // Hide main container, show success
    mainContainer.classList.add('hidden');
    successMessage.classList.remove('hidden');

    // Confetti
    fireConfetti();
});

function fireConfetti() {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

// Background Floating Hearts
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.bottom = '-10vh';
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    heart.style.opacity = Math.random() * 0.5 + 0.3;
    heart.style.animation = `float ${Math.random() * 3 + 5}s linear forwards`;

    document.getElementById('floatingHearts').appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 8000);
}

setInterval(createFloatingHeart, 300);

// Add float keyframes dynamically
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes float {
    to {
        transform: translateY(-120vh) rotate(360deg);
    }
}`;
document.head.appendChild(styleSheet);
