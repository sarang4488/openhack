import React, { Component } from "react";
import { Route, withRouter, Link } from "react-router-dom";
import "../../App.css";
import axios from "axios";
import Navbar4 from "../Navbar/navbar5";
import cookie from "react-cookies";
import Footer from "../Footer/footer";
class ListAllHackathon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [{ Name: "Hackathon 1" }, { Name: "Hackathon 2" }],
      hackathons: [],
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
    const data = {
      screenName: window.localStorage.getItem("screenName")
    };
    axios
      .get(`http://18.217.156.108:8080/hackathon/viewall/${data.screenName}`)
      .then(response => {
        console.log(response);
        //update the state with the response data
        this.setState({
          authFlag: true,
          hackathons: response.data.body
          // properties : this.state.properties,
        });
        console.log("Search :", this.state.properties);
        console.log("No of results :", this.state.properties.length);
      });
  }
  render() {
    let foot = <Footer data={this.props.data} />;
    console.log(this.props.location);
    let navbar = <Navbar4 data={this.props.data} />;

    let details = this.state.hackathons.map(hack => {
      // const imgurl1 = require(`../uploads/${property.img}`);

      return (
        <div class="displaypropinfo container-fluid">
          {/* <div class="col-sm-4">
              <img src={imgurl1} height="200px" width="430px" />
            </div> */}
          <div class="col-sm-8">
            <div class="headline">
              <h3 class="hit-headline">
                <div
                // onClick={this.propertyChangeHandler}
                >
                  {hack.id}:{hack.name}
                </div>
              </h3>
              <div class="btn btn-primary" on>
                <span
                  onClick={this.propertyChangeHandler}
                  name="displayprop"
                  data-value={hack.id}
                  style={{ color: "white" }}
                >
                  Register
                </span>
              </div>
              {/* <button
                onClick={this.submitLogin}
                style={{ marginLeft: "10px" }}
                class="btn btn-warning"
              >
                Open
              </button>
              <button
                onClick={this.submitLogin}
                style={{ marginLeft: "10px" }}
                class="btn btn-danger"
              >
                Close
              </button> */}
            </div>
          </div>
        </div>
      );
    });
    // let details = this.state.properties.map(property => {
    //   // const imgurl1 = require(`../uploads/${property.img}`);
    //   return (
    //     <div class="displaypropinfo container-fluid">
    //       {/* <div class="col-sm-4"><img src={imgurl1} height="200px" width="430px"></img></div> */}
    //       <div class="col-sm-8">
    //         <div class="headline">
    //           <h3 class="hit-headline">
    //             <a>
    //               <div
    //                 onClick={this.propertyChangeHandler}
    //                 name="displayprop"
    //                 data-value={property.Name}
    //               >
    //                 {property.Name}
    //               </div>
    //             </a>
    //           </h3>
    //         </div>
    //         <div class="propdetails">
    //           {property.Type} | <strong>{property.bednumber}</strong> BA |
    //           Sleeps <strong>{property.guests}</strong>
    //         </div>
    //         <div class="price-hit">
    //           <div class="subprice-hit">
    //             <button
    //               onClick={this.submitJoin}
    //               style={{
    //                 backgroundColor: "#0067db",
    //                 borderColor: "#0067db",
    //                 fontSize: "18px"
    //               }}
    //               class="btn btn-primary button-search"
    //             >
    //               Register
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // });
    let redirectVar = null;
    if (this.state.displayprop != "") {
      this.props.history.push({
        pathname: "/registerhackathon",
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
              <h2 style={{ marginLeft: "42%" }}>View Hackathons</h2>
              <h4 style={{ marginLeft: "32%" }}>
                You can Register for Hackathons where you are not judge or owner
                here
              </h4>
              <p style={{ fontSize: "18px" }}>{this.state.message}</p>
            </div>
            {/*Display the Tbale row based on data recieved*/}
            {details}
          </div>
          {foot}
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
export default ListAllHackathon;
