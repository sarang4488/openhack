import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import Navbar4 from "../Navbar/navbar5";
import cookie from "react-cookies";
import Footer from "../Footer/footer";
class hackreport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: {},
      authFlag: false,
      imageView: [],
      profit: "",
      displayprop: "",
      hackName: ""
    };
  }

  componentWillMount() {
    this.setState({
      authFlag: false
    });
  }
  componentDidMount() {
    const data = {
      hackName: this.props.location.state.hackName3
    };

    console.log("props: ", this.props.location.state.hackName3);
    axios
      .get(`http://18.217.156.108:8080/payment/expensereport/${data.hackName}`)
      .then(response => {
        //update the state with the response data
        this.setState({
          authFlag: true,
          teams: response.data.body
        });
        console.log("Search :", this.state.teams);
      });
  }
  render() {
    let foot = <Footer data={this.props.data} />;
    console.log(this.props.location);
    let navbar = <Navbar4 data={this.props.data} />;

    let details = (
      // const imgurl1 = require(`../uploads/${property.img}`);
      <div class="displaypropinfo container-fluid">
        {/* <div class="col-sm-4"><img src={imgurl1} height="200px" width="430px"></img></div> */}
        <div class="headline col-sm-3" style={{ textAlign: "center" }}>
          Total Paid Registration Fees
          <div class="headline">
            <h3 class="hit-headline">
              <div name="displayprop" style={{ marginRight: "5px" }}>
                {this.state.teams.paid_total}
              </div>
            </h3>
          </div>
        </div>
        <div class="headline col-sm-3" style={{ textAlign: "center" }}>
          Total Unpaid Registration Fees
          <div class="headline">
            <h3 class="hit-headline">
              <div name="displayprop" style={{ marginRight: "5px" }}>
                {this.state.teams.not_paid_total}
              </div>
            </h3>
          </div>
        </div>
        <div class="headline col-sm-3" style={{ textAlign: "center" }}>
          Sponsor Revenue
          <div class="headline">
            <h3 class="hit-headline">
              <div name="displayprop" style={{ marginRight: "5px" }}>
                {this.state.teams.number_of_sponsers * 1000}
              </div>
            </h3>
          </div>
        </div>
        <div class="headline col-sm-3" style={{ textAlign: "center" }}>
          PROFIT
          <div class="headline">
            <h3 class="hit-headline">
              <div name="displayprop" style={{ marginRight: "5px" }}>
                {this.state.teams.paid_total +
                  this.state.teams.number_of_sponsers * 1000}
              </div>
            </h3>
          </div>
        </div>
      </div>
    );

    let redirectVar = null;

    if (this.state.properties !== "") {
      return (
        <div>
          {redirectVar}

          <div class="main-div1" style={{ backgroundColor: "#F7F7F8" }}>
            {navbar}
            <div style={{ textAlign: "center", fontSize: "30px" }}>
              Hackathon Earning Report
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
export default hackreport;
