import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import CreateDNS from "./components/CreateDNS";
import DNSRecord from "./components/DNSRecord";
import About from "./components/About";
import Loader from "./components/Loader";

function App() {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Simulate an asynchronous process (e.g., fetching user data)
    setTimeout(() => {
      setLoading(false); // Set loading to false after a delay
    }, 2000); // Adjust the delay as needed
  }, []);

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
        setIsLoggedIn(false); // Update login state
        window.location.href = "/login"; // Redirect to login
      } else {
        setIsLoggedIn(true); // Update login state
      }
    }
  }, [dispatch]);

  if (loading) {
    return <Loader />; // Render the loader while loading is true
  }

  return (
    <Router>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} />
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/create-dns" element={<CreateDNS />} />
          <Route path="/dns-record/:id" element={<DNSRecord />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
