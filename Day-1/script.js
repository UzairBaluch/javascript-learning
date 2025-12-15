// QS-1 Print Numbers from 1 to N

let num1 = 5;
for (let n = 1; n <= num1; n++) {
  // console.log(n);
}

//QS-2  Print Numbers from N to 1 without changing the loop condition of above question

let num2 = 20;
for (let i = 1; i <= num2; i++) {
  // console.log(num1 - i) ;
}

//QS-3 Print All Even Numbers from 1 to N

let num3 = 100;

for (let e = 1; e <= num3; e++) {
  if (e % 2 === 0) {
    // console.log(e);
  }
}

//QS-4 Sum of First N Natural Numbers

let num4 = 5;
let sum = 0;

for (let s = 1; s <= num4; s++) {
  sum += s;
}
 console.log(sum);

//QS-5 Product (Factorial) of N

let num5 = 5;
let fac = 1;

for (let f = 1; f <= num5; f++) {
  fac = fac * f;
}

 console.log(fac);

//QS-6 Sum of All Even Numbers up to N
let num6 = 10;
let sumEven = 0;

for (let even = 1; even <= num6; even++) {
  if (even % 2 === 0) {
    sumEven += even;
  }
}
console.log(sumEven);

//QS-7 Print Squares of Numbers from 1 to N
let num7 = 5;
for (let i = 1; i <= num7; i++) {
   console.log(i*i);
}

//QS-8 Print all numbers divisible by 3 and 5 up to N
let num8 = 30;
for (let i = 1; i <= num8; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
     console.log(i);
  }
}

//QS-9 Find the sum of all odd numbers up to N

let num9 = 10;
let sumOdd = 0;

for (let odd = 1; odd <= num9; odd++) {
  if (odd % 2 !== 0) {
    sumOdd += odd;
  }
}
 console.log(sumOdd);

//QS-10 Print the cubes of numbers from 1 to N
let num10 = 5;
for (let q = 1; q <= num10; q++) {
   console.log(q * q * q);
}

//QS-11 Print only the numbers that are both even and perfect squares

let num11 = 20;

for (let i = 1; i * i <= num11; i++) {
  let square = i * i;
  if (square % 2 === 0) {
    console.log(square);
  }
}
