import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import { toast } from "react-toastify";

export default function Loginpage() {
  const history = useHistory();
  const createUser = (values, event) => {
    console.log(values);
    firebase
      .auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((userCredential) => {
        var user = userCredential.user;
        event.resetForm();
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        toast.error(errorMessage, {
          autoClose: 2500,
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
    if (!values.c_password) {
      errors.c_password = "Required";
    } else if (regex.test(values.c_password)) {
      errors.c_password = "Required";
    } else if (values.password !== values.c_password) {
      errors.c_password = "Both Password Must Be Same";
    }
    return errors;
  };
  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .required("Required")
      .matches(
        /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/,
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
    c_password: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });
  return (
    <>
      <div
        className="container d-flex justify-content-center align-items-center"
        data-aos="zoom-in"
      >
        <div className="bg-white p-5 mt-5 rounded align-self-center row">
          <h1 className="mb-5 text-center">Register </h1>
          <Formik
            initialValues={{
              email: "",
              password: "",
              c_password: "",
            }}
            validationSchema={SignupSchema}
            validate={validate}
            onSubmit={createUser}
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
                <div className="form-group mt-4 mb-1">
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

                <div className="form-group mt-5">
                  Confirm Password :
                  <Field
                    name="c_password"
                    type="password"
                    className="form-control mt-3"
                  />
                  {errors.c_password && touched.c_password ? (
                    <div className="error">{errors.c_password}</div>
                  ) : null}
                </div>
                <button type="submit" className="bigbutton mt-5">
                  Sign Up
                </button>
              </Form>
            )}
          </Formik>
          <button onClick={() => history.push("/")} className="bigbutton">
            Back To Login
          </button>
        </div>
      </div>
    </>
  );
}
