// Oyun durumu
let currentStage = 1;
const totalStages = 4;
let currentClicks = 0;
const clicksPerStage = 5;

// Top puanları
const ballScores = {
    'ball-white': 100,
    'ball-blue': 2500,
    'ball-red': 10000,
    'ball-yellow': 50000
};

// DOM elements
const gameBox = document.getElementById('game-box');
const currentStageElement = document.getElementById('current-stage');
const notificationModal = document.getElementById('notification-modal');
const okBtn = document.getElementById('ok-btn');
const ballMessage = document.getElementById('ball-message');
const scoreEarned = document.getElementById('score-earned');

// Evre değiştirme fonksiyonu
function changeStage(newStage) {
    if (newStage < 1 || newStage > totalStages) return;
    
    currentStage = newStage;
    currentClicks = 0;
    
    // Kutu sınıfını güncelle
    gameBox.className = `game-box stage-${currentStage}`;
    
    // Evre göstergesini güncelle
    currentStageElement.textContent = currentStage;
    
    // 4. evreye ulaşıldığında bildirim göster
    if (currentStage === totalStages) {
        setTimeout(() => {
            showNotification();
        }, 500);
    }
}

// Tıklama efekti fonksiyonu
function clickEffect() {
    // Kutuya tıklama animasyonu ekle
    gameBox.style.transform = 'scale(0.9)';
    setTimeout(() => {
        gameBox.style.transform = '';
    }, 150);
}

// Kutuya tıklama fonksiyonu
function handleBoxClick() {
    // Tıklama sayısını artır
    currentClicks++;
    
    // Tıklama efekti
    clickEffect();
    
    // Tıklama sayısını güncelle
    updateClickCounter();
    
    // 5 tıklamaya ulaşıldıysa sonraki evreye geç
    if (currentClicks >= clicksPerStage) {
        if (currentStage < totalStages) {
            setTimeout(() => {
                changeStage(currentStage + 1);
            }, 200);
        }
    }
}

// Tıklama sayacını güncelle (gizli)
function updateClickCounter() {
    // Tıklama sayacı artık görünmüyor
}

// Rastgele top seçme fonksiyonu
function getRandomBall() {
    const random = Math.random() * 100; // 0-100 arası rastgele sayı
    
    if (random <= 90) {
        return 'ball-white'; // %90 oran - Beyaz
    } else if (random <= 97) {
        return 'ball-blue';  // %7 oran - Mavi
    } else if (random <= 99.5) {
        return 'ball-red';   // %2.5 oran - Kırmızı
    } else {
        return 'ball-yellow'; // %0.5 oran - Sarı
    }
}

// Get ball messages
function getBallMessage(ballClass) {
    const messages = {
        'ball-white': 'You won a white ball!',
        'ball-blue': 'You won a blue ball!',
        'ball-red': 'You won a red ball!',
        'ball-yellow': 'You won a yellow ball!'
    };
    return messages[ballClass] || 'You won a ball!';
}

// Show one-time points
function showEarnedPoints(points) {
    // This function only shows one-time points
    // Total score is not tracked
}

// Show notification function
function showNotification() {
    notificationModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Select and show random ball
    const randomBall = document.getElementById('random-ball');
    const ballClass = getRandomBall();
    const points = ballScores[ballClass];
    
    // Clear previous classes
    randomBall.className = 'random-ball';
    // Add new class
    randomBall.classList.add(ballClass);
    
    // Update message
    ballMessage.textContent = getBallMessage(ballClass);
    
    // Show one-time points
    scoreEarned.textContent = `+${points.toLocaleString()} points!`;
    scoreEarned.className = `score-earned score-${ballClass.replace('ball-', '')}`;
}

// Hide notification function
function hideNotification() {
    notificationModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Reset game function
function resetGame() {
    changeStage(1);
}

// Event listeners
okBtn.addEventListener('click', () => {
    hideNotification();
    resetGame();
});

// Close modal when clicking outside
notificationModal.addEventListener('click', (e) => {
    if (e.target === notificationModal) {
        hideNotification();
        resetGame();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowRight':
        case ' ':
            e.preventDefault();
            handleBoxClick();
            break;
        case 'Escape':
            if (notificationModal.style.display === 'block') {
                hideNotification();
                resetGame();
            }
            break;
    }
});

// Handle box click
gameBox.addEventListener('click', handleBoxClick);

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    changeStage(1);
    
    // Welcome message
    console.log('🎮 4 Stage Game started!');
    console.log('📱 Controls:');
    console.log('   - Click box: Advance stage');
    console.log('   - ESC: Close notification');
    console.log('   - 5 clicks required per stage (hidden)');
}); 