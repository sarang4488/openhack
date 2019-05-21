import React, { Component } from "react";
import { Route } from "react-router-dom";
import SignUp from "./SignUp/signup";
//import SignupOwner from "./SignUp/ownersignup.js";
import Login from "./Login/login";
////import LoginOwner from "./Login/ownerlogin.js";
import Navbar from "./Navbar/navbar";
import Footer from "./Footer/footer";
import Navbar2 from "./Navbar/navbar2";

//import landingpage from "./Landing_Page/landingpage";
import Results from "./Results/results";

import Profile from "./Profile/profile";
import listorganizations from "./CreateHackOrg/listorganizations";
import listHackathon from "./CreateHackOrg/listHackathon";
import manageorg from "./ManageOrg/manageorg";
import organizations from "./ManageOrg/organizations";
import homepage from "./homepage/homepage";
import mainpage from "./hackathon/mainPage";
import registerHackathon from "./hackathon/register";
import payHackathon from "./hackathon/payment";
import redirect from "./Profile/redirect";
import NavProfile from "./Navbar/navbar5";
import finalmembers from "./ManageOrg/finalmembers";
import listallhackathon from "./hackathon/allhackathons";
import submitHackathon from "./hackathon/submitHackathon";
import resultPage from "./hackathon/resultPage";
import Hackeval from "./hackathon/hackEval";
import paymentstatus from "./hackathon/paymentStatus";
import gradeHackathon from "./hackathon/gradehackathon";
import home from "./homepage/home";
//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        {/*Render Different Component based on Route*/}

        <Route path="/list" component={listorganizations} />
        <Route path="/footer" component={Footer} />
        <Route path="/navbar" component={Navbar} />
        <Route path="/navbar2" component={Navbar2} />

        <Route path="/navbar5" component={NavProfile} />
        <Route path="/register" component={SignUp} />
        <Route exact path="/" component={homepage} />

        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} />

        <Route path="/results" component={Results} />
        <Route path="/memberlist" component={manageorg} />

        <Route path="/listhackathon" component={listHackathon} />
        <Route path="/evaluate" component={Hackeval} />
        <Route path="/hackmain" component={mainpage} />
        <Route path="/registerHackathon" component={registerHackathon} />
        <Route path="/payHackathon" component={payHackathon} />
        <Route path="/organizations" component={organizations} />
        <Route path="/members" component={finalmembers} />
        <Route path="/redirect" component={redirect} />
        <Route path="/allhackathons" component={listallhackathon} />
        <Route path="/submitHackathon" component={submitHackathon} />
        <Route path="/paymentstatus" component={paymentstatus} />
        <Route path="/resultPage" component={resultPage} />
        <Route path="/gradehackathon" component={gradeHackathon} />
        <Route path="/paymentStatus" component={paymentstatus} />
        <Route path="/home" component={home} />
      </div>
    );
  }
}
//Export The Main Component
export default Main;
