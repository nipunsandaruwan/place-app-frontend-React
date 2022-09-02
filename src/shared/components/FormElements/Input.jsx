import React from "react";
import "./Input.css";

const Input = (props) => {
  return (
    <>
      <label className="input__label">{props.label}</label>
      <input
        className="input__field"
        type={props.type}
        placeholder="type here...."
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
      />
    </>
  );
};

export default Input;
