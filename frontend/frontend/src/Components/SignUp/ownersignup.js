import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router";
import Navbar2 from '../Navbar/navbar2';

class SignupOwner extends Component {
  constructor(props) {
    super(props);

    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleEmail = this.handleEmail.bind(this);

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      type: "",

      authFlag: false
    };
  }

  handleFirstName = e => {
    this.setState({
      firstname: e.target.value
    });
  };

  handleLastName = e => {
    this.setState({
      lastname: e.target.value
    });
  };

  handleEmail = e => {
    this.setState({
      email: e.target.value
    });
  };

  handlePassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  handleSignmeup = async e => {
    e.preventDefault();
    var data = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      type: "owner"
    };
    axios.post("http://localhost:3031/register", data).then(response => {
      if ((response.status = 200)) {
        this.setState({
          authFlag: true
        });
      } else {
        this.setState({
          authFlag: false
        });
      }
    });
  };

  render() {
    let redi = null;
    if (this.state.authFlag) {
      redi = <Redirect to="/login" />;
    }
    return (
      <React.Fragment>
      <body id="SignUpForm">
        {redi}
        <Navbar2 navdata = {this.props.navdata}/>
        <div className="panel">
          <h2>Owner Sign up for HomeAway</h2>
          <p className="text-center">
            Already have an account? <Link to="/ownerlogin">Log In</Link>
          </p>
        </div>
        <div className="signup_form" style={{textAlign:"center"}}>
          <div className="container">
            <div className="row">
              <div className="main-div-signup col-md-6 login-sec"style={{marginLeft:"300px"}} >
                <form className="login-form">
                  <div className="sub-div">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        autoFocus
                        onChange={this.handleFirstName}
                        placeholder="First Name"
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="text"
                        onChange={this.handleLastName}
                        class="form-control"
                        placeholder="Last name"
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        onChange={this.handleEmail}
                        placeholder="Email Address"
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="password"
                        class="form-control"
                        onChange={this.handlePassword}
                        placeholder="Password"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-warning btn-lg btn-block form-control"
                      onClick={this.handleSignmeup}
                    >
                      Sign Me Up
                    </button>
                  </div>
                  <br />
                  <br />
                </form>
                <br />

                {/* <div className="hr-center text-center">
                    <span className="text-center">
                      <em>or</em>
                    </span>
                  </div> */}

                <hr width="300px" />

                <div className="copy-text">
                  By creating an account you are accepting our{" "}
                  <a href="#">Terms and Conditions </a>
                  and <a href="#">Privacy Policy</a>.
                </div>
              </div>
            </div>
          </div>
        </div>
        </body>
      </React.Fragment>
    );
  }
}

export default SignupOwner;