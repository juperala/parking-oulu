import React, { Component } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

class ParkChart extends Component {

  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  componentDidMount() {
    console.log(`Mounting`);
    //const url = `https://api.oulunparkit.com/parkingstationdetails?ParkingStationId=${this.props.stationId}&to=${new Date().toISOString()}`;
    //const url = `https://api.oulunparkit.com/parkingstationdetails?ParkingStationId=${this.props.stationId}&to=2017-12-30T19:49:46.000Z`;
    const url = `https://api.oulunparkit.com/parkingstationdetails?ParkingStationId=${this.props.stationId}`;
    console.log(`Using url: ${url}`);
    fetch(url)
      .then(result => result.json())
      .then(items => this.setState({ items }));

    // 2017-12-30T19:49:46.000Z
    // 2017-12-07T18:25:59.048Z
  }

  render() {
    const details = this.state.items['Items'];
    console.log(`ParkChart: Rendering ${JSON.stringify(details)}`);
    let listItems;
    if (details) {
      listItems = details.map((e) => {
        return {
          FreeSpace: Number(e.Freespace),
          TotalSpace: Number(e.Totalspace),
          TimeStamp: e.Timestamp
        };
      });
      console.log(`ParkChart: listItems ${JSON.stringify(listItems)}`);
    }

    return (
      <LineChart width={600} height={300} data={listItems}>
        <Line type="monotone" dataKey="TotalSpace" stroke="#4884d8" />
        <Line type="monotone" dataKey="FreeSpace" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        {<XAxis dataKey="TimeStamp" />}
        <YAxis />
      </LineChart>
    );
  }

  /* 
    const data = [
      {
        date: '16.8',
        BMI: 20.57,
        age: 12,
      },
      {
        date: '17.8',
        BMI: 24.28,
        age: 26,
      },
      {
        date: '18.8',
        BMI: 24.41,
        age: 30,
      },
      {
        date: '19.8',
        BMI: 23.77,
        age: 32,
      },
    ];
   */

}

export default ParkChart;