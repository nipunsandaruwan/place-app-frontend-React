import React, { useState, useContext } from "react";
import "./PlaceItem.css";
import Card from "../../shared/components/UIElements/Card";
import Dialog from "@mui/material/Dialog";
import ViewMap from "./ViewMap";
import { Link } from "react-router-dom";
import DeletePlace from "./DeletePlace";
import { AuthContext } from "./../../context/auth-context";
import axios from "axios";

const PlaceItem = (props) => {
  const [openMap, setOpenMap] = useState(false);
  const [deletePlace, setDeletePlace] = useState(false);
  const auth = useContext(AuthContext);
  const [deleteMessage, setDeleteMessage] = useState();
  const [error, setError] = useState(false);
  console.log(`placeid : ${props.id}`);

  return (
    <li>
      <div className="place-item__card">
        <div className="place-item__image">
          <img src={props.image} alt={props.title} />
        </div>
        <div className="place-item__info">
          <h2>{props.title}</h2>
          <h3>{props.address}</h3>
          <p>{props.description}</p>
        </div>
        <div className="place-item__actions">
          <button
            className="place-item__viewbtn"
            onClick={() => setOpenMap(true)}
          >
            View on Map
          </button>
          <ViewMap
            address={props.address}
            openMap={openMap}
            setOpenMap={setOpenMap}
            location={props.location}
          />
          {auth.isLoggedIn && (
            <>
              <Link to={`/places/${props.id}`}>
                <button className="place-item__editbtn">Edit</button>
              </Link>
              <button
                className="place-item__deletebtn"
                onClick={() => setDeletePlace(true)}
              >
                Delete
              </button>
              <DeletePlace
                deletePlace={deletePlace}
                setDeletePlace={setDeletePlace}
                title={props.title}
                // handleDeletePlace={handleDeletePlace}
                id={props.id}
                setDeleteMessage={setDeleteMessage}
                setError={setError}
              />
            </>
          )}
        </div>
      </div>
    </li>
  );
};

export default PlaceItem;
