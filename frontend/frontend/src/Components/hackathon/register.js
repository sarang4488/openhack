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
      authFlag: false,
      maxTeam: 0
    };
    //Bind the handlers to this class
    this.teamNameChangeHandler = this.teamNameChangeHandler.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {}
  //username change handler to update state variable with the text entered by the user
  teamNameChangeHandler = e => {
    this.setState({
      teamName: e.target.value
    });
  };

  teamLeadRoleChangeHandler = e => {
    this.setState({
      leadRole: e.target.value
    });
  };

  ChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    const data = {
      hackid: this.props.location.state.displayprop
    };

    this.setState({
      name: localStorage.getItem("screenName"),
      hackid: data.hackid
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

  submitProperty = e => {
    const data = {
      hackid: this.props.location.state.displayprop,
      name: localStorage.getItem("screenName")
    };
    console.log(data.name);
    axios
      .post(
        `http://localhost:8080/hackathon/${
          data.hackid
        }/register/?leader_screenname=${data.name}&leader_role=${
          this.state.leadRole
        }&team_name=${this.state.teamName}&member2_screenname=${
          this.state.Member1name
        }&member2_role=${this.state.Member1role}&member3_screenname=${
          this.state.Member2name
        }&member3_role=${this.state.Member2role}&member4_screenname=${
          this.state.Member3name
        }&member4_role=${this.state.Member3role}`
      )
      .then(response => {
        console.log(response);
        //update the state with the response data
        if (response.data.statusCodeValue === 200) {
          this.setState({
            authFlag: true
          });
        } else {
          this.setState({
            message: response.data.body
          });
        }
      });

    // if (response.data.statusCodeValue === 200) {
    //   this.setState({
    //     authflag: true
    //   });
    // }
  };

  createTable = () => {
    let table = [];
    console.log(this.state.maxTeam);
    // Outer loop to create parent
    for (let i = 1; i < this.state.maxTeam; i++) {
      table.push(
        <div class="form-group">
          <input
            onChange={this.ChangeHandler}
            type="text"
            class="form-control"
            name={"Member" + i + "name"}
            placeholder={"Member" + " " + i + " " + "name"}
          />
          <input
            onChange={this.ChangeHandler}
            type="text"
            class="form-control"
            name={"Member" + i + "role"}
            placeholder={"Member" + " " + i + " " + "role"}
          />
        </div>
      );
    }
    return table;
  };
  render() {
    let navbar = <NavbarOwner data={this.props.data} />;
    const { description, selectedFile } = this.state;
    //redirect based on successful login
    let redirectVar = null;
    if (this.state.authFlag) {
      this.props.history.push({
        pathname: "/payhackathon",
        state: {
          displayprop: this.state.hackid
        }
      });
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
                <p style={{ fontSize: "18px", color: "red" }}>
                  {this.state.message}
                </p>
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
                  placeholder="Leader Name"
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
              {this.createTable()}
              {/* <div class="form-group">
                {/* <input
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
              </div> */}
              {/* <div class="form-group">
                <input
                  onChange={this.typeChangeHandler}
                  type="text"
                  class="form-control"
                  name="type"
                  placeholder="Member 1 Screen Name"
                />
                <input
                  onChange={this.typeChangeHandler}
                  type="text"
                  class="form-control"
                  name="type"
                  placeholder="Member 1 Role"
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
