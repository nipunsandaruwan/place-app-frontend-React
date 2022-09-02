import React, { useState, useContext, useRef } from "react";
import "./Auth.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "./../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../context/auth-context";
import "./Register.css";
import profileIcon from "./images.png";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const USERNAME_REGEX =
    /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
  const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const PASSWORD_REGEX =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/; ////Minimum eight characters, at least one letter, one number and one special character

  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  const filePicker = useRef();

  const [previewUrl, setPreviewUrl] = useState();

  ///form validation
  const registerSchema = yup.object().shape({
    fname: yup
      .string()
      .matches(USERNAME_REGEX, "Enter Valid Name")
      .required("Required"),
    lname: yup
      .string()
      .matches(USERNAME_REGEX, "Enter Valid Name")
      .required("Required"),
    email: yup
      .string()
      .matches(EMAIL_REGEX, "Enter Valid Email")
      .required("Required"),
    password: yup
      .string()
      .matches(PASSWORD_REGEX, "Enter Valid Password")
      .required("Requird"),
    image: yup.mixed(),
    // .required("Required")
    // .test(
    //   "FILE_SIZE",
    //   "Too big",
    //   (value) => value && value.size < 1024 * 1024
    // )
    // .test(
    //   "FILE_TYPE",
    //   "Invalid",
    //   (value) =>
    //     value && ["image/png", "image/jpg", "image/jpeg"].includes(value.type)
    // ),
  });

  /////handle signup
  const handleSignup = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
        {
          firstname: values.fname,
          lastname: values.lname,
          email: values.email,
          password: values.password,
          image: profilePic,
        }
      );

      if (res.status === 200) {
        console.log(res);
        auth.login(res.data.userId);
        navigate("/");
      } else {
        return setError("Somthing went wrong... Please try again later...");
      }
    } catch (error) {
      setError(
        error.response.data.message ||
          "Something went wronge...Please try again..."
      );
    }
    setIsLoading(false);
  };

  ////formik form handle
  const { values, handleChange, handleSubmit, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        fname: "",
        lname: "",
        email: "",
        password: "",
        image: "",
      },
      validationSchema: registerSchema,
      onSubmit: handleSignup,
    });

  /////profile pic upload and preview
  const [profilePic, setProfilePic] = useState();
  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfilePic(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleProfilePic = () => {
    filePicker.current.click();
  };

  const errorHandler = () => {
    setError(null);
  };
  console.log(errors);
  return (
    <div className="user-register">
      <div className="user-register__title">
        <h3>Welcome</h3>
      </div>

      <form className="register__form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="input__label">First Name</label>
          <input
            type="text"
            className="input_field"
            placeholder="type here...."
            name="fname"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.fname}
          />
        </div>

        {errors.fname && values.fname && touched.fname && !handleBlur.fname && (
          <p style={{ color: "red", textAlign: "center" }}>
            **{errors.fname}**
          </p>
        )}

        <div className="form-field">
          <label className="input__label">Last Name</label>
          <input
            type="text"
            className="input_field"
            placeholder="type here...."
            name="lname"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lname}
          />
        </div>

        {errors.lname && values.lname && touched.lname && !handleBlur.lname && (
          <p style={{ color: "red", textAlign: "center" }}>
            **{errors.lname}**
          </p>
        )}

        <div className="form-field">
          <label className="input__label">Email</label>
          <input
            type="email"
            className="input_field"
            placeholder="type here...."
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
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
            onBlur={handleBlur}
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

        <div className="form-field">
          <label className="input__label">Profile Picture</label>
          <input
            type="file"
            className="input_field"
            name="image"
            accept="image/*"
            style={{ display: "none" }}
            ref={filePicker}
            // onChange={(e) => setFieldValue("image", e.target.files[0])}
            onChange={imageHandler}
          />
          <button
            type="button"
            onClick={handleProfilePic}
            className="input_field select_picbtn"
          >
            Upload Pic
          </button>
          {profilePic ? (
            <img
              src={profilePic}
              style={{ margin: "auto", width: "150px", height: "150px" }}
            />
          ) : (
            <img
              src={profileIcon}
              style={{ margin: "auto", width: "150px", height: "150px" }}
            />
          )}

          {/* {values.image ? (
            <PreviewImage file={values.image} />
          ) : (
            <img src={profileIcon} />
          )} */}
        </div>

        <div className="user-register__registerbtn">
          <button className="registerbtn" type="submit">
            Register
          </button>
        </div>
      </form>
      <div className="hr"></div>

      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error} setError={setError} onClear={errorHandler} />
    </div>
  );
};

export default Register;
