import React from "react";
import "./App.css";
import ghlogo from "./GitHub.png";

const parkFooter = () => (
  <footer>
    <hr />
    <div className="justify">
      <h5>
        Oulun Parkit - Oulun pysäköintitalojen tilatiedot netissä. &copy; 2017.
      </h5>
      <p>
        <a href="https://github.com/juperala/parking-oulu">
          <img className="park-gh-logo" src={ghlogo} alt="Projekti GitHubissa." />
        </a>
      </p>
    </div>
  </footer>
);

export default parkFooter;
