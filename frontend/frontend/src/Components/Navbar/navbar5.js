import React, { Component } from "react";
import "../../App.css";
import { Route, withRouter, Link } from "react-router-dom";
import cookie from "react-cookies";
import axios from "axios";

//create the Navbar Component
class NavProfile extends Component {
  constructor(props) {
    super(props);
  }

  handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("screenName");
  };
  render() {
    // var logDrop = (
    //   <li class="dropdown">
    //     <a class=" searchlogin dropdown-toggle" data-toggle="dropdown" href="#">
    //       Login
    //       <span class="caret" />
    //     </a>
    //     <ul class="dropdown-menu">
    //       <li>
    //         <button class="btn navbar-btn">
    //           <Link to="/login" class="test" style={{ textDecoration: "none" }}>
    //             <span style={{}}>Traveler Login</span>
    //           </Link>
    //         </button>
    //       </li>
    //       <li>
    //         <button class="btn navbar-btn">
    //           <Link to="/register" class="test">
    //             Owner Login{" "}
    //           </Link>
    //         </button>
    //       </li>
    //     </ul>
    //   </li>
    // );
    // console.log(this.props.authFlag);

    //if (cookie.load("cookie")) {
    var logDrop = (
      <li class="dropdown">
        <a class=" droptext dropdown-toggle" data-toggle="dropdown" href="#">
          <img
            src="images/default-profile-pic2.png"
            style={{ marginRight: "2px" }}
          />
          {localStorage.getItem("screenName")} <span class="caret" />
        </a>
        <ul class="dropdown-menu">
          <li>
            <Link to="/profile" class="test">
              My Profile
            </Link>
          </li>
          <li>
            <Link to="/listhackathon" class="test">
              Create Hackathon
            </Link>
          </li>
          <li>
            <Link to="/organizations" class="test">
              Manage Organization
            </Link>
          </li>
          <li>
            <Link to="/list" class="test">
              Create Organization
            </Link>
          </li>
          <li>
            <Link to="/" class="test" onClick={this.handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </li>
    );
    //}

    return (
      <nav class="navbar navbar-light" style={{ backgroundColor: "white" }}>
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="#">
              <img
                src="images/open.png"
                style={{
                  marginLeft: "140px",
                  width: "200px",
                  height: "60px"
                }}
              />
            </a>
          </div>
          <ul class="nav navbar-nav navbar-right">
            {logDrop}
            <li>
              <button class="btn navbar-btn1">
                <Link
                  to="/hackmain"
                  class="test"
                  style={{ textDecoration: "none" }}
                >
                  Manage Hackathons
                </Link>
              </button>
              <button class="btn navbar-btn1">
                <Link
                  to="/allhackathons"
                  class="test"
                  style={{ textDecoration: "none" }}
                >
                  View All Hackathons
                </Link>
              </button>
              <button class="btn navbar-btn1">
                <Link
                  to="/submithackathon"
                  class="test"
                  style={{ textDecoration: "none" }}
                >
                  Submit Hackathons
                </Link>
              </button>
              <button class="btn navbar-btn1">
                <Link
                  to="/gradehackathon"
                  class="test"
                  style={{ textDecoration: "none" }}
                >
                  Grade Hackathons
                </Link>
              </button>
            </li>
            <li>
              {/* <a class="logoimage" href="">
                <img src="images/HAWAY.svg" />
              </a> */}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavProfile;
