import React, { Component } from "react";
class ShowName extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log({ prevProps, snapshot });
  }
  render() {
    console.log({ showName: this });
    const { name } = this.props;
    return (
      <div>
        <h3>Hello user:{name}</h3>
      </div>
    );
  }
}
// function ShowName({ name, address }) {
//   return (
//     <div>
//       <h3>Hello user:{name}</h3>
//     </div>
//   );
// }

export default ShowName;
