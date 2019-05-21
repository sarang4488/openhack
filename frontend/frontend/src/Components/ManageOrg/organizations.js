import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import Navbar4 from "../Navbar/navbar5";
import cookie from "react-cookies";
import Footer from "../Footer/footer";

class Organizations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organization: "",
      organizations: [],
      authFlag: false,
      imageView: [],
      displayprop: ""
    };
    this.organizationChangeHandler = this.organizationChangeHandler.bind(this);
  }

  componentWillMount() {
    this.setState({
      authFlag: false
    });
  }

  //   propertyChangeHandler = e => {
  //     this.setState({
  //       displayprop: e.target.dataset.value
  //     });
  //     console.log("Successful test - ", this.state.displayprop);
  //   };

  organizationChangeHandler = e => {
    console.log(e.target.dataset.value);
    this.setState({
      organization: e.target.dataset.value
    });
  };

  componentDidMount() {
    const data = {
      screenName: localStorage.getItem("screenName")
    };
    axios
      .get(`http://localhost:8080/organization/owner/${data.screenName}`)
      .then(response => {
        console.log(response);
        //update the state with the response data
        this.setState({
          authFlag: true,
          organizations: response.data.body
        });
        console.log("Search :", this.state.organizations);
        // console.log("No of results :", this.state.properties.length);
      });
  }

  submitOrganisation = e => {
    e.preventDefault();
    const data = {
      // owner: cookie.load("cookie3"),
      name: this.state.name,
      owner: this.state.owner,
      description: this.state.description,
      address: this.state.address
    };

    console.log(data);
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(
        `http://localhost:8080/organization?name=${
          this.state.name
        }&owner_name=${this.state.owner}&description=${this.state.description}`
      )
      .then(response => {
        console.log("Status Code : ", response);
        if (response.data.statusCodeValue === 200) {
          this.setState({
            authFlag: true,
            message:
              "Congratulations! You have successfully listed your organisation"
          });
        } else {
          this.setState({
            authFlag: false,
            message: "Organisation Already Exist "
          });
        }
      });
  };

  render() {
    let foot = <Footer data={this.props.data} />;
    // console.log(this.props.location);
    let navbar = <Navbar4 data={this.props.data} />;
    let details = this.state.organizations.map(org => {
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
                  onClick={this.organizationChangeHandler}
                  name="organization"
                  data-value={org.organization_name}
                >
                  {org.organization_name}
                </div>
              </h3>
              <p>Requests Pending: {org.requested_members.length}</p>
              <p>Members: {org.members.length}</p>
            </div>
          </div>
        </div>
      );
    });
    let redirectVar = null;
    if (this.state.organization != "") {
      this.props.history.push({
        pathname: "/memberlist",
        state: {
          organization: this.state.organization
        }
      });
    }

    if (this.state.properties !== "") {
      return (
        <div>
          {redirectVar}

          <div class="main-div1" style={{ backgroundColor: "#F7F7F8" }}>
            {navbar}
            <div>
              <h2 style={{ marginLeft: "36%" }}>Manage your Organisations</h2>
              <h4 style={{ marginLeft: "36%" }}>
                You can view all organisations you created here
              </h4>
              <p style={{ fontSize: "18px" }}>{this.state.message}</p>
            </div>

            {/*Display the Tbale row based on data recieved*/}
            {details}
            {foot}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div class="main-div1">
            <h2>No results for this query</h2>
          </div>
        </div>
      );
    }
  }
}

export default Organizations;
