import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ParkHeader from "./ParkHeader";
import ParkFooter from "./ParkFooter";
import ParkMap from "./ParkMap";
import ParkList from "./ParkList";
import ParkCard from "./ParkCard";
import "./App.css";
import "./lit.css";
import "react-tabs/style/react-tabs.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stations: [],
      station: null,
      history: 7
    };
    this.handleStationClick = this.handleStationClick.bind(this);
    this.handleSetHistory = this.handleSetHistory.bind(this);
    this.handleCloseDetails = this.handleCloseDetails.bind(this);
  }

  componentDidMount() {
    fetch(`https://api.oulunparkit.com/parkingstations`)
      .then(result => result.json())
      .then(stations => this.setState({ stations }));
  }

  handleCloseDetails() {
    this.setState({
      station: null,
      history: 7
    });
  }

  handleStationClick(s) {
    this.setState({
      station: s
    });
  }

  handleSetHistory(days) {
    this.setState({
      history: days
    });
  }

  render() {
    return (
      <div className="c" style={{ paddingTop: 0 }}>
        <ParkHeader />
        <div
          style={{ display: this.state.station === null ? "block" : "none" }}
        >
          <Tabs>
            <TabList>
              <Tab>Karttanäkymä</Tab>
              <Tab>Listanäkymä</Tab>
            </TabList>
            <TabPanel>
              <ParkMap
                isMarkerShown
                onClick={this.handleStationClick}
                stations={this.state.stations}
              />
            </TabPanel>
            <TabPanel>
              <ParkList
                onClick={this.handleStationClick}
                stations={this.state.stations}
              />
            </TabPanel>
          </Tabs>
        </div>
        <ParkCard
          style={{ display: this.state.station !== null ? "block" : "none" }}
          station={this.state.station}
          history={this.state.history}
          handleCloseDetails={this.handleCloseDetails}
          handleSetHistory={this.handleSetHistory}
        />
        <ParkFooter />
      </div>
    );
  }
}

export default App;
