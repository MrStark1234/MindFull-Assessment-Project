import React, { useState } from "react";
import { MDBContainer, MDBCol, MDBRow, MDBInput } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";

const Mbd = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const hendleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the Auth-Token and Redirect to Home Page
      localStorage.setItem("token", json.authToken);
      props.showAlert("Logged In Seccessfull", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <form onSubmit={hendleSubmit}>
        <h1>Login to continue to User-Book</h1>
        <MDBContainer fluid className="p-3 my-5 h-custom">
          <MDBRow>
            <MDBCol col="10" md="6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample"
              />
            </MDBCol>

            <MDBCol col="4" md="6">
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your credentials with anyone else.
              </small>
              <br />
              <br />
              <MDBInput
                label="Email address"
                wrapperClass="mb-4"
                id="email"
                type="email"
                name="email"
                size="lg"
                placeholder="Enter email"
                value={credentials.email}
                onChange={onChange}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="password"
                type="password"
                name="password"
                size="lg"
                placeholder="Enter password"
                value={credentials.password}
                onChange={onChange}
              />

              <div className="text-center text-md-start ">
                <button type="submit" className="btn btn-primary mb-0 px-5">
                  Login
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-2">
                  Don't have an account?{" "}
                  <Link to="/signup" className="link-danger">
                    Register
                  </Link>
                </p>
              </div>
            </MDBCol>
          </MDBRow>

          <div className="d-flex flex-column flex-md-row text-center  justify-content-center py-4 px-4 px-xl-5 bg-primary">
            <div className="text-white mb-3 mb-md-0">
              Copyright © 2023. User-Book | All rights reserved.
            </div>
          </div>
        </MDBContainer>
      </form>
    </>
  );
};

export default Mbd;
