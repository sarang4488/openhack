import React,{Component} from 'react';
import '../../App.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';
//create the Navbar Component
class Navbar4 extends Component {
    constructor(props){
        super(props);
        this.state = {
            location:"",
            startdate : "",
            enddate:"",
            guests:0,
            authFlag : false,
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    //location change handler to update state variable with the text entered by the user
    LocationChangeHandler = (e) => {
        this.setState({
            location : e.target.value
        })
    }
    //start date change handler to update state variable with the text entered by the user
    startdateChangeHandler = (e) => {
        this.setState({
            startdate : e.target.value
        })
    }
    //end date change handler to update state variable with the text entered by the user
    enddateChangeHandler = (e) => {
        this.setState({
            enddate : e.target.value
        })
    }
    //guests change handler to update state variable with the text entered by the user
    guestsChangeHandler = (e) => {
        this.setState({
            guests : e.target.value
        })
    }
    submitSearch = (e) => {
       
        //prevent page from refresh
        e.preventDefault();
        const data = {
             location : this.state.location,
             startdate : this.state.startdate,
             enddate: this.state.enddate,
             guests: this.state.guests
                     }
        console.log(data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3031/home',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                console.log(response.data);
                if(response.status === 200){
                    this.setState({
                        authFlag : true,
                        //properties: response.data    
                    })
                }else{
                    this.setState({
                        authFlag : false
                    })
                }
            }).catch(err => {
                this.setState({error : true});
                console.log(err);
            });
    }
        render(){
        console.log(this.state.authFlag);
        if(this.state.authFlag){
         window.location.reload(1);
        }

        let dropDown = (
                        <li class="dropdown">
                            <a class="droptext dropdown-toggle" data-toggle="dropdown" >Login <span class="caret"></span></a>
                             <ul class="dropdown-menu">
                                <li><Link to="/login" class="test">Traveler Login</Link></li>
                                <li><Link to="/register" class="test">Owner Login </Link></li>
                              </ul>
                        </li>
                     );
        if(cookie.load('cookie')) {
           dropDown = (
                      <li class="dropdown">
                           <a class="droptext dropdown-toggle" data-toggle="dropdown"><img src="images/default-profile-pic2.png" style={{marginRight:'2px'}}></img>{cookie.load("cookie")} <span class="caret"></span></a>
                             <ul class="dropdown-menu">
                                <li><Link to="/mytrips" class="test">My trips</Link></li>
                                <li><Link to="/profile" class="test">My profile </Link></li>
                                <li><Link to="/settings" class="test">Account </Link></li>
                                <li><Link to="/dashboard" class="test">Dashboard </Link></li>
                                <li><Link to="/home" onClick={this.handleLogout} class="test" >Logout</Link></li>
                              </ul>
                        </li>
                      );
        }
        
        let searchParams = null;
        let locationLabel = "Where do you want to go?";
        let guestsLabel = "Guests:";
        let startDateLabel = "Arrive:";
        let endDateLabel = "Depart:";
        return(
                
      <nav class="navbar navbar-light" style={{backgroundColor:'white'}}>
      <div class="container-fluid" >
        <div class="navbar-header">
          <a class="navbar-brand" href="/home"><img src="images/home.svg"></img></a>
        </div>
        <ul class="nav navbar-nav navbar-right">
          {dropDown}
          <li><button class="btn navbar-btn1">
          <Link to ="/listyourproperty" style={{textDecoration:"none"}}>List Your Property</Link></button></li>
          <li><a class="logoimage" ><img src="images/HAWAY.svg"></img></a></li>
        </ul>
      </div>
      <br></br>
      <form class="navform form-inline">
    <div class="navform-group form-group form-group-lg">
    
      <label class="sr-only" for="location">Location:</label>
      <input type="text" class="form-control" id="loc" placeholder={locationLabel} 
            name="location" onChange = {this.LocationChangeHandler} style={{width:'380px'}}/>
    </div> &emsp;
    <div class="navform_group form-group form-group-lg">
      <label class="sr-only" for="startdate">Arrive:</label>
      <input type="date" class="form-control" id="arr" placeholder={startDateLabel} name="startdate" onChange = {this.startdateChangeHandler} style={{width:'150px'}}/>
    </div> &emsp;
    <div class="navform_group form-group form-group-lg">
      <label class="sr-only" for="enddate">Depart:</label>
      <input type="date" class="form-control" id="depart" placeholder={endDateLabel} name="enddate" onChange = {this.enddateChangeHandler} style={{width:'150px'}}/>
    </div> &emsp;
    <div class="navform_group form-group form-group-lg">
      <label class="sr-only" for="guests">Number of Guests:</label>
      <input type="text" class="form-control" id="loc" placeholder={guestsLabel} name="guests" onChange = {this.guestsChangeHandler} style={{width:'150px'}}/>
    </div> &emsp;
    <button type="submit" onClick = {this.submitSearch} class="navbtn1 btn-lg">Search</button>
  </form>
    </nav>
            
            )
        }
    }

export default Navbar4;