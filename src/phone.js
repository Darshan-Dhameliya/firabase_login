import React, { useState } from "react";
import firebase from "firebase";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

export default function Phone() {
  const [otp, setOtp] = useState(true);
  const [confrmation, setconfrmation] = useState("");

  const sendOtp = async (values) => {
    const recaptcha = await new firebase.auth.RecaptchaVerifier("recaptcha", {
      size: "invisible",
    });
    var number = "+91" + values.phonenum;
    await firebase
      .auth()
      .signInWithPhoneNumber(number, recaptcha)
      .then(function (confrmation) {
        alert("otp send succesfull");
        setconfrmation(confrmation);
        setOtp(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const verifyOtp = (values) => {
    confrmation
      .confirm(values.otp)
      .then(function (result) {
        console.log(result.user.phoneNumber);
        alert("Otp Verify Success");
        console.log(result);
      })
      .catch(function (error) {
        setOtp("");
        alert("enter right otp");
      });
  };

  const NumberSchema = Yup.object().shape({
    phonenum: Yup.string()
      .min(10, "Enter Valid Number")
      .max(10, "Enter Valid Number")
      .matches(/^[0-9]*$/, "Enter Valid Number")
      .required("Required"),
  });

  const OtpSchema = Yup.object().shape({
    otp: Yup.string()
      .min(6, "Enter Valid Otp")
      .max(6, "Enter Valid Otp")
      .matches(/^[0-9]*$/, "Enter Valid Otp")
      .required("Required"),
  });

  return (
    <div>
      <div className="container bg-dark text-white p-5">
        <div data-aos="fade-right" className="px-5">
          <div className="fs-1 text-center"> Login/Signup </div>
          <Formik
            initialValues={{
              phonenum: "",
            }}
            validationSchema={NumberSchema}
            onSubmit={sendOtp}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="form-group mt-4">
                  Phone Number :
                  <div className="input-group mt-3">
                    <span className="input-group-text">+91</span>
                    <Field
                      type="text"
                      name="phonenum"
                      className="form-control"
                      disabled={"disabled" && !otp}
                    />
                    <span className="input-group-text p-0">
                      <button
                        type="submit"
                        className="btn btn-outline-dark"
                        disabled={"disabled" && !otp}
                      >
                        Send Otp
                      </button>
                    </span>
                  </div>
                  {errors.phonenum && touched.phonenum ? (
                    <div className="error">{errors.phonenum}</div>
                  ) : null}
                </div>
              </Form>
            )}
          </Formik>

          <Formik
            initialValues={{
              otp: "",
            }}
            validationSchema={OtpSchema}
            onSubmit={verifyOtp}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="form-group mt-4">
                  Otp :
                  <div className="input-group mt-3">
                    <Field
                      type="text"
                      name="otp"
                      className="form-control"
                      disabled={"disabled" && otp}
                    />
                    <span className="input-group-text p-0">
                      <button
                        type="submit"
                        className="btn btn-outline-dark"
                        disabled={"disabled" && otp}
                      >
                        Verify Otp
                      </button>
                    </span>
                  </div>
                  {errors.otp && touched.otp ? (
                    <div className="error">{errors.otp}</div>
                  ) : null}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div id="recaptcha"></div>
    </div>
  );
}
