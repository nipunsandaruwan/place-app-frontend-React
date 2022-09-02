import React from "react";
import "./SideDrawer.css";
import { CSSTransition } from "react-transition-group";

const SideDrawer = (props) => {
  return (
    <CSSTransition
      in={props.show}
      timeout={1000}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer" onClick={props.closeDrawer}>
        {props.children}
      </aside>
    </CSSTransition>
  );
};

export default SideDrawer;
