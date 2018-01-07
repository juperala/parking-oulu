import React, { Component } from "react";
import ParkMap from "./ParkMap";
import ParkList from "./ParkList";
import ParkModal from "./ParkModal";
import logo from "./logo.svg";
import "./App.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: 4,
      station: null,
      modalIsOpen: false
    };
    this.handleStationClick = this.handleStationClick.bind(this);
    this.handleSetHistory = this.handleSetHistory.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleStationClick(s) {
    //console.log(`Parking station clicked ${id}`);
    this.setState({
      station: s,
      modalIsOpen: true
    });
  }

  handleSetHistory(days) {
    console.log(`Setting history ${days}`);
    this.setState({
      history: days
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Oulun Parkit</h1>
        </header>
        <Tabs>
          <TabList>
            <Tab>Karttanäkymä</Tab>
            <Tab>Listanäkymä</Tab>
          </TabList>
          <TabPanel>
            <div className="App-map">
              <ParkMap isMarkerShown onClick={this.handleStationClick} />
            </div>
          </TabPanel>
          <TabPanel>
            <ParkList isMarkerShown onClick={this.handleStationClick} />
          </TabPanel>
        </Tabs>
        <ParkModal
          modalIsOpen={this.state.modalIsOpen}
          closeModal={this.closeModal}
          station={this.state.station}
          history={this.state.history}
          handleSetHistory={this.handleSetHistory}
        />
        <div />
      </div>
    );
  }
}

export default App;
