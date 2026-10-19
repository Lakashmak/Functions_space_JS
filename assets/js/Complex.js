export default class Complex {
    constructor(Re, Im) {
        if (arguments.length === 1 && typeof Re === 'object') { // Если передан объект Complex
            this.Re = Re.Re;
            this.Im = Re.Im;
        } else if (arguments.length === 2) { // Если переданы два числа
            this.Re = Re;
            this.Im = Im;
        } else if (arguments.length === 1 && typeof Re === 'number') { // Если передано одно число
            this.Re = Re;
            this.Im = 0;
        } else {
            throw new Error('Invalid arguments');
        }
    }

    Round() { return new Complex(Math.round(this.Re), Math.round(this.Im)); } 
    static Round(a) {
        if(typeof a == "number") {
            return Math.round(a);
        } else if (a instanceof Complex) {
            return new Complex(Math.round(a.Re), Math.round(a.Im));
        }
    }

    Uround() { return new Complex(Math.ceil(this.Re), Math.ceil(this.Im)); }
    static Uround(a) {
        if(typeof a == "number") {
            return Math.ceil(a);
        } else if (a instanceof Complex) {
            return new Complex(Math.ceil(a.Re), Math.ceil(a.Im));
        }
    }

    Dround() { return new Complex(Math.floor(this.Re), Math.floor(this.Im)); }
    static Dround(a) {
        if(typeof a == "number") {
            return Math.floor(a);
        } else if (a instanceof Complex) {
            return new Complex(Math.floor(a.Re), Math.floor(a.Im));
        }
    }

    Abs() { return Complex.Abs(this); /*Math.sqrt(this.Re * this.Re + this.Im * this.Im);*/ }
    static Abs(a) { // |z| модуль (абсолютное значение)
        if (typeof a === 'number') {
            return Math.abs(a);
        } else if (a instanceof Complex) {
        	if(a.Re == Infinity || a.Re == -Infinity || a.Im == Infinity || a.Im == -Infinity) return Infinity;
            return Math.sqrt(a.Re * a.Re + a.Im * a.Im);
        }
        throw new Error('Invalid argument');
    }

    Sign() { // sign(z) направление
        if (this.Re === 0 && this.Im === 0) return new Complex(1);
        else if(this.Re == Infinity && Complex.Abs(this.Im) != Infinity) return new Complex(1);
        else if(this.Re == Infinity && this.Im == Infinity) return new Complex(1, 1).Sign();
        else if(this.Im == Infinity && Complex.Abs(this.Re) != Infinity) return new Complex(0, 1);
        else if(this.Re == -Infinity && this.Im == Infinity) return new Complex(-1, 1).Sign();
        else if(this.Re == -Infinity && Complex.Abs(this.Im) != Infinity) return new Complex(-1);
        else if(this.Re == -Infinity && this.Im == -Infinity) return new Complex(-1, -1).Sign();
        else if(this.Im == -Infinity && Complex.Abs(this.Re) != Infinity) return new Complex(0, -1);
        else if(this.Re == Infinity && this.Im == -Infinity) return new Complex(1, -1).Sign();
        else return new Complex(this.Re, this.Im).Div(new Complex(this.Re, this.Im).Abs());
    }

    static Sign(a) { // sign(z) направление
        if (typeof a === 'number') {
            return a === 0 ? 1 : Math.sign(a);
        } else if (a instanceof Complex) {
            if (a.Re === 0 && a.Im === 0) return new Complex(1);
            else if(a.Re == Infinity && Complex.Abs(a.Im) != Infinity) return new Complex(1);
            else if(a.Re == Infinity && a.Im == Infinity) return new Complex(1, 1).Sign();
            else if(a.Im == Infinity && Complex.Abs(a.Re) != Infinity) return new Complex(0, 1);
            else if(a.Re == -Infinity && a.Im == Infinity) return new Complex(-1, 1).Sign();
            else if(a.Re == -Infinity && Complex.Abs(a.Im) != Infinity) return new Complex(-1);
            else if(a.Re == -Infinity && a.Im == -Infinity) return new Complex(-1, -1).Sign();
            else if(a.Im == -Infinity && Complex.Abs(a.Re) != Infinity) return new Complex(0, -1);
            else if(a.Re == Infinity && a.Im == -Infinity) return new Complex(1, -1).Sign();
            else return a.Div(a.Abs());
        }
        throw new Error('Invalid argument');
    }

    Conj() { // conj(z) комплексносопряжённое (Re(z) - Im(z))
        return new Complex(this.Re, -this.Im);
    }

    static Conj(a) { // conj(z) комплексносопряжённое (Re(z) - Im(z))
        if (typeof a === 'number') {
            return new Complex(a);
        } else if (a instanceof Complex) {
            return new Complex(a.Re, -a.Im);
        }
        throw new Error('Invalid argument');
    }

    Sum(b) { // + сложение
        if (typeof b === 'number') {
            return new Complex((this.Re + b), this.Im);
        } else if (b instanceof Complex) {
            return new Complex((this.Re + b.Re), (this.Im + b.Im));
        }
        throw new Error('Invalid argument');
    }

    static Sum(a, b) { // + сложение
        if (typeof a === 'number' && typeof b === 'number') {
            return a + b;
        } else if (a instanceof Complex && typeof b === 'number') {
            return new Complex((a.Re + b), a.Im);
        } else if (typeof a === 'number' && b instanceof Complex) {
            return new Complex((a + b.Re), b.Im);
        } else if (a instanceof Complex && b instanceof Complex) {
            return new Complex((a.Re + b.Re), (a.Im + b.Im));
        }
        throw new Error('Invalid arguments');
    }

    Sub(b) { // - вычитание
        if (typeof b === 'number') {
            return new Complex((this.Re - b), this.Im);
        } else if (b instanceof Complex) {
            return new Complex((this.Re - b.Re), (this.Im - b.Im));
        }
        throw new Error('Invalid argument');
    }

    static Sub(a, b) { // - вычитание
        if (typeof a === 'number' && typeof b === 'number') {
            return a - b;
        } else if (a instanceof Complex && typeof b === 'number') {
            return new Complex((a.Re - b), a.Im);
        } else if (typeof a === 'number' && b instanceof Complex) {
            return new Complex((a - b.Re), -b.Im);
        } else if (a instanceof Complex && b instanceof Complex) {
            return new Complex((a.Re - b.Re), (a.Im - b.Im));
        }
        throw new Error('Invalid arguments');
    }

    Mul(b) { // * умножение
        if (typeof b === 'number') {
            return new Complex((this.Re * b), (this.Im * b));
        } else if (b instanceof Complex) {
            return new Complex((this.Re * b.Re - this.Im * b.Im), (this.Re * b.Im + this.Im * b.Re));
        }
        throw new Error('Invalid argument');
    }
    
    static Mul(a, b) { // * умножение
        if (typeof a === 'number' && typeof b === 'number') {
            return a * b;
        } else if (a instanceof Complex && typeof b === 'number') {
            return new Complex((a.Re * b), (a.Im * b));
        } else if (typeof a === 'number' && b instanceof Complex) {
            return new Complex((a * b.Re), (a * b.Im));
        } else if (a instanceof Complex && b instanceof Complex) {
            return new Complex((a.Re * b.Re - a.Im * b.Im), (a.Re * b.Im + a.Im * b.Re));
        }
        throw new Error('Invalid arguments');
    }

    Div(b) { // / деление
        if (typeof b === 'number') {
            return new Complex((this.Re / b), (this.Im / b));
        } else if (b instanceof Complex) {
            let c = this.Mul(b.Conj()); if(b.Re == 0 && b.Im == 0) c = new Complex(this);
            let denominator = (b.Re * b.Re + b.Im * b.Im);
            if(b.Re == Infinity || b.Re == -Infinity || b.Im == Infinity || b.Im == -Infinity) {
            	if(this.Re == Infinity || this.Re == -Infinity || this.Im == Infinity || this.Im == -Infinity) return new Complex(NaN); //denominator = Infinity; //!
                else return new Complex(0);
            }
            return new Complex((c.Re / denominator), (c.Im / denominator));
        }
        throw new Error('Invalid argument');
    }

    static Div(a, b) { // / деление
        if (typeof a === 'number' && typeof b === 'number') {
            return a / b;
        } else if (a instanceof Complex && typeof b === 'number') {
            return new Complex((a.Re / b), (a.Im / b));
        } else if (typeof a === 'number' && b instanceof Complex) {
            let c = b.Conj().Mul(a); if(b.Re == 0 && b.Im == 0) c = a;
            let denominator = (b.Re * b.Re + b.Im * b.Im);
            if(b.Re == Infinity || b.Re == -Infinity || b.Im == Infinity || b.Im == -Infinity) {
            	if(a == Infinity || a == -Infinity) return new Complex(NaN); //denominator = Infinity; //!
                else return new Complex(0);
            }
            return new Complex(c.Re / denominator, c.Im / denominator);
        } else if (a instanceof Complex && b instanceof Complex) {
            let c = a.Mul(b.Conj()); if(b.Re == 0 && b.Im == 0) c = a;
            let denominator = (b.Re * b.Re + b.Im * b.Im);
            if(b.Re == Infinity || b.Re == -Infinity || b.Im == Infinity || b.Im == -Infinity) {
            	if(a.Re == Infinity || a.Re == -Infinity || a.Im == Infinity || a.Im == -Infinity) return new Complex(NaN); //denominator = Infinity; //!
                else return new Complex(0);
            }
            return new Complex((c.Re / denominator), (c.Im / denominator));
        }
        throw new Error('Invalid arguments');
    }

    Mod(b) { return Complex.Mod(this, b);/*this.Sub(Complex.Dround(this.Div(b)).Mul(b));*/ }
    static Mod(a, b) {
        if(typeof a == "number" && typeof b == "number") {
        	if(Complex.Abs(a) == Infinity) return 0;
            b = Math.abs(b);
            if(a >= 0) return a % b;
            let c = b - ((-a) % b); if(c == b) c = 0;
            else return c;
        } else if (a instanceof Complex || b instanceof Complex ) {
        	if(Complex.Abs(a) == Infinity) return new Complex(0);
            return a.Sub(Complex.Dround(a.Div(b)).Mul(b));
        }
    }

    Gmod(b) { if(Complex.Abs(this) == Infinity) return new Complex(0); return this.Sub(Complex.Round(this.Div(b)).Mul(b)); }
    static Gmod(a, b) { if(Complex.Abs(a) == Infinity) return new Complex(0); return Complex.Sub(a, Complex.Round(Complex.Div(a, b)).Mul(b)); }

    Gcd(b) { var a = new Complex(this.Re, this.Im); return Complex.Gcd(a, b); }
    static Gcd(a, b) {
        if(Complex.Abs(a) == 0 && Complex.Abs(b) == 0) return new Complex(0);
        if(Complex.Abs(a) == 0) return b;
        if(Complex.Abs(b) == 0) return a;
        if(Complex.Abs(a) == Infinity && Complex.Abs(b) == Infinity) return new Complex(Infinity);
        if(Complex.Abs(a) == Infinity) return b;
        if(Complex.Abs(b) == Infinity) return a;
        var c1, c2;
        if(a.Abs() >= b.Abs()) { c1 = a; c2 = b; }
        else { c1 = b; c2 = a; }
        var c3 = c1.Mod(c2);
        for (let i = 0; c3.Abs() > 0.00001 && i < 1000; i++) {
            c1 = c2; 
            c2 = c3; 
            c3 = c1.Mod(c2);
        }
        return new Complex(c2);
    }

    Lcm(b) { var a = new Complex(this.Re, this.Im); return Complex.Lcm(a, b); }
    static Lcm(a, b) {
    	if(Complex.Abs(a) == Infinity && Complex.Abs(b) == Infinity) return new Complex(1);
        if(Complex.Abs(a) == Infinity) return b;
        if(Complex.Abs(b) == Infinity) return a;
    	return a.Mul(b).Div(a.Gcd(b)); 
    }

    Arg() { // угол направления числа
        return Math.acos(this.Sign().Re) * Complex.Sign(Math.asin(this.Sign().Im));
    }

    static Arg(a) { // угол направления числа
        if(typeof a == "number") 
            return Math.acos(Complex.Sign(a));
        else 
            return Math.acos(Complex.Sign(a).Re) * Complex.Sign(Math.asin(Complex.Sign(a).Im)); 
    }

    Drct() { // числовое направление угла
        return Complex.Sum(this.Cos(), Complex.Mul(this.Sin(), new Complex(0, 1)));
    }

    static Drct(a) { // числовое направление угла
        if(typeof a == "number") 
            return new Complex(Math.cos(a), Math.sin(a));
        else 
        return Complex.Sum(Complex.Cos(a), Complex.Mul(Complex.Sin(a), new Complex(0, 1)));
    }

    Exp(b) { // ^ возведение в степень через предел
        const d = 4.8;
        if (Number.isInteger(Number(b))) { // ^ возведение в степень через предел
            const a = new Complex(this.Re, this.Im);
            var c = new Complex(1);
            if (b >= 0) for (var i = 0; i < b; i++) c = c.Mul(a);
            else for (var i = 0; i < -b; i++) c = c.Div(a);
            return c;
        } else if (typeof b == "number") { // ^ возведение в степень через предел
            const a = new Complex(this.Re, this.Im);
            const c1 = Complex.Mul(Math.pow(Complex.Abs(a), Math.pow(0.1, d)), Complex.Drct(Complex.Arg(a) * Math.pow(0.1, d)));
            const c2 = Complex.Sum(1, Complex.Mul(b, Complex.Sub(c1, 1)));
            const c3 = Complex.Mul(Math.pow(Complex.Abs(c2), Math.pow(10, d)), Complex.Drct(Complex.Arg(c2) * Math.pow(10, d)));
            return c3;
        } else if (b instanceof Complex) { // ^ возведение в степень через предел
            const a = new Complex(this.Re, this.Im);
            const c1 = Complex.Mul(Math.pow(Complex.Abs(a), Math.pow(0.1, d)), Complex.Drct(Complex.Arg(a) * Math.pow(0.1, d)));
            const c2 = Complex.Sum(1, Complex.Mul(b, Complex.Sub(c1, 1)));
            const c3 = Complex.Mul(Math.pow(Complex.Abs(c2), Math.pow(10, d)), Complex.Drct(Complex.Arg(c2) * Math.pow(10, d)));
            return c3;
        }
    }

    static Exp(a, b) {
        const d = 4.8;
        if (a instanceof Complex && isInteger(b)) { // ^ возведение в степень через предел
            var c = new Complex(1);
            if (b >= 0) for (var i = 0; i < b; i++) c = c.Mul(a);
            else for (var i = 0; i < -b; i++) c = c.Div(a);
            return c;
        } else if (typeof a == "number" && typeof b == "number") { // ^ возведение в степень через предел
            const c1 = Complex.Mul(Math.pow(Complex.Abs(a), Math.pow(0.1, d)), Complex.Drct(Complex.Arg(new Complex(a)) * Math.pow(0.1, d)));
            const c2 = Complex.Sum(1, Complex.Mul(b, Complex.Sub(c1, 1)));
            const c3 = Complex.Mul(Math.pow(Complex.Abs(c2), Math.pow(10, d)), Complex.Drct(Complex.Arg(c2) * Math.pow(10, d)));
            return c3;
        } else if (typeof a == "number" && b instanceof Complex) { // ^ возведение в степень через предел
            const c1 = Complex.Mul(Math.pow(Complex.Abs(a), Math.pow(0.1, d)), Complex.Drct(Complex.Arg(new Complex(a)) * Math.pow(0.1, d)));
            const c2 = Complex.Sum(1, Complex.Mul(b, Complex.Sub(c1, 1)));
            const c3 = Complex.Mul(Math.pow(Complex.Abs(c2), Math.pow(10, d)), Complex.Drct(Complex.Arg(c2) * Math.pow(10, d)));
            return c3;
        } else if (a instanceof Complex && typeof b == "number") { // ^ возведение в степень через предел
            const c1 = Complex.Mul(Math.pow(Complex.Abs(a), Math.pow(0.1, d)), Complex.Drct(Complex.Arg(a) * Math.pow(0.1, d)));
            const c2 = Complex.Sum(1, Complex.Mul(b, Complex.Sub(c1, 1)));
            const c3 = Complex.Mul(Math.pow(Complex.Abs(c2), Math.pow(10, d)), Complex.Drct(Complex.Arg(c2) * Math.pow(10, d)));
            return c3;
        } else if (a instanceof Complex && b instanceof Complex) {// ^ возведение в степень через предел
            const c1 = Complex.Mul(Math.pow(Complex.Abs(a), Math.pow(0.1, d)), Complex.Drct(Complex.Arg(a) * Math.pow(0.1, d)));
            const c2 = Complex.Sum(1, Complex.Mul(b, Complex.Sub(c1, 1)));
            const c3 = Complex.Mul(Math.pow(Complex.Abs(c2), Math.pow(10, d)), Complex.Drct(Complex.Arg(c2) * Math.pow(10, d)));
            return c3;
        }
    }

    Pow(b) { // ^ возведение в степень
        const absA = Complex.Abs(this);
        if (typeof b == "number") { // ^ возведение в степень
            if(absA == Infinity && b == Infinity) return new Complex(Infinity);
            if(absA == Infinity && b == -Infinity) return new Complex(0);
            if(absA == Infinity && b > 0) return new Complex(this).Mul(Complex.Pow(Complex.Sign(this), b));
            if(absA == Infinity && b < 0) return new Complex(0);
            if(absA == Infinity && b == 0) return new Complex(NaN);
            if(absA == 0 && b > 0) return new Complex(0);
            if(absA == 0 && b < 0) return new Complex(Infinity);
            if(absA == 0 && b == 0) return new Complex(NaN);
            if(absA > 1 && b == Infinity) return new Complex(Infinity);
            if(absA > 1 && b == -Infinity) return new Complex(0);
            if(absA < 1 && b == Infinity) return new Complex(0);
            if(absA < 1 && b == -Infinity) return new Complex(Infinity);
            if(absA == 1 && Complex.Abs(b) == Infinity) return new Complex(NaN);
            
            const c1 = Math.pow(this.Abs(), b);
            const c2 = Complex.Drct(this.Arg() * b);
            return Complex.Mul(c1, c2);
        } else if (b instanceof Complex) { // ^ возведение в степень
            if(absA == Infinity && b.Im == 0 && b.Re == Infinity) return new Complex(Infinity);
            if(absA == Infinity && b.Im == 0 && b.Re == -Infinity) return new Complex(0);
            if(absA == Infinity && b.Im == 0 && b.Re > 0) return new Complex(this).Mul(Complex.Pow(Complex.Sign(this), b));
            if(absA == Infinity && b.Im == 0 && b.Re < 0) return new Complex(0);
            if(absA == Infinity && b.Im == 0 && b.Re == 0) return new Complex(NaN);
            if(absA == 0 && b.Im == 0 && b.Re > 0) return new Complex(0);
            if(absA == 0 && b.Im == 0 && b.Re < 0) return new Complex(Infinity);
            if(absA == 0 && b.Im == 0 && b.Re == 0) return new Complex(NaN);
            if(absA > 1 && b.Im == 0 && b.Re == Infinity) return new Complex(Infinity);
            if(absA > 1 && b.Im == 0 && b.Re == -Infinity) return new Complex(0);
            if(absA < 1 && b.Im == 0 && b.Re == Infinity) return new Complex(0);
            if(absA < 1 && b.Im == 0 && b.Re == -Infinity) return new Complex(Infinity);
            if(absA == 1 && b.Im == 0 && Complex.Abs(b.Re) == Infinity) return new Complex(NaN);
            
            const c1 = Math.pow(this.Abs(), b.Re);
            const c2 = Complex.Drct(this.Arg() * b.Re);
            const c3 = Complex.Drct(Math.log(this.Abs()) * b.Im);
            const c4 = Math.pow(Math.E, -b.Im * this.Arg());
            //if (this.Re == 0 && this.Im == 0) return new Complex(0);
            /*else*/ return Complex.Mul(Complex.Mul(c1, c2), Complex.Mul(c3, c4));
        }
    }
    
    static Pow(a, b) { // ^ возведение в степень
        const absA = Complex.Abs(a);
        if (typeof a == "number" && typeof b == "number") { // ^ возведение в степень
            if(absA == Infinity && b == Infinity) return new Complex(Infinity);
            if(absA == Infinity && b == -Infinity) return new Complex(0);
            if(absA == Infinity && b > 0) return new Complex(a).Mul(Complex.Pow(Complex.Sign(a), b));
            if(absA == Infinity && b < 0) return new Complex(0);
            if(absA == Infinity && b == 0) return new Complex(NaN);
            if(absA == 0 && b > 0) return new Complex(0);
            if(absA == 0 && b < 0) return new Complex(Infinity);
            if(absA == 0 && b == 0) return new Complex(NaN);
            if(absA > 1 && b == Infinity) return new Complex(Infinity);
            if(absA > 1 && b == -Infinity) return new Complex(0);
            if(absA < 1 && b == Infinity) return new Complex(0);
            if(absA < 1 && b == -Infinity) return new Complex(Infinity);
            if(absA == 1 && Complex.Abs(b) == Infinity) return new Complex(NaN);
            
            const c1 = Math.pow(absA, b);
            const c2 = Complex.Drct(Complex.Arg(a) * b);
            return Complex.Mul(c1, c2);
        } else if (typeof a == "number" && b instanceof Complex) { // ^ возведение в степень
            if(absA == Infinity && b.Im == 0 && b.Re == Infinity) return new Complex(Infinity);
            if(absA == Infinity && b.Im == 0 && b.Re == -Infinity) return new Complex(0);
            if(absA == Infinity && b.Im == 0 && b.Re > 0) return new Complex(a).Mul(Complex.Pow(Complex.Sign(a), b));
            if(absA == Infinity && b.Im == 0 && b.Re < 0) return new Complex(0);
            if(absA == Infinity && b.Im == 0 && b.Re == 0) return new Complex(NaN);
            if(absA == 0 && b.Im == 0 && b.Re > 0) return new Complex(0);
            if(absA == 0 && b.Im == 0 && b.Re < 0) return new Complex(Infinity);
            if(absA == 0 && b.Im == 0 && b.Re == 0) return new Complex(NaN);
            if(absA > 1 && b.Im == 0 && b.Re == Infinity) return new Complex(Infinity);
            if(absA > 1 && b.Im == 0 && b.Re == -Infinity) return new Complex(0);
            if(absA < 1 && b.Im == 0 && b.Re == Infinity) return new Complex(0);
            if(absA < 1 && b.Im == 0 && b.Re == -Infinity) return new Complex(Infinity);
            if(absA == 1 && b.Im == 0 && Complex.Abs(b.Re) == Infinity) return new Complex(NaN);
            
            const c1 = Math.pow(absA, b.Re);
            const c2 = Complex.Drct(Complex.Arg(a) * b.Re);
            const c3 = Complex.Drct(Math.log(absA) * b.Im);
            const c4 = Math.pow(Math.E, -(b.Im) * Complex.Arg(a));
            //if (a == 0) return new Complex(0);
            /*else*/ return Complex.Mul(Complex.Mul(c1, c2), Complex.Mul(c3, c4));
        } else if (a instanceof Complex && typeof b == "number") { // ^ возведение в степень
            if(absA == Infinity && b == Infinity) return new Complex(Infinity);
            if(absA == Infinity && b == -Infinity) return new Complex(0);
            if(absA == Infinity && b > 0) return new Complex(a).Mul(Complex.Pow(Complex.Sign(a), b));
            if(absA == Infinity && b < 0) return new Complex(0);
            if(absA == Infinity && b == 0) return new Complex(NaN);
            if(absA == 0 && b > 0) return new Complex(0);
            if(absA == 0 && b < 0) return new Complex(Infinity);
            if(absA == 0 && b == 0) return new Complex(NaN);
            if(absA > 1 && b == Infinity) return new Complex(Infinity);
            if(absA > 1 && b == -Infinity) return new Complex(0);
            if(absA < 1 && b == Infinity) return new Complex(0);
            if(absA < 1 && b == -Infinity) return new Complex(Infinity);
            if(absA == 1 && Complex.Abs(b) == Infinity) return new Complex(NaN);
            
            const c1 = Math.pow(a.Abs(), b);
            const c2 = Complex.Drct(a.Arg() * b);
            return Complex.Mul(c1, c2);
        } else if (a instanceof Complex && b instanceof Complex) { // ^ возведение в степень
            if(absA == Infinity && b.Im == 0 && b.Re == Infinity) return new Complex(Infinity);
            if(absA == Infinity && b.Im == 0 && b.Re == -Infinity) return new Complex(0);
            if(absA == Infinity && b.Im == 0 && b.Re > 0) return new Complex(a).Mul(Complex.Pow(Complex.Sign(a), b));
            if(absA == Infinity && b.Im == 0 && b.Re < 0) return new Complex(0);
            if(absA == Infinity && b.Im == 0 && b.Re == 0) return new Complex(NaN);
            if(absA == 0 && b.Im == 0 && b.Re > 0) return new Complex(0);
            if(absA == 0 && b.Im == 0 && b.Re < 0) return new Complex(Infinity);
            if(absA == 0 && b.Im == 0 && b.Re == 0) return new Complex(NaN);
            if(absA > 1 && b.Im == 0 && b.Re == Infinity) return new Complex(Infinity);
            if(absA > 1 && b.Im == 0 && b.Re == -Infinity) return new Complex(0);
            if(absA < 1 && b.Im == 0 && b.Re == Infinity) return new Complex(0);
            if(absA < 1 && b.Im == 0 && b.Re == -Infinity) return new Complex(Infinity);
            if(absA == 1 && b.Im == 0 && Complex.Abs(b.Re) == Infinity) return new Complex(NaN);
            
            const c1 = Math.pow(a.Abs(), b.Re);
            const c2 = Complex.Drct(a.Arg() * b.Re);
            const c3 = Complex.Drct(Math.log(a.Abs()) * b.Im);
            const c4 = Math.pow(Math.E, -b.Im * a.Arg());
            //if (a.Re == 0 && a.Im == 0) return new Complex(0);
            /*else*/ return Complex.Mul(Complex.Mul(c1, c2), Complex.Mul(c3, c4));
        }
    }
    
    Ln() { // ln() натуральный логарифм через предел
        // const d = 4.8;
        // const c1 = Complex.Mul(Math.pow(this.Abs(), Math.pow(0.1, d)), Complex.Drct(this.Arg() * Math.pow(0.1, d)));
        // const c2 = Complex.Mul(Math.pow(10, d), Complex.Sub(c1, 1));
        return new Complex(Math.log(this.Abs()), this.Arg());
    }

    static Ln(a) {
        // const d = 4.8;
        // if (typeof a == "number") { // ln() натуральный логарифм через предел
        //     return new Complex(Math.log(a));
        // } else if (a instanceof Complex) { // ln() натуральный логарифм через предел
        //     const c1 = Complex.Mul(Math.pow(Complex.Abs(a), Math.pow(0.1, d)), Complex.Drct(Complex.Arg(a) * Math.pow(0.1, d)));
        //     const c2 = Complex.Mul(Math.pow(10, d), Complex.Sub(c1, 1));
        //     return c2;
        // }
        return new Complex(Math.log(Complex.Abs(a)), Complex.Arg(a));
    }

    Log(a){ // log() логарифм
        return Complex.Div(this.Ln(), Complex.Ln(a));
    }

    static Log(a, b) { // log() логарифм
        return Complex.Div(Complex.Ln(b), Complex.Ln(a));
    }

    Sh() { return Complex.Div(Complex.Sub(Complex.Pow(Math.E, this), Complex.Pow(Math.E, this.Mul(new Complex(-1, 0)))), 2); }
    static Sh(a) {// sin() синус
        if (typeof a == "number") { // sin() синус
            return new Complex(Math.sinh(a));
        } else if (a instanceof Complex) { // sin() синус
            return Complex.Div(Complex.Sub(Complex.Pow(Math.E, a), Complex.Pow(Math.E, Complex.Mul(a, new Complex(-1, 0)))), 2);
        }
    }
    
    Ch() { return Complex.Div(Complex.Sum(Complex.Pow(Math.E, this), Complex.Pow(Math.E, this.Mul(new Complex(-1, 0)))), 2); }
    static Ch(a) { // cos() косинус
        if (typeof a == "number") { // cos() косинус
            return new Complex(Math.cosh(a));
        } else if (a instanceof Complex) {// cos() косинус
            return Complex.Div(Complex.Sum(Complex.Pow(Math.E, a), Complex.Pow(Math.E, Complex.Mul(a, new Complex(-1, 0)))), 2);
        }
    }

    Th() { return Complex.Div(this.Sh(), this.Ch()); }
    static Th(a) { // tg() тангенс
        if (typeof a == "number") { // tg() тангенс
            return new Complex(Math.tanh(a));
        } else if (a instanceof Complex) { // tg() тангенс
            return Complex.Div(Complex.Sh(a), Complex.Ch(a));
        }
    }
    
    Sin() { // sin() синус
        return Complex.Div(Complex.Sub(Complex.Pow(Math.E, this.Mul(new Complex(0, 1))), Complex.Pow(Math.E, this.Mul(new Complex(0, -1)))), new Complex(0, 2));
    }
    static Sin(a) {// sin() синус
        if (typeof a == "number") { // sin() синус
            return new Complex(Math.sin(a));
        } else if (a instanceof Complex) { // sin() синус
            return Complex.Div(Complex.Sub(Complex.Pow(Math.E, Complex.Mul(a, new Complex(0, 1))), Complex.Pow(Math.E, Complex.Mul(a, new Complex(0, -1)))), new Complex(0, 2));
        }
    }
    
    Cos() { // cos() косинус
        return Complex.Div(Complex.Sum(Complex.Pow(Math.E, this.Mul(new Complex(0, 1))), Complex.Pow(Math.E, this.Mul(new Complex(0, -1)))), 2);
    }
    static Cos(a) { // cos() косинус
        if (typeof a == "number") { // cos() косинус
            return new Complex(Math.cos(a));
        } else if (a instanceof Complex) {// cos() косинус
            return Complex.Div(Complex.Sum(Complex.Pow(Math.E, Complex.Mul(a, new Complex(0, 1))), Complex.Pow(Math.E, Complex.Mul(a, new Complex(0, -1)))), 2);
        }
    }

    Tan() { return Complex.Div(this.Sin(), this.Cos()); }
    static Tan(a) { // tg() тангенс
        if (typeof a == "number") { // tg() тангенс
            return new Complex(Math.tan(a));
        } else if (a instanceof Complex) { // tg() тангенс
            return Complex.Div(Complex.Sin(a), Complex.Cos(a));
        }
    }

    Ash() { return Complex.Ln(this.Sum(Complex.Pow(this.Pow(2).Sum(1), 0.5))); }
    static Ash(a) {// sin() синус
        if (typeof a == "number") { // sin() синус
            return new Complex(Math.asinh(a));
        } else if (a instanceof Complex) { // sin() синус
            return Complex.Ln(Complex.Sum(a, Complex.Pow(Complex.Pow(a, 2).Sum(1), 0.5)));
        }
    }
    
    Ach() {  return Complex.Ln(this.Sum(Complex.Pow(this.Pow(2).Sub(1), 0.5))).Mul(this.Sign()).Mul(this.Sum(1).Sign()); }
    static Ach(a) { // cos() косинус
        if (typeof a == "number") { // cos() косинус
            return new Complex(Math.acosh(a));
        } else if (a instanceof Complex) {// cos() косинус
            return Complex.Ln(Complex.Sum(a, Complex.Pow(Complex.Pow(a, 2).Sub(1), 0.5))).Mul(a.Sign()).Mul(a.Sum(1).Sign());
        }
    }

    Ath() { return this.Sub(1).Mul(-1).Ln().Sub(this.Sum(1).Ln()).Div(-2); }
    static Ath(a) { // tg() тангенс
        if (typeof a == "number") { // tg() тангенс
            return new Complex(Math.atanh(a));
        } else if (a instanceof Complex) { // tg() тангенс
            return Sub(1, a).Ln().Sub(Sum(1, a).Ln()).Div(-2);
        }
    }

    Asin() { return this.Mul(new Complex(0, 1)).Ash().Div(new Complex(0, 1)); }
    static Asin(a) {// sin() синус
        if (typeof a == "number") { // sin() синус
            return new Complex(Math.asin(a));
        } else if (a instanceof Complex) { // sin() синус
            return a.Mul(new Complex(0, 1)).Ash().Div(new Complex(0, 1));
        }
    }
    
    Acos() { return this.Ach().Div(new Complex(0, 1)); }
    static Acos(a) { // cos() косинус
        if (typeof a == "number") { // cos() косинус
            return new Complex(Math.acos(a));
        } else if (a instanceof Complex) {// cos() косинус
            return a.Mul(new Complex(0, 1)).Ach().Div(new Complex(0, 1));
        }
    }

    Atan() { return this.Mul(new Complex(0, 1)).Ath().Div(new Complex(0, 1)); }
    static Atan(a) { // tg() тангенс
        if (typeof a == "number") { // tg() тангенс
            return new Complex(Math.atan(a));
        } else if (a instanceof Complex) { // tg() тангенс
            return a.Mul(new Complex(0, 1)).Ath().Div(new Complex(0, 1));
        }
    }

    static Fct(a) { return new Complex(a).Fct(); }
    Fct() { //y = x^(t-1)*e^(-x)
        const d = 0.001; var result = new Complex(0); var z = new Complex(Complex.Mod(new Complex(this.Re), 1).Re, this.Im);
        //for(let n = d; n <= 1; n += d) result = Complex.Sub(0, Complex.Ln(n)).Pow(z).Mul(d).Sum(result); //new Complex(n).Pow(this.Sub(1)).Mul(Math.exp(-n)).Mul(dx).Sum(result);
        const a = new Complex(0.5);
        const c1 = Complex.Div(Complex.Div(Complex.Pow(Math.PI, 0.5), 2).Sub(1), Complex.Mul(2, (a.Sum(1)).Pow(Complex.Div(1, Math.PI))).Div(Math.PI).Sum(a.Sum(1).Div(Math.E)).Pow(a.Sub(1)).Sub(Complex.Mul(Complex.Sub(1, Complex.Div(1, Complex.Sum(Complex.Div(2, Math.PI), Complex.Div(1, Math.E)))),a.Sub(1))).Sub(1));
        result = Complex.Mul(2, (z.Sum(1)).Pow(Complex.Div(1, Math.PI))).Div(Math.PI).Sum(z.Sum(1).Div(Math.E)).Pow(z.Sub(1)).Sub(Complex.Mul(Complex.Sub(1, Complex.Div(1, Complex.Sum(Complex.Div(2, Math.PI), Complex.Div(1, Math.E)))), z.Sub(1))).Sub(1).Mul(c1).Sum(1);
        var n = this.Dround().Re;
        for(let i = 0; i < n && i < 1000 && Number.isFinite(result.Abs()) && !Number.isNaN(result.Abs()); i++) result = this.Sub(i).Mul(result);
        for(let i = 0; i < -n && i < 1000 && Number.isFinite(result.Abs()) && !Number.isNaN(result.Abs()); i++) result = result.Div(this.Sum(i+1));
        return result;
    } 
    // static Fct(a) {
    //     const dx = 0.001; var result = new Complex(0);
    //     for(let n = dx; n <= 1; n += dx) result = Complex.Sub(0, Complex.Ln(n)).Pow(Complex.Sub(a, 1)).Mul(dx).Sum(result);
    //     return result;
    // }

    static Tetr(a, b) { return new Complex(a).Tetr(b); }
    Tetr(b) {
        const d = 0.001; var result = new Complex(0); var z = new Complex(this.Re, this.Im).Sub(0);
        b = new Complex(b);
        //for(let n = d; n <= 1; n += d) result = Complex.Sub(0, Complex.Ln(n)).Pow(z).Mul(d).Sum(result); //new Complex(n).Pow(this.Sub(1)).Mul(Math.exp(-n)).Mul(dx).Sum(result);
        var n = b.Sub(-1).Dround().Re;
        
        //result = b.Mod(1);
        //result = b.Mod(1).Mul(Math.PI).Cos().Mul(-1).Sum(1).Div(2);
        result = b.Mod(1).Pow(this.Ln().Pow(Complex.Div(1, z.Re)));
        //result = b.Mod(1).Pow(this.Log(b.Mod(1).Sum(Complex.Pow(z, b.Mod(1).Sum(z)))));
        //result = b.Mod(1).Pow(this.Ln().Pow(Complex.Sub(Math.E * 2, Complex.Pow(z.Re, b.Mod(1).Sum(1)))));
        //result = z.Log(z).Mul(Complex.Sub(1, b.Mod(1))).Sum(z.Mul(b.Mod(1)));
        for(let i = 0; i < n && i < 1000 && Number.isFinite(result.Abs()) && !Number.isNaN(result.Abs()); i++) result = this.Sub(0).Pow(result);
        for(let i = 0; i < -n && i < 1000 && Number.isFinite(result.Abs()) && !Number.isNaN(result.Abs()); i++) result = result.Log(this.Sum(0));
        return result; //y = Re(tetr(t; x+0.001) - tetr(t; x))/0.001
    }
} //y = (cos(t)*x+sin(t)*2)^(cos(t)*2+sin(t)*x)