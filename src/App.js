import React, { useEffect } from "react";
import Login from "./loginpage";
import Signup from "./signup";
import Home from "./home";
import AOS from "aos";
import firebase from "firebase";
import "aos/dist/aos.css";
import "./app.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <div className="App">
      <div className="container-fluid">
        <Router>
          <Switch>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/forgetpass">{/* <Forgetpass /> */}</Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/demo">{/* <Demo /> */}</Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </Router>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
