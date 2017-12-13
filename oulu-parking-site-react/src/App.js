import React, { Component } from 'react';
import ParkMap from './ParkMap';
import ParkChart from './ParkChart';
import logo from './logo.svg';
import './App.css';
import Modal from 'react-modal';

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectionId: -1,
      modalIsOpen: false
    };
    this.handleStationClick = this.handleStationClick.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleStationClick(id) {
    //console.log(`Parking station clicked ${id}`);
    this.setState({
      selectionId: id,
      modalIsOpen: true
    });
  }

  render() {
    //console.log(`Rendering App.`);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Oulun Parkit</h1>
        </header>
        <div>
          <div style={{ position: 'absolute', left: 0, top: 200, width: '100%', height: '100%' }}>
            <ParkMap isMarkerShown onClick={this.handleStationClick} />
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={modalStyles}
              contentLabel="Example Modal"
            >

              <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
              <button onClick={this.closeModal}>close</button>
              <div>I am a modal</div>
              <ParkChart key={this.state.selectionId} stationId={this.state.selectionId} />
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
