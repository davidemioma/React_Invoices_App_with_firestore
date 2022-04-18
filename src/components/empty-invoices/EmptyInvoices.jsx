import React from "react";
import emptyImg from "../../assets/illustration-empty.svg";
import classes from "./EmptyInvoices.module.css";

const EmptyInvoices = ({ header, text, btnName, task }) => {
  return (
    <div className={classes.empty}>
      <div className={classes.empty_list}>
        <img src={emptyImg} alt="" />

        <span className={classes.empty_title}>
          <h1>{header}</h1>
          <p>{text}</p>
        </span>

        {task && <button>{btnName}</button>}
      </div>
    </div>
  );
};

export default EmptyInvoices;
