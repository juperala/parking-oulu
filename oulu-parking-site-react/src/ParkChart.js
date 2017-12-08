import React, { Component } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

class ParkChart extends Component {

  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  componentDidMount() {
    console.log(`Mounting`);
    const url = `https://api.oulunparkit.com/parkingstationdetails?ParkingStationId=${this.props.stationId}`;
    console.log(`Using url: ${url}`);
    fetch(url)
      .then(result => result.json())
      .then(items => this.setState({ items }));
  }

  render() {
    const data = Array.from(this.state.items);
    console.log(`ParkChart: Using data ${JSON.stringify(data)}`);
    
    return (
      <LineChart width={600} height={300} data={data}>
        <Line type="monotone" dataKey="Totalspace" stroke="#4884d8" />
        <Line type="monotone" dataKey="Freespace" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        {<XAxis dataKey="Timestamp" />}
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