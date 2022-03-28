import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import logo from "../images/iconBig.svg"

function Registraion() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",

  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required").min(2, "Username has to have minimun 2 charachters"),
    email: Yup.string().email("Email is incorrect").required("Email required"),
    password: Yup.string().min(4, "Minimum 4 characthers").max(10, "Maximum 10 charachters").required("Password is required"),
    passwordConfirmation: Yup.string().oneOf([Yup.ref("password"), null], "Password does not match").required("Password is required")
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/api/user/register", data).then((response) => {
      console.log("IT WORKED");
    });
  };
  return (
    <div className="registration--box">
      <img src={logo} className="logo" alt="logo"/>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
        <h1>SignUp</h1>
          <label>Username: </label>         
          <Field
            autoComplete="off"
            id="registration"
            name="username"
            placeholder="Username"
          />
           <ErrorMessage name="username" component="span" />
          <label>Email: </label>
         
          <Field
            autoComplete="off"
            id="registration"
            name="email"
            placeholder="email"
          />
           <ErrorMessage name="email" component="span" />
          <label>Password </label>
          <Field
            autoComplete="off"
            id="registration"
            name="password"
            type="password"
            placeholder="(Ex. John123...)"
          />
           <ErrorMessage name="password" component="span" />
          <label>Confirm Password: </label>
          <Field
            autoComplete="off"
            id="registration"
            name="passwordConfirmation"
            type="password"
            placeholder="(Ex. John123...)"
          />
            <ErrorMessage name="passwordConfirmation" component="span" />
          <div className="footer--registration">
            <button type="submit">Submit</button>
            <a href="/" className="href">Login</a>
          </div>
          
        </Form>
      </Formik>
    </div>
  );
}

export default Registraion;