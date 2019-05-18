import React, { Component } from "react";
import "../../App.css";
//create the Navbar Component
class Navbar2 extends Component {
  render() {
    return (
      <nav class="navbar navbar-light" style={{ backgroundColor: "white" }}>
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="/home">
              <img
                src="images/open.png"
                style={{
                  marginLeft: "140px",
                  width: "200px",
                  height: "60px"
                }}
              />
            </a>
          </div>
          <ul class="nav navbar-nav navbar-right">
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

export default Navbar2;
