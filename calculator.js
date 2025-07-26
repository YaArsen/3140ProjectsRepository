'use strict';

document.addEventListener("keydown", func1);
document.addEventListener("click", func2);

function func1(event) {
    if (event.key == '+' || event.key == '-' || event.key == '*' || event.key == '/' || event.key == '%') {
        let element = document.getElementById("display").value;
        let lastElement = element.charAt(element.length - 1);

        if (lastElement == '+' || lastElement == '-' || lastElement == '*' || lastElement == '/' || lastElement == '%') {
            document.getElementById("display").value = element.slice(0, element.length - 1) + event.key;
            return;
        }
    }

    if (event.key == '0' || event.key == '1'
      || event.key == '2' || event.key == '3'
      || event.key == '4' || event.key == '5'
      || event.key == '6' || event.key == '7'
      || event.key == '8' || event.key == '9'
      || event.key == '+' || event.key == '-'
      || event.key == '*' || event.key == '/'
      || event.key == '%' || event.key == '.') {
      if (!isNaN(el) && document.getElementById("display").value.charAt(1) !== '.' && document.getElementById("display").value.charAt(0) === '0') clr();
      if (isNaN(el) && el !== '.' && document.getElementById("display").value.charAt(0) === "") return;
      document.getElementById("display").value += event.key;
    }

    if (event.key == 'Enter') {
        solve();
    } else if (event.key == 'Delete') {
        clr();
    } else if (event.key == 'Backspace') {
        clrL();
    }
}

function func2(event) {
    const el = event.target.getAttribute('value');

    if (el == '+' || el == '-' || el == '*' || el == '/' || el == '%') {
        let element = document.getElementById("display").value;
        let lastElement = element.charAt(element.length - 1);

        if (lastElement == '+' || lastElement == '-' || lastElement == '*' || lastElement == '/' || lastElement == '%') {
            document.getElementById("display").value = element.slice(0, element.length - 1) + el;
            return;
        }
    }

    if (el  == '0' || el == '1'
      || el == '2' || el == '3'
      || el == '4' || el == '5'
      || el == '6' || el == '7'
      || el == '8' || el == '9'
      || el == '+' || el == '-'
      || el == '*' || el == '/'
      || el == '%' || el == '.') {
      if (!isNaN(el) && document.getElementById("display").value.charAt(1) !== '.' && document.getElementById("display").value.charAt(0) === '0') clr();
      if (isNaN(el) && el !== '.' && document.getElementById("display").value.charAt(0) === "") return;
      document.getElementById("display").value += el;
    }

    if (el == '=') {
        solve();
    } else if (el == 'C') {
        clr();
    } else if (el == 'CE' || el == '<-') {
        clrL();
    } else if (el == '1/x' || el == 'x^2' || el == 'sqrt(x)') {
        f(el);
    } else if (el == '+/-') {
        plus_or_minus();
    }
}

function f(e) {
    let el = document.getElementById("display").value;

    let operators = ['+', '-', '*', '/', '%'];
    let index = -1;

    for (let op of operators) {
        let i = el.lastIndexOf(op);
        if (i > index) index = i;
    }

    let num = index === -1 ? el : el.slice(index + 1);

    if (num === "") return;

    let result = check(e, num);

    if (index === -1) {
        el = result;
    } else {
        el = el.slice(0, index + 1) + result;
    }

    document.getElementById("display").value = el;
}

function check(e, num) {
    let number = Number(num);
    if (isNaN(number)) return num;

    if (e === "1/x") {
      return (1 / number).toString();
    } else if (e === "x^2") {
        return Math.pow(number, 2).toString();
    } else if (e === "sqrt(x)") {
        return Math.sqrt(number).toString();
    }
}

function plus_or_minus() {
    let el = document.getElementById("display").value;

    let k = el.length - 1;
    while (el.charAt(k) !== '(') {
        k--;
        if (k == -1) break;
    }

    if (k != -1 && el.slice(k, k + 2) === '(-') {
        // Unwrap negative value
        let num = el.slice(k + 2, el.length - 1);
        el = el.slice(0, k) + num;
        document.getElementById("display").value = el;
        return;
    }

    k = el.length - 1;
    while (k >= 0 && (!isNaN(el.charAt(k)) || el.charAt(k) === '.')) {
        k--;
    }

    let num = el.slice(k + 1);
    if (num.length === 0) return;

    let before = el.slice(0, k + 1);
    document.getElementById("display").value = before + '(-' + num + ')';
}

function solve() {
    let x = document.getElementById("display").value;
    if (isNaN(x.charAt(x.length - 1)) && x.charAt(x.length - 1) !== '.' && x.charAt(x.length - 1) !== ')') x = x.slice(0, x.length - 1);
    let y = eval(x);
    document.getElementById("display").value = y;
}

function clr() {
    document.getElementById("display").value = "";
}

function clrL() {
    let str = document.getElementById("display").value;

    if (str.charAt(str.length - 1) === ')') {
        let index = str.indexOf('(');
        str = str.slice(0, index + 1);
    }

    str = str.substring(0, str.length - 1);
    document.getElementById("display").value = str;
}