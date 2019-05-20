
import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import Navbar4 from "../Navbar/navbar2";
import cookie from "react-cookies";
import Footer from "../Footer/footer";
class Hackeval extends Component {
 constructor(props) {
  super(props);
  this.state = {
   properties: [
    { Name: "Sarang", requestsPending: 2 },
    { Name: "Darryl", requestsPending: 4 }
   ],
   hackathons: [
    { name: "Hack1", requestsPending: 2 },
    { name: "Hack2", requestsPending: 4 }
   ],
   authFlag: false,
   messageFlag:false,
   imageView: [],
   grade:"",
   displayprop: ""
  };
  this.propertyChangeHandler = this.propertyChangeHandler.bind(this);
 }
 componentWillMount() {
  this.setState({
   authFlag: false
  });
 }
 propertyChangeHandler = e => {
  this.setState({
   displayprop: e.target.dataset.value
  });
  console.log("Successful test - ", this.state.displayprop);
 };
 organizationChangeHandler = e => {
  this.setState({
   organization: e.target.dataset.value
  });
  console.log("Successful test - ", this.state.displayprop);
 };


 gradeChangeHandler = e => {
    this.setState({
     grade: e.target.value
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
     hackathons: response.data.body
    });
    console.log("Search :", this.state.hackathons);
    // console.log("No of results :", this.state.properties.length);
   });
 }

 onGradeSubmit = e => {
    e.preventDefault();
    const data = {
        grade: this.state.grade
       };
       console.log(data);
       axios
        .post(`http://localhost:8080/hackathon/owner/${data.screenName}`)
        .then(response => {
         console.log(response);
         //update the state with the response data
         this.setState({
          messageFlag: true
         });
         // console.log("No of results :", this.state.properties.length);
        });
 }
 render() {
     if(this.state.messageFlag){
         window.alert("Your code has been submitted successfully");
     }
  let foot = <Footer data={this.props.data} />;
  // console.log(this.props.location);
  let navbar = <Navbar4 data={this.props.data} />;
  let details = this.state.hackathons.map(org => {
   // const imgurl1 = require(`../uploads/${property.img}`);
   return (
    <div class="displaypropinfo container-fluid">
     {/* <div class="col-sm-4">
      <img src={imgurl1} height="200px" width="430px" />
     </div> */}
     <div class="col-sm-8">
      <div class="headline">
       <h3 class="hit-headline">
        <div>
         {org.name}
         <button
                class="btn btn-primary btn-md"
                style={{marginLeft:"20px"}}
                data-toggle="modal" data-target="#myModal"            
              >
                Evaluate
              </button>
        </div>
        <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title" style={{textAlign:"center"}}>Evaluate this Submission</h4>
        </div>
        <div class="modal-body">
        <div style={{overflowX:"auto"}}>
       <div style={{fontSize:"18px",marginBottom:"10px"}}>Enter grade out of 10 : </div> 
        <div class="form-group">
                <input
                  onChange={this.gradeChangeHandler}
                  type="text"
                  class="form-control"
                  name="type"
                  placeholder="Enter grade here"
                />
                  <button
                class="btn btn-primary btn-md"
                style={{"textAlign":"center",marginLeft:"200px",marginTop:"10px"}}
               onClick={this.onGradeSubmit}          
              >
                Submit Grade
              </button>

              </div>
              </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div>
       </h3>
       {/* <p>Members: {org.members.length}</p> */}
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
  if (this.state.properties !== "") {
   return (
    <div>
     {redirectVar}
     <div class="main-div1" style={{ backgroundColor: "#F7F7F8" }}>
      {navbar}
      <div>
       <h2 style={{ marginLeft: "40%" }}>Submitted Hackathons</h2>
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
export default Hackeval;