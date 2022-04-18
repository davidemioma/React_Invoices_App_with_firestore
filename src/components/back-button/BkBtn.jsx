import React from "react";
import { useSelector } from "react-redux";
import icon_left from "../../assets/icon-arrow-left.svg";
import classes from "./BkBtn.module.css";

const BkBtn = ({ task }) => {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <button
      className={`${classes.back_btn} ${
        theme === "dark_mode" ? classes.btn_dark : classes.btn_light
      }`}
      onClick={task}
    >
      <img src={icon_left} alt="" />
      Go Back
    </button>
  );
};

export default BkBtn;
