import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import Navbar4 from "../Navbar/navbar2";
import cookie from "react-cookies";
import Footer from "../Footer/footer";
class resultpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [{ Name: "Team 1",participantName:["Member 1","Member 2","Member 3","Member 4"],score:"Score comes here"}, { Name: "Team 2",participantName:["Member 1","Member 2","Member 3","Member 4"],score:"Score comes here"},{ Name: "Team 3",participantName:["Member 1","Member 2","Member 3","Member 4"],score:"Score comes here" },{ Name: "Team 4",participantName:["Member 1","Member 2","Member 3","Member 4"],score:"Score comes here" } ],
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
  }

  propertyChangeHandler = e => {
    this.setState({
      displayprop: e.target.dataset.value
    });
    console.log("Successful test - ", this.state.displayprop);
  };
  componentDidMount() {
    // axios.get('http://localhost:3031/results')
    //         .then((response) => {
    //         //update the state with the response data
    //         this.setState({
    //             authFlag : true,
    //             properties : this.state.properties,
    //         });
    //         console.log("Search :",this.state.properties)
    //         console.log("No of results :",this.state.properties.length)
    //     });
  }
  render() {
    let foot = <Footer data={this.props.data} />;
    console.log(this.props.location);
    let navbar = <Navbar4 data={this.props.data} />;
    
    let details = this.state.teams.map(team => {
      // const imgurl1 = require(`../uploads/${property.img}`);
      return (
        <div class="displaypropinfo container-fluid">
       
          {/* <div class="col-sm-4"><img src={imgurl1} height="200px" width="430px"></img></div> */}
          <div class="col-sm-8">
            <div class="headline">
              <h3 class="hit-headline">
                
                  <div
                    name="displayprop"
                    style={{marginRight:"5px"}}
                    data-value={team.Name}
                  >
                    {team.Name}
                    </div>
                    <br></br>
                    <div
                    name="displayprop"
                    style={{marginRight:"5px"}}
                    data-value={team.participantName}
                  > 
                    {team.participantName}
                    </div>
                    <br></br>
                    <div
                    name="displayprop"
                    style={{marginRight:"5px"}}
                    data-value={team.score}
                  > 
                    {team.score}
                    </div>
              </h3>
            </div>
            
           
          </div>
        </div>
      );
    }).slice(0,3);
    let details1 = this.state.teams.map(team => {
      // const imgurl1 = require(`../uploads/${property.img}`);
      return (
        <div class="displaypropinfo container-fluid">
       
          {/* <div class="col-sm-4"><img src={imgurl1} height="200px" width="430px"></img></div> */}
          <div class="col-sm-8">
            <div class="headline">
              <h3 class="hit-headline">
                
                  <div
                    name="displayprop"
                    style={{marginRight:"5px"}}
                    data-value={team.Name}
                  >
                    {team.Name}
                    </div>
                    <br></br>
                    <div
                    name="displayprop"
                    style={{marginRight:"5px"}}
                    data-value={team.participantName}
                  > 
                    {team.participantName}
                    </div>
                    <br></br>
                    <div
                    name="displayprop"
                    style={{marginRight:"5px"}}
                    data-value={team.score}
                  > 
                    {team.score}
                    </div>
              </h3>
            </div>
            
           
          </div>
        </div>
      );
    }).slice(3,100);
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
           <div style={{textAlign:"center",fontSize:"30px"}}>Top 3 Teams</div>
            {/*Display the Tbale row based on data recieved*/}
            {details}
            <div style={{textAlign:"center",fontSize:"30px"}}>Other Team Results</div>
            {details1}
          </div>
          {foot}
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
export default resultpage;
