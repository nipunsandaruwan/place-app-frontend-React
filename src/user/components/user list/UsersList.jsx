import React from "react";
import "./UsersList.css";
import UserItem from "../user item/UserItem";
import Card from "../../../shared/components/UIElements/Card";

const UsersList = ({ users }) => {
  return (
    <>
      {users.length === 0 ? (
        <div className="center ">
          <Card>
            <h2>No Users Found .....!</h2>
          </Card>
        </div>
      ) : (
        <ul className="users-list">
          {users.map((user) => (
            <UserItem
              key={user.id}
              id={user.id}
              image={user.image}
              firstname={user.firstname}
              lastname={user.lastname}
              places={user.places}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default UsersList;
