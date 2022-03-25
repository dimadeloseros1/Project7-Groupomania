import React from "react";
import "../styles/SignUp.css"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import logo from "../images/iconBig.svg"

function LogIn() {
  const initialValues = {
    title: "",
    postText: "",
    username: "",
    passwordConfirmation: "",

  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required").min(2, "Username has to have minimun 2 charachters"),
    email: Yup.string().email("Email is incorrect").required("Email required"),
    password: Yup.string().min(4, "Minimum 4 characthers").max(10, "Maximum 10 charachters").required("Password is required"),
    passwordConfirmation: Yup.string().oneOf([Yup.ref("password"), null], "Password does not match").required("Password is required")
  });

  const onSubmit = (data) => {
    axios.get("http://localhost:3001/posts", data).then((response) => {
      console.log("IT WORKED");
    });
  };
  return (
    <div className="registration--box">
      <img src={logo} className="logo"/>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
        <h1>Login</h1>
          <label>Username: </label>         
          <Field
            autoComplete="off"
            id="registration"
            name="username"
            placeholder="Username"
          />
           <ErrorMessage name="username" component="span" />
          <label>Password </label>
          <Field
            autoComplete="off"
            id="registration"
            name="password"
            placeholder="(Ex. John123...)"
          />
           <ErrorMessage name="password" component="span" />
          
          <button type="submit">Submit</button>
          <a href="/SignUp" className="href">No acc yet? Create an account here</a>
        </Form>
      </Formik>
    </div>
  );
}

export default LogIn;