var all_arrow = false;
var left_arrow = false;
var right_arrow = false;

document.addEventListener('keyup', function (event) {
    if (event.keyCode === 81) {
        if (left_arrow == false) {
            var arrow = document.getElementById("left-arrow");
            arrow.style = "animation: arrow 0.6s infinite;"
            document.getElementById("right-arrow").style = "animation: 0; animation-delay: 0;"
            left_arrow = true;
            right_arrow = false;
        }
        else if (left_arrow == true) {
            var arrow = document.getElementById("left-arrow");
            arrow.style = "animation: 0; animation-delay: 0;"
            document.getElementById("right-arrow").style = "animation: 0; animation-delay: 0;"
            left_arrow = false;
            right_arrow = false;
        }
    }
});

document.addEventListener('keyup', function (event) {
    if (event.keyCode === 69) {
        if (right_arrow == false) {
            var arrow = document.getElementById("right-arrow");
            arrow.style = "animation: arrow 0.6s infinite;"
            document.getElementById("left-arrow").style = "animation: 0; animation-delay: 0;"
            right_arrow = true;
            left_arrow = false;
        }
        else if (right_arrow == true) {
            var arrow = document.getElementById("right-arrow");
            arrow.style = "animation: 0; animation-delay: 0;"
            document.getElementById("left-arrow").style = "animation: 0; animation-delay: 0;"
            right_arrow = false;
            left_arrow = false;
        }
    }
});

cef.on("modern:speed:arrow", (type) => {
    if (type == 0) {
        document.getElementById("left-arrow").style = "animation: 0; animation-delay: 0;"
        document.getElementById("right-arrow").style = "animation: 0; animation-delay: 0;"
    }
    if (type == 1) {
        document.getElementById("left-arrow").style = "animation: arrow 0.6s infinite;"
        document.getElementById("right-arrow").style = "animation: arrow 0.6s infinite;"
    }
});

cef.on("modern:speed:update", (odometer_val, gas_val) => {
    // Обновляем пробег
    document.getElementById('speed-odometer').innerHTML = Math.round(odometer_val);
    
    // Обновляем бензин (сохраняя иконку)
    document.getElementById('speed-fuel').innerHTML = `
        <svg class="fuel-icon" width="11" height="20" viewBox="0 0 17 20" fill="none">
            <path d="M0 0H3C3.28 0 3.53 0.115789 3.71 0.305263L5.79 2.50526L6.59 1.67368C7 1.26316 7.5 1.05263 8 1.05263H14C14.5 1.05263 15 1.26316 15.41 1.67368L17 3.33684V16.3263C17 18.3579 15.36 20 13.33 20H3.67C1.64 20 0 18.3579 0 16.3263V0ZM2 2V16.3263C2 17.2526 2.75 18 3.67 18H13.33C14.25 18 15 17.2526 15 16.3263V5L13.59 3.58947C13.43 3.43158 13.22 3.33684 13 3.33684H8.41L7.2 4.58947C6.83 4.96842 6.32 5.18947 5.79 5.18947L3 2.24211V2H2Z" fill="white"/>
        </svg> 
        ${Math.round(gas_val)} л.`;
});

cef.on('hud:update:playerinfo', (playername, playerid) => {
    // Находим элемент ника и вставляем значение
    if(document.getElementById('s1')) {
        document.getElementById('s1').innerText = `${playername}`;
    }
    // Находим элемент ID и вставляем значение
    if(document.getElementById('s2')) {
        document.getElementById('s2').innerText = `${playerid}`;
    }
});