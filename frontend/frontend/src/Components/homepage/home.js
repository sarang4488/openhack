import React, { Component } from "react";
import NavProfile from "../Navbar/navbar2";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import "../../App.css";
import Footer from "../Footer/footer";
class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authFlag: false
    };
  }

  componentDidMount() {
    if (this.props.location.state.displayprop === "log") {
      this.setState({
        authFlag: true
      });
    }
  }

  render() {
    if (this.state.authFlag) {
      this.props.history.push({
        pathname: "/profile"
      });
    }
    return (
      <React.Fragment>
        <NavProfile
          navdata={this.props.navdata}
          style={{ backgroundColor: "white" }}
        />

        <div id="profileheading">
          <h2>Account Settings</h2>
        </div>
      </React.Fragment>
    );
  }
}
export default Account;
