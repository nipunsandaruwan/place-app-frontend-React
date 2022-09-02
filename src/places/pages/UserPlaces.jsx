import React, { useState, useEffect, useContext } from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";
import axios from "axios";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "./../../shared/components/UIElements/LoadingSpinner";

const UserPlaces = () => {
  const userId = useParams().userId;
  console.log(userId);

  const [loadedPlaces, setLoadedPlaces] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const myPlaces = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        );

        if (res.status === 200) {
          setLoadedPlaces(res.data.places);
        } else {
          return setError(res.message || "Somthing went wronge");
        }
      } catch (error) {
        setError(error.response.data.message);
      }
      setIsLoading(false);
    };

    myPlaces();
  }, []);

  return (
    <>
      {!isLoading && loadedPlaces ? (
        <PlaceList places={loadedPlaces}></PlaceList>
      ) : null}
    </>
  );
};

export default UserPlaces;
