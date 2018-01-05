import React, { Component } from "react";
import ParkMap from "./ParkMap";
import ParkChart from "./ParkChart";
import logo from "./logo.svg";
import "./App.css";
import Modal from "react-modal";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import 'react-tabs/style/react-tabs.css';

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

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
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleStationClick(s) {
    //console.log(`Parking station clicked ${id}`);
    this.setState({
      station: s,
      //   selectionId: id,
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
    //console.log(`Rendering App.`);
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
            <div
            style={{
              // position: "absolute",
              position: "relative",
              left: 0,
              top: 0,
              width: "100%",
              height: "800px"
            }}
          >
            <ParkMap isMarkerShown onClick={this.handleStationClick} />
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={modalStyles}
              contentLabel="Parking station details"
              ariaHideApp={false}
            >
              <button onClick={this.closeModal}>close</button>
              <h2 ref={subtitle => (this.subtitle = subtitle)}>
                {this.state.station && this.state.station.Name}
              </h2>
              <div>
                <span>Osoite:</span>{" "}
                {this.state.station && this.state.station.Address}
              </div>
              <div>
                <span>Käyttöaste:</span>{" "}
                {this.state.station &&
                  this.state.station.Freespace +
                    " / " +
                    this.state.station.Totalspace}
              </div>
              <div>
                Käyttöhistoria:
                <button onClick={() => this.handleSetHistory(1)}>1 VRK</button>
                <button onClick={() => this.handleSetHistory(7)}>7 VRK</button>
                <button onClick={() => this.handleSetHistory(30)}>
                  30 VRK
                </button>
              </div>
              <ParkChart
                key={this.state.station && this.state.station.ParkingStationId}
                stationId={
                  this.state.station && this.state.station.ParkingStationId
                }
                history={this.state.history}
              />
            </Modal>
          </div>
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
        </Tabs>
        <div>
        </div>
      </div>
    );
  }
}

export default App;
