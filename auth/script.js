// ===== ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК =====
document.querySelectorAll('.auth-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.auth-tab').forEach(function(t) {
            t.classList.remove('active');
        });
        this.classList.add('active');

        document.querySelectorAll('.auth-tab-content').forEach(function(content) {
            content.classList.remove('active');
        });
        var tabId = this.getAttribute('data-tab');
        document.getElementById('auth-' + tabId).classList.add('active');
    });
});

// ===== ПОКАЗ ОШИБКИ =====
function showError(id, message) {
    document.getElementById(id).innerText = message;
    setTimeout(function() {
        document.getElementById(id).innerText = '';
    }, 5000);
}

// ===== ВХОД =====
document.getElementById('login-btn').addEventListener('click', function() {
    var username = document.getElementById('login-username').value.trim();
    var password = document.getElementById('login-password').value.trim();

    if (!username || !password) {
        showError('login-error', 'Заполните все поля!');
        return;
    }
    if (password.length < 4 || password.length > 16) {
        showError('login-error', 'Пароль должен быть от 4 до 16 символов!');
        return;
    }

    if (typeof cef !== 'undefined') {
        cef.emit('auth:login', username, password);
    } else {
        console.log('[AUTH] Вход:', username, password);
        showError('login-error', 'Тестовый режим. В игре данные отправятся на сервер.');
    }
});

// ===== РЕГИСТРАЦИЯ =====
document.getElementById('register-btn').addEventListener('click', function() {
    var username = document.getElementById('reg-username').value.trim();
    var password = document.getElementById('reg-password').value.trim();
    var passwordConfirm = document.getElementById('reg-password-confirm').value.trim();
    var email = document.getElementById('reg-email').value.trim();

    if (!username || !password || !passwordConfirm || !email) {
        showError('register-error', 'Заполните все поля!');
        return;
    }
    if (password.length < 4 || password.length > 16) {
        showError('register-error', 'Пароль должен быть от 4 до 16 символов!');
        return;
    }
    if (password !== passwordConfirm) {
        showError('register-error', 'Пароли не совпадают!');
        return;
    }
    if (!email.includes('@') || email.length < 5) {
        showError('register-error', 'Введите корректный email!');
        return;
    }

    if (typeof cef !== 'undefined') {
        cef.emit('auth:register', username, password, email);
    } else {
        console.log('[AUTH] Регистрация:', username, password, email);
        showError('register-error', 'Тестовый режим. В игре данные отправятся на сервер.');
    }
});

// ===== ВЫБОР СКИНА =====
let selectedSkin = 0;

function loadSkins() {
    const grid = document.getElementById('skin-options');
    grid.innerHTML = '';

    // ТОЛЬКО ВАШИ 6 СКИНОВ
    const skinIds = [1, 2, 3, 4, 7, 24];

    skinIds.forEach(function(id) {
        const card = document.createElement('div');
        card.className = 'skin-card';
        card.dataset.skin = id;

        const img = document.createElement('img');
        img.src = `../pass/images/skins/${id}.png`;
        img.alt = `Скин ${id}`;
        img.onerror = function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTUwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iIzIyMjIyMiIvPjx0ZXh0IHg9IjUwIiB5PSI3NSIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+U2tpbiA8L3RleHQ+PC9zdmc+';
            console.warn('Картинка не найдена:', `../pass/images/skins/${id}.png`);
        };

        const label = document.createElement('div');
        label.className = 'skin-id';
        label.innerText = `#${id}`;

        card.appendChild(img);
        card.appendChild(label);

        card.addEventListener('click', function() {
            document.querySelectorAll('.skin-card').forEach(function(c) {
                c.classList.remove('active');
            });
            this.classList.add('active');
            selectedSkin = parseInt(this.dataset.skin);
        });

        grid.appendChild(card);
    });

    console.log('[SKIN] Загружено 6 скинов');
}

// ===== СОХРАНЕНИЕ СКИНА =====
document.getElementById('save-skin').addEventListener('click', function() {
    if (selectedSkin === 0) {
        showError('skin-error', 'Выберите скин!');
        return;
    }

    if (typeof cef !== 'undefined') {
        cef.emit('skin:save', selectedSkin);
    } else {
        console.log('[SKIN] Выбран скин:', selectedSkin);
        showError('skin-error', 'Тестовый режим. Скин сохранён!');
    }
});

// ===== ЗАГЛУШКА ДЛЯ ТЕСТА =====
if (typeof cef === 'undefined') {
    console.log('[AUTH] Тестовый режим');
    setTimeout(function() {
        document.getElementById('auth-container').classList.add('visible');
    }, 500);
}

// ===== ПРИЁМ ОТКРЫТИЯ ОТ СЕРВЕРА =====
if (typeof cef !== 'undefined') {
    cef.on('auth:open', function() {
        document.getElementById('auth-container').classList.add('visible');
    });
    cef.on('auth:close', function() {
        document.getElementById('auth-container').classList.remove('visible');
    });

    // Открыть выбор скина после регистрации
    cef.on('auth:showSkinSelection', function() {
        document.getElementById('skin-selection').style.display = 'block';
        loadSkins();
    });

    console.log('[AUTH] CEF подключён');
}
