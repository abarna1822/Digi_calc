const display = document.getElementById("display");
const history = document.getElementById("history");
let expression = "";
let isDegree = true;
let memory = 0;

// Handle button clicks
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => {
    const val = btn.dataset.val;
    const func = btn.dataset.func;

    if (val) {
      expression += val;
      display.textContent = expression;
    }
    else if (func) {
      handleFunction(func, btn);
    }
  });
});

// Function handler
function handleFunction(func, btn) {
  if (func === "clear") {
    expression = "";
    display.textContent = "0";
  }
  if (func === "back") {
    expression = expression.slice(0, -1);
    display.textContent = expression || "0";
  }
  if (func === "calculate") {
    try {
      let exp = expression.replace(/π/g, "pi").replace(/!/g, "factorial");
      let result = math.evaluate(exp);
      history.textContent = expression + " = " + result;
      display.textContent = result;
      expression = result.toString();
    } catch {
      display.textContent = "Error";
      expression = "";
    }
  }
  if (func === "toggle-mode") {
    isDegree = !isDegree;
    btn.textContent = isDegree ? "Deg" : "Rad";
    math.config({
      number: 'number',
      precision: 14
    });
  }
  if (["MC", "MR", "M+", "M-"].includes(func)) {
    handleMemory(func);
  }
}

// Memory functions
function handleMemory(func) {
  if (func === "MC") memory = 0;
  if (func === "MR") {
    expression += memory;
    display.textContent = expression;
  }
  if (func === "M+") memory += Number(display.textContent) || 0;
  if (func === "M-") memory -= Number(display.textContent) || 0;
}

// Keyboard support
document.addEventListener("keydown", e => {
  if (!isNaN(e.key) || "+-*/().".includes(e.key)) {
    expression += e.key;
    display.textContent = expression;
  }
  if (e.key === "Enter") {
    e.preventDefault();
    handleFunction("calculate");
  }
  if (e.key === "Backspace") {
    handleFunction("back");
  }
});
