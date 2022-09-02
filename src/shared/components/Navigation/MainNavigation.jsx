import React, { useState } from "react";
import "./MainNavigation.css";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import { Link } from "react-router-dom";
import SideDrawer from "./SideDrawer";

const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawer = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawer = () => {
    setDrawerIsOpen(false);
  };

  return (
    <>
      <SideDrawer show={drawerIsOpen} closeDrawer={closeDrawer}>
        <nav className="main-navigation__drawer-nav">
          <span className="close-icon" onClick={closeDrawer}>
            X
          </span>
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button onClick={openDrawer} className="main-navigation__menu-btn">
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">Your Places</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
