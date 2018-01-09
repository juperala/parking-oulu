import React from "react";
import Modal from "react-modal";
import ParkChart from "./ParkChart";
import "./App.css";

// const modalStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)"
//   }
// };

const parkModal = props => (
  <Modal
    isOpen={props.modalIsOpen}
    onRequestClose={props.closeModal}
    // style={modalStyles}
    contentLabel="Parking station details"
    ariaHideApp={false}
  >
    <div className="card maxheight">
      <div className="justify">
      <h5>{props.station && props.station.Name}</h5>
      <button className="btn primary" onClick={props.closeModal}>
        close
      </button>
      </div>
      {/* <p> */}
        <b>Osoite:</b> {props.station && props.station.Address}<br/>  
      {/* </p> */}
      {/* <p> */}
        <b>Vapaat parkkipaikat:</b>{" "}
        {(props.station && props.station.Freespace !== -1) ?
          (props.station.Freespace + " / " + props.station.Totalspace) : "Ei tilatietoja" }
        {/* </p> */}
      
        {/* {(props.station && props.station.Freespace === -1) && <p><b>Käyttöhistoria:</b> Ei tilatietoja</p>} */}
        {(props.station && props.station.Freespace !== -1) && (<div>
          {/* <p>        <b>Käyttöhistoria:</b>
      </p> */}
      <div className="park-main-header">
        <button
          className={(props.history===1) ? "btn primary selected" : "btn primary" }
          onClick={() => props.handleSetHistory(1)}
        >
          1 VRK
        </button>
        <button
          className={(props.history===7) ? "btn primary selected" : "btn primary" }
          onClick={() => props.handleSetHistory(7)}
        >
          7 VRK
        </button>
        <button
          className={(props.history===30) ? "btn primary selected" : "btn primary" }
          onClick={() => props.handleSetHistory(30)}
        >
          30 VRK
        </button>
      </div>
      <ParkChart
        key={props.station && props.station.ParkingStationId}
        stationId={props.station && props.station.ParkingStationId}
        history={props.history}
      /></div>)}
    </div>
  </Modal>
);

export default parkModal;
