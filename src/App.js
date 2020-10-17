import React from 'react';
import './App.css';


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentOperand : '',
      previousOperand : '',
      operation : ''
    };
    this.funcAdd = this.funcAdd.bind(this);
    this.funcAddOperand = this.funcAddOperand.bind(this);
    this.funcEqual = this.funcEqual.bind(this);
    this.funcClear = this.funcClear.bind(this);
  }
  
  

  funcAdd(number){ //funcao para concatenar digitos
    if (number === "."){ //se estamos adicionando um separador decimal
      if (this.state.currentOperand === ''){ //mas nao temos numero ainda
        this.setState(state => ({
        currentOperand : '0.1' //valor atual é 0.1
      }));
    } else if(this.state.currentOperand.includes('.')){ //se temos um numero e ele ja tem
                                                        // um sep decimal, passe
    } else{ //se ainda nao tem separador decimal, adicionar
      this.setState(state => ({
        currentOperand : this.state.currentOperand + number
      }));
    }    
  } else{ //senao (nao é '.'), apenas concatenar
    this.setState(state => ({
      currentOperand : this.state.currentOperand + number
    }));
  }
  }

  funcAddOperand(op_name){ //funcao para adicionar um operador
    if (this.state.previousOperand !== ''){ 
      this.funcEqual()
      this.setState(state => ({
        operation : op_name, //seta o operador
      }));
    } else{
      this.setState(state => ({
        previousOperand: this.state.currentOperand, //valor atual vira valor anterior
        operation : op_name, //seta o operador
        currentOperand: '' //limpa valor atual
      }));
    } 
  }

funcEqual(){
  const cOFloat = parseFloat(this.state.currentOperand);
  const pOFloat = parseFloat(this.state.previousOperand);
  var result;

  switch(this.state.operation){
    case "+":
      result = cOFloat + pOFloat;
    break;

    case "-":
      result = cOFloat - pOFloat;
    break;
      
    case "x":
      result = cOFloat * pOFloat;
    break;

    case "÷":
      result = cOFloat / pOFloat;
    break;

    default:
      result = cOFloat;
    }

  if (!isFinite(result)) {
    if (isNaN(result)){
      result = "Error 404: Number not found!";
    } else {
      result = "Por zero não!"
    }
  }

  this.setState(state => ({
          previousOperand: '',
          operation : '', 
          currentOperand: result 
        }));
}

funcClear(){
  this.setState(state => ({
    currentOperand: '' 
  }));

}
 
render() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
              <div className="calculator">
                <div className="calculator_display">
                  <div className="calculator_display_last">{this.state.previousOperand + this.state.operation}</div>
                  <div className="calculator_display_current">{this.state.currentOperand}</div>
                </div>
                <div className="calculator_keys">
                  <button className="key-operator" data-ops="plus" onClick={() => this.funcAddOperand('+')}>+</button>
                  <button className="key-operator" data-ops="minus" onClick={() => this.funcAddOperand('-')}>-</button>
                  <button className="key-operator" data-ops="times" onClick={() => this.funcAddOperand('x')}>x</button>
                  <button className="key-operator" data-ops="divided by" onClick={() => this.funcAddOperand('÷')}>÷</button>
                  <button className="number" data-num="7" onClick={() => this.funcAdd(7)}>7</button>
                  <button className="number" data-num="8" onClick={() => this.funcAdd(8)}>8</button>
                  <button className="number" data-num="9" onClick={() => this.funcAdd(9)}>9</button>
                  <button className="number" data-num="4" onClick={() => this.funcAdd(4)}>4</button>
                  <button className="number" data-num="5" onClick={() => this.funcAdd(5)}>5</button>
                  <button className="number" data-num="6" onClick={() => this.funcAdd(6)}>6</button>
                  <button className="number" data-num="1" onClick={() => this.funcAdd(1)}>1</button>
                  <button className="number" data-num="2" onClick={() => this.funcAdd(2)}>2</button>
                  <button className="number" data-num="3" onClick={() => this.funcAdd(3)}>3</button>
                  <button className="number" data-num="0" onClick={() => this.funcAdd(0)}>0</button>
                  <button className="number" data-num="." onClick={() => this.funcAdd('.')}>.</button>
                  <button id = "clear" className="all-clear" onClick={() => this.funcClear()}>AC</button>
                  <button className="equal-sign" data-result="" onClick={() => this.funcEqual()}>=</button>
                </div>
              </div>
          </div>
      </header>
    </div>
  );
}
}