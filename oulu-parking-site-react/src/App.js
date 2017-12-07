import React, { Component } from 'react';
import ParkMap from './ParkMap';
import ParkChart from './ParkChart';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectionId: -1,
    };
    this.handleStationClick = this.handleStationClick.bind(this);
  }


  handleStationClick(id) {
    console.log(`Parking station clicked ${id}`);
    this.setState({
      selectionId: id,
    });
  }

  render() {
    console.log(`Rendering App.`);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Oulun Parkit</h1>
        </header>
        <div>
          <div style={{ position: 'absolute', left: 0, top: 200, width: '50%', height: '100%' }}>
            <ParkMap isMarkerShown onClick={this.handleStationClick} />
          </div>
          <div style={{ position: 'absolute', right: 0, top: 200, width: '50%', height: '100%' }}>
            {(this.state.selectionId !== -1) && <ParkChart key={this.state.selectionId} stationId={this.state.selectionId}/>}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
