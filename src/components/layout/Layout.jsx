import React from "react";
import { useSelector } from "react-redux";
import Nav from "../nav/Nav";
import classes from "./Layout.module.css";

const Layout = ({ children }) => {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div
      className={`${
        theme === "dark_mode" ? classes.dark_mode : classes.light_mode
      }`}
    >
      <div className={classes.layout}>
        <Nav />

        <div className={`container`}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
