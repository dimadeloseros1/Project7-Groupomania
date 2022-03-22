import React from "react"
import { useState } from "react"
import Axios from "axios"
import { response } from "../../../backend/app"

export default function SignComp() {
    const [usernameReg, setUsernameReg] = useState("")
    const [passwordReg, setPasswordReg] = useState("")

    const register = () => {
        Axios.post('https://localhost:3001/api/user', {
            username: usernameReg,
            password: passwordReg,
        }).then((response) => {
            console.log(response)
        })
    }
    
}