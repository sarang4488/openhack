import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import NavbarOwner from "../Navbar/navbar5";
import TextField from "@material-ui/core/TextField";
import Checkbox from "./checkBox";
import { Redirect } from "react-router";

class ListHackathon extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      fee: 0,
      minTeam: 0,
      maxTeam: 0,
      judge: "",
      sponsor: "",
      discount: "",
      sponsors: "",
      sponsors: [{ id: 1, name: "Apple" }, { id: 2, name: "Google" }],
      checkedSponsors: new Map(),
      authFlag: false
    };
    //Bind the handlers to this class
    this.nameChangeHandler = this.nameChangeHandler.bind(this);
    this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this);
    this.startDateChangeHandler = this.startDateChangeHandler.bind(this);
    this.endDateChangeHandler = this.endDateChangeHandler.bind(this);
    this.feeChangeHandler = this.feeChangeHandler.bind(this);
    this.minTeamChangeHandler = this.minTeamChangeHandler.bind(this);
    this.maxTeamChangeHandler = this.maxTeamChangeHandler.bind(this);
    this.judgeChangeHandler = this.judgeChangeHandler.bind(this);

    this.submitHackathon = this.submitHackathon.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    this.setState({
      authFlag: false,
      message: ""
    });
  }
  //username change handler to update state variable with the text entered by the user
  nameChangeHandler = e => {
    this.setState({
      name: e.target.value
    });
  };
  //password change handler to update state variable with the text entered by the user
  descriptionChangeHandler = e => {
    this.setState({
      description: e.target.value
    });
  };
  //password change handler to update state variable with the text entered by the user
  startDateChangeHandler = e => {
    this.setState({
      startDate: e.target.value
    });
  };
  //password change handler to update state variable with the text entered by the user
  endDateChangeHandler = e => {
    this.setState({
      endDate: e.target.value
    });
  };

  feeChangeHandler = e => {
    this.setState({
      fee: e.target.value
    });
  };

  minTeamChangeHandler = e => {
    this.setState({
      minTeam: e.target.value
    });
  };

  maxTeamChangeHandler = e => {
    this.setState({
      maxTeam: e.target.value
    });
  };

  judgeChangeHandler = e => {
    this.setState({
      judge: e.target.value
    });
  };

  sponsorChangeHandler = e => {
    this.setState({
      sponsor: e.target.value
    });
  };

  discountChangeHandler = e => {
    this.setState({
      discount: e.target.value
    });
  };

  toggleSponsors = e => {
    this.setState(prevState => ({
      [e.target.name]: !prevState.e.target.value
    }));
  };

  handleSponsors(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({
      checkedSponsors: prevState.checkedSponsors.set(item, isChecked)
    }));
  }

  //submit Property handler to send a request to the node backend
  submitHackathon = e => {
    //prevent page from refresh
    e.preventDefault();

    const data = {
      owner: localStorage.getItem("screenName"),
      name: this.state.name,
      description: this.state.description,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      fee: this.state.fee,
      minTeam: this.state.minTeam,
      maxTeam: this.state.maxTeam,
      judge: this.state.judge,
      sponsor: this.state.checkedSponsors,
      discount: this.state.discount
    };
    console.log(data);
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(
        `http://localhost:8080/hackathon/?name=${data.name}&description=${
          data.description
        }&start_date=${data.startDate}&end_date=${
          data.endDate
        }&owner_screenname=${data.owner}&judge_screenname=${
          data.judge
        }&min_team_size=${data.minTeam}&max_team_size=${data.maxTeam}&fee=${
          data.fee
        }&discount=${data.discount}&organization_name=${data.sponsor}`
      )
      .then(response => {
        console.log("Status Code : ", response);
        if (response.data.statusCodeValue === 200) {
          this.setState({
            authFlag: true,
            message:
              "Congratulations! You have successfully listed your hackathon"
          });
        } else {
          this.setState({
            authFlag: false,
            message: "Hackathon Already Exist "
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
      console.log("test");
      redirectVar = <Redirect to="/hackmain" />;
    }
    let details = this.state.sponsors.map(sponsor => {
      // const imgurl1 = require(`../uploads/${property.img}`);

      return (
        <div>
          <label
            key={sponsor.id}
            for="subscribeNews"
            style={{ marginLeft: "4px", fontSize: "15px" }}
          >
            {sponsor.name}
            <Checkbox
              name={sponsor.name}
              checked={this.state.checkedSponsors.get(sponsor.name)}
              onChange={this.handleSponsors}
            />
          </label>
        </div>
      );
    });

    // if(cookie.load('cookie')){
    //         redirectVar = <Redirect to= "/home"/>
    //     }

    return (
      <div>
        {redirectVar}
        {navbar}
        <div class="container">
          <div class="panel login-form">
            <div class="main-div-login">
              <div class="panel">
                <h2>List Hackathon</h2>
                <p>Please enter hackathon details</p>
                <p style={{ fontSize: "18px" }}>{this.state.message}</p>
              </div>
              <div class="form-group">
                <label for="name" style={{ fontSize: "15px" }}>
                  Event Name: <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  onChange={this.nameChangeHandler}
                  type="text"
                  class="form-control"
                  name="name"
                  id="name"
                  placeholder="Event Name"
                />
              </div>
              <div class="form-group">
                <label for="description" style={{ fontSize: "15px" }}>
                  Event Description:{" "}
                </label>
                <input
                  onChange={this.descriptionChangeHandler}
                  type="text"
                  class="form-control"
                  name="description"
                  id="description"
                  placeholder="Description"
                />
              </div>
              <div class="form-group">
                <label for="checkin" style={{ fontSize: "15px" }}>
                  Start Date:{" "}
                </label>
                <input
                  onChange={this.startDateChangeHandler}
                  type="Date"
                  class="form-control"
                  name="checkin"
                  id="checkin"
                  placeholder="Available from"
                />
              </div>
              <div class="form-group">
                <label for="checkout" style={{ fontSize: "15px" }}>
                  End Date:{" "}
                </label>
                <input
                  onChange={this.endDateChangeHandler}
                  type="Date"
                  class="form-control"
                  name="checkout"
                  id="checkout"
                  placeholder="Available till"
                />
              </div>
              <div class="form-group">
                <label for="fee" style={{ fontSize: "15px" }}>
                  Registration Fee:{" "}
                </label>
                <input
                  onChange={this.feeChangeHandler}
                  type="number"
                  class="form-control"
                  name="guests"
                  id="fee"
                  placeholder="Registration Fee"
                />
              </div>
              <div class="form-group">
                <label for="minteam" style={{ fontSize: "15px" }}>
                  Minimum Team Size:{" "}
                </label>
                <input
                  onChange={this.minTeamChangeHandler}
                  type="number"
                  class="form-control"
                  name="price"
                  id="minteam"
                  placeholder="Minimum Team Size"
                />
              </div>
              <div class="form-group">
                <label for="maxteam" style={{ fontSize: "15px" }}>
                  Max Team Size:{" "}
                </label>
                <input
                  onChange={this.maxTeamChangeHandler}
                  type="number"
                  class="form-control"
                  name="price"
                  placeholder="Maximum Team Size"
                />
              </div>
              <div class="form-group">
                <label for="judge" style={{ fontSize: "15px" }}>
                  Appoint Judge:{" "}
                </label>
                <input
                  onChange={this.judgeChangeHandler}
                  type="text"
                  class="form-control"
                  name="description"
                  id="description"
                  placeholder="Judge"
                />
              </div>
              <div class="form-group">
                <label
                  for="judge"
                  style={{ marginRight: "10px", fontSize: "15px" }}
                >
                  Sponsor:{" "}
                </label>

                {details}
                {/* <input
                  type="checkbox"
                  id="subscribeNews"
                  name="subscribe"
                  value="newsletter"
                />
                <label
                  for="subscribeNews"
                  style={{ marginLeft: "4px", fontSize: "15px" }}
                >
                  Hello
                </label> */}
              </div>

              <div class="form-group">
                <label for="judge" style={{ fontSize: "15px" }}>
                  Sponsor Discount:{" "}
                </label>
                <input
                  onChange={this.discountChangeHandler}
                  type="number"
                  class="form-control"
                  name="description"
                  id="discount"
                  placeholder="Discount"
                />
              </div>

              <button
                onClick={this.submitHackathon}
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
export default ListHackathon;
