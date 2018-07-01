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
      macroTitles: [],
      inputValue: "",
      inputValues: {},
      macros: [],
      defaults: defaults,
      split_url: [], 
      macro_hash: {},
      macro_indices: {},
      raw_macros: [],
      show_all_defaults: false
    };

    this.orbitz = this.orbitz.bind(this);
    this.hotWire = this.hotWire.bind(this);
    this.justFly = this.justFly.bind(this);
    this.showAllDefaults = this.showAllDefaults.bind(this);
    this.findMacros = this.findMacros.bind(this);
    this.replaceURLOnChange = this.replaceURLOnChange.bind(this);
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
}


replaceURLOnChange(macro, event){
  var inputValues = this.state.inputValues;
  var url_array = this.state.split_url;
  var correct_macro = '{' + macro + '}';
  inputValues[macro] = event.target.value;
  for (var i = 0; i < this.state.macro_indices[correct_macro].length; i++)
  {
    url_array[this.state.macro_indices[correct_macro][i]] = inputValues[macro];
  }
  this.setState({
     url_head: url_array.join(""),
    inputValues: inputValues
  }, function () {
  // this.findMacros();
});
}

replaceURLNoEvent(macro){
  var inputValues = this.state.inputValues;
  var url_array = this.state.split_url;
  var correct_macro = '{' + macro + '}';
  for (var i = 0; i < this.state.macro_indices[correct_macro].length; i++)
  {
    url_array[this.state.macro_indices[correct_macro][i]] = inputValues[macro];
  }
  this.setState(
  {
    url_head: url_array.join(""),
    inputValues: inputValues
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

getDefault(macro)
{
  if(this.state.defaults.hasOwnProperty(macro))
    return this.state.defaults[macro]
  else
    return ""

}

findMacros()
{
  var url = this.state.inputValue,
  macros = [],
  raw_macros = [],
  macro_hash = {},
  myRegexp = /{(\w+)}/g,
  inputValues = this.state.inputValues,
  match;

  while (match = myRegexp.exec(url))
  {
    raw_macros.push(match[0]);
    macro_hash[match[0]] = match[0];
    if (!macros.includes(match[1]))
      macros.push(match[1])
  }

  for (var i = 0; i < macros.length; i++)
  {
    inputValues[macros[i]] = "";
  }

const macroTitles = macros.map((macro) => 
    <Macro onChange={(e) => this.replaceURLOnChange(macro, e)} value={this.state.inputValues[macro]} key={macro} default={this.getDefault(macro)} macro={macro}/>
  );

  
  this.setState({
    macros: macros,
    macroTitles: macroTitles,
    output_url: url,
    macro_hash: macro_hash,
    raw_macros: raw_macros,
    show_all_defaults: true  }, function () {
    this.constructURL(url, raw_macros);

});
}

constructURL(url, macros){
  var macro_indices = {};
  var split_url = [];
  var final_array = [];
  var myRegexp = /{\w+}/g;

  split_url = url.split(myRegexp);

  for (var i = 0; i< split_url.length; i++)
  {
    if (macros[i] !== undefined)
    {
    final_array.push(split_url[i], macros[i]);
    }
    else {
      final_array.push(split_url[i]);
    }
  }

  for (i = 0; i < macros.length; i++){
    macro_indices[macros[i]] = this.getAllIndices(final_array, macros[i]);
  }

  this.setState(
    {
      split_url: final_array,
      url_head: final_array.join(""),
      macro_indices: macro_indices
    });

}

handleTextAreaChange(event){

  this.setState(
    {inputValue: event.target.value,
      url_head: event.target.value
  }, function () {
});

}

showAllDefaults()
{
  var macros = this.state.macros;
  var inputValues = this.state.inputValues;
  for (var i = 0; i < macros.length; i++) {
    inputValues[macros[i]] = this.state.defaults[macros[i]];
  }
  this.setState({
    inputValues: inputValues}, function () {
      for (i = 0; i < macros.length; i++){
        this.replaceURLNoEvent(macros[i]);
      }
});
}

justFly(){
  this.setState({inputValue: "https://www.justfly.com/flight/search?seg0_date={departure_date_year_month_day}&seg0_time=&seg0_from={origin}&seg0_to={destination}&seg1_date={return_date_year_month_day}&seg1_time=&seg1_from={destination}&seg1_to={origin}&num_adults={number_of_tickets_no_children}&num_children={children}&num_infants={infants_in_seat}&num_infants_lap={infants_in_lap}&seat_class=&preferred_carrier_code=&nearby_airports=0&flexible_date=0&no_penalties=0&non_stop=0&num_segments=2&campaign=16202"}, function () {
  });
}

hotWire(){
 
this.setState({inputValue: "https://vacation.hotwire.com/Flights-Search?bid={bid}&sid={sid}&tmid=21125783062&trip=roundtrip&leg1=from:{origin},to:{destination},departure:{departure_date_month_day_year}TANYT&leg2=from:{destination},to:{origin},departure:{return_date_month_day_year}TANYT&passengers=children:{children},adults:{number_of_tickets},seniors:0,infantinlap:{infant_in_lap_yn}&options=sortby:price&mode=search&paandi=true"}, function () {
  });
}

orbitz(){
  this.setState(
    {
      inputValue: "https://www.orbitz.com/Flights-Search?MDPCID=ORBITZ-US.META.HIPMUNK.DISPLAY-INLINE-1.FLIGHT&MDPDTL=FLT.{origin}.{destination}&trip=oneway&leg1=from:{origin},to:{destination},departure:{departure_date_month_day_year}TANYT&passengers=children:{children},adults:{number_of_tickets},seniors:0,infantinlap:{infant_in_lap_yn}&options=cabinclass:{class},sortby:price&mode=search&paandi=true"
    });
}

  render() {
    let showDefault;
    if (this.state.show_all_defaults){
      showDefault = <button onClick={this.showAllDefaults}>Show Defaults</button>
    }
    return (
      <div>
        <div>
        <h1>
          URL: 
        </h1>
        <a href={this.state.url_head} target="_blank">{this.state.url_head}</a>
      </div>
      <div>
        <div>
          <p>Input url here</p>
          <textarea className="Url-box" rows="8" cols="100" value={this.state.inputValue} onChange={this.handleTextAreaChange}></textarea>
          <div className="buttons">
          <button className="flight-button" onClick={this.orbitz}>Orbitz Oneway Example URL</button>
          <button className="flight-button" onClick={this.justFly}>Justfly URL</button>
          <button className="flight-button" onClick={this.hotWire}>Hotwire URL</button>
          </div>
          </div>
           <button onClick={this.findMacros}>Find Macros</button>
           {showDefault}
        {this.state.macroTitles}
      </div>
      </div>
      );
  }
}

export default App;
