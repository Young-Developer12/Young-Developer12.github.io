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

// ===== ФУНКЦИЯ ПОКАЗА ОШИБКИ =====
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

// ===== ЗАГЛУШКА ДЛЯ ТЕСТА В БРАУЗЕРЕ =====
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
    console.log('[AUTH] CEF подключён');
}
