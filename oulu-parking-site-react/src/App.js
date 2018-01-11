import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ParkHeader from "./ParkHeader";
import ParkFooter from "./ParkFooter";
import ParkMap from "./ParkMap";
import ParkList from "./ParkList";
//import ParkModal from "./ParkModal";
import ParkCard from "./ParkCard";
import "./App.css";
import "./lit.css";
import "react-tabs/style/react-tabs.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: 7,
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
    this.setState({
      modalIsOpen: false,
      history: 7 });
  }

  handleStationClick(s) {
    this.setState({
      station: s,
      modalIsOpen: true
    });
  }

  handleSetHistory(days) {
    this.setState({
      history: days
    });
  }

  render() {
    return (
      <div className="c" style={{"padding-top": 0}}>
        <ParkHeader />
        <div style={{display: !this.state.modalIsOpen ? "block" : "none"}}>
        <Tabs>
          <TabList>
            <Tab>Karttanäkymä</Tab>
            <Tab>Listanäkymä</Tab>
          </TabList>
          <TabPanel>
            <ParkMap isMarkerShown onClick={this.handleStationClick} />
          </TabPanel>
          <TabPanel>
            <ParkList isMarkerShown onClick={this.handleStationClick} />
          </TabPanel>
        </Tabs>
        </div>
        <ParkCard style={{display: this.state.modalIsOpen ? "block" : "none"}}
          modalIsOpen={this.state.modalIsOpen}
          closeModal={this.closeModal}
          station={this.state.station}
          history={this.state.history}
          handleSetHistory={this.handleSetHistory}
        />
        <ParkFooter />
      </div>
    );
  }
}

export default App;
