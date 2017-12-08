import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
//import ParkButton from './ParkButton';
import styled from 'styled-components';

const ParkButton = styled.button`
background: ${props => props.color};
color: 'white';

font-size: 1em;
margin: 1em;
padding: 0.25em 1em;
border: 2px solid ${props => props.color};
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

  static getColor(element) {
    if (element.Freespace === -1)
      return 'lightgray';
    else {
      const free = Math.floor((element.Freespace / element.Totalspace) * 100);
      if (free > 80)
        return 'lightgreen';
      else if (free > 25)
        return 'lightyellow';
      else
        return 'palevioletred';
    }
  }

  render() {
    const stations = this.state.items;
    console.log(`ParkMap: Using data ${JSON.stringify(this.state.items)}`);

    const data = this.state.items.map((element) => {
      const title = `${element.Name} ${(element.Totalspace !== -1) ? `${element.Freespace}/${element.Totalspace}` : ''}`;
      const color = ParkMap.getColor(element);

      return <ParkButton color={color} key={element.ParkingStationId}
        lat={element.Coordinates[1]}
        lng={element.Coordinates[0]} onClick={() => this.props.onClick(element.ParkingStationId)}>{title}</ParkButton>
    });

    return (
      <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        style={{ height: '300px' }}
      >
        {data}
      </GoogleMapReact>
    );
  }
}
ParkMap.defaultProps = {
  center: { lat: 65.009835, lng: 25.484934 },
  zoom: 14
};

export default ParkMap;