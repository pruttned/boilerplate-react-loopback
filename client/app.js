import React, { Component } from 'react';
import Comp from './comp.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp: new Date()
    }
  }

  render() {
    return (
      <div>-APPS-
        <div>{this.state.timestamp.toLocaleTimeString()}</div>
        <div>
          <Comp />
        </div>
      </div>
    );
  }
}

App.propTypes = {

};

export default App;