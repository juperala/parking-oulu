import React, { Component } from 'react';
import ParkMap from './ParkMap';
import ParkChart from './ParkChart';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      /* 
      <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to React</h1>
              </header>
              <p className="App-intro">
                To get started, edit <code>src/App.js</code> and save to reload.
              </p>
            </div>
       */

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Oulun Parkit</h1>
        </header>
        <div>
          <div style={{ position: 'absolute', left: 0, top: 200, width: '50%', height: '100%' }}>
            <ParkMap isMarkerShown />
          </div>
          <div style={{ position: 'absolute', right: 0, top: 200, width: '50%', height: '100%' }}>
            <ParkChart />
          </div>
        </div>
      </div>

      /* 
            <div>
              <div style={{ position: 'absolute', left: 0, top: 0, width: '38%', height: '100%' }}>
                <ParkMap isMarkerShown />
              </div>
              <div style={{ position: 'absolute', right: 0, top: 0, width: '62%', height: '100%' }}>
                <ParkChart />
              </div>
            </div>
       */
    );
  }
}

export default App;
