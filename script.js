// ========== COUNTDOWN TIMER ==========
function updateCountdown() {
    const weddingDate = new Date('August 29, 2026 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
}

// Запускаем таймер
setInterval(updateCountdown, 1000);
updateCountdown();

// ========== FORM SUBMISSION ==========
document.querySelector('.rsvp-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Спасибо за ваш ответ! Мы получили вашу анкету.');
    this.reset();
});