import React, { useContext } from "react";
import "./NavLinks.css";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/auth-context";

const NavLinks = () => {
  const auth = useContext(AuthContext);
  // const navigate = useNavigate;
  // const goToMyPlaces = () => {
  //   navigate('/'${auth.userId}'/places');
  // };
  let linkMyPlaces = `/${auth.userId}/places`;

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" className="nav-links">
          All Users
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to={linkMyPlaces} className="nav-links">
            My Places
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new" className="nav-links">
            Add Place
          </NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth/login" className="nav-links">
            Authenticate
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <>
          <button onClick={auth.logout}>Logout</button>
        </>
      )}
    </ul>
  );
};

export default NavLinks;
