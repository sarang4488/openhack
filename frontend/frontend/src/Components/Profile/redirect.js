import React, { Component } from "react";
import NavProfile from "../Navbar/navbar2";
import cookie from "react-cookies";
import axios from "axios";
import { Redirect } from "react-router";
import "../../App.css";
import Footer from "../Footer/footer";
class RedirectPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authflag: false
    };
  }

  componentDidMount() {
    //  window.location.reload(1);
    const data = {
      email: localStorage.getItem("email")
    };

    axios
      .get(`http://localhost:8080/activate?email=${data.email}`)
      .then(response => {
        console.log("Status Code : ", response.data.body.screenname);
        // console.log(response.data);
        if (response.data.statusCodeValue === 200) {
          this.setState({
            authFlag: true,
            email: response.data
          });
        } else {
          this.setState({
            authFlag: false
          });
        }
      })
      .catch(err => {
        this.setState({ error: true });
        console.log(err);
      });
  }

  render() {
    var redirect = null;
    if (this.state.authFlag) {
      redirect = <Redirect to="/login" />;
    }
    return (
      <React.Fragment>
        {redirect}
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
export default RedirectPage;
