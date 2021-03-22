import React from "react";
import firebase from "firebase";

export default function Emailverification() {
  function sendEmail() {
    console.log("hello");
    var actionCodeSettings = {
      url:
        "https://instamini-11a10.firebaseapp.com/?email=iamdhameliya@gmail.com",
      // This must be true.
      handleCodeInApp: true,

      // dynamicLinkDomain: "instamini- 11a10.web.app",
    };

    firebase
      .auth()
      .sendSignInLinkToEmail("iamdhameliya@gmail.com", actionCodeSettings)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem("emailForSignIn");
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
      });
  }

  return (
    <div>
      <button onClick={() => sendEmail()}>SEND MAIL</button>
    </div>
  );
}
