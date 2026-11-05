export default class Keyboard {
	constructor(textarea, container, suffixId, clsEls){
		this.textarea = textarea ?? document.createElement('textarea');
		this.clsEls = clsEls ?? "";
		this.suffixId = suffixId ?? "";
		if(container != null) {
			this.container = container;
			[...Keyboard.create_keyboard(this.suffixId, this.clsEls).children].forEach(el => {this.container.appendChild(el);});
		}
		else this.container = Keyboard.create_keyboard(this.suffixId, this.clsEls);
		//container.innerHTML = Keyboard.create_keyboard(clsEls, suffixId);
		
		this.textareaFocus = false; //выделен ли textarea в текущий момент
		this.lastSelectionStart = this.textarea.value.length; //координаты курсора в textarea:
		this.lastSelectionEnd = this.textarea.value.length;
		this.showAndroidKeyboard = false; //включено ли отображение Android клавиатуры при выделении textarea
		
		this.addEvents();
	}
	
	static create_keyboard(suffixId, clsEls) {
		const keyboard = document.createElement('div'); keyboard.id = "keyboard"; keyboard.className = "keyboard"; /*/ {
			const keyTabs = document.createElement('div'); keyTabs.id = "keyTabs"; {
				const keyTabBtn1 = document.createElement('button'); keyTabBtn1.id = "keyTabBtn1"; keyTabBtn1.className = "keyTabBtn"; keyTabBtn1.textContent = "Основн."; keyTabs.appendChild(keyTabBtn1);
				const keyTabBtn2 = document.createElement('button'); keyTabBtn2.id = "keyTabBtn2"; keyTabBtn2.className = "keyTabBtn"; keyTabBtn2.textContent = "Арифм."; keyTabs.appendChild(keyTabBtn2);
				const keyTabBtn3 = document.createElement('button'); keyTabBtn3.id = "keyTabBtn3"; keyTabBtn3.className = "keyTabBtn"; keyTabBtn3.textContent = "Тригон."; keyTabs.appendChild(keyTabBtn3);
				const keyTabBtn4 = document.createElement('button'); keyTabBtn4.id = "keyTabBtn4"; keyTabBtn4.className = "keyTabBtn"; keyTabBtn4.textContent = "Доп. зн."; keyTabs.appendChild(keyTabBtn4);
			} keyboard.appendChild(keyTabs);
			
			const keyboardSlider = document.createElement('div'); keyboardSlider.id = "keyboardSlider"; {
				const keyGroupBox1 = document.createElement('div'); keyGroupBox1.id = "keyGroupBox1"; keyGroupBox1.className = "keySlide"; { //<!-- Основн. -->
					const keyRow1 = document.createElement('div'); keyRow1.className = "keyRow keyRow1"; {
						const btnDot = document.createElement('button'); btnDot.id = "btnDot"; btnDot.className = "keyButton keyButton1 keyBtnSym"; btnDot.textContent = "."; keyRow1.appendChild(btnDot);
						const btn0 = document.createElement('button'); btn0.id = "btn0"; btn0.className = "keyButton keyButton1 keyBtnSym"; btn0.textContent = "0"; keyRow1.appendChild(btn0);
						const btn1 = document.createElement('button'); btn1.id = "btn1"; btn1.className = "keyButton keyButton1 keyBtnSym"; btn1.textContent = "1"; keyRow1.appendChild(btn1);
					} keyGroupBox1.appendChild(keyRow1);
				} keyboardSlider.appendChild(keyGroupBox1);
			} keyboard.appendChild(keyboardSlider);
		}
		/*/
    	keyboard.innerHTML = `
    		<div id="keyTabs">
                <button id="keyTabBtn1" class="keyTabBtn">Основн.</button>
                <button id="keyTabBtn2" class="keyTabBtn">Арифм.</button>
                <button id="keyTabBtn3" class="keyTabBtn">Тригон.</button>
                <!--<button id="keyTabBtn4" class="keyTabBtn">Гиперб.</button>-->
                <button id="keyTabBtn4" class="keyTabBtn">Доп. зн.</button>
            </div>
            
            <div id="keyboardSlider" class="keyboardSlider">
                <div id="keyGroupBox1" class="keySlide"> <!-- Основн. -->
                    <div class="keyRow keyRow1">
                        <button id="btnDot" class="keyButton keyButton1 keyBtnSym">.</button>
                        <button id="btn0" class="keyButton keyButton1 keyBtnSym">0</button>
                        <button id="btn1" class="keyButton keyButton1 keyBtnSym">1</button>
                        <button id="btn2" class="keyButton keyButton1 keyBtnSym">2</button>
                        <button id="btn3" class="keyButton keyButton1 keyBtnSym">3</button>
                        <button id="btn4" class="keyButton keyButton1 keyBtnSym">4</button>
                        <button id="btn5" class="keyButton keyButton1 keyBtnSym">5</button>
                        <button id="btn6" class="keyButton keyButton1 keyBtnSym">6</button>
                        <button id="btn7" class="keyButton keyButton1 keyBtnSym">7</button>
                        <button id="btn8" class="keyButton keyButton1 keyBtnSym">8</button>
                        <button id="btn9" class="keyButton keyButton1 keyBtnSym">9</button>
                        <button id="btnSemicolon" class="keyButton keyButton1 keyBtnSym">;</button>
                    </div><div class="keyRow keyRow1">
                        <button id="btnPlus" class="keyButton keyButton1 keyBtnSym">+</button>
                        <button id="btnMinus" class="keyButton keyButton1 keyBtnSym">–</button>
                        <button id="btnMul" class="keyButton keyButton1 keyBtnSym">×</button>
                        <button id="btnDiv" class="keyButton keyButton1 keyBtnSym">÷</button>
                        <button id="btnPow" class="keyButton keyButton1 keyBtnSym">^</button>
                        <button id="btnFct" class="keyButton keyButton1 keyBtnSym">!</button>
                        <button id="btnLes" class="keyButton keyButton1 keyBtnSym"><</button>
                        <button id="btnEq" class="keyButton keyButton1 keyBtnSym">=</button>
                        <button id="btnLar" class="keyButton keyButton1 keyBtnSym">></button>
                        <button id="btnNot" class="keyButton keyButton1 keyBtnSym">¬</button>
                        <button id="btnAnd" class="keyButton keyButton1 keyBtnSym">∧</button>
                        <button id="btnOr" class="keyButton keyButton1 keyBtnSym">∨</button>
                    </div><div class="keyRow keyRow1">
                        <button id="btnOp" class="keyButton keyButton1 keyBtnSym">(</button>
                        <button id="btnCls" class="keyButton keyButton1 keyBtnSym">)</button>
                        <button id="btnRoot" class="keyButton keyButton1 keyBtnSym">√</button>
                        <button id="btnMod" class="keyButton keyButton1 keyBtnSym">%</button>
                        <button id="btnGmod" class="keyButton keyButton1 keyBtnSym">g%</button>
                        <button id="btnCeilOp" class="keyButton keyButton1 keyBtnSym">⌈</button>
                        <button id="btnCeilCls" class="keyButton keyButton1 keyBtnSym">⌉</button>
                        <button id="btnRoundOp" class="keyButton keyButton1 keyBtnSym">[</button>
                        <button id="btnRoundCls" class="keyButton keyButton1 keyBtnSym">]</button>
                        <button id="btnFloorOp" class="keyButton keyButton1 keyBtnSym">⌊</button>
                        <button id="btnFloorCls" class="keyButton keyButton1 keyBtnSym">⌋</button>
                        <button id="btnAbs" class="keyButton keyButton1 keyBtnSym">|</button>
                    </div><div class="keyRow keyRow1">
                        <button id="btnDelete" class="keyButtonsSpecial">⌦</button>
                        <button id="btnX" class="keyButton keyButton1 keyBtnSym">x</button>
                        <button id="btnY" class="keyButton keyButton1 keyBtnSym">y</button>
                        <button id="btnC" class="keyButton keyButton1 keyBtnSym">c</button>
                        <button id="btnR" class="keyButton keyButton1 keyBtnSym">r</button>
                        <button id="btnTeta" class="keyButton keyButton1 keyBtnSym">θ</button>
                        <button id="btnT" class="keyButton keyButton1 keyBtnSym">t</button>
                        <button id="btnPi" class="keyButton keyButton1 keyBtnSym">π</button>
                        <button id="btnE" class="keyButton keyButton1 keyBtnSym">e</button>
                        <button id="btnI" class="keyButton keyButton1 keyBtnSym">i</button>
                        <button id="btnInfinity" class="keyButton keyButton1 keyBtnSym">∞</button>
                        <button id="btnBackSpace" class="keyButtonsSpecial">⌫</button>
                    </div><div class="keyRow keyRow1">
                        <button id="btnKeyboard" class="keyButtonsSpecial">⌨</button>
                        <button id="btnLeft" class="keyButtonsSpecial">‹</button>
                        <button id="btnSpace" class="keyButtonsSpecial">␣</button>
                        <button id="btnRight" class="keyButtonsSpecial">›</button>
                        <button id="btnEnter" class="keyButtonsSpecial">↵</button>
                    </div> <!-- keyRow -->
                </div> <!-- keyGroupBox1 -->
                
                <div id="keyGroupBox2" class="keySlide"> <!-- Арифм. -->
                    <div class="keyRow keyRow2">
                        <button id="btnRoot" class="keyButton keyButton2 keyBtnFuc2">root</button>
                        <button id="btnMin" class="keyButton keyButton2 keyBtnFuc2">min</button>
                        <button id="btnRe" class="keyButton keyButton2 keyBtnFuc1">Re</button>
                    </div><div class="keyRow keyRow2">
                        <button id="btnLn" class="keyButton keyButton2 keyBtnFuc1">ln</button>
                        <button id="btnMax" class="keyButton keyButton2 keyBtnFuc2">max</button>
                        <button id="btnIm" class="keyButton keyButton2 keyBtnFuc1">Im</button>
                    </div><div class="keyRow keyRow2">
                        <button id="btnLg" class="keyButton keyButton2 keyBtnFuc1">lg</button>
                        <button id="btnSgn" class="keyButton keyButton2 keyBtnFuc1">sign</button>
                        <button id="btnConj" class="keyButton keyButton2 keyBtnFuc1">conj</button>
                    </div><div class="keyRow keyRow2">
                        <button id="btnLog" class="keyButton keyButton2 keyBtnFuc2">log</button>
                        <button id="btnLcm" class="keyButton keyButton2 keyBtnFuc2">lcm</button>
                        <button id="btnArg" class="keyButton keyButton2 keyBtnFuc1">arg</button>
                    </div><div class="keyRow keyRow2">
                        <button id="btnTetr" class="keyButton keyButton2 keyBtnFuc2">tetr</button>
                        <button id="btnGcd" class="keyButton keyButton2 keyBtnFuc2">gcd</button>
                        <button id="btnDrct" class="keyButton keyButton2 keyBtnFuc1">expi</button>
                    </div> <!-- keyRow -->
                </div> <!-- keyGroupBox2 -->
                
                <div id="keyGroupBox3" class="keySlide"> <!-- Тригон. -->
                    <div class="keyRow keyRow3">
                        <button id="btnSin" class="keyButton keyButton3 keyBtnFuc1">sin</button>
                        <button id="btnAsin" class="keyButton keyButton3 keyBtnFuc1">arcsin</button>
                        <button id="btnSh" class="keyButton keyButton3 keyBtnFuc1">sinh</button>
                        <button id="btnAsh" class="keyButton keyButton3 keyBtnFuc1">arcsinh</button>
                    </div><div class="keyRow keyRow3">
                        <button id="btnCos" class="keyButton keyButton3 keyBtnFuc1">cos</button>
                        <button id="btnAcos" class="keyButton keyButton3 keyBtnFuc1">arccos</button>
                        <button id="btnCh" class="keyButton keyButton3 keyBtnFuc1">cosh</button>
                        <button id="btnAch" class="keyButton keyButton3 keyBtnFuc1">arccosh</button>
                    </div><div class="keyRow keyRow3">
                        <button id="btnTan" class="keyButton keyButton3 keyBtnFuc1">tan</button>
                        <button id="btnAtan" class="keyButton keyButton3 keyBtnFuc1">arctan</button>
                        <button id="btnTh" class="keyButton keyButton3 keyBtnFuc1">tanh</button>
                        <button id="btnAth" class="keyButton keyButton3 keyBtnFuc1">arctanh</button>
                    </div><div class="keyRow keyRow3">
                         <button id="btnCtg" class="keyButton keyButton3 keyBtnFuc1">ctg</button>
                         <button id="btnActg" class="keyButton keyButton3 keyBtnFuc1">arcctg</button>
                        <button id="btnCth" class="keyButton keyButton3 keyBtnFuc1">ctgh</button>
                        <button id="btnActh" class="keyButton keyButton3 keyBtnFuc1">arcctgh</button>
                    </div><div class="keyRow keyRow3">
                        <button id="btnSec" class="keyButton keyButton3 keyBtnFuc1">sec</button>
                        <button id="btnAsec" class="keyButton keyButton3 keyBtnFuc1">arcsec</button>
                        <button id="btnSech" class="keyButton keyButton3 keyBtnFuc1">sech</button>
                        <button id="btnAsech" class="keyButton keyButton3 keyBtnFuc1">arcsech</button>
                    </div><div class="keyRow keyRow3">
                        <button id="btnCsc" class="keyButton keyButton3 keyBtnFuc1">csc</button>
                        <button id="btnAcsc" class="keyButton keyButton3 keyBtnFuc1">arccsc</button>
                        <button id="btnCsch" class="keyButton keyButton3 keyBtnFuc1">csch</button>
                        <button id="btnAcsch" class="keyButton keyButton3 keyBtnFuc1">arccsch</button>
                    </div> <!-- keyRow -->
                </div> <!-- keyGroupBox3 -->
                
                <div id="keyGroupBox4" class="keySlide"> <!-- Гиперб. -->
                    <div class="keyRow keyRow4">
                        <button id="btnAndFunc" class="keyButton keyButton4 keyBtnFuc2">and</button>
                        <button id="btnOrFunc" class="keyButton keyButton4 keyBtnFuc2">or</button>
                        <button id="btnUeq" class="keyButton keyButton4 keyBtnSym">⇔</button>
                        <button id="btnMulD" class="keyButton keyButton4 keyBtnSym">·</button>
                        <button id="btnComplex" class="keyButton keyButton4 keyBtnFuc2">Complex</button>
                    </div><div class="keyRow keyRow4">
                        <button id="btnLesEq" class="keyButton keyButton4 keyBtnSym">≤</button>
                        <button id="btnLarEq" class="keyButton keyButton4 keyBtnSym">≥</button>
                        <button id="btnDivd" class="keyButton keyButton4 keyBtnSym">⋮</button>
                        <button id="btnTrue" class="keyButton keyButton4 keyBtnSym">⊤</button>
                        <button id="btnFalse" class="keyButton keyButton4 keyBtnSym">⊥</button>
                    </div><div class="keyRow keyRow4">
                        <button id="btnDeq" class="keyButton keyButton4 keyBtnSym">↔</button>
                        <button id="btnSumFunc" class="keyButton keyButton4 keyBtnFuc2">sum</button>
                        <button id="btnMulFunc" class="keyButton keyButton4 keyBtnFuc2">mul</button>
                        <button id="btnModFunc" class="keyButton keyButton4 keyBtnFuc2">mod</button>
                        <button id="btnGmodFunc" class="keyButton keyButton4 keyBtnFuc2">gmod</button>
                    </div><div class="keyRow keyRow4">
                        <button id="btnExp" class="keyButton keyButton4 keyBtnFuc1">exp</button>
                        <button id="btnSqrtFunc" class="keyButton keyButton4 keyBtnFuc1">sqrt</button>
                        <button id="btnEqFunc" class="keyButton keyButton4 keyBtnFuc2">eq</button>
                        <button id="btnNaN" class="keyButton keyButton4 keyBtnSym">NaN</button>
                        <button id="btnSharp" class="keyButton keyButton4 keyBtnSym">#</button>
                    </div> <!-- keyRow -->
                </div> <!-- keyGroupBox4 -->
                
                <!--<div id="keyGroupBox5" class="keySlide"> <!-- Доп. зн. - ->
                    <div class="keyRow keyRow5">
                    </div><div class="keyRow keyRow5">
                    </div> <!-- keyRow - ->
                </div> <!-- keyGroupBox5 - -> -->
            </div> <!-- keyboardSlider -->
    	`; /**/
    	
    	return keyboard;
    }
	
	addEvents() {
		const keyBtnSym = this.container.querySelectorAll('.keyBtnSym'); //кнопки ввода знака на клавиатуре
		const btnBackSpace = this.container.querySelector('#btnBackSpace'); //кнопка стерания слева на клавиатуре 
		const btnDelete = this.container.querySelector('#btnDelete'); //кнопка стерания справа на клавиатуре 
		const btnSpace = this.container.querySelector('#btnSpace'); //кнопка пробела на клавиатуре 
		const btnEnter = this.container.querySelector('#btnEnter'); //кнопка переноса строки на клавиатуре 
		const btnLeft = this.container.querySelector('#btnLeft'); //кнопка сдвига курсора влево на клавиатуре 
		const btnRight = this.container.querySelector('#btnRight'); //кнопка сдвига курсора вправо на клавиатуре 
		const btnKeyboard = this.container.querySelector('#btnKeyboard'); //кнопка показа/скрытия Android клавиатуры на клавиатуре 
		const keyTabBtn1 = this.container.querySelector('#keyTabBtn1'); //кнопка переключения на вкладку "Основн." на клавиатуре
		const keyTabBtn2 = this.container.querySelector('#keyTabBtn2'); //кнопка переключения на вкладку "Арифм." на клавиатуре
		const keyTabBtn3 = this.container.querySelector('#keyTabBtn3'); //кнопка переключения на вкладку "Тригон." на клавиатуре
		const keyTabBtn4 = this.container.querySelector('#keyTabBtn4'); //кнопка переключения на вкладку "Доп. зн." на клавиатуре
		//const keyTabBtn5 = document.getElementById('keyTabBtn5');
		const keyGroupBox1 = this.container.querySelector('#keyGroupBox1'); //вкладка "Основн." на клавиатуре
		const keySlide = this.container.querySelectorAll('.keySlide'); //список вкладок клавиатуры
		const keyBtnFuc1 = this.container.querySelectorAll('.keyBtnFuc1'); //кнопки ввода одноаргументной функции на клавиатуре
		const keyBtnFuc2 = this.container.querySelectorAll('.keyBtnFuc2'); //кнопки ввода двухаргументной функции на клавиатуре
		
		this.textarea.addEventListener('blur', () => {requestAnimationFrame(() => {this.textareaFocus = false;}); this.lastSelectionStart = this.textarea.selectionStart; this.lastSelectionEnd = this.textarea.selectionEnd; /*textarea.this.showAndroidKeyboardPolicy = 'manual';*/});
		this.textarea.addEventListener('focus', () => {requestAnimationFrame(() => {this.textareaFocus = true;}); this.textarea.setSelectionRange(this.lastSelectionStart, this.lastSelectionEnd);});
		keyBtnSym.forEach(kBtn => {kBtn.addEventListener('click', (e) => {this.keyBtnSym_Click(e);});});
		btnBackSpace.addEventListener('click', () => {this.btnBackSpace_Click();});
		btnDelete.addEventListener('click', () => {this.btnDelete_Click();});
		btnSpace.addEventListener('click', () => {this.btnSpace_Click();});
		btnEnter.addEventListener('click', () => {this.btnEnter_Click();});
		btnLeft.addEventListener('click', () => {this.btnLeft_Click();});
		btnRight.addEventListener('click', () => {this.btnRight_Click();});
		btnKeyboard.addEventListener('click', () => {this.btnKeyboard_Click();});
		keyTabBtn1.addEventListener('click', () => {this.keyTabBtn1_Click();});
		keyTabBtn2.addEventListener('click', () => {this.keyTabBtn2_Click();});
		keyTabBtn3.addEventListener('click', () => {this.keyTabBtn3_Click();});
		keyTabBtn4.addEventListener('click', () => {this.keyTabBtn4_Click();});
		//keyTabBtn5.addEventListener('click', () => {keyTabBtn5_Click();});
		keyBtnFuc1.forEach(kBtn => {kBtn.addEventListener('click', (e) => {this.keyBtnFuc1_Click(e);});});
		keyBtnFuc2.forEach(kBtn => {kBtn.addEventListener('click', (e) => {this.keyBtnFuc2_Click(e);});});
	}
    
    keyBtnSym_Click(e) { //нажатие на кнопку ввода знака на клавиатуре
		/*if(this.textareaFocus) {
			this.lastSelectionStart = textarea.selectionStart;
			this.lastSelectionEnd = textarea.selectionEnd;
		}*/
		const btn = e.currentTarget;
		var str = this.textarea.value;
		var str1 = "";
		for(let i = 0; i < this.lastSelectionStart; i++) str1 += String(str[i]);
		str1 += String(btn.textContent);
		for(let i = this.lastSelectionEnd; i < str.length; i++) str1 += String(str[i]);
		this.textarea.value = str1;
		this.lastSelectionEnd = this.lastSelectionStart += btn.textContent.length;
		this.textarea.focus();
	}
	
	btnBackSpace_Click() { //нажатие на кнопку стерания слева на клавиатуре
		var str = this.textarea.value;
		var str1 = "";
		if(this.lastSelectionStart == this.lastSelectionEnd) {
			for(let i = 0; i < this.lastSelectionStart - 1; i++) str1 += String(str[i]);
			for(let i = this.lastSelectionEnd; i < str.length; i++) str1 += String(str[i]);
			if(this.lastSelectionStart - 1 >= 0) this.lastSelectionEnd = --this.lastSelectionStart;
		} else {
			for(let i = 0; i < this.lastSelectionStart; i++) str1 += String(str[i]);
			for(let i = this.lastSelectionEnd; i < str.length; i++) str1 += String(str[i]);
			this.lastSelectionEnd = this.lastSelectionStart;
		}
		this.textarea.value = str1;
		this.textarea.focus();
	}
	
	btnDelete_Click() { //нажатие на кнопку стерания справа на клавиатуре
		var str = this.textarea.value;
		var str1 = "";
		if(this.lastSelectionStart == this.lastSelectionEnd) {
			for(let i = 0; i < this.lastSelectionStart; i++) str1 += String(str[i]);
			for(let i = this.lastSelectionEnd + 1; i < str.length; i++) str1 += String(str[i]);
			this.lastSelectionEnd = this.lastSelectionStart;
		} else {
			for(let i = 0; i < this.lastSelectionStart; i++) str1 += String(str[i]);
			for(let i = this.lastSelectionEnd; i < str.length; i++) str1 += String(str[i]);
			this.lastSelectionEnd = this.lastSelectionStart;
		}
		this.textarea.value = str1;
		this.textarea.focus();
	}
	
	btnSpace_Click() { //нажатие на кнопку пробела на клавиатуре
		var str = this.textarea.value;
		var str1 = "";
		for(let i = 0; i < this.lastSelectionStart; i++) str1 += String(str[i]);
		str1 += " ";
		for(let i = this.lastSelectionEnd; i < str.length; i++) str1 += String(str[i]);
		this.textarea.value = str1;
		this.lastSelectionEnd = ++this.lastSelectionStart;
		this.textarea.focus();
	}
	
	btnEnter_Click() { //нажатие на кнопку переноса строки на клавиатуре
		var str = this.textarea.value;
		var str1 = "";
		for(let i = 0; i < this.lastSelectionStart; i++) str1 += String(str[i]);
		str1 += "\n";
		for(let i = this.lastSelectionEnd; i < str.length; i++) str1 += String(str[i]);
		this.textarea.value = str1;
		this.lastSelectionEnd = ++this.lastSelectionStart;
		this.textarea.focus();
	}
	
	btnLeft_Click() { //нажатие на кнопку сдвига курсора влево на клавиатуре
		if(this.lastSelectionEnd-1 >= 0) this.lastSelectionStart = --this.lastSelectionEnd;
		this.textarea.focus();
	}
	
	btnRight_Click() { //нажатие на кнопку сдвига курсора вправо на клавиатуре
		if(this.lastSelectionEnd+1 <= this.textarea.value.length) this.lastSelectionStart = ++this.lastSelectionEnd;
		this.textarea.focus();
	}
	
	btnKeyboard_Click() { //нажатие на кнопку показа/скрытия Android клавиатуры на клавиатуре
		if(this.showAndroidKeyboard) {
			this.textarea.blur();
			this.textarea.virtualKeyboardPolicy = 'manual';
			requestAnimationFrame(() => {this.textarea.focus();});
			navigator.virtualKeyboard?.hide();
		} else {
			this.textarea.blur();
			this.textarea.virtualKeyboardPolicy = 'auto';
			requestAnimationFrame(() => {this.textarea.focus();});
			navigator.virtualKeyboard?.show();
		}
		this.showAndroidKeyboard = !this.showAndroidKeyboard;
	}
	
	/*for (const type of [    //проверка событий нажатия
	    'beforeinput',
	    'input',
	    'compositionstart',
	    'compositionupdate',
	    'compositionend'
	]) {
	    textarea.addEventListener(type, e => {
	        console.log(type, {
	            data: e.data,
	            value: textarea.value,
	            composing: e.isComposing
	        });
	    });
	}*/
	
	keyTabBtn1_Click() { //нажатие на кнопку "Основн."
	    const keySlide = this.container.querySelectorAll('.keySlide');
	    const keyTabBtn1 = this.container.querySelector('#keyTabBtn1');
	    const keyGroupBox1 = this.container.querySelector('#keyGroupBox1');
		if(this.textareaFocus) this.textarea.focus();
		document.querySelectorAll('.keyTabBtn').forEach(ktb => {ktb.style.backgroundColor = "#666666";});
		keyTabBtn1.style.backgroundColor = "#444444";
		let h = keyGroupBox1.offsetHeight;
		keySlide.forEach(kgb => {kgb.style.transform = `translateY(${-0*h}px)`;});
	}
	
	keyTabBtn2_Click() { //нажатие на кнопку "Арифм."
	    const keySlide = this.container.querySelectorAll('.keySlide');
	    const keyTabBtn2 = this.container.querySelector('#keyTabBtn2'); 
	    const keyGroupBox1 = this.container.querySelector('#keyGroupBox1');
		if(this.textareaFocus) this.textarea.focus();
		document.querySelectorAll('.keyTabBtn').forEach(ktb => {ktb.style.backgroundColor = "#666666";});
		keyTabBtn2.style.backgroundColor = "#444444";
		let h = keyGroupBox1.offsetHeight;
		keySlide.forEach(kgb => {kgb.style.transform = `translateY(${-1*h}px)`;});
	}
	
	keyTabBtn3_Click() { //нажатие на кнопку "Тригон."
	    const keySlide = this.container.querySelectorAll('.keySlide');
	    const keyTabBtn3 = this.container.querySelector('#keyTabBtn3');
	    const keyGroupBox1 = this.container.querySelector('#keyGroupBox1');
		if(this.textareaFocus) this.textarea.focus();
		document.querySelectorAll('.keyTabBtn').forEach(ktb => {ktb.style.backgroundColor = "#666666";});
		keyTabBtn3.style.backgroundColor = "#444444";
		let h = keyGroupBox1.offsetHeight;
		keySlide.forEach(kgb => {kgb.style.transform = `translateY(${-2*h}px)`;});
	}
	
	keyTabBtn4_Click() { //нажатие на кнопку "Доп. зн."
	    const keySlide = this.container.querySelectorAll('.keySlide');
	    const keyTabBtn4 = this.container.querySelector('#keyTabBtn4');
	    const keyGroupBox1 = this.container.querySelector('#keyGroupBox1');
		if(this.textareaFocus) this.textarea.focus();
		document.querySelectorAll('.keyTabBtn').forEach(ktb => {ktb.style.backgroundColor = "#666666";});
		keyTabBtn4.style.backgroundColor = "#444444";
		let h = keyGroupBox1.offsetHeight;
		keySlide.forEach(kgb => {kgb.style.transform = `translateY(${-3*h}px)`;});
	}
	
	/*function keyTabBtn5_Click() {
		this.textarea.focus();
		document.querySelectorAll('.keyTabBtn').forEach(ktb => {ktb.style.backgroundColor = "#666666";});
		keyTabBtn5.style.backgroundColor = "#444444";
		let h = keyGroupBox1.offsetHeight;
		keySlide.forEach(kgb => {kgb.style.transform = `translateY(${-4*h}px)`;});
	}*/
	
	keyBtnFuc1_Click(e) { //нажатие на кнопку ввода одноаргументной функции на клавиатуре
		const btn = e.currentTarget;
		var str = this.textarea.value;
		var str1 = "";
		if(this.lastSelectionEnd == this.lastSelectionStart) {
			for(let i = 0; i < this.lastSelectionStart; i++) str1 += String(str[i]);
			str1 += String(btn.textContent) + "()";
			for(let i = this.lastSelectionEnd; i < str.length; i++) str1 += String(str[i]);
			this.lastSelectionEnd = this.lastSelectionStart += btn.textContent.length+1;
		} else {
			for(let i = 0; i < this.lastSelectionStart; i++) str1 += String(str[i]);
			str1 += String(btn.textContent) + "(";
			let j = 0;
			for(let i = this.lastSelectionStart; i < this.lastSelectionEnd; i++, j++) str1 += String(str[i]);
			str1 += ")";
			for(let i = this.lastSelectionEnd; i < str.length; i++) str1 += String(str[i]);
			this.lastSelectionEnd = this.lastSelectionStart += btn.textContent.length+2+j;
		}
		this.textarea.value = str1;
		this.textarea.focus();
	}
	
	keyBtnFuc2_Click(e) { //нажатие на кнопку ввода двухаргументной функции на клавиатуре
		const btn = e.currentTarget;
		var str = this.textarea.value;
		var str1 = "";
		if(this.lastSelectionEnd == this.lastSelectionStart) {
			for(let i = 0; i < this.lastSelectionStart; i++) str1 += String(str[i]);
			str1 += String(btn.textContent) + "(; )";
			for(let i = this.lastSelectionEnd; i < str.length; i++) str1 += String(str[i]);
			this.lastSelectionEnd = this.lastSelectionStart += btn.textContent.length+1;
		} else {
			for(let i = 0; i < this.lastSelectionStart; i++) str1 += String(str[i]);
			str1 += String(btn.textContent) + "(";
			let j = 0;
			for(let i = this.lastSelectionStart; i < this.lastSelectionEnd; i++, j++) str1 += String(str[i]);
			str1 += "; )";
			for(let i = this.lastSelectionEnd; i < str.length; i++) str1 += String(str[i]);
			this.lastSelectionEnd = this.lastSelectionStart += btn.textContent.length+3+j;
		}
		this.textarea.value = str1;
		this.textarea.focus();
	}
}