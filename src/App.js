import React from 'react';
import './App.css';

export default class App extends React.Component {
  state = {
      currentOperand : '',
      previousOperand : '',
      operation : ''
  };
 
render() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
              <div className="calculator">
                <div className="calculator_display">
                  <div className="calculator_display_last">0</div>
                  <div className="calculator_display_current">0</div>
                </div>
                <div className="calculator_keys">
                  <button className="key-operator" data-ops="plus">+</button>
                  <button className="key-operator" data-ops="minus">-</button>
                  <button className="key-operator" data-ops="times">x</button>
                  <button className="key-operator" data-ops="divided by">÷</button>
                  <button className="number" data-num="7">7</button>
                  <button className="number" data-num="8">8</button>
                  <button className="number" data-num="9">9</button>
                  <button className="number" data-num="4">4</button>
                  <button className="number" data-num="5">5</button>
                  <button className="number" data-num="6">6</button>
                  <button className="number" data-num="1">1</button>
                  <button className="number" data-num="2">2</button>
                  <button className="number" data-num="3">3</button>
                  <button className="number" data-num="0">0</button>
                  <button className="number" >.</button>
                  <button id = "clear" className="all-clear" >AC</button>
                  <button className="equal-sign" data-result="">=</button>
                </div>
              </div>
          </div>
      </header>
    </div>
  );
}



function(){
  var el = function(element){
    if (element.charAt(0) === "#"){
      return document.querySelector(element);
    }
    return document.querySelectorAll(element);
  };

  var dpreviousOperand = el(".calculator_display_last"),
      dcurrentOperand = el(".calculator_display_current"),
      dequal = el(".equal-sign"),
      dnumbers = el(".number"),
      doperations = el(".key-operator"),
      previousOperand = this.previousOperand,
      currentOperand = this.currentOperand,
      operation = this.operation,
      resultNum;

var setNum = function(){
  if (resultNum){
    currentOperand = this.getAttribute("data-num");
    resultNum = '';
  } else {
    currentOperand += this.getAttribute("data-num");
  }

  dcurrentOperand.innerHTML = currentOperand
};

var moveNum = function(){
  previousOperand = currentOperand;
  currentOperand = '';
  operation = this.getAttribute("data-ops");
  dpreviousOperand.innerHTML = previousOperand;

  dequal.setAttribute("data-result", "");
};

var displayNum = function(){
  currentOperand = parseFloat(currentOperand);
  previousOperand = parseFloat(previousOperand);

  switch(operation){
    case "plus":
      resultNum = currentOperand + previousOperand;
      break;

      case "minus":
        resultNum = currentOperand - previousOperand;
      break;
        
      case "times":
        resultNum = currentOperand * previousOperand;
        break;

      case "divided by":
        resultNum = currentOperand / previousOperand;
        break;

      default:
        resultNum = currentOperand;
    }

  if (!isFinite(resultNum)) {
    if (isNaN(resultNum)){
      resultNum = "Error 404: Number not found!";
    } else {
      resultNum = "Por zero não!"
    }
  }

  dcurrentOperand.innerHTML = resultNum;
  dpreviousOperand.innerHTML = '';

  currentOperand = 0
  previousOperand = resultNum;
};


var clearAll = function(){
  currentOperand = '';
  dcurrentOperand.innerHTML = '0';
  dequal.setAttribute("data-result", resultNum);
};


for (var i = 0, l = dnumbers.length; i < l; i++){
  dnumbers[i].onclick = setNum;
}

for (var i = 0, l = doperations.length; i < l; i++){
  doperations[i].onclick = moveNum;
}

dequal.onclick = displayNum;

el("#clear").onclick = clearAll;

}

}

















// function isNumber(item) {
//   return /[0-9]+/.test(item); 
// }

// function operate(numberOne, numberTwo, operation) {
//   const one = Big(numberOne || "0");
//   const two = Big(numberTwo || (operation === "÷" || operation === 'x' ? "1": "0")); //If dividing or multiplying, then 1 maintains current value in cases of null
//   if (operation === "+") {
//     return one.plus(two).toString();
//   }
//   if (operation === "-") {
//     return one.minus(two).toString();
//   }
//   if (operation === "x") {
//     return one.times(two).toString();
//   }
//   if (operation === "÷") {
//     if (two === "0") {
//       alert("Divide by 0 error");
//       return "0";
//     } else {
//       return one.div(two).toString();
//     }
//   }
//   throw Error(`Unknown operation '${operation}'`);
// }  

// function calculate(state, buttonName) {
//   if (buttonName === "AC") {
//     return {
//       currentOperand : '',
//       operation : ''
//   };
//   }

//   if (isNumber(buttonName)){
//     if (buttonName === "0" && state.currentOperand === "0"){
//       return {};
//     }
//     if (state.operation){
//       if (state.currentOperand){
//         return {currentOperand : state.currentOperand + buttonName}
//       }
//       return {currentOperand : buttonName}
//     } 

//   if (state.currentOperand) {
//     const next = state.currentOperand === "0" ? buttonName : state.currentOperand + buttonName;
//     return {
//       currentOperand : next
//     };
//   }
//   return {
//     currentOperand : buttonName
//   };
// }

// if (buttonName === ".") {
//   if (state.currentOperand) {
//     // ignore a . if the next number already has one
//     if (state.currentOperand.includes(".")) {
//       return {};
//     }
//     return { currentOperand: state.currentOperand + "." };
//   }
//   return { currentOperand: "0." };
// }

// if (buttonName === "=") {
//   if (state.currentOperand && state.operation) {
//     return {
//       previousOperand: operate(state.previousOperand, state.currentOperand, state.operation),
//       currentOperand: '',
//       operation: '',
//     };
//   } else {
//     return {};
//   }
// }



// if (state.operation) {
//   return {
//     previousOperand: operate(state.previousOperand, state.currentOperand, state.operation),
//     currentOperand: '',
//     operation: buttonName,
//   };
// }


// if (!state.currentOperand) {
//   return { operation: buttonName };
// }

// return {
//   previousOperand: state.currentOperand,
//   currentOperand: '',
//   operation: buttonName,
// };
//}

// const integerDisplay = parseFloat(integerDigits);toLocaleString('pt-BR'), {maximumFractionDigits: 0});

