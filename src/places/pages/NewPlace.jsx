import React, { useContext, useState, useRef } from "react";
import Input from "../../shared/components/FormElements/Input";
import "./NewPlace.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { AuthContext } from "./../../context/auth-context";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const hidePicRef = useRef();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const newformSchema = yup.object().shape({
    title: yup.string().required("Required"),
    address: yup.string().required("Required"),
    description: yup.string().required("Required"),
    image: yup.mixed(),
  });

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/places`,
        {
          title: values.title,
          address: values.address,
          description: values.description,
          image: placePic,
          creator: auth.userId,
        }
      );

      if (res.status === 200) {
        console.log(res.data);
        navigate(`/:${auth.userId}/places`);
      }
    } catch (error) {
      // console.log(error.responce.data.message);
      setError(error.message);
    }
    setIsLoading(false);
  };

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues: {
      title: "",
      address: "",
      description: "",
      image: "",
    },
    validationSchema: newformSchema,
    onSubmit,
  });

  const [placePic, setPlacePic] = useState();
  const placeImageHandle = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPlacePic(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const clearError = () => {
    setError(null);
  };

  const handleUpload = () => {
    hidePicRef.current.click();
  };

  return (
    <div className="form_card">
      <h1 className="new-place__title">Add New Place</h1>
      <hr />

      <form className="new-place__form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="input__label">Title</label>
          <input
            type="text"
            className="input_field"
            name="title"
            placeholder="type here...."
            onChange={handleChange}
            touched={touched.title}
            value={values.title}
          />
        </div>
        <div className="form-field">
          <label className="input__label">Address</label>
          <input
            type="text"
            className="input_field"
            name="address"
            placeholder="type here...."
            onChange={handleChange}
            touched={touched.address}
            value={values.address}
          />
        </div>
        <div className="form-field">
          <label className="input__label">Picture</label>
          <input
            ref={hidePicRef}
            className="input_field"
            type="file"
            name="image"
            onChange={placeImageHandle}
            accept="image/*"
            style={{ display: "none" }}
          />
          <button
            onClick={handleUpload}
            className="input_field select_picbtn"
            type="button"
          >
            Select Picture
          </button>
        </div>
        {/* {placePic && <img className="place_pic" src={placePic} width="320" />} */}

        <div className="form-field">
          <label className="input__label">Description</label>
          <textarea
            className="new-place__description"
            name="description"
            onChange={handleChange}
            value={values.description}
            placeholder="type here...."
          />
        </div>
        <div className="submit-field">
          <button type="submit" className="submitbtn">
            Submit
          </button>
        </div>
      </form>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error} onClear={clearError} />
    </div>
  );
};

export default NewPlace;
