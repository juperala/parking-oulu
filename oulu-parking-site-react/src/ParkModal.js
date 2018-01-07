import React from "react";
import Modal from "react-modal";
import ParkChart from "./ParkChart";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const parkModal = props => (
  <Modal
    isOpen={props.modalIsOpen}
    //   onAfterOpen={this.afterOpenModal}
    onRequestClose={props.closeModal}
    style={modalStyles}
    contentLabel="Parking station details"
    ariaHideApp={false}
  >
    <button onClick={props.closeModal}>close</button>
    <h2 /*ref={subtitle => (this.subtitle = subtitle)}*/>
      {props.station && props.station.Name}
    </h2>
    <div>
      <span>Osoite:</span> {props.station && props.station.Address}
    </div>
    <div>
      <span>Käyttöaste:</span>{" "}
      {props.station &&
        props.station.Freespace + " / " + props.station.Totalspace}
    </div>
    <div>
      Käyttöhistoria:
      <button onClick={() => props.handleSetHistory(1)}>1 VRK</button>
      <button onClick={() => props.handleSetHistory(7)}>7 VRK</button>
      <button onClick={() => props.handleSetHistory(30)}>30 VRK</button>
    </div>
    <ParkChart
      key={props.station && props.station.ParkingStationId}
      stationId={props.station && props.station.ParkingStationId}
      history={props.history}
    />
  </Modal>
);

export default parkModal;
