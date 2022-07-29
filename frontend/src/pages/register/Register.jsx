import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

export default function Register() {
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const city = useRef();
  const from = useRef();
  const mobile = useRef();
  const firstName = useRef(null);
  const lastName = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (password.current.value !== passwordAgain.current.value) {
      password.current.setCustomValidity("Password don't match!");
    } else {
      const user = {
        firstName: firstName.current.value,
        lastName: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
        mobile: mobile.current.value,
      };
      try {
        await axios.post("/users/register", user);
        navigate("/login");
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social</h3>
          <span className="loginDesc">Connect here!</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              type="text"
              placeholder="First Name"
              className="loginInput"
              ref={firstName}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="loginInput"
              ref={lastName}
            />
            <input
              placeholder="Email"
              className="loginInput"
              type="email"
              ref={email}
            />
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              ref={password}
            />
            <input
              type="password"
              placeholder="Password Again"
              className="loginInput"
              ref={passwordAgain}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              className="loginInput"
              ref={mobile}
            />
            <button className="loginButton">Sign up</button>
            <button className="loginRegisterButton" onClick={handleLoginClick}>
              Log into account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
