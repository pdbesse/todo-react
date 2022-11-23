import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./LoginPage.css";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

const LoginPage = () => {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [login] = useMutation(LOGIN_USER);
  const [errors, setErrors] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    // if (name === "email") {
    //   if (
    //     value.match(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/i) === null
    //   ) {
    //     setErrors("Email is invalid");
    //   } else {
    //     setErrors("");
    //   }
    // }

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
      window.location.replace("/todo");
    } catch (e) {
      setErrors("Incorrect Credentials");
    }

    setFormState({
      username: "",
      password: "",
    });
  };

  return (
    <Form className="login_form" onSubmit={handleFormSubmit}>
      <h2>Welcome Back</h2>
      <h4 className="side_text">Sign in to continue</h4>
      <input
        className="login_input"
        placeholder="username"
        name="username"
        value={formState.username}
        onChange={handleChange}
      />

      <input
        className="login_input"
        placeholder="Password"
        name="password"
        type="password"
        value={formState.password}
        onChange={handleChange}
      />
      {errors && <span style={{ color: "red" }}>{errors}</span>}
      <span className="remember_me">
        {" "}
        <input className="checkbox" type="checkbox" /> Remember me
      </span>
      <Button className="signin_btn" type="submit">
        SIGN IN
      </Button>
      <p>Did you forget your password?</p>
      <Button className="reset_btn">Reset here</Button>
      <a href="/signup" type="button" className="signup_btn">
        SIGN UP
      </a>
    </Form>
  );
};

export default LoginPage;
