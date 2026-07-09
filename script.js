// ========== НАСТРОЙКИ ==========
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyRhdv6ec8PdL5UynK3S4dsoOUGeY2_rRnu8Uzg1dBhO5TdbUXNbi4AFyRdxyHbEK8x0w/exec';

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

setInterval(updateCountdown, 1000);
updateCountdown();

// ========== ОТПРАВКА ФОРМЫ ==========
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('rsvpForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Блокируем кнопку на время отправки
            submitBtn.disabled = true;
            submitBtn.textContent = 'ОТПРАВКА...';
            submitBtn.style.opacity = '0.7';
            
            // Собираем данные
            const name = form.querySelector('#name').value.trim();
            const attendance = form.querySelector('input[name="attendance"]:checked')?.value || '';
			const transfer = form.querySelector('input[name="transfer"]:checked')?.value || '';
            
            // Собираем все выбранные напитки
            const drinkCheckboxes = form.querySelectorAll('input[name="drink"]:checked');
            const drinks = Array.from(drinkCheckboxes).map(cb => {
                // Находим текст рядом с чекбоксом
                const label = cb.closest('.checkbox-label');
                return label ? label.textContent.trim() : cb.value;
            }).join(', ');
                        
            // Формируем объект для отправки
            const formData = {
                name: name,
                attendance: attendance,
                drinks: drinks,
				transfer: transfer
            };
            
            // Отправляем в Google Apps Script
            fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                },
                body: JSON.stringify(formData)
            })
            .then(() => {
                // Успешная отправка
                showSuccessMessage(form, submitBtn, originalText);
            })
            .catch(error => {
                console.error('Ошибка:', error);
                showErrorMessage(submitBtn, originalText);
            });
        });
    }
});

// ========== СООБЩЕНИЕ ОБ УСПЕХЕ ==========
function showSuccessMessage(form, submitBtn, originalText) {
    submitBtn.textContent = '✓ ОТПРАВЛЕНО!';
    submitBtn.style.background = '#4CAF50';
    submitBtn.style.opacity = '1';
    
    // Создаём красивое сообщение
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.innerHTML = `
        <div style="
            background: #f0f9f0;
            border: 2px solid #4CAF50;
            border-radius: 10px;
            padding: 20px;
            margin-top: 20px;
            text-align: center;
            color: #2e7d32;
            font-size: 1.1rem;
            animation: fadeIn 0.5s ease;
        ">
            💌 Спасибо! Ваш ответ принят.<br>
            <span style="font-size: 0.95rem; color: #558b2f;">
                Мы получили вашу анкету и с нетерпением ждём встречи!
            </span>
        </div>
    `;
    
    form.appendChild(successMsg);
    
    // Очищаем форму через 2 секунды
    setTimeout(() => {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        submitBtn.style.background = '#d4af37';
        
        // Убираем сообщение через 5 секунд
        setTimeout(() => {
            successMsg.style.opacity = '0';
            setTimeout(() => successMsg.remove(), 500);
        }, 5000);
    }, 2000);
}

// ========== СООБЩЕНИЕ ОБ ОШИБКЕ ==========
function showErrorMessage(submitBtn, originalText) {
    submitBtn.disabled = false;
    submitBtn.textContent = '❌ ОШИБКА. ПОПРОБУЙТЕ СНОВА';
    submitBtn.style.background = '#e53935';
    submitBtn.style.opacity = '1';
    
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '#d4af37';
    }, 3000);
}
