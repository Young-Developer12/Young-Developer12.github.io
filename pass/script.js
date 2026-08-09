// ============================================================
// script.js — Паспорт (CEF)
// ============================================================

// ----- 1. ЗАКРЫТИЕ ПО КЛИКУ НА КРЕСТИК -----
document.getElementById('close-btn').addEventListener('click', function() {
    closePassport();
});

// ----- 2. ЗАКРЫТИЕ ПО ALT -----
document.addEventListener('keydown', function(event) {
    if (event.key === 'Alt') {
        event.preventDefault();
        closePassport();
    }
});

// ----- 3. ФУНКЦИЯ ЗАКРЫТИЯ -----
function closePassport() {
    document.getElementById('passport').classList.remove('visible');
    if (typeof cef !== 'undefined') {
        cef.emit('passport:close');
    }
}

// ----- 4. ПРИЁМ ДАННЫХ ОТ СЕРВЕРА -----
if (typeof cef !== 'undefined') {
    cef.on('interface:set:showPassport', function(surname, name, otchestvo, sex, birth, id) {
        document.getElementById('pSurname').innerText = surname || '—';
        document.getElementById('pRusname').innerText = name || '—';
        document.getElementById('pOtchestvo').innerText = otchestvo || '—';
        document.getElementById('pSex').innerText = sex || '—';
        document.getElementById('pBirth').innerText = birth || '—';
        document.getElementById('pId').innerText = id || '—';

        // Показываем паспорт
        document.getElementById('passport').classList.add('visible');
    });

    console.log('[PASSPORT] CEF подключён');
}

// ----- 5. ЗАГЛУШКА ДЛЯ ТЕСТА В БРАУЗЕРЕ (если нет CEF) -----
if (typeof cef === 'undefined') {
    console.log('[PASSPORT] Тестовый режим');
    setTimeout(function() {
        document.getElementById('pSurname').innerText = 'Иванов';
        document.getElementById('pRusname').innerText = 'Иван';
        document.getElementById('pOtchestvo').innerText = 'Иванович';
        document.getElementById('pSex').innerText = 'м.';
        document.getElementById('pBirth').innerText = '12.05.1999';
        document.getElementById('pId').innerText = '123456';
        document.getElementById('passport').classList.add('visible');
    }, 1000);
}

console.log('[PASSPORT] Готово!');
