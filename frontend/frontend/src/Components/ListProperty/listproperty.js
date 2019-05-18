import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import NavbarOwner from "../Navbar/navbar5";
import { Redirect } from "react-router";

class listproperty extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      name: "",
      owner: "",
      description: "",
      address: "",

      authFlag: false
    };
    //Bind the handlers to this class
    this.nameChangeHandler = this.nameChangeHandler.bind(this);
    this.ownerChangeHandler = this.ownerChangeHandler.bind(this);
    this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this);
    this.addressChangeHandler = this.addressChangeHandler.bind(this);
    this.submitOrganisation = this.submitOrganisation.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    this.setState({
      authFlag: false,
      message: ""
    });
  }

  componentDidMount() {
    this.setState({
      owner: localStorage.getItem("screenName")
    });
  }
  //username change handler to update state variable with the text entered by the user
  nameChangeHandler = e => {
    this.setState({
      name: e.target.value
    });
  };
  //password change handler to update state variable with the text entered by the user
  ownerChangeHandler = e => {
    this.setState({
      owner: e.target.value
    });
  };

  descriptionChangeHandler = e => {
    this.setState({
      description: e.target.value
    });
  };

  addressChangeHandler = e => {
    this.setState({
      address: e.target.value
    });
  };

  //submit Property handler to send a request to the node backend
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
            error: true,
            errorMessage: response.data.body
          });
        }
      });
  };

  render() {
    let navbar = <NavbarOwner data={this.props.data} />;
    const { description, selectedFile } = this.state;
    //redirect based on successful login
    let redirectVar = null;
    if (this.state.authFlag) {
      redirectVar = <Redirect to="/organizations" />;
    }
    let errorMessage = null;
    if (this.state.error) {
      errorMessage = (
        <div
          style={{
            fontSize: "14px",
            backgroundColor: "#ed605a",
            lineHeight: "20px",
            //  color: "white",
            textAlign: "center",
            padding: "10px"
          }}
        >
          <p>{this.state.errorMessage}</p>
        </div>
      );
    }

    return (
      <div>
        {redirectVar}
        {navbar}
        <div class="container">
          <div class="panel login-form">
            <div class="main-div-login">
              <div class="panel">
                <h2>Create Organisation</h2>
                <p>Please enter organisation details</p>
                {errorMessage}
              </div>

              <div class="form-group">
                <input
                  onChange={this.nameChangeHandler}
                  type="text"
                  class="form-control"
                  name="name"
                  placeholder="Organisation Name"
                />
              </div>
              <div class="form-group">
                <input
                  onChange={this.ownerChangeHandler}
                  type="text"
                  class="form-control"
                  name="owner"
                  placeholder="Owner"
                  defaultValue={this.state.owner}
                />
              </div>
              <div class="form-group">
                <input
                  onChange={this.descriptionChangeHandler}
                  type="text"
                  class="form-control"
                  name="description"
                  placeholder="Description"
                />
              </div>

              <div class="form-group">
                <input
                  onChange={this.addressChangeHandler}
                  type="text"
                  class="form-control"
                  name="address"
                  placeholder="Address"
                />
              </div>

              <button
                onClick={this.submitOrganisation}
                class="btn btn-warning btn-lg"
                style={{ marginLeft: "30px" }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//export Login Component
export default listproperty;
