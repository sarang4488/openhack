import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import Navbar4 from "../Navbar/navbar5";
import cookie from "react-cookies";
import Footer from "../Footer/footer";

class Property extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [
        { Name: "Sarang", requestsPending: 2 },
        { Name: "Darryl", requestsPending: 4 }
      ],
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
        `http://localhost:8080/organization/${
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
        `http://localhost:8080/organization/${
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
                onClick={this.submitLogin}
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
    if (this.state.displayprop != "") {
      this.props.history.push({
        pathname: "/property",
        state: {
          displayprop: this.state.displayprop
        }
      });
    }

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

export default Property;

// import React, { Component } from "react";
// import "../../App.css";
// import axios from "axios";
// import Navbar4 from "../Navbar/navbar2";
// import Footer from "../Footer/footer";
// import cookie from "react-cookies";
// import { Redirect } from "react-router";
// import { Link } from "react-router-dom";

// class Property extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       Properties: [],
//       authFlag: false,
//       imageView: [],
//       propertyname: "",
//       startdate: "",
//       enddate: "",
//       totalprice: "",
//       guests: 0,
//       redirectFlag: false
//     };
//     this.startdateChangeHandler = this.startdateChangeHandler.bind(this);
//     this.enddateChangeHandler = this.enddateChangeHandler.bind(this);
//     this.guestsChangeHandler = this.guestsChangeHandler.bind(this);
//     this.bookNow = this.bookNow.bind(this);
//   }

//   //start date change handler to update state variable with the text entered by the user
//   startdateChangeHandler = e => {
//     this.setState({
//       startdate: e.target.value
//     });
//   };
//   //end date change handler to update state variable with the text entered by the user
//   enddateChangeHandler = e => {
//     this.setState({
//       enddate: e.target.value
//     });
//   };
//   //guests change handler to update state variable with the text entered by the user
//   guestsChangeHandler = e => {
//     this.setState({
//       guests: e.target.value
//     });
//   };

//   bookNow = e => {
//     //prevent page from refresh
//     e.preventDefault();
//     const data = {
//       customername: cookie.load("cookie3"),
//       propertyname: this.props.location.state.displayprop,
//       startdate: this.state.startdate,
//       enddate: this.state.enddate,
//       guests: this.state.guests,
//       totalprice: this.state.totalprice
//     };
//     console.log("Checking ", data);
//     //set the with credentials to true
//     axios.defaults.withCredentials = true;
//     //make a post request with the user data
//     if (cookie.load("cookie")) {
//       axios
//         .post("http://localhost:3031/booking", data)
//         .then(response => {
//           console.log("Status Code : ", response.status);
//           console.log(response.data);
//           if (response.status === 200) {
//             this.setState({
//               bookFlag: true
//               //properties: response.data
//             });
//           } else {
//             this.setState({
//               bookFlag: false
//             });
//           }
//         })
//         .catch(err => {
//           this.setState({ error: true });
//           console.log(err);
//         });
//     } else {
//       console.log("hello");
//       this.setState({
//         redirectFlag: true
//       });
//     }
//   };

//   componentWillMount() {
//     this.setState({
//       authFlag: false
//     });

//     const data = {
//       propertyname: this.props.location.state.displayprop
//     };
//     //set the with credentials to true
//     axios.defaults.withCredentials = true;
//     console.log("propertyname :", data);
//     //make a post request with the user data
//     axios.post("http://localhost:3031/displayprop", data).then(response => {
//       console.log("Status Code : ", response.status);
//       console.log("propertyname :", response.data);
//       if (response.status === 200) {
//         this.setState({
//           authFlag: true,
//           Properties: response.data
//         });
//       } else {
//         this.setState({
//           authFlag: false,
//           message: "User Already Exist "
//         });
//       }
//     });
//     // window.location.reload(1);
//     console.log(this.state.Properties);
//   }

//   render() {
//     let red = null;
//     if (this.state.redirectFlag) {
//       red = <Redirect to="/login" />;
//     }
//     var tempout = new Date(this.state.enddate);
//     var outdate = tempout.getDate();
//     var tempin = new Date(this.state.startdate);
//     var indate = tempin.getDate();
//     console.log(indate);
//     console.log(outdate);
//     if (indate && outdate) {
//       var days = outdate - indate;
//     } else {
//       days = 0;
//     }

//     let redirect = null;

//     if (this.state.bookFlag) {
//       redirect = <Redirect to="/mytrips" />;
//     }
//     let navbar = <Navbar4 data={this.props.data} />;
//     console.log("state transfer", this.props.location.state);
//     let price = this.state.Properties.map(property => property.Price)[0];
//     console.log(price);
//     this.state.totalprice = price * days;
//     console.log(this.state.totalprice);
//     let bookdiv = (
//       <div class="pricetotal col-md-12">
//         <div class="total_text col-md-6">Total</div>
//         <div class="total_price col-md-6">
//           <span>$ {this.state.totalprice}</span>
//         </div>
//       </div>
//     );
//     let details = this.state.Properties.map(property => {
//       const imgurl1 = require(`../uploads/${property.img}`);

//       return (
//         <div class="bookpropinfo container-fluid">
//           <br />
//           <div class="leftside col-md-8">
//             <div class="imagecontainer">
//               <img src={imgurl1} height="512px" width="920px" />
//             </div>
//             <br />
//             <div class="leftsidepropinfo">
//               <br />
//               <br />
//               <div class="headlinebook">{property.Name}</div>
//               <br />
//               <div class="location_text">
//                 {" "}
//                 <a href="#">
//                   <span class="glyphicon glyphicon-map-marker" />
//                 </a>
//                 {property.Location}
//               </div>

//               <div class="iconarea col-md-12">
//                 <div class="icon col-md-3">
//                   <img src="images/ApartmentBook.png" height="30" width="30" />
//                   <br />
//                   <div class="iconText">Apartment</div>
//                   <div class="iconinfo"> {property.Type}</div>
//                 </div>
//                 <div class="icon col-md-3">
//                   <img src="images/BedroomsBook.png" height="30" width="30" />
//                   <br />
//                   <div class="iconText">Bedrooms</div>
//                   <div class="iconinfo"> {property.bednumber}</div>
//                 </div>
//                 <div class="icon col-md-3">
//                   <img src="images/SleepsBook.png" height="30" width="30" />
//                   <br />
//                   <div class="iconText">Sleeps</div>
//                   <div class="iconinfo"> {property.guests}</div>
//                 </div>
//                 <div class="icon col-md-3">
//                   <img src="images/BathroomsBook.png" height="30" width="30" />
//                   <br />
//                   <div class="iconText">Bathrooms</div>
//                   <div class="iconinfo"> {property.bednumber}</div>
//                 </div>
//               </div>

//               <div class="descriptionarea col-md-12">
//                 <div class="desc_title">{property.name}</div>
//                 <div class="descriptionmain">{property.description}</div>
//               </div>

//               {/* <div class="bedroomarea col-md-12">
//                         <div class="bedroom_title">
//                             Bedrooms
//                         </div>
//                         <div class="bedroom_info">
//                             {property.bedrooms}
//                         </div>
//                     </div> */}

//               {/* <div>{property.guests}</div> */}
//             </div>
//           </div>

//           <div class="rightside col-md-4">
//             <div class="rental-price">
//               ${property.Price}{" "}
//               <span style={{ fontSize: "14px", color: "#5e6d77" }}>
//                 per night
//               </span>
//             </div>
//             <br />
//             <div class="bookform col-md-12">
//               <form>
//                 <div class="bookcheckin col-md-6">
//                   <span style={{ fontSize: "14px", color: "#5e6d77" }}>
//                     Check In:
//                   </span>
//                   <input
//                     type="date"
//                     class="form-control"
//                     id="arr"
//                     placeholder="Check In"
//                     name="startdate"
//                     onChange={this.startdateChangeHandler}
//                   />
//                 </div>
//                 <div class="bookcheckout col-md-6">
//                   <span style={{ fontSize: "14px", color: "#5e6d77" }}>
//                     Check Out:
//                   </span>
//                   <input
//                     type="date"
//                     class="form-control"
//                     id="dep"
//                     placeholder="Check Out"
//                     name="enddate"
//                     onChange={this.enddateChangeHandler}
//                   />
//                 </div>
//                 <div class="bookguests col-md-12">
//                   <input
//                     type="text"
//                     class="form-control"
//                     id="loc"
//                     placeholder="Guests:"
//                     name="guests"
//                     onChange={this.guestsChangeHandler}
//                   />
//                 </div>
//               </form>
//             </div>
//             {bookdiv}

//             <div class="bookbutton col-md-12">
//               <button
//                 type="submit"
//                 onClick={this.submitSearch}
//                 class="bookbtn btn-lg col-md-12"
//                 onClick={this.bookNow}
//               >
//                 Book Now
//               </button>
//             </div>

//             <div class="assist col-md-12">
//               <span style={{ fontSize: "14px", color: "#5e6d77" }}>
//                 For booking assistance, call{" "}
//               </span>{" "}
//               <strong style={{ fontSize: "16px" }}>888-829-7076</strong>
//             </div>
//           </div>
//         </div>
//       );
//     });
//     let redirectVar = null;
//     let foot = <Footer data={this.props.data} />;
//     return (
//       <div>
//         {red}
//         {redirectVar}
//         {redirect}
//         <div class="main-div2">
//           {navbar}

//           <div>
//             {/*Display the Tbale row based on data recieved*/}
//             {details}
//           </div>
//           {foot}
//         </div>
//       </div>
//     );
//   }
// }

// export default Property;
