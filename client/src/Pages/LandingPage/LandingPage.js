import React from "react";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./LandingPage.css";
const LandingPage = () => {
  return (
    <div className="landingContainer">
      <Row className="align-items-center mx-auto ">
        <div className="tag">
          {/* <h1>Where They Always Promise To Callback()</h1> */}
          <Link className=" btn matchBtn" to={"/signup"}>
            Sign Up
          </Link>
        </div>
      </Row>
    </div>
  );
};

export default LandingPage;
