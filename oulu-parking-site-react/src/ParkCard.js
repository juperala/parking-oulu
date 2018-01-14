import React from "react";
import ParkChart from "./ParkChart";
import Localization from "./Localization";
import "./App.css";

const parkCard = props => (
  <div className="card" style={props.style}>
    <h4 style={{ marginBottom: 0, marginTop: 0 }}>
      {props.station && props.station.Name}
    </h4>
    <p style={{ marginTop: 0 }}>
      <b>{Localization.address}</b> {props.station && props.station.Address}
      <br />
      <b>{Localization.freespace}</b>{" "}
      {props.station && props.station.Freespace !== undefined
        ? props.station.Freespace + " / " + props.station.Totalspace
        : Localization.notAvailable}
    </p>
    {props.station &&
      props.station.Freespace !== undefined && (
        <div>
          <div style={{ textAlign: "center" }}>
            <div className="park-buttons">
              <button
                className={
                  props.history === 1 ? "btn primary selected" : "btn primary"
                }
                onClick={() => props.handleSetHistory(1)}
              >
                {Localization.formatString(Localization.xDay, 1)}
              </button>
              <button
                className={
                  props.history === 7 ? "btn primary selected" : "btn primary"
                }
                onClick={() => props.handleSetHistory(7)}
              >
                {Localization.formatString(Localization.xDays, 7)}
              </button>
              <button
                className={
                  props.history === 30 ? "btn primary selected" : "btn primary"
                }
                onClick={() => props.handleSetHistory(30)}
              >
                {Localization.formatString(Localization.xDays, 30)}
              </button>
            </div>
          </div>
          <ParkChart
            key={props.station && props.station.ParkingStationId}
            stationId={props.station && props.station.ParkingStationId}
            history={props.history}
          />
        </div>
      )}
    <button className="btn primary" onClick={props.handleCloseDetails}>
      {Localization.back}
    </button>
  </div>
);

export default parkCard;
