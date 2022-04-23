import React from "react";
import "../styles/SignUp.css"
import { Formik, Form, Field, ErrorMessage} from "formik";
import { BrowserRouter, Link, useNavigate  } from "react-router-dom";
import { useContext } from "react";
import * as Yup from "yup";
import axios from "axios";
import logo from "../images/iconBig.svg"
import { useState } from "react";
import { AuthContext } from "../App";




function LogIn() {
  const navigate = useNavigate()
  const [alert, setAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [authToken,setAuthtoken] = useContext(AuthContext)
  const initialValues = {
    username: "",
    password: "",

  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required").min(2, "Username has to have minimun 2 charachters"),
    password: Yup.string().min(4, "Minimum 4 characthers").max(10, "Maximum 10 charachters").required("Password is required"),
  });
  const onSubmit = (data) => {
    axios.post("http://localhost:3001/api/user/login", data).then((response) => {
     if (response.data.error) {
        setAlert(true);
        setAlertMessage(response.data.error);
      } else {
        setAuthtoken(JSON.stringify({
          token: response.data.token,
          username:JSON.parse(response.config.data).username
        }))
        localStorage.setItem('user',JSON.stringify({
          token: response.data.token,
          username:JSON.parse(response.config.data).username
        }))
        navigate("/Home");
      }
    });
};
  return (
    <div className="registration--box">
      <img src={logo} alt="logo" className="logo"/>
      <div className="registration--prime">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
        <h1>Login</h1>
          <label>Username </label>         
          <Field
            autoComplete="off"
            id="registration"
            name="username"
            placeholder="Username"
          />
           <ErrorMessage className="span--registration" name="username" component="span" />
          <label>Password</label>
          <Field
            autoComplete="off"
            id="registration"
            name="password"
            type="password"
            placeholder="(Ex. John123...)"
          />
           <ErrorMessage className="span--registration" name="password" component="span" />
          
                <button type="submit">Submit</button>
          
          <a href="/SignUp" className="href">No acc yet? Create an account here</a>
        </Form>
      </Formik>
      </div>
    </div>
  );
}

export default LogIn;