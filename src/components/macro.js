import React, { Component } from 'react';



class Macro extends Component {

  render() {
    return (
      <div>
        <input value={this.props.value} onChange={this.props.onChange} className="macro-input"></input>
        <h2 className="macro-header">{this.props.macro}</h2>
      </div>
      );
  }
}

export default Macro;
