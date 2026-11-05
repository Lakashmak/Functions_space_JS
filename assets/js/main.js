import Complex from './Complex.js';
import Parser, { Operation } from './Parser.js';
import Keyboard from './Keyboard.js';


//ЭЛЕМЕНТЫ УПРАВЛЕНИЯ:

const pictureBox1 = document.getElementById('pictureBox1'); //главный элемент на котором отрисовываются графики функций
const info = document.getElementById('info'); //координаты в левом верхнем углу
const controls = document.getElementById('controls'); //кнопки масштабирования
const menu = document.getElementById('menu'); //выдвигаемое меню
const menuToolbar = document.getElementById('menuToolbar'); //кнопки скрыть и анимация в шапке меню
const stretchArea = document.getElementById('stretchArea'); //область перетаскивания для растягивания меню
const groupBox1 = document.getElementById('groupBox1'); //вкладка "Выражение" в меню
const groupBox2 = document.getElementById('groupBox2'); //вкладка "Положение" в меню
const groupBox3 = document.getElementById('groupBox3'); //вкладка "Настройки" в меню
const label1 = document.getElementById('label1'); //строка вывода расстояния до функции в точке в центре экрана на вкладке "Положение" в меню
const label2 = document.getElementById('label2'); //строка вывода координат в левом верхнем углу экрана
const richTextBox1 = document.getElementById('richTextBox1'); //текстовое поле ввода выражения
const textBox1 = document.getElementById('textBox1'); //поле ввода масштаба на вкладке "Положение" в меню
const textBox2 = document.getElementById('textBox2'); //поле ввода координаты x на вкладке "Положение" в меню
const textBox3 = document.getElementById('textBox3'); //поле ввода координаты y на вкладке "Положение" в меню
const textBox4 = document.getElementById('textBox4'); //поле ввода переменной t на вкладке "Положение" в меню
const button1 = document.getElementById('button1'); //кнопка "Анимация" в шапке меню
const button2 = document.getElementById('button2'); //кнопка "Обновить положение" на вкладке "Положение" в меню
const button3 = document.getElementById('button3'); //кнопка "Обновить выражение" на вкладке "Выражение" в меню
const button4 = document.getElementById('button4'); //кнопка "Меню" в левом нижнем углу экрана
const button5 = document.getElementById('button5'); //кнопка "Скрыть" в шапке меню
const button6 = document.getElementById('button6'); //кнопка "Анимация" в левом нижнем углу экрана
const button7 = document.getElementById('button7'); //кнопка "Выражение" в переключении вкладок в меню
const button8 = document.getElementById('button8'); //кнопка "Положение" в переключении вкладок в меню
const button9 = document.getElementById('button9'); //кнопка "Настройки" в переключении вкладок в меню
const button10 = document.getElementById('button10'); //кнопка "+" для масштабирования на правой стороне экрана
const button11 = document.getElementById('button11'); //кнопка "–" для масштабирования на правой стороне экрана
const button12 = document.getElementById('button12'); //кнопка "Вернуть положение по умолчанию" на вкладке "Положение" в меню
const checkBox1 = document.getElementById('checkBox1'); //настройка "Скрыть кнопки масштабирования"
const checkBox2 = document.getElementById('checkBox2'); //настройка "Скрыть отображение координат в левом верхнем углу"
const checkBox3 = document.getElementById('checkBox3'); //настройка "Скрыть кнопки в левом нижнем углу"
const checkBox4 = document.getElementById('checkBox4'); //настройка "Скрыть координатную сетку"
const keyboard1 = document.getElementById('keyboard1'); new Keyboard(richTextBox1, keyboard1);
const button13 = document.getElementById('button13');
const menuTabBtn = document.querySelectorAll('.menuTabBtn');
const richTextBox2 = document.getElementById('richTextBox2');
const textBox5 = document.getElementById('textBox5');
const keyboard2 = document.getElementById('keyboard2'); new Keyboard(richTextBox2, keyboard2);
const keyboardSlider = document.querySelectorAll('keyboardSlider');
const key2Buttons = keyboard2.querySelectorAll('.keyButton, .keyButtonsSpecial');
const label3 = document.getElementById('label3');
const checkBox5 = document.getElementById('checkBox5');
const textBox6 = document.getElementById('textBox6');
const button14 = document.getElementById('button14');
const button15 = document.getElementById('button15');
const textBox7 = document.getElementById('textBox7');
const button16 = document.getElementById('button16');
const button17 = document.getElementById('button17');
const textBox8 = document.getElementById('textBox8');
const button18 = document.getElementById('button18');
const button19 = document.getElementById('button19');


//СОБЫТИЯ:

window.addEventListener('resize', resizeCanvas);
pictureBox1.addEventListener('wheel', (e) => {MouseWheel(e);});
button2.addEventListener('click', () => {button2_Click();});
pictureBox1.addEventListener('mousedown', (e) => {pictureBox1_MouseDown(e);});
pictureBox1.addEventListener('mousemove', (e) => {pictureBox1_MouseMove(e);});
pictureBox1.addEventListener('mouseup', (e) => {pictureBox1_MouseUp(e);});
pictureBox1.addEventListener('mouseleave', (e) => {pictureBox1_MouseUp(e);});
button3.addEventListener('click', () => {button3_Click();});
button1.addEventListener('click', () => {button1_Click();});
pictureBox1.addEventListener('touchstart', (e) => {pictureBox1_TouchDown(e);});
pictureBox1.addEventListener('touchmove', (e) => {pictureBox1_TouchMove(e);});
pictureBox1.addEventListener('touchend', (e) => {pictureBox1_MouseUp(e);});
pictureBox1.addEventListener('touchcancel', (e) => {pictureBox1_MouseUp(e);});
button4.addEventListener('click', () => {button4_Click();});
button5.addEventListener('click', () => {button5_Click();});
button6.addEventListener('click', () => {button1_Click();}); //ссылка ну обработчик другой кнопки
button7.addEventListener('click', () => {button7_Click();});
button8.addEventListener('click', () => {button8_Click();});
button9.addEventListener('click', () => {button9_Click();});
stretchArea.addEventListener('mousedown', (e) => {menu_MouseDown(e);});
stretchArea.addEventListener('mousemove', (e) => {menu_MouseMove(e);});
stretchArea.addEventListener('mouseup', (e) => {menu_MouseUp(e);});
stretchArea.addEventListener('mouseleave', (e) => {menu_MouseUp(e);});
stretchArea.addEventListener('touchstart', (e) => {menu_TouchDown(e);});
stretchArea.addEventListener('touchmove', (e) => {menu_TouchMove(e);});
stretchArea.addEventListener('touchend', (e) => {menu_MouseUp(e);});
stretchArea.addEventListener('touchcancel', (e) => {menu_MouseUp(e);});
button10.addEventListener('click', () => {button10_Click();});
button11.addEventListener('click', () => {button11_Click();});
checkBox1.addEventListener('change', () => {checkBox1_Click();});
checkBox2.addEventListener('change', () => {checkBox2_Click();});
checkBox3.addEventListener('change', () => {checkBox3_Click();});
button12.addEventListener('click', () => {button12_Click();});
checkBox4.addEventListener('change', () => {checkBox4_Click();});
button13.addEventListener('click', () => {button13_Click();});
richTextBox2.addEventListener('input', () => {richTextBox2_TextChanged();});
key2Buttons.forEach(k2b => {k2b.addEventListener('click', () => {requestAnimationFrame(() => {richTextBox2_TextChanged();});});});
checkBox5.addEventListener('change', () => {checkBox5_Click();});
button14.addEventListener('click', () => {button14_Click();});
button15.addEventListener('click', () => {button15_Click();});
button16.addEventListener('click', () => {button16_Click();});
button17.addEventListener('click', () => {button17_Click();});
button18.addEventListener('click', () => {button18_Click();});
button19.addEventListener('click', () => {button19_Click();});


//ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ:

var gr; //графический отрисовщик
//var cRe = -1, cIm = 0;
//var Cmode = 1;
var m = 0; //размер отрисовывающегося пикселя
var Lx = 0, Ly = 0, Lx2 = 0, Ly2 = 0; //координаты нажатия на экран в предыдущем кадре
var dx = 0, dy = 0, dx2 = 0, dy2 = 0; //координаты нажатия на экран в новом кадре
var k = 51; //масштаб
//var sk = k;
var sx = 0, sy = 0; //координаты камеры в пространстве
//var ssx = 0; //var ssy = 0;
var x = 0, y = 0; //координаты текущего пикселя на экране в цикле отрисовки
//let dC = false;
//var sn = 2;
var t = 0, dt = 0.025; /*dt = 0.1;*/ //переменная времени для анамации и шага анимации;
var dist = "загрузка..."; //отображаемое значение расстояния до функции в точке по координатам в центре экрана
let animation = false; //запущена ли анимация
var buttontype = -1; //тип кнопки мыши
var parser; //var operations = []; //последовательность операций для вычисления
var parser2;
var fValue = ""; //ссылка на переменную результата расчёта последовательности операций
var fValue2 = "";
var timer1Interval = 1; //интервал таймера 
let touchWheel = false; //масштабирование пальцами
var c; //комплексное значение точки в пространстве вычесленное по координатам в текущий момент отрисовки
var Lm = 0; //координата нажатия на экран при изменении размера меню
let displayGrid = true; //отображение координатной сетки
var lastTime = 0;
var fps = 0;
let dm = 175;


//НАЧАЛЬНОЕ ОТОБРАЖЕНИЕ:

parser = new Parser();
parser2 = new Parser();
fValue = parser.Recognition(String(richTextBox1.value)); //console.log(operations);
fValue2 = parser2.Recognition(String(richTextBox2.value));
resizeCanvas();
gr = pictureBox1.getContext('2d');
gr.fillStyle = 'rgb(255, 127, 0)';
gr.clearRect(0, 0, pictureBox1.width, pictureBox1.height); //gr.clearRect(0, 0, 930, 900);
setInterval(timer1_Tick, timer1Interval);
//requestAnimationFrame(this.Draw.bind(this));


//ОБРАБОТЧИКИ ОСНОВНЫХ СОБЫТИЙ:

function resizeCanvas() { //масштаборование или поворот экрана
    pictureBox1.width = window.innerWidth;
    pictureBox1.height = window.innerHeight;
    if(menu.offsetHeight > window.innerHeight) menu.style.height = `${window.innerHeight}px`;
    gr = pictureBox1.getContext('2d');
    mReset();
    keyboardSlider.forEach(kbs => {kbs.style.height = `${((kbs.offsetWidth-10)/12*5)+25}px`;`${((kbs.offsetWidth-10)/12*5)+25}px`;}); 
}

function MouseWheel(e) { //вращение колёсиком мыши
    if (e.deltaY < 0) k *= 1.35;
    else k /= 1.35;
    textBox1.value = 255 / k;
    infoUpdate();
    mReset();
}

function button10_Click() { //нажатие на кнопку "+" 
	k *= 1.35;
	textBox1.value = 255 / k;
	infoUpdate();
	mReset();
}

function button11_Click() { //нажатие на кнопку "–" 
	k /= 1.35;
	textBox1.value = 255 / k;
	infoUpdate();
	mReset();
}

function button2_Click() { //нажатие на кнопку "Обновить положение"
    k = 255 / parseFloat(autocorrect(textBox1.value));
    sx = parseFloat(autocorrect(textBox2.value))
    sy = -parseFloat(autocorrect(textBox3.value));
    t = parseFloat(autocorrect(textBox4.value));
    textBox1.value = 255 / k;
    textBox2.value = sx;
    textBox3.value = -sy;
    textBox4.value = t;
    mReset();
    infoUpdate();
}

function pictureBox1_MouseDown(e) { //опускание кнопки мыши при нажатии на pictureBox1
    buttontype = e.button

    if (e.button === 0) { // Левая кнопка мыши
        const rect = e.target.getBoundingClientRect();
        Lx = e.clientX - rect.left; 
        Ly = e.clientY - rect.top; 
    }
    
    // if (e.button === 1) { // Средняя кнопка мыши
    //     // Переключение видимости кнопок и меток (можно адаптировать под ваши элементы)
    //     const buttonsAndlabelsIds = ['button1', 'button2', 'button3', 'label1', 'label2', 'label3', 'label4', 'label5', 'textBox1', 'textBox2', 'textBox3', 'textBox4', 'richTextBox1'];
    //     buttonsAndlabelsIds.forEach(id => {
    //         const element = document.getElementById(id);
    //         element.style.display = element.style.display === 'none' ? '' : 'none';
    //     });
    // }
} //pictureBox1_MouseDown

function pictureBox1_TouchDown(e) { //опускание пальца при нажатии на pictureBox1
    buttontype = 0;

    const rect = e.target.getBoundingClientRect();
    Lx = e.touches[0].clientX - rect.left; 
    Ly = e.touches[0].clientY - rect.top;

    if(e.touches.length > 1) {
        touchWheel = true;
        const rect = e.target.getBoundingClientRect();
        Lx2 = e.touches[1].clientX - rect.left; 
        Ly2 = e.touches[1].clientY - rect.top;
    }
    else touchWheel = false;
    
    // if (e.button === 1) { // Средняя кнопка мыши
    //     // Переключение видимости кнопок и меток (можно адаптировать под ваши элементы)
    //     const buttonsAndlabelsIds = ['button1', 'button2', 'button3', 'label1', 'label2', 'label3', 'label4', 'label5', 'textBox1', 'textBox2', 'textBox3', 'textBox4', 'richTextBox1'];
    //     buttonsAndlabelsIds.forEach(id => {
    //         const element = document.getElementById(id);
    //         element.style.display = element.style.display === 'none' ? '' : 'none';
    //     });
    // }
} //pictureBox1_TouchDown

function pictureBox1_MouseUp(e){ //поднятие кнопки мыши или пальца с pictureBox1
    buttontype = -1;
}

function pictureBox1_MouseMove(e) { //перемещение мыши по pictureBox1
    if (buttontype === 0) {
        const rect = e.target.getBoundingClientRect();
        dx = e.clientX - rect.left; 
        dy = e.clientY - rect.top; 
        // if (!dC && Cmode === 1)
        sx += (Lx - dx) / k;
        // if (!dC && Cmode === 1)
        sy += (Ly - dy) / k;
        //if (dC) cRe += (Lx - dx) / k;
        //if (dC) cIm += (Ly - dy) / k;
        Lx = dx;
        Ly = dy;
        mReset();
        textBox2.value = sx; 
        textBox3.value = -sy;
        infoUpdate();
    }
} //pictureBox1_MouseMove

function pictureBox1_TouchMove(e) { //перемещение пальца по pictureBox1
    //e.preventDefault();
    if (buttontype === 0) {
        const rect = e.target.getBoundingClientRect();
        dx = e.touches[0].clientX - rect.left; 
        dy = e.touches[0].clientY - rect.top;
        if(!touchWheel) {
            // if (!dC && Cmode === 1)
            sx += (Lx - dx) / k;
            // if (!dC && Cmode === 1)
            sy += (Ly - dy) / k;
            //if (dC) cRe += (Lx - dx) / k;
            //if (dC) cIm += (Ly - dy) / k;
        }
        else {
            dx2 = e.touches[1].clientX - rect.left; 
            dy2 = e.touches[1].clientY - rect.top;
            // if (!dC && Cmode === 1)
            sx += ((Lx - dx) + (Lx2 - dx2)) / k / 2;
            // if (!dC && Cmode === 1)
            sy += ((Ly - dy) + (Ly2 - dy2)) / k / 2;
            //if (dC) cRe += ((Lx - dx) + (Lx2 - dx2)) / k / 2;
            //if (dC) cIm += ((Ly - dy) + (Ly2 - dy2)) / k / 2;
            k /= new Complex(Lx, Ly).Sub(new Complex(Lx2, Ly2)).Abs() / new Complex(dx, dy).Sub(new Complex(dx2, dy2)).Abs();
            Lx2 = dx2;
            Ly2 = dy2;
        }
        Lx = dx;
        Ly = dy;
        mReset();
        textBox1.value = 255 / k;
        textBox2.value = sx; 
        textBox3.value = -sy;
        infoUpdate();
    }
} //pictureBox1_TouchMove

function timer1_Tick() { //тик таймера
    //gr = pictureBox1.getContext('2d');
    //d++; if (d > 25) d = 0;
    label1.innerText = "R: " + dist;
    
    //if(checkBox5.checked) {
    	var newTime = Date.now();
        var newFPS = 1000.0 / (newTime - lastTime);
        if(fps == 0) fps = newFPS;
        fps = (fps*Math.ceil(newFPS-1) + newFPS) / Math.ceil(newFPS);
        label3.innerText = "FPS: " + Math.round(fps);
        lastTime = newTime;
    //}
    
    Draw();
    if (animation)
    {
        t += dt;
        textBox4.value = t;
        infoUpdate();
        parser.operations.forEach(op => { if(op.variability <= 2) op.relevance = false; });
        parser2.operations.forEach(op => { if(op.variability <= 2) op.relevance = false; });
        var result = parser2.CalculationValue(fValue2, new Complex(sx, -sy), t);
        writeComplex(textBox5, result);
    }
    //requestAnimationFrame(this.Draw.bind(this));
} //timer1_Tick


//ФУНКЦИИ:

function infoUpdate() { //обновление информации в левом верхнем углу экрана
	label2.innerText = `Масштаб: ${255 / k}
        x: ${sx}
        y: ${-sy}
        t: ${t}`;
}

function mReset() { //сброс прогресса отрисовки
    m = pictureBox1.width + pictureBox1.height;
    x = Math.floor(-pictureBox1.width / 2.0 - m / 2.0);
    y = Math.floor(-pictureBox1.height / 2.0 - m / 2.0);
    parser.operations.forEach(op => { if(op.variability <= 2) op.relevance = false; });
    dist = "загрузка...";
    dist = parser.CalculationValue(fValue, new Complex(sx, -sy), t).Abs();
    parser.operations.forEach(op => { if(op.variability <= 2) op.relevance = false; });
    parser2.operations.forEach(op => { if(op.variability <= 2) op.relevance = false; });
    var result = parser2.CalculationValue(fValue2, new Complex(sx, -sy), t);
    writeComplex(textBox5, result);
}

function Draw() { //отрисовка
    gr = pictureBox1.getContext('2d');
    if (!animation) { //статическая отрисовка методом улучшения качества со временем
        for (var i = 0; i < 2500; i++) {
            if (m >= 1) { 
                if (x <= (pictureBox1.width / 2.0 + m)) { 
                    if (y <= (pictureBox1.height / 2.0 + m)) { 
                        parser.operations.forEach(op => { if(op.variability <= 0) op.relevance = false; });
                        c = new Complex((x / k + sx), -(y / k + sy)); //!
                        gr.fillStyle = Calculation(); //textBox1.value = gr.fillStyle;
                        gr.fillRect(Math.floor(x + (pictureBox1.width / 2.0 - m / 2.0)), Math.floor(y + (pictureBox1.height / 2.0 - m / 2.0)), m, m); //gr.fillRect(x, y, width, height);
                        y += Math.floor(m);
                    } else {
                        parser.operations.forEach(op => { if(op.variability <= 1) op.relevance = false; });
                        x += Math.floor(m);
                        y = Math.floor(-pictureBox1.height / 2.0 - m / 2.0);
                    }
                } else {
                    m /= 2; //m = (m + 1) / 2 - 1;
                    x = Math.floor(-pictureBox1.width / 2.0 - m / 2.0);
                    y = Math.floor(-pictureBox1.height / 2.0 - m / 2.0);
                }
            }
        }
    } //if (!animation)
    else if (m >= 1) { //отрисовка во время анимации
        m = (pictureBox1.width + pictureBox1.height) / dm; //175 //300; //!
        //const bitmap2 = document.createElement('canvas'); try { bitmap2.width = window.innerWidth / m; bitmap2.height = window.innerHeight / m; } catch { bitmap2.width = 1; bitmap2.height = 1; };
        for (var x1 = 0; x1 < window.innerWidth / m;  x1++) {
            parser.operations.forEach(op => { if(op.variability <= 1) op.relevance = false; });
            for (var y1 = 0; y1 < window.innerHeight / m; y1++)  
            {
                parser.operations.forEach(op => { if(op.variability <= 0) op.relevance = false; });
                c = new Complex(((x1 - window.innerWidth / m / 2.0) / k * m + sx), -((y1 - window.innerHeight / m / 2.0) / k * m + sy));
                gr.fillStyle = Calculation(); //pen.Color = col; //!
                try { gr.fillRect(x1 * m, y1 * m, m + 1, m + 1); } catch { } //gr.FillRectangle(pen.Brush, Convert.ToInt32(x1), Convert.ToInt32(y1), (float)m, (float)m);
            }
        }
        //m = 0;
        //gr.drawImage(bitmap2, 0, 0, pictureBox1.width, pictureBox1.height, 0, 0, bitmap2.width, bitmap2.height);
        //mReset();
    } //if (animation)
    if(displayGrid) { //отрисовка координатной сетки
    	//отрисовка основных линий сетки системы координат:
        gr.strokeStyle = "#7f7f7f";
        gr.lineWidth = 1;
        let locK = Math.pow(10, Complex.Mod(new Complex(Math.log10(k)), new Complex(1)).Re + 1);
        
        for (let i = locK + (sx % (locK/k)) * k; i < window.innerWidth / 2; i += locK) //drawLine(window.innerWidth / 2 + i, 0, window.innerWidth / 2 + i, window.innerHeight);
            drawLine(window.innerWidth / 2 - i, 0, window.innerWidth / 2 - i, window.innerHeight);
        for (let i = locK + (sy % (locK/k)) * k; i < window.innerHeight / 2; i += locK) //drawLine(0, window.innerHeight / 2 + i, window.innerWidth, window.innerHeight / 2 + i);
            drawLine(0, window.innerHeight / 2 - i, window.innerWidth, window.innerHeight / 2 - i);
        
        for (let i = locK + (sx % (locK/k)) * k; i > -window.innerWidth / 2; i -= locK) 
            drawLine(window.innerWidth / 2 - i, 0, window.innerWidth / 2 - i, window.innerHeight);
        for (let i = locK + (sy % (locK/k)) * k; i > -window.innerHeight / 2; i -= locK)
            drawLine(0, window.innerHeight / 2 - i, window.innerWidth, window.innerHeight / 2 - i);
        
        //отрисовка линий сетки кратных 10 от основных:
        gr.lineWidth = 1;
        gr.strokeStyle = "#5f5f5f";
            
        for (let i = 10*locK + (sx % (10*locK/k)) * k; i < window.innerWidth / 2; i += 10*locK) //drawLine(window.innerWidth / 2 + i, 0, window.innerWidth / 2 + i, window.innerHeight);
            drawLine(window.innerWidth / 2 - i, 0, window.innerWidth / 2 - i, window.innerHeight);
        for (let i = 10*locK + (sy % (10*locK/k)) * k; i < window.innerHeight / 2; i += 10*locK) //drawLine(0, window.innerHeight / 2 + i, window.innerWidth, window.innerHeight / 2 + i);
            drawLine(0, window.innerHeight / 2 - i, window.innerWidth, window.innerHeight / 2 - i);
        
        for (let i = 10*locK + (sx % (10*locK/k)) * k; i > -window.innerWidth / 2; i -= 10*locK) 
            drawLine(window.innerWidth / 2 - i, 0, window.innerWidth / 2 - i, window.innerHeight);
        for (let i = 10*locK + (sy % (10*locK/k)) * k; i > -window.innerHeight / 2; i -= 10*locK)
            drawLine(0, window.innerHeight / 2 - i, window.innerWidth, window.innerHeight / 2 - i);
        
        //отрисовка осей координатной плоскости:
        gr.lineWidth = 2.5;
        gr.strokeStyle = "#5f5f5f";
        drawLine(window.innerWidth / 2 - (sx * k), 0, window.innerWidth / 2 - (sx * k), window.innerHeight);
        drawLine(0, window.innerHeight / 2 - (sy * k), window.innerWidth, window.innerHeight / 2 - (sy * k));
        
        //отрисовка числовых значений:
        gr.fillStyle = "#5f5f5f";
        gr.font = "10pt Roboto";
        gr.textAlign = "left";
        gr.textBaseline = "top";
        locK = Math.pow(10, Complex.Mod(new Complex(Math.log10(k)-0.3), new Complex(1)).Re + 1 + 0.3);
        
        let rndK = Math.pow(10, Math.round(Math.log10(k)-1.5-0.3));
        let adjX = 0; if(sx >= 0) adjX = -1;
        let adjY = 0; if(-sy >= 0) adjY = -1;
        let marginX = 3;
        let marginY = 3;
        let lineX = window.innerWidth / 2 - (sx * k) + marginX;
        let lineY = window.innerHeight / 2 - (sy * k) + marginY;
        if(sx * k > window.innerWidth / 2) {
        	lineX = marginX;
        }
        if(-sy * k > window.innerHeight / 2) {
            lineY = window.innerHeight - marginY;
            gr.textBaseline = "bottom";
        }
        if(-sy * k < -window.innerHeight / 2) {
        	lineY = marginY;
        }
        
        for (let i = locK + (sx % (locK/k)) * k, j = 0; i < window.innerWidth / 2; i += locK, j++) //i += locK + 0*j++
            gr.fillText(`${Math.round(sx*rndK-j-0.5+adjX)/rndK}`, window.innerWidth / 2 - i + marginX, lineY);
        for (let i = locK + (sx % (locK/k)) * k, j = 0; i > -window.innerWidth / 2; i -= locK, j--)
            gr.fillText(`${Math.round(sx*rndK-j-0.5+adjX)/rndK}`, window.innerWidth / 2 - i + marginX, lineY);
            
        if(sx * k < -window.innerWidth / 2) {
        	lineX = window.innerWidth - marginX;
            gr.textAlign = "right";
        }
        gr.textBaseline = "top";
            
        for (let i = locK + (sy % (locK/k)) * k, j = 0; i < window.innerHeight / 2; i += locK, j++)
            gr.fillText(`${Math.round(-sy*rndK+j+1.5+adjY)/rndK}`, lineX, window.innerHeight / 2 - i + marginY);
        for (let i = locK + (sy % (locK/k)) * k, j = 0; i > -window.innerHeight / 2; i -= locK, j--)
            gr.fillText(`${Math.round(-sy*rndK+j+1.5+adjY)/rndK}`, lineX, window.innerHeight / 2 - i + marginY);
    } //if(displayGrid)
} //Draw

function drawLine(x1, y1, x2, y2) { //метод рисования линии
    gr.beginPath();
    gr.moveTo(x1, y1);
    gr.lineTo(x2, y2);
    gr.stroke();
}

function Min(a,b) { return Math.abs(b)<Math.abs(a)?b:a; }
function Max(a,b) { return Math.abs(b)>Math.abs(a)?b:a; }
function button3_Click() { //нажатие на кнопку "Обновить выражение"
    parser.clear();
    fValue = parser.Recognition(String(richTextBox1.value)); //console.log(operations);
    mReset();
}

function Calculation() {
    var i = 1;
    //try {
    	i = parser.CalculationValue(fValue, c, t).Abs();

        if(animation) if (c.Re > sx - m / k && c.Re < sx + m / k && c.Im < -sy + m / k && c.Im > -sy - m / k) dist = i; //вывод расстояния до функции
        if (c.Re == sx && c.Im == -sy) dist = i;
    //} catch { }
    if (i == 0) return 'rgb(0, 0, 0)';
    else if (i == Infinity) return 'rgb(255, 255, 255)';
    else {
        i = Math.abs(i);
        i = Math.log(i,2);
        
        if (i >= 0 || i <= 0) try {
            var r = Math.floor((127 - Math.floor(255.0 * (Math.cos(i / 5.0 + 3.0 * Math.PI / 3.0)) + 0.0) / 1.0 * 1.0) / 1); if (r > 255) r = 255; if (r < 0) r = 0; r = (3*r + 191)/4
            var g = Math.floor((127 - Math.floor(255.0 * (Math.cos(i / 5.0 + 5.0 * Math.PI / 3.0)) + 0.0) / 1.0 * 1.0) / 1); if (g > 255) g = 255; if (g < 0) g = 0; g = (2*g + 191)/3
            var b = Math.floor((127 - Math.floor(255.0 * (Math.cos(i / 5.0 + 1.0 * Math.PI / 3.0)) + 0.0) / 1.0 * 1.0) / 1); if (b > 255) b = 255; if (b < 0) b = 0; b = (4*b + 191)/5
            return `rgb(${r}, ${g}, ${b})`;
        }
        catch { return 'rgb(159, 95, 95)'; }
        else { return 'rgb(159, 95, 95)'; }
    }
} //Calculation

function writeComplex(textBox, value) {
	textBox.value = "";
	if(value.Re > 0 || value.Re < 0 ) {
		if(value.Re < 0) textBox.value += "–";
		textBox.value += "" + Math.abs(value.Re);
		if(value.Im > 0) textBox.value += " + ";
		if(value.Im < 0) textBox.value += " – ";
		if(value.Im > 0 || value.Im < 0) {
			if(Math.abs(value.Im) != 1) textBox.value += Math.abs(value.Im) + "·i";
			else textBox.value += "i";
		}
	} else if(value.Im > 0 || value.Im < 0) {
		if(value.Im < 0) textBox.value += "–";
		if(Math.abs(value.Im) != 1) textBox.value += Math.abs(value.Im) + "·i";
		else textBox.value += "i";
	} else if(value.Re === 0 && value.Im === 0) {
		textBox.value = "0";
	} else {
		textBox.value = "Complex(" + value.Re + "; " + value.Im + ")";
	}
}

function autocorrect(str) {
	var str1 = "";
	for (let i = 0; i < str.length; i++) if (str[i] != ' ' && str[i] != '\n') {
		if (str[i] == ',') str1 += '.';
		else if (str[i] == '−') str1 += '-';
		else if (str[i] == '–') str1 += '-';
		else if (str[i] == '—') str1 += '-';
		else if (str[i] == '∞') str1 += "Infinity";
		
		else str1 += String(str[i]);
	}
	
	if (str1 == 'e') return String(Math.E);
	if (str1 == 'π') return String(Math.PI);
	if (str1 == 'p') return String(Math.PI);
	if (str1 == 't') return String(t);
	if (str1 == 'x') return String(sx);
	if (str1 == 'y') return String(-sy);
	if (str1 == 'k') return String(255 / k);
	if (str1 == 'r') return String(new Complex(sx, -sy).Abs());
	if (str1 == 'θ') return String(new Complex(sx, -sy).Arg());
	if (str1 == '⊤') return '0';
	if (str1 == '⊥') return "Infinity";
	
	return str1;
}


//ОБРАБОТЧИКИ КНОПОК:

function button1_Click() { //нажатие на кнопку "Анимация"
    mReset();
    animation = !animation;
    if(animation) timer1Interval = 70;
    else timer1Interval = 1;
}

function button4_Click() { //нажатие на кнопку "Меню"
    //pictureBox1.style.zIndex = 1 - pictureBox1.style.zIndex;
    menu.style.transform = 'translateY(0px)'; 
}

function button5_Click() { //нажатие на кнопку "Скрыть"
	let h = menu.offsetHeight;
    menu.style.transform = `translateY(${h + 30}px)`; 
}

function button7_Click() { //нажатие на кнопку "Выражение"
	document.querySelectorAll('.slide').forEach(gb => {gb.style.transform = `translateX(0px)`;});
	menuTabBtn.forEach(mtb => {mtb.style.backgroundColor = "#555555";});
	button7.style.backgroundColor = "#777777";
}

function button8_Click() { //нажатие на кнопку "Положение"
	let w = groupBox1.offsetWidth;
	document.querySelectorAll('.slide').forEach(gb => {gb.style.transform = `translateX(${-1*w}px)`;});
	menuTabBtn.forEach(mtb => {mtb.style.backgroundColor = "#555555";});
	button8.style.backgroundColor = "#777777";
}

function button9_Click() { //нажатие на кнопку "Настройки"
	let w = groupBox1.offsetWidth;
	document.querySelectorAll('.slide').forEach(gb => {gb.style.transform = `translateX(${-2*w}px)`;});
	/*groupBox1.style.transform = `translateX(${-2*w}px)`;
	groupBox2.style.transform = `translateX(${-2*w}px)`;
	groupBox3.style.transform = `translateX(${-2*w}px)`;
	button7.style.backgroundColor = "#555555";
	button8.style.backgroundColor = "#555555";*/
	menuTabBtn.forEach(mtb => {mtb.style.backgroundColor = "#555555";});
	button9.style.backgroundColor = "#777777";
}

function button13_Click() { //нажатие на кнопку "Калькулятор"
	let w = groupBox1.offsetWidth;
	document.querySelectorAll('.slide').forEach(gb => {gb.style.transform = `translateX(${-3*w}px)`;});
	menuTabBtn.forEach(mtb => {mtb.style.backgroundColor = "#555555";});
	button13.style.backgroundColor = "#777777";
}

function checkBox1_Click() { //переключение настройки "Скрыть кнопки масштабирования"
	if(checkBox1.checked) {
		controls.style.display = "none";
	} else {
		controls.style.display = "";
	}
}

function checkBox2_Click() { //переключение настройки "Скрыть отображение координат в левом верхнем углу"
	if(checkBox2.checked) {
		label2.style.display = "none";
	} else {
		label2.style.display = "";
	}
}

function checkBox3_Click() { //переключение настройки "Скрыть кнопки в левом нижнем углу"
	if(checkBox3.checked) {
		button4.style.opacity = 0;
		button6.style.opacity = 0;
	} else {
		button4.style.opacity = 1;
		button6.style.opacity = 1;
	}
}


function menu_MouseDown(e) { //опускание кнопки мыши при нажатии на stretchArea
	const rect = e.target.getBoundingClientRect();
	Lm = e.clientY - rect.top; 
	menu.style.transitionDuration = "0s";
}

function menu_TouchDown(e) { //опускание пальца при нажатии на stretchArea
	const rect = e.target.getBoundingClientRect();
	Lm = e.touches[0].clientY - rect.top;
	menu.style.transitionDuration = "0s";
}

function menu_MouseMove(e) { //перемещение мыши по stretchArea
	const rect = e.target.getBoundingClientRect();
	var dm = e.clientY - rect.top;
	menu.style.height = `${menu.offsetHeight + Lm - dm}px`;
	if(menu.offsetHeight < 200) menu.style.height = "200px";
	if(menu.offsetHeight > window.innerHeight) menu.style.height = `${window.innerHeight}px`;
	//Lm = dm;
	textBox8.value = menu.offsetHeight;
}

function menu_TouchMove(e) { //перемещение пальца по stretchArea
	const rect = e.target.getBoundingClientRect();
	var dm = e.touches[0].clientY - rect.top;
	menu.style.height = `${menu.offsetHeight + Lm - dm}px`;
	if(menu.offsetHeight < 200) menu.style.height = "200px";
	if(menu.offsetHeight > window.innerHeight) menu.style.height = `${window.innerHeight}px`;
	//Lm = dm;
	textBox8.value = menu.offsetHeight;
}

function menu_MouseUp(e) { //поднятие кнопки мыши или пальца с stretchArea
	menu.style.transitionDuration = "0.3s";
}

function button12_Click() { //нажатие на кнопку "Вернуть положение по умолчанию"
	k = 255 / 5;
    sx = 0;
    sy = 0;
    //t = 0;
    textBox1.value = 255 / k;
    textBox2.value = sx;
    textBox3.value = -sy;
    textBox4.value = t;
    infoUpdate();
    mReset();
}

function checkBox4_Click() { //переключение настройки "Скрыть координатную сетку"
	displayGrid = !displayGrid;
	mReset();
}

function richTextBox2_TextChanged() {
	parser2.clear();
    fValue2 = parser2.Recognition(String(richTextBox2.value));
	var result = parser2.CalculationValue(fValue2, new Complex(sx, -sy), t);
	writeComplex(textBox5, result);
}

function checkBox5_Click() {
	if(!checkBox5.checked) {
		label3.style.display = "none";
	} else {
		label3.style.display = "";
	}
}

function button14_Click() {
	dt = parseFloat(autocorrect(textBox6.value));
	textBox6.value = dt;
}

function button15_Click() {
	dt = 0.025;
	textBox6.value = dt;
}

function button16_Click() {
	dm = parseFloat(autocorrect(textBox7.value));
	textBox7.value = dm;
}

function button17_Click() {
	dm = 175;
	textBox7.value = dm;
}

function button18_Click() {
	menu.style.transitionDuration = "0s";
	menu.style.height = `${parseFloat(autocorrect(textBox8.value))}px`;
	if(menu.offsetHeight < 200) menu.style.height = "200px";
	if(menu.offsetHeight > window.innerHeight) menu.style.height = `${window.innerHeight}px`;
	textBox8.value = menu.offsetHeight;
	menu.style.transitionDuration = "0.3s";
}

function button19_Click() {
	menu.style.transitionDuration = "0s";
	menu.style.height = "300px";
	textBox8.value = menu.offsetHeight;
	menu.style.transitionDuration = "0.3s";
}


//СТАРЫЙ КОММЕНТАРИЙ ИЗ Calculation:

//для написания функции
        // i = 0 = f(x, y)
        // c.Re = x
        // c.Im = y
        /*i = CalculationValue(fValue).Abs();*/ //Sub(y; Sin(Mul(t; x)))
        //i = new Complex(c.Re).Pow(c.Im).Sub(new Complex(c.Im).Pow(c.Re)).Abs();

        //double i4 = Complex.Pow(Math.E, Complex.Sub(c.Im, new Complex(0, t))).Sub(c.Re).Abs(); i = Min(i, i4);
				//double i2 = Complex.Ln(new Complex(c.Re)).Sub(c.Im).Sub(new Complex(0, t % (2 * Math.PI))).Abs(); i = Min(i, i2);
        //double i3 = Complex.Ln(new Complex(c.Re)).Sub(c.Im).Sub(new Complex(0, (t + Math.PI) % (2 * Math.PI) - Math.PI)).Abs(); i = Min(i, i3);


        //i = c.Sin().Pow(2).Sum(c.Cos()).Sub(Math.Tan(t)).Abs();
        //i = c.Abs() - m / k;

        //i = Complex.Drct(t).Mul(c.Re).Cos().Abs() - c.Im;

        //i = Complex.Sub(Complex.Mul(c.Im, Complex.Drct(0 * Math.PI / 2)), Complex.Mul(c.Re, Complex.Drct(Math.PI / 2)).Cos()).Abs();
        //double i2 = c.Im - Math.Cos(c.Re); i = Min(i, i2);


        //i = c.Sin().Sub(Complex.Drct(t).Mul(2)).Abs();

        /*dt = 0.025;*/ //скорость анимации

        //дополнительные приёмы:
        // if (i < 0) i = 0;  <=>  '=' -> '<' //замена равенства на сравнение
        // double iN = f(x, y); i = Min(i, iN); //для одновременной отрисовки нескольких функций

        //Библиотека готовых функций
        //i = c.Im - c.Re;								//прямая
        //i = 1 - c.Abs();								//окружность
        //i = c.Im - Math.Pow(c.Re, 2);					//парабола
        //i = c.Im - 1 / c.Re;							//гипербола
        //i = c.Im - Math.Sin(c.Re);					//синус
        //i = c.Im - Math.Abs(c.Re);					//модуль
        //i = c.Im - Math.Sign(c.Re);					//знак
        //i = c.Im % c.Re;								//остаток от деления;
        //i = 1 - c.Im * c.Re;							//гипербола без асимтоты;
        //i = c.Pow(3).Sub(2).Abs();					//кубический корень из 2
        //i = c.Im - Math.Pow(Math.Abs(c.Re), c.Re);	//тетрация
        //i = 1 - (c.Re * c.Re - c.Im * c.Im);			//гипербола
        //i = Math.Tan(Math.PI * c.Re) * Math.Tan(Math.PI * c.Im);						//сетка
        //i = 2 - (c.Sub(0.75).Abs() + c.Sum(0.75).Abs()); if (i > 0) i = 0;			//овал
        //i = 1 - c.Pow(2).Sub(1).Abs();												//знак бесконечности
        //i = 2 - (c.Pow(2).Sub(1).Abs() + c.Pow(2).Sum(1).Abs()); if (i > 0) i = 0;	//+
        //i = 2 - (c.Pow(2).Sub(0).Abs() + c.Pow(-1).Sum(0).Abs()); if (i > 0) i = 0;
        //i = 2 - (c.Sub(c.Pow(4)).Mul(1).Abs() + c.Sum(c.Pow(4)).Mul(1.5).Abs());
        //i = Math.Sin(10 * c.Im) % Math.Sin(1 * c.Re) - Math.Sin(10 * c.Re) % Math.Sin(1 * c.Im);
        //i = (Math.Abs(c.Im) - Math.Pow(Math.Abs(c.Re), Math.Tan(t))) * Math.Sign(Math.Cos(t)); if (i < 0) i = 0; //выворачивающаяся парабола
        //i = Math.Pow(2,c.Re) + 4*c.Re - c.Re - 3;
        //
        //
        //
        //Сложные функции
        //
        //
        //i = Math.Tan(Math.PI * c.Im);							//сетка
        //double i2 = Math.Tan(Math.PI * c.Re); i = Min(i, i2);
        //
        //
        //Complex z = c;							//множество Мандельброта
        //int j = 0;
        //for (; j < 100; j++)
        //{
        //    z = z.Pow(new Complex(2.01, 0)).Sum(c);
        //    if (z.Abs() > 10) break;
        //    //if (z.Abs() < 1/t) j = 100 - 1;
        //}
        //i = Math.Pow(2, 100 - j) - 1;
        //
        //
        //double an = c.Angle();									//спираль архимеда 
        //if (an < 0) an += 2 * Math.PI;
        //double an1 = an - 2 * Math.PI;
        //double an2 = an + 2 * Math.PI;
        //i = c.Abs() % (2 * Math.PI) - an;
        //double i1 = c.Abs() % (2 * Math.PI) - an1; i = Min(i, i1);
        //double i2 = c.Abs() % (2 * Math.PI) - an2; i = Min(i, i2);
        //
        //
        //Complex z = c.Mul(c.Sign());
        //i = z.Sum(new Complex(Math.Tan(t), Math.Pow(Math.Tan(t), -1))).Abs() - 1; if (i < 0) i = 0;
        //double i2 = z.Im + Math.Pow(-z.Re, -1); i = Min(i, i2);
        //
        //
        //
        //Amazing Math Graphs
        //
        //Level 1? :)
        //i = Math.Pow(c.Re, c.Im) - Math.Pow(c.Im, c.Re);				//x^y = y^x;
        //i = Math.Pow(c.Im, c.Re) * Math.Pow(c.Re, c.Im) - 0.1;		//y^x * x^y = 0.1
        //i = Math.Pow(c.Im, c.Re) - c.Re * c.Im;						//y^x = xy
        //i = Math.Pow(Math.Abs(c.Im), c.Re) - (Math.Abs(c.Re) + 2);	//|y|^x = |x| + 2
        //i = c.Re / c.Im - Math.Pow(c.Re, 3);							//x/y = x^3
        //i = c.Im - (Math.Pow(Math.E, Math.Sin(c.Re)) + c.Re);			//y = e^sin(x) + x
        //
        //Level 2
        //i = Math.Pow(c.Re, 3) + Math.Pow(c.Im, 3) - (c.Re * c.Re + c.Im);													//x^3 + y^3 = x^2 + y
        //i = Math.Pow(c.Re, 7) + Math.Pow(c.Im, 9) - (Math.Pow(c.Re, 5) + Math.Pow(c.Im, 3));								//x^7 + y^9 = X^5 + y^3
        //i = c.Im - Math.Cos(Math.Pow(c.Re, c.Re));																		//y = cos(x^x)
        //i = c.Im - Math.Sin(Math.Pow(c.Re, Math.Cos(c.Im)));																//y = sin(x^cos(y))
        //i = Math.Pow(4, Math.Log(Math.Sin(c.Im))) - Math.Tan(Math.Abs(c.Re));												//4^ln(sin(y)) = tan(|x|)
        //i = c.Im - Math.Log(Math.Sin(c.Re)); if (i < 0) i = 0;															//y < ln(sin(x))
        //i = Math.Sin(Math.Log(Math.Pow(c.Re, c.Im))); if (i > 0) i = 0;													//sin(ln(x^y)) > 0
        //i = Math.Log(Math.Pow(c.Re, c.Im)) + Math.Cos(Math.Pow(c.Im, c.Re)) - 1;											//ln(x^y) + cos(y^x) = 1
        //i = Math.Pow(c.Im, 16) - Math.Pow(c.Im, c.Re*c.Re + c.Im*c.Im) / Math.Log(Math.Pow(2, c.Re*c.Re - c.Im*c.Im));	//y^16 = y^(x^2 + y^2) / ln(2^(x^2 - y^2))
        //
        //Lavel 3
        //i = c.Im - Math.Pow(Math.E, Math.Cos(c.Im * c.Re));																															//y = e^cos(yx)
        //i = Math.Pow(7, c.Re * Math.Sin(c.Re)) + Math.Pow(c.Re, 7 * Math.Sin(c.Im)) - (c.Im * c.Re*c.Re + Math.Pow(2, c.Re * c.Im*c.Im));												//7^(x*sin(x)) + x^(7*sin(y)) = yx^2 + 2^(xy^2)
        //i = c.Re*c.Re + c.Im*c.Im - (Math.Tan(Math.Pow(Math.E, c.Re)) + Math.Abs(Math.Pow(4, c.Re) / Math.Sin(c.Im)));																//x^2 + y^2 = tan(e^x) + |4^x / sin(y)|
        //i = Math.Abs(Math.Sin(c.Re * Math.Cos(c.Re))) - 0.1;																															//|sin(x*cos(x))| = 0.1
        //i = c.Im - (Math.Pow(Math.Sin(c.Re), c.Re) + Math.Pow(Math.Cos(c.Im), c.Im));																									//y = sin(x)^x + cos(y)^y
        //i = c.Im - Math.Pow(Math.Cos(c.Re*c.Re), Math.Cos(Math.Pow(c.Re, c.Re)));																										//y = cos(x^2)^cos(x^x)
        //i = c.Im - (1 / Math.Cos(c.Re*c.Re) + 1 / Math.Sin(c.Re));																													//y = sec(x^2) + csc(x)
        //i = c.Re - Math.Sqrt(Math.Tan(c.Re * c.Im) / (Math.Pow(4, c.Im) + Math.Pow(c.Re, 4))); double i2 = c.Im - Math.Cos(Math.Pow(4, c.Re) + Math.Pow(c.Im, 4)); i = Min(i, i2);	//x = (tan(xy)/(4^y + x^4))^0.5; y = cos(4^x + y^4)
        //i = Math.Tan(Math.Pow(c.Re, c.Im)) - Math.Sin(Math.Pow(c.Re, Math.Cos(c.Im)));																								//tan(x^y) = sin(x^cos(y))
        //i = Math.Sin(Math.Pow(c.Re, Math.E)) + Math.Cos(Math.Pow(c.Im, Math.E)) - 1;																									//sin(x^e) + cos(y^e) = 1
        //i = Math.Tan(c.Re*c.Re + c.Im*c.Im) - 1;																																		//tan(x^2 + y^2) = 1
        //i = c.Re - Math.Tan(c.Im*c.Im);																																				//x = tan(y^2)
        //i = c.Re*c.Re - ((256 * Math.Pow(Math.Cos(Math.Pow(c.Im, 3)), 4) * Math.E * c.Re) % 2); if (i <= 0) i = 0;																	//x^2 <= (256 * cos(y^3)^4 * ex) mod 2