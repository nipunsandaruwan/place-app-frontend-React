import React, { useContext } from "react";
import Dialog from "@mui/material/Dialog";
import "./DeletePlace.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const DeletePlace = ({
  deletePlace,
  setDeletePlace,
  title,

  setDeleteMessage,
  setError,
  id,
}) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  console.log(`Place Id = ${id}`);

  let linka = `/${auth.userId}/places`;
  const handleDeletePlace = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/places/${id}`
      );

      if (res.status === 200) {
        setDeleteMessage(res.data.message);
        // console.log(res.data.message);
      } else {
        return setError("Somthing Went Wronge");
      }
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <Dialog open={deletePlace} onClose={() => setDeletePlace(false)}>
      <div className="view-delete">
        <h1 className="view-delete__title">
          Do you want to delete this place ?
        </h1>
        <div className="view-delete__content">
          <h3>{title}</h3>
        </div>
        <div className="view-delete__footer">
          <button className="view-delete__closebtn" onClick={handleDeletePlace}>
            Delete
          </button>
          <button
            className="view-delete__closebtn"
            onClick={() => setDeletePlace(false)}
          >
            close
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default DeletePlace;
