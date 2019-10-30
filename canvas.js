const canvas = document.getElementById('practice');
const ctx = canvas.getContext('2d');

const LEVEL = {
    zero: 0,
    low: 1,
    medium: 2,
    high: 3,
};

let CURRENT_LEVEL = LEVEL.zero;

const ZERO_COLOR = '#D3D3D3';
const LOW_COLOR = '#FF0000';
const MEDIUM_COLOR = '#FFA500';
const HIGH_COLOR = '#00FF00';

const LOW_ANGLE = 120;
const MEDIUM_ANGLE = 240;
const HIGH_ANGLE = 360;

// применяем трансформации
ctx.translate(500, 250);
ctx.rotate(-Math.PI/2);
ctx.lineWidth = 70;
ctx.lineCap = 'round';


// вспомогательные функции
function drawArc(endAngle) {
    ctx.beginPath();
    ctx.arc(0, 0, 200, 0, endAngle, false);
    ctx.stroke();
}

function drawInitCircle() {
    ctx.strokeStyle = ZERO_COLOR;
    drawArc(2*Math.PI);
}

function getColor(angle) {
    switch (true) {
        case angle === 0:
            return ZERO_COLOR;
        case (LOW_ANGLE + 1) - angle > 0:
            return LOW_COLOR;
        case (MEDIUM_ANGLE + 1) - angle > 0:
            return MEDIUM_COLOR;
        case (HIGH_ANGLE + 1) - angle > 0:
            return HIGH_COLOR;
    }
}



let startAngle; // стартовый угол, откуда начинаем рисовать
let sectors; // количество "секторов", которые нам нужно закрасить в процессе анимации
let direction; // направление анимации

let i = 1;
function animate(now) {
    console.log(now); // now — значение performance.now() — время отрисовки кадра. В ваших анимациях вы должны
    // высчитывать интервал между кадрами и в зависимости от этого интервала вычислять, как должен измениться следующий
    // кадр, чтобы анимация была плавной
    if (i <= sectors) {
        drawInitCircle();
        const endAngle = direction > 0 ? startAngle + i*10 : startAngle - i*10;
        ctx.strokeStyle = getColor(endAngle);
        drawArc((Math.PI/180) * endAngle);
        i = i + 1;

        window.requestAnimationFrame(animate);
        return;
    }
    i = 1;
}

for (let [key, level] of Object.entries(LEVEL)) {
    document.getElementById(key).addEventListener('click', () => {
        if (level !== CURRENT_LEVEL) {
            startAngle = 120 * CURRENT_LEVEL;
            sectors = 12 * Math.abs(CURRENT_LEVEL - level);
            direction = level - CURRENT_LEVEL;
            CURRENT_LEVEL = level;

            animate(performance.now());
        }
    });
}

drawInitCircle();
