import React, { Component } from "react";
import "../../App.css";

class Footerhome extends Component {
  render() {
    return (
      <React.Fragment>
        <div
          class="footermain"
          style={{
            backgroundColor: "#323f4d",
            color: "white",
            marginTop: "2%"
          }}
        >
          <div
            class="container"
            style={{ borderTop: "1px solid #9da9b3", color: "#a0a9b2" }}
          >
            <div style={{ textAlign: "center" }} class="row">
              <div class="col-sm-12">
                <p
                  class="endfootertext"
                  style={{
                    marginTop: "50px",
                    fontSize: "16px",
                    lineHeight: "1.5em"
                  }}
                >
                  Use of this website constitutes acceptance of the OpenHack.com{" "}
                  <a
                    href="https://www.homeaway.com/info/about-us/legal/terms-conditions"
                    style={{ color: "white" }}
                  >
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://www.homeaway.com/info/about-us/legal/privacy-policy"
                    style={{ color: "white" }}
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
                <p />
                <p
                  class="endfootertext"
                  style={{ fontSize: "16px", lineHeight: "50px" }}
                >
                  ©2006-Present OpenHack.com, Inc. All rights reserved.
                </p>
                <p class="endfootertext" style={{ fontSize: "12px" }}>
                  97c359f7-d389-43f8-afd7-d2efffd1cc0c
                </p>
              </div>
              <div class="col-sm-4" />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Footerhome;
