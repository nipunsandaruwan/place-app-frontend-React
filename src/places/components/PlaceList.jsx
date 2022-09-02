import React from "react";
import "./PlaceList.css";
import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";

const PlaceList = (props) => {
  return (
    <>
      {props.places.length === 0 && (
        <div className="place-list-center">
          <Card>
            <h2>No Places Found ....! Maybe Create one ?</h2>
            <button>Share Place</button>
          </Card>
        </div>
      )}

      {props.places.length > 0 && (
        <ul className="place-list">
          {props.places.map((place) => (
            <PlaceItem
              key={place.id}
              id={place.id}
              image={place.image}
              title={place.title}
              description={place.description}
              address={place.address}
              createId={place.creator}
              location={place.location}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default PlaceList;
