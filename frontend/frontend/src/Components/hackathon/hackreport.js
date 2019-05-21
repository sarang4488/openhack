import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import Navbar4 from "../Navbar/navbar5";
import cookie from "react-cookies";
import Footer from "../Footer/footer";
class hackreport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [{ paidfee: 700,unpaidfee:100,sponsors:"2"}],
      authFlag: false,
      imageView: [],
      profit:"",
      displayprop: ""
    };
  }

  componentWillMount() {
    this.setState({
      authFlag: false
    });
  }
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
          <div class="headline col-sm-3" style={{textAlign:"center"}}>
          Total Paid Registration Fees
          
            <div class="headline">
              <h3 class="hit-headline">
                
                  <div
                    name="displayprop"
                    style={{marginRight:"5px"}}
                  >
                    {team.paidfee}
                    </div>
                   
              </h3>
            </div>  
          </div>
          <div class="headline col-sm-3" style={{textAlign:"center"}}>
          Total Unpaid Registration Fees
          <div class="headline">
              <h3 class="hit-headline">
                
                  <div
                    name="displayprop"
                    style={{marginRight:"5px"}}
                  >
                    {team.unpaidfee}
                    </div>
                   
              </h3>
            </div> 
         
          </div>
          <div class="headline col-sm-3" style={{textAlign:"center"}}>
           Sponsor Revenue

             <div class="headline">
              <h3 class="hit-headline">
                
                  <div
                    name="displayprop"
                    style={{marginRight:"5px"}}
                  >
                    {team.sponsors*1000}
                    </div>
                   
              </h3>
            </div> 
          </div>
          <div class="headline col-sm-3" style={{textAlign:"center"}}>
           PROFIT
           <div class="headline">
              <h3 class="hit-headline">
                
                  <div
                    name="displayprop"
                    style={{marginRight:"5px"}}
                  >
                    {team.paidfee + team.sponsors*1000}
                    </div>
                   
              </h3>
            </div>
          </div>
        </div>
      );
    });
    let redirectVar = null;

    if (this.state.properties !== "") {
      return (
        <div>
          {redirectVar}

          <div class="main-div1" style={{ backgroundColor: "#F7F7F8" }}>
            {navbar}
           <div style={{textAlign:"center",fontSize:"30px"}}>Hackathon Earning Report</div>
            {/*Display the Tbale row based on data recieved*/}
            {details}
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
export default hackreport;
