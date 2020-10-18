import React from 'react';
import './App.css';


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentOperand : '',
      previousOperand : '',
      operation : '',
      memoryList: ['','','','']
    };
    this.funcAdd = this.funcAdd.bind(this);
    this.funcAddOperand = this.funcAddOperand.bind(this);
    this.funcEqual = this.funcEqual.bind(this);
    this.funcClear = this.funcClear.bind(this);
    this.funcDeleteMemory = this.funcDeleteMemory.bind(this);
    this.funcRecoverMemory = this.funcRecoverMemory.bind(this);
    this.funcAddLast = this.funcAddLast.bind(this);
    this.funcSaveRegister = this.funcSaveRegister.bind(this);
  }
  
  

  funcAdd(number){ //funcao para concatenar digitos
    if (number === "."){ //se estamos adicionando um separador decimal
      if (this.state.currentOperand === ''){ //mas nao temos numero ainda
        this.setState(state => ({
        currentOperand : '0.' //valor atual é 0.
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
      result = pOFloat - cOFloat;
    break;
      
    case "x":
      result = cOFloat * pOFloat;
    break;

    case "÷":
      result = pOFloat / cOFloat;
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

funcDeleteMemory(props){
  if (props === undefined){
    this.setState(state => ({
      memoryList : ['', '', '', '']
    }));
  } else{
    this.setState(state => ({
      memoryList: this.state.memoryList.splice(props, 1, '')
    }));
  }
}

funcRecoverMemory(props){
  if (props === undefined){
    this.setState(state => ({
      currentOperand: this.state.memoryList.filter(x => x !== '').slice(-1)[0]
    }));
  } else{
    this.setState(state => ({
      currentOperand: this.state.memoryList[props]
    }));
  }
}

funcAddLast(){
  this.setState(state => ({
    previousOperand: this.state.currentOperand,
    currentOperand: this.state.memoryList.filter(x => x !== '').slice(-1)[0],
    operation: "+"
  }));
  this.funcEqual()
}

funcSaveRegister(){ if (this.state.memoryList.indexOf('') !== -1) {
  this.setState(state => ({
    memoryList: this.state.memoryList.splice(this.state.memoryList.indexOf(''), 1, this.state.currentOperand)
  }));
} else{
  this.setState(state => ({
    memoryList: this.state.memoryList.splice(this.state.memoryList.indexOf(this.state.memoryList[0]), 1, this.state.currentOperand)
  }));
}
console.log(this.state.memoryList)
}
 
render() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="mega_container">
          <div className="container">
                <div className="calculator">
                  <div className="calculator_display">
                    <div className="calculator_display_last">{this.state.previousOperand + this.state.operation}</div>
                    <div className="calculator_display_current">{this.state.currentOperand}</div>
                  </div>
                  <div className="calculator_keys">
                    <button className="number" onClick={() => this.funcDeleteMemory()}>MC</button>
                    <button className="number" onClick={() => this.funcRecoverMemory()}>MR</button>
                    <button className="number" onClick={() => this.funcAddLast()}>M+</button>
                    <button className="number" onClick={() => this.funcSaveRegister()}>MS</button>
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

          <div className="memory_container">
            <div className="memory_cell">
              <div className="memory_display">{this.state.memoryList[0]}</div>
              <button className="memory_button" onClick={() => this.funcRecoverMemory(0)}>MC</button>
              <button className="memory_button" onClick={() => this.funcDeleteMemory(0)}>MR</button>
            </div>
            <div className="memory_cell">
              <div className="memory_display">{this.state.memoryList[1]}</div>
              <button className="memory_button" onClick={() => this.funcRecoverMemory(1)}>MC</button>
              <button className="memory_button" onClick={() => this.funcDeleteMemory(1)}>MR</button>
            </div>
            <div className="memory_cell">
              <div className="memory_display">{this.state.memoryList[2]}</div>
              <button className="memory_button" onClick={() => this.funcRecoverMemory(2)}>MC</button>
              <button className="memory_button" onClick={() => this.funcDeleteMemory(2)}>MR</button>
            </div>
            <div className="memory_cell">
              <div className="memory_display">{this.state.memoryList[3]}</div>
              <button className="memory_button" onClick={() => this.funcRecoverMemory(3)}>MC</button>
              <button className="memory_button" onClick={() => this.funcDeleteMemory(3)}>MR</button>
            </div>

          </div>
        </div>
      </header>
    </div>
  );
}
}