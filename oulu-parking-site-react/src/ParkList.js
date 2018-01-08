import React, { Component } from "react";

class ParkList extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  componentDidMount() {
    //console.log(`Mounting`);
    fetch(`https://api.oulunparkit.com/parkingstations`)
      .then(result => result.json())
      .then(items => this.setState({ items }));
  }

  static getColor(element) {
    if (element.Freespace === -1) return "lightgray";
    else {
      const free = Math.floor(element.Freespace / element.Totalspace * 100);
      if (free > 80) return "lightgreen";
      else if (free > 25) return "lightyellow";
      else return "palevioletred";
    }
  }

  render() {
    //console.log(`ParkMap: Using data ${JSON.stringify(this.state.items)}`);
    const data = this.state.items.map(element => {
      const title = `${element.Name} ${
        element.Totalspace !== -1
          ? `${element.Freespace}/${element.Totalspace}`
          : ""
      }`;
      // const color = ParkList.getColor(element);

      return (
        <div
          className="card park-card"
          key={element.ParkingStationId}
          onClick={() => this.props.onClick(element)}
        >
          {title}
        </div>
      );
    });
    return <div>{data}</div>;
  }
}

export default ParkList;
