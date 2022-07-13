import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const city = useRef();
  const from = useRef();
  const firstname = useRef();
  const lastname = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (password.current.value !== passwordAgain.current.value) {
      password.current.setCustomValidity("Password don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/api/auth/register", user);
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
          <form className="loginBox">
            <input
              type="text"
              placeholder="Username"
              className="loginInput"
              ref={username}
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
            <button className="loginButton" onClick={handleClick}>
              Sign up
            </button>
            <button className="loginRegisterButton" onClick={handleLoginClick}>
              Log into account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
