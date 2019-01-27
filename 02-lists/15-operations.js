const {ADD, SUB} = require('./15-adult.js');

function toDigits(number) {
    let digits = [];
    while (number !== 0) {
        digits.push(number % 10);
        number = Math.floor(number / 10);
    }
    return digits;
}

function toNumber(digits) {
    let number = 0;
    for (let i = 0; i < digits.length; i++) {
        number += digits[i] * (10 ** i);
    }
    return number;
}

function add(num1, num2) {
    num1 = toDigits(num1);
    num2 = toDigits(num2);

    let carry = false;
    let length = Math.max(num1.length, num2.length);
    let result = new Array(length);

    for (let i = 0; i < length; i++) {
        let digit1 = num1[i] || 0;
        let digit2 = num2[i] || 0;

        let sum = ADD.ADDDIGIT(digit1, digit2);
        if (carry)
            sum = toDigits(ADD.INCREMENT(toNumber(sum)));
        carry = false;

        if (sum.length === 1) {
            result[i] = sum[0];
        } else if (sum.length === 2) {
            result[i] = sum[0];
            carry = true;
        } else {
            throw new Error();
        }
    }

    if (carry)
        result[length] = 1;

    return toNumber(result);
}

function subtract(num1, num2) {
    num1 = toDigits(num1);
    num2 = toDigits(num2);

    let carry = false;
    let result = new Array(num1.length);
    for (let i = 0; i < num1.length; i++) {
        let digit1 = num1[i];
        let digit2 = num2[i] || 0;

        if (carry)
            digit2 = SUB.INCREMENT(digit2);
        carry = false;

        if (SUB.LOWERTHAN(digit1, digit2)) {
            digit1 = SUB.INCREMENT10(digit1);
            carry = true;
        }
        result[i] = SUB.SUBTRACTDIGIT(digit1, digit2);
    }

    return toNumber(result);
}

function tests() {
    function check(a, b) {
        if (JSON.stringify(a) !== JSON.stringify(b)) {
            console.log(a, b);
            throw new Error();
        }
    }

    check(toDigits(0), []);
    check(toDigits(1234), [4, 3, 2, 1]);

    check(toNumber([]), 0);
    check(toNumber([4, 3, 2, 1]), 1234);
    check(toNumber([4, 3, 2, 1, 0]), 1234);

    check(add(0, 0), 0);
    check(add(3, 2), 5);
    check(add(10, 3), 13);
    check(add(3, 10), 13);
    check(add(1234, 5678), 6912);
    check(add(9234, 6678), 15912);

    check(subtract(9, 5), 4);
    check(subtract(15, 5), 10);
    check(subtract(15, 9), 6);
    check(subtract(150, 99), 51);
    check(subtract(154859, 48594), 106265);

    console.log("tests ok");
}

tests();
