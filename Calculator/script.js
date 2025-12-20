const number = document.querySelectorAll(".number");
const operator = document.querySelectorAll(".operator");
const isclear = document.querySelectorAll(".clear");
const isdecimal = document.querySelectorAll(".decimal");
const equals = document.querySelectorAll(".equals");
const display = document.getElementById("display");
let num = null;
let opt = null;
let value = 0;
let shouldReset = false;

number.forEach((item) => {
  item.addEventListener("click", () => {
    if (
      display.textContent.includes("+") ||
      display.textContent.includes("−") ||
      display.textContent.includes("×") ||
      display.textContent.includes("÷")
    ) {
      display.textContent = display.textContent + item.textContent;
    } else if (display.textContent === "0" || shouldReset === true) {
      display.textContent = item.textContent;
      shouldReset = false;
    } else {
      display.textContent = display.textContent + item.textContent;
    }
  });
});

operator.forEach((item) => {
  item.addEventListener("click", () => {
    num = Number(display.textContent);
    opt = item.textContent;
    shouldReset = true;
    display.textContent = display.textContent + opt;
    console.log("num:", num);
  });
});

isclear.forEach((item) => {
  item.addEventListener("click", () => {
    num = null;
    opt = null;
    value = 0;
    shouldReset = false;
    display.textContent = "0";
  });
});

isdecimal.forEach((item) => {
  item.addEventListener("click", () => {
    if (!display.textContent.includes(".")) {
      display.textContent = display.textContent + ".";
    }
  });
});

equals.forEach((item) => {
  item.addEventListener("click", () => {
    let result;
    let operatorIndex = display.textContent.indexOf(opt);
    let num2 = Number(display.textContent.substring(operatorIndex + 1));
    if (opt === "+") {
      result = num + num2;
    } else if (opt === "−") {
      result = num - num2;
    } else if (opt === "×") {
      result = num * num2;
    } else {
      result = num / num2;
    }
    display.textContent = result;
  });
});
