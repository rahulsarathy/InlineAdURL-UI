import React, { Component } from 'react';
import Macro from './components/macro.js';
import './App.css';



class App extends Component {
  constructor(){
    super();

    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);

    this.state = {
      mainTextInputValue: ""
    };
  }

handleTextAreaChange(event){
  this.setState(
    {
      mainTextInputValue: event.target.value
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
