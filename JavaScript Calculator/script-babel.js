const opRegex = /[x/+-]/;
const opRegexEnds = /[x/+-]$/;
const eqStyle = {
      background: "#026026",
      position: "absolute",
      height: 130,
      bottom: 30
   };

// ------ Display Screen ------
const Output = props => {
  return (
    <div id="display" className="outputScreen">
      {props.currentValue}
    </div>
  );
};

// ------ Formula Display ------
// const Formula = props => {
//   return (
//     <div className="formulaScreen" style={{ minHeight: 15 }}>
//       {props.formula}
//     </div>
//   );
// };




// --------------  CALCULATOR COMPONENT ---------------
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: '0',
      previousValue: '0',
      formula: '',
      currentSign: 'pos',
      lastClicked: ''
    };
    this.maxNum = this.maxNum.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);
    this.initialize = this.initialize.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleNumbers = this.handleNumbers.bind(this);
  }
  
  // Number limit warning ---
  maxNum() {
    this.setState({
      currentValue: 'Overload !!',
      previousValue: this.state.currentValue
    });
    setTimeout(() => this.setState({
      currentValue: this.state.previousValue
    }), 1000);
  }
  
  // Formula Evaluation Handling ---
  handleEvaluate() {
    if (!this.state.currentValue.includes('Overload')) {
      let expr = this.state.formula;
      if(opRegexEnds.test(expr)) {
        expr = expr.slice(0, -1);
      } else {
        expr = expr.replace(/x/g, '*').replace(/-/g, '-');
      }
      
      let answer = Math.round(1000000000000 * eval(expr)) / 1000000000000;
      this.setState({
        currentValue: answer.toString(),
        formula: expr.replace(/\*/g, '.').replace(/-/g, '-') + '=' + answer,
        previousValue: answer,
        evaluated: true
      });
    }
  }
  
  // Operators Handling ---
  handleOperators(e) {
    if (!this.state.currentValue.includes('Overload')) {
      this.setState({
        currentValue: e.target.value,
        evaluated: false
      });
      if (this.state.formula.includes('=')) {
      this.setState({
        formula: this.state.previousValue + e.target.value
      });
    } else {
      this.setState({
        previousValue: !opRegex.test(this.state.currentValue) ? this.state.formula : this.state.previousValue,
        formula: !opRegex.test(this.state.currentValue) ? (this.state.formula += e.target.value) : (this.state.previousValue += e.target.value)
      });
    }
  }
  }
  
  // Numbers Handling ---
  handleNumbers(e) {
    if (!this.state.currentValue.includes('Overload')) {
      this.setState({
        evaluated: false
      });
      if (this.state.currentValue.length > 10) {
        this.maxNum();
      } else if (this.state.evaluated === true) {
        this.setState({
          currentValue: e.target.value,
          formula: e.target.value != '0' ? e.target.value : ''
        });
      } else {
        this.setState({
          currentValue: this.state.currentValue == '0' || opRegex.test(this.state.currentValue) ? e.target.value : this.state.currentValue + e.target.value,
          formula: this.state.currentValue == '0' && e.target.value == '0' ? this.state.formula : /([^.0-9]0)$/.test(this.state.formula) ? this.state.formula.slice(0, -1) + e.target.value : this.state.formula + e.target.value
        });
      }
    }
  }
  
  // Decimal Handling ---
  handleDecimal() {
    if (this.state.evaluated === true) {
      this.setState({
        currentValue: '0.',
        formula: '0.',
        evaluated: false
      });
    } else if (!this.state.currentValue.includes('.') && !this.state.currentValue.includes('Overload')) {
      this.setState({
        evaluated: false
      });
      if (this.state.currentValue.length > 10) {
        this.maxNum();
      } else if (opRegexEnds.test(this.state.formula) || (this.state.currentValue == '0' && this.state.formula === '')) {
        this.setState({
          currentValue: '0.',
          formula: this.state.formula + '0.'
        });
      } else {
        this.setState({
          currentValue: this.state.formula.match(/(-?\d+\.?\d*)$/)[0] + '.',
          formula: this.state.formula + '.'
        });
      }
    }
  }
  
  initialize() {
    this.setState({
      currentValue: '0',
      previousValue: '0',
      formula: '',
      currentSign: 'pos',
      lastClicked: ''
    });
  }
  
  render() {
    return (
      <div>
        <div className="calculator">
          {/*<Formula id="display" formula={this.state.formula.replace(/x/g, "⋅")} /> */}
          <Output id="display" currentValue={this.state.currentValue} />
          <Buttons evaluate={this.handleEvaluate} operators={this.handleOperators} initialize={this.initialize} decimal={this.handleDecimal} numbers={this.handleNumbers} />
        </div>
      </div>
    );
  }
}

// --------------  BUTTON COMPONENT ---------------
class Buttons extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <button id="clear" value="AC" onClick={this.props.initialize} className="lg" style={{background: '#870202'}}> AC </button>
        <button id="divide" value="/" onClick={this.props.operators} style={{ background: '#425594' }}> / </button>
        <button id="multiply" value="x" onClick={this.props.operators} style={{ background: '#425569' }}> x </button>
        <button id="seven" value="7" onClick={this.props.numbers}> 7 </button>
        <button id="eight" value="8" onClick={this.props.numbers}> 8 </button>
        <button id="nine" value="9" onClick={this.props.numbers}> 9 </button>
        <button id="subtract" value="-" onClick={this.props.operators} style={{ background: '#425668' }}> - </button>
        <button id="four" value="4" onClick={this.props.numbers}> 4 </button>
        <button id="five" value="5" onClick={this.props.numbers}> 5 </button>
        <button id="six" value="6" onClick={this.props.numbers}> 6 </button>
        <button id="add" value="+" onClick={this.props.operators} style={{ background: '#425668' }}> + </button>
        <button id="one" value="1" onClick={this.props.numbers}> 1 </button>
        <button id="two" value="2" onClick={this.props.numbers}> 2 </button>
        <button id="three" value="3" onClick={this.props.numbers}> 3 </button>
        <button id="zero" value="0" onClick={this.props.numbers} className="lg"> 0 </button>
        <button id="decimal" value="." onClick={this.props.decimal}> . </button>
        <button id="equals" value="=" onClick={this.props.evaluate} style={eqStyle}> = </button>
      </div>
    );
  }
}


// --------------  MAIN COMPONENT ---------------
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Calculator />
      </div>
    );
  }
}



// --------------  FINAL RENDERING ---------------
ReactDOM.render(<App />, document.getElementById('app'));