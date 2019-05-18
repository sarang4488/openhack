import React, { Component } from "react";
import NavProfile from "../Navbar/navbar2";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import "../../App.css";
import Footer from "../Footer/footer";
class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    var redirect = null;
    if (!cookie.load("cookie")) {
      redirect = <Redirect to="/login" />;
    }
    return (
      <React.Fragment>
        {redirect}
        <NavProfile
          navdata={this.props.navdata}
          style={{ backgroundColor: "white" }}
        />
        <div className="container profilemaindiv">
          <div id="profileheading">
            <h2>Account Settings</h2>
          </div>
          <div style={{ border: "1px solid #d3d8de", marginBottom: "30px" }}>
            <div>
              <h3> &nbsp; &nbsp;Change your email address</h3>
            </div>
            <hr />
            <form>
              <div class="row">
                <div
                  style={{
                    paddingTop: "22px",
                    textAlign: "right",
                    color: "rgb(94,109,119)"
                  }}
                  class="form-group form-group-lg col-md-2"
                >
                  <label for="location">Email Address</label>
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control "
                    id="location"
                    name="location"
                    placeholder="email"
                    onChange={this.locationChangeHandler}
                  />
                  <br />
                  <p style={{ color: "red" }}>
                    This will update your account email address for future
                    reservations. If you need to update your email address for
                    an existing reservation, please reach out to the owner or
                    property manager, and they can update their records.
                  </p>
                  <button
                    type="submit"
                    className="btnprofile btn-lg"
                    onClick={this.searchHandler}
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div style={{ border: "1px solid #d3d8de" }}>
            <div>
              <h3> &nbsp; &nbsp;Change your password</h3>
            </div>
            <hr />
            <div class="row">
              <div
                style={{
                  paddingTop: "22px",
                  textAlign: "right",
                  color: "rgb(94,109,119)"
                }}
                class="form-group form-group-lg col-md-2"
              >
                <label for="location">Current Password</label>
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control "
                  id="location"
                  name="location"
                  onChange={this.locationChangeHandler}
                />
                <br />
              </div>
            </div>
            <div class="row">
              <div
                style={{
                  paddingTop: "22px",
                  textAlign: "right",
                  color: "rgb(94,109,119)"
                }}
                class="form-group form-group-lg col-md-2"
              >
                <label for="location">New Password</label>
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control "
                  id="location"
                  name="location"
                  onChange={this.locationChangeHandler}
                />
                <br />
              </div>
            </div>
            <div class="row">
              <div
                style={{
                  paddingTop: "22px",
                  textAlign: "right",
                  color: "rgb(94,109,119)"
                }}
                class="form-group form-group-lg col-md-2"
              >
                <label for="location">Confirm Password</label>
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control "
                  id="location"
                  name="location"
                  onChange={this.locationChangeHandler}
                />
                <br />
                <button
                  type="submit"
                  className="btnprofile btn-lg"
                  onClick={this.searchHandler}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "100px" }}>
          <Footer footdata={this.props.footdata} />
        </div>
      </React.Fragment>
    );
  }
}
export default Account;
