import React, { Component } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

export default class ParkChart extends Component {

  render() {
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
    return (
      <LineChart width={600} height={300} data={data}>
        <Line type="monotone" dataKey="age" stroke="#8884d8" />
        <Line type="monotone" dataKey="BMI" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis />
      </LineChart>
    );
  }
}

