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

// Evre değiştirme fonksiyonu
function changeStage(newStage) {
    if (newStage < 1 || newStage > totalStages) return;
    
    currentStage = newStage;
    currentClicks = 0;
    
    // Kutu sınıfını güncelle
    gameBox.className = `game-box stage-${currentStage}`;
    
    // Evre göstergesini güncelle (gizli element)
    if (currentStageElement) {
        currentStageElement.textContent = currentStage;
    }
    
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

// Yumruk efekti fonksiyonu
function createPunchEffect(event) {
    const punchEffect = document.createElement('div');
    punchEffect.className = 'punch-effect';
    
    // Mouse pozisyonunu al
    const rect = gameBox.getBoundingClientRect();
    const x = event.clientX - rect.left - 120; // 120 = efekt genişliğinin yarısı (240/2)
    const y = event.clientY - rect.top - 120;  // 120 = efekt yüksekliğinin yarısı (240/2)
    
    // Efekti konumlandır
    punchEffect.style.left = x + 'px';
    punchEffect.style.top = y + 'px';
    
    // Efekti kutuya ekle
    gameBox.appendChild(punchEffect);
    
    // Animasyon bitince efekti kaldır
    setTimeout(() => {
        if (punchEffect.parentNode) {
            punchEffect.parentNode.removeChild(punchEffect);
        }
    }, 600);
}

// Kutuya tıklama fonksiyonu
function handleBoxClick(event) {
    // Tıklama sayısını artır
    currentClicks++;
    
    // Tıklama efekti
    clickEffect();
    
    // Yumruk efekti oluştur
    createPunchEffect(event);
    
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
    
    if (random <= 40) {
        return 'ball-white'; // %90 oran - Beyaz
    } else if (random <= 70) {
        return 'ball-blue';  // %7 oran - Mavi
    } else if (random <= 85) {
        return 'ball-red';   // %2.5 oran - Kırmızı
    } else {
        return 'ball-yellow'; // %0.5 oran - Sarı
    }
}



// Show notification function
function showNotification() {
    notificationModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Select and show random ball
    const ballImage = document.getElementById('ball-image');
    const ballClass = getRandomBall();
    
    // Set ball image based on type
    const ballImages = {
        'ball-white': 'ball_notif/whiteball.png',
        'ball-blue': 'ball_notif/blueball.png',
        'ball-red': 'ball_notif/redball.png',
        'ball-yellow': 'ball_notif/goldenball.png'
    };
    
    ballImage.src = ballImages[ballClass];
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
            // Klavye için sahte event oluştur
            const fakeEvent = {
                clientX: gameBox.offsetLeft + gameBox.offsetWidth / 2,
                clientY: gameBox.offsetTop + gameBox.offsetHeight / 2
            };
            handleBoxClick(fakeEvent);
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
}); 