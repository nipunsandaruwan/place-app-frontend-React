import React, { useState, useEffect } from "react";
import axios from "axios";

import UsersList from "../components/user list/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Users = () => {
  const [users, setUsers] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/users`
        );

        if (res.status === 200) {
          setUsers(res.data.users);
        }
      } catch (error) {
        setIsLoading(false);
        setError(error.response.data.message || "Somthing went wronge");
      }
    };
    getAllUsers();
    setIsLoading(false);
  }, []);

  const errorhandler = () => {
    setError(null);
  };

  return (
    <>
      {users && !isLoading ? <UsersList users={users} /> : null}
      <ErrorModal error={error} onclear={errorhandler} />
      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default Users;
