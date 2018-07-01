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
      inputValues: {},
      allMatches: [],
      url: ""
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
  this.setState({
    mainTextInputValue: event.target.value
  }, 
  () => {
    this.findMacros();
  });
}

createURLArray()
{
  var url = this.state.mainTextInputValue;
  var macro_indices = {};
  var split_url = [];
  var myRegexp = /{\w+}/g;
  var allMatches = this.state.allMatches;
  var final_array = [];

  split_url = url.split(myRegexp);

  for (var i = 0; i< split_url.length; i++)
  {
    if (allMatches[i] !== undefined)
    {
      final_array.push(split_url[i], allMatches[i]);
    }
    else 
    {
      final_array.push(split_url[i]);
    }
  }

  this.setState(
    {
      url: final_array.join("")
    });
}

findMacros(){
  var url = this.state.mainTextInputValue;
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
  }, 
  () => {
    this.createURLArray();
    this.createMacroInputs();
  });
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
        <a href={this.state.url}>{this.state.url}</a>
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
