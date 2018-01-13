import React from "react";
import GoogleMapReact from "google-map-react";
import ParkButton from "./ParkButton";
import "./App.css";

function getColor(element) {
  if (element.Freespace !== undefined) {
    const free = Math.floor(element.Freespace / element.Totalspace * 100);
    if (free < 5) return "palevioletred";
    if (free < 20) return "lightyellow";
    return "lightgreen";
  }
  return "lightgray";
}

const parkMap = props => {
  const data = props.stations.map(station => {
    const title = `${station.Name} ${
      station.Freespace !== undefined
        ? `${station.Freespace}/${station.Totalspace}`
        : ""
    }`;
    const color = getColor(station);

    return (
      <ParkButton
        color={color}
        key={station.ParkingStationId}
        lat={station.Coordinates[1]}
        lng={station.Coordinates[0]}
        onClick={() => props.onClick(station)}
      >
        {title}
      </ParkButton>
    );
  });

  let apiKey = null;
  if (process.env.NODE_ENV !== "development") {
    apiKey = {
      key: "AIzaSyBTn6wFPf0DHTf7UL9CZ_hHbI2dldqdzUk"
    };
  }

  return (
    <div className="park-map">
      <GoogleMapReact
        defaultCenter={props.center}
        defaultZoom={props.zoom}
        bootstrapURLKeys={apiKey}
      >
        {data}
      </GoogleMapReact>
    </div>
  );
};

parkMap.defaultProps = {
  center: { lat: 65.010835, lng: 25.494934 },
  zoom: 14
};

export default parkMap;
