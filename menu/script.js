// ===== ЗАКРЫТИЕ =====
document.getElementById('close-btn').addEventListener('click', closeMenu);
document.addEventListener('keydown', function(e) {
    if (e.key === 'Alt' || e.key === 'Escape') {
        e.preventDefault();
        closeMenu();
    }
});

function closeMenu() {
    document.getElementById('menu-container').classList.remove('visible');
    if (typeof cef !== 'undefined') {
        cef.emit('menu:close');
    }
}

// ===== ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК =====
document.querySelectorAll('.tab-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        // Убираем активный класс у всех вкладок
        document.querySelectorAll('.tab-btn').forEach(function(b) {
            b.classList.remove('active');
        });
        // Добавляем активный класс нажатой вкладке
        this.classList.add('active');

        // Скрываем все табы
        document.querySelectorAll('.tab-content').forEach(function(content) {
            content.classList.remove('active');
        });
        // Показываем нужный таб
        var tabId = this.getAttribute('data-tab');
        document.getElementById('tab-' + tabId).classList.add('active');
    });
});

// ===== ВЫБОР ПУНКТА МЕНЮ =====
document.querySelectorAll('.menu-item').forEach(function(item) {
    item.addEventListener('click', function() {
        var id = this.getAttribute('data-id');
        if (typeof cef !== 'undefined') {
            cef.emit('menu:select', id);
        }
        closeMenu();
    });
});

// ===== ЗАГЛУШКА ДЛЯ ТЕСТА В БРАУЗЕРЕ =====
if (typeof cef === 'undefined') {
    console.log('[MENU] Тестовый режим');
    setTimeout(function() {
        document.getElementById('menu-container').classList.add('visible');
    }, 500);

    document.querySelectorAll('.menu-item').forEach(function(item) {
        item.addEventListener('click', function() {
            console.log('Выбран пункт:', this.getAttribute('data-id'));
        });
    });
}

// ===== ПРИЁМ ОТКРЫТИЯ ОТ СЕРВЕРА =====
if (typeof cef !== 'undefined') {
    cef.on('menu:open', function() {
        document.getElementById('menu-container').classList.add('visible');
    });
    console.log('[MENU] CEF подключён');
}
