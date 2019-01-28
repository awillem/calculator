// ### Create Global Variables ###

const calculator = select("#calculator");
let calcDisplay = select('#calcDisplay');
let resultDisplay = select('#resultDisplay');
let lastType = "num";
let equation = 0;
let calculation = 0;
const symbols = [
  {name: "openParen", sym: "("},
  {name: "closeParen", sym: ")"},
  {name: "divide", sym: "/"},
  {name: "percent", sym: "%"},
  {name: "times", sym: "*"},
  {name: "minus", sym: "-"}, 
  {name: "plus", sym: "+"},
  {name: "squareRoot", sym: "&#8730"}
];
let history = [];
console.log(symbols);
// const numKeys = [].slice.call(select('.num', true));
// const otherKeys = [].slice.call(select('.key', true));

// ### Helper Functions ###

// accepts 2 parameters whatToSelect -> string of tag, classes, id's to be selected.  all (optional) -> true will use querySelectorAll
function select(whatToSelect, all) {
  if (all) {
    return document.querySelectorAll(whatToSelect);
  } else {
    return document.querySelector(whatToSelect);
  }
}

function setLastType (key) {
  lastType = key.className === 'num' ? 'num' : 'oper';
}

function symbol(key) {  
  for (let i = 0; i < symbols.length; i++) {
    if (symbols[i].name === key.classList[1]) {
      return symbols[i].sym;
    }
  }
}

function setDisplay () {
  calcDisplay.innerText = equation;
}

function backspace () {

}

function removeLastOper () {
  equation = equation.split("");
      equation.splice(-2);
      equation = equation.join("");
}



// ### Calculator Functions

// function calculate () {}
// should accept the value in calcDisplay and perform the calculations

//function addToCalcDisplay () {}
// should accept whatever was just clicked and then concatenate it to the end of the calcDisplay variable, which should be a string?
function addToCalcDisplay (key) {
  if (equation === 0) {
    // if an oper key is pressed, don't do anything. 
    if (key.className === 'num') {
      equation = key.innerText;
      setLastType(key);
    } 
  } else if (lastType === 'num') { // if number is pressed
    // if the last entry was a number, add the number with no space
    if (key.className === 'num') {
      equation += key.innerText;
      setLastType(key);
    } else {  // if the last entry was NOT a number, add the number with a space
      equation += ` ${symbol(key)}`;
      setLastType(key);
    }
  } else { // if lastType is Oper
    if(key.className === 'num') {
      equation += ` ${key.innerText}`;
      setLastType(key);
    } else {
      removeLastOper();
      equation += ` ${symbol(key)}`;
      setLastType(key);
    }
   
  }
  setDisplay();
  // lastType = key.className === 'num' ? 'num' : key.classList[1];
  console.log(equation, lastType);
}


// ### Event Handlers ###

calculator.addEventListener('click', e => {
  if (e.target.tagName === 'TD') {
    if(e.target.className === 'num' || e.target.classList[0] === 'oper' || e.target.classList[0] === 'func'){
    console.log(e.target.classList);
    addToCalcDisplay(e.target);
    } else if (e.target.className === 'equals') {
      if (lastType === 'oper'){
        removeLastOper();
      }
      resultDisplay.innerText = eval(equation);
      history.push(equation);
      equation = 0;
      setDisplay(); 
      console.log(calculation, resultDisplay.innerText, history);
    } 
  } 
});



