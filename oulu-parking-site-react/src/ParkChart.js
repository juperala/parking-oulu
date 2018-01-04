import React, { Component } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import DateFormat from "dateformat";

class ParkChart extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  componentDidMount() {
    //console.log(`Mounting`);
    const url = `https://api.oulunparkit.com/parkingstationdetails?ParkingStationId=${
      this.props.stationId
    }`;
    //console.log(`Using url: ${url}`);
    fetch(url)
      .then(result => result.json())
      .then(items => this.setState({ items }));
  }

  dateFormat(x) {
    return DateFormat(x, "dd.mm");
  }

  render() {
    const data = Array.from(this.state.items);
    //console.log(`ParkChart: Using data ${JSON.stringify(data)}`);

    return (
      <LineChart width={600} height={300} data={data}>
        <Line type="monotone" dataKey="Totalspace" stroke="#4884d8" />
        <Line type="monotone" dataKey="Freespace" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis
          dataKey="Timestamp"
          tickFormatter={this.dateFormat}
          tickCount={4}
          minTickGap={8}
        />
        <YAxis />
      </LineChart>
    );
  }
}

export default ParkChart;
