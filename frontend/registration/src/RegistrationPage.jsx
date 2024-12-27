import React, { useState } from "react";
import axios from "axios";
import "./RegistrationPage.css";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL = process.env.REACT_APP_API_URL;
      await axios.post(`${API_URL}/register`, formData);
      alert("Registration Successful");
      window.location.href = "/login";
    } catch (error) {
      alert("Error during registration: " + error.response?.data || error.message);
    }
  };

  return (
    <div className="registration-container">
      <h1 className="registration-title">Register</h1>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input
            type="text"
            id="mobileNumber"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button className="submit-button" type="submit">Register</button>
        <div className="social-buttons">
          <button type="button" className="social-button">Login with Google</button>
          <button type="button" className="social-button">Login with Facebook</button>
          <button type="button" className="social-button">Login with Apple ID</button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;




/* import React, { useState } from "react";
import axios from "axios";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/register", formData);
      alert("Registration Successful");
      window.location.href = "/login";
    } catch (error) {
      alert("Error during registration");
    }
  };

  return (
    <div >
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
       <h1><label>FirstName : </label>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          required
        /></h1>
        <br>
        </br>
        <h1>
        <label>LastName : </label>
        
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          required
        /></h1>
        <br></br>
        <h1><label>Mobile Number : </label>
        
        <input
          type="text"
          name="mobileNumber"
          placeholder="Mobile Number"
          onChange={handleChange}
          required
        />
        </h1>
        <br>
        </br>
        <h1><label> Password : </label>
        
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        /></h1>
        <br></br>
        <h1><button type="submit">Register</button></h1>
        
        <div>
          <button>Login with Google</button>
          <button>Login with Facebook</button>
          <button>Login with Apple ID</button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;
 */