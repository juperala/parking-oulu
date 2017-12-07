import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ParkMap from './ParkMap';
import ParkChart from './ParkChart';
import registerServiceWorker from './registerServiceWorker';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';


  


ReactDOM.render(
    <div>
    <div><ParkMap isMarkerShown /></div>
    {/*<div><ParkChart /></div>*/}
  </div>, document.getElementById('root'));

//ReactDOM.render(<ParkMap isMarkerShown />, document.getElementById('root'));
//ReactDOM.render(<ParkChart />, document.getElementById('root'));

//ReactDOM.render(<App />, document.getElementById('root'));
//registerServiceWorker();