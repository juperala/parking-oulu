import React from "react";
import ParkChart from "./ParkChart";
import "./App.css";

const parkCard = props => (
  <div className="card" style={props.style}>
    <h4 style={{ marginBottom: 0, marginTop: 0 }}>
      {props.station && props.station.Name}
    </h4>
    <p style={{ marginTop: 0 }}>
      <b>Osoite:</b> {props.station && props.station.Address}
      <br />
      <b>Vapaat parkkipaikat:</b>{" "}
      {props.station && props.station.Freespace !== undefined
        ? props.station.Freespace + " / " + props.station.Totalspace
        : "Ei tilatietoja"}
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
                1 VRK
              </button>
              <button
                className={
                  props.history === 7 ? "btn primary selected" : "btn primary"
                }
                onClick={() => props.handleSetHistory(7)}
              >
                7 VRK
              </button>
              <button
                className={
                  props.history === 30 ? "btn primary selected" : "btn primary"
                }
                onClick={() => props.handleSetHistory(30)}
              >
                30 VRK
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
      &#8592; Takaisin
    </button>
  </div>
);

export default parkCard;
