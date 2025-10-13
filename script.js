// Challenge Matrix - Main JavaScript Logic

// Challenge data
const challengesData = [
    {
        id: 1,
        title: "Secrets of Batpool",
        difficulty: "Easy",
        description: "",
        flag_hash: "6a4688f04bdbd0ea3a98edd5f9b021336c83bfab988dd26886d2e9428ba1b04c", //haxxor{1_4m_B4tm4n}
        unlocked: true,
        completed: false,
        zipFile: "challenge1.zip",
        audioFile: "voice1.mp3"
    },
    {
        id: 2,
        title: "Cipher Nexus",
        difficulty: "Medium",
        description: "The ancient art of cryptography holds the key. Decode the encrypted transmission.",
        flag_hash: "3a285f67244bc8d0c1d61e72b7d64752c405d100dbd9aae6dc02c9d057febec5",//haxxor{th3_b1gg3r_th3_b3tt3r}
        unlocked: false,
        completed: false,
        zipFile: "challenge2.zip",
        audioFile: "voice2.mp3"
    },
    {
        id: 3,
        title: "System Override",
        difficulty: "Hard",
        description: "The final barrier stands before you. Break through the last firewall.",
        flag_hash: "CTF{final_boss}",
        unlocked: false,
        completed: false,
        zipFile: "challenge3.zip",
        audioFile: "voice3.mp3"
    }
];


// Audio messages for each challenge
const audioMessages = {
    voice1: "Congratulations! You've taken your first step into the matrix.",
    voice2: "Excellent work, crypto master. The codes bend to your will.",
    voice3: "System compromised. You are the chosen one. Welcome to the real world."
};

// Global state
let currentChallenges = [...challengesData];
let isMuted = false;
let currentVolume = 0.7;
let currentChallengeId = null;

// DOM Elements
const challengesGrid = document.getElementById('challengesGrid');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const challengeModal = document.getElementById('challengeModal');
const overlay = document.getElementById('overlay');
const modalTitle = document.getElementById('modalTitle');
const modalDifficulty = document.getElementById('modalDifficulty');
const modalDescription = document.getElementById('modalDescription');
const flagInput = document.getElementById('flagInput');
const submitFlag = document.getElementById('submitFlag');
const downloadBtn = document.getElementById('downloadBtn');
const feedbackMessage = document.getElementById('feedbackMessage');
const closeModal = document.getElementById('closeModal');
const muteBtn = document.getElementById('muteBtn');
const volumeSlider = document.getElementById('volumeSlider');
const successEffects = document.getElementById('successEffects');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadProgress();
    createMatrixRain();
});

// Initialize the application
function initializeApp() {
    renderChallenges();
    updateProgress();
}

// Setup event listeners
function setupEventListeners() {
    // Modal controls
    closeModal.addEventListener('click', hideModal);
    overlay.addEventListener('click', hideModal);

    // Flag submission
    submitFlag.addEventListener('click', handleFlagSubmission);
    flagInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleFlagSubmission();
        }
    });

    // Audio controls
    muteBtn.addEventListener('click', toggleMute);
    volumeSlider.addEventListener('input', updateVolume);

    // Download button
    downloadBtn.addEventListener('click', handleDownload);

    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideModal();
        }
    });
}

// Render challenge cards
function renderChallenges() {
    challengesGrid.innerHTML = '';

    currentChallenges.forEach(challenge => {
        const card = createChallengeCard(challenge);
        challengesGrid.appendChild(card);
    });
}

// Create individual challenge card
function createChallengeCard(challenge) {
    const card = document.createElement('div');
    card.className = `challenge-card ${getCardStatus(challenge)}`;
    card.setAttribute('data-challenge-id', challenge.id);

    card.innerHTML = `
        <div class="challenge-header">
            <h3 class="challenge-title">${challenge.title}</h3>
            <div class="difficulty-badge difficulty-${challenge.difficulty.toLowerCase()}">
                ${challenge.difficulty}
            </div>
        </div>
        <p class="challenge-description">${challenge.description}</p>
        <div class="challenge-status">
            <span class="status-icon ${getStatusIconClass(challenge)}">
                ${getStatusIcon(challenge)}
            </span>
            <span>${getStatusText(challenge)}</span>
        </div>
    `;

    if (challenge.unlocked) {
        card.addEventListener('click', () => showModal(challenge));
    }

    return card;
}

// Get card status class
function getCardStatus(challenge) {
    if (challenge.completed) return 'completed';
    if (challenge.unlocked) return 'unlocked';
    return 'locked';
}

// Get status icon class
function getStatusIconClass(challenge) {
    if (challenge.completed) return 'status-completed';
    if (challenge.unlocked) return 'status-unlocked';
    return 'status-locked';
}

// Get status icon
function getStatusIcon(challenge) {
    if (challenge.completed) return '✅';
    if (challenge.unlocked) return '🔓';
    return '🔒';
}

// Get status text
function getStatusText(challenge) {
    if (challenge.completed) return 'Completed';
    if (challenge.unlocked) return 'Ready to solve';
    return 'Locked';
}

// Show modal for challenge
function showModal(challenge) {
    if (!challenge.unlocked) return;

    currentChallengeId = challenge.id;
    modalTitle.textContent = challenge.title;
    modalDifficulty.textContent = challenge.difficulty;
    modalDifficulty.className = `difficulty-badge difficulty-${challenge.difficulty.toLowerCase()}`;

    // Typing animation for description
    typeText(modalDescription, challenge.description);

    // Update download button
    downloadBtn.disabled = false;
    downloadBtn.innerHTML = '📁 Download Challenge'
    // Clear previous feedback and input
    feedbackMessage.innerHTML = '';
    feedbackMessage.className = 'feedback-message';
    flagInput.value = '';
    flagInput.focus();

    // Show modal
    challengeModal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

// Hide modal
function hideModal() {
    challengeModal.classList.add('hidden');
    overlay.classList.add('hidden');
    currentChallengeId = null;
}

// Handle flag submission
async function handleFlagSubmission() {
    if (!currentChallengeId) return;

    const challenge = challengesData.find(c => c.id === currentChallengeId);
    const submittedFlag = flagInput.value.trim();

    // Compute SHA-256 hash of the submitted flag
    const enc = new TextEncoder().encode(submittedFlag);
    const hashBuffer = await crypto.subtle.digest("SHA-256", enc);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    console.log(submittedFlag);
    console.log(hashHex);
    console.log(challenge.flag_hash);

    // Compare hashed flag to stored hash
    if (hashHex === challenge.flag_hash) {
        handleCorrectFlag(challenge);
    } else {
        handleIncorrectFlag();
    }
}

// Handle correct flag submission
function handleCorrectFlag(challenge) {
    // Mark challenge as completed
    challenge.completed = true;

    // Unlock next challenge
    const nextChallenge = currentChallenges.find(c => c.id === challenge.id + 1);
    if (nextChallenge) {
        nextChallenge.unlocked = true;
    }

    // Show success feedback
    showFeedback('🎉 Correct! Challenge completed!', 'success');

    // Play victory audio
    playVictoryAudio(challenge);

    // Show success effects
    showSuccessEffects();

    // Enable download button
    downloadBtn.disabled = false;
    downloadBtn.innerHTML = '📁 Download Challenge';

    // Update UI
    renderChallenges();
    updateProgress();
    saveProgress();

    // Close modal after delay
    setTimeout(() => {
        hideModal();
    }, 2000);
}

// Handle incorrect flag submission
function handleIncorrectFlag() {
    showFeedback('❌ Incorrect flag. Try again!', 'error');
    flagInput.value = '';
    flagInput.focus();

    // Add shake animation to input
    flagInput.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        flagInput.style.animation = '';
    }, 500);
}

// Show feedback message
function showFeedback(message, type) {
    feedbackMessage.textContent = message;
    feedbackMessage.className = `feedback-message feedback-${type}`;
}

// Play victory audio
function playVictoryAudio(challenge) {
    if (isMuted) return;

    // Each challenge already has an audioFile property like: "audio/voice1.mp3"
    const audioPath = challenge.audioFile;
    console.log(audioPath);

    // Stop any currently playing victory audio (optional but recommended)
    if (window.currentVictoryAudio) {
        window.currentVictoryAudio.pause();
        window.currentVictoryAudio.currentTime = 0;
    }

    // Create a new Audio object and play it
    const audio = new Audio(audioPath);
    audio.volume = currentVolume;  // Use your existing volume variable (0–1)
    audio.play().catch(err => {
        console.error("Audio playback failed:", err);
    });

    // Save reference so we can stop it next time if needed
    window.currentVictoryAudio = audio;

    // Optional: also play a short beep overlay if you still want it
    playBeepSound();
}

// Play beep sound using Web Audio API
function playBeepSound() {
    if (isMuted) return;

    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(currentVolume * 0.3, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
        console.log('Audio not supported:', error);
    }
}

// Show success effects
function showSuccessEffects() {
    successEffects.classList.add('active');
    setTimeout(() => {
        successEffects.classList.remove('active');
    }, 1000);
}

// Handle file download
function handleDownload() {

    if (!currentChallengeId) return;

    const challenge = challengesData.find(c => c.id === currentChallengeId);

    const link = document.createElement("a");
    link.href = 'https://github.com/CSeCIITB/haxxorshere/raw/master/' + challenge.zipFile;  // e.g. "challenge1.zip"
    link.download = challenge.zipFile.split('/').pop();  // Use file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Update progress display
function updateProgress() {
    const completedChallenges = currentChallenges.filter(c => c.completed).length;
    const totalChallenges = currentChallenges.length;
    const progressPercentage = (completedChallenges / totalChallenges) * 100;

    progressFill.style.width = `${progressPercentage}%`;
    progressText.textContent = `Progress: ${completedChallenges}/${totalChallenges} Challenges Completed`;
}

// Save progress to localStorage
function saveProgress() {
    localStorage.setItem('challengeProgress', JSON.stringify(currentChallenges));
}

// Load progress from localStorage
function loadProgress() {
    const saved = localStorage.getItem('challengeProgress');
    if (saved) {
        currentChallenges = JSON.parse(saved);
        renderChallenges();
        updateProgress();
    }
}

// Toggle mute
function toggleMute() {
    isMuted = !isMuted;
    muteBtn.innerHTML = isMuted ? '🔇 Audio Off' : '🔊 Audio On';
    muteBtn.classList.toggle('muted', isMuted);
}

// Update volume
function updateVolume() {
    currentVolume = volumeSlider.value / 100;
}

// Typing animation effect
function typeText(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Create matrix rain effect
function createMatrixRain() {
    const matrixRain = document.getElementById('matrixRain');
    const characters = '01';

    function createDrop() {
        const drop = document.createElement('div');
        drop.style.position = 'absolute';
        drop.style.color = '#00ff41';
        drop.style.fontSize = '14px';
        drop.style.fontFamily = 'monospace';
        drop.style.opacity = '0.3';
        drop.style.left = Math.random() * 100 + '%';
        drop.style.animationDuration = (Math.random() * 3 + 2) + 's';
        drop.style.animationName = 'fall';
        drop.textContent = characters.charAt(Math.floor(Math.random() * characters.length));

        matrixRain.appendChild(drop);

        setTimeout(() => {
            drop.remove();
        }, 5000);
    }

    // Create falling characters
    setInterval(createDrop, 100);
}

// Add CSS for falling animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        0% { top: -20px; opacity: 1; }
        100% { top: 100vh; opacity: 0; }
    }
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    .muted {
        opacity: 0.6;
    }
`;
document.head.appendChild(style);
