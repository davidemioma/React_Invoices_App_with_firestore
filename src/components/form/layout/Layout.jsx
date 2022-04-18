import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import classes from "./Layout.module.css";

const Layout = ({ children, closeForm, formOpen }) => {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme.theme);

  return (
    <>
      <div
        onClick={() => dispatch(closeForm())}
        className={`${classes.backdrop} ${
          formOpen ? classes.backdrop_open : classes.backdrop_closed
        }`}
      ></div>

      <div
        className={`${classes.modal} ${
          theme === "dark_mode" ? classes.bg_dark : classes.bg_light
        } ${formOpen ? classes.modal_open : classes.modal_closed}`}
      >
        {children}
      </div>
    </>
  );
};

export default Layout;
