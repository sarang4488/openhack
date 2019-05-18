import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import NavbarOwner from "../Navbar/navbar2";
import { Redirect } from "react-router";

class payhackathon extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      name: "",
      location: "",
      datein: "",
      dateout: "",
      guests: "",
      message: "",
      description: "",
      selectedFile: "",
      bedrooms: "",
      bathrooms: "",
      type: "",
      amenities: "",
      price: "",
      descriptionprop: "",
      authFlag: false
    };
    //Bind the handlers to this class
    this.nameChangeHandler = this.nameChangeHandler.bind(this);
    this.locationChangeHandler = this.locationChangeHandler.bind(this);
    this.checkinChangeHandler = this.checkinChangeHandler.bind(this);
    this.checkoutChangeHandler = this.checkoutChangeHandler.bind(this);
    this.guestsChangeHandler = this.guestsChangeHandler.bind(this);
    this.bedroomsChangeHandler = this.bedroomsChangeHandler.bind(this);
    this.bathroomsChangeHandler = this.bathroomsChangeHandler.bind(this);
    this.typeChangeHandler = this.typeChangeHandler.bind(this);
    this.amenitiesChangeHandler = this.amenitiesChangeHandler.bind(this);
    this.priceChangeHandler = this.priceChangeHandler.bind(this);
    this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this);
    this.submitProperty = this.submitProperty.bind(this);
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
  locationChangeHandler = e => {
    this.setState({
      location: e.target.value
    });
  };
  //password change handler to update state variable with the text entered by the user
  checkinChangeHandler = e => {
    this.setState({
      checkin: e.target.value
    });
  };
  //password change handler to update state variable with the text entered by the user
  checkoutChangeHandler = e => {
    this.setState({
      checkout: e.target.value
    });
  };

  guestsChangeHandler = e => {
    this.setState({
      guests: e.target.value
    });
  };

  descriptionChangeHandler = e => {
    this.setState({
      descriptionprop: e.target.value
    });
  };

  typeChangeHandler = e => {
    this.setState({
      type: e.target.value
    });
  };

  bedroomsChangeHandler = e => {
    this.setState({
      bedrooms: e.target.value
    });
  };

  amenitiesChangeHandler = e => {
    this.setState({
      amenities: e.target.value
    });
  };

  bathroomsChangeHandler = e => {
    this.setState({
      bathrooms: e.target.value
    });
  };

  priceChangeHandler = e => {
    this.setState({
      price: e.target.value
    });
  };
  //for setting image description
  onChange = e => {
    if (e.target.name === "selectedFile") {
      this.setState({
        selectedFile: e.target.files[0]
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  //submit Property handler to send a request to the node backend
  submitProperty = e => {
    var headers = new Headers();
    //const { description, selectedFile } = this.state;
    let formData = new FormData();

    //prevent page from refresh
    e.preventDefault();
    const data = {
      owner: cookie.load("cookie3"),
      name: this.state.name,
      location: this.state.location,
      checkin: this.state.checkin,
      checkout: this.state.checkout,
      guests: this.state.guests,
      description: this.state.description,
      descriptionprop: this.state.descriptionprop,
      type: this.state.type,
      price: this.state.price,
      bedrooms: this.state.bedrooms,
      bathrooms: this.state.bathrooms,
      amenities: this.state.amenities,
      selectedFile: this.state.selectedFile
    };
    formData.append("description", data.description);
    formData.append("selectedFile", data.selectedFile);
    formData.append("selectedFile", data.name);

    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post("http://localhost:3031/listproperty", data).then(response => {
      console.log("Status Code : ", response.data);
      if (response.data === 200) {
        this.setState({
          authFlag: true,
          message: "Congratulations! You have successfully listed your property"
        });
        axios.post("http://localhost:3031/upload", formData).then(results => {
          // access results...
        });
      } else {
        this.setState({
          authFlag: false,
          message: "User Already Exist "
        });
      }
    });
  };

  render() {
    let navbar = <NavbarOwner data={this.props.data} />;
    const { description, selectedFile } = this.state;
    //redirect based on successful login
    let redirectVar = null;
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
                <h2>Payment</h2>
                <p>Please enter your payment details</p>
                <p style={{ fontSize: "18px" }}>{this.state.message}</p>
              </div>

              <div class="form-group">
                Enter Debit/Credit Card Number :
                <input
                  onChange={this.descriptionChangeHandler}
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
                  onChange={this.typeChangeHandler}
                  type="text"
                  class="form-control"
                  name="type"
                  placeholder="CVV"
                />
              </div>
              <div class="form-group">
                Enter Postal Code :
                <input
                  onChange={this.typeChangeHandler}
                  type="text"
                  class="form-control"
                  name="type"
                  placeholder="Postal Code"
                />
              </div>

              <button
                onClick={this.submitProperty}
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
