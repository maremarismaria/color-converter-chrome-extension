import React, { Component } from 'react';
import ColorConverter from './components/organisms/ColorConverter/ColorConverter';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ColorConverter/>
      </div>
    );
  }
}

export default App;
