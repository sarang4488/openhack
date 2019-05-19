import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import NavbarOwner from "../Navbar/navbar5";
import { Redirect } from "react-router";
class registerhackathon extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      name: "",
      teamName: "",
      members: [{ name: "", role: "" }],
      authFlag: false,
      maxTeam: 0
    };
    //Bind the handlers to this class
    this.teamNameChangeHandler = this.teamNameChangeHandler.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    const data = {
      hackid: this.props.location.state.displayprop
    };

    this.setState({
      name: localStorage.getItem("screenName")
    });

    axios
      .get(`http://localhost:8080/hackathon/${data.hackid}`)
      .then(response => {
        console.log(response);
        //update the state with the response data
        this.setState({
          maxTeam: response.data.body.max_team_size
        });

        console.log("No of results :", this.state.maxTeam);
      });
  }
  //username change handler to update state variable with the text entered by the user
  teamNameChangeHandler = e => {
    this.setState({
      teamName: e.target.value
    });
  };

  componentDidMount() {
    // const data = {
    //   hackid: this.props.location.state.displayprop
    // };
    // this.setState({
    //   name: localStorage.getItem("screenName")
    // });
    // axios
    //   .get(`http://localhost:8080/hackathon/${data.hackid}`)
    //   .then(response => {
    //     console.log(response);
    //     //update the state with the response data
    //     this.setState({
    //       maxTeam: response.data.body.max_team_size
    //     });
    //     console.log("No of results :", this.state.maxTeam);
    //   });
  }
  //submit Property handler to send a request to the node backend
  submitProperty = e => {
    //prevent page from refresh

    //make a post request with the user data
    axios
      .post(
        `http://localhost:8080/hackathon/1/register/?leader_screenname=${
          this.state.name
        }`
      )
      .then(response => {
        console.log("Status Code : ", response);

        this.setState({
          authFlag: true,
          message: "Congratulations! You have successfully listed your property"
        });
      });
  };

  createTable = () => {
    let table = [];
    console.log(this.state.maxTeam);
    // Outer loop to create parent
    for (let i = 0; i < 4; i++) {
      console.log("test" + i);
      table.push(
        <div class="form-group">
          <input
            onChange={this.typeChangeHandler}
            type="text"
            class="form-control"
            name="type"
            placeholder="Member 3 email"
          />
          <input
            onChange={this.typeChangeHandler}
            type="text"
            class="form-control"
            name="type"
            placeholder="Member 3 role"
          />
        </div>
      );

      return table;
    }
  };
  render() {
    let navbar = <NavbarOwner data={this.props.data} />;
    const { description, selectedFile } = this.state;
    //redirect based on successful login
    let redirectVar = null;
    if (this.state.authFlag) {
      redirectVar = <Redirect to="/payhackathon" />;
    }

    return (
      <div>
        {redirectVar}
        {navbar}
        <div class="container">
          <div class="panel login-form">
            <div class="main-div-login">
              <div class="panel">
                <h2>Registration</h2>
                <p>Please enter your team details</p>
                <p style={{ fontSize: "18px" }}>{this.state.message}</p>
              </div>

              <div class="form-group">
                <input
                  onChange={this.teamNameChangeHandler}
                  type="text"
                  class="form-control"
                  name="descriptionprop"
                  placeholder="Team Name"
                />
              </div>
              <div class="form-group">
                <input
                  onChange={this.nameChangeHandler}
                  type="text"
                  class="form-control"
                  name="name"
                  placeholder="Property Name"
                  value={this.state.name}
                />
                <input
                  onChange={this.teamLeadRoleChangeHandler}
                  type="text"
                  class="form-control"
                  name="descriptionprop"
                  placeholder="Team Lead Role"
                />
              </div>

              {/* <div class="form-group">
                <input
                  onChange={this.typeChangeHandler}
                  type="text"
                  class="form-control"
                  name="type"
                  placeholder="Member 1 email"
                />
                <input
                  onChange={this.typeChangeHandler}
                  type="text"
                  class="form-control"
                  name="type"
                  placeholder="Member 1 role"
                />
              </div>
              <div class="form-group">
                <input
                  onChange={this.typeChangeHandler}
                  type="text"
                  class="form-control"
                  name="type"
                  placeholder="Member 2 email"
                />
                <input
                  onChange={this.typeChangeHandler}
                  type="text"
                  class="form-control"
                  name="type"
                  placeholder="Member 2 role"
                />
              </div> */}
              {/* <div class="form-group">
                <input
                  onChange={this.typeChangeHandler}
                  type="text"
                  class="form-control"
                  name="type"
                  placeholder="Member 3 email"
                />
                <input
                  onChange={this.typeChangeHandler}
                  type="text"
                  class="form-control"
                  name="type"
                  placeholder="Member 3 role"
                />
              </div> */}

              <button
                onClick={this.submitProperty}
                class="btn btn-warning btn-lg"
                style={{ marginLeft: "30px" }}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//export Login Component
export default registerhackathon;
