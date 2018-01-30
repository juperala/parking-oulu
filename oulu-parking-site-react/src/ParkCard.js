import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ParkChart from "./ParkChart";
import Localization from "./Localization";
import "./App.css";

class ParkCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: 7
    };
  }

  handleSetHistory(days) {
    this.setState({
      history: days
    });
  }

  render() {
    const station = this.props.stations.find((item) => (item.ParkingStationId === Number(this.props.match.params.id)));

    return (
      <div className="card">
        <h4 style={{ marginBottom: 0, marginTop: 0 }}>
          {station && station.Name}
        </h4>
        <p style={{ marginTop: 0 }}>
          <b>{Localization.address}</b> {station && station.Address}
          <br />
          <b>{Localization.freespace}</b>{" "}
          {station && station.Freespace !== undefined
            ? station.Freespace + " / " + station.Totalspace
            : Localization.notAvailable}
        </p>
        {station &&
          station.Freespace !== undefined && (
            <div>
              <div style={{ textAlign: "center" }}>
                <div className="park-buttons">
                  <button
                    className={
                      this.state.history === 1 ? "btn primary selected" : "btn primary"
                    }
                    onClick={() => this.handleSetHistory(1)}
                  >
                    {Localization.formatString(Localization.xDay, 1)}
                  </button>
                  <button
                    className={
                      this.state.history === 7 ? "btn primary selected" : "btn primary"
                    }
                    onClick={() => this.handleSetHistory(7)}
                  >
                    {Localization.formatString(Localization.xDays, 7)}
                  </button>
                  <button
                    className={
                      this.state.history === 30 ? "btn primary selected" : "btn primary"
                    }
                    onClick={() => this.handleSetHistory(30)}
                  >
                    {Localization.formatString(Localization.xDays, 30)}
                  </button>
                </div>
              </div>
              <ParkChart
                key={station && station.ParkingStationId}
                stationId={station && station.ParkingStationId}
                history={this.state.history}
              />
            </div>
          )}
        <button className="btn primary" onClick={this.props.history.goBack}>
          {Localization.back}
        </button>
      </div>
    )
  }

}

export default withRouter(ParkCard);
