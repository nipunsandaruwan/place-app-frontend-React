import React, { useContext, useState } from "react";
import "./Auth.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import axios from "axios";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const Auth = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const PASSWORD_REGEX =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/; ////Minimum eight characters, at least one letter, one number and one special character

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .matches(EMAIL_REGEX, "Enter Valid Email")
      .required("Required"),
    password: yup
      .string()
      // .matches(PASSWORD_REGEX, "Enter Valid Password")
      .required("Requird"),
  });

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/login`,
        {
          email: values.email,
          password: values.password,
        }
      );

      if (res.status === 200) {
        // console.log(res.data);
        auth.login(res.data.userId);
        navigate("/");
      } else {
        return setError("Somthing went wrong... Please try again later...");
      }
    } catch (error) {
      setError(error.response.data.message || "Somthing Went Wronge");
    }
    setIsLoading(false);
  };

  const { values, handleChange, handleSubmit, errors, handleBlur, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: handleLogin,
    });

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div className="user-register">
      <div className="user-register__title">
        <h3>Welcome</h3>
      </div>
      <form className="register__form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="input__label">Email</label>
          <input
            type="email"
            className="input_field"
            placeholder="type here...."
            name="email"
            onChange={handleChange}
            value={values.email}
          />
        </div>
        {errors.email && values.email && touched.email && !handleBlur.email && (
          <p style={{ color: "red", textAlign: "center" }}>
            **{errors.email}**
          </p>
        )}
        <div className="form-field">
          <label className="input__label">Password</label>
          <input
            type="password"
            className="input_field"
            placeholder="type here...."
            name="password"
            onChange={handleChange}
            value={values.password}
          />
        </div>
        {errors.password &&
          values.password &&
          touched.password &&
          !handleBlur.password && (
            <p style={{ color: "red", textAlign: "center" }}>
              **{errors.password}**
            </p>
          )}
        <div>
          <p></p>
        </div>
        <div className="user-register__registerbtn">
          <button
            className="registerbtn"
            style={{ marginBottom: "15px" }}
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
      <hr />
      {/* <div className="user-login__fieldfp">
        <p>Forget Password ?</p>
      </div> */}
      <div className="user-login__fieldregister">
        <Link to="/auth/register">
          <p>Create New Account</p>
        </Link>
      </div>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error} setError={setError} onClear={errorHandler} />
    </div>
  );
};

export default Auth;
