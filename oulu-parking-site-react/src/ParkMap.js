import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
//import { Button } from 'reactstrap';
//import ParkButton from './ParkButton';
import styled from 'styled-components';
//import { colors } from '../../constants '

const ParkButton = styled.button`
background: ${props => props.primary ? 'palevioletred' : 'white'};
color: ${props => props.primary ? 'white' : 'palevioletred'};

font-size: 1em;
margin: 1em;
padding: 0.25em 1em;
border: 2px solid palevioletred;
border-radius: 3px;
position: sticky;
`;

class ParkMap extends Component {
  constructor(props) {
    super(props);
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
    console.log(`ParkMap rendering: ${JSON.stringify(stations)}`);

    let listItems;
    if (stations) {
      listItems = stations.map((element) =>
        <ParkButton primary key={element.ParkingStationId}
          lat={element.Coordinates[1]}
          lng={element.Coordinates[0]} onClick={() => this.props.onClick(element.ParkingStationId)}>{element.Name}</ParkButton>
      );
    };

    return (
      <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        style={{ height: '300px' }}
      >
        {listItems}
      </GoogleMapReact>
    );
  }
}
ParkMap.defaultProps = {
  center: { lat: 65.009835, lng: 25.484934 },
  zoom: 14
};

export default ParkMap;