import React, { Component } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";
//create the Navbar Component
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authFlag: false
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  //handle logout to destroy the cookie

  handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("screenName");
  };

  handleClick = () => {
    this.setState({
      authFlag: true
    });
  };
  render() {
    console.log(this.props.email);
    let redirectVar = null;
    if (this.state.authFlag) {
      redirectVar = (
        <Redirect
          to={{
            pathname: "/listyourproperty"
          }}
        />
      );
    }
    let dropDown = (
      <li class="dropdown">
        <a class="dropdown-toggle" data-toggle="dropdown">
          User <span class="caret" />
        </a>
        <ul class="dropdown-menu">
          <li>
            <Link to="/login" class="test">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" class="test">
              Register{" "}
            </Link>
          </li>
        </ul>
      </li>
    );
    if (cookie.load("onboarded")) {
      dropDown = (
        <li class="dropdown">
          <a class="dropdown-toggle" data-toggle="dropdown">
            <img
              src="images/default-profile-pic2.png"
              style={{ marginRight: "2px" }}
            />
            {localStorage.getItem("screenName")} <span class="caret" />
          </a>
          <ul class="dropdown-menu">
            <li>
              <Link to="/profile" class="test">
                My profile
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
    }

    return (
      <nav
        class="navbar navbar-light"
        style={{ backgroundColor: "transparent" }}
      >
        {redirectVar}
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="/home">
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
            {dropDown}
            {/* <li><button class="btn navbar-btn1" onClick={this.handleClick} style={{textDecoration:"none"}}>List Your Property</button></li> */}
            <li>
              <a class="logoimage">
                <img src="images/iconmain.svg" />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
