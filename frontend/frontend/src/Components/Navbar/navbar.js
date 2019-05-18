import React,{Component} from 'react';
import '../../App.css';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
//create the Navbar Component
class Navbar extends Component {
  constructor(props){
    super(props);
    this.state ={
      authFlag: false
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.handleClick = this.handleClick.bind(this);
}
//handle logout to destroy the cookie
handleLogout = () => {
    cookie.remove('cookie', { path: '/' });
    cookie.remove('cookie2', { path: '/' });
    cookie.remove('cookie3', { path: '/' });
}

handleClick = () => {
  this.setState ({
    authFlag: true
  })
}
    render(){
    
    console.log(this.props.email);
    let redirectVar=null;
    if(this.state.authFlag){
      
          redirectVar=<Redirect to= {
            {
                pathname: '/listyourproperty',
               
                
            }
}/>
        
    }
    let dropDown = (
                    <li class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown">Login <span class="caret"></span></a>
                         <ul class="dropdown-menu">
                            <li><Link to="/login" class="test">Traveler Login</Link></li>
                            <li><Link to="/ownerlogin" class="test">Owner Login </Link></li>
                          </ul>
                    </li>
                 );
    if(cookie.load('cookie2')) {
       dropDown = (
                  <li class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown"><img src="images/default-profile-pic2.png" style={{marginRight:'2px'}}></img>{cookie.load("cookie")} <span class="caret"></span></a>
                         <ul class="dropdown-menu">
                            <li><Link to="/mytrips" class="test">My trips</Link></li>
                            <li><Link to="/profile" class="test">My profile </Link></li>
                            <li><Link to="/account" class="test">Account </Link></li>
                            <li><Link to="/ownerdashboard" class="test">Dashboard </Link></li>
                            <li><Link to="/home" onClick={this.handleLogout} class="test" >Logout</Link></li>
                          </ul>
                    </li>
                  );
    }
    
    return(
        
  <nav class="navbar navbar-light" style={{backgroundColor:'transparent'}}>
    {redirectVar}  
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="/home"><img src="images/homeAway.svg"></img></a>
    </div>
    <ul class="nav navbar-nav navbar-right">
      {dropDown}
      <li><button class="btn navbar-btn1" onClick={this.handleClick} style={{textDecoration:"none"}}>List Your Property</button></li>
      <li><a class="logoimage" ><img src="images/iconmain.svg"></img></a></li>
    </ul>
  </div>
</nav>
        
        )
    }
}

export default Navbar;