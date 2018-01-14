import React from "react";
import Localization from "./Localization";
import "./App.css";
import ghlogo from "./GitHub.png";

const parkFooter = () => (
  <footer>
    <hr />
    <div className="justify">
      <h5>{Localization.appFooter}</h5>
      <p>
        <a href="https://github.com/juperala/parking-oulu">
          <img
            className="park-gh-logo"
            src={ghlogo}
            alt="GitHub"
          />
        </a>
      </p>
    </div>
  </footer>
);

export default parkFooter;
