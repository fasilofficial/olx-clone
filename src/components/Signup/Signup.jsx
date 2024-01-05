import React, { useState, useContext, useEffect } from "react";
import "./Signup.css";
import { Logo } from "../../assets";
import { Link, useNavigate } from "react-router-dom";
import { firebaseContext } from "../../store/Context";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [PasswordError, setPasswordError] = useState("");

  const { firebase } = useContext(firebaseContext);

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;

    if (!username) {
      setUsernameError("Username is required");
      isValid = false;
    }
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    }
    if (!phone) {
      setPhoneError("Phone is required");
      isValid = false;
    }
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    }

    if (password.length < 6) {
      setPasswordError("Password should be atleast 6 characters");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          result.user
            .updateProfile({ displayName: username })
            .then(() => {
              firebase.firestore().collection("users").add({
                id: result.user.uid,
                username,
                phone,
                email,
              });
            })
            .then(() => {
              navigate("/login");
            });
        });
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <Link to="/">
          <img width="200px" height="200px" src={Logo}></img>
        </Link>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="usename"
            name="usename"
            placeholder="Enter username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <p className="error">{usernameError}</p>
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <p className="error">{emailError}</p>
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="text"
            id="phone"
            name="phone"
            placeholder="Enter phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <p className="error">{phoneError}</p>
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <p className="error">{PasswordError}</p>
          <br />
          <br />
          <button type="submit">Submit</button>
        </form>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Signup;
