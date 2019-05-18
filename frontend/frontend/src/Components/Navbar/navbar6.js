import React, { Component } from "react";
import '../../App.css';
import { Route, withRouter, Link } from "react-router-dom";
import cookie from "react-cookies";
import axios from "axios";

//create the Navbar Component
class NavOwner extends Component {
 constructor(props) {
   super(props);
 }

 handleLogout = () => {
   cookie.remove("cookie", { path: "/" });
   cookie.remove("cookie2", { path: "/" });
   cookie.remove("cookie3", { path: "/" });
 };
 render() {
   // var logDrop = (
   //   <li class="dropdown">
   //     <a class=" searchlogin dropdown-toggle" data-toggle="dropdown" href="#">
   //       Login
   //       <span class="caret" />
   //     </a>
   //     <ul class="dropdown-menu">
   //       <li>
   //         <button class="btn navbar-btn">
   //           <Link to="/login" class="test" style={{ textDecoration: "none" }}>
   //             <span style={{}}>Traveler Login</span>
   //           </Link>
   //         </button>
   //       </li>
   //       <li>
   //         <button class="btn navbar-btn">
   //           <Link to="/register" class="test">
   //             Owner Login{" "}
   //           </Link>
   //         </button>
   //       </li>
   //     </ul>
   //   </li>
   // );
   // console.log(this.props.authFlag);

   //if (cookie.load("cookie")) {
   var logDrop = (
     <li class="dropdown">
       <a class=" droptext dropdown-toggle" data-toggle="dropdown" href="#">
       <img src="images/default-profile-pic2.png" style={{marginRight:'2px'}}></img>
         Manage Account <span class="caret" />
       </a>
       <ul class="dropdown-menu">
         <li>
           <Link to="/list" class="test">
             Add Property
           </Link>
         </li>
         <li>
           <Link to="/mytrips" class="test">
              Dashboard
           </Link>
         </li>
         <li>
           <Link to="/home" class="test" onClick={this.handleLogout}>
             Logout
           </Link>
         </li>
         
       </ul>
     </li>
   );
   //}

   return (
     <nav
       class="navbar navbar-light"
       style={{ backgroundColor:'white'}}
     >
       <div class="container-fluid">
         <div class="navbar-header">
           <a class="navbar-brand" href="#">
             <img src="images/home.svg" />
           </a>
         </div>
         <ul class="nav navbar-nav navbar-right">
           {logDrop}
           <li>
             <button class="btn navbar-btn1">
               <Link
                 to="/listyourproperty"
                 class="test"
                 style={{ textDecoration: "none" }}
               >
                 List your property
               </Link>
             </button>
           </li>
           <li>
             <a class="logoimage" href="">
               <img src="images/HAWAY.svg" />
             </a>
           </li>
         </ul>
       </div>
     </nav>
   );
 }
}

export default NavOwner;