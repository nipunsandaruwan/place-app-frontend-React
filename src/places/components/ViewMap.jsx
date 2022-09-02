import React, { useMemo } from "react";
import Dialog from "@mui/material/Dialog";
import "./ViewMap.css";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const ViewMap = ({ address, openMap, setOpenMap, location }) => {
  const lat = Number(location.lat);
  const lng = Number(location.lng);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY,
  });

  //   if (!isLoaded) return <div>Loading....! Please wait....</div>;
  return (
    <Dialog open={openMap} onClose={() => setOpenMap(false)}>
      <div className="view-map">
        <h1 className="view-map__title">{address}</h1>
        <div className="view-map__content">
          {!isLoaded ? (
            <div>Loading</div>
          ) : (
            <GoogleMap
              zoom={10}
              center={{ lat: lat, lng: lng }}
              mapContainerClassName="mapContainer"
            >
              <Marker position={{ lat: lat, lng: lng }} />
            </GoogleMap>
          )}
        </div>
        <div className="view-map__footer">
          <button
            className="view-map__closebtn"
            onClick={() => setOpenMap(false)}
          >
            close
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ViewMap;
