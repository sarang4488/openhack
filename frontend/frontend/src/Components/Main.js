import React, { Component } from "react";
import { Route } from "react-router-dom";
import SignUp from "./SignUp/signup";
//import SignupOwner from "./SignUp/ownersignup.js";
import Login from "./Login/login";
////import LoginOwner from "./Login/ownerlogin.js";
import Navbar from "./Navbar/navbar";
import Footer from "./Footer/footer";
import Navbar2 from "./Navbar/navbar2";
import Navbar3 from "./Navbar/navbar3";
import Navbar4 from "./Navbar/navbar4";
//import landingpage from "./Landing_Page/landingpage";
import Results from "./Results/results";
import Account from "./Profile/account";
import Profile from "./Profile/profile";
import listproperty from "./ListProperty/listproperty";
import listHackathon from "./ListProperty/listHackathon";
import Property from "./Property/property";
import organizations from "./Property/organizations";
import homepage from "./homepage/homepage";
//import CheckForm from "./CategoryCheck/checkform";
////import OwnerMainPage from "./Owner/ownermainpage";
//mport MyTrips from "./Dashboard/mytrips";
import mainpage from "./hackathon/mainPage";
import registerHackathon from "./hackathon/register";
import payHackathon from "./hackathon/payment";
import redirect from "./Profile/redirect";
import NavProfile from "./Navbar/navbar5";
import finalmembers from "./Property/finalmembers";
import listallhackathon from "./hackathon/allhackathons";
//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        {/*Render Different Component based on Route*/}

        <Route path="/list" component={listproperty} />
        <Route path="/footer" component={Footer} />
        <Route path="/navbar" component={Navbar} />
        <Route path="/navbar2" component={Navbar2} />
        <Route path="/navbar3" component={Navbar3} />
        <Route path="/navbar4" component={Navbar4} />
        <Route path="/navbar5" component={NavProfile} />
        <Route path="/register" component={SignUp} />
        <Route exact path="/" component={homepage} />

        <Route path="/account" component={Account} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} />

        <Route path="/results" component={Results} />
        <Route path="/memberlist" component={Property} />

        <Route path="/listhackathon" component={listHackathon} />

        <Route path="/hackmain" component={mainpage} />
        <Route path="/registerHackathon" component={registerHackathon} />
        <Route path="/payHackathon" component={payHackathon} />
        <Route path="/organizations" component={organizations} />
        <Route path="/members" component={finalmembers} />
        <Route path="/redirect" component={redirect} />
        <Route path="/allhackathons" component={listallhackathon} />
      </div>
    );
  }
}
//Export The Main Component
export default Main;
