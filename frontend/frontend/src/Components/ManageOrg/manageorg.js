import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import Navbar4 from "../Navbar/navbar5";
import cookie from "react-cookies";
import Footer from "../Footer/footer";

class manageorg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestedMembers: [],
      organization: "",
      members: [],
      authFlag: false,
      imageView: [],
      displayprop: ""
    };
    this.propertyChangeHandler = this.propertyChangeHandler.bind(this);
  }

  componentWillMount() {
    this.setState({
      authFlag: false
    });

    console.log(this.props.location.state.organization);
  }

  propertyChangeHandler = e => {
    this.setState({
      displayprop: e.target.dataset.value
    });
    console.log("Successful test - ", this.state.displayprop);
  };

  componentDidMount() {
    const data = {
      screenName: localStorage.getItem("screenName")
    };
    axios
      .get(
        `http://18.217.156.108:8080/organization/${
          this.props.location.state.organization
        }?screenname=${data.screenName}`
      )
      .then(response => {
        console.log(response.data.body);
        //update the state with the response data
        this.setState({
          authFlag: true,
          requestedMembers: response.data.body.requested_members,
          members: response.data.body.members,
          organization: response.data.body.organization_name
        });
        console.log("Search :", this.state.requestedMembers);
        console.log("No of results :", this.state.organization);
      });
  }

  submitApprove(name) {
    const data = name;

    console.log(data);
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(
        `http://18.217.156.108:8080/organization/${
          this.state.organization
        }/approve/${data}`
      )
      .then(response => {
        console.log("Status Code : ", response);
        if (response.data.statusCodeValue === 200) {
          this.setState({
            authFlag: true,
            message:
              "Congratulations! You have successfully listed your organisation"
          });
          window.location.reload(1);
        } else {
          this.setState({
            authFlag: false,
            message: "Organisation Already Exist "
          });
        }
      });
  }

  submitDelete(name) {
    const data = name;

    console.log(data);
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(
        `http://18.217.156.108:8080/organization/${
          this.state.organization
        }/leave/${data}`
      )
      .then(response => {
        console.log("Status Code : ", response);
        if (response.data.statusCodeValue === 200) {
          this.setState({
            authFlag: true
          });
          window.location.reload(1);
        } else {
          this.setState({
            authFlag: false,
            message: "Organisation Already Exist "
          });
        }
      });
  }

  render() {
    let foot = <Footer data={this.props.data} />;
    // console.log(this.props.location);
    let navbar = <Navbar4 data={this.props.data} />;
    let details = this.state.requestedMembers.map(member => {
      // const imgurl1 = require(`../uploads/${property.img}`);

      return (
        <div class="displaypropinfo container-fluid">
          {/* <div class="col-sm-4">
            <img src={imgurl1} height="200px" width="430px" />
          </div> */}
          <div class="col-sm-8">
            <div class="headline">
              <h3 class="hit-headline">
                <div
                // onClick={this.propertyChangeHandler}
                >
                  {member.screenname}
                </div>
              </h3>
              <button
                onClick={name => {
                  this.submitApprove(member.screenname);
                }}
                // onClick={this.submitApprove(member.name)}
                class="btn btn-primary"
              >
                Accept
              </button>
              <button
                onClick={name => {
                  this.submitDelete(member.screenname);
                }}
                style={{ marginLeft: "10px" }}
                class="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      );
    });

    let details1 = this.state.members.map(member => {
      // const imgurl1 = require(`../uploads/${property.img}`);

      return (
        <div class="displaypropinfo container-fluid">
          {/* <div class="col-sm-4">
            <img src={imgurl1} height="200px" width="430px" />
          </div> */}
          <div class="col-sm-8">
            <div class="headline">
              <h3 class="hit-headline">
                <div
                // onClick={this.propertyChangeHandler}
                >
                  {member.screenname}
                </div>
              </h3>
            </div>
          </div>
        </div>
      );
    });
    let redirectVar = null;

    if (this.state.requestedMembers !== "") {
      return (
        <div>
          {redirectVar}

          <div class="main-div1" style={{ backgroundColor: "#F7F7F8" }}>
            {navbar}
            <div>
              <h2 style={{ marginLeft: "36%" }}>Manage your Organisation</h2>
              <h4 style={{ marginLeft: "37%" }}>
                You can accept or decline invitations here
              </h4>

              <p style={{ fontSize: "18px" }}>{this.state.message}</p>
            </div>

            {/*Display the Tbale row based on data recieved*/}
            <h3 style={{ marginLeft: "2%" }}>Members Pending Approval:</h3>
            {details}

            <h3 style={{ marginLeft: "2%", marginTop: "10%" }}>
              Approved members:
            </h3>
            {details1}
            {foot}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div class="main-div1">
            <h2>No pending requests currently</h2>
          </div>
        </div>
      );
    }
  }
}

export default manageorg;
