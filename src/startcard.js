import React from "react";

export default function Signupui(props) {
  return (
    <div className="w-100 p-2 h-100 mt-3">
      <div className="row">
        <div className="col-1">
          <img style={{ height: "30px" }} src={props.src} />
        </div>
        <div className="col-10">
          <span className="ps-3">Sign in with {props.name}</span>
        </div>
      </div>
    </div>
  );
}
