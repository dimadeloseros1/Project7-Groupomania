import React from "react"
import axios from "axios"
import "../styles/SignUp.css"
import logo from "../images/icon-left-font.png"

export default function SignUp() {
    return (
        <div className="outside--box">
            <img src={logo} alt="Company's logo" style={{height: 25 +"rem", width: "auto"}}></img>
            <div className="inside--box">
                <form className="signup--form">
                <h1 className="signup--h1">Signup</h1>
                    <div className="field">
                        <label className="username--label label" htmlFor="username">Username</label>
                        <input className="username--input input" type="text" placeholder="Username"></input>
                    </div>
                    <div className="field">
                        <label className="email--label label" htmlFor="email">Email</label>
                        <input className="email--input input" type="email" placeholder="Email"></input>
                    </div>
                    <div className="field">
                        <label className="password--label label" htmlFor="password">Password</label>
                        <input className="password--input input" type="password" placeholder="Password"></input>
                    </div>
                    <div className="field">
                        <label className="verify--passoword label" htmlFor="verifyP">Verify Password</label>
                        <input className="verif--password input" type="password" placeholder="Verify Password"></input>
                    </div>
                    <div className="button">
                        <button className="signup--button">Subscribe</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

