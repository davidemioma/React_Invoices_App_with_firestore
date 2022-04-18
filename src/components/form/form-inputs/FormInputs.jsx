import React from "react";
import { useSelector } from "react-redux";
import classes from "./FormInputs.module.css";

const FormInputs = ({
  label,
  id,
  type,
  value,
  defaultValue,
  setValue,
  min,
  max,
}) => {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div className={classes.inputs}>
      <label htmlFor={id}>{label}</label>

      <input
        className={theme === "dark_mode" ? classes.bg_dark : classes.bg_light}
        type={type}
        id={id}
        value={value}
        defaultValue={defaultValue}
        min={min}
        max={max}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default FormInputs;
