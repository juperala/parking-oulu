import React from "react";
import Localization from "./Localization";
import logo from "./logo.svg";
import "./App.css";

const parkHeader = props => (
  <div className="justify">
    <header className="park-main-header">
      <img src={logo} className="park-logo" alt="logo" />
      <h1 className="park-title">{Localization.appTitle}</h1>
    </header>
    {Localization.getLanguage() === "fi" ? (
      <div className="park-main-header" style={{ color: "lightgray" }}>
        <p className="normable">FI</p>
        <p>&ensp;&#47;&ensp;</p>
        <p className="boldable" onClick={() => props.handleLanguage("en")}>
          EN
        </p>
      </div>
    ) : (
      <div className="park-main-header" style={{ color: "lightgray" }}>
        <p className="boldable" onClick={() => props.handleLanguage("fi")}>
          FI
        </p>
        <p>&ensp;&#47;&ensp;</p>
        <p className="normable">EN</p>
      </div>
    )}
  </div>
);

export default parkHeader;
