//QS-1 Find the Maximum of Three Numbers

function maxOfThree(a, b, c) {
  let max;
  if (a >= b && a >= c) {
    max = a;
  } else if (b >= a && b >= c) {
    max = b;
  } else {
    max = c;
  }
  return `${max} is Maximum `;
}

// console.log(maxOfThree(45, 65, 100));

//QS-2 Check if a Number is Positive, Negative, or Zero

function checkNumber(num) {
  if (num > 0) {
    return `${num} is Positive`;
  } else if (num < 0) {
    return `${num} is Negative`;
  } else {
    return `${num} is Zero`;
  }
}
// console.log(checkNumber(-6));

//QS-4 Calculate Electricity Bill

function calculateBill(u) {
  if (u <= 0) {
    return 0;
  } else if (u <= 100) {
    return u * 5;
  } else if (u <= 200) {
    return 100 * 5 + (u - 100) * 7;
  } else if (u <= 300) {
    return 100 * 5 + 100 * 7 + (u - 200) * 10;
  } else {
    return 100 * 5 + 100 * 7 + 100 * 10 + (u - 300) * 12;
  }
}

// console.log(calculateBill(100));
// console.log(calculateBill(101));
// console.log(calculateBill(201));
// console.log(calculateBill(301));

//QS-4 Check if a Character is a Vowel or Consonant

function character(char) {
  char = char.toLowerCase();

  if (char >= "a" && char <= "z") {
    if ("aeiou".includes(char)) {
      return "Vowel";
    } else {
      return "Consonant";
    }
  } else {
    return "Not a letter";
  }
}

console.log(character("a"));
console.log(character("l"));
console.log(character("E"));
console.log(character("g"));
console.log(character("b"));
console.log(character("I"));
console.log(character("m"));
console.log(character("o"));
console.log(character("k"));
console.log(character("u"));
console.log(character("1"));
console.log(character("@"));

//QS-5 Check if a Year is a Leap Year
function isLeapYear(year) {
  if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
    return true;
  }
  return false;
}

console.log(isLeapYear(2000));
console.log(isLeapYear(1900));
console.log(isLeapYear(2024));
console.log(isLeapYear(2023));
