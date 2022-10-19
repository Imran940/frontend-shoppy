import React, { Component } from "react";
import ShowName from "./ShowName";
class Demo extends Component {
  //props can only read where state can be read and write
  state = {
    name: "",
    address: "mumbai",
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate called");
    console.log({ prevProps, prevState, snapshot });
    console.log("------------------------------");
  }
  componentDidMount() {
    //called only once when my component get mounted
    console.log("demo componet mounted..");
    console.log({ currentObj: this });
    console.log("------------------------------");
    this.setState({
      name: "default",
    });
  }
  //1st called
  render() {
    const { name } = this.state;
    return (
      <div>
        <h1>Demo Component</h1>
        <h3>Hello {name}</h3>
        <button onClick={() => this.setState({ name: "Imran" })}>
          Get name
        </button>
        <ShowName name={name} address="mumbai" />
      </div>
    );
  }
}

export default Demo;
