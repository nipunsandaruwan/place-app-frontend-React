import React, { useEffect, useState } from "react";
import {} from "react-router-dom";
import { useParams } from "react-router-dom";
import Input from "./../../shared/components/FormElements/Input";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "./../../shared/components/UIElements/ErrorModal";

const DummyPlaces = [
  {
    id: "p1",
    title: `Adam's Peak`,
    description: `Sri Pada or Adam’s Peak is an ancient pilgrimage site, which has long attracted thousands of pilgrims from all faiths. This conical mountain is 7,360 feet (2,250 meters )high, soaring clear above the surrounding mountain ranges.`,
    imageUrl:
      "https://www.ceylonexpeditions.com/medias/destination_places/big/110/sri-pada-adam-s-peak-sri-lanka.jpg",
    address: "No Address",
    location: {
      lat: "6.8063588",
      lng: "-79.8880024",
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: `Adam's Peak`,
    description: `Sri Pada or Adam’s Peak is an ancient pilgrimage site, which has long attracted thousands of pilgrims from all faiths. This conical mountain is 7,360 feet (2,250 meters )high, soaring clear above the surrounding mountain ranges.`,
    imageUrl:
      "https://media.tacdn.com/media/attractions-splice-spp-674x446/09/23/78/0f.jpg",
    address: "No Address",
    location: {
      lat: 6.80964,
      lng: -80.4209895,
    },
    creator: "u2",
  },
];

const UpdatePlace = () => {
  const placeId = useParams().placeId;
  const [identifiedPlacee, setIdentifiedPlace] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedMessage, setUpdatedessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`
        );
        console.log(res);

        if (res.status === 200) {
          console.log(res);
          setIdentifiedPlace(res.data.place);
        }
      } catch (error) {
        setError(error.response.data.message);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [placeId]);

  // const identifiedPlace = DummyPlaces.find((place) => place.id === placeId);

  const newformSchema = yup.object().shape({
    title: yup.string().required("Required"),
    address: yup.string().required("Required"),
    description: yup.string().required("Required"),
  });

  const handleUpdate = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:5500/api/places/${placeId}`,
        {
          title: values.title,
          address: values.address,
          description: values.description,
        }
      );

      if (res.status === 200) {
        setUpdatedessage(res.data.message);
      }
    } catch (error) {}
  };

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues: {
      title: identifiedPlacee.title,
      address: identifiedPlacee.address,
      description: identifiedPlacee.description,
    },
    validationSchema: newformSchema,
    onSubmit: handleUpdate,
  });

  if (!identifiedPlacee) {
    return (
      <div>
        <h2>Could not find place....!</h2>
      </div>
    );
  }
  const onClear = () => {
    setError(null);
  };

  return (
    <div className="form_card">
      {!isLoading && identifiedPlacee ? (
        <>
          <h1 className="new-place__title">Edit Place</h1>
          <h2>"{identifiedPlacee.title}"</h2>
          <form className="new-place__form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label className="input__label">Title</label>
              <input
                type="text"
                className="new-place__description"
                name="title"
                onChange={handleChange}
                touched={touched.title}
                value={values.title}
              />
            </div>
            <div className="form-field">
              <label className="input__label">Address</label>
              <input
                type="text"
                className="new-place__description"
                name="address"
                onChange={handleChange}
                touched={touched.address}
                value={values.address}
              />
            </div>
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
                Update Place
              </button>
            </div>
          </form>
          {error && <ErrorModal error={error} onClear={onClear} />}
          {isLoading && <LoadingSpinner asOverlay />}
        </>
      ) : null}
    </div>
  );
};

export default UpdatePlace;
