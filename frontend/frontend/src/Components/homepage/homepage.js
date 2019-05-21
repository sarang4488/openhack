import React, { Component } from "react";
import "../../App.css";
import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footerhome";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

class homepage extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      authFlag: false,
      error: false
    };
  }

  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {}

  componentDidMount() {
    // axios.get(`http://localhost:8080/organization/names/`).then(response => {
    //   console.log(response);
    //   //update the state with the response data
    //   if(this.state.statusCodeVal)
    //   this.setState({
    //     sponsors: response.data.body,
    //     authFlag:true
    //   });
    //   console.log("Search :", this.state.sponsors);
    //   // console.log("No of results :", this.state.properties.length);
    // });
  }

  render() {
    // if (this.state.authFlag) {
    //   window.location.reload(1);
    //   this.state.authFlag == false;
    // }
    let redirectVar = null;
    let errorMessage = null;
    if (this.state.error) {
      errorMessage = (
        <div
          style={{
            fontSize: "14px",
            backgroundColor: "#ed605a",
            lineHeight: "20px",
            color: "white",
            textAlign: "center",
            padding: "10px"
          }}
        >
          <p>No results found!.</p>
        </div>
      );
    }
    console.log(this.props.location.state);
    let foot = <Footer data={this.props.data} />;
    let navbar = <Navbar data={this.props.data} />;

    return (
      <React.Fragment>
        <header id="main" className="page-landing">
          {redirectVar}
          {navbar}
          <div class="MainContent">
            <h1 className="Headline">
              <span className="Headline_Text">
                Participate in challenging hackathons,
              </span>
              <br />
              <span className="Headline_Text">
                gain experience solving challenges and more, worldwide
              </span>
            </h1>
          </div>
          <div class="SubContent">
            <ul class="Font_List">
              <li class="Font_Item">
                <strong class="Font_Title">
                  Your hackathon experience starts here
                </strong>
                <br />
                <span class="Font_subTitle">
                  Choose a hackathon from the best options
                </span>
              </li>
              <li class="Font_Item">
                <strong class="Font_Title">
                  Register and participate with confidence
                </strong>
                <br />
                <span class="Font_subTitle">
                  Secure payments, peace of mind
                </span>
              </li>
              <li class="Font_Item">
                <strong class="Font_Title">Your code your way</strong>
                <br />
                <span class="Font_subTitle">
                  More clarity, more challenges, no compromises
                </span>
              </li>
            </ul>
          </div>

          <div class="container">
            <div class="row" style={{ font: "white" }} />
          </div>
        </header>

        <div style={{ marginTop: "1px" }}>{foot}</div>
      </React.Fragment>
    );
  }
}

export default homepage;
