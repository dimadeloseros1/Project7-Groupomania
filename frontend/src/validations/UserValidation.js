import * as Yup from "yup";

export const userSchema = Yup.object().shape({
    username: Yup.string().required("Username is required").min(2, "Username has to have minimun 2 charachters"),
    email: Yup.string().email("Email is incorrect").required("Email required"),
    password: Yup.string().min(4, "Minimum 4 characthers").max(10, "Maximum 10 charachters").required("Password is required"),
    passwordConfirmation: Yup.string().oneOf([Yup.ref("password"), null], "Password does not match").required("Password is required")
});