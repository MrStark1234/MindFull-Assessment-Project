import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";

const Signup = (props, { selectedGender }) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    city: "",
    state: "",
    howDidYouHear: "",
    password: "",
    Rpassword: "",
  });
  let navigate = useNavigate();
  const hendleSubmit = async (e) => {
    e.preventDefault();
    const {
      name,
      email,
      phone,
      gender,
      city,
      state,
      howDidYouHear,
      password,
      Rpassword,
    } = credentials;
    const response = await fetch(`http://localhost:5000/api/auth/signup`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        gender,
        city,
        state,
        howDidYouHear,
        password,
        Rpassword,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the Auth-Token and Redirect to Home Page
      localStorage.setItem("token", json.authToken);
      props.showAlert("Account Created Successfull", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid Details", "danger");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <form onSubmit={hendleSubmit}>
      <MDBContainer fluid>
        <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
          <MDBCardBody>
            <MDBRow>
              <MDBCol
                md="10"
                lg="6"
                className="order-2 order-lg-1 d-flex flex-column align-items-center"
              >
                <p className="text-center h5 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Sign up to use your Personal User-Book on the Cloud
                </p>

                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    label="Your Name"
                    id="name"
                    name="name"
                    type="text"
                    className="w-100"
                    placeholder="Your name here.."
                    onChange={onChange}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size="lg" />
                  <MDBInput
                    label="Your Email"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email here.."
                    onChange={onChange}
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size="lg" />
                  <MDBInput
                    label="Phone Number"
                    id="phone"
                    name="phone"
                    type="phone"
                    placeholder="Your number here.."
                    onChange={onChange}
                  />
                </div>
                <div style={{ marginRight: "160px" }}>
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <label>Gender</label>
                </div>
                <br />

                <div className="d-flex flex-row align-items-center mb-4">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      checked={selectedGender === "male"}
                      onChange={onChange}
                    />

                    <label className="form-check-label" htmlFor="male">
                      Male
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      checked={selectedGender === "female"}
                      onChange={onChange}
                    />

                    <label className="form-check-label" htmlFor="female">
                      Female
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="other"
                      name="gender"
                      value="other"
                      checked={selectedGender === "other"}
                      onChange={onChange}
                    />

                    <label className="form-check-label" htmlFor="other">
                      Other
                    </label>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size="lg" />
                  <MDBInput
                    label="Your City"
                    id="city"
                    name="city"
                    type="city"
                    placeholder="Mumbai,Pune,Ahmedabad"
                    onChange={onChange}
                    required
                    minLength={5}
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size="lg" />
                  <MDBInput
                    label="Your State"
                    id="state"
                    name="state"
                    type="state"
                    placeholder="Gujrat,Maharastra,Karnataka"
                    onChange={onChange}
                    required
                    minLength={5}
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size="lg" />
                  <MDBInput
                    label="How Did You Hear About Us"
                    id="howDidYouHear"
                    name="howDidYouHear"
                    type="howDidYouHear"
                    placeholder="LinkedIn,Friends,Job-Portals,Other"
                    onChange={onChange}
                    required
                    minLength={5}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size="lg" />
                  <MDBInput
                    label="Password"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create new password"
                    onChange={onChange}
                    required
                    minLength={5}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="key me-3" size="lg" />
                  <MDBInput
                    label="Repeat your password"
                    id="Rpassword"
                    type="password"
                    name="Rpassword"
                    placeholder="Re-enter new password"
                    onChange={onChange}
                    required
                    minLength={5}
                  />
                </div>

                <button className="btn btn-primary mb-0 px-5" size="md">
                  Register
                </button>
              </MDBCol>

              <MDBCol
                md="10"
                lg="6"
                className="order-1 order-lg-2 d-flex align-items-center"
              >
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  fluid
                />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </form>
  );
};

export default Signup;
