import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class ParkMap extends Component {
  constructor() {
    super();
    this.state = { items: [] };
  }
  componentDidMount() {
    console.log(`Mounting`);
    fetch(`https://api.oulunparkit.com/parkingstations`)
      .then(result => result.json())
      .then(items => this.setState({ items }));
  }

  render() {
    const stations = this.state.items['Items'];
    console.log(`Rendering: ${JSON.stringify(stations)}`);

    let listItems;
    if (stations) {
      console.log(`Parsing ListItems`);
      stations.map((element) => {
        console.log(`ListItems: ${element.ParkingStationId}`);      
        console.log(`ListItems: ${element.Coordinates[1]}`);      
        console.log(`ListItems: ${element.Coordinates[0]}`);      
        console.log(`ListItems: ${element.Name}`);              
      });
      listItems = stations.map((element) =>
        <AnyReactComponent key={element.ParkingStationId}
          lat={element.Coordinates[1]}
          lng={element.Coordinates[0]}
          text={element.Name} />
      );
    }
    if(listItems) {
      console.log(`ListItems: ${listItems}`);      
    }
 
      
    return (
      <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        style={{ height: '300px' }}
      >

        {listItems}



        {/*<AnyReactComponent
          lat={65.011155}
          lng={25.51248}
          text={'Google Mssap'}
        />*/}
      </GoogleMapReact>
    );
  }
}
ParkMap.defaultProps = {
  center: { lat: 65.011155, lng: 25.51248 },
  zoom: 11
};

export default ParkMap;