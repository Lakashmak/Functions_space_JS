import Complex from './Complex.js';

class Operation {
    constructor(name, args, operations) {
        this.name = name;
        this.args = args;
        this.variability = 3;
        for(var j = 0; ((j < this.args.length) && (this.variability != 0)); j++) {
            const arg = args[j];
            if (arg[0] == 'r' && arg.length > 1) {
                var id = ""; for (let i = 1; i < arg.length; i++) id += String(arg[i]);
                const op = operations[Math.floor(id)];
                if(op.variability < this.variability) this.variability = op.variability;
            }
            else if (arg[0] == 'c' || arg[0] == 'y' || arg[0] == 'r' || arg[0] == 'θ') this.variability = 0;
            else if (arg[0] == 'x') { if(1 < this.variability) this.variability = 1; }
            else if (arg[0] == 't') if(2 < this.variability) this.variability = 2;
            //else if (arg[0] == 'p' || arg[0] == 'e' || arg[0] == 'i') if(2 < this.variability) this.variability = 2;
            //else if(2 < this.variability) this.variability = 2;
        }
        this.relevance = false;
        this.value = new Complex(1);
    }
}

const pictureBox1 = document.getElementById('pictureBox1');
const info = document.getElementById('info');
const controls = document.getElementById('controls');
const menu = document.getElementById('menu');
const menuToolbar = document.getElementById('menuToolbar');
const stretchArea = document.getElementById('stretchArea');
const groupBox1 = document.getElementById('groupBox1');
const groupBox2 = document.getElementById('groupBox2');
const groupBox3 = document.getElementById('groupBox3');
const label1 = document.getElementById('label1');
const label2 = document.getElementById('label2');
const richTextBox1 = document.getElementById('richTextBox1');
const textBox1 = document.getElementById('textBox1');
const textBox2 = document.getElementById('textBox2');
const textBox3 = document.getElementById('textBox3');
const textBox4 = document.getElementById('textBox4');
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const button4 = document.getElementById('button4');
const button5 = document.getElementById('button5');
const button6 = document.getElementById('button6');
const button7 = document.getElementById('button7');
const button8 = document.getElementById('button8');
const button9 = document.getElementById('button9');
const button10 = document.getElementById('button10');
const button11 = document.getElementById('button11');
const button12 = document.getElementById('button12');
const checkBox1 = document.getElementById('checkBox1');
const checkBox2 = document.getElementById('checkBox2');
const checkBox3 = document.getElementById('checkBox3');
const checkBox4 = document.getElementById('checkBox4');

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
button6.addEventListener('click', () => {button1_Click();});
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

//checkBox.addEventListener('change', () => { console.log('changed', checkBox.id, checkBox.checked); this.checkBox_Click(checkBox, "lang", l.id); });

var gr;

var cRe = -1, cIm = 0;
//var Cmode = 1;
var m = 0;
var Lx = 0, Ly = 0, Lx2 = 0, Ly2 = 0;
var dx = 0, dy = 0, dx2 = 0, dy2 = 0;
var k = 51;
//var sk = k;
var sx = 0, sy = 0;
//var ssx = 0; //var ssy = 0;
var x = 0, y = 0;
var dC = false;
//var sn = 2;
var t = 0, dt = 0.1;
var dist = 1;
var animation = false;
var buttontype = -1;
var operations = [];
var fValue = "";
var timer1Interval = 1;
var touchWheel = false;
var c;
var Lm = 0;
var displayGrid = true;

resizeCanvas();
fValue = Recognition(String(richTextBox1.value)); //console.log(operations);
gr = pictureBox1.getContext('2d');
gr.fillStyle = 'rgb(255, 127, 0)';
gr.clearRect(0, 0, pictureBox1.width, pictureBox1.height); //gr.clearRect(0, 0, 930, 900);
setInterval(timer1_Tick, timer1Interval);
//requestAnimationFrame(this.Draw.bind(this));

function resizeCanvas() {
    pictureBox1.width = window.innerWidth;
    pictureBox1.height = window.innerHeight;
    if(menu.offsetHeight > window.innerHeight) menu.style.height = `${window.innerHeight}px`;
    gr = pictureBox1.getContext('2d');
    mReset();
}

function MouseWheel(e) {
    if (e.deltaY < 0) k *= 1.35;
    else k /= 1.35;
    textBox1.value = 255 / k;
    infoUpdate();
    mReset();
}

function button10_Click() {
	k *= 1.35;
	textBox1.value = 255 / k;
	infoUpdate();
	mReset();
}

function button11_Click() {
	k /= 1.35;
	textBox1.value = 255 / k;
	infoUpdate();
	mReset();
}

function button2_Click() {
    k = 255 / parseFloat(textBox1.value);
    sx = parseFloat(textBox2.value)
    sy = -parseFloat(textBox3.value);
    t = parseFloat(textBox4.value);
    mReset();
    infoUpdate();
}

function pictureBox1_MouseDown(e) {
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
}

function pictureBox1_TouchDown(e) {
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
}

function pictureBox1_MouseUp(e){
    buttontype = -1;
}

function pictureBox1_MouseMove(e) {
    if (buttontype === 0) {
        const rect = e.target.getBoundingClientRect();
        dx = e.clientX - rect.left; 
        dy = e.clientY - rect.top; 
        // if (!dC && Cmode === 1)
        sx += (Lx - dx) / k;
        // if (!dC && Cmode === 1)
        sy += (Ly - dy) / k;
        if (dC) cRe += (Lx - dx) / k;
        if (dC) cIm += (Ly - dy) / k;
        Lx = dx;
        Ly = dy;
        mReset();
        textBox2.value = sx; 
        textBox3.value = -sy;
        infoUpdate();
    }
}

function pictureBox1_TouchMove(e) {
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
            if (dC) cRe += (Lx - dx) / k;
            if (dC) cIm += (Ly - dy) / k;
        }
        else {
            dx2 = e.touches[1].clientX - rect.left; 
            dy2 = e.touches[1].clientY - rect.top;
            // if (!dC && Cmode === 1)
            sx += ((Lx - dx) + (Lx2 - dx2)) / k / 2;
            // if (!dC && Cmode === 1)
            sy += ((Ly - dy) + (Ly2 - dy2)) / k / 2;
            if (dC) cRe += ((Lx - dx) + (Lx2 - dx2)) / k / 2;
            if (dC) cIm += ((Ly - dy) + (Ly2 - dy2)) / k / 2;
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
}

function infoUpdate() {
	label2.innerText = `Масштаб: ${255 / k}
        X: ${sx}
        Y: ${-sy}
        T: ${t}`;
}

function timer1_Tick() {
    //gr = pictureBox1.getContext('2d');
    //d++; if (d > 25) d = 0;
    label1.innerText = "R: " + dist;
    
    Draw();
    if (animation)
    {
        t += dt;
        textBox4.value = t;
        infoUpdate();
        operations.forEach(function(op) { if(op.variability <= 2) op.relevance = false; });
    }
    //requestAnimationFrame(this.Draw.bind(this));
}

function mReset() { 
    m = pictureBox1.width + pictureBox1.height;
    x = Math.floor(-pictureBox1.width / 2.0 - m / 2.0);
    y = Math.floor(-pictureBox1.height / 2.0 - m / 2.0);
    operations.forEach(function(op) { if(op.variability <= 2) op.relevance = false; });
}

function Draw() {
    gr = pictureBox1.getContext('2d');
    if (!animation) {
        for (var i = 0; i < 2500; i++) {
            if (m >= 1) { 
                if (x <= (pictureBox1.width / 2.0 + m)) { 
                    if (y <= (pictureBox1.height / 2.0 + m)) { 
                        operations.forEach(function(op) { if(op.variability <= 0) op.relevance = false; });
                        c = new Complex((x / k + sx), -(y / k + sy)); //!
                        gr.fillStyle = Calculation(); //textBox1.value = gr.fillStyle;
                        gr.fillRect(Math.floor(x + (pictureBox1.width / 2.0 - m / 2.0)), Math.floor(y + (pictureBox1.height / 2.0 - m / 2.0)), m, m); //gr.fillRect(x, y, width, height);
                        y += Math.floor(m);
                    } else {
                        operations.forEach(function(op) { if(op.variability <= 1) op.relevance = false; });
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
    }
    else if (m >= 1) {
        m = (pictureBox1.width + pictureBox1.height) / 175; //300;
        //const bitmap2 = document.createElement('canvas'); try { bitmap2.width = window.innerWidth / m; bitmap2.height = window.innerHeight / m; } catch { bitmap2.width = 1; bitmap2.height = 1; };
        for (var x1 = 0; x1 < window.innerWidth / m;  x1++) {
            operations.forEach(function(op) { if(op.variability <= 1) op.relevance = false; });
            for (var y1 = 0; y1 < window.innerHeight / m; y1++)  
            {
                operations.forEach(function(op) { if(op.variability <= 0) op.relevance = false; });
                c = new Complex(((x1 - window.innerWidth / m / 2.0) / k * m + sx), -((y1 - window.innerHeight / m / 2.0) / k * m + sy));
                gr.fillStyle = Calculation(); //pen.Color = col; //!
                try { gr.fillRect(x1 * m, y1 * m, m + 1, m + 1); } catch { } //gr.FillRectangle(pen.Brush, Convert.ToInt32(x1), Convert.ToInt32(y1), (float)m, (float)m);
            }
        }
        //m = 0;
        //gr.drawImage(bitmap2, 0, 0, pictureBox1.width, pictureBox1.height, 0, 0, bitmap2.width, bitmap2.height);
        //mReset();
    }
    if(displayGrid) {
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
    }
}

function drawLine(x1, y1, x2, y2) {
    gr.beginPath();
    gr.moveTo(x1, y1);
    gr.lineTo(x2, y2);
    gr.stroke();
}

function Min(a,b) { return Math.abs(b)<Math.abs(a)?b:a; }
function Max(a,b) { return Math.abs(b)>Math.abs(a)?b:a; }
function button3_Click() {
    operations = [];
    fValue = Recognition(String(richTextBox1.value)); //console.log(operations);
    mReset();
}
function Recognition(formula) {
    formula = String(formula);
    var multiexpression=false, And=false, Abs=false, equality=false, Sum=false, Sub=false, Mul=false, Div=false, Pow=false, Root=false, Fct=false, Mod=false;
    {
        var level = 0, formula1 = "";
        for (var i = 0; i < formula.length; i++) if (formula[i] != ' ') {
            if (formula[i] == ',') formula1 += '.';
            else if (formula[i] == 'π') formula1 += 'p';
            else if (formula[i] == '−') formula1 += '-';
            else if (formula[i] == '–') formula1 += '-';
            else if (formula[i] == '—') formula1 += '-';
            else if (formula[i] == ':') formula1 += '/';
            else if (formula[i] == '÷') formula1 += '/';
            else if (formula[i] == '×') formula1 += '*';
            else if (formula[i] == '≤') formula1 += '<';
            else if (formula[i] == '≥') formula1 += '>';
            else if (formula[i] == '∧') formula1 += '&';
            else if (formula[i] == '≡') formula1 += '=';
            else if (formula[i] == '↔') formula1 += '=';
            else if (formula[i] == '⇔') formula1 += '=';
            else if (formula[i] == '[') formula1 += "round(";
            else if (formula[i] == '⌊') formula1 += "Dround(";
            else if (formula[i] == '⌈') formula1 += "Uround(";
            else if (formula[i] == ']') formula1 += ')';
            else if (formula[i] == '⌋') formula1 += ')';
            else if (formula[i] == '⌉') formula1 += ')';
            else if (formula[i] == '⋮') formula1 += '%';

            else formula1 += String(formula[i]);
        }
        formula = formula1;
        for (var i = 0; i < formula.length; i++) {
            if (formula[i] == '(') level++;
            else if(formula[i] == ')') level--;
            if(formula[i]=='\n') multiexpression = true;
            if(level <= 0) {
                if(['=', '>', '<'].includes(formula[i])) equality = true;
                if(!Sub && formula[i] == '+') Sum = true;
                if(!Sum && formula[i] == '-') Sub = true;
                if(!Div && formula[i] == '*') Mul = true;
                if(!Mul && formula[i] == '/') Div = true;
                if(formula[i] == '%') Mod = true;
                if(formula[i] == '^') Pow = true;
                if(formula[i] == '√') Root = true;
                if(formula[i] == '!') Fct = true;
                if(formula[i] == '|') Abs = true;
                if(formula[i] == '&') And = true;
            }
        }
    }

    if (multiexpression) {
        formula1 = "Mex(";
        for (var i = 0; i < formula.length; i++) {
            if (formula[i] != '\n') formula1 += String(formula[i]);
            else formula1 += ";";
        }
        formula1 += ")";
        formula = formula1;
    } else if (Abs) {
        var Open = false, level = 0, formula1 = "(";
        for (var i = 0; i < formula.length; i++) {
            if (formula[i] == '(') level++;
            else if (formula[i] == ')') level--;
            if (level > 0 || formula[i] != '|') formula1 += String(formula[i]);
            else if (formula[i] == '|') {
                if (!Open) formula1 += "Abs(";
                else formula1 += ")";
                Open = !Open;
            }
        }
        formula1 += ")";
        formula = formula1;
    } else if (And) {
        var level = 0, formula1 = "And(";
        for (var i = 0; i < formula.length; i++) {
            if (formula[i] == '(') level++;
            else if (formula[i] == ')') level--;
            if (level > 0 || formula[i] != '&') formula1 += String(formula[i]);
            else formula1 += ";";
        }
        formula1 += ")";
        formula = formula1;
    } else if (equality) {
        //bool larger = false;
        //bool less = false;
        var level = 0, formula1 = "Max(", args = [], types = "", arg = "";
        for (var i = 0; i < formula.length; i++) {
            if (formula[i] == '(') level++;
            else if (formula[i] == ')') level--;
            if (level >= 0) {
                if (level > 0 || formula[i] != '=' && formula[i] != '>' && formula[i] != '<') arg += String(formula[i]);
                else if (formula[i] == '=' || formula[i] == '>' || formula[i] == '<') {
                    //if (formula[i] == '>') larger = true;
                    //if (formula[i] == '<') less = true;
                    //formula1 += ";";
                    types += String(formula[i]);
                    args.push(arg);
                    arg = "";
                }
            }
        }
        args.push(arg);
        for (var i = 0; i < types.length; i++) {
            if (types[i] == '=') formula1 += "Eq(" + args[i] + ";" + args[i + 1] + ")";
            if (types[i] == '>') formula1 += "Lar(" + args[i] + ";" + args[i + 1] + ")";
            if (types[i] == '<') formula1 += "Les(" + args[i] + ";" + args[i + 1] + ")";
            if (i + 1 < types.length) formula1 += ";";
        }
        formula1 += ")";
        formula = formula1;
    } else if (Sum || Sub) {
        var formula1 = ""; if (Sum) formula1 = "Sum("; if (Sub) formula1 = "Sub(";
        var level = 0, one = true;
        for (var i = 0; i < formula.length; i++) {
            if (formula[i] == '(') level++;
            else if (formula[i] == ')') level--;
            if (level > 0 || formula[i] != '+' && formula[i] != '-') formula1 += String(formula[i]);
            else if (one) { formula1 += ";"; one = false; }
            else {
                if (formula[i] == '+') formula1 = "Sum(" + formula1 + ");";
                if (formula[i] == '-') formula1 = "Sub(" + formula1 + ");";
            }
        }
        formula1 += ")";
        formula = formula1;
    } else if (Mul || Div) {
        var formula1 = ""; if (Mul) formula1 = "Mul("; if (Div) formula1 = "Div(";
        var level = 0, one = true;
        for (var i = 0; i < formula.length; i++) {
            if (formula[i] == '(') level++;
            else if (formula[i] == ')') level--;
            if (level > 0 || formula[i] != '*' && formula[i] != '/') formula1 += formula[i];
            else if (one) { formula1 += ";"; one = false; }
            else {
                if (formula[i] == '*') formula1 = "Mul(" + formula1 + ");";
                if (formula[i] == '/') formula1 = "Div(" + formula1 + ");";
            }
        }
        formula1 += ")";
        formula = formula1;
    } else if (Mod) {
        var level = 0, formula1 = "", one = true;
        for (var i = 0; i < formula.length; i++) {
            if (formula[i] == '(') level++;
            else if (formula[i] == ')') level--;
            if (level > 0 || !one || !['%', 'g', 'G'].includes(formula[i])) formula1 += formula[i];
            else if (i > 0 && formula[i] == '%' && (formula[i-1] == 'g' || formula[i-1] == 'G')) { formula1 = "Gmod(" + formula1 + ";"; one = false; }
            else if (formula[i] == '%') { formula1 = "Mod(" + formula1 + ";"; one = false; }
        }
        formula1 += ")";
        formula = formula1;
    } else if (Pow) {
        var level = 0, formula1 = "", one = true;
        for (var i = 0; i < formula.length; i++) {
            if (formula[i] == '(') level++;
            else if (formula[i] == ')') level--;
            if (level > 0 || !one || formula[i] != '^') formula1 += formula[i];
            else if (formula[i] == '^') { formula1 = "Pow(" + formula1 + ";"; one = false; }
        }
        formula1 += ")";
        formula = formula1;
    } else if (Root) {
        var level = 0, formula1 = "", one = true;
        for (var i = 0; i < formula.length; i++) {
            if (formula[i] == '(') level++;
            else if (formula[i] == ')') level--;
            if (level > 0 || !one || formula[i] != '√') formula1 += formula[i];
            else if (formula[i] == '√') { formula1 += "Sqrt("; one = false; }
        }
        formula1 += ")";
        formula = formula1;
    } else if (Fct) {
        var level = 0, formula1 = "", one = true;
        for (var i = 0; i < formula.length; i++) {
            if (formula[i] == '(') level++;
            else if (formula[i] == ')') level--;
            if (level > 0 || !one || formula[i] != '!') formula1 += formula[i];
            else if (formula[i] == '!') { formula1 = "Mul(Fct(" + formula1 + ");"; one = false; }
        }
        formula1 += ")";
        formula = formula1;
    }

    while (formula != "") {
        var i = 0, operation = "";
        while (i < formula.length && formula[i] != '(') operation += String(formula[i++]);
        if (i >= formula.length) break;
        var level = 1, argsStr = "";
        i++;
        while (i < formula.length && level > 0) {
            if (formula[i] == '(') level++;
            else if (formula[i] == ')') level--;
            if (level > 0) argsStr += String(formula[i++]);
        }
        if (i >= formula.length || argsStr == "") break;
        args = [];
        {
            var arg = "", level = 0;
            for (var j = 0; j < argsStr.length; j++) {
                if (argsStr[j] == '(') level++;
                else if (argsStr[j] == ')') level--;
                if (level >= 0) {
                    if (level > 0 || argsStr[j] != ';') arg += String(argsStr[j]);
                    else {
                        args.push(arg);
                        arg = "";
                    }
                }
            }
            args.push(arg);
        }
        var args1 = [];
        for (var j = 0; j < args.length; j++) args1.push(String(Recognition(args[j]))); //console.log(args1);
        args = args1;
        if (operation == "Sum" || operation == "Sub") for (var j = 0; j < args.length; j++) if (args[j] == "") args[j] = "0";
        {
            var j = 0
            for (; j < operations.length; j++) if (operations[j].name == operation && operations[j].args == args) break;
            if (j >= operations.length) operations.push(new Operation(operation, args, operations));
            var formula1 = "r" + String(j);
            i++;
            while (i < formula.length) formula1 += String(formula[i++]);
            formula = formula1;
        }
    }
    
    return String(formula); 
}

function CalculationValue(value) {
    value = String(value);
    if (value == "") return new Complex(Infinity);
    if (value[0] == 'r' && value.length > 1) {
        var id = ""; for (var i = 1; i < value.length; i++) id += String(value[i]);
        const op = operations[Math.floor(id)];
        if(op.relevance) return op.value;
        var sargs = op.args;
        var args2 = [];
        args2.length = 0;
        sargs.forEach(function(arg) { args2.push(CalculationValue(arg)); });
        var args = args2; //console.log(args);

        if (op.name == "") op.value = new Complex(args[0]);
        else if (op.name == "Eq") {
            op.value = new Complex(args[0].Sub(args[1]).Abs());
        }
        else if (op.name == "Lar") { //if (larger) formula1 = "Div(Sub(" + formula1 + ";Abs(" + formula1 + "));2)";
            var result = args[0].Sub(args[1]).Re;
            if (result > 0) result = 0;
            op.value = new Complex(Math.abs(result));
        }
        else if (op.name == "Les") { //if (less) formula1 = "Div(Sum(" + formula1 + ";Abs(" + formula1 + "));2)";
            var result = args[0].Sub(args[1]).Re;
            if (result < 0) result = 0;
            op.value = new Complex(Math.abs(result));
        }
        else if (op.name == "Mex") {
            var result = args[0].Abs();
            for (var i = 1; i < args.length; i++) if ((args[i].Abs() < result || !(args[i].Abs() > result)) && (args[i].Abs() >= 0 || args[i].Abs() <= 0)) result = args[i].Abs();
            op.value = new Complex(result);
        }
        else if (op.name == "And") {
            var result = args[0].Abs();
            for (var i = 1; i < args.length; i++) if ((args[i].Abs() > result || !(args[i].Abs() < result)) && (args[i].Abs() >= 0 || args[i].Abs() <= 0)) result = args[i].Abs();
            op.value = new Complex(result);
        }
        else if (op.name == "Complex") op.value = new Complex(args[0].Re, args[1].Re);
        else if (op.name == "Re") op.value = new Complex(args[0].Re);
        else if (op.name == "Im") op.value = new Complex(args[0].Im);
        else if (op.name == "Min" || op.name == "min") { //if (Math.Abs(b) < Math.Abs(a) || !(Math.Abs(b) > Math.Abs(a)) && (b >= 0 || b <= 0)) a = b;
            var result = args[0].Re;
            for (var i = 1; i < args.length; i++) if ((args[i].Re < result || !(args[i].Re > result)) && (args[i].Re >= 0 || args[i].Re <= 0)) result = args[i].Re;
            op.value = new Complex(result);
        }
        else if (op.name == "Max" || op.name == "max") {
            var result = args[0].Re;
            for (var i = 1; i < args.length; i++) if ((args[i].Re > result || !(args[i].Re < result)) && (args[i].Re >= 0 || args[i].Re <= 0)) result = args[i].Re;
            op.value = new Complex(result);
        }
        else if (op.name == "Round" || op.name == "round") op.value = args[0].Round();
        else if (op.name == "Uround" || op.name == "uround") op.value = args[0].Uround();
        else if (op.name == "Dround" || op.name == "dround") op.value = args[0].Dround();
        else if (op.name == "Abs" || op.name == "abs") op.value = new Complex(args[0].Abs());
        else if (["Sign", "sign", "Sgn", "sgn"].includes(op.name)) op.value = args[0].Sign();
        else if (op.name == "Conj" || op.name == "conj") op.value = args[0].Conj();
        else if (op.name == "Sum" || op.name == "sum") {
            var result = new Complex(args[0]);
            for (var i = 1; i < args.length; i++) result = result.Sum(args[i]);
            op.value = result;
        }
        else if (op.name == "Sub" || op.name == "sub") op.value = args[0].Sub(args[1]);
        else if (op.name == "Mul" || op.name == "mul") {
            var result = new Complex(args[0]);
            for (var i = 1; i < args.length; i++) result = result.Mul(args[i]);
            op.value = result;
        }
        else if (op.name == "Div" || op.name == "div") op.value = args[0].Div(args[1]);
        else if (op.name == "Mod" || op.name == "mod") op.value = args[0].Mod(args[1]);
        else if (op.name == "Gmod" || op.name == "gmod") op.value = args[0].Gmod(args[1]);
        else if (["Lcm", "lcm", "НОК", "нок"].includes(op.name)) {
            var result = new Complex(args[0]);
            for (var i = 1; i < args.length; i++) result = result.Lcm(args[i]);
            op.value = result;
        }
        else if (["Gcd", "gcd", "НОД", "нод"].includes(op.name)) {
            var result = new Complex(args[0]);
            for (var i = 1; i < args.length; i++) result = result.Gcd(args[i]);
            op.value = result;
        }
        else if (["Arg", "arg", "Angle", "angle"].includes(op.name)) op.value = new Complex(args[0].Arg()); 
        else if (["Drct", "drct", "Expi", "expi"].includes(op.name)) op.value = args[0].Drct();
        else if (op.name == "Exp" || op.name == "exp") { if(args.length > 1) op.value = args[0].Exp(args[1]); else op.value = Complex.Pow(Math.E, args[0]); }
        else if (op.name == "Pow" || op.name == "pow") op.value = args[0].Pow(args[1]);
        else if (op.name == "Sqrt" || op.name == "sqrt") op.value = args[0].Pow(0.5);
        else if (op.name == "Root" || op.name == "root") { if(args.length > 1) op.value = args[0].Pow(new Complex(1).Div(args[1])); else op.value = args[0].Pow(0.5); }
        else if (op.name == "Ln" || op.name == "ln") op.value = args[0].Ln();
        else if (op.name == "Lg" || op.name == "lg") op.value = args[0].Log(10);
        else if (op.name == "Log" || op.name == "log") { if(args.length > 1) op.value = args[0].Log(args[1]); else op.value = args[0].Log(10);}
        else if (op.name == "Sin" || op.name == "sin") op.value = args[0].Sin();
        else if (op.name == "Cos" || op.name == "cos") op.value = args[0].Cos();
        else if (["Tan", "tan", "Tg", "tg"].includes(op.name)) op.value = args[0].Tan();
        else if (op.name == "Ctg" || op.name == "ctg") op.value = new Complex(1).Div(args[0].Tan());
        else if (op.name == "Sec" || op.name == "sec") op.value = new Complex(1).Div(args[0].Cos());
        else if (["Csc", "csc", "Cosec", "cosec"].includes(op.name)) op.value = new Complex(1).Div(args[0].Sin());
        else if (["Asin", "asin", "Arcsin", "arcsin"].includes(op.name)) op.value = args[0].Asin();
        else if (["Acos", "acos", "Arccos", "arccos"].includes(op.name)) op.value = args[0].Acos();
        else if (["Atan", "atan", "Atg", "atg", "Arctan", "arctan", "Arctg", "arctg"].includes(op.name)) op.value = args[0].Atan();
        else if (["Actg", "actg", "Arcctg", "arcctg"].includes(op.name)) op.value = new Complex(1).Div(args[0]).Atan();
        else if (["Asec", "asec", "Arcsec", "arcsec"].includes(op.name)) op.value = new Complex(1).Div(args[0]).Acos();
        else if (["Acsc", "acsc", "Acosec", "acosec", "Arccsc", "arccsc", "Arccosec", "arccosec"].includes(op.name)) op.value = new Complex(1).Div(args[0]).Asin();
        else if (["Sinh", "sinh", "Sh", "sh"].includes(op.name)) op.value = args[0].Sh();
        else if (["Cosh", "cosh", "Ch", "ch"].includes(op.name)) op.value = args[0].Ch();
        else if (["Tanh", "tanh", "Tgh", "tgh", "Th", "th"].includes(op.name)) op.value = args[0].Th();
        else if (["Ctgh", "ctgh", "Cth", "cth"].includes(op.name)) op.value = new Complex(1).Div(args[0].Th());
        else if (op.name == "Sech" || op.name == "sech") op.value = new Complex(1).Div(args[0].Ch());
        else if (["Csch", "csch", "Cosech", "cosech"].includes(op.name)) op.value = new Complex(1).Div(args[0].Sh());
        else if (["Asinh", "asinh", "Arcsinh", "arcsinh", "Ash", "ash", "Arcsh", "arcsh", "Arsh", "arsh"].includes(op.name)) op.value = args[0].Ash();
        else if (["Acosh", "acosh", "Arccosh", "arccosh", "Ach", "ach", "Arcch", "arcch", "Arch", "arch"].includes(op.name)) op.value = args[0].Ach();
        else if (["Atanh", "atanh", "Atgh", "atgh", "Ath", "ath", "Arctanh", "arctanh", "Arctgh", "arctgh", "Arth", "arth"].includes(op.name)) op.value = args[0].Ath();
        else if (["Actgh", "actgh", "Arcctgh", "arcctgh", "Arctgh", "arctgh", "Arcth", "arcth", "Acth", "acth"].includes(op.name)) op.value = new Complex(1).Div(args[0]).Ath();
        else if (["Asech", "asech", "Arcsech", "arcsech", "Arsech", "arsech"].includes(op.name)) op.value = new Complex(1).Div(args[0]).Ach();
        else if (["Acsch", "acsch", "Acosech", "acosech", "Arccsch", "arccsch", "Arccosech", "arccosech", "Arcsch", "arcsch", "Arcosech", "arcosech"].includes(op.name)) op.value = new Complex(1).Div(args[0]).Ash();
        else if (op.name == "Fct" || op.name == "fct") op.value = args[0].Fct();
        else if (op.name == "Tetr" || op.name == "tetr") op.value = args[0].Tetr(args[1]);
        //Def, Itg

        op.relevance = true;
        return op.value;
    }
    else if (value[0] == 'c') return c; //!
    else if (value[0] == 'x') return new Complex(c.Re);
    else if (value[0] == 'y') return new Complex(c.Im);
    else if (value[0] == 't') return new Complex(t);
    else if (value[0] == 'p') return new Complex(Math.PI);
    else if (value[0] == 'e') return new Complex(Math.E);
    else if (value[0] == 'i') return new Complex(0, 1);
    else if (value[0] == 'r') return new Complex(c.Abs());
    else if (value[0] == 'θ') return new Complex(c.Arg());

    else return new Complex(parseFloat(value));
}

function Calculation() {
    var i = 1;
    //try {
        //для написания функции
        // i = 0 = f(x, y)
        // c.Re = x
        // c.Im = y
        i = CalculationValue(fValue).Abs(); //Sub(y; Sin(Mul(t; x)))
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

        dt = 0.025; //скорость анимации

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

        if (c.Re > sx - m / k && c.Re < sx + m / k && c.Im < -sy + m / k && c.Im > -sy - m / k) dist = i; //вывод расстояния до функции
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
        catch { return 'rgb(255, 255, 255)'; }
        else { return 'rgb(255, 255, 255)'; }
    }
}

function button1_Click() {
    mReset();
    animation = !animation;
    if(animation) timer1Interval = 70;
    else timer1Interval = 1;
}

function button4_Click() {
    //pictureBox1.style.zIndex = 1 - pictureBox1.style.zIndex;
    menu.style.transform = 'translateY(0px)'; 
}

function button5_Click() {
	let h = menu.offsetHeight;
    menu.style.transform = `translateY(${h + 30}px)`; 
}

function button7_Click() {
	groupBox1.style.transform = 'translateX(0px)';
	groupBox2.style.transform = 'translateX(0px)';
	groupBox3.style.transform = 'translateX(0px)';
	button7.style.backgroundColor = "#777777";
	button8.style.backgroundColor = "#555555";
	button9.style.backgroundColor = "#555555";
}

function button8_Click() {
	let w = groupBox1.offsetWidth;
	groupBox1.style.transform = `translateX(${-w}px)`;
	groupBox2.style.transform = `translateX(${-w}px)`;
	groupBox3.style.transform = `translateX(${-w}px)`;
	button7.style.backgroundColor = "#555555";
	button8.style.backgroundColor = "#777777";
	button9.style.backgroundColor = "#555555";
}

function button9_Click() {
	let w = groupBox1.offsetWidth;
	groupBox1.style.transform = `translateX(${-2*w}px)`;
	groupBox2.style.transform = `translateX(${-2*w}px)`;
	groupBox3.style.transform = `translateX(${-2*w}px)`;
	button7.style.backgroundColor = "#555555";
	button8.style.backgroundColor = "#555555";
	button9.style.backgroundColor = "#777777";
}

function checkBox1_Click() {
	if(checkBox1.checked) {
		controls.style.display = "none";
	} else {
		controls.style.display = "";
	}
}

function checkBox2_Click() {
	if(checkBox2.checked) {
		info.style.display = "none";
	} else {
		info.style.display = "";
	}
}

function checkBox3_Click() {
	if(checkBox3.checked) {
		button4.style.opacity = 0;
		button6.style.opacity = 0;
	} else {
		button4.style.opacity = 1;
		button6.style.opacity = 1;
	}
}


function menu_MouseDown(e) {
	const rect = e.target.getBoundingClientRect();
	Lm = e.clientY - rect.top; 
	menu.style.transitionDuration = "0s";
}

function menu_TouchDown(e) {
	const rect = e.target.getBoundingClientRect();
	Lm = e.touches[0].clientY - rect.top;
	menu.style.transitionDuration = "0s";
}

function menu_MouseMove(e) {
	const rect = e.target.getBoundingClientRect();
	var dm = e.clientY - rect.top;
	menu.style.height = `${menu.offsetHeight + Lm - dm}px`;
	if(menu.offsetHeight < 200) menu.style.height = "200px";
	if(menu.offsetHeight > window.innerHeight) menu.style.height = `${window.innerHeight}px`;
	Lm = dm;
}

function menu_TouchMove(e) {
	const rect = e.target.getBoundingClientRect();
	var dm = e.touches[0].clientY - rect.top;
	menu.style.height = `${menu.offsetHeight + Lm - dm}px`;
	if(menu.offsetHeight < 200) menu.style.height = "200px";
	if(menu.offsetHeight > window.innerHeight) menu.style.height = `${window.innerHeight}px`;
	Lm = dm;
}

function menu_MouseUp(e) {
	menu.style.transitionDuration = "0.3s";
}

function button12_Click() {
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

function checkBox4_Click() {
	displayGrid = !displayGrid;
	mReset();
}