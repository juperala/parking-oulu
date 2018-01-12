import React, { Component } from "react";

class ParkList extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  componentDidMount() {
    fetch(`https://api.oulunparkit.com/parkingstations`)
      .then(result => result.json())
      .then(items => this.setState({ items }));
  }

  render() {
    const data = this.state.items.map(element => {
      const status = `${
        element.Totalspace !== undefined
          ? `${element.Freespace} / ${element.Totalspace}`
          : "Ei tilatietoja"
      }`;

      return (
        <div
          className="card park-card"
          key={element.ParkingStationId}
          onClick={() => this.props.onClick(element)}
        >
          <h5>{element.Name}</h5>
          <b>Osoite:</b> {element.Address}
          <br />
          <b>Vapaat parkkipaikat:</b> {status}
        </div>
      );
    });
    return <div>{data}</div>;
  }
}

export default ParkList;
