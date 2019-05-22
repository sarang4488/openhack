import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import NavbarOwner from "../Navbar/navbar5";
import { Redirect } from "react-router";
import queryString from 'query-string';

class payhackathon extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      name: "",
      message: "",
      descriptionprop: "",
      authFlag: false,
      values:{}
    };
    //Bind the handlers to this class
    this.nameChangeHandler = this.nameChangeHandler.bind(this);

    this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this);
    this.submitPayment = this.submitPayment.bind(this);
    this.setVals=this.setVals.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    this.setState({
      authFlag: false,
      message: "",
      payment: 0
    });

    const data = {
      hackid: this.state.hid
    };
    console.log(data.hackid);
  }

  componentDidMount() {
    // console.log("...")
    // console.log("GDAJDHS",this.state.hid,this.state.screenname)
    const values=queryString.parse(this.props.location.search)
const keys=values//Object.keys(values)
    console.log("VALS",keys)
    this.setState({
      hid: values.hid,
      screenname:values.screenname
    },()=>{this.setVals()})
  }
  
  setVals=()=>{
    window.localStorage.setItem('screenName', this.state.screenname);
    // window.localStorage.setItem('screenName', this.state.screenname);
    const values=this.state.hid
  console.log("VALS",values)
  const data = {
    screenName: this.state.screenname,
    hackid: this.state.hid
  };
  console.log(data.screenName);
  console.log(data.hackid);
  axios
    .get(
      `http://18.217.156.108:8080/payment/${data.screenName}/amount/${data.hackid}`
    )
    .then(response => {
      console.log("AMT",response);
      //update the state with the response data
      this.setState({
        authFlag: true,
        payment: response.data.body
        // properties : this.state.properties,
      });
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
      descriptionprop: e.target.value
    });
  };

  //submit Property handler to send a request to the node backend
  submitPayment = e => {
    //prevent page from refresh
    const data = {
      screenName: this.state.screenname,
      hackid: this.state.hid
    };

    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(
        `http://18.217.156.108:8080/payment/${this.state.screenname}/paid/${this.state.hid}`
      )
      .then(response => {
        console.log("Status Code : ", response);
        if (response.data.statusCodeValue === 200) {
          this.setState({
            authFlag: true,
            message: response.data.body
          },()=>{
            this.props.history.push("/submitHackathon")
          });
        } else {
          this.setState({
            authFlag: false,
            message: response.data.body
          });
        }
      });
  };

  render() {
    let navbar = <NavbarOwner data={this.props.data} />;
    const { description, selectedFile } = this.state;
    //redirect based on successful login
    let redirectVar = null;
    // if (this.state.authFlag) {
    //   redirectVar = <Redirect to="/submithackathon" />;
    // }

    return (
      <div>
        {redirectVar}
        {navbar}
        <div class="container">
          <div class="panel login-form">
            <div class="main-div-login">
              <div class="panel">
                <h2>Payment</h2>
                <p>Please enter your payment details</p>
                <p style={{ fontSize: "18px" }}>{this.state.message}</p>
              </div>
              <h3 style={{ marginLeft: "37%", color: "red" }}>
                Amount to be paid is {this.state.payment}$
              </h3>
              <div class="form-group">
                Enter Debit/Credit Card Number :
                <input
                  onChange={this.nameChangeHandler}
                  type="text"
                  class="form-control"
                  name="descriptionprop"
                  placeholder="Debit/Credit Card Number"
                />
              </div>
              <div class="form-group">
                Enter Expiration Date :
                <input
                  onChange={this.nameChangeHandler}
                  type="date"
                  class="form-control"
                  name="name"
                  placeholder="Expiration Date"
                />
              </div>

              <div class="form-group">
                Enter CVV code :
                <input
                  onChange={this.nameChangeHandler}
                  type="text"
                  class="form-control"
                  name="type"
                  placeholder="CVV"
                />
              </div>
              <div class="form-group">
                Enter Postal Code :
                <input
                  onChange={this.nameChangeHandler}
                  type="text"
                  class="form-control"
                  name="type"
                  placeholder="Postal Code"
                />
              </div>

              <button
                onClick={this.submitPayment}
                class="btn btn-warning btn-lg"
                style={{ marginLeft: "30px" }}
              >
                Pay with Card
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//export Login Component
export default payhackathon;
