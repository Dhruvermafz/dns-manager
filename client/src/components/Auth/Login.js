import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import "./auth.css";
import { auth } from "../../Firebase";
const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    const checkStoredToken = () => {
      if (storedToken) {
        navigate("/");
        setIsLoggedIn(true);
      }
    };

    checkStoredToken();
  }, [storedToken, navigate, setIsLoggedIn]);

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      localStorage.setItem("authToken", userCredential.user.accessToken);
      const user = userCredential.user;
      console.log(user);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      localStorage.removeItem("authToken");
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  const onGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      localStorage.setItem("authToken", userCredential.user.accessToken);
      const user = userCredential.user;
      console.log(user);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      localStorage.removeItem("authToken");
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <>
      <main className="Top">
        <div className="signup-heading">
          <h1 className="heading">Login</h1>
        </div>
        <section>
          <div>
            <p className="heading"> DNS Manager</p>

            <form>
              <div>
                <label htmlFor="email-address">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <button type="submit" onClick={onLogin}>
                  Login
                </button>
              </div>

              <div>
                <button type="button" onClick={onGoogleLogin}>
                  Login with Google
                </button>
              </div>
            </form>

            <p className="text-sm text-white text-center">
              No account yet? <NavLink to="/register">Sign up</NavLink>
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
