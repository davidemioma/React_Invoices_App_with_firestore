import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import BkBtn from "../../back-button/BkBtn";
import Status from "../../status/Status";
import Buttons from "../group-buttons/Buttons";
import classes from "./Header.module.css";

const Header = ({ status, onDelete, onMarkAsPaid, loading }) => {
  const navigate = useNavigate();

  const theme = useSelector((state) => state.theme.theme);

  return (
    <div className={classes.container}>
      <BkBtn task={() => navigate("/")} />

      <div
        className={`${classes.header} ${
          theme === "dark_mode" ? classes.bg_dark : classes.bg_light
        }`}
      >
        <div className={classes.status}>
          <p>Status</p>

          <Status status={status} />
        </div>

        <div className={classes.btns_desktop}>
          <Buttons
            onDelete={() => onDelete()}
            onMarkAsPaid={() => onMarkAsPaid()}
            loading={loading}
            status={status}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
