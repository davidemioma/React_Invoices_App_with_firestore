import React from "react";
import { useSelector } from "react-redux";
import Status from "../../status/Status";
import icon_right from "../../../assets/icon-arrow-right.svg";
import millify from "millify";
import { useNavigate } from "react-router";
import classes from "./Invoice.module.css";

const Invoice = ({ id, toName, dueDate, totalAmount, currency, status }) => {
  const theme = useSelector((state) => state.theme.theme);

  const navigate = useNavigate();

  return (
    <div
      className={`${classes.invoice} ${
        theme === "dark_mode" ? classes.bg_dark : classes.bg_light
      }`}
      onClick={() => navigate(`/invoices/${id}`, { push: true })}
    >
      <p className={classes.id}>#{id}</p>

      <p className={classes.name}>{toName}</p>

      <p>
        Due {dueDate} <br /> {currency}
        {millify(totalAmount)}
      </p>

      <span>
        <Status status={status} />
      </span>

      <img src={icon_right} alt="" />
    </div>
  );
};

export default Invoice;
