import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import Navbar2 from "../Navbar/navbar2";

//Define a SignUp Component
class SignUp extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      name: "",
      screenName: "",
      email: "",
      password: "",
      error: false,
      authFlag: false
    };
    //Bind the handlers to this class
    this.nameChangeHandler = this.nameChangeHandler.bind(this);
    this.screenNameChangeHandler = this.screenNameChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    this.setState({
      authFlag: false
    });
  }
  //firstname change handler to update state variable with the text entered by the user
  nameChangeHandler = e => {
    this.setState({
      name: e.target.value
    });
  };
  //lastname change handler to update state variable with the text entered by the user
  screenNameChangeHandler = e => {
    this.setState({
      screenName: e.target.value
    });
  };
  //email change handler to update state variable with the text entered by the user
  emailChangeHandler = e => {
    this.setState({
      email: e.target.value
    });
  };
  //password change handler to update state variable with the text entered by the user
  passwordChangeHandler = e => {
    this.setState({
      password: e.target.value
    });
  };
  //submit Login handler to send a request to the node backend
  submitSignup = e => {
    //prevent page from refresh
    e.preventDefault();
    const data = {
      name: this.state.name,
      screenName: this.state.screenName,
      email: this.state.email,
      password: this.state.password
      //type: "traveler"
    };
    console.log(data);
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(
        `http://localhost:8080/signup/?name=${this.state.name}&email=${
          this.state.email
        }&password=${this.state.password}&screenname=${this.state.screenName}`
      )
      .then(response => {
        console.log("Status Code : ", response);
        if (response.status == 201) {
          this.setState({
            authFlag: true
          });
          localStorage.setItem("email", this.state.email);
        } else {
          console.log("test");
          this.setState({
            authFlag: false
          });
        }
      })
      .catch(err => {
        this.setState({ error: true });
        console.log(err);
      });
  };
  render() {
    // redirect based on successful login
    let redirectVar = null;
    if (this.state.authFlag) {
      console.log("test");
      redirectVar = <Redirect to="/login" />;
    }
    if (this.state.authFlag === false) {
      redirectVar = <Redirect to="/register" />;
    }
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
          <p>The user already exists. Try to log in.</p>
        </div>
      );
    }
    return (
      <body id="SignUpForm">
        <div>
          {redirectVar}
          <Navbar2 navdata={this.props.navdata} />
          <div class="container">
            <div class="panel">
              <h2>Sign up for OpenHack</h2>
              <p>
                Already have an account?<Link to="/login">Log In</Link>
              </p>
            </div>
            <div class="signup-form">
              <div class="main-div-signup">
                <div class="sub-div">
                  {errorMessage}
                  <div class="form-group">
                    <input
                      required
                      onChange={this.nameChangeHandler}
                      type="text"
                      class="form-control"
                      name="name"
                      placeholder="First Name"
                      style={{
                        width: "48%",
                        display: "inline-block",
                        marginRight: "18px",
                        marginLeft: "1px"
                      }}
                    />
                    <input
                      required
                      onChange={this.screenNameChangeHandler}
                      type="text"
                      class="form-control"
                      name="screenName"
                      placeholder="Last Name"
                      style={{ width: "48%", display: "inline-block" }}
                    />
                    <input
                      required
                      onChange={this.emailChangeHandler}
                      type="email"
                      class="form-control"
                      name="email"
                      placeholder="Email address"
                    />
                    <input
                      onChange={this.passwordChangeHandler}
                      type="password"
                      pattern=".{6,}"
                      class="form-control"
                      name="password"
                      placeholder="Password"
                    />
                    <br />
                    <button onClick={this.submitSignup} class="btn btn-warning">
                      Sign Me Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    );
  }
}
//export Sign Up Component
export default SignUp;
