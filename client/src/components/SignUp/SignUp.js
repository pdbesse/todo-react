import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
// import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
// import MediaQuery from "react-responsive";
import "./SignUp.css";

const SignUp = () => {

  const [accountState, setAccountState] = useState({
    email: "",
    password: "",
    username: ""
  });
  const [profileState, setProfileState] = useState({
    firstName: "",
    lastName: "",
    location: "",
    age: "",
    gender: "",
  });
  const [addUser] = useMutation(ADD_USER);

  const handleAccountChange = (event) => {
    var { name, value } = event.target;
    setAccountState({
      ...accountState,
      [name]: value,
    });
  };

  const handleProfileChange = (event) => {
    var { name, value } = event.target;
    setProfileState({
      ...profileState,
      [name]: value,
    });
  };

  // const [ageRange, setAgeRange] = useState([21, 65]);

  // const handleAge = (Age) => {
  //   setAgeRange(Age);
  // };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const submit = {
      ...accountState,
      input: {
        ...profileState,
        // range: ageRange,
      },
    };

    try {
      const { data } = await addUser({
        variables: { ...submit },
      });

      Auth.login(data.addUser.token);
      window.location.href("/todo");
    } catch (e) {
      console.error(e);
    }

    setProfileState({
      firstName: "",
      lastName: "",
      age: "",
      location: "",
    });
  };

  return (
    <div className="container_signup">
      <Row className="row_gap">
        <Col className="profile_details mt-0 ml-10px">
          <Row>
            <h4>Account Information</h4>
            <div className="grid">
              <Form className="form">
                <input
                  className="input"
                  placeholder="Email"
                  name="email"
                  value={profileState.email}
                  onChange={handleAccountChange}
                />
                <input
                  className="input"
                  placeholder="Username"
                  name="username"
                  value={profileState.username}
                  onChange={handleAccountChange}
                />
                <input
                  className="input"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={profileState.password}
                  onChange={handleAccountChange}
                />
              </Form>
            </div>
          </Row>
          <Row>
            <h4>Profile Details</h4>
            <div className="grid">
              <Form className="form">
                <input
                  className="input"
                  placeholder="First Name"
                  name="firstName"
                  value={profileState.firstName}
                  onChange={handleProfileChange}
                />
                <input
                  className="input"
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={profileState.lastName}
                  onChange={handleProfileChange}
                />
                <input
                  className="input"
                  type="text"
                  placeholder="City"
                  name="location"
                  value={profileState.location}
                  onChange={handleProfileChange}
                />
                <input
                  className="input"
                  type="number"
                  placeholder="Age"
                  min="18"
                  name="age"
                  value={profileState.age}
                  onChange={handleProfileChange}
                />

                <select
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  className="input"
                  id="dropdown-button-dark-example1"
                  name="gender"
                  onChange={handleProfileChange}
                >
                  <option>Gender</option>
                  <option name="gender" value="She/Her">
                    She/Her
                  </option>
                  <option name="gender" value="He/His">
                    He/His
                  </option>
                  <option name="gender" value="They/Them">
                    They/Them
                  </option>
                </select>
              </Form>
            </div>
          </Row>
          <Button className="signup" onClick={handleFormSubmit}>
            SIGN UP
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
