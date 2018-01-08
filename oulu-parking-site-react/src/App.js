import React, { Component } from "react";
import ParkMap from "./ParkMap";
import ParkList from "./ParkList";
import ParkModal from "./ParkModal";
import logo from "./logo.svg";
import "./App.css";
import "./lit.css";
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
      <div className="c">
        <header className="park-main-header">
          <img src={logo} className="park-logo" alt="logo" />
          <h1 className="park-title">Oulun Parkit</h1>
        </header>

        <Tabs>
          <TabList>
            <Tab>Karttanäkymä</Tab>
            <Tab>Listanäkymä</Tab>
          </TabList>
          <TabPanel>
            <div className="park-map">
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

        <footer>
          <hr/>
          <h5>Oulun Parkit - Oulun pysäköintitalojen tilastot netissä. &copy; 2017 </h5>
        </footer>
      </div>
    );
  }
}

export default App;
