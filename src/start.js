import React from "react";
import firebase from "firebase";
import Soial from "./startcard";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Signup = () => {
  let history = useHistory();
  const signupgoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
        console.log("credential", credential);
        var token = credential.accessToken;
        console.log("token", token);

        // The signed-in user info.
        var user = result.user;
        console.log("user", user.email);
        console.log("user", user.photoURL);

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };

  return (
    <>
      <div className="container bg-secondary h-100 p-0">
        <div className="d-flex justify-content-center h-100">
          <div className="align-self-center">
            <div
              style={{ backgroundColor: "#db4437" }}
              onClick={() => history.push("/")}
            >
              <Soial
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/mail.svg"
                name="Mail"
              />
            </div>
            <div style={{ backgroundColor: "#ffffff" }} onClick={signupgoogle}>
              <Soial
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                name="Google"
              />
            </div>

            <div
              style={{ backgroundColor: "#02bd7e" }}
              onClick={() => history.push("/signupWithnum")}
            >
              <Soial
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/phone.svg"
                name="Phone"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
