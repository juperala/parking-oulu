import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import Localization from "./Localization";
import "./App.css";

const parkNav = props => (
  <div>
    <ul className="park-nav-list">
      <NavLink className="park-nav-item" activeClassName="park-nav-item-active" to="/" exact>{Localization.mapView}</NavLink>
      <NavLink className="park-nav-item" activeClassName="park-nav-item-active" to="/list">{Localization.listView}</NavLink>
    </ul>
  </div>
);

export default withRouter(parkNav);
