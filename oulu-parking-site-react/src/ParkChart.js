import React, { Component } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import DateFormat from "dateformat";

class ParkChart extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  componentDidMount() {
    this.fetchChartData(this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchChartData(nextProps.history);
  }

  fetchChartData(history) {
    let from = new Date();
    from.setDate(from.getDate() - history);

    const url = `https://api.oulunparkit.com/parkingstationdetails?ParkingStationId=${
      this.props.stationId
    }&from=${from.toISOString()}`;
    console.log(`Using url: ${url}`);
    fetch(url)
      .then(result => result.json())
      .then(items => this.setState({ items: items,  updated: new Date().toISOString() }));
  }

  dateFormat(x) {
    return DateFormat(x, "dd.mm");
  }

  timeFormat(x) {
    return DateFormat(x, "HH:MM");
  }

  render() {
    const data = Array.from(this.state.items);
     // console.log(`ParkChart: Using data ${JSON.stringify(data)}`);

    return (
      <ResponsiveContainer width={600} height={300}>
      <LineChart key={this.state.updated} data={data}>
        <Line type="monotone" dataKey="Totalspace" stroke="#4884d8" dot={false}/>
        <Line type="monotone" dataKey="Freespace" stroke="#8884d8" dot={false}/>
        <CartesianGrid stroke="#ccc" />
        <XAxis
          dataKey="Timestamp"
          tickFormatter={this.props.history === 1 ? this.timeFormat : this.dateFormat}
          tickCount={4}
          minTickGap={8}
        />
        <YAxis />
      </LineChart>
      </ResponsiveContainer>
    );
  }
}

export default ParkChart;
