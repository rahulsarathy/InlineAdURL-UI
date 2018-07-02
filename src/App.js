import React, { Component } from 'react';
import Macro from './components/macro.js';
import './App.css';



class App extends Component {
  constructor(){
    super();

    var defaults = {
      departure_date_year_month_day: "2018/08/20",
      return_date_year_month_day: "2018/08/20",
      departure_date_month_day_year: "08/20/2018",
      return_date_month_day_year: "08/20/2018",
      origin: "SFO",
      destination: "LAX",
      number_of_tickets_no_children: "1",
      children: "0",
      infants_in_seat: "0",
      infants_in_lap: "0",
      number_of_tickets: "1",
      "class": "economy",
      "infant_in_lap_yn": 'N',
      "bid": "B380595",
      "sid": "S528"
    }

    this.state = {
      defaults: defaults,
      mainTextInputValue: "",
      macros: [],
      inputValues: {},
      allMatches: [],
      urlArray: [],
      url: ""
    };

    //this.getDefault = this.getDefault.bind(this);
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
    this.createMacroInputs = this.createMacroInputs.bind(this);
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
  var macroIndices = {};
  var splitURL = [];
  var myRegexp = /{\w+}/g;
  var macros = this.state.macros;
  var allMatches = this.state.allMatches;
  var urlArray = [];

  splitURL = url.split(myRegexp);

  for (var i = 0; i< splitURL.length; i++)
  {
    if (allMatches[i] !== undefined)
    {
      urlArray.push(splitURL[i], allMatches[i]);
    }
    else 
    {
      urlArray.push(splitURL[i]);
    }
  }

  for (i = 0; i < macros.length; i++){
    macroIndices[macros[i]] = this.getAllIndices(urlArray, '{' + macros[i] + '}');
  }

  this.setState(
    {
      urlArray: urlArray,
      url: urlArray.join(""),
      macroIndices: macroIndices
    });
}

findMacros(){
  var url = this.state.mainTextInputValue;
  var myRegexp = /{(\w+)}/g,
  macros = [],
  allMatches = [],
  match;

  while ((match = myRegexp.exec(url)) !== null)
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

  const macroTitles = macros.map((macro) => 
    <Macro onChange={(e) => this.handleMacroChange(macro, e)} onClick={() => this.getDefault(macro)} value={this.state.inputValues[macro]} macro={macro} key={macro}/>
  );

  this.setState(
    {
      macroTitles: macroTitles
    });
}

getDefault(macro){
  var inputValues = this.state.inputValues;
  var defaults = this.state.defaults;
  inputValues[macro] = defaults[macro];
  this.setState(
    {
      inputValues: inputValues
    }, 
    () =>
    {
      this.replaceURLOnChange(macro);
    });
}

handleMacroChange(macro, event)
{
  var inputValues = this.state.inputValues;
  inputValues[macro] = event.target.value;
  this.setState({
    inputValues: inputValues
  },
  () => {
    this.replaceURLOnChange(macro);
  }
  );
}

replaceURLOnChange(macro)
{
  var inputValues = this.state.inputValues;
  var macroIndices = this.state.macroIndices;
  var urlArray = this.state.urlArray;
  var replacement = inputValues[macro];


  var macroIndexArray = macroIndices[macro];

  for (var i = 0; i < macroIndexArray.length; i++)
  {
    var index = macroIndexArray[i];
    urlArray[index] = replacement;
  }

  this.setState(
    {
      urlArray: urlArray,
      url: urlArray.join("")
    });
}

getAllIndices(arr, val) {
    var indexes = [], i = -1;
    var proper_val = val;
    while ((i = arr.indexOf(proper_val, i+1)) !== -1){
      indexes.push(i);
    }
    return indexes;
}

  render() {

    const url = this.state.url;
    let title;
    if (url !== "") {
      title = <h1>Inputted URL</h1>
    }

    return (
      <div>
        <div>
        {title}
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
        {this.state.macroTitles}
      </div>
      </div>
      );
  }
}

export default App;
