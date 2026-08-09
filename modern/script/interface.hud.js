// ============================================================
// hud.js — логика HUD
// ============================================================

// ----- 1. ФОРМАТИРОВАНИЕ ДЕНЕГ -----
function formatt(i) {
    var text_fmt = String(i);
    var text_tmp = text_fmt;
    var text_len = text_fmt.length;
    var dots_count = 0;

    for (var idx = 0; idx < (text_len - 1); idx++) {
        if (text_tmp[idx] == '.') continue;
        if (((text_len - (idx + 1)) % 3) == 0) {
            dots_count++;
            text_tmp = text_tmp.slice(0, idx + dots_count) + '.' + text_tmp.slice(idx + dots_count);
        }
    }
    return text_tmp;
}

// ----- 2. ТАЙМЕР ВРЕМЕНИ (реальное) -----
setInterval(function() {
    var d = new Date();
    document.getElementById('time').innerText = 
        String(d.getHours()).padStart(2,'0') + ':' +
        String(d.getMinutes()).padStart(2,'0') + ':' +
        String(d.getSeconds()).padStart(2,'0');
    document.getElementById('date').innerText = 
        String(d.getDate()).padStart(2,'0') + '.' +
        String(d.getMonth()+1).padStart(2,'0') + '.' +
        String(d.getFullYear()).slice(2);
}, 1000);

// ----- 3. ПОВОРОТНИКИ (Q / E) -----
var leftArrow = false;
var rightArrow = false;

document.addEventListener('keyup', function(event) {
    if (event.keyCode === 81) { // Q
        var left = document.getElementById('left-arrow');
        var right = document.getElementById('right-arrow');
        if (!leftArrow) {
            left.className = 'left-arrow-anim active';
            right.className = 'right-arrow-anim';
            leftArrow = true;
            rightArrow = false;
        } else {
            left.className = 'left-arrow-anim';
            right.className = 'right-arrow-anim';
            leftArrow = false;
            rightArrow = false;
        }
    }
    if (event.keyCode === 69) { // E
        var left = document.getElementById('left-arrow');
        var right = document.getElementById('right-arrow');
        if (!rightArrow) {
            right.className = 'right-arrow-anim active';
            left.className = 'left-arrow-anim';
            rightArrow = true;
            leftArrow = false;
        } else {
            right.className = 'right-arrow-anim';
            left.className = 'left-arrow-anim';
            rightArrow = false;
            leftArrow = false;
        }
    }
});

// ----- 4. ПРИЁМ ДАННЫХ ОТ СЕРВЕРА (CEF) -----
if (typeof cef !== 'undefined') {

    // Запрос данных (как в вашем примере)
    cef.emit("game:hud:setComponentVisible", "interface", false);
    cef.emit("game:data:pollPlayerStats", true, 50);

    // ВАШЕ ГЛАВНОЕ СОБЫТИЕ
    cef.on("game:data:playerStats", function(hp, max_hp, arm, breath, wanted, weapon, ammo, max_ammo, money, speed) {
        // Здоровье
        document.getElementById('b1').innerHTML = Math.round(hp);
        
        // Броня
        document.getElementById('b3').innerHTML = Math.round(arm);

        // Деньги (с вашей функцией форматирования)
        document.getElementById('s3').innerHTML = 
            `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:23px;height:23px;margin-top:-5px;margin-right:8px;">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="#FFD700"/>
                <text x="12" y="16" font-size="10" font-weight="700" fill="#333" text-anchor="middle">$</text>
            </svg> ${formatt(money)}`;

        // Оружие
        var weaponID = weapon;
        var weaponAmmo = '';
        if (weaponID !== '0') {
            weaponAmmo = `${ammo}/${(max_ammo - ammo)}`;
        }
        document.getElementById('weapon_id').src = `icon/weapon/gun_${weaponID}.png`;
        document.getElementById('weapon_ammo').innerHTML = weaponAmmo;

        // Спидометр (если есть элементы)
        var speed_count = Math.round(speed * 1.4);
        if (document.getElementById("speed-count")) {
            document.getElementById("speed-count").innerHTML = speed_count;
        }
        if (document.getElementById("speed-meter")) {
            var meter_count = 838 + (speed * 3.77);
            document.getElementById("speed-meter").style = `stroke-dasharray: 838; stroke-dashoffset: -${meter_count};`;
        }
    });

    // ----- ДОПОЛНИТЕЛЬНЫЕ СОБЫТИЯ -----
    // Обновление ника и ID
    cef.on('hud:update:playerinfo', function(playername, playerid) {
        document.getElementById('player').innerText = playername || 'Player';
        document.getElementById('playerid').innerText = playerid || '0';
    });

    // Обновление локации
    cef.on('hud:update:location', function(city, street) {
        document.getElementById('city').innerText = city || 'г.Арзамас';
        document.getElementById('street').innerText = street || 'ул.Пушкина 52';
    });

    console.log('[HUD] Все CEF события подключены!');
}

// ----- 5. F7 — ВКЛ/ВЫКЛ HUD -----
document.addEventListener('keydown', function(event) {
    if (event.key === 'F7') {
        var hud = document.getElementById('hud');
        hud.style.display = hud.style.display === 'none' ? 'block' : 'none';
        if (typeof cef !== 'undefined') {
            cef.emit('hud:toggle', hud.style.display === 'block');
        }
    }
});

console.log('[HUD] Ready! Press F7 to toggle.');
