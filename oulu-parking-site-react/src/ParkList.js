import React from "react";
import { withRouter } from "react-router-dom";
import Localization from "./Localization";

const parkList = props => {
  const data = props.stations.map(station => {
    const status = `${
      station.Totalspace !== undefined
        ? `${station.Freespace} / ${station.Totalspace}`
        : Localization.notAvailable
      }`;

    return (
      <div
        className="card park-card"
        key={station.ParkingStationId}
        onClick={() => props.history.push(`/station/${station.ParkingStationId}`)}
      >
        <h5>{station.Name}</h5>
        <b>{Localization.address}</b> {station.Address}
        <br />
        <b>{Localization.freespace}</b> {status}
      </div>
    );
  });

  return <div>{data}</div>;
};

export default withRouter(parkList);
