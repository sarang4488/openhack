import React, { Component } from "react";
import NavProfile from "../Navbar/navbar5";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import "../../App.css";
import Footer from "../Footer/footer";
import axios from "axios";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserData: {},
      email: "",
      name: "",
      organization: "",
      organizations: "",
      screenName: "",
      address: "",
      city: "",
      states: "",
      street: "",
      zip: "",
      company: "",
      about: "",
      purl: "",
      orgname: "",
      leaveorgname: "",
      businessTitle: "",
      authFlag: false,
      orgFlag: false,
      leaveFlag: false,
      MainName: "",
      organisationvalue: "",
      status: "",
      sponsors: []
    };
    //Bind the handlers to this class
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
    this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
    this.aboutChangeHandler = this.aboutChangeHandler.bind(this);
    this.addressChangeHandler = this.addressChangeHandler.bind(this);
    this.submitUpdate = this.submitUpdate.bind(this);
    this.submitJoin = this.submitJoin.bind(this);
    this.businessTitleChangeHandler = this.businessTitleChangeHandler.bind(
      this
    );
    this.first_name = React.createRef();
    this.last_name = React.createRef();
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    //window.location.reload(1);
  }
  componentDidMount() {
    //  window.location.reload(1);
    const data = {
      screenName: window.localStorage.getItem("screenName")
    };
    console.log("User Info:", localStorage.getItem("screenName"));
    axios
      .get(`http://localhost:8080/user/${data.screenName}`)
      .then(response => {
        console.log("Status Code : ", response);
        console.log("Status", response.data.body);
        if (response.data.statusCodeValue === 200) {
          var user = {};
          // user.name = response.data.body.name;
          // user.email = response.data.body.email;
          // user.purl = response.data.body.purl;
          // user.businessTitle = response.data.body.title;
          // user.street = response.data.body.address.street;
          // user.city = response.data.body.address.state;
          // user.state = response.data.body.address.state;
          // user.zip = response.data.body.address.zip;
          // user.about = response.data.body.about_me;

          this.setState({
            loginFlag: true,
            UserData: user
          });

          this.setState({
            name: response.data.body.name,
            email: response.data.body.email
          });
          if (response.data.body.purl != null) {
            this.setState({
              purl: response.data.body.purl
            });
          }
          if (response.data.body.address != null) {
            this.setState({
              street: response.data.body.address.street,
              city: response.data.body.address.city,
              states: response.data.body.address.state,
              zip: response.data.body.address.zip
            });
          }
          if (response.data.body.title != null) {
            this.setState({
              businessTitle: response.data.body.title
            });
          }
          if (response.data.body.about_me != null) {
            this.setState({
              about: response.data.body.about_me
            });
          }

          if (response.data.body.organization != null) {
            this.setState({
              organization: response.data.body.organization.organization_name,
              status: response.data.body.organization.status
            });
          }

          //  console.log(response.data.body.organization.organization_name);

          // alert(this.state.err)
        } else {
          this.setState({
            loginFlag: false
            //err : "Invalid Request"
          });
          //alert(this.state.err)
        }
        //  console.log("User Data", this.state.UserData);
      });

    axios.get(`http://localhost:8080/organization/names/`).then(response => {
      console.log(response);
      //update the state with the response data
      this.setState({
        sponsors: response.data.body
      });
      console.log("Search :", this.state.sponsors);
      // console.log("No of results :", this.state.properties.length);
    });
  }
  orgnameChangeHandler = e => {
    this.setState({
      orgname: e.target.value
    });
  };
  addressChangeHandler = e => {
    this.setState({
      address: e.target.value
    });
  };
  purlChangeHandler = e => {
    this.setState({
      purl: e.target.value
    });
  };

  cityChangeHandler = e => {
    this.setState({
      city: e.target.value
    });
  };
  streetChangeHandler = e => {
    this.setState({
      street: e.target.value
    });
  };
  statesChangeHandler = e => {
    this.setState({
      states: e.target.value
    });
  };
  zipChangeHandler = e => {
    this.setState({
      zip: e.target.value
    });
  };
  //username change handler to update state variable with the text entered by the user
  emailChangeHandler = e => {
    this.setState({
      email: e.target.value
    });
  };
  //username change handler to update state variable with the text entered by the user
  firstnameChangeHandler = e => {
    this.setState({
      firstname: e.target.value
    });
  };
  //username change handler to update state variable with the text entered by the user
  lastnameChangeHandler = e => {
    this.setState({
      lastname: e.target.value
    });
  };
  //password change handler to update state variable with the text entered by the user
  cityChangeHandler = e => {
    this.setState({
      city: e.target.value
    });
  };
  aboutChangeHandler = e => {
    this.setState({
      about: e.target.value
    });
  };
  businessTitleChangeHandler = e => {
    this.setState({
      businessTitle: e.target.value
    });
  };
  handleSelect = e => {
    console.log(e);
    this.setState({ organisationvalue: e.target.value });
  };
  //submit Property handler to send a request to the node backend
  submitUpdate = e => {
    //prevent page from refresh

    e.preventDefault();
    const data = {
      screenName: localStorage.getItem("screenName"),
      purl: this.state.purl,
      street: this.state.street,
      city: this.state.city,
      states: this.state.states,
      zip: this.state.zip,
      businessTitle: this.state.businessTitle,
      about: this.state.about
    };
    console.log("data", data);
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(
        `http://localhost:8080/user/${data.screenName}/?purl=${
          this.state.purl
        }&title=${this.state.businessTitle}&street=${this.state.street}&city=${
          this.state.city
        }&state=${this.state.states}&zip=${this.state.zip}&aboutMe=${
          this.state.about
        }`
      )
      .then(response => {
        console.log("Status Code : ", response);
        if (response.data.statusCodeValue === 200) {
          this.setState({
            authFlag: true,

            message: "Congratulations! Successfully updated"
          });
          window.location.reload(1);
        } else {
          this.setState({
            authFlag: false,
            message: "Invalid Data "
          });
        }
      });
  };
  //submit Property handler to send a request to the node backend
  submitJoin = e => {
    //prevent page from refresh
    e.preventDefault();
    console.log(this.state.organisationvalue);
    const data = {
      orgname: this.state.organisationvalue,
      screenName: localStorage.getItem("screenName")
    };
    console.log("data", data);
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(
        `http://localhost:8080/organization/${data.orgname}/join/${
          data.screenName
        }`
      )
      .then(response => {
        console.log("Status Code : ", response);
        if (response.data.statusCodeValue === 200) {
          this.setState({
            orgFlag: true,

            message: "Congratulations! Successfully updated"
          });
          window.location.reload(1);
        } else {
          this.setState({
            orgFlag: false,
            message: response.data.body
          });
        }
      });
  };
  submitLeave = e => {
    //prevent page from refresh
    e.preventDefault();
    const data = {
      orgname: this.state.organization,
      screenName: localStorage.getItem("screenName")
    };
    console.log("data", data);
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(
        `http://localhost:8080/organization/${data.orgname}/leave/${
          data.screenName
        }`
      )
      .then(response => {
        console.log("Status Code : ", response.data);
        if (response.data.statusCodeValue === 200) {
          this.setState({
            leaveFlag: true,

            message: "Congratulations! Successfully updated"
          });
          window.location.reload(1);
        } else {
          this.setState({
            leaveFlag: false,
            message: "Invalid Data "
          });
        }
      });
  };

  render() {
    var redirect = null;
    // console.log(this.state.organizations);
    let details2 = this.state.sponsors.map(sponsor => {
      // const imgurl1 = require(`../uploads/${property.img}`);

      return (
        <option value={sponsor.organization_name}>
          {sponsor.organization_name}
        </option>
      );
    });
    // if (!cookie.load("cookie")) {
    //   redirect = <Redirect to="/login" />;
    // }
    // let MainName = this.state.UserData.map(user1 => {
    //   return <div>{user1.name}</div>;
    // });
    let details = (
      <React.Fragment>
        <form>
          <div
            className="inputdiv"
            style={{ border: "1px solid #eee", padding: "20px" }}
          >
            <div class="row">
              <div id="profileheading" style={{ marginLeft: "15px" }}>
                <h3>Manage Organization</h3>
              </div>

              {this.state.organization === "" ? (
                <div class="row">
                  <div
                    class="form-group form-group-lg col-md-3"
                    style={{ marginLeft: "15px" }}
                  >
                    <label className="sr-only" for="firstname">
                      Search Organization
                    </label>
                    <label style={{ fontSize: "15px" }}>
                      Select organization to join : <br />
                    </label>
                    <div style={{ fontSize: "15px", color: "red" }}>
                      {this.state.message}
                    </div>
                    <div style={{ fontSize: "15px" }}>
                      <select
                        value={this.state.organisationvalue}
                        onChange={this.handleSelect}
                      >
                        {" "}
                        <option value="Org">Select</option>
                        {details2}
                      </select>
                    </div>

                    {/* {this.state.organizations.map(organization => (
                      <select
                        value={this.state.organisationvalue}
                        onChange={this.handleSelect}
                      >
                        <option value="grapefruit">Grapefruit</option>
                      </select>
                    ))} */}
                    {/* <input
                      type="text"
                      className="form-control "
                      id="orgname"
                      name="orgname"
                      // ref= {this.first_name}
                      placeholder="Enter organization name"
                      // value={first_name}
                      // placeholder={first_name}
                      onChange={this.orgnameChangeHandler}
                    /> */}
                  </div>
                  <div class="col-md-3">
                    <button
                      onClick={this.submitJoin}
                      style={{
                        backgroundColor: "#0067db",
                        borderColor: "#0067db",
                        fontSize: "18px",
                        marginTop: "2px"
                      }}
                      class="btn btn-primary button-search"
                    >
                      Send Join Request
                    </button>
                  </div>
                </div>
              ) : (
                <div className="row">
                  <div
                    className="form-group form-group-lg col-md-6"
                    style={{ marginLeft: "15px" }}
                  >
                    <label className="sr-only" for="gender">
                      Organization
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="organization"
                      placeholder="Organization"
                      defaultValue={this.state.organization}
                      // placeholder={user.Gender}
                    />
                  </div>
                  <div class="col-md-3">
                    <span
                      style={{
                        backgroundColor: "#0067db",
                        borderColor: "#0067db",
                        fontSize: "18px",
                        marginTop: "2px"
                      }}
                      class="btn btn-primary button-search"
                    >
                      {this.state.status}
                    </span>
                    <button
                      onClick={this.submitLeave}
                      style={{
                        backgroundColor: "#0067db",
                        borderColor: "#0067db",
                        fontSize: "18px",
                        marginTop: "2px"
                      }}
                      class="btn btn-primary button-search"
                    >
                      Leave Organization
                    </button>
                  </div>
                </div>
              )}

              <div id="profileheading" style={{ marginLeft: "15px" }}>
                <h3>Profile Information</h3>
              </div>
              <div class="form-group form-group-lg col-md-6">
                <label className="sr-only" for="firstname">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="firstname"
                  name="firstname"
                  ref="First Name"
                  // ref= {this.first_name}
                  value={localStorage.getItem("screenName")}
                  placeholder="First Name"
                  // value={first_name}
                  // placeholder={first_name}
                  onChange={this.firstnameChangeHandler}
                />
              </div>
            </div>

            <div className="row">
              <div className="form-group form-group-lg col-md-6">
                <label className="sr-only" for="gender">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  value={localStorage.getItem("email")}
                  ref="Email"
                  // placeholder={user.Gender}
                  onChange={this.emailChangeHandler}
                />
              </div>
            </div>

            <div className="row">
              <div className="form-group form-group-lg col-md-6">
                <label style={{ fontSize: "15px" }} for="company">
                  Portrait Url:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="portrait url"
                  defaultValue={this.state.purl}
                  placeholder="Portrait Url"
                  // placeholder={user.Company}
                  onChange={this.purlChangeHandler}
                />
              </div>
            </div>

            <div className="row">
              <div className="form-group form-group-lg col-md-6">
                <label for="company" style={{ fontSize: "15px" }}>
                  Business Title:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="BusinessTitle"
                  defaultValue={this.state.businessTitle}
                  placeholder="Business Title"
                  onChange={this.businessTitleChangeHandler}
                />
              </div>
            </div>
            <div class="row">
              <div className="form-group form-group-lg col-md-12">
                <label style={{ fontSize: "15px" }} for="About">
                  About:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="About"
                  defaultValue={this.state.about}
                  placeholder="About me"
                  onChange={this.aboutChangeHandler}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group form-group-lg col-md-6">
                <label style={{ fontSize: "15px" }} for="city">
                  Street:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="street"
                  placeholder="Street"
                  defaultValue={this.state.street}
                  onChange={this.streetChangeHandler}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group form-group-lg col-md-6">
                <label style={{ fontSize: "15px" }} for="city">
                  City:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  defaultValue={this.state.city}
                  placeholder="City"
                  // placeholder={user.City}
                  onChange={this.cityChangeHandler}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group form-group-lg col-md-6">
                <label style={{ fontSize: "15px" }} for="city">
                  State:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="state"
                  placeholder="State"
                  defaultValue={this.state.states}
                  // placeholder={user.City}
                  onChange={this.statesChangeHandler}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group form-group-lg col-md-6">
                <label style={{ fontSize: "15px" }} for="city">
                  Zip:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="zip"
                  defaultValue={this.state.zip}
                  placeholder="Zip Code"
                  // placeholder={user.City}
                  onChange={this.zipChangeHandler}
                />
              </div>
            </div>
          </div>
        </form>
      </React.Fragment>
    );

    if (this.state.UserData !== "") {
      return (
        <div>
          {redirect}
          <NavProfile
            navdata={this.props.navdata}
            style={{ backgroundColor: "white" }}
          />
          <div class="main-div2">
            <div className="profilephoto" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "32px" }}>
                {localStorage.getItem("screenName")}
                {/* {MainName} */}
              </div>
            </div>
            <div className="container profilemaindiv">
              <div>
                {/*Display the Tbale row based on data recieved*/}
                {details}
              </div>
            </div>
            <div class="col-sm-3">
              <button
                onClick={this.submitUpdate}
                style={{
                  backgroundColor: "#0067db",
                  borderColor: "#0067db",
                  fontSize: "18px",
                  marginLeft: "143px",
                  marginTop: "10px"
                }}
                class="btn btn-primary button-search"
              >
                Save Changes
              </button>
            </div>
            <div style={{ marginTop: "100px" }}>
              <Footer footdata={this.props.footdata} />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <NavProfile
            navdata={this.props.navdata}
            style={{ backgroundColor: "white" }}
          />
          <div class="main-div">
            <h2>No results for this query</h2>
          </div>
          <div style={{ marginTop: "100px" }}>
            <Footer footdata={this.props.footdata} />
          </div>
        </div>
      );
    }
  }
}
export default Profile;
