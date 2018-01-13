import React from "react";

const parkList = props => {
  const data = props.stations.map(station => {
    const status = `${
      station.Totalspace !== undefined
        ? `${station.Freespace} / ${station.Totalspace}`
        : "Ei tilatietoja"
    }`;

    return (
      <div
        className="card park-card"
        key={station.ParkingStationId}
        onClick={() => props.onClick(station)}
      >
        <h5>{station.Name}</h5>
        <b>Osoite:</b> {station.Address}
        <br />
        <b>Vapaat parkkipaikat:</b> {status}
      </div>
    );
  });

  return <div>{data}</div>;
};

export default parkList;
