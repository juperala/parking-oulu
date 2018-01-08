import React from "react";
import logo from "./logo.svg";

const parkHeader = () => (
  <header className="park-main-header">
    <img src={logo} className="park-logo" alt="logo" />
    <h1 className="park-title">Oulun Parkit</h1>
  </header>
);

export default parkHeader;
