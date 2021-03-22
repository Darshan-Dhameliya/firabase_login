import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import firebase from "firebase";

export default function Loginpage() {
  const history = useHistory();

  const login = (values, event) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then((userCredential) => {
        var user = userCredential.user;
        console.log(user);
        event.resetForm();
      })
      .catch((error) => {
        var errorMessage = error.message;
        toast.error(errorMessage, {
          autoClose: 2000,
          hideProgressBar: true,
        });
      });
  };

  const validate = (values) => {
    const errors = {};
    var regex = /^\s+$/;
    if (!values.email || regex.test(values.email)) {
      errors.email = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    } else if (regex.test(values.password)) {
      errors.password = "Required";
    }
    return errors;
  };
  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  return (
    <>
      <div
        className="container d-flex justify-content-center align-items-center"
        data-aos="zoom-out"
      >
        <div className="bg-white p-5 mt-5 rounded align-self-center row">
          <h1 className="mb-5 text-center">Login </h1>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            validate={validate}
            onSubmit={login}
          >
            {({ errors, touched }) => (
              <Form className="p-0">
                <div className="form-group mt-4">
                  Email :
                  <Field
                    name="email"
                    type="email"
                    className="form-control mt-3"
                  />
                  {errors.email && touched.email ? (
                    <div className="error">{errors.email}</div>
                  ) : null}
                </div>
                <div className="form-group mt-4">
                  Password :
                  <Field
                    name="password"
                    type="password"
                    className="form-control mt-3"
                  />
                  {errors.password && touched.password ? (
                    <div className="error">{errors.password}</div>
                  ) : null}
                </div>
                <button type="submit" className="bigbutton mt-5">
                  Login
                </button>
              </Form>
            )}
          </Formik>
          <button onClick={() => history.push("/signup")} className="bigbutton">
            Go To Sign Up
          </button>
        </div>
      </div>
    </>
  );
}
