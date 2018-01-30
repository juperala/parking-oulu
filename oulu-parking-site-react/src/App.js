import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import ParkHeader from "./ParkHeader";
import ParkNav from "./ParkNav";
import ParkFooter from "./ParkFooter";
import ParkMap from "./ParkMap";
import ParkList from "./ParkList";
import ParkCard from "./ParkCard";
import Localization from "./Localization";
import "./App.css";
import "./lit.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stations: []
    };
    this.handleLanguage = this.handleLanguage.bind(this);
  }

  componentDidMount() {
    fetch(`https://api.oulunparkit.com/parkingstations`)
      .then(result => result.json())
      .then(stations => this.setState({ stations }));
  }

  handleLanguage(lan) {
    Localization.setLanguage(lan);
    this.setState({
    });
  }

  render() {
    return (
      <div className="c" style={{ paddingTop: 0 }}>
        <ParkHeader handleLanguage={this.handleLanguage} />
        <Route path="/:path(|list)" exact component={ParkNav} />
        <Switch>
          <Route path="/" exact render={() => <ParkMap
            stations={this.state.stations}
          />} />
          <Route path="/list" render={() => <ParkList
            stations={this.state.stations}
          />} />
          <Route path="/station/:id" render={() => <ParkCard
            stations={this.state.stations}
          />} />
        </Switch>
        <ParkFooter />
      </div>
    );
  }
}

export default App;
