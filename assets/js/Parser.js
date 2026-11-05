import Complex from './Complex.js';

export class Operation {
    constructor(name, args, operations) {
        this.name = name;
        this.args = args;
        this.variability = 3;
        for(var j = 0; ((j < this.args.length) && (this.variability != 0)); j++) {
            const arg = args[j];
            if (arg[0] == '#' /*&& arg.length > 1*/) {
                var id = ""; for (let i = 1; i < arg.length; i++) id += String(arg[i]);
                const op = operations[Math.floor(id)];
                if(op.variability < this.variability) this.variability = op.variability;
            } //arg[0]
            else if (arg == 'c' || arg == 'y' || arg == 'r' || arg == 'θ') this.variability = 0;
            else if (arg == 'x') { if(1 < this.variability) this.variability = 1; }
            else if (arg == 't') if(2 < this.variability) this.variability = 2;
            //else if (arg[0] == 'p' || arg[0] == 'e' || arg[0] == 'i') if(2 < this.variability) this.variability = 2;
            //else if(2 < this.variability) this.variability = 2;
        }
        this.relevance = false;
        this.value = new Complex(1);
    }
}

export default class Parser {
	constructor() {
		this.operations = [];
	}
	
	clear() {
		this.operations = [];
	}
	
	Recognition(formula) { //парсинг выражения в список действий
        formula = String(formula);
        var multiexpression=false, ueq=false, Or=false, And=false, Not=false, Abs=false, equality=false, deq=false, Sum=false, Sub=false, Mul=false, Div=false, Pow=false, Root=false, Fct=false, Mod=false;
        { //автозамена вариативных знаков и удаление пробелов
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
                else if (formula[i] == '·') formula1 += '*';
                else if (formula[i] == '≤') formula1 += '<';
                else if (formula[i] == '≥') formula1 += '>';
                else if (formula[i] == '&') formula1 += '∧';
                else if (formula[i] == '≡') formula1 += '↔';
                //else if (formula[i] == '↔') formula1 += '=';
                //else if (formula[i] == '⇔') formula1 += '=';
                else if (formula[i] == '[') formula1 += "round(";
                else if (formula[i] == '⌊') formula1 += "Dround(";
                else if (formula[i] == '⌈') formula1 += "Uround(";
                else if (formula[i] == ']') formula1 += ')';
                else if (formula[i] == '⌋') formula1 += ')';
                else if (formula[i] == '⌉') formula1 += ')';
                else if (formula[i] == '⋮') formula1 += '%';
                else if (formula[i] == '⊤') formula1 += '0';
                else if (formula[i] == '⊥') formula1 += '∞';
    
                else formula1 += String(formula[i]);
            } //проверка наличия действий через знаки:
            formula = formula1;
            for (var i = 0; i < formula.length; i++) {
                if (formula[i] == '(') level++;
                else if(formula[i] == ')') level--;
                if(formula[i]=='\n') multiexpression = true;
                if(level <= 0) {
                    if(['=', '>', '<'].includes(formula[i])) equality = true; //!
                    if(formula[i] == '↔') deq = true;
                    if(formula[i] == '⇔') ueq = true;
                    if(!Sub && formula[i] == '+') Sum = true;
                    if(!Sum && formula[i] == '-') Sub = true;
                    if(!Div && formula[i] == '*') Mul = true;
                    if(!Mul && formula[i] == '/') Div = true;
                    if(formula[i] == '%') Mod = true;
                    if(formula[i] == '^') Pow = true;
                    if(formula[i] == '√') Root = true;
                    if(formula[i] == '!') Fct = true;
                    if(formula[i] == '|') Abs = true;
                    if(formula[i] == '∨') Or = true;
                    if(formula[i] == '∧') And = true;
                    if(formula[i] == '¬') Not = true;
                }
            }
        }
        //преобразование формы записи в функциональный вид (порядок блоков замены определяет приоритет операций):
        if (multiexpression) { //связывание паралельно написаных функций в одно выражение
            var level = 0, formula1 = "Or(";
            for (var i = 0; i < formula.length; i++) {
            	if (formula[i] == '(') level++;
                else if (formula[i] == ')') level--;
                if (level > 0 || formula[i] != '\n') { if(formula[i] != '\n') formula1 += String(formula[i]); }
                else formula1 += ";";
            }
            formula1 += ")";
            formula = formula1;
        } else if (Abs) { //обработка модуля
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
        } else if (ueq) { //обработка эквиволентности выражений
            var level = 0, formula1 = "Eq(";
            for (var i = 0; i < formula.length; i++) {
                if (formula[i] == '(') level++;
                else if (formula[i] == ')') level--;
                if (level > 0 || formula[i] != '⇔') formula1 += String(formula[i]);
                else formula1 += ";";
            }
            formula1 += ")";
            formula = formula1;
        } else if (Or) { //обработка логического или
            var level = 0, formula1 = "Or(";
            for (var i = 0; i < formula.length; i++) {
                if (formula[i] == '(') level++;
                else if (formula[i] == ')') level--;
                if (level > 0 || formula[i] != '∨') formula1 += String(formula[i]);
                else formula1 += ";";
            }
            formula1 += ")";
            formula = formula1;
        } else if (And) { //обработка логического и
            var level = 0, formula1 = "And(";
            for (var i = 0; i < formula.length; i++) {
                if (formula[i] == '(') level++;
                else if (formula[i] == ')') level--;
                if (level > 0 || formula[i] != '∧') formula1 += String(formula[i]);
                else formula1 += ";";
            }
            formula1 += ")";
            formula = formula1;
        } else if (Not) { //обработка логического не
            var level = 0, formula1 = "", one = true;
            for (var i = 0; i < formula.length; i++) {
                if (formula[i] == '(') level++;
                else if (formula[i] == ')') level--;
                if (level > 0 || !one || formula[i] != '¬') formula1 += formula[i];
                else if (formula[i] == '¬') { formula1 += "Div(1;"; one = false; }
            }
            formula1 += ")";
            formula = formula1;
        } else if (equality) { //обработка равенств и сравнений
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
                        if(arg != "") types += String(formula[i]);
                        if(arg != "") args.push(arg);
                        arg = "";
                    }
                }
            }
            if(arg != "") args.push(arg);
            for (var i = 0; i < types.length; i++) {
                if (types[i] == '=') formula1 += "Eq(" + args[i] + ";" + args[i + 1] + ")";
                if (types[i] == '>') formula1 += "Lar(" + args[i] + ";" + args[i + 1] + ")";
                if (types[i] == '<') formula1 += "Les(" + args[i] + ";" + args[i + 1] + ")";
                if (i + 1 < types.length) formula1 += ";";
            }
            formula1 += ")";
            formula = formula1;
        } else if (deq) { //обработка эквиволентности значений
            var level = 0, formula1 = "Eq(";
            for (var i = 0; i < formula.length; i++) {
                if (formula[i] == '(') level++;
                else if (formula[i] == ')') level--;
                if (level > 0 || formula[i] != '↔') formula1 += String(formula[i]);
                else formula1 += ";";
            }
            formula1 += ")";
            formula = formula1;
        } else if (Sum || Sub) { //обработка сложения и вычитания
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
        } else if (Mul || Div) { //обработка умножения и деления
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
        } else if (Mod) { //обработка остатка от деления
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
        } else if (Pow) { //обработка возведения в степень
            var level = 0, formula1 = "", one = true;
            for (var i = 0; i < formula.length; i++) {
                if (formula[i] == '(') level++;
                else if (formula[i] == ')') level--;
                if (level > 0 || !one || formula[i] != '^') formula1 += formula[i];
                else if (formula[i] == '^') { formula1 = "Pow(" + formula1 + ";"; one = false; }
            }
            formula1 += ")";
            formula = formula1;
        } else if (Root) { //обработка квадратного корня
            var level = 0, formula1 = "", one = true;
            for (var i = 0; i < formula.length; i++) {
                if (formula[i] == '(') level++;
                else if (formula[i] == ')') level--;
                if (level > 0 || !one || formula[i] != '√') formula1 += formula[i];
                else if (formula[i] == '√') { formula1 += "Sqrt("; one = false; }
            }
            formula1 += ")";
            formula = formula1;
        } else if (Fct) { //обработка факториала
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
        //вложенный обход построения списка операций по структуре текста выражения:
        while (formula != "") {
            var i = 0, operation = "";
            while (i < formula.length && formula[i] != '(') operation += String(formula[i++]); //имя функции
            if (i >= formula.length) break; //если нет открывающей скобки то обратно передаётся только значенее имени
            var level = 1, argsStr = "";
            i++; //перешагивание открывающей скобки
            while (i < formula.length && level > 0) { //формирование строки списка аргументов:
                if (formula[i] == '(') level++;
                else if (formula[i] == ')') level--;
                if (level > 0) argsStr += String(formula[i++]);
            }
            if (i >= formula.length || argsStr == "") break; //возвращение значения имени если аргументов нет или выход при отсутствии закрывающей скобки
            var args = [];
            { //разбиение строки списка аргументов в список аргументов через разделительный знак ';'
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
            var args1 = []; //вхождение в парсинг аргумента как целого выражения
            for (var j = 0; j < args.length; j++) args1.push(String(this.Recognition(args[j]))); //console.log(args1);
            args = args1;
            if (operation == "Sum" || operation == "Sub") for (var j = 0; j < args.length; j++) if (args[j] == "") args[j] = "0"; //возвращение нейтрального элемента на пустые операции сложения и вычитания
            {
                var j = 0; //индекс операции в списке
                for (; j < this.operations.length; j++) if (this.operations[j].name == operation && this.operations[j].args == args) break; //поиск дубликата
                if (j >= this.operations.length) this.operations.push(new Operation(operation, args, this.operations)); //добавление новой операции в список
                var formula1 = "#" + String(j); //ссылка на операцию в списке
                i++; //перешагиванте закрывающей скобки
                //while (i < formula.length) formula1 += String(formula[i++]); //ввод остатков функции на всякий случай
                formula = formula1;
            }
        }
        
        return String(formula); 
    } //Recognition
    
    CalculationValue(value, c, t) {
        value = String(value);
        if (value == "") return new Complex(NaN); //замена пустоты на not a number
        if (value[0] == '#' /*&& value.length > 1*/) { //извлечение действия из списка
            var id = ""; for (var i = 1; i < value.length; i++) id += String(value[i]);
            const op = this.operations[Math.floor(id)];
            if(op.relevance) return op.value; //пропуск расчёта по правилам оптимизации
            var sargs = op.args;
            var args2 = [];
            args2.length = 0; //?
            sargs.forEach((arg) => { args2.push(this.CalculationValue(arg, c, t)); }); //вложенное вычисление
            var args = args2; //console.log(args);
            
            //расчёт функций:
            
            if (op.name == "") op.value = new Complex(args[0]); //обычная скобка 
            else if (op.name.toLowerCase() == "eq") { //console.log(args);
            	var result = args[0];
                for (let i = 1; i < args.length; i++) {
                	if(result.Abs() == Infinity && args[i].Abs() == Infinity && result.Arg() == args[i].Arg()) result = new Complex(0);
                    /*if(result.Re == Infinity && args[i].Re == Infinity) result = new Complex(0);
                    else if(result.Re == -Infinity && args[i].Re == -Infinity) result = new Complex(0);
                    else if(result.Im == Infinity && args[i].Im == Infinity) result = new Complex(0);
                    else if(result.Im == -Infinity && args[i].Im == -Infinity) result = new Complex(0);*/
                    else result = new Complex(result.Sub(args[i]).Abs());
                }
                op.value = new Complex(result);
            }
            else if (op.name.toLowerCase() == "lar") { //if (larger) formula1 = "Div(Sub(" + formula1 + ";Abs(" + formula1 + "));2)";
                var result = args[0].Sub(args[1]).Re;
                if (result > 0) result = 0;
                op.value = new Complex(Math.abs(result));
            }
            else if (op.name.toLowerCase() == "les") { //if (less) formula1 = "Div(Sum(" + formula1 + ";Abs(" + formula1 + "));2)";
                var result = args[0].Sub(args[1]).Re;
                if (result < 0) result = 0;
                op.value = new Complex(Math.abs(result));
            }
            else if (["or", "mex"].includes(op.name.toLowerCase())) {
                var result = args[0].Abs();
                for (let i = 1; i < args.length; i++) if ((args[i].Abs() < result || !(args[i].Abs() > result)) && (args[i].Abs() >= 0 || args[i].Abs() <= 0)) result = args[i].Abs();
                op.value = new Complex(result);
            }
            else if (op.name.toLowerCase() == "and") {
                var result = args[0].Abs();
                for (var i = 1; i < args.length; i++) if ((args[i].Abs() > result || !(args[i].Abs() < result)) && (args[i].Abs() >= 0 || args[i].Abs() <= 0)) result = args[i].Abs();
                op.value = new Complex(result);
            }
            else if (op.name.toLowerCase() == "complex") op.value = new Complex(args[0].Re, args[1].Re);
            else if (op.name.toLowerCase() == "re") op.value = new Complex(args[0].Re);
            else if (op.name.toLowerCase() == "im") op.value = new Complex(args[0].Im);
            else if (op.name.toLowerCase() == "min") { //if (Math.Abs(b) < Math.Abs(a) || !(Math.Abs(b) > Math.Abs(a)) && (b >= 0 || b <= 0)) a = b;
                var result = args[0].Re;
                for (let i = 1; i < args.length; i++) if ((args[i].Re < result || !(args[i].Re > result)) && (args[i].Re >= 0 || args[i].Re <= 0)) result = args[i].Re;
                op.value = new Complex(result);
            }
            else if (op.name.toLowerCase() == "max") {
                var result = args[0].Re;
                for (let i = 1; i < args.length; i++) if ((args[i].Re > result || !(args[i].Re < result)) && (args[i].Re >= 0 || args[i].Re <= 0)) result = args[i].Re;
                op.value = new Complex(result);
            }
            else if (op.name.toLowerCase() == "round") op.value = args[0].Round();
            else if (["uround", "ceil"].includes(op.name.toLowerCase())) op.value = args[0].Uround();
            else if (["dround", "floor"].includes(op.name.toLowerCase())) op.value = args[0].Dround();
            else if (op.name.toLowerCase() == "abs") op.value = new Complex(args[0].Abs());
            else if (["sign", "sgn"].includes(op.name.toLowerCase())) op.value = args[0].Sign();
            else if (op.name.toLowerCase() == "conj") op.value = args[0].Conj();
            else if (op.name.toLowerCase() == "sum") {
                var result = new Complex(args[0]);
                for (let i = 1; i < args.length; i++) result = result.Sum(args[i]);
                op.value = result;
            }
            else if (op.name.toLowerCase() == "sub") op.value = args[0].Sub(args[1]);
            else if (op.name.toLowerCase() == "mul") {
                var result = new Complex(args[0]);
                for (let i = 1; i < args.length; i++) if(!Number.isNaN(args[i].Abs())) result = result.Mul(args[i]);
                op.value = result;
            }
            else if (op.name.toLowerCase() == "div") op.value = args[0].Div(args[1]);
            else if (op.name.toLowerCase() == "mod") op.value = args[0].Mod(args[1]);
            else if (op.name.toLowerCase() == "gmod") op.value = args[0].Gmod(args[1]);
            else if (["lcm", "нок"].includes(op.name.toLowerCase())) {
                var result = new Complex(args[0]);
                for (let i = 1; i < args.length; i++) result = result.Lcm(args[i]);
                op.value = result;
            }
            else if (["gcd", "нод"].includes(op.name.toLowerCase())) {
                var result = new Complex(args[0]);
                for (let i = 1; i < args.length; i++) result = result.Gcd(args[i]);
                op.value = result;
            }
            else if (["arg", "angle"].includes(op.name.toLowerCase())) op.value = new Complex(args[0].Arg()); 
            else if (["drct", "expi"].includes(op.name.toLowerCase())) op.value = args[0].Drct();
            else if (op.name.toLowerCase() == "exp") { if(args.length > 1) op.value = args[0].Exp(args[1]); else op.value = Complex.Pow(Math.E, args[0]); }
            else if (op.name.toLowerCase() == "pow") op.value = args[0].Pow(args[1]);
            else if (op.name.toLowerCase() == "sqrt") op.value = args[0].Pow(0.5);
            else if (op.name.toLowerCase() == "root") { if(args.length > 1) op.value = args[0].Pow(new Complex(1).Div(args[1])); else op.value = args[0].Pow(0.5); }
            else if (op.name.toLowerCase() == "ln") op.value = args[0].Ln();
            else if (op.name.toLowerCase() == "lg") op.value = args[0].Log(10);
            else if (op.name.toLowerCase() == "log") { if(args.length > 1) op.value = args[0].Log(args[1]); else op.value = args[0].Log(10);}
            else if (op.name.toLowerCase() == "sin") op.value = args[0].Sin();
            else if (op.name.toLowerCase() == "cos") op.value = args[0].Cos();
            else if (["tan", "tg"].includes(op.name.toLowerCase())) op.value = args[0].Tan();
            else if (op.name.toLowerCase() == "ctg") op.value = new Complex(1).Div(args[0].Tan());
            else if (op.name.toLowerCase() == "sec") op.value = new Complex(1).Div(args[0].Cos());
            else if (["csc", "cosec"].includes(op.name.toLowerCase())) op.value = new Complex(1).Div(args[0].Sin());
            else if (["asin", "arsin", "arcsin"].includes(op.name.toLowerCase())) op.value = args[0].Asin();
            else if (["acos", "arcos", "arccos"].includes(op.name.toLowerCase())) op.value = args[0].Acos();
            else if (["atan", "atg", "artan", "artg", "arctan"].includes(op.name.toLowerCase())) op.value = args[0].Atan();
            else if (["actg", "arctg", "arcctg"].includes(op.name.toLowerCase())) op.value = new Complex(1).Div(args[0]).Atan();
            else if (["asec", "arsec", "arcsec"].includes(op.name.toLowerCase())) op.value = new Complex(1).Div(args[0]).Acos();
            else if (["acsc", "acosec", "arcsc", "arcosec", "arccsc", "arccosec"].includes(op.name.toLowerCase())) op.value = new Complex(1).Div(args[0]).Asin();
            else if (["sinh", "sh"].includes(op.name.toLowerCase())) op.value = args[0].Sh();
            else if (["cosh", "ch"].includes(op.name.toLowerCase())) op.value = args[0].Ch();
            else if (["tanh", "tgh", "th"].includes(op.name.toLowerCase())) op.value = args[0].Th();
            else if (["ctgh", "cth"].includes(op.name.toLowerCase())) op.value = new Complex(1).Div(args[0].Th());
            else if (op.name.toLowerCase() == "sech") op.value = new Complex(1).Div(args[0].Ch());
            else if (["csch", "cosech"].includes(op.name.toLowerCase())) op.value = new Complex(1).Div(args[0].Sh());
            else if (["asinh", "arsinh", "arcsinh", "ash", "arsh", "arcsh"].includes(op.name.toLowerCase())) op.value = args[0].Ash();
            else if (["acosh", "arcosh", "arccosh", "ach", "arch", "arcch"].includes(op.name.toLowerCase())) op.value = args[0].Ach();
            else if (["atanh", "atgh", "ath", "artanh", "artgh", "arth", "arctanh"].includes(op.name.toLowerCase())) op.value = args[0].Ath();
            else if (["actgh", "arctgh", "arcctgh", "acth", "arcth", "arccth"].includes(op.name.toLowerCase())) op.value = new Complex(1).Div(args[0]).Ath();
            else if (["asech", "arsech", "arcsech"].includes(op.name.toLowerCase())) op.value = new Complex(1).Div(args[0]).Ach();
            else if (["acsch", "acosech", "arcsch", "arcosech", "arccsch", "arccosech"].includes(op.name.toLowerCase())) op.value = new Complex(1).Div(args[0]).Ash();
            else if (op.name.toLowerCase() == "fct") op.value = args[0].Fct();
            else if (op.name.toLowerCase() == "tetr") op.value = args[0].Tetr(args[1]);
            //Def, Itg
    
            op.relevance = true;
            return op.value;
        } //value[0]
        else if (value == 'c') return c; //!
        else if (value == 'x') return new Complex(c.Re);
        else if (value == 'y') return new Complex(c.Im);
        else if (value == 't') return new Complex(t);
        else if (value == 'p') return new Complex(Math.PI);
        else if (value == 'e') return new Complex(Math.E);
        else if (value == 'i') return new Complex(0, 1);
        else if (value == 'r') return new Complex(c.Abs());
        else if (value == 'θ') return new Complex(c.Arg());
        else if (value == '∞') return new Complex(Infinity);
    
        else return new Complex(parseFloat(value));
    } //CalculationValue
}