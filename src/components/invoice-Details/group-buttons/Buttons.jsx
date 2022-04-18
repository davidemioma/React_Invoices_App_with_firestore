import React from "react";
import { useDispatch } from "react-redux";
import { openEditForm } from "../../../store/store";
import classes from "./Buttons.module.css";

const Buttons = ({ onDelete, onMarkAsPaid, loading, status }) => {
  const dispatch = useDispatch();

  return (
    <div className={classes.btns}>
      {status !== "Paid" && (
        <button
          className={classes.btn_edit}
          disabled={loading}
          onClick={() => dispatch(openEditForm())}
        >
          Edit
        </button>
      )}

      <button
        className={classes.btn_delete}
        disabled={loading}
        onClick={() => onDelete()}
      >
        Delete
      </button>

      {status !== "Paid" && (
        <button
          className={classes.btn_mark}
          disabled={loading}
          onClick={() => onMarkAsPaid()}
        >
          Mark as paid
        </button>
      )}
    </div>
  );
};

export default Buttons;
