import React from "react";
import { useSelector } from "react-redux";
import classes from "./FormSelects.module.css";

const FormSelect = ({ label, id, value, defaultValue, setValue, options }) => {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div className={classes.inputs}>
      <label htmlFor={id}>{label}</label>

      <select
        className={theme === "dark_mode" ? classes.bg_dark : classes.bg_light}
        id={id}
        value={value}
        defaultValue={defaultValue}
        onChange={(e) => setValue(e.target.value)}
      >
        {options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
