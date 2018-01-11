import React, { Component } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  Tooltip
} from "recharts";
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
    fetch(url)
      .then(result => result.json())
      .then(items =>
        this.setState({ items: items, updated: new Date().toISOString() })
      );
  }

  dateFormat(x) {
    return DateFormat(x, "dd.mm");
  }

  timeFormat(x) {
    return DateFormat(x, "HH:MM");
  }

  dateTimeFormat(x) {
    return "Aikaleima: " + DateFormat(x, "dd.mm.yy HH:MM");
  }

  render() {
    const data = Array.from(this.state.items);

    return (
      <ResponsiveContainer width={"100%"} height={300}>
        <LineChart key={this.state.updated} data={data}>
          <Line
            type="monotone"
            dataKey="Totalspace"
            stroke="#204a87"
            dot={false}
            name="Paikkoja yhteensä"
          />
          <Line
            type="monotone"
            dataKey="Freespace"
            stroke="#fa0"
            dot={false}
            name="Paikkoja vapaana"
          />
          <CartesianGrid />
          <XAxis
            dataKey="Timestamp"
            tickFormatter={
              this.props.history === 1 ? this.timeFormat : this.dateFormat
            }
            tickCount={4}
            minTickGap={8}
          />
          <YAxis width={30} domain={[0, dataMax => (Math.ceil((dataMax+1)/25)*25)]} />
          <Legend />
          <Tooltip labelFormatter={this.dateTimeFormat} />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

export default ParkChart;
