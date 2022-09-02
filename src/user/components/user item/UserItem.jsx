import React from "react";
import Avatar from "../../../shared/components/UIElements/Avatar";
import Card from "../../../shared/components/UIElements/Card";
import "./UserItem.css";
import { Link } from "react-router-dom";

const UserItem = ({ id, image, firstname, lastname, places }) => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${id}/places`}>
          <div className="user-item__image">
            <Avatar image={image} alt={firstname} />
          </div>
          <div className="user-item__info">
            <h2>{`${firstname} ${lastname}`}</h2>
            <h3>
              {places.length} {places.length === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
