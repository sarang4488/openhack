import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import Navbar4 from "../Navbar/navbar2";
import cookie from "react-cookies";
import Footer from "../Footer/footer";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [
        { Name: "Sarang", requestsPending: 2 },
        { Name: "Darryl", requestsPending: 4 }
      ],
      authFlag: false,
      imageView: [],
      displayprop: ""
    };
    this.propertyChangeHandler = this.propertyChangeHandler.bind(this);
  }

  componentWillMount() {
    this.setState({
      authFlag: false
    });
  }

  propertyChangeHandler = e => {
    this.setState({
      displayprop: e.target.dataset.value
    });
    console.log("Successful test - ", this.state.displayprop);
  };

  componentDidMount() {
    axios.get("http://localhost:3031/results").then(response => {
      //update the state with the response data
      this.setState({
        authFlag: true,
        properties: response.data
      });
      console.log("Search :", this.state.properties);
      console.log("No of results :", this.state.properties.length);
    });
  }

  render() {
    let foot = <Footer data={this.props.data} />;
    console.log(this.props.location);
    let navbar = <Navbar4 data={this.props.data} />;
    let details = this.state.properties.map(property => {
      // const imgurl1 = require(`../uploads/${property.img}`);

      return (
        <div class="displaypropinfo container-fluid">
          {/* <div class="col-sm-4">
            <img src={imgurl1} height="200px" width="430px" />
          </div> */}
          <div class="col-sm-8">
            <div class="headline">
              <h3 class="hit-headline">
                <a>
                  <div
                    onClick={this.propertyChangeHandler}
                    name="displayprop"
                    data-value={property.Name}
                  >
                    {property.Name}
                  </div>
                </a>
              </h3>
              <p>Requests Pending: {property.requestsPending}</p>
            </div>
          </div>
        </div>
      );
    });
    let redirectVar = null;
    if (this.state.displayprop != "") {
      this.props.history.push({
        pathname: "/property",
        state: {
          displayprop: this.state.displayprop
        }
      });
    }

    if (this.state.properties !== "") {
      return (
        <div>
          {redirectVar}

          <div class="main-div1" style={{ backgroundColor: "#F7F7F8" }}>
            {navbar}
            <div>
              <h2 style={{ marginLeft: "35%" }}>Manage your Organisations</h2>

              <p style={{ fontSize: "18px" }}>{this.state.message}</p>
            </div>

            {/*Display the Tbale row based on data recieved*/}
            {details}
            {foot}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div class="main-div1">
            <h2>No results for this query</h2>
          </div>
        </div>
      );
    }
  }
}

export default Results;
