import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import Dashboard from "./components/Dashboard/Dashboard";
import Header from "./components/Header";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";
import Footer from "./components/Footer";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for token in local storage
    if (localStorage.jwtToken) {
      const token = localStorage.jwtToken;
      setAuthToken(token); // Set token to Auth header
      const decoded = jwtDecode(token); // Decode token
      dispatch(setCurrentUser(decoded)); // Set user in Redux store

      // Check for token expiration
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        dispatch(logoutUser()); // Logout user if token is expired
        window.location.href = "./login"; // Redirect to login
      }
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
