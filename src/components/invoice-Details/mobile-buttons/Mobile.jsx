import React from "react";
import Buttons from "../group-buttons/Buttons";
import classes from "./Mobile.module.css";

const Mobile = ({ onDelete, onMarkAsPaid, loading, status }) => {
  return (
    <div className={classes.mobile}>
      <div />

      <Buttons
        onDelete={() => onDelete()}
        onMarkAsPaid={() => onMarkAsPaid()}
        loading={loading}
        status={status}
      />
    </div>
  );
};

export default Mobile;
