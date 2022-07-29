import { useRef, useContext, useEffect } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) alert(error);
  }, [user, error]);

  const handleClick = (e) => {
    e.preventDefault();
    const userCredentiales = {
      email: email.current.value,
      password: password.current.value,
    };
    loginCall(userCredentiales, dispatch);
  };

  const handleRegistrationClick = (e) => {
    e.preventDefault();
    navigate("/register");
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
              type="email"
              placeholder="Email"
              className="loginInput"
              required
              ref={email}
            />
            <input
              type="password"
              ref={password}
              required
              minLength={6}
              placeholder="Password"
              className="loginInput"
            />
            <button
              className="loginButton"
              disabled={isFetching}
              onClick={handleClick}
            >
              {isFetching ? <CircularProgress size="20px" /> : "Login"}
            </button>
            <span className="loginForgot">Forgot password?</span>
            <button
              className="loginRegisterButton"
              onClick={handleRegistrationClick}
            >
              {isFetching ? (
                <CircularProgress size="20px" />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
