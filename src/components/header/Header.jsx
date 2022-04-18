import React from "react";
import Filters from "../filters/Filters";
import icon_plus from "../../assets/icon-plus.svg";
import { useDispatch } from "react-redux";
import { openNewForm } from "../../store/store";
import classes from "./Header.module.css";

const Header = ({ amount }) => {
  const dispatch = useDispatch();
  return (
    <div className={classes.header}>
      <div className={classes.header_top}>
        <h2>Invoices</h2>
        <p>{amount} invoices</p>
      </div>

      <div className={classes.tasks}>
        <Filters />

        <button onClick={() => dispatch(openNewForm())}>
          <span>
            <img src={icon_plus} alt="" />
          </span>
          New
        </button>
      </div>
    </div>
  );
};

export default Header;
