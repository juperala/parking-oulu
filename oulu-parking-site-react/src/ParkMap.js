import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import ParkButton from "./ParkButton";
import "./App.css";

class ParkMap extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  componentDidMount() {
    fetch(`https://api.oulunparkit.com/parkingstations`)
      .then(result => result.json())
      .then(items => this.setState({ items }));
  }

  static getColor(element) {
    if (element.Freespace !== undefined) {
      const free = Math.floor(element.Freespace / element.Totalspace * 100);
      if (free < 5) return "palevioletred";
      if (free < 20) return "lightyellow";
      return "lightgreen";
    }
    return "lightgray";
  }

  render() {
    const data = this.state.items.map(element => {
      const title = `${element.Name} ${
        element.Freespace !== undefined
          ? `${element.Freespace}/${element.Totalspace}`
          : ""
      }`;
      const color = ParkMap.getColor(element);

      return (
        <ParkButton
          color={color}
          key={element.ParkingStationId}
          lat={element.Coordinates[1]}
          lng={element.Coordinates[0]}
          onClick={() => this.props.onClick(element)}
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
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          bootstrapURLKeys={apiKey}
        >
          {data}
        </GoogleMapReact>
      </div>
    );
  }
}

ParkMap.defaultProps = {
  center: { lat: 65.010835, lng: 25.494934 },
  zoom: 14
};

export default ParkMap;
