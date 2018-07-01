import React, { Component } from 'react';
import Macro from './components/macro.js';
import './App.css';



class App extends Component {
  constructor(){
    super();

    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
    this.createMacroInputs = this.createMacroInputs.bind(this);

    this.state = {
      mainTextInputValue: "",
      macros: [],
      inputValues: {}
    };
  }

getInput(macro)
{
  var inputValues = this.state.inputValues;
  if(inputValues.hasOwnProperty(macro))
    return inputValues[macro];
  else
    return ""
}

handleTextAreaChange(event){
  //find macros for every text event change

  this.findMacros(event.target.value);
  //this.createURLArray(event.target.value);
  this.createMacroInputs();
  this.setState(
    {
      mainTextInputValue: event.target.value,
    });

}


findMacros(url){
  var myRegexp = /{(\w+)}/g,
  macros = [],
  allMatches = [],
  match;

  while (match = myRegexp.exec(url))
  {
    allMatches.push(match[0]);
    if (!macros.includes(match[1]))
      macros.push(match[1]);
  }
  this.setState(
  {
    allMatches: allMatches,
    macros: macros
  }
  );
}

createMacroInputs(){
  var macros = this.state.macros;
  console.log(macros);

  const macroTitles = macros.map((macro) => 
    <Macro onChange={(e) => this.handleMacroChange(macro, e)} value={this.state.inputValues[macro]} macro={macro} key={macro}/>
  );

  this.setState(
    {
      macroTitles: macroTitles
    });
}

handleMacroChange(macro, event)
{
  var inputValues = this.state.inputValues;
  inputValues[macro] = event.target.value;
  this.setState({
    inputValues: inputValues
  });
}

  render() {

    return (
      <div>
        <div>
        <h1>
          URL: 
        </h1>
        <a href={this.state.mainTextInputValue}>{this.state.mainTextInputValue}</a>
      </div>
      <div>
        <div>
          <p>Input url here</p>
          <textarea className="Url-box" rows="8" cols="100" value={this.state.mainTextInputValue} onChange={this.handleTextAreaChange}></textarea>
          <div className="buttons">
          <button className="flight-button" onClick={this.orbitz}>Orbitz Oneway Example URL</button>
          <button className="flight-button" onClick={this.justFly}>Justfly URL</button>
          <button className="flight-button" onClick={this.hotWire}>Hotwire URL</button>
          </div>
          </div>
           <button onClick={this.findMacros}>Find Macros</button>
        {this.state.macroTitles}
      </div>
      </div>
      );
  }
}

export default App;
